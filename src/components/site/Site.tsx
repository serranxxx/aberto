'use client'

import Image from 'next/image'
import Link from 'next/link'
import { COPY } from '@/data/copy'
import type { Lang } from '@/data/types'
import { useLang } from './LangProvider'
import s from './site.module.css'

export const EMAIL = 'albserrano8@gmail.com'
export const PHONE = '+526145394836'

export const ctaHref = (lang: Lang) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(lang === 'es' ? 'Quiero agendar una llamada' : 'I’d like to book a call')}`

export const featureHref = (id: string) => `/feature/${id}`

export function Logo({ size }: { size: number }) {
  return <span className={s.logo} style={{ width: size, height: size }} aria-hidden />
}

export function SiteHeader() {
  const { lang, setLang } = useLang()
  const t = COPY[lang]
  const nav = [
    { href: '/#servicios', label: t.navServices },
    { href: '/#por-que', label: t.navWhy },
    { href: '/#trabajo', label: t.navWork },
    { href: '/#proceso', label: t.navProcess },
  ]

  return (
    <header className={s.header}>
      <div className={`${s.container} ${s.headerInner}`}>
        <Link href="/" className={s.brand}>
          <Logo size={22} />
          <span className={s.brandName}>Alberto Serrano</span>
        </Link>
        <nav className={s.nav}>
          {nav.map(n => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
        </nav>
        <div className={s.headerActions}>
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
          <a href="/#contacto" className={s.headerCta}>
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
          {t.ctaTitle} <span className={s.accent}>{t.ctaTitleAccent}</span>
        </h2>
        <p className={s.contactLead}>{t.ctaLead}</p>
        <div className={s.btnRow}>
          <a href={ctaHref(lang)} className={`${s.btn} ${s.btnLight}`}>{t.ctaMain} <span>→</span></a>
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

export function SiteFooter() {
  const { lang } = useLang()
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
