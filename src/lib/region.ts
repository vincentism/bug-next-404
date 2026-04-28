const REGION_COOKIE_NAME = 'x-user-region'
const CHINA_COUNTRY_CODE = 'CN'

export function getIsChinaFromCookieValue(cookieValue: string | undefined): boolean {
  return cookieValue === CHINA_COUNTRY_CODE
}

export { REGION_COOKIE_NAME }
