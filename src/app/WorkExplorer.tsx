'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { COPY } from '@/data/copy'
import { FEATURED, FEATURE_ORDER, FEATURES, PRODUCTS, THEMES } from '@/data/features'
import type { Feature, Lang } from '@/data/types'
import { Shot, featureHref, siteStyles as s } from '@/components/site/Site'
import w from './work.module.css'

const byId = Object.fromEntries(FEATURES.map(f => [f.id, f]))
// Destacadas primero, luego el resto en el orden del home
const ALL = [...FEATURED, ...FEATURE_ORDER.filter(id => !FEATURED.includes(id))].map(id => byId[id]).filter(Boolean)

const WHEEL_THROTTLE = 260
const OUT_MS = 180

type Phase = 'in' | 'out' | 'pre'

const view = (f: Feature, lang: Lang) => ({
  id: f.id,
  img: f.img,
  productName: PRODUCTS[f.product].name,
  isTop: FEATURED.includes(f.id),
  ...f[lang],
})

/**
 * Explorador de trabajo: filtros por tema, una rueda vertical para elegir
 * (escritorio) o una tira horizontal (móvil), y una tarjeta con la feature elegida.
 */
export function WorkExplorer({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const [themeId, setThemeId] = useState('all')
  const [selId, setSelId] = useState<string | null>(null)
  const [shownId, setShownId] = useState<string | null>(null)
  const [phase, setPhase] = useState<Phase>('in')
  const wheelRef = useRef<HTMLDivElement>(null)
  const timers = useRef<{ out?: ReturnType<typeof setTimeout>; raf?: number }>({})

  const theme = THEMES.find(x => x.id === themeId) ?? THEMES[0]
  const list = ALL.filter(f => !theme.ids || theme.ids.includes(f.id))
  const n = list.length
  const idx = Math.max(0, list.findIndex(f => f.id === selId))
  const shown = list.find(f => f.id === shownId) ?? list[idx]
  const sel = shown ? view(shown, lang) : null

  // La tarjeta sale, cambia de contenido y vuelve a entrar
  const go = (i: number) => {
    if (!n) return
    const next = list[((i % n) + n) % n]
    if (next.id === list[idx]?.id) return
    setSelId(next.id)
    setPhase('out')
    clearTimeout(timers.current.out)
    cancelAnimationFrame(timers.current.raf ?? 0)
    timers.current.out = setTimeout(() => {
      setShownId(next.id)
      setPhase('pre')
      timers.current.raf = requestAnimationFrame(() => {
        timers.current.raf = requestAnimationFrame(() => setPhase('in'))
      })
    }, OUT_MS)
  }

  const goRef = useRef(go)
  goRef.current = go
  const idxRef = useRef(idx)
  idxRef.current = idx

  const pickTheme = (id: string) => {
    clearTimeout(timers.current.out)
    setThemeId(id)
    setSelId(null)
    setShownId(null)
    setPhase('in')
  }

  // La rueda del mouse mueve la selección (el listener debe ser no pasivo para frenar el scroll)
  useEffect(() => {
    const el = wheelRef.current
    if (!el) return
    let last = 0
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      if (now - last < WHEEL_THROTTLE || Math.abs(e.deltaY) < 4) return
      last = now
      goRef.current(idxRef.current + (e.deltaY > 0 ? 1 : -1))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  useEffect(() => {
    const t = timers.current
    return () => {
      clearTimeout(t.out)
      cancelAnimationFrame(t.raf ?? 0)
    }
  }, [])

  const touchY = useRef(0)

  return (
    <>
      <div className={w.chips}>
        {THEMES.map(x => {
          const on = x.id === theme.id
          const count = x.ids ? x.ids.filter(id => byId[id]).length : FEATURES.length
          return (
            <button key={x.id} onClick={() => pickTheme(x.id)} className={`${w.chip} ${on ? w.chipOn : ''}`} aria-pressed={on}>
              {x[lang]}
              <span className={w.count}>{count}</span>
            </button>
          )
        })}
      </div>

      <div className={w.layout}>
        {/* Rueda (escritorio) */}
        <div
          ref={wheelRef}
          className={w.wheel}
          tabIndex={0}
          aria-label={t.exploreTitle}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') { e.preventDefault(); go(idx + 1) }
            if (e.key === 'ArrowUp') { e.preventDefault(); go(idx - 1) }
          }}
          onTouchStart={e => { touchY.current = e.touches[0].clientY }}
          onTouchEnd={e => {
            const dy = e.changedTouches[0].clientY - touchY.current
            if (Math.abs(dy) > 30) go(idx + (dy < 0 ? 1 : -1))
          }}
        >
          {list.map((f, i) => {
            let d0 = ((i - idx) % n + n) % n
            if (d0 > n / 2) d0 -= n
            const far = Math.abs(d0) > 3
            const d = Math.max(-4, Math.min(4, d0))
            const a = Math.abs(d)
            const on = d === 0
            const c = view(f, lang)
            return (
              <button
                key={f.id}
                tabIndex={-1}
                onClick={() => go(i)}
                className={`${w.wheelItem} ${on ? w.wheelOn : ''}`}
                style={{
                  width: `calc(${on ? 100 : 100 - a * 6}% - 80px)`,
                  height: on ? 124 : 72,
                  transform: `translate(-50%, calc(-50% + ${on ? 0 : Math.sign(d) * (106 + (a - 1) * 76)}px)) scale(${on ? 1 : 1 - a * 0.03})`,
                  zIndex: 10 - a,
                  opacity: far ? 0 : 1,
                  pointerEvents: far ? 'none' : 'auto',
                }}
              >
                <span className={w.wheelContent} style={{ opacity: on ? 1 : far ? 0 : Math.max(0.35, 1 - a * 0.22) }}>
                  <span className={w.meta}>
                    {c.productName} · {c.tag}
                    {c.isTop && <span className={w.dot} />}
                  </span>
                  <span className={w.wheelTitle}>{c.titleA} {c.accent}</span>
                  {on && <span className={w.wheelLead}>{c.lead}</span>}
                </span>
              </button>
            )
          })}
        </div>

        {/* Tarjeta de la feature elegida */}
        {sel && (
          <Link href={featureHref(sel.id)} className={w.card} data-phase={phase}>
            <div className={w.media}>
              <div className={w.mediaInner}>
                <Shot src={sel.img} alt={sel.caption} placeholder={t.noImg} sizes="(max-width: 760px) 100vw, 560px" className={w.shot} />
              </div>
              <div className={w.fade} />
              <span className={w.badge}>{sel.productName} · {sel.tag}</span>
            </div>
            <div className={w.cardBody}>
              <span className={w.cardTitle}>
                {sel.titleA} <span className={s.accent}>{sel.accent}</span>
              </span>
              <span className={w.cardLead}>{sel.lead}</span>
              <div className={w.cardFoot}>
                <div className={w.solves}>
                  <span className={w.solvesLabel}>{t.solvesLabel}</span>
                  <span className={w.solvesText}>{sel.solves || sel.what}</span>
                </div>
                <span className={w.go} aria-label={t.seeFeature}>→</span>
              </div>
            </div>
          </Link>
        )}

        {/* Tira de selección (móvil) */}
        <div className={w.strip}>
          {list.map((f, i) => {
            const c = view(f, lang)
            const on = i === idx
            return (
              <button key={f.id} onClick={() => go(i)} className={`${w.stripItem} ${on ? w.stripOn : ''}`} aria-pressed={on}>
                <span className={w.meta}>
                  {c.productName} · {c.tag}
                  {c.isTop && <span className={w.dot} />}
                </span>
                <span className={w.stripTitle}>{c.titleA} {c.accent}</span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
