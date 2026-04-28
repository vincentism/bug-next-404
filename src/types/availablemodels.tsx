import type { CloudPricing } from '@/constants/cloudModelData'

export interface ModelItem {
  id: string
  name: string
  display_name?: string
  credits?: number
  description: string
  description_zh?: string // 中文描述
  isNew?: boolean
  isDisabled?: boolean
  comingSoon?: boolean // 即将推出标记
  role: number[]
  model_key?: string // 当前折扣key
  model_off?: number // 当前折扣的值
  model_next_off?: number // 升级折扣的值
  pricingUnit?: 'credits' | 'perSecond' // 定价单位：按次(credits) 或 按秒(perSecond)
  pricePerSecond?: string // 按秒计费时的价格显示，如 "$0.07"
  cloudPricing?: CloudPricing
}

export type AvailableModels = {
  [key: string]: Array<ModelItem>
}
