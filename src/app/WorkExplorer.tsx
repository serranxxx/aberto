'use client'

import { useEffect, useState } from 'react'
import { COPY } from '@/data/copy'
import { FEATURE_ORDER, FEATURES } from '@/data/features'
import type { Lang } from '@/data/types'
import { FolderLink, RETURN_KEY, folderVars } from '@/components/site/Folder'
import w from './work.module.css'

const byId = Object.fromEntries(FEATURES.map(f => [f.id, f]))
const LIST = FEATURE_ORDER.map(id => byId[id]).filter(Boolean)

/**
 * Proyectos en una ventana tipo Finder: carpetas de colores en la barra lateral y,
 * en el panel, la descripción, dos cuadros del video del flujo, el título y la carpeta que abre el proyecto.
 */
export function WorkExplorer({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const [selId, setSelId] = useState(LIST[0]?.id)

  // Al cerrar un proyecto, su hoja regresa a la carpeta: se selecciona ese proyecto
  useEffect(() => {
    const back = sessionStorage.getItem(RETURN_KEY)
    if (back && LIST.some(f => f.id === back)) setSelId(back)
  }, [])
  const idx = Math.max(0, LIST.findIndex(f => f.id === selId))
  const sel = LIST[idx]
  const c = sel?.[lang]

  if (!sel || !c) return null
  // Dos cuadros del video del flujo, segundos 5 y 10 (<video>-5s.webp, -10s.webp); sin video, la imagen del proyecto.
  // En Eventos flash el segundo 10 cae en una transición, así que su -10s.webp es del segundo 11.
  const frames = (sel.video ? ['-5s.webp', '-10s.webp'].map(x => sel.video!.replace(/\.mp4$/, x)) : [sel.img]).filter(Boolean) as string[]

  return (
    <div className={w.window}>
      <div className={w.side}>
        <div className={w.lights} aria-hidden><span /><span /><span /></div>
        <span className={w.sideLabel}>{lang === 'es' ? 'Proyectos' : 'Projects'}</span>
        <div className={w.sideList}>
          {LIST.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setSelId(f.id)}
              className={`${w.sideItem} ${f.id === sel.id ? w.sideOn : ''}`}
              style={folderVars(f, i)}
              aria-pressed={f.id === sel.id}
            >
              <span className={w.sideIcon} aria-hidden><span /><span /></span>
              {f[lang].tag}
            </button>
          ))}
        </div>
      </div>

      <div className={w.main}>
        <div className={w.toolbar}>
          <span className={w.toolbarTag}>{c.tag}</span>
          <span className={w.toolbarCount}>{idx + 1} / {LIST.length}</span>
        </div>
        <div className={w.body}>
          <div className={w.left}>
            <p className={w.lead}>{c.lead}</p>
            <div className={w.media}>
              {frames.map((src, k) => (
                <div key={src} className={w.frame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={k === 0 ? c.caption : ''} className={w.mediaImg} />
                </div>
              ))}
            </div>
          </div>
          <div className={w.right}>
            <div className={w.title}>
              <span className={w.titleA}>{c.titleA.replace('\n', ' ')}</span>
              <span className={w.titleAccent}>{c.accent}</span>
            </div>
            <FolderLink f={sel} i={idx} label={t.seeFeature} className={w.cta}>
              <span className={w.flapLabel}>{t.seeFeature}</span>
              <span className={w.flapArrow}>→</span>
            </FolderLink>
          </div>
        </div>
      </div>
    </div>
  )
}
