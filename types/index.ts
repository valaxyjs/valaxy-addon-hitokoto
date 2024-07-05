import type { HitokotoType } from '../client/enum'

export interface HitokotoOptions {
  api?: string
  args?: HitokotoType[]
  minLength?: number
  maxLength?: number
}

export interface Hitokoto {
  id: number
  uuid: string
  hitokoto: string
  type: HitokotoType
  from: string
  fromWho: string
  creator: string
  creatorUid: number
  reviewer: number
  commitFrom: string
  createdAt: string
  length: number
}
