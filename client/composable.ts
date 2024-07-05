import { ref } from 'vue'
import type { Hitokoto, HitokotoOptions } from '../types'
import { generateUrl, isHitokotoOptions, toCamelCase } from '../utils'
import { useAddonHitokotoConfig } from './options'

export function useAddonHitokoto(options: HitokotoOptions | null = null) {
  const hitokotoOptions = useAddonHitokotoConfig()

  const intlUrl = 'https://international.v1.hitokoto.cn'
  const defaultUrl = 'https://v1.hitokoto.cn'

  const hitokoto = ref<Hitokoto>({
    id: 0,
    uuid: '',
    hitokoto: '',
    type: '',
    from: '',
    fromWho: '',
    creator: '',
    creatorUid: 0,
    reviewer: 0,
    commitFrom: '',
    createdAt: '',
    length: 0,
  } as any)

  const fetchHitokoto = async (fetchOptions: HitokotoOptions = options || hitokotoOptions.value) => {
    if (!isHitokotoOptions(fetchOptions))
      console.error('Invalid argument: fetchOptions must be of type HitokotoOptions', fetchOptions)

    const baseUrl = fetchOptions.api === 'intl' ? intlUrl : fetchOptions.api || defaultUrl

    const finalUrl = generateUrl(baseUrl, fetchOptions)

    try {
      const response = await fetch(finalUrl)
      if (!response.ok)
        throw new Error(`Network response was not ok.`)

      const data = await response.json()

      if (Array.isArray(data))
        hitokoto.value.hitokoto = data[0]
      else if (typeof data === 'object')
        hitokoto.value = toCamelCase(data)
      else if (typeof data === 'string')
        hitokoto.value.hitokoto = data
    }
    catch (error) {
      console.error('Error fetching visitor count:', error)
    }
  }

  fetchHitokoto()

  return { hitokoto, fetchHitokoto }
}
