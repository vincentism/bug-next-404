import React from 'react'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

type AtomCardProps = React.HTMLAttributes<HTMLDivElement> & {
  content: string
}

type AtomCardData = {
  lang: 'en' | 'zh'
  title?: string
  subtitle?: string
  model?: string
  input?: string[]
  output?: string[]
  constraints?: string[]
  notes?: string[]
}

const LABELS: Record<AtomCardData['lang'], Record<keyof Omit<AtomCardData, 'lang'>, string>> = {
  en: {
    title: 'Atom',
    subtitle: 'Role',
    model: 'Model',
    input: 'Input',
    output: 'Output',
    constraints: 'Constraints',
    notes: 'Notes',
  },
  zh: {
    title: '原子',
    subtitle: '角色',
    model: '模型',
    input: '输入',
    output: '输出',
    constraints: '约束',
    notes: '补充说明',
  },
}

const ARRAY_KEYS = new Set([
  'input',
  'inputs',
  'output',
  'outputs',
  'constraints',
  'constraint',
  'notes',
  'note',
])

function splitValue(value: string): string[] {
  if (value.includes(';')) {
    return value
      .split(';')
      .map(item => item.trim())
      .filter(Boolean)
  }
  return [value.trim()].filter(Boolean)
}

function parseAtomContent(raw: string): AtomCardData {
  const data: AtomCardData = {
    lang: 'en',
  }
  const lines = raw
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)

  lines.forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) {
      data.notes = [...(data.notes || []), line]
      return
    }
    const key = line.slice(0, colonIndex).trim().toLowerCase()
    const value = line.slice(colonIndex + 1).trim()
    if (!value) return

    if (key === 'lang') {
      data.lang = value === 'zh' ? 'zh' : 'en'
      return
    }
    if (key === 'title') {
      data.title = value
      return
    }
    if (key === 'subtitle') {
      data.subtitle = value
      return
    }
    if (key === 'model') {
      data.model = value
      return
    }
    if (ARRAY_KEYS.has(key)) {
      const normalizedKey =
        key === 'inputs'
          ? 'input'
          : key === 'outputs'
            ? 'output'
            : key === 'constraint'
              ? 'constraints'
              : key === 'note'
                ? 'notes'
                : (key as 'input' | 'output' | 'constraints' | 'notes')
      const current = data[normalizedKey] || []
      data[normalizedKey] = [...current, ...splitValue(value)]
    } else {
      data.notes = [...(data.notes || []), value]
    }
  })

  return data
}

function renderList(items?: string[]) {
  if (!items || items.length === 0) return null
  return (
    <ul className="space-y-1 text-sm text-gray-700">
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function AtomCard({ content, className, ...rest }: AtomCardProps) {
  const data = React.useMemo(() => parseAtomContent(content), [content])
  const labels = LABELS[data.lang]

  return (
    <div
      {...rest}
      data-atom-card
      className={cn('not-prose my-6 rounded-xl bg-white shadow-lg overflow-hidden', className)}
    >
      <div className="flex items-center justify-between border-b border-gray-200 bg-[#F7F7F7] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-theme-pink text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <div className="text-sm font-black text-black">{data.title || labels.title}</div>
            {data.subtitle ? (
              <div className="text-xs font-semibold text-gray-600">{data.subtitle}</div>
            ) : null}
          </div>
        </div>
        {data.model ? (
          <div className="rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
            {labels.model}: {data.model}
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 px-4 py-4 md:grid-cols-2">
        {data.input && data.input.length > 0 ? (
          <div>
            <div className="text-xs font-black uppercase tracking-wide text-black mb-2">
              {labels.input}
            </div>
            {renderList(data.input)}
          </div>
        ) : null}
        {data.output && data.output.length > 0 ? (
          <div>
            <div className="text-xs font-black uppercase tracking-wide text-black mb-2">
              {labels.output}
            </div>
            {renderList(data.output)}
          </div>
        ) : null}
        {data.constraints && data.constraints.length > 0 ? (
          <div>
            <div className="text-xs font-black uppercase tracking-wide text-black mb-2">
              {labels.constraints}
            </div>
            {renderList(data.constraints)}
          </div>
        ) : null}
        {data.notes && data.notes.length > 0 ? (
          <div>
            <div className="text-xs font-black uppercase tracking-wide text-black mb-2">
              {labels.notes}
            </div>
            {renderList(data.notes)}
          </div>
        ) : null}
      </div>
    </div>
  )
}
