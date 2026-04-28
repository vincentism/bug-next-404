import type { CloudPricing, CloudPricingComputed } from '@/constants/cloudModelData'

type CloudCreditsRange = { min: number; max: number }
type CloudRangePricing = Extract<
  CloudPricing,
  { per: 'perRun' | 'perSecond' | 'perFrame' | 'perUnit' }
>

const normalizeValue = (value: unknown): string =>
  String(value ?? '')
    .trim()
    .toLowerCase()

const parseNumeric = (v: unknown): number => {
  if (typeof v === 'number') {
    return Number.isFinite(v) ? v : 0
  }

  if (typeof v === 'string') {
    const trimmed = v.trim().toLowerCase()
    if (!trimmed) return 0

    const numeric = trimmed.match(/-?\d+(\.\d+)?/)
    if (!numeric) return 0

    const parsed = Number.parseFloat(numeric[0])
    return Number.isFinite(parsed) ? parsed : 0
  }

  const parsed = Number(v)
  return Number.isFinite(parsed) ? parsed : 0
}

const clamp = (v: number, min?: number, max?: number): number => {
  let next = v

  if (typeof min === 'number') {
    next = Math.max(next, min)
  }

  if (typeof max === 'number') {
    next = Math.min(next, max)
  }

  return next
}

const matchSingle = (
  val: unknown,
  map: Record<string, number>,
  fallback?: number
): number | null => {
  if (val === null || val === undefined) {
    return fallback ?? null
  }

  const target = normalizeValue(val)

  for (const [key, value] of Object.entries(map)) {
    if (normalizeValue(key) === target) {
      return value
    }
  }

  return fallback ?? null
}

const matchCompound = (
  vals: string[],
  map: Array<{ when: string[]; value: number }>,
  fallback?: number
): number | null => {
  const normalizedVals = vals.map(normalizeValue)
  let bestMatch: { exact: number; value: number } | null = null

  for (const item of map) {
    if (!Array.isArray(item.when) || item.when.length !== normalizedVals.length) {
      continue
    }

    let exact = 0
    let matched = true

    for (let i = 0; i < item.when.length; i += 1) {
      const expected = normalizeValue(item.when[i])
      const actual = normalizedVals[i]

      if (expected === '*') {
        continue
      }

      if (expected !== actual) {
        matched = false
        break
      }

      exact += 1
    }

    if (!matched) continue

    if (!bestMatch || exact > bestMatch.exact) {
      bestMatch = { exact, value: item.value }
    }
  }

  return bestMatch?.value ?? fallback ?? null
}

const applyRule = (
  price: number,
  rule: CloudPricingComputed,
  params: Record<string, unknown>
): number => {
  const paramNames = rule.params || []

  if (paramNames.length === 0) {
    return price
  }

  if (rule.passthrough) {
    const raw = params[paramNames[0]]
    const factor = raw === undefined || raw === null ? (rule.default ?? 1) : parseNumeric(raw)
    return rule.type === '=' ? factor : price * factor
  }

  if (rule.condition) {
    const raw = params[paramNames[0]]
    const value = raw === undefined || raw === null ? (rule.default ?? 0) : parseNumeric(raw)
    const factor = value > rule.condition.gt ? rule.condition.then : rule.condition.else
    return rule.type === '=' ? factor : price * factor
  }

  let result: number | null = null

  if (paramNames.length === 1) {
    const value = params[paramNames[0]]

    if (value === undefined || value === null) {
      result = rule.default ?? null
    } else if (Array.isArray(rule.map)) {
      result = matchCompound([String(value)], rule.map, rule.default)
    } else if (rule.map) {
      result = matchSingle(value, rule.map, rule.default)
    }
  } else if (Array.isArray(rule.map)) {
    const values = paramNames.map(name => String(params[name] ?? ''))
    result = matchCompound(values, rule.map, rule.default)
  }

  if (result === null) {
    return price
  }

  return rule.type === '=' ? result : price * result
}

const calculateCloudPrice = (
  pricing: CloudPricing,
  params: Record<string, unknown> = {}
): number => {
  if (typeof pricing === 'number') {
    return Math.max(0, pricing)
  }

  if (pricing.per === 'perToken') {
    const promptTokens = parseNumeric(params.prompt_tokens ?? params.promptTokens ?? 0)
    const completionTokens = parseNumeric(params.completion_tokens ?? params.completionTokens ?? 0)
    const tokenPrice =
      promptTokens * pricing.baseCredits.prompt + completionTokens * pricing.baseCredits.completion
    return Math.max(0, tokenPrice)
  }

  let price = pricing.baseCredits

  const computedRules = 'computed' in pricing ? pricing.computed : undefined

  for (const rule of computedRules ?? []) {
    price = applyRule(price, rule, params)
  }

  switch (pricing.per) {
    case 'perRun': {
      break
    }
    case 'perSecond': {
      const duration = parseNumeric(params[pricing.unit] ?? pricing.unitDefault ?? 5)
      const clampedDuration = clamp(duration, pricing.unitMin, pricing.unitMax)
      price *= clampedDuration
      break
    }
    case 'perCharacter': {
      const text = String(params[pricing.unit] ?? '')
      const unitSize = pricing.unitSize && pricing.unitSize > 0 ? pricing.unitSize : 1
      price = price * (text.length / unitSize) + (pricing.addon ?? 0)
      break
    }
    case 'perFrame': {
      const frames = parseNumeric(params[pricing.unit] ?? pricing.unitDefault ?? 145)
      const clampedFrames = clamp(frames, pricing.unitMin, pricing.unitMax)
      const fps = pricing.fps && pricing.fps > 0 ? pricing.fps : 30
      price *= clampedFrames / fps
      break
    }
    case 'perUnit': {
      const unitValue = parseNumeric(params[pricing.unit] ?? pricing.unitDefault ?? 1)
      const clampedUnit = clamp(unitValue, pricing.unitMin, pricing.unitMax)
      price *= clampedUnit
      break
    }
    default: {
      return 0
    }
  }

  return Math.max(0, price)
}

