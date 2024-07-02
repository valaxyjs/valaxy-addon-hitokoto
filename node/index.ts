import { defineValaxyAddon } from 'valaxy'
import pkg from '../package.json'

export const addonHitokoto = defineValaxyAddon(options => ({
  name: pkg.name,
  enable: true,
  options,
}))
