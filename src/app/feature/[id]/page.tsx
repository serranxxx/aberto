import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
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
  return <FeatureView id={id} />
}