export const calculateCloudCredits = (
  pricing: CloudPricing,
  params: Record<string, unknown> = {},
  modelOff = 1
): number => {
  const price = calculateCloudPrice(pricing, params)
  const safeModelOff = Number.isFinite(modelOff) && modelOff > 0 ? modelOff : 1
  return Math.ceil(Math.round(price * 100 * safeModelOff * 100) / 100)
}

const dedupeFiniteNumbers = (values: number[]): number[] => {
  const unique = new Set<number>()

  for (const value of values) {
    if (!Number.isFinite(value)) continue
    unique.add(value)
  }

  return Array.from(unique)
}

const getRulePossibleValues = (rule: CloudPricingComputed): number[] => {
  const paramNames = rule.params || []

  if (paramNames.length === 0 || rule.passthrough) {
    return []
  }

  if (rule.condition) {
    return dedupeFiniteNumbers([rule.condition.then, rule.condition.else])
  }

  const values: number[] = []

  if (paramNames.length === 1) {
    if (Array.isArray(rule.map)) {
      for (const item of rule.map) {
        values.push(item.value)
      }
    } else if (rule.map) {
      values.push(...Object.values(rule.map))
    }
  } else if (Array.isArray(rule.map)) {
    for (const item of rule.map) {
      values.push(item.value)
    }
  }

  if (typeof rule.default === 'number') {
    values.push(rule.default)
  }

  return dedupeFiniteNumbers(values)
}

const getBasePriceCandidates = (pricing: CloudRangePricing): number[] => {
  let candidates = dedupeFiniteNumbers([pricing.baseCredits])
  if (candidates.length === 0) {
    candidates = [0]
  }

  for (const rule of pricing.computed ?? []) {
    const possibleValues = getRulePossibleValues(rule)
    if (possibleValues.length === 0) {
      continue
    }

    const next: number[] = []

    for (const candidate of candidates) {
      for (const value of possibleValues) {
        next.push(rule.type === '=' ? value : candidate * value)
      }
    }

    const deduped = dedupeFiniteNumbers(next)
    if (deduped.length > 0) {
      candidates = deduped
    }
  }

  return candidates
}

const getUnitMultipliers = (pricing: CloudRangePricing): [number, number] => {
  switch (pricing.per) {
    case 'perRun': {
      return [1, 1]
    }
    case 'perSecond': {
      const fallback = pricing.unitDefault ?? 5
      const minValue = pricing.unitMin ?? fallback
      const maxValue = pricing.unitMax ?? fallback
      return minValue <= maxValue ? [minValue, maxValue] : [maxValue, minValue]
    }
    case 'perFrame': {
      const fallback = pricing.unitDefault ?? 145
      const minFrames = pricing.unitMin ?? fallback
      const maxFrames = pricing.unitMax ?? fallback
      const [safeMinFrames, safeMaxFrames] =
        minFrames <= maxFrames ? [minFrames, maxFrames] : [maxFrames, minFrames]
      const fps = pricing.fps && pricing.fps > 0 ? pricing.fps : 30
      return [safeMinFrames / fps, safeMaxFrames / fps]
    }
    case 'perUnit': {
      const fallback = pricing.unitDefault ?? 1
      const minValue = pricing.unitMin ?? fallback
      const maxValue = pricing.unitMax ?? fallback
      return minValue <= maxValue ? [minValue, maxValue] : [maxValue, minValue]
    }
    default: {
      return [1, 1]
    }
  }
}

export function calculateCloudCreditsRange(
  pricing: CloudPricing,
  modelOff = 1
): CloudCreditsRange | null {
  if (typeof pricing === 'number' || pricing.per === 'perToken' || pricing.per === 'perCharacter') {
    return null
  }

  const baseCandidates = getBasePriceCandidates(pricing)
  const [unitMinMultiplier, unitMaxMultiplier] = getUnitMultipliers(pricing)
  const safeModelOff = Number.isFinite(modelOff) && modelOff > 0 ? modelOff : 1

  let minCredits = Number.POSITIVE_INFINITY
  let maxCredits = Number.NEGATIVE_INFINITY

  for (const basePrice of baseCandidates) {
    const minPrice = Math.max(0, basePrice * unitMinMultiplier)
    const maxPrice = Math.max(0, basePrice * unitMaxMultiplier)

    const minCandidate = Math.min(minPrice, maxPrice)
    const maxCandidate = Math.max(minPrice, maxPrice)

    const minCandidateCredits = Math.ceil(Math.round(minCandidate * 100 * safeModelOff * 100) / 100)
    const maxCandidateCredits = Math.ceil(Math.round(maxCandidate * 100 * safeModelOff * 100) / 100)

    minCredits = Math.min(minCredits, minCandidateCredits)
    maxCredits = Math.max(maxCredits, maxCandidateCredits)
  }

  if (!Number.isFinite(minCredits) || !Number.isFinite(maxCredits) || minCredits === maxCredits) {
    return null
  }

  return {
    min: minCredits,
    max: maxCredits,
  }
}
