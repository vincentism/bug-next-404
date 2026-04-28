/**
 * 支付窗口工具函数
 *
 * 解决问题：
 * Safari 会拦截在异步回调中调用的 window.open()，因为它不被认为是用户手势触发的。
 *
 * 解决方案：
 * 1. 在用户点击时（同步）立即打开一个新窗口到 payment-redirect 页面
 * 2. 将支付请求信息存储到 sessionStorage
 * 3. payment-redirect 页面加载后读取信息，调用 API 获取 Stripe URL 并重定向
 * 4. 如果失败，显示错误信息
 */

import { getLocalePrefix } from './payment-url'

// 支付请求类型
export type PaymentRequestType =
  | 'subscription_checkout' // 新订阅
  | 'subscription_plan' // 升级/降级订阅
  | 'billing_portal' // 管理订阅
  | 'credits_checkout' // 购买积分

// 新订阅参数
export interface SubscriptionCheckoutParams {
  type: 'subscription_checkout'
  subscription_key: string
  interval: string
  successUrl: string
  cancelUrl: string
  rewardful: string
  kolect_ref?: string
  payment_method?: string
  // V2 API 新增字段
  price_id?: string
  api_version?: 'v1' | 'v2'
  // 用于在 payment-redirect 页面显示价格
  amount?: number
}

// 升级/降级订阅参数
export interface SubscriptionPlanParams {
  type: 'subscription_plan'
  subscriptionInfoId: string
  subscription_key: string
  interval: string
  successUrl: string
  cancelUrl: string
  rewardful: string
  kolect_ref?: string
  // V2 API 新增字段
  price_id?: string
  payment_method?: string
  api_version?: 'v1' | 'v2'
  /** 用于 payment-redirect 支付方式选择页展示价格 */
  amount?: number
  /** 为 true 时先展示 Stripe / 微信+支付宝 选择页（与 use-payment-grade-v2 高额逻辑配合） */
  require_payment_method_selection?: boolean
}

// 管理订阅参数
export interface BillingPortalParams {
  type: 'billing_portal'
  return_url: string
}

// 购买积分参数
export interface CreditsCheckoutParams {
  type: 'credits_checkout'
  amount: number
  successUrl: string
  cancelUrl: string
  kolect_ref?: string
}

export type PaymentParams =
  | SubscriptionCheckoutParams
  | SubscriptionPlanParams
  | BillingPortalParams
  | CreditsCheckoutParams

// localStorage key (使用 localStorage 而不是 sessionStorage，因为新窗口可以共享)
export const PAYMENT_REQUEST_KEY = 'pending_payment_request'
export const PAYMENT_STATUS_KEY = 'payment_redirect_status'

// 支付状态类型
export type PaymentStatus = 'pending' | 'redirected' | null

/**
 * 设置支付状态（用于跨窗口通信）
 * @param status 支付状态
 */
export function setPaymentStatus(status: PaymentStatus): void {
  try {
    if (status) {
      localStorage.setItem(PAYMENT_STATUS_KEY, status)
    } else {
      localStorage.removeItem(PAYMENT_STATUS_KEY)
    }
  } catch (e) {
    console.error('Failed to set payment status:', e)
  }
}

/**
 * 获取当前支付状态
 */
export function getPaymentStatus(): PaymentStatus {
  try {
    return localStorage.getItem(PAYMENT_STATUS_KEY) as PaymentStatus
  } catch (_e) {
    return null
  }
}

/**
 * 清除支付状态
 */
export function clearPaymentStatus(): void {
  setPaymentStatus(null)
}

/**
 * 同步打开支付窗口
 * 这个函数必须在用户点击事件的同步上下文中调用
 * @param params 支付参数
 * @returns 是否成功（存储参数并尝试打开窗口）
 */
export function openPaymentWindow(params: PaymentParams): boolean {
  // 存储支付请求到 localStorage（跨窗口共享）
  try {
    localStorage.setItem(PAYMENT_REQUEST_KEY, JSON.stringify(params))
    // 设置支付状态为 pending，表示支付流程已开始
    setPaymentStatus('pending')
  } catch (e) {
    console.error('Failed to store payment request:', e)
    return false
  }

  // 构建 payment-redirect 页面 URL
  const localePrefix = getLocalePrefix()
  const redirectUrl = `${window.location.origin}${localePrefix}/payment-redirect`
  const popupWidth = 520
  const popupHeight = 760
  const popupLeft = Math.max(0, Math.round((window.screen.width - popupWidth) / 2))
  const popupTop = Math.max(0, Math.round((window.screen.height - popupHeight) / 2))
  const popupFeatures = [
    `width=${popupWidth}`,
    `height=${popupHeight}`,
    `left=${popupLeft}`,
    `top=${popupTop}`,
    'popup=yes',
    'toolbar=no',
    'menubar=no',
    'location=yes',
    'status=no',
    'scrollbars=yes',
    'resizable=yes',
  ].join(',')

  // 优先以独立 popup 形式打开；部分浏览器仍可能退化为新标签页。
  const popupWindow = window.open(redirectUrl, '_blank', popupFeatures)
  popupWindow?.focus()

  return true
}

/**
 * 读取并清除待处理的支付请求
 * @returns 支付参数，如果没有则返回 null
 */
export function consumePaymentRequest(): PaymentParams | null {
  try {
    const data = localStorage.getItem(PAYMENT_REQUEST_KEY)
    if (data) {
      localStorage.removeItem(PAYMENT_REQUEST_KEY)
      return JSON.parse(data) as PaymentParams
    }
  } catch (e) {
    console.error('Failed to read payment request:', e)
  }
  return null
}
