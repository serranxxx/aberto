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
  decisions: (KV & { shot?: boolean | string })[]
  stat?: string
  statLabel?: string
  caption: string
  problemTitle?: string
  solutionTitle?: string
  keyIdea?: string
  // Sección opcional entre la solución y los principios (ej. una decisión de negocio)
  business?: { title: string; text: string }
  // Etiquetas de los cursores del hero (roles de quien usa la pieza)
  cursors?: [string, string]
}

export type Feature = {
  id: string
  // Empresa/producto interno; no se muestra en la UI (los casos pueden ser anónimos)
  product?: string
  img: string | null
  video?: string
  heroVideo?: string
  flowVideo?: string
  /** Zoom del video del hero (ej. 1.25), para acercar un mockup con mucho aire alrededor */
  heroZoom?: number
  // 'cover' llena el contenedor de "Flujo completo" (recorta los lados); por defecto se ve completo
  flowFit?: 'cover' | 'contain'
  gallery?: { src: string; label: string }[]
  /** false: cuatro capturas por vista en vez de dos (capturas recortadas al contenido) */
  galleryWide?: boolean
  extra: string[]
  source?: string
  pins?: [number, number][]
  es: FeatureCopy
  en: FeatureCopy
}

export type Theme = { id: string; es: string; en: string; ids: string[] | null }
