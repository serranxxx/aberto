'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FEATURE_COPY } from '@/data/copy'
import { FEATURES, PRODUCTS } from '@/data/features'
import { useLang } from '@/components/site/LangProvider'
import { Shot, SiteFooter, SiteHeader, siteStyles as s, workHref } from '@/components/site/Site'
import f from './feature.module.css'

const byId = Object.fromEntries(FEATURES.map(x => [x.id, x]))
const pad = (i: number) => String(i + 1).padStart(2, '0')

export default function FeatureView({ id }: { id: string }) {
  const { lang } = useLang()
  const t = FEATURE_COPY[lang]
  const es = lang === 'es'
  const feat = byId[id]
  const c = feat[lang]
  const product = PRODUCTS[feat.product]
  // Pin resaltado: se sincroniza entre los números sobre la imagen y la lista de anatomía
  const [pin, setPin] = useState<number | null>(null)

  const anatomy = c.anatomy ?? []
  const pins = (feat.pins ?? []).slice(0, anatomy.length)
  const hover = (i: number) => ({ onMouseEnter: () => setPin(i), onMouseLeave: () => setPin(null) })

  const siblings = FEATURES.filter(x => x.product === feat.product && x.id !== id)
  const related = siblings.length ? siblings : FEATURES.filter(x => x.id !== id).slice(0, 3)

  return (
    <div className={f.page}>
      <SiteHeader variant="feature" />

      {/* Encabezado */}
      <section className={`${s.container} ${f.hero}`}>
        <div className={s.bar} />
        <div className={`${s.label} ${f.meta}`}>{t.feature} · {product.name} · {c.tag}</div>
        <h1 className={f.title}>
          {c.titleA} <span className={`${s.accent} ${f.nowrap}`}>{c.accent}</span>
        </h1>
        <p className={f.lead}>{c.lead}</p>
        {!!c.facts?.length && (
          <div className={f.facts}>
            {c.facts.map(x => (
              <div key={x.k} className={f.fact}>
                <span className={s.label}>{x.k}</span>
                <span className={f.factValue}>{x.v}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Captura principal con anatomía */}
      <section className={s.container}>
        <figure className={f.figure}>
          <div className={f.mainShot}>
            <Shot src={feat.img} alt={c.caption} placeholder={t.noImg} sizes="(max-width: 1200px) 100vw, 1072px" priority />
            {pins.map(([x, y], i) => (
              <span
                key={i}
                className={`${f.pin} ${pin === i ? f.pinOn : ''}`}
                style={{ left: `${x}%`, top: `${y}%` }}
                {...hover(i)}
              >
                {i + 1}
              </span>
            ))}
          </div>
          {anatomy.length > 0 ? (
            <div className={f.anatomy}>
              {anatomy.map((a, i) => (
                <div
                  key={a.k}
                  className={f.anatomyItem}
                  style={{ opacity: pin === null || pin === i ? 1 : 0.4 }}
                  {...hover(i)}
                >
                  <span className={`${f.num} ${pin === i ? f.numOn : ''}`}>{i + 1}</span>
                  <div className={f.col} style={{ gap: 4 }}>
                    <span className={f.anatomyTitle}>{a.k}</span>
                    <span className={f.anatomyText}>{a.v}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <figcaption className={s.label}>{c.caption}</figcaption>
          )}
        </figure>
      </section>

      {/* El problema */}
      <section className={`${s.container} ${f.section}`}>
        <div className={`${s.label} ${f.sectionLabel}`}>{t.problem}</div>
        <h2 className={`${f.problem} ${c.origin ? '' : f.pending}`}>{c.origin || t.pending}</h2>
        <div className={f.story}>
          <div className={f.storyItem}>
            <span className={s.label}>{t.what}</span>
            <p className={`${f.storyText} ${c.what ? '' : f.pending}`}>{c.what || t.pending}</p>
          </div>
          <div className={`${f.storyItem} ${f.storyAccent}`}>
            <span className={s.label}>{t.solves}</span>
            <p className={`${f.storyText} ${c.solves ? '' : f.pending}`}>{c.solves || t.pending}</p>
          </div>
        </div>
      </section>

      {c.stat && (
        <section className={`${s.container} ${f.statSection}`}>
          <div className={f.statRow}>
            <span className={`${s.accent} ${f.statValue}`}>{c.stat}</span>
            <span className={f.statLabel}>{c.statLabel}</span>
          </div>
        </section>
      )}

      {/* Estructura */}
      {!!c.modules?.length && (
        <section className={`${s.container} ${f.section}`}>
          <div className={`${s.label} ${f.sectionLabel}`}>{t.structure}</div>
          <h2 className={f.h2}>{c.modulesLabel}</h2>
          <div className={f.modules}>
            {c.modules.map((m, i) => (
              <div key={m.name} className={f.module}>
                <span className={s.label}>{pad(i)}</span>
                <span className={f.moduleName}>{m.name}</span>
                <span className={f.moduleDesc}>{m.desc}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Flujos clave */}
      {!!c.flows?.length && (
        <section className={`${s.container} ${f.section}`}>
          <div className={`${s.label} ${f.sectionLabel}`}>{t.flows}</div>
          <div className={f.flows}>
            {c.flows.map(fl => (
              <div key={fl.title} className={f.flow}>
                <span className={f.flowTitle}>{fl.title}</span>
                <ol className={f.flowSteps}>
                  {fl.steps.map((st, i) => (
                    <li key={st} className={f.flowStep}>
                      <span className={f.flowN}>{pad(i)}</span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Decisiones */}
      {c.decisions.length > 0 && (
        <section className={f.dark}>
          <div className={`${s.container} ${f.darkInner}`}>
            <div className={`${s.label} ${f.sectionLabel} ${f.labelOnDark}`}>{t.decisions}</div>
            <h2 className={`${f.h2} ${f.h2OnDark}`}>{t.decisionsTitle}</h2>
            {c.decisions.map((d, i) => (
              <div key={d.k} className={`${f.decision} ${i % 2 ? f.reverse : ''}`}>
                <div className={f.decisionText}>
                  <span className={`${s.label} ${f.labelOnDark}`}>{pad(i)}</span>
                  <span className={f.decisionTitle}>{d.k}</span>
                  <span className={f.decisionBody}>{d.v}</span>
                </div>
                {d.shot && (
                  <div className={f.decisionShot}>
                    <Shot src={typeof d.shot === 'string' ? d.shot : null} alt={d.k} placeholder={d.k} sizes="600px" className={f.darkShot} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Detalles */}
      {!!c.specs?.length && (
        <section className={`${s.container} ${f.section}`}>
          <div className={`${s.label} ${f.sectionLabel}`}>{t.specs}</div>
          <div className={f.specs}>
            {c.specs.map(x => (
              <div key={x.k} className={f.spec}>
                <span className={f.specKey}>{x.k}</span>
                <span className={f.specValue}>{x.v}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Capturas extra */}
      {feat.extra.length > 0 && (
        <section className={`${s.container} ${f.extraSection}`}>
          <div className={f.extra}>
            {feat.extra.map(src => (
              <div key={src} className={f.extraItem}>
                <Image src={src} alt={c.caption} width={1600} height={1000} sizes="(max-width: 800px) 100vw, 560px" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sobre el producto + más features */}
      <section className={`${s.container} ${f.closing}`}>
        <div className={f.about}>
          <div className={f.col} style={{ gap: 12 }}>
            <span className={s.label}>{t.about}</span>
            <div className={f.productRow}>
              <span className={f.productName}>{product.name}</span>
              <span className={f.badge}>{es ? product.badgeEs : product.badgeEn}</span>
            </div>
            <p className={f.productDesc}>{product[lang]}</p>
            <span className={s.label}>{es ? product.roleEs : product.roleEn}</span>
          </div>
          {!!product.stats?.length && (
            <div className={f.pStats}>
              {product.stats.map(x => (
                <div key={x.v} className={f.col} style={{ gap: 4 }}>
                  <span className={`${s.accent} ${f.pStatValue}`}>{x.v}</span>
                  <span className={f.pStatLabel}>{x[lang]}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={f.relatedTitle}>{t.related} {product.name}</div>
        <div className={f.related}>
          {related.map(x => (
            <Link key={x.id} href={workHref(x.id)} className={f.relatedItem}>
              <div className={f.relatedShot}>
                <Shot src={x.img} alt={x[lang].caption} placeholder={t.noImg} sizes="300px" />
              </div>
              <span className={s.label}>{x[lang].tag}</span>
              <span className={f.relatedName}>{x[lang].titleA} {x[lang].accent}</span>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter variant="feature" />
    </div>
  )
}
