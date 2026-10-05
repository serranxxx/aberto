'use client'

import Image from 'next/image'
import Link from 'next/link'
import { COPY, FEATURE_COPY } from '@/data/copy'
import { FEATURE_ORDER, FEATURES, PRODUCTS } from '@/data/features'
import { useLang } from '@/components/site/LangProvider'
import {
  ContactSection, Shot, SiteFooter, SiteHeader, featureHref, siteStyles as s,
} from '@/components/site/Site'
import f from './feature.module.css'

const byId = Object.fromEntries(FEATURES.map(x => [x.id, x]))
const pad = (i: number) => String(i + 1).padStart(2, '0')

export default function FeatureView({ id }: { id: string }) {
  const { lang } = useLang()
  const t = COPY[lang]
  const l = FEATURE_COPY[lang]
  const feat = byId[id]
  const c = feat[lang]
  const product = PRODUCTS[feat.product]

  const facts = c.facts?.length
    ? c.facts
    : [{ k: l.role, v: lang === 'es' ? product.roleEs : product.roleEn }, { k: product.name, v: lang === 'es' ? product.badgeEs : product.badgeEn }]

  const story = [
    { k: l.origin, v: c.origin },
    { k: l.what, v: c.what },
    { k: l.solves, v: c.solves },
  ].filter(x => x.v)

  const showPins = !!feat.img && !!feat.pins && !!c.anatomy?.length

  const idx = FEATURE_ORDER.indexOf(id)
  const next = byId[FEATURE_ORDER[(idx + 1) % FEATURE_ORDER.length]]
  const prev = byId[FEATURE_ORDER[(idx - 1 + FEATURE_ORDER.length) % FEATURE_ORDER.length]]
  const siblings = FEATURE_ORDER.map(x => byId[x]).filter(x => x.product === feat.product && x.id !== id)

  return (
    <div className={f.page}>
      <SiteHeader />

      {/* Encabezado */}
      <section className={`${s.container} ${f.hero}`}>
        <Link href="/#trabajo" className={f.back}>← {l.back}</Link>
        <div className={s.bar} />
        <div className={`${s.label} ${f.heroLabel}`}>{product.name} · {c.tag}</div>
        <h1 className={f.title}>
          {c.titleA} <span className={s.accent}>{c.accent}</span>
        </h1>
        <p className={f.lead}>{c.lead}</p>
        <div className={f.facts}>
          {facts.map(x => (
            <div key={x.k} className={f.fact}>
              <span className={s.label}>{x.k}</span>
              <span className={f.factValue}>{x.v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Captura principal */}
      <section className={s.container}>
        <figure className={f.figure}>
          <div className={f.mainShot}>
            <Shot src={feat.img} alt={c.caption} placeholder={t.noImg} sizes="(max-width: 1200px) 100vw, 1072px" priority />
            {showPins && feat.pins!.map(([x, y], i) => (
              <span key={i} className={f.pin} style={{ left: `${x}%`, top: `${y}%` }}>{i + 1}</span>
            ))}
          </div>
          <figcaption className={s.label}>{c.caption}</figcaption>
        </figure>
      </section>

      {/* Historia */}
      {story.length > 0 && (
        <section className={`${s.container} ${f.block}`}>
          <div className={f.story}>
            {story.map(x => (
              <div key={x.k} className={f.storyItem}>
                <span className={s.label}>{x.k}</span>
                <p className={f.storyText}>{x.v}</p>
              </div>
            ))}
          </div>
          {c.stat && (
            <div className={f.statRow}>
              <span className={`${s.accent} ${f.statValue}`}>{c.stat}</span>
              <span className={f.statLabel}>{c.statLabel}</span>
            </div>
          )}
        </section>
      )}

      {/* Anatomía */}
      {!!c.anatomy?.length && (
        <section className={f.tinted}>
          <div className={`${s.container} ${f.block}`}>
            <div className={`${s.label} ${f.sectionLabel}`}>{l.anatomy}</div>
            <div className={f.anatomy}>
              {c.anatomy.map((a, i) => (
                <div key={a.k} className={f.anatomyItem}>
                  <span className={f.num}>{i + 1}</span>
                  <div className={f.col}>
                    <span className={f.itemTitle}>{a.k}</span>
                    <span className={f.itemText}>{a.v}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Módulos */}
      {!!c.modules?.length && (
        <section className={`${s.container} ${f.block}`}>
          <h2 className={s.h2}>{c.modulesLabel}</h2>
          <div className={f.modules}>
            {c.modules.map((m, i) => (
              <div key={m.name} className={f.module}>
                <span className={s.label}>{pad(i)}</span>
                <span className={f.itemTitle}>{m.name}</span>
                <span className={f.itemText}>{m.desc}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Flujos */}
      {!!c.flows?.length && (
        <section className={`${s.container} ${f.block} ${f.topLine}`}>
          <h2 className={s.h2}>{l.flows}</h2>
          <div className={f.flows}>
            {c.flows.map(fl => (
              <div key={fl.title} className={f.flow}>
                <span className={f.flowTitle}>{fl.title}</span>
                <ol className={f.flowSteps}>
                  {fl.steps.map((st, i) => (
                    <li key={st} className={f.flowStep}>
                      <span className={f.flowN}>{i + 1}</span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Detalles */}
      {!!c.specs?.length && (
        <section className={`${s.container} ${f.block} ${f.topLine}`}>
          <div className={f.specsWrap}>
            <h2 className={s.h2}>{l.specs}</h2>
            <div className={f.specs}>
              {c.specs.map(x => (
                <div key={x.k} className={f.spec}>
                  <span className={s.label}>{x.k}</span>
                  <span>{x.v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Decisiones */}
      {c.decisions.length > 0 && (
        <section className={f.dark}>
          <div className={`${s.container} ${f.block}`}>
            <div className={`${s.label} ${f.sectionLabel} ${f.labelOnDark}`}>{l.decisions}</div>
            <div className={f.decisions}>
              {c.decisions.map((d, i) => (
                <div key={d.k} className={f.decision}>
                  <span className={`${s.label} ${f.labelOnDark}`}>{pad(i)}</span>
                  <h3 className={f.decisionTitle}>{d.k}</h3>
                  <p className={f.decisionText}>{d.v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Más capturas */}
      {feat.extra.length > 0 && (
        <section className={`${s.container} ${f.block}`}>
          <div className={`${s.label} ${f.sectionLabel}`}>{l.gallery}</div>
          <div className={f.gallery}>
            {feat.extra.map(src => (
              <div key={src} className={f.galleryItem}>
                <Image src={src} alt={c.caption} width={1600} height={1000} sizes="(max-width: 800px) 100vw, 540px" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Navegación */}
      <section className={`${s.container} ${f.block} ${f.topLine}`}>
        <div className={f.pager}>
          <Link href={featureHref(prev.id)} className={f.pagerLink}>
            <span className={s.label}>← {l.prev}</span>
            <span className={f.pagerTitle}>{prev[lang].titleA} {prev[lang].accent}</span>
          </Link>
          <Link href={featureHref(next.id)} className={`${f.pagerLink} ${f.pagerNext}`}>
            <span className={s.label}>{l.next} →</span>
            <span className={f.pagerTitle}>{next[lang].titleA} <span className={s.accent}>{next[lang].accent}</span></span>
          </Link>
        </div>

        {siblings.length > 0 && (
          <>
            <h3 className={f.moreTitle}>{l.more} {product.name}</h3>
            <div className={f.more}>
              {siblings.map(x => (
                <Link key={x.id} href={featureHref(x.id)} className={f.moreItem}>
                  <div className={f.moreShot}>
                    <Shot src={x.img} alt={x[lang].caption} placeholder={t.noImg} sizes="260px" />
                  </div>
                  <span className={s.label}>{x[lang].tag}</span>
                  <span className={f.moreName}>{x[lang].titleA} {x[lang].accent}</span>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      <ContactSection />
      <SiteFooter />
    </div>
  )
}
