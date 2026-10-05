'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { COPY } from '@/data/copy'
import { FEATURED, FEATURE_ORDER, FEATURES, PRODUCTS, THEMES } from '@/data/features'
import type { Feature, Lang } from '@/data/types'
import { useLang } from '@/components/site/LangProvider'
import { CountUp } from '@/components/site/CountUp'
import {
  ContactSection, Shot, SiteFooter, SiteHeader, ctaHref, featureHref, siteStyles as s,
} from '@/components/site/Site'
import { IdCard } from './IdCard'
import h from './home.module.css'

const byId = Object.fromEntries(FEATURES.map(f => [f.id, f]))
const pad = (i: number) => String(i + 1).padStart(2, '0')

const card = (f: Feature, lang: Lang) => ({
  id: f.id,
  img: f.img,
  productName: PRODUCTS[f.product].name,
  ...f[lang],
})

export default function HomeView() {
  const { lang } = useLang()
  const t = COPY[lang]
  const [themeId, setThemeId] = useState('all')
  const rail = useRef<HTMLDivElement>(null)

  const theme = THEMES.find(x => x.id === themeId) ?? THEMES[0]
  const featured = FEATURED.map(id => byId[id]).filter(Boolean).map(f => card(f, lang))
  const railItems = FEATURE_ORDER.map(id => byId[id])
    .filter(f => f && (theme.ids ? theme.ids.includes(f.id) : !FEATURED.includes(f.id)))
    .map(f => card(f, lang))
  const stats = PRODUCTS.iattend.stats ?? []

  const scrollRail = (d: number) => {
    const el = rail.current
    if (el) el.scrollBy({ left: d * el.clientWidth * 0.8 })
  }

  const pickTheme = (id: string) => {
    setThemeId(id)
    if (rail.current) rail.current.scrollLeft = 0
  }

  return (
    <div className={h.page}>
      <SiteHeader />

      {/* Hero */}
      <section id="top" className={`${s.container} ${h.hero}`}>
        <div className={s.bar} />
        <div className={`${s.label} ${h.heroLabel}`}>{t.heroLabel}</div>
        <h1 className={h.heroTitle}>
          {t.heroA} <span className={s.accent}>{t.heroAccent}</span>
        </h1>
        <p className={h.heroLead}>{t.heroLead}</p>
        <div className={s.btnRow}>
          <a href={ctaHref(lang)} className={`${s.btn} ${s.btnDark}`}>{t.ctaMain} <span>→</span></a>
          <a href="#servicios" className={`${s.btn} ${s.btnOutline}`}>{t.ctaSecondary}</a>
        </div>
      </section>

      {/* ¿Te suena? */}
      <section className={h.tinted}>
        <div className={`${s.container} ${h.block}`}>
          <div className={`${s.label} ${h.sectionLabel}`}>{t.painLabel}</div>
          <h2 className={s.h2} style={{ maxWidth: '22ch' }}>{t.painTitle}</h2>
          <div className={h.pains}>
            {t.pains.map(p => (
              <div key={p} className={h.pain}>
                <span className={h.quote}>“</span>
                <span className={h.painText}>{p}</span>
              </div>
            ))}
          </div>
          <p className={h.painClose}>
            {t.painClose} <span className={s.accent}>{t.painCloseAccent}</span>
          </p>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className={`${s.container} ${h.block}`}>
        <div className={`${s.label} ${h.sectionLabel}`}>{t.servicesLabel}</div>
        <h2 className={s.h2} style={{ maxWidth: '20ch' }}>{t.servicesTitle}</h2>
        <p className={s.lead} style={{ maxWidth: '48ch' }}>{t.servicesLead}</p>
        <div className={h.services}>
          {t.services.map((sv, i) => (
            <div key={sv.k} className={h.service}>
              <div className={h.col}>
                <span className={s.label}>{pad(i)}</span>
                <span className={h.serviceName}>{sv.k}</span>
              </div>
              <div className={h.col}>
                <span className={s.label}>{t.forYou}</span>
                <span className={h.serviceText}>{sv.who}</span>
              </div>
              <div className={h.col}>
                <span className={s.label}>{t.youGet}</span>
                <span className={h.serviceText}>{sv.get}</span>
                <Link href={featureHref(sv.ex)} className={h.inlineLink}>{sv.exLabel} →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Por qué yo */}
      <section id="por-que" className={h.dark}>
        <div className={`${s.container} ${h.block}`}>
          <div className={`${s.label} ${h.sectionLabel} ${h.labelOnDark}`}>{t.whyLabel}</div>
          <h2 className={`${s.h2} ${h.h2OnDark}`} style={{ maxWidth: '22ch' }}>{t.whyTitle}</h2>
          <div className={h.why}>
            {t.why.map(w => (
              <div key={w.n} className={h.whyItem}>
                <span className={`${s.label} ${h.labelOnDark}`}>{w.n}</span>
                <h3 className={h.whyTitle}>{w.k}</h3>
                <p className={h.whyText}>{w.v}</p>
                <span className={`${s.label} ${h.labelOnDark}`} style={{ marginTop: 4 }}>{w.proof}</span>
              </div>
            ))}
          </div>

          <div className={h.statsCard}>
            <div className={h.statsIntro}>
              <div className={h.col} style={{ gap: 14 }}>
                <span className={h.badge}>{t.statsBadge}</span>
                <span className={h.statsName}>I attend</span>
                <p className={h.whyText} style={{ maxWidth: '34ch' }}>{t.statsIntro}</p>
              </div>
              <Link href={featureHref('editor')} className={h.statsLink}>{t.statsLink} →</Link>
            </div>
            <div className={h.statsGrid}>
              {stats.map(st => (
                <div key={st.v} className={h.stat}>
                  <span className={`${s.accent} ${h.statValue}`}><CountUp value={st.v} /></span>
                  <span className={`${s.label} ${h.labelOnDark}`}>{st[lang]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quién soy */}
      <section className={`${s.container} ${h.block}`}>
        <div className={h.about}>
          <IdCard discipline={t.discipline} />
          <div className={h.col} style={{ gap: 20 }}>
            <div className={s.label}>{t.aboutLabel}</div>
            <h2 className={s.h2} style={{ maxWidth: '18ch' }}>{t.aboutTitle}</h2>
            <p className={h.aboutP}>{t.aboutP1}</p>
            <p className={h.aboutP} style={{ color: 'var(--ink-3)' }}>{t.aboutP2}</p>
            <div className={h.facts}>
              {t.aboutFacts.map(x => (
                <div key={x.k} className={h.fact}>
                  <span className={s.label} style={{ paddingTop: 2 }}>{x.k}</span>
                  <span>{x.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trabajo */}
      <section id="trabajo" className={s.container}>
        <div className={h.workHead}>
          <div className={`${s.label} ${h.sectionLabel}`}>{t.workLabel}</div>
          <h2 className={s.h2} style={{ maxWidth: '22ch' }}>{t.workTitle}</h2>
          <p className={s.lead} style={{ maxWidth: '50ch' }}>{t.workLead}</p>
        </div>
        <div className={h.featured}>
          {featured.map((c, i) => (
            <Link key={c.id} href={featureHref(c.id)} className={`${h.featuredItem} ${i % 2 ? h.reverse : ''}`}>
              <div className={h.featuredShot}>
                <Shot src={c.img} alt={c.caption} placeholder={t.noImg} sizes="(max-width: 900px) 100vw, 660px" className={h.zoomable} />
              </div>
              <div className={h.featuredText}>
                <span className={s.label}>{c.productName} · {c.tag}</span>
                <span className={h.featuredTitle}>
                  {c.titleA} <span className={s.accent}>{c.accent}</span>
                </span>
                <span className={h.featuredLead}>{c.lead}</span>
                <span className={h.inlineLink} style={{ marginTop: 8 }}>{t.seeFeature} →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className={h.explore}>
          <div className={h.col} style={{ gap: 16 }}>
            <h3 className={h.exploreTitle}>{t.exploreTitle}</h3>
            <div className={h.chips}>
              {THEMES.map(x => (
                <button
                  key={x.id}
                  onClick={() => pickTheme(x.id)}
                  className={`${h.chip} ${x.id === theme.id ? h.chipOn : ''}`}
                  aria-pressed={x.id === theme.id}
                >
                  {x[lang]}
                </button>
              ))}
            </div>
          </div>
          <div className={h.arrows}>
            <button onClick={() => scrollRail(-1)} aria-label={lang === 'es' ? 'Anterior' : 'Previous'} className={h.arrow}>←</button>
            <button onClick={() => scrollRail(1)} aria-label={lang === 'es' ? 'Siguiente' : 'Next'} className={h.arrow}>→</button>
          </div>
        </div>
      </section>
      <div ref={rail} className={h.rail}>
        {railItems.map(c => (
          <Link key={c.id} href={featureHref(c.id)} className={h.railItem}>
            <div className={h.railShot}>
              <Shot src={c.img} alt={c.caption} placeholder={t.noImg} sizes="300px" className={h.zoomable} />
            </div>
            <span className={s.label}>{c.productName} · {c.tag}</span>
            <span className={h.railTitle}>{c.titleA} {c.accent}</span>
          </Link>
        ))}
      </div>

      {/* Proceso */}
      <section id="proceso" className={`${s.container} ${h.block}`}>
        <div className={`${s.label} ${h.sectionLabel}`}>{t.processLabel}</div>
        <h2 className={s.h2} style={{ maxWidth: '20ch' }}>{t.processTitle}</h2>
        <div className={h.steps}>
          {t.steps.map((st, i, a) => (
            <div key={st.k} className={`${h.step} ${i === a.length - 1 ? h.stepLast : ''}`}>
              <span className={h.stepN}>{pad(i)}</span>
              <span className={h.stepTitle}>{st.k}</span>
              <span className={h.stepText}>{st.v}</span>
            </div>
          ))}
        </div>
        <div className={h.notFor}>
          <span className={h.notForTitle}>{t.notForTitle}</span>
          <p className={h.notForText}>{t.notFor}</p>
        </div>
      </section>

      <ContactSection />
      <SiteFooter />
    </div>
  )
}
