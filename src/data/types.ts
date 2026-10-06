export type Lang = 'es' | 'en'

export type KV = { k: string; v: string }

export type Product = {
  name: string
  badgeEs: string
  badgeEn: string
  es: string
  en: string
  roleEs: string
  roleEn: string
  stats?: { v: string; es: string; en: string; noteEs?: string; noteEn?: string }[]
}

export type FeatureCopy = {
  titleA: string
  accent: string
  tag: string
  lead: string
  facts?: KV[]
  origin: string
  what: string
  solves: string
  anatomy?: KV[]
  modulesLabel?: string
  modules?: { name: string; desc: string }[]
  flows?: { title: string; steps: string[] }[]
  specs?: KV[]
  decisions: (KV & { shot?: boolean })[]
  stat?: string
  statLabel?: string
  caption: string
}

export type Feature = {
  id: string
  product: string
  img: string | null
  extra: string[]
  source?: string
  pins?: [number, number][]
  es: FeatureCopy
  en: FeatureCopy
}

export type Theme = { id: string; es: string; en: string; ids: string[] | null }
