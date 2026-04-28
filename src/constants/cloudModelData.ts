export type CloudPricingPerToken = {
  per: 'perToken'
  baseCredits: {
    prompt: number
    completion: number
  }
}

export type CloudPricingComputed = {
  params: string[]
  type: '=' | 'x'
  map?: Record<string, number> | Array<{ when: string[]; value: number }>
  default?: number
  passthrough?: boolean
  condition?: { gt: number; then: number; else: number }
}

export type CloudPricingPerRun = {
  per: 'perRun'
  baseCredits: number
  computed?: CloudPricingComputed[]
}

export type CloudPricingPerSecond = {
  per: 'perSecond'
  baseCredits: number
  unit: string
  unitDefault?: number
  unitMin?: number
  unitMax?: number
  computed?: CloudPricingComputed[]
}

export type CloudPricingPerCharacter = {
  per: 'perCharacter'
  baseCredits: number
  unit: string
  unitSize?: number
  addon?: number
}

export type CloudPricingPerFrame = {
  per: 'perFrame'
  baseCredits: number
  unit: string
  unitDefault?: number
  unitMin?: number
  unitMax?: number
  fps?: number
  computed?: CloudPricingComputed[]
}

export type CloudPricingPerUnit = {
  per: 'perUnit'
  baseCredits: number
  unit: string
  unitDefault?: number
  unitMin?: number
  unitMax?: number
  computed?: CloudPricingComputed[]
}

export type CloudPricing =
  | number
  | CloudPricingPerToken
  | CloudPricingPerRun
  | CloudPricingPerSecond
  | CloudPricingPerCharacter
  | CloudPricingPerFrame
  | CloudPricingPerUnit

export type CloudModelEntry = {
  display_name: string
  pricing: CloudPricing
  params: Record<string, unknown>
  input_mapping?: Record<string, string>
}

export type CloudModelData = Record<string, CloudModelEntry>

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isStringRecord = (value: unknown): value is Record<string, string> => {
  if (!isRecord(value)) return false
  return Object.values(value).every(item => typeof item === 'string')
}

const isNumberRecord = (value: unknown): value is Record<string, number> => {
  if (!isRecord(value)) return false
  return Object.values(value).every(item => typeof item === 'number' && Number.isFinite(item))
}

const isCondition = (value: unknown): value is { gt: number; then: number; else: number } => {
  if (!isRecord(value)) return false
  return (
    typeof value.gt === 'number' &&
    Number.isFinite(value.gt) &&
    typeof value.then === 'number' &&
    Number.isFinite(value.then) &&
    typeof value.else === 'number' &&
    Number.isFinite(value.else)
  )
}

const isComputedMapItem = (value: unknown): value is { when: string[]; value: number } => {
  if (!isRecord(value)) return false
  return (
    Array.isArray(value.when) &&
    value.when.every(item => typeof item === 'string') &&
    typeof value.value === 'number' &&
    Number.isFinite(value.value)
  )
}

const isCloudPricingComputed = (value: unknown): value is CloudPricingComputed => {
  if (!isRecord(value)) return false
  if (!Array.isArray(value.params) || !value.params.every(item => typeof item === 'string')) {
    return false
  }
  if (value.type !== '=' && value.type !== 'x') {
    return false
  }
  if (value.map !== undefined) {
    const mapIsValid = isNumberRecord(value.map)
    const arrayMapIsValid =
      Array.isArray(value.map) && value.map.every(item => isComputedMapItem(item))
    if (!mapIsValid && !arrayMapIsValid) {
      return false
    }
  }
  if (value.default !== undefined && (typeof value.default !== 'number' || !Number.isFinite(value.default))) {
    return false
  }
  if (value.passthrough !== undefined && typeof value.passthrough !== 'boolean') {
    return false
  }
  if (value.condition !== undefined && !isCondition(value.condition)) {
    return false
  }
  return true
}

const isComputedList = (value: unknown): value is CloudPricingComputed[] =>
  Array.isArray(value) && value.every(item => isCloudPricingComputed(item))

const hasFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value)

