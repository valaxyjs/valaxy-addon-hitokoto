import { defineValaxyAddon } from 'valaxy'
import pkg from '../package.json'
import type { HitokotoOptions } from '../types'

export const addonHitokoto = defineValaxyAddon<HitokotoOptions>(options => ({
  name: pkg.name,
  enable: true,
  options,
}))
