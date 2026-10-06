'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { COPY } from '@/data/copy'
import { PRODUCTS } from '@/data/features'
import type { Lang } from '@/data/types'
import { useLang } from '@/components/site/LangProvider'
import { formatCount, parseStat, useCountProgress } from '@/components/site/CountUp'
import {
  ContactSection, SiteFooter, SiteHeader, ctaHref, featureHref, siteStyles as s,
} from '@/components/site/Site'
import { WhyStories } from './WhyStories'
import { WorkExplorer } from './WorkExplorer'
import h from './home.module.css'

const pad = (i: number) => String(i + 1).padStart(2, '0')

export default function HomeView() {
  const { lang } = useLang()
  const t = COPY[lang]
  const [openService, setOpenService] = useState<number | null>(0)

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
        <div className={`${s.container} ${h.painBlock}`}>
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
          {t.services.map((sv, i) => {
            const open = openService === i
            return (
              <div key={sv.k} className={`${h.service} ${open ? h.serviceOpen : ''}`}>
                <button
                  className={h.serviceHead}
                  onClick={() => setOpenService(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`servicio-${i}`}
                >
                  <span className={`${s.label} ${h.serviceN}`}>{pad(i)}</span>
                  <span className={h.serviceName}>{sv.k}</span>
                  <span className={h.serviceIcon} aria-hidden>
                    <span />
                    <span />
                  </span>
                </button>
                <div id={`servicio-${i}`} className={h.serviceBody}>
                  <div className={h.serviceClip}>
                    <div className={h.serviceGrid}>
                      <div className={h.col}>
                        <span className={s.label}>{t.forYou}</span>
                        <span className={h.serviceText}>{sv.who}</span>
                      </div>
                      <div className={h.col}>
                        <span className={s.label}>{t.youGet}</span>
                        <span className={h.serviceText}>{sv.get}</span>
                        <Link href={featureHref(sv.ex)} className={h.inlineLink} tabIndex={open ? 0 : -1}>{sv.exLabel} →</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Por qué yo */}
      <section id="por-que" className={h.dark}>
        <div className={`${s.container} ${h.whyBlock}`}>
          <div className={`${s.label} ${h.sectionLabel} ${h.labelOnDark}`}>{t.whyLabel}</div>
          <h2 className={`${s.h2} ${h.h2OnDark}`} style={{ maxWidth: '22ch' }}>{t.whyTitle}</h2>
          <WhyStories reasons={t.why} />
          <ProofStats lang={lang} />
        </div>
      </section>

      {/* Quién soy */}
      <section className={`${s.container} ${h.block}`}>
        <div className={h.about}>
          <div className={h.aboutHead}>
            <div className={h.avatar}>
              <div className={h.avatarDisc} />
              <Image src="/avatar.png" alt={lang === 'es' ? 'Memoji de Alberto Serrano' : 'Alberto Serrano’s memoji'} width={470} height={701} sizes="170px" className={h.avatarImg} />
            </div>
            <div className={h.aboutTitleWrap}>
              <span className={s.label}>{t.aboutLabel}</span>
              <h2 className={h.aboutTitle}>
                {t.aboutTitle}
                <span className={`${s.accent} ${h.aboutAccent}`}>{t.aboutAccent}</span>
              </h2>
            </div>
          </div>
          <div className={h.aboutText}>
            <p className={h.aboutP}>{t.aboutP1}</p>
            <p className={h.aboutP} style={{ color: 'var(--ink-3)' }}>{t.aboutP2}</p>
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
        <WorkExplorer lang={lang} />
      </section>

      {/* Proceso */}
      <section id="proceso" className={`${s.container} ${h.block}`}>
        <div className={`${s.label} ${h.sectionLabel}`}>{t.processLabel}</div>
        <h2 className={s.h2} style={{ maxWidth: '20ch' }}>{t.processTitle}</h2>
        <ol className={h.timeline}>
          {t.steps.map((st, i) => (
            <li key={st.k} className={h.step}>
              <span className={h.stepDot} />
              <div className={h.stepText}>
                <span className={h.stepHead}>
                  <span className={s.label}>{pad(i)}</span>
                  <span className={h.stepTitle}>{st.k}</span>
                </span>
                <span className={h.stepBody}>{st.v}</span>
              </div>
            </li>
          ))}
        </ol>
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

/** Cifras de I attend: la de porcentaje va en grande y el resto en lista, todas con contador. */
function ProofStats({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const { ref, progress } = useCountProgress<HTMLDivElement>()
  const stats = (PRODUCTS.iattend.stats ?? []).map(x => ({
    ...parseStat(x.v),
    label: x[lang],
    note: (lang === 'es' ? x.noteEs : x.noteEn) ?? '',
  }))
  const hero = stats.find(x => x.suffix) ?? stats[0]
  const rest = stats.filter(x => x !== hero)

  return (
    <div className={h.proof}>
      <div className={h.proofHead}>
        <p className={h.proofLine}>
          <span className={h.proofLead}>{t.proofLead}</span> {t.proofRest}
        </p>
        <Link href={featureHref('editor')} className={h.proofLink}>{t.statsLink} →</Link>
      </div>
      <div ref={ref} className={h.proofStats}>
        {hero && (
          <div className={h.heroStat}>
            <span className={h.heroValue} aria-label={`${hero.prefix}${hero.target}${hero.suffix}`}>
              {hero.prefix}{formatCount(hero.target, progress)}<span className={s.accent}>{hero.suffix}</span>
            </span>
            <span className={h.heroNote}>{hero.note || hero.label}</span>
            <span className={h.heroTrack}>
              <span className={h.heroFill} style={{ width: `${progress * 100}%` }} />
            </span>
          </div>
        )}
        <div className={h.restStats}>
          {rest.map(x => (
            <div key={x.label} className={h.restStat}>
              <span className={h.restValue}>
                <span className={s.accent}>{x.prefix}</span>{formatCount(x.target, progress)}{x.suffix}
              </span>
              <span className={h.restLabel}>{x.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
