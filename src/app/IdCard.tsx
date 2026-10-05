'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Logo, siteStyles as s } from '@/components/site/Site'
import c from './idcard.module.css'

const MAX_TILT = 9
const EASE = 0.12

/**
 * Tarjeta de presentación: entra al aparecer en pantalla, flota en reposo
 * y se inclina siguiendo al cursor con capas en parallax.
 */
export function IdCard({ discipline }: { discipline: string }) {
  const tiltRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  // Entrada al hacer scroll
  useEffect(() => {
    const el = tiltRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Inclinación con el cursor, suavizada para que no se sienta brusca
  useEffect(() => {
    const el = tiltRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover)').matches) return

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let frame = 0

    const loop = () => {
      current.x += (target.x - current.x) * EASE
      current.y += (target.y - current.y) * EASE
      el.style.setProperty('--px', current.x.toFixed(4))
      el.style.setProperty('--py', current.y.toFixed(4))
      const settled = Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001
      frame = settled ? 0 : requestAnimationFrame(loop)
    }
    const kick = () => { if (!frame) frame = requestAnimationFrame(loop) }

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2
      kick()
    }
    const onLeave = () => {
      target.x = 0
      target.y = 0
      kick()
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className={c.wrap}>
      <div
        ref={tiltRef}
        className={`${c.tilt} ${visible ? c.visible : ''}`}
        style={{ '--max-tilt': `${MAX_TILT}deg` } as React.CSSProperties}
      >
        <div className={c.card}>
          <div className={c.disc} />
          <div className={c.ring} />
          <div className={c.avatarLayer}>
            <Image src="/avatar.png" alt="Alberto Serrano" width={470} height={701} className={c.avatar} sizes="250px" />
          </div>
          <div className={c.body}>
            <div className={c.top}>
              <Logo size={26} />
              <span className={c.bar} />
            </div>
            <div className={c.info}>
              <span className={c.name}>Alberto Serrano</span>
              <span className={`${s.label} ${c.muted}`}>{discipline} · Chihuahua, México</span>
              <span className={c.contact} style={{ marginTop: 10 }}>albserrano8@gmail.com</span>
              <span className={c.contact}>+52 614 539 4836</span>
            </div>
          </div>
          <div className={c.glare} />
        </div>
      </div>
    </div>
  )
}
