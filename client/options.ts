import { computed } from 'vue'
import type { ValaxyAddon } from 'valaxy'
import { useRuntimeConfig } from 'valaxy'
import type { HitokotoOptions } from '../types'

export function useAddonHitokotoConfig() {
  const runtimeConfig = useRuntimeConfig()
  return computed<HitokotoOptions>(() => {
    const options = (runtimeConfig.value.addons['valaxy-addon-hitokoto'] as ValaxyAddon<HitokotoOptions>).options

    return {
      ...options,
    }
  })
}
