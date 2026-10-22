import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PROJECT_IDS } from '@/data/routes'
import { FEATURES } from '@/data/features'
import ProjectView from './ProjectView'

export const dynamicParams = false

export function generateStaticParams() {
  return PROJECT_IDS.map(id => ({ id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const f = FEATURES.find(x => x.id === id)
  if (!f) return {}
  return { title: `${f.es.tag} · ${f.es.titleA.replace('\n', ' ')} ${f.es.accent} · Clickable UX design`, description: f.es.lead }
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!PROJECT_IDS.includes(id) || !FEATURES.some(f => f.id === id)) notFound()
  // key: al pasar de un proyecto a otro se remonta y reinician cursores y videos
  return <ProjectView key={id} id={id} />
}
