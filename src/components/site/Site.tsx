'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { COPY } from '@/data/copy'
import { useLang } from './LangProvider'
import s from './site.module.css'

export const EMAIL = 'albserrano8@gmail.com'
export const PHONE = '+526145394836'

// Agenda de Google Calendar para las llamadas
export const BOOKING_URL = 'https://calendar.app.google/NF63TfpyQXEpVgFH7'

export { projectHref } from '@/data/routes'

export function Logo({ size }: { size: number }) {
  return <span className={s.logo} style={{ width: size, height: size }} aria-hidden />
}

const SPY_IDS = ['servicios', 'por-que', 'trabajo', 'proceso', 'contacto']

/** Sección activa: la última cuyo borde superior ya pasó el 35% del viewport (ninguna en Hero y Contacto). */
function useScrollSpy(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    const onSpy = () => {
      const mid = window.innerHeight * 0.35
      let cur: string | null = null
      for (const id of SPY_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= mid) cur = id
      }
      setActive(cur === 'contacto' ? null : cur)
    }
    onSpy()
    window.addEventListener('scroll', onSpy, { passive: true })
    window.addEventListener('resize', onSpy)
    return () => {
      window.removeEventListener('scroll', onSpy)
      window.removeEventListener('resize', onSpy)
    }
  }, [enabled])

  return active
}

function LangSwitch() {
  const { lang, setLang } = useLang()
  return (
    <div className={s.langSwitch}>
      {(['es', 'en'] as const).map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`${s.langBtn} ${lang === l ? s.langBtnOn : ''}`}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export function SiteHeader({ variant = 'home' }: { variant?: 'home' | 'feature' | 'project' }) {
  const { lang } = useLang()
  const t = COPY[lang]
  const active = useScrollSpy(variant === 'home')
  const nav = [
    { id: 'servicios', label: t.navServices },
    { id: 'por-que', label: t.navWhy },
    { id: 'trabajo', label: t.navWork },
    { id: 'proceso', label: t.navProcess },
  ]

  if (variant === 'project') {
    return (
      <header className={s.header}>
        <div className={`${s.container} ${s.headerInner} ${s.headerWide}`}>
          <Link href="/" className={s.brand}>
            <span className={s.logoTile}>
              <Image src="/logo-cursor.svg" alt="" width={20} height={20} unoptimized />
            </span>
            <span className={s.brandName}>Alberto Serrano</span>
          </Link>
          <Link href="/#trabajo" className={s.projectBack}>{lang === 'es' ? '← Proyectos' : '← Projects'}</Link>
        </div>
      </header>
    )
  }

  if (variant === 'feature') {
    return (
      <header className={s.header}>
        <div className={`${s.container} ${s.headerInner}`}>
          <Link href="/" className={s.brand}>
            <Image src="/logo-cursor.svg" alt="" width={22} height={22} unoptimized />
            <span className={s.brandFeature}>Alberto Serrano · {t.discipline}</span>
          </Link>
          <div className={s.headerActions} style={{ gap: 24 }}>
            <Link href="/#trabajo" className={s.backLink}>← Features</Link>
            <LangSwitch />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className={s.header}>
      <div className={`${s.container} ${s.headerInner}`}>
        <Link href="/#top" className={s.brand}>
          <span className={s.wordmark}>Clickable</span>
        </Link>
        <nav className={s.nav}>
          {nav.map(n => (
            <Link
              key={n.id}
              href={`/#${n.id}`}
              className={active === n.id ? s.navOn : undefined}
              aria-current={active === n.id ? 'location' : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className={s.headerActions}>
          <LangSwitch />
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={s.headerCta}>
            <span className={s.ctaLong}>{t.ctaShort}</span>
            <span className={s.ctaCompact}>{lang === 'es' ? 'Agendar' : 'Book'}</span>
          </a>
        </div>
      </div>
    </header>
  )
}

export function ContactSection() {
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <section id="contacto" className={s.contact}>
      <div className={`${s.container} ${s.contactInner}`}>
        <div className={s.bar} />
        <h2 className={s.contactTitle}>
          {t.ctaTitle} <span className={`${s.script} ${s.contactAccent}`}>{t.ctaTitleAccent}</span>
        </h2>
        <p className={s.contactLead}>{t.ctaLead}</p>
        <div className={s.btnRow}>
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={`${s.btn} ${s.btnLight}`}>{t.ctaMain} <span>→</span></a>
          <a href={`https://wa.me/${PHONE.slice(1)}`} target="_blank" rel="noreferrer" className={`${s.btn} ${s.btnGhostDark}`}>WhatsApp</a>
        </div>
        <div className={s.contactLinks}>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href="https://www.linkedin.com/in/albserranog" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={`tel:${PHONE}`}>614 539 4836</a>
        </div>
      </div>
    </section>
  )
}

export function SiteFooter({ variant = 'home' }: { variant?: 'home' | 'feature' }) {
  const { lang } = useLang()
  if (variant === 'feature') {
    return (
      <footer className={s.footerLight}>
        <div className={`${s.container} ${s.footerInner}`}>
          <span>Alberto Serrano · {COPY[lang].discipline}</span>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </footer>
    )
  }
  return (
    <footer className={s.footer}>
      <div className={`${s.container} ${s.footerInner}`}>
        <span>Alberto Serrano · {COPY[lang].discipline}</span>
        <span>Chihuahua, México · {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}

/** Captura de una feature, o un placeholder mientras no exista. */
export function Shot({ src, alt, placeholder, sizes, priority, className }: {
  src: string | null
  alt: string
  placeholder: string
  sizes: string
  priority?: boolean
  className?: string
}) {
  return (
    <div className={`${s.shot} ${className ?? ''}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
      ) : (
        <div className={s.shotPlaceholder}>
          <Logo size={28} />
          <span>{placeholder}</span>
        </div>
      )}
    </div>
  )
}

export { s as siteStyles }
