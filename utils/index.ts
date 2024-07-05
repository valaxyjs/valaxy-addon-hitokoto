import type { HitokotoOptions } from '../types'

export function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => toCamelCase(v))
  }
  else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase())
        return [camelKey, toCamelCase(value)]
      }),
    )
  }
  return obj
}

export function generateUrl(url: string, options: HitokotoOptions): string {
  let queryParams = ''

  if (options?.args?.length !== 0) {
    const uniqueArgs = [...new Set(options.args)]
    queryParams = uniqueArgs.map(arg => `c=${arg}`).join('&')
  }

  const minLengthParam = options.minLength !== undefined ? `&min_length=${options.minLength}` : ''
  const maxLengthParam = options.maxLength !== undefined ? `&max_length=${options.maxLength}` : ''

  const params = `${queryParams}${minLengthParam}${maxLengthParam}`
  const finalParams = params.startsWith('&') ? params.substring(1) : params

  return `${url}/?${finalParams}`
}

export function isHitokotoOptions(obj: any): obj is HitokotoOptions {
  return obj && typeof obj === 'object'
}
