'use client'
import { useEffect, memo } from 'react'
import { useSearchParams } from 'next/navigation'

const UTMTracker = () => {
  const searchParams = useSearchParams()
  const search = searchParams?.toString() ?? ''

  useEffect(() => {
    if (!search) return

    const params = new URLSearchParams(search)

    const utmKeys: string[] = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
    ]

    const sourceId = params.get('source_id')
    const promo = params.get('promo')

    if (sourceId && window.localStorage.getItem('sourceId') !== sourceId) {
      window.localStorage.setItem('sourceId', sourceId)
    }
    if (promo && window.localStorage.getItem('OPENCREATOR_PROMO') !== promo) {
      window.localStorage.setItem('OPENCREATOR_PROMO', promo)
    }

    const utmData: Record<string, string> = {}

    utmKeys.forEach(key => {
      const value = params.get(key)
      if (value) utmData[key] = value
    })

    // 有 UTM 才存本地
    if (Object.keys(utmData).length > 0) {
      const nextUtmData = JSON.stringify(utmData)
      if (localStorage.getItem('utm_params') !== nextUtmData) {
        localStorage.setItem('utm_params', nextUtmData)
      }
    }
  }, [search]) // 路由查询串变化时重新检查

  return null
}
export default memo(UTMTracker)