const isCloudPricing = (value: unknown): value is CloudPricing => {
  if (hasFiniteNumber(value)) {
    return true
  }
  if (!isRecord(value) || typeof value.per !== 'string') {
    return false
  }

  switch (value.per) {
    case 'perToken':
      return (
        isRecord(value.baseCredits) &&
        hasFiniteNumber(value.baseCredits.prompt) &&
        hasFiniteNumber(value.baseCredits.completion)
      )
    case 'perRun':
      return hasFiniteNumber(value.baseCredits) && (value.computed === undefined || isComputedList(value.computed))
    case 'perSecond':
      return (
        hasFiniteNumber(value.baseCredits) &&
        typeof value.unit === 'string' &&
        (value.unitDefault === undefined || hasFiniteNumber(value.unitDefault)) &&
        (value.unitMin === undefined || hasFiniteNumber(value.unitMin)) &&
        (value.unitMax === undefined || hasFiniteNumber(value.unitMax)) &&
        (value.computed === undefined || isComputedList(value.computed))
      )
    case 'perCharacter':
      return (
        hasFiniteNumber(value.baseCredits) &&
        typeof value.unit === 'string' &&
        (value.unitSize === undefined || hasFiniteNumber(value.unitSize)) &&
        (value.addon === undefined || hasFiniteNumber(value.addon))
      )
    case 'perFrame':
      return (
        hasFiniteNumber(value.baseCredits) &&
        typeof value.unit === 'string' &&
        (value.unitDefault === undefined || hasFiniteNumber(value.unitDefault)) &&
        (value.unitMin === undefined || hasFiniteNumber(value.unitMin)) &&
        (value.unitMax === undefined || hasFiniteNumber(value.unitMax)) &&
        (value.fps === undefined || hasFiniteNumber(value.fps)) &&
        (value.computed === undefined || isComputedList(value.computed))
      )
    case 'perUnit':
      return (
        hasFiniteNumber(value.baseCredits) &&
        typeof value.unit === 'string' &&
        (value.unitDefault === undefined || hasFiniteNumber(value.unitDefault)) &&
        (value.unitMin === undefined || hasFiniteNumber(value.unitMin)) &&
        (value.unitMax === undefined || hasFiniteNumber(value.unitMax)) &&
        (value.computed === undefined || isComputedList(value.computed))
      )
    default:
      return false
  }
}

export const cloudModelData: CloudModelData = {}

export const getLiveCloudModelData = (): CloudModelData => cloudModelData

export const getCloudModelListEndpoint = (
  serverUrl: string | undefined = process.env.NEXT_PUBLIC_SERVER_URL
): string | null => {
  if (!serverUrl) return null
  return `${serverUrl.replace(/\/$/, '')}/api/v1/models/list?config_name=all`
}

/**
 * Normalize non-standard `{ when: { param: value }, multiply: N }` computed entries
 * into the standard `{ params, type, map, default }` format.
 */
const normalizeComputedRules = (pricing: unknown): unknown => {
  if (!isRecord(pricing) || !Array.isArray(pricing.computed)) return pricing
  const computed = pricing.computed as unknown[]
  if (computed.length === 0) return pricing

  const first = computed[0]
  if (!isRecord(first) || !isRecord(first.when) || typeof first.multiply !== 'number') {
    return pricing
  }

  const grouped = new Map<string, Record<string, number>>()
  for (const entry of computed) {
    if (!isRecord(entry) || !isRecord(entry.when) || typeof entry.multiply !== 'number') continue
    const whenObj = entry.when as Record<string, unknown>
    const keys = Object.keys(whenObj)
    if (keys.length !== 1) continue
    const param = keys[0]
    const value = String(whenObj[param])
    if (!grouped.has(param)) grouped.set(param, {})
    grouped.get(param)![value] = entry.multiply as number
  }

  const normalized: CloudPricingComputed[] = []
  for (const [param, map] of grouped) {
    normalized.push({ params: [param], type: 'x', map, default: 1 })
  }

  return { ...pricing, computed: normalized }
}

export const transformCloudModelListResponse = (payload: unknown): CloudModelData => {
  if (!isRecord(payload) || !Array.isArray(payload.data)) {
    return {}
  }

  const mapped: CloudModelData = {}

  for (const item of payload.data) {
    if (!isRecord(item)) continue

    const modelId = typeof item.model_id === 'string' ? item.model_id : ''
    const displayName = typeof item.display_name === 'string' ? item.display_name : ''
    const params = isRecord(item.params) ? item.params : {}
    const inputMapping = isStringRecord(item.input_mapping) ? item.input_mapping : undefined

    const normalizedPricing = normalizeComputedRules(item.pricing)
    if (!modelId || !displayName || !isCloudPricing(normalizedPricing)) {
      continue
    }

    mapped[modelId] = {
      display_name: displayName,
      pricing: normalizedPricing,
      params,
      ...(inputMapping ? { input_mapping: inputMapping } : {}),
    }
  }

  return mapped
}
