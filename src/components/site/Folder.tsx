'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { FEATURES } from '@/data/features'
import type { Feature } from '@/data/types'
import { projectHref } from '@/data/routes'
import fo from './folder.module.css'

// Colores de etiqueta de macOS. Cada carpeta: [fondo (pestaña y cuerpo), frente (solapa), texto sobre el frente]
const PALETTE: [string, string, string][] = [
  ['#0069DB', 'linear-gradient(180deg, #479FFF, #007AFF)', '#FFFFFF'], // azul
  ['#813480', 'linear-gradient(180deg, #B373B3, #963D95)', '#FFFFFF'], // morado
  ['#D44688', 'linear-gradient(180deg, #F982B9, #F6519E)', '#FFFFFF'], // rosa
  ['#C13035', 'linear-gradient(180deg, #E97074, #E0383E)', '#FFFFFF'], // rojo
  ['#D47018', 'linear-gradient(180deg, #F9A55C, #F7821C)', '#FFFFFF'], // naranja
  ['#DBAB1F', 'linear-gradient(180deg, #FFD761, #FFC724)', '#19161E'], // amarillo
  ['#54A13C', 'linear-gradient(180deg, #8ECE7A, #62BB46)', '#FFFFFF'], // verde
]
const PALETTE_BY_ID: Record<string, number> = { dynamicrsvp: 2, dashboardp: 0, commandbar: 1, flash: 4 }

/** Variables CSS con los colores de la carpeta de un proyecto (también las usan los íconos de la barra lateral). */
export const folderVars = (f: Feature, i = 0) => {
  const [back, front, on] = PALETTE[PALETTE_BY_ID[f.id] ?? i % PALETTE.length]
  return { '--back': back, '--front': front, '--on': on } as CSSProperties
}

// Las dos hojas que asoman de la carpeta: las primeras capturas de su galería
const papers = (f: Feature) => {
  const imgs = [...(f.gallery ?? []).map(g => g.src), f.img, ...(f.extra ?? [])].filter(Boolean) as string[]
  return [imgs[0] ?? '', imgs[1] ?? imgs[0] ?? '']
}

/**
 * Al abrir el proyecto, una hoja sale de la carpeta, crece hasta llenar la pantalla y se vuelve
 * la página del proyecto. La hoja vive en <body> para seguir encima mientras cambia la ruta.
 */
function openSheet(from: DOMRect, img: string, href: string, go: () => void) {
  const sheet = document.createElement('div')
  Object.assign(sheet.style, {
    position: 'fixed', zIndex: '1000', left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px`,
    borderRadius: '5px', overflow: 'hidden', background: '#FCFCFD', boxShadow: '0 24px 60px -20px rgba(25,22,30,.45)', pointerEvents: 'none',
  })
  const pic = document.createElement('img')
  pic.src = img
  Object.assign(pic.style, { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left', display: 'block' })
  sheet.appendChild(pic)
  document.body.appendChild(sheet)

  const vw = window.innerWidth, vh = window.innerHeight
  const lift = Math.min(70, from.height * 0.9)
  const grow = sheet.animate(
    [
      { left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px`, borderRadius: '5px', rotate: '0deg' },
      { left: `${from.left}px`, top: `${from.top - lift}px`, width: `${from.width}px`, height: `${from.height}px`, borderRadius: '5px', rotate: '-4deg', offset: 0.3 },
      { left: '0px', top: '0px', width: `${vw}px`, height: `${vh}px`, borderRadius: '0px', rotate: '0deg' },
    ],
    { duration: 820, easing: 'cubic-bezier(.65,0,.25,1)', fill: 'forwards' },
  )
  // La captura se desvanece al final: queda una hoja en blanco del color de la página
  pic.animate([{ opacity: 1 }, { opacity: 1, offset: 0.55 }, { opacity: 0 }], { duration: 820, fill: 'forwards' })

  grow.finished.then(() => {
    go()
    // Espera a que la página del proyecto ya esté puesta para quitar la hoja
    const t0 = performance.now()
    const check = () => {
      if (location.pathname === href || performance.now() - t0 > 4000) {
        // La hoja tapa la página: se sube al inicio sin animación antes de mostrarla
        window.scrollTo({ top: 0, behavior: 'instant' })
        setTimeout(() => {
          sheet.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, easing: 'ease-out', fill: 'forwards' })
            .finished.then(() => sheet.remove())
        }, 180)
      } else requestAnimationFrame(check)
    }
    requestAnimationFrame(check)
  })
}

/**
 * Carpeta que lleva al proyecto: al pasar el cursor se abre la solapa y asoman las capturas;
 * al hacer clic, una hoja sale y se vuelve la página. `children` es lo que va sobre la solapa.
 */
