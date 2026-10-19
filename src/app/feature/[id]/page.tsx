import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { PROJECT_IDS, projectHref } from '@/data/routes'
import { FEATURES, PRODUCTS } from '@/data/features'
import FeatureView from './FeatureView'

export const dynamicParams = false

export function generateStaticParams() {
  return FEATURES.map(f => ({ id: f.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const f = FEATURES.find(x => x.id === id)
  if (!f) return {}
  return {
    title: `${f.es.titleA} ${f.es.accent} · ${PRODUCTS[f.product].name} · Alberto Serrano`,
    description: f.es.lead,
  }
}

export default async function FeaturePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!FEATURES.some(f => f.id === id)) notFound()
  // Los proyectos con caso de estudio propio viven en /proyecto
  if (PROJECT_IDS.includes(id)) redirect(projectHref(id))
  return <FeatureView id={id} />
}
