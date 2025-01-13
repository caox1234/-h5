/**
 * @description: Development mode
 */
export const devMode = 'development'

/**
 * @description: Production mode
 */
export const prodMode = 'production'

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv() {
  return import.meta.env.MODE
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode() {
  return import.meta.env.DEV
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode() {
  return import.meta.env.PROD
}

/**
 * @description: 是否是测试环境
 * @returns:
 * @example:
 */
export function isTest() {
  return import.meta.env.VITE_APP_ENV === 'test'
}
