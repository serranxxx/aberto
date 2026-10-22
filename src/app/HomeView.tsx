'use client'

import { useEffect, useRef, useState } from 'react'
import { COPY } from '@/data/copy'
import { PRODUCTS } from '@/data/features'
import type { Lang } from '@/data/types'
import { useLang } from '@/components/site/LangProvider'
import { formatCount, parseStat, useCountProgress } from '@/components/site/CountUp'
import {
  BOOKING_URL, ContactSection, SiteFooter, SiteHeader, siteStyles as s,
} from '@/components/site/Site'
import { ForkSticker, IconSprite, ServicesStickers, StickerIcon, WorkStickers } from '@/components/site/Stickers'
import { startStickerMotion } from '@/components/site/stickerMotion'
import { WhyStories } from './WhyStories'
import { SoftwareBeautiful } from './SoftwareBeautiful'
import { WorkExplorer } from './WorkExplorer'
import { ClickableIntro } from './ClickableIntro'
import h from './home.module.css'
import ic from './intro.module.css'

const pad = (i: number) => String(i + 1).padStart(2, '0')
// "Customer Success" → CS, "Soporte" → S
const initials = (name: string) => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

export default function HomeView() {
  const { lang } = useLang()
  const t = COPY[lang]
  const [openService, setOpenService] = useState<number | null>(0)
  const stepsRef = useRef<HTMLDivElement>(null)
  const ballRef = useRef<HTMLSpanElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const restRef = useRef<HTMLDivElement>(null)

  // Motion de los stickers: se dispara una vez al entrar cada uno en viewport
  useEffect(() => {
    if (!pageRef.current) return
    return startStickerMotion(pageRef.current)
  }, [])

  // Proceso: cada punto negro alberga una bolita con degradado y se la lanza al siguiente.
  // Del último sale por la derecha de la pantalla y vuelve a entrar por la izquierda hacia el primero.
  useEffect(() => {
    const ol = stepsRef.current, ball = ballRef.current
    if (!ol || !ball) return
    const dots = [...ol.querySelectorAll<HTMLElement>('[data-dot]')]
    const n = dots.length
    const center = (i: number) => {
      const o = ol.getBoundingClientRect(), r = dots[i].getBoundingClientRect()
      return { x: r.left + r.width / 2 - o.left, y: r.top + r.height / 2 - o.top }
    }
    const place = (i: number) => { const c = center(i); ball.style.translate = `${c.x}px ${c.y}px` }
    let cur = n - 1
    place(cur)
    const onResize = () => place(cur)
    window.addEventListener('resize', onResize)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => window.removeEventListener('resize', onResize)

    type P = { x: number; y: number }
    const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
    const easeIn = (t: number) => t * t * t
    const easeOut = (t: number) => 1 - (1 - t) ** 3
    // Tiro en arco bajo: la altura crece con la distancia, hasta 22px
    const arc = (a: P, b: P, ms: number, ease: (t: number) => number) => {
      const h = Math.min(22, Math.hypot(b.x - a.x, b.y - a.y) * 0.08)
      const frames = Array.from({ length: 17 }, (_, k) => {
        const p = ease(k / 16)
        return { translate: `${a.x + (b.x - a.x) * p}px ${a.y + (b.y - a.y) * p - h * 4 * p * (1 - p)}px` }
      })
      ball.style.translate = frames[frames.length - 1].translate
      return ball.animate(frames, { duration: ms, easing: 'linear' }).finished
    }
    const launch = (i: number) => dots[i].animate([{ scale: '1' }, { scale: '.8', offset: 0.35 }, { scale: '1' }], { duration: 320, easing: 'ease-out' })
    const receive = (i: number) => dots[i].animate([{ scale: '1' }, { scale: '1.3', offset: 0.35 }, { scale: '1' }], { duration: 360, easing: 'ease-out' })

    let alive = true, timer: ReturnType<typeof setTimeout> | undefined
    const hop = async () => {
      if (!alive) return
      const next = (cur + 1) % n
      launch(cur)
      try {
        if (next === 0) {
          const a = center(cur), b = center(0), o = ol.getBoundingClientRect()
          await arc(a, { x: window.innerWidth - o.left + 24, y: a.y }, 520, easeIn)
          await arc({ x: -o.left - 24, y: b.y }, b, 620, easeOut)
        } else {
          await arc(center(cur), center(next), 640, inOut)
        }
      } catch { return }
      if (!alive) return
      cur = next
      receive(cur)
      timer = setTimeout(hop, 1100)
    }
    timer = setTimeout(hop, 1200)
    return () => {
      alive = false
      clearTimeout(timer)
      ball.getAnimations().forEach(a => a.cancel())
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Parallax de la intro: el contenido sube 2× en los primeros 45vh mientras el video baja,
  // así la intro de 100vh se cruza en ~55vh de scroll. Escrituras directas al DOM, sin estado.
  useEffect(() => {
    const rest = restRef.current, layer = layerRef.current
    if (!rest || !layer) return
    const offset = () => Math.max(0, 0.45 * window.innerHeight - window.scrollY)
    const onPara = () => {
      const sy = window.scrollY, vh = window.innerHeight
      rest.style.transform = sy < 0.45 * vh ? `translateY(${0.45 * vh - sy}px)` : 'none'
      // "Clickable" se mantiene centrado en la franja que sigue visible (del borde superior al contenido)
      const t = sy <= 0.45 * vh ? 0 : Math.min(sy, 0.55 * vh) / 2 - 0.225 * vh + Math.max(0, sy - 0.55 * vh)
      if (sy < 1.2 * vh) layer.style.transform = `translateY(${t}px)`
    }

    // Los anclas (#trabajo…) se calculan sin el desplazamiento del parallax: arriba el contenido
    // está 45vh más abajo, pero al llegar a la sección ese desplazamiento ya es cero
    const targetTop = (el: HTMLElement) =>
      el.getBoundingClientRect().top + window.scrollY - offset() - (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0)
    const scrollToHash = (hash: string, behavior: ScrollBehavior) => {
      const el = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
      if (!el || !rest.contains(el)) return false
      window.scrollTo({ top: targetTop(el), behavior })
      return true
    }
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement).closest('a')
      if (!a || a.target) return
      const url = new URL(a.href, location.href)
      if (url.pathname !== location.pathname || !url.hash) return
      if (scrollToHash(url.hash, 'smooth')) {
        e.preventDefault()
        e.stopPropagation()
        history.pushState(null, '', url.hash)
      }
    }
    // Llegando con un ancla (por ejemplo desde un proyecto), se corrige después del scroll del navegador
    let raf = 0
    if (location.hash) raf = requestAnimationFrame(() => { raf = requestAnimationFrame(() => { onPara(); scrollToHash(location.hash, 'instant') }) })

    onPara()
    window.addEventListener('scroll', onPara, { passive: true })
    window.addEventListener('resize', onPara)
    document.addEventListener('click', onClick, true)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onPara)
      window.removeEventListener('resize', onPara)
      document.removeEventListener('click', onClick, true)
    }
  }, [])

  return (
    <div ref={pageRef} className={h.page}>
      <IconSprite />

      {/* Intro: va antes del header, así al cargar ocupa toda la pantalla */}
      <section aria-label="Clickable intro" className={ic.section}>
        <div ref={layerRef} className={ic.layer}>
          <ClickableIntro />
        </div>
      </section>

      {/* Todo lo demás sube sobre la intro; el header es sticky dentro de este bloque */}
      <div ref={restRef} className={ic.rest}>
        <SiteHeader />

        {/* Hero */}
        <section id="top" className={`${s.container} ${h.hero}`}>
          <div className={s.bar} />
          <div className={`${s.label} ${h.heroLabel}`}>{t.heroLabel}</div>
          <h1 className={h.heroTitle}>
            {t.heroA}
            {/* Acento manuscrito apilado, empalmado con la última línea */}
            <span className={h.heroAccent}>
              <span className={`${s.script} ${h.heroAccentText}`}>{t.heroAccent}</span>
              <StickerIcon name="cursor" inner={1.6} outer={5} solid="#AF86F7" anim="cursor" className={h.heroCursor} />
            </span>
          </h1>
          <p className={h.heroLead}>{t.heroLead}</p>
          <div className={s.btnRow}>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={`${s.btn} ${s.btnDark}`}>{t.ctaMain} <span>→</span></a>
            <a href="#servicios" className={`${s.btn} ${s.btnOutline}`}>{t.ctaSecondary}</a>
          </div>
        </section>

        {/* ¿Te suena? */}
        <section className={h.painSection}>
          <div className={`${s.container} ${h.painBlock}`}>
            <div className={h.painGrid}>
              <div className={h.painHead}>
                <div className={`${s.label} ${h.sectionLabel}`}>{t.painLabel}</div>
                <h2 className={`${s.h2} ${h.painTitle}`}>{t.painTitle}</h2>
              </div>
              {/* Comentarios del equipo, como en Figma: avatar, quién, cuándo y el comentario */}
              <div className={h.pains}>
                {t.pains.map((p, i) => (
                  <div key={p.who} data-anim="comment" className={h.pain} data-tone={i}>
                    <span className={h.painAvatar}>{initials(p.who)}</span>
                    <div className={h.painCard}>
                      <span className={h.painMeta}>
                        <span className={h.painWho}>{p.who}</span>
                        <span className={h.painWhen}>{p.when}</span>
                      </span>
                      <span className={h.painText}>{p.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className={h.painClose}>
              {t.painClose} <span className={`${s.script} ${h.painAccent}`}>{t.painCloseAccent}</span>
            </p>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className={`${s.container} ${h.block} ${h.relative}`}>
          <ServicesStickers />
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
            <div className={`${s.label} ${h.sectionLabel} ${h.labelOnDark} ${h.whyLabelOut}`}>{t.whyLabel}</div>
            <h2 className={`${s.h2} ${h.h2OnDark} ${h.whyTitle}`}>
              {/* En móvil la etiqueta va dentro del H2 para quedar debajo de la bifurcación */}
              <span className={h.whyLabelIn}>{t.whyLabel}</span>
              <span className={h.whyText}>{t.whyTitle}</span>
              <ForkSticker yes={t.forkYes} no={t.forkNo} />
            </h2>
            <WhyStories reasons={t.why} />
            <ProofStats lang={lang} />
          </div>
        </section>

        {/* Quién soy */}
        <section className={`${s.container} ${h.block} ${h.relative}`}>
          <div className={h.about}>
            <div className={h.aboutHead}>
              <div className={h.aboutTitleWrap}>
                <span className={s.label}>{t.aboutLabel}</span>
                {/* Marca: "Clickable" en Inter y debajo la firma "UX design", como al final de la intro */}
                <h2 className={h.aboutTitle}>
                  <span>Clickable</span>
                  <span className={h.aboutSig}>
                    <span className={h.aboutUx}>UX</span>
                    <span className={`${s.script} ${h.aboutDesign}`}>design</span>
                  </span>
                </h2>
              </div>
            </div>
            <div className={h.aboutText}>
              <p className={h.aboutP}>{t.aboutP1}</p>
              <p className={h.aboutP} style={{ color: 'var(--ink-3)' }}>{t.aboutP2}</p>
            </div>
          </div>
        </section>

        <SoftwareBeautiful lang={lang} />

        {/* Trabajo */}
        <section id="trabajo" className={s.container}>
          <div className={h.workHead}>
            <div className={`${s.label} ${h.sectionLabel}`}>{t.workLabel}</div>
            <h2 className={s.h2} style={{ maxWidth: '22ch' }}>{t.workTitle}</h2>
            <p className={s.lead} style={{ maxWidth: '72ch', textWrap: 'balance' }}>{t.workLead}</p>
            <WorkStickers code={t.decoCode} />
          </div>
          <WorkExplorer lang={lang} />
        </section>

        {/* Proceso */}
        <section id="proceso" className={`${s.container} ${h.block} ${h.relative}`}>
          <div className={`${s.label} ${h.sectionLabel}`}>{t.processLabel}</div>
          <h2 className={s.h2} style={{ maxWidth: '20ch' }}>{t.processTitle}</h2>
          <div ref={stepsRef} className={h.timelineWrap}>
            <span ref={ballRef} className={h.stepBall} aria-hidden />
            <ol className={h.timeline}>
              {t.steps.map((st, i) => (
                <li key={st.k} className={h.step}>
                  <span data-dot className={h.stepDot} />
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
          </div>
          <div className={h.notFor}>
            <span className={h.notForTitle}>{t.notForTitle}</span>
            <p className={h.notForText}>{t.notFor}</p>
          </div>
        </section>

        <ContactSection />
        <SiteFooter />
      </div>
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
      </div>
      <div ref={ref} className={h.proofStats}>
        {hero && (
          <div className={h.heroStat}>
            <span className={h.heroValue} aria-label={`${hero.prefix}${hero.target}${hero.suffix}`}>
              {hero.prefix}{formatCount(hero.target, progress)}<span className={s.accent}>{hero.suffix}</span>
            </span>
            {hero.note && <span className={h.heroNote}>{hero.note}</span>}
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
