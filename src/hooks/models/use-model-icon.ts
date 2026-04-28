import { Brain } from 'lucide-react'

export type ModelIconInfo = {
  type: 'component' | 'url'
  icon?: React.ComponentType<{ className?: string }>
  url?: string
}

/**
 * 获取模型图标信息
 * 营销站只在 models 索引页用作模型卡片角标，统一返回 Brain 占位图标
 */
export const getModelIconInfo = (_model: string): ModelIconInfo => {
  void _model
  return { type: 'component', icon: Brain }
}

export const getModelIcon = (_model: string) => {
  void _model
  return Brain
}
