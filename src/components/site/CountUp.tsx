'use client'

import { useEffect, useRef, useState } from 'react'

const DURATION = 1600

/**
 * Anima un valor como "+9,019" o "30+" desde 0 cuando entra en pantalla.
 * Si el valor no tiene número (p. ej. "Millones") se muestra tal cual.
 */
export function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\D*)([\d,.]+)(.*)$/)
  const target = match ? Number(match[2].replace(/,/g, '')) : NaN
  const ref = useRef<HTMLSpanElement>(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || Number.isNaN(target)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(target)
      return
    }

    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / DURATION, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setCurrent(Math.round(target * eased))
        if (p < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.4 })

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target])

  if (!match || Number.isNaN(target)) return <>{value}</>

  const [, prefix, , suffix] = match
  return (
    // El valor final invisible reserva el ancho para que el contador no mueva el layout
    <span ref={ref} style={{ display: 'inline-grid' }} aria-label={value}>
      <span aria-hidden style={{ gridArea: '1 / 1', visibility: 'hidden' }}>{value}</span>
      <span aria-hidden style={{ gridArea: '1 / 1' }}>
        {prefix}{current.toLocaleString('en-US')}{suffix}
      </span>
    </span>
  )
}