export function FolderLink({ f, i = 0, label, className, children, after }: {
  f: Feature; i?: number; label: string; className?: string; children: ReactNode; after?: ReactNode
}) {
  const [p1, p2] = papers(f)
  const router = useRouter()
  const paperRef = useRef<HTMLImageElement>(null)
  const href = projectHref(f.id)

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Con teclas modificadoras (abrir en otra pestaña) o movimiento reducido, el enlace funciona normal
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !paperRef.current) return
    e.preventDefault()
    router.prefetch(href)
    openSheet(paperRef.current.getBoundingClientRect(), p1, href, () => router.push(href))
  }

  return (
    <Link href={href} onClick={onClick} onMouseEnter={() => router.prefetch(href)} className={`${fo.folder} ${className ?? ''}`} style={folderVars(f, i)} aria-label={label}>
      <span className={fo.box}>
        <span className={fo.back} />
        <span className={fo.tab} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {p2 && <img src={p2} alt="" className={fo.paper2} />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {p1 && <img ref={paperRef} src={p1} alt="" className={fo.paper1} data-folder-paper={f.id} />}
        <span className={fo.flap}>{children}</span>
      </span>
      {after}
    </Link>
  )
}

/** Al volver del proyecto, el home selecciona la carpeta de la que salió (lo lee WorkExplorer). */
export const RETURN_KEY = 'clk-folder-return'

const makeSheet = () => {
  const sheet = document.createElement('div')
  Object.assign(sheet.style, {
    position: 'fixed', zIndex: '1000', left: '0px', top: '0px', width: `${window.innerWidth}px`, height: `${window.innerHeight}px`,
    overflow: 'hidden', background: '#FCFCFD', boxShadow: '0 24px 60px -20px rgba(25,22,30,.45)', pointerEvents: 'none',
  })
  return sheet
}

/**
 * Salida del proyecto: la página se vuelve una hoja, regresa al home y se guarda en su carpeta
 * (la inversa de openSheet).
 */
function closeToFolder(id: string, img: string, go: () => void) {
  const sheet = makeSheet()
  const pic = document.createElement('img')
  pic.src = img
  Object.assign(pic.style, { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left', display: 'block', opacity: '0' })
  sheet.appendChild(pic)
  document.body.appendChild(sheet)
  // La hoja aparece encima de la página antes de cambiar de ruta
  sheet.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, fill: 'forwards' }).finished.then(() => {
    sessionStorage.setItem(RETURN_KEY, id)
    go()
    // Espera a que la carpeta esté en pantalla y quieta (el home corrige el scroll del ancla al cargar)
    const t0 = performance.now()
    let last = '', still = 0
    const find = () => {
      const target = location.pathname === '/' ? document.querySelector<HTMLElement>(`[data-folder-paper="${id}"]`) : null
      const r = target?.getBoundingClientRect()
      const key = r ? `${Math.round(r.left)},${Math.round(r.top)}` : ''
      still = key && key === last ? still + 1 : 0
      last = key
      if (r && still >= 8 && r.width) return fly(r)
      if (performance.now() - t0 > 5000) {
        sheet.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' }).finished.then(() => sheet.remove())
        sessionStorage.removeItem(RETURN_KEY)
        return
      }
      requestAnimationFrame(find)
    }
    requestAnimationFrame(find)
  })

  const fly = (to: DOMRect) => {
    const vw = window.innerWidth, vh = window.innerHeight
    const lift = Math.min(70, to.height * 0.9)
    sheet.animate(
      [
        { left: '0px', top: '0px', width: `${vw}px`, height: `${vh}px`, borderRadius: '0px', rotate: '0deg' },
        { left: `${to.left}px`, top: `${to.top - lift}px`, width: `${to.width}px`, height: `${to.height}px`, borderRadius: '5px', rotate: '-4deg', offset: 0.7 },
        { left: `${to.left}px`, top: `${to.top}px`, width: `${to.width}px`, height: `${to.height}px`, borderRadius: '5px', rotate: '0deg' },
      ],
      { duration: 820, easing: 'cubic-bezier(.65,0,.25,1)', fill: 'forwards' },
    ).finished.then(() => {
      sessionStorage.removeItem(RETURN_KEY)
      sheet.remove()
    })
    // Mientras se encoge, la hoja en blanco vuelve a ser la captura de la carpeta
    pic.animate([{ opacity: 0 }, { opacity: 1, offset: 0.45 }, { opacity: 1 }], { duration: 820, fill: 'forwards' })
  }
}

/** Botón redondo con una X: cierra el proyecto y la hoja regresa a su carpeta en el home. */
export function CloseLink({ className, label }: { className?: string; label: string }) {
  const router = useRouter()
  const path = usePathname()
  const id = path.startsWith('/proyecto/') ? path.split('/')[2] : ''
  const f = FEATURES.find(x => x.id === id)

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!f || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    e.preventDefault()
    closeToFolder(f.id, papers(f)[0], () => router.push('/#trabajo'))
  }

  return (
    <Link href="/#trabajo" onClick={onClick} className={className} aria-label={label}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    </Link>
  )
}

export { fo as folderStyles }
