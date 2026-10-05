'use client'

import { useEffect, useRef, useState } from 'react'
import c from './why.module.css'

const STORY_MS = 7000

type Reason = { n: string; k: string; v: string; proof: string }

/**
 * Razones de "Por qué yo" en formato stories: avanzan solas, se pausan con el
 * cursor encima o fuera de pantalla, y se navegan tocando la historia
 * (tercio izquierdo regresa, el resto avanza) o las pestañas.
 */
export function WhyStories({ reasons }: { reasons: readonly Reason[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  // Cambia en cada navegación para reiniciar la barra aunque se repita el índice
  const [run, setRun] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [inView, setInView] = useState(false)

  const go = (i: number) => {
    setCurrent((i + reasons.length) % reasons.length)
    setRun(r => r + 1)
  }

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const paused = hovered || !inView
  const r = reasons[current]

  const onStoryClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    go(current + (e.clientX - rect.left < rect.width / 3 ? -1 : 1))
  }

  return (
    <div
      ref={rootRef}
      className={`${c.stories} ${paused ? c.paused : ''}`}
      style={{ '--story-ms': `${STORY_MS}ms` } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={c.tabs} role="tablist">
        {reasons.map((x, i) => (
          <button
            key={x.n}
            type="button"
            role="tab"
            aria-selected={i === current}
            aria-label={x.k}
            className={`${c.tab} ${i < current ? c.past : ''} ${i === current ? c.current : ''}`}
            onClick={() => go(i)}
          >
            <span className={c.track}>
              <span
                key={i === current ? `run-${run}` : 'idle'}
                className={c.fill}
                onAnimationEnd={i === current ? () => go(current + 1) : undefined}
              />
            </span>
            <span className={c.tabLabel}>
              <span>{x.n}</span>
              <span className={c.tabTitle}>{x.k}</span>
            </span>
          </button>
        ))}
      </div>

      <div key={`${current}-${r.k}`} className={c.story} onClick={onStoryClick} aria-live="polite">
        <div className={c.head}>
          <span className={c.n}>{r.n}</span>
          <h3 className={c.k}>{r.k}</h3>
        </div>
        <div className={c.body}>
          <p className={c.v}>{r.v}</p>
          <span className={c.proof}>{r.proof}</span>
        </div>
      </div>
    </div>
  )
}
