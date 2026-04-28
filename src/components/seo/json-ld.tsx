import React from 'react'

interface JsonLdProps {
  data: unknown
  id?: string
}

export function JsonLd({ data, id }: JsonLdProps) {
  if (!data) {
    return null
  }

  const json = JSON.stringify(data)

  return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
