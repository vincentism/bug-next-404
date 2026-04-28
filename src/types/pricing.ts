export type SubscriptionPlan = 'free' | 'starter' | 'creator' | 'pro'

export interface DisplayContent {
  type: string
  value: string
  is_bullet: boolean
}

export interface PriceItem {
  price_id: string
  amount: string
  currency: string
  level?: number
  monthly_credits?: number
  subscription_credits?: number
  project_num?: number
  plan_discount?: number
  ab_test_group?: 'A' | 'B'
}

interface TemplateCard {
  level: number
  monthly_credits: number
  subscription_credits: number
  pricing_ids: string[]
  pricing_items: PriceItem[]
  permissions: {
    project_num: number
  }
  display_contents: DisplayContent[]
  display_run_tasks: string[]
}

type PlanTemplateMap = {
  [K in SubscriptionPlan]: TemplateCard
}

export interface SubscriptionData {
  monthly: {
    plans: PlanTemplateMap
  }
  yearly: {
    plan_discount: number
    plans: PlanTemplateMap
  }
}

export interface StripePlan {
  subscription_key: string
  interval: string
  level: number
  monthly_credits: number
  subscription_credits: number
  amount: string
  currency: string
  project_num: number
  models_off: {
    [k in string]: number
  }
  status: 'off' | 'on'
}

export interface SubscriptionTemplatePriceItem {
  price_id: string
  amount: string
  currency: string
  level: number
  monthly_credits: number
  subscription_credits: number
  ab_test_group: 'A' | 'B'
  project_num: number
  plan_discount: number
}

export interface SubscriptionTemplatePlan {
  pricing_items: SubscriptionTemplatePriceItem[]
}

export interface SubscriptionTemplateInterval {
  starter: SubscriptionTemplatePlan
  creator: SubscriptionTemplatePlan
  pro: SubscriptionTemplatePlan
}

export interface SubscriptionTemplateData {
  monthly: SubscriptionTemplateInterval
  yearly: SubscriptionTemplateInterval
}
