'use client'

import { useEffect, useRef } from 'react'
import type { Lang } from '@/data/types'
import b from './beautiful.module.css'

const CURSOR_PATH = 'M5.4 4.25 18.9 9.6Q20 10.1 19.5 11.1Q19.2 11.7 18.5 11.8L14.4 13.1Q13.6 13.4 13.3 14.2L11.5 19.3Q11.1 20.2 10.3 19.6Q10 19.3 9.9 18.9L4.15 5.6Q3.8 4.6 4.5 4.25Q4.9 4.05 5.4 4.25Z'

/*
 * Cada cursor recorre waypoints en % del bloque de texto ("x y").
 * Se expande desde el centro: 21% en escritorio, 33% en móvil (< 560px).
 */
const CURSORS = [
  {
    color: '#FF6B5B',
    es: 'Diseñando flujos', en: 'Designing flows',
    path: '-17.5% -30%|10% -42.5%|35% -2.5%|11.5% 8%|-5% 27.5%|-22.5% -5%',
  },
  {
    color: '#D577D9',
    es: 'Escribiendo código', en: 'Writing code',
    path: '70% 100%|42.5% 117.5%|10% 107.5%|-10% 82.5%|25% 72.5%|55% 85%',
  },
  {
    color: '#AF86F7',
    es: 'Probando con usuarios', en: 'Testing with users',
    path: '65% -37.5%|87.5% -22.5%|95% 22.5%|78.5% -6%|55% -7.5%|70% -47.5%',
  },
]

const parse = (p: string) => p.split('|').map(pt => pt.split(' ') as [string, string])

/** "Software should / feel beautiful" con cursores tipo Figma que se pasean alrededor. */
export function SoftwareBeautiful({ lang }: { lang: Lang }) {
  const cursorsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const mobile = window.innerWidth < 560
    const anims: Animation[] = []

    cursorsRef.current.forEach((el, i) => {
      if (!el) return
      const spread = mobile ? 1.331 : 1.21
      const at = (v: string) => `${50 + (parseFloat(v) - 50) * spread}%`
      const pts = parse(CURSORS[i].path)
      const kf = [...pts, pts[0]].map(([x, y]) => ({ left: at(x), top: at(y), easing: 'cubic-bezier(.45,0,.25,1)' }))
      anims.push(el.animate(kf, { duration: mobile ? 10000 + i * 1500 : 16000 + i * 3000, delay: -i * 2500, iterations: Infinity, easing: 'linear' }))
      // Vaivén vertical encima del recorrido
      anims.push(el.animate([{ translate: '0 0' }, { translate: '0 -6px' }, { translate: '0 0' }], {
        duration: 2600 + i * 400, iterations: Infinity, easing: 'ease-in-out',
      }))
    })

    return () => anims.forEach(a => a.cancel())
  }, [])

  return (
    <section className={b.section} aria-label="Software should feel beautiful">
      <div className={b.inner}>
        <div className={b.block}>
          {CURSORS.map((c, i) => {
            const [left, top] = parse(c.path)[0]
            return (
              <div
                key={c.color}
                ref={el => { cursorsRef.current[i] = el }}
                className={b.cursor}
                style={{ left, top }}
                aria-hidden
              >
                <svg width="44" height="44" viewBox="-2 -2 28 28" fill="none" strokeLinecap="round" strokeLinejoin="round" className={b.arrow}>
                  <path d={CURSOR_PATH} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="5.5" />
                  <path d={CURSOR_PATH} fill={c.color} stroke={c.color} strokeWidth="1.6" />
                </svg>
                <span className={b.tag} style={{ background: c.color }}>{c[lang]}</span>
              </div>
            )
          })}
          <span className={b.title}>Software should</span>
          <span className={b.script}>feel beautiful</span>
        </div>
      </div>
    </section>
  )
}
