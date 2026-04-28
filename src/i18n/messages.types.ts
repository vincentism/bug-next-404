import type base from '../../messages/en.json'
import type landing from '../../messages/landing/en.json'

// Helper type: recursively allow any nested string keys
// Preserves top-level namespace validation while permitting nested access patterns
type LooselyTypedMessages<T> = {
  [K in keyof T]: T[K] extends Record<string, any> ? LooselyTypedMessages<T[K]> : T[K]
} & {
  [key: string]: any
}

// Static messages (from en.json + landing/en.json) with flexible nested keys
type StaticMessages = LooselyTypedMessages<typeof base & typeof landing>

// Dynamic messages (runtime-loaded templates/models/solutions)
type DynamicMessages = {
  templates: Record<string, any>
  models: Record<string, any>
  solutions: Record<string, any>
  features: Record<string, any>
}

// Final type: validates top-level namespaces, allows nested keys
export type AppMessages = StaticMessages & DynamicMessages
