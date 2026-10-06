'use client'

import { useEffect, useRef, useState } from 'react'

const DURATION = 1600

/**
 * Progreso de 0 a 1 (con ease-out) que arranca cuando el elemento entra en pantalla.
 * Sirve para animar cifras como contador.
 */
export function useCountProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1)
      return
    }

    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const x = Math.min((now - start) / DURATION, 1)
        setProgress(1 - Math.pow(1 - x, 3))
        if (x < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.35 })

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return { ref, progress }
}

/** Separa "+9,019" / "86%" en prefijo, número y sufijo. */
export function parseStat(raw: string) {
  const m = raw.match(/^(\D*)([\d,.]+)(.*)$/)
  if (!m) return { prefix: '', target: NaN, suffix: '' }
  return { prefix: m[1], target: Number(m[2].replace(/,/g, '')), suffix: m[3] }
}

export const formatCount = (target: number, progress: number) =>
  Math.round(target * progress).toLocaleString('en-US')
