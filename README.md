<h1 align="center">valaxy-addon-hitokoto</h1>

<pre align="center">
一言指的是一句话，可以是动漫中的台词，也可以是网络上的各种小段子。或是感动，或是开心，有或是单纯的回忆...
</pre>

<p align="center">
<a href="https://www.npmjs.com/package/valaxy-addon-hitokoto" rel="nofollow"><img src="https://img.shields.io/npm/v/valaxy-addon-hitokoto?color=0078E7" alt="NPM version"></a>
</p>

## 安装插件

### 基础使用

插件直接可以安装使用，通常不需要过多繁琐配置：

```bash
pnpm add valaxy-addon-hitokoto
```

```ts
import { defineValaxyConfig } from 'valaxy'
import { addonHitokoto } from 'valaxy-addon-hitokoto'

export default defineValaxyConfig({
  addons: [
    addonHitokoto(),
  ],
})
```

### 简单配置

如果您想获取指定类型的句子，或者是特定长度的句子，可以参考以下配置示例：

```ts
import { defineValaxyConfig } from 'valaxy'
import { HitokotoType, addonHitokoto } from 'valaxy-addon-hitokoto'

export default defineValaxyConfig({
  addons: [
    addonHitokoto({
      args: [HitokotoType.Animation, HitokotoType.Comic], // 句子类型
      minLength: 0, // 最短句子长度
      maxLength: 30 // 最长句子长度
    }),
  ],
})
```

> [!TIP]
> 关于 `HitokotoType` 类别的更多信息，请参见 [HitokotoType](https://github.com/valaxyjs/valaxy-addon-hitokoto/tree/master/client/enum.ts)

## 使用插件

以下是简洁快捷的使用例子：

```vue
<script setup lang="ts">
import { HitokotoType, useAddonHitokoto } from 'valaxy-addon-hitokoto'

const { hitokoto } = useAddonHitokoto()
</script>

<template>
  <span>一言: {{ hitokoto.hitokoto }}</span>
  <span>来自: {{ hitokoto.from }}</span>
</template>
```

### 自动刷新

如果您想在网站上定时自动刷新获取一言句子，可以参考如下例子。每六秒调用 `fetchHitokoto` 实现刷新：

```vue
<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import { HitokotoType, useAddonHitokoto } from 'valaxy-addon-hitokoto'

const { hitokoto, fetchHitokoto } = useAddonHitokoto()

useIntervalFn(() => {
  fetchHitokoto()
}, 6000)
</script>

<template>
  <span>一言: {{ hitokoto.hitokoto }}</span>
  <span>来自: {{ hitokoto.from }}</span>
</template>
```

### 手动刷新

如果您希望在点击某个按钮时手动刷新 hitokoto 句子，可以参考如下例子：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { HitokotoType, useAddonHitokoto } from 'valaxy-addon-hitokoto'

const { hitokoto, fetchHitokoto } = useAddonHitokoto()
const isLoading = ref(false)

async function manualRefresh() {
  isLoading.value = true
  await fetchHitokoto()
  isLoading.value = false
}
</script>

<template>
  <span>一言: {{ hitokoto.hitokoto }}</span>
  <span>来自: {{ hitokoto.from }}</span>
  <button :disabled="isLoading" @click="manualRefresh">
    {{ isLoading ? '刷新中...' : '手动刷新' }}
  </button>
</template>
```

> [!IMPORTANT]
> 为降低运算服务器的负载，hitokoto 国际站目前由于持续的流量、负载和攻击问题，启用了缓存机制，缓存时间为2秒。这意味着在同一地区、同一路线且使用相同参数的访问者在短时间内将获得相同的句子， 进多信息请参阅 [一言开发者中心](https://developer.hitokoto.cn/sentence/#请求地址)

## 多页面

如果您有多个页面，想在不同页面设置不同的配置，可以在 `useAddonHitokoto` 中传入您想要设置的配置：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { HitokotoType, useAddonHitokoto } from 'valaxy-addon-hitokoto'

const { hitokoto } = useAddonHitokoto({ args: [HitokotoType.Animation, HitokotoType.Comic] })
</script>

<template>
  <span>一言: {{ hitokoto.hitokoto }}</span>
  <span>来自: {{ hitokoto.from }}</span>
</template>
```

## 动态切换

你也可以在 `fetchHitokoto` 函数中动态添加配置，以实现不同类型句子的切换：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { HitokotoType, useAddonHitokoto } from 'valaxy-addon-hitokoto'

const { hitokoto, fetchHitokoto } = useAddonHitokoto()
const isLoading = ref(false)

async function switchHitokotoType(newTypes: HitokotoType[]) {
  isLoading.value = true
  await fetchHitokoto({ args: newTypes })
  isLoading.value = false
}
</script>

<template>
  <span>Hitokoto: {{ hitokoto.hitokoto }}</span>
  <span>From: {{ hitokoto.from }}</span>
  <button :disabled="isLoading" @click="switchHitokotoType([HitokotoType.Game, HitokotoType.Literature])">
    {{ isLoading ? '切换中...' : '切换到游戏或文学' }}
  </button>
  <button :disabled="isLoading" @click="switchHitokotoType([HitokotoType.Movie, HitokotoType.Poetry])">
    {{ isLoading ? '切换中...' : '切换到影视或诗词' }}
  </button>
</template>
```

## 配置 / Options

| 属性名 | 类型 | 默认值 | 说明 |
| ---- | ---- | ---- | ---- |
| api | `string` | --- | `'intl'` 为海外线路，默认为国际线路。填入其他为自定义 API， 返回 JSON 则为一言 API，数组类型取第一个元素，字符串类型直接取值 |
| args | `string` | `HitokotoType[]` | 获取指定句子类型， 类型详见 [HitokotoType](https://github.com/valaxyjs/valaxy-addon-hitokoto/tree/master/client/enum.ts)|
| minLength | `number` | `0` | API 获取的最短句子长度 |
| maxLength | `number` | `30` | API 获取的最长句子长度 |

> [!NOTE]
> 关于自定义 API，这里有一个示例：将 `api` 填入 `https://el-bot-api.elpsy.cn/api/words/young`，由于返回值是一个数组，因此取其中的一个元素作为一句话

## 其他

自行部署: <https://developer.hitokoto.cn/sentence/deploy.html>
语句库: <https://github.com/hitokoto-osc/sentences-bundle>

请求地址：

| 地址 | 协议 | 方法 | QPS 限制 | 线路 |
| ---- | ---- | ---- | ---- | ---- |
| `v1.hitokoto.cn` | HTTPS | Any | 2 | 全球 |
| `international.v1.hitokoto.cn` | HTTPS | Any | 20(含缓存*) | 海外 |

## 致谢

- [Hitokoto](https://hitokoto.cn/)
