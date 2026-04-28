/**
 * 获取支付回调 URL
 *
 * 问题背景：
 * 在移动端（特别是 iOS Chrome），Stripe 支付完成后重定向回来时，
 * 如果 URL 没有包含正确的 locale 前缀，可能会导致 404 错误。
 *
 * 原因：
 * 1. 中文用户从 /zh/xxx 页面发起支付，但 successUrl 硬编码为 /credits/result
 * 2. Stripe 重定向回来时，next-intl middleware 无法正确识别 locale
 * 3. 移动端浏览器的新标签页可能不共享 session/cookie，导致 locale 检测失败
 *
 * 解决方案：
 * 使用 window.location.pathname 提取当前页面的 locale 前缀，
 * 确保支付回调 URL 与用户当前的语言环境一致。
 */

/**
 * 从当前 URL 路径中提取 locale 前缀
 * @returns locale 路径前缀，如 '/zh' 或 ''（英文默认不需要前缀）
 */
export function getLocalePrefix(): string {
  if (typeof window === 'undefined') return ''

  const pathname = window.location.pathname
  // 检查路径是否以 /zh 开头
  if (pathname.startsWith('/zh/') || pathname === '/zh') {
    return '/zh'
  }
  // 英文是默认语言，不需要前缀
  return ''
}

/**
 * 获取支付成功回调 URL
 * @returns 完整的支付成功回调 URL
 */
export function getPaymentSuccessUrl(): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const localePrefix = getLocalePrefix()
  return `${origin}${localePrefix}/credits/result?session_id={CHECKOUT_SESSION_ID}`
}

/**
 * 获取支付取消回调 URL
 * @returns 完整的支付取消回调 URL
 */
export function getPaymentCancelUrl(): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const localePrefix = getLocalePrefix()
  return `${origin}${localePrefix}/credits?canceled=true`
}
