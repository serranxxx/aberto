'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { PROJECT_COPY } from '@/data/copy'
import { FEATURES } from '@/data/features'
import { PROJECT_IDS } from '@/data/routes'
import { FolderLink } from '@/components/site/Folder'
import { useLang } from '@/components/site/LangProvider'
import { CloseLink, SiteHeader, Wordmark, siteStyles as s } from '@/components/site/Site'
import p from './project.module.css'

const byId = Object.fromEntries(FEATURES.map(f => [f.id, f]))
const pad = (i: number) => String(i + 1).padStart(2, '0')
// "Texto *resaltado* texto": lo que va entre asteriscos se marca con el color del bloque
const mark = (text: string) => text.split('*').map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part))
const D = '/iattend/dynamic/'

// Pantallas recortadas a tamaño real (ancho, alto). Se muestran a ~62% (máx 268 px de alto).
const SCREENS: [string, number, number][] = [
  ['01-pildora', 164, 70], ['02-formulario', 276, 370], ['04-gracias', 299, 479], ['05-barra', 252, 78],
  ['06-pases', 277, 408], ['07-lia', 277, 476], ['08-photo-wall', 302, 511],
]

// Recorridos de los cursores en px; en móvil se escalan a 0.4.
const CURSOR_PATHS: [number, number][][] = [
  [[0, 0], [70, -60], [150, -20], [110, 50], [40, 30], [0, 0]],
  [[0, 0], [-90, 60], [-160, 140], [-60, 180], [20, 90], [0, 0]],
]

const CURSOR_PATH = 'M5.4 4.25 18.9 9.6Q20 10.1 19.5 11.1Q19.2 11.7 18.5 11.8L14.4 13.1Q13.6 13.4 13.3 14.2L11.5 19.3Q11.1 20.2 10.3 19.6Q10 19.3 9.9 18.9L4.15 5.6Q3.8 4.6 4.5 4.25Q4.9 4.05 5.4 4.25Z'

function Cursor({ color, label, path, scale = 1, className }: { color: string; label: string; path: number; scale?: number; className: string }) {
  return (
    <div className={className} data-pc={path} data-ps={scale} aria-hidden>
      <svg viewBox="-2 -2 28 28" fill="none" strokeLinecap="round" strokeLinejoin="round" className={p.cursorArrow}>
        <path d={CURSOR_PATH} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="5.5" />
        <path d={CURSOR_PATH} fill={color} stroke={color} strokeWidth="1.6" />
      </svg>
      <span className={p.cursorTag} style={{ background: color }}>{label}</span>
    </div>
  )
}

const FrameIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
    <path d="M3 1v10M9 1v10M1 3h10M1 9h10" />
  </svg>
)

const Arrow = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={dir === 'left' ? 'M19 12H5M11 6l-6 6 6 6' : 'M5 12h14M13 6l6 6-6 6'} />
  </svg>
)

/** Cada video tiene una portada .webp con el mismo nombre (primer cuadro), visible mientras carga */
const posterOf = (src?: string) => src?.replace(/#.*$/, '').replace(/\.mp4$/, '.webp')

type Shot = { src: string; label: string; w?: number; h?: number }

/** Carril horizontal de pantallas con flechas. Con w/h la imagen va a tamaño fijo; sin ellos, llena el tile. */
function Gallery({ items, title, prev, next, wide, full, pending, className }: {
  items: Shot[]; title: string; prev: string; next: string; wide: boolean; full?: boolean; pending: string; className: string
}) {
  const rail = useRef<HTMLDivElement>(null)
  const go = (d: number) => {
    const el = rail.current
    if (el) el.scrollBy({ left: d * Math.round(el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <div className={className}>
      <div className={p.galleryHead}>
        <span className={p.label}>{title}</span>
        <div className={p.arrows}>
          <button className={p.arrowBtn} onClick={() => go(-1)} aria-label={prev}><Arrow dir="left" /></button>
          <button className={p.arrowBtn} onClick={() => go(1)} aria-label={next}><Arrow dir="right" /></button>
        </div>
      </div>
      <div ref={rail} className={p.rail}>
        {items.map((g, i) => (
          <div key={`${i}-${g.label}`} className={`${p.tile} ${wide ? p.tileWide : ''} ${full ? p.tileFull : ''}`}>
            <span className={p.tileLabel}>{pad(i)} · {g.label}</span>
            {g.src ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={g.src}
                alt={g.label}
                loading="lazy"
                {...(g.w && g.h ? { width: g.w, height: g.h } : { className: p.tileFill })}
              />
            ) : (
              <span className={p.tilePending}>{pending}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Carrusel con los demás proyectos, empezando por el siguiente al actual. */
function MoreProjects({ id, title, prev, next }: { id: string; title: string; prev: string; next: string }) {
  const { lang } = useLang()
  const rail = useRef<HTMLDivElement>(null)
  const i = PROJECT_IDS.indexOf(id)
  const others = [...PROJECT_IDS.slice(i + 1), ...PROJECT_IDS.slice(0, Math.max(0, i))].map(x => byId[x]).filter(Boolean)
  const go = (d: number) => {
    const el = rail.current
    if (el) el.scrollBy({ left: d * Math.round(el.clientWidth * 0.8), behavior: 'smooth' })
  }
  if (!others.length) return null

  return (
    <section className={p.more}>
      <div className={p.moreHead}>
        <h2 className={p.moreTitle}>{title}</h2>
        <div className={p.arrows}>
          <button className={p.arrowBtn} onClick={() => go(-1)} aria-label={prev}><Arrow dir="left" /></button>
          <button className={p.arrowBtn} onClick={() => go(1)} aria-label={next}><Arrow dir="right" /></button>
        </div>
      </div>
      <div ref={rail} className={p.moreRail}>
        {/* Cada proyecto es una carpeta con su nombre en la solapa y, abajo, su título */}
        {others.map(f => {
          const c = f[lang]
          return (
            <FolderLink
              key={f.id}
              f={f}
              label={c.tag}
              className={p.moreCard}
              after={(
                <span className={p.moreBody}>
                  <span className={p.moreCardTitle}>{c.titleA.replace('\n', ' ')} {c.accent}</span>
                </span>
              )}
            >
              <span className={p.moreFolderLabel}>{c.tag}</span>
            </FolderLink>
          )
        })}
      </div>
    </section>
  )
}

export default function ProjectView({ id }: { id: string }) {
  const { lang } = useLang()
  const t = PROJECT_COPY[lang]
  const feat = byId[id]
  const c = feat[lang]
  const rootRef = useRef<HTMLDivElement>(null)

  const [d1, d2, d3] = c.decisions.map((d, i) => ({ ...d, n: pad(i) }))
  // Dynamic RSVP tiene su propio montaje (mockup recortado al celular, recortes a tamaño real)
  const isRsvp = id === 'dynamicrsvp'
  const caption = `${c.caption || c.tag} / Demo`
  const problemTitle = c.problemTitle || t.problemTitle
  const solutionTitle = c.solutionTitle || t.solutionTitle
  // El título siempre va en dos renglones: se encoge según su longitud (cqi del contenedor)
  const fit = { '--tfit': `${(185 / Math.max(1, ...c.titleA.split('\n').map(l => l.length), c.accent.length)).toFixed(2)}cqi` } as React.CSSProperties

  const galleryFor = (scale: number): Shot[] => isRsvp
    ? SCREENS.map(([file, w, h], i) => {
      const f = Math.min(0.62, 268 / h) * scale
      return { src: `${D}crop/${file}.png`, label: t.gallery[i], w: Math.round(w * f), h: Math.round(h * f) }
    })
    : (feat.gallery ?? [])
  const hasGallery = isRsvp || !!feat.gallery?.length
  const screenshotPending = lang === 'es' ? 'Captura después' : 'Screenshot coming'
  // Etiquetas de los cursores: roles de quien usa la pieza, si el proyecto las define
  const [cursorA, cursorB] = c.cursors ?? [t.cursorDesign, t.cursorTest]

  // Cursores animados (recorrido por keyframes, en loop)
  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const anims = [...root.querySelectorAll<HTMLElement>('[data-pc]')].map(el => {
      const k = Number(el.dataset.pc)
      const sc = Number(el.dataset.ps || 1)
      return el.animate(
        CURSOR_PATHS[k].map(([x, y]) => ({ translate: `${x * sc}px ${y * sc}px`, easing: 'cubic-bezier(.45,0,.25,1)' })),
        { duration: k === 0 ? 11000 : 13500, delay: k === 0 ? 0 : -4000, iterations: Infinity },
      )
    })
    return () => anims.forEach(a => a.cancel())
  }, [])

  // Solo se reproducen los videos que están en pantalla (y del layout visible: los
  // del layout oculto nunca intersectan). Algunos navegadores ignoran autoplay.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        const v = target as HTMLVideoElement
        if (!isIntersecting) {
          // Se confirma con la posición real antes de pausar: en pestañas en segundo
          // plano el observer puede reportar todo como fuera de pantalla.
          const r = v.getBoundingClientRect()
          if (!v.offsetWidth || r.bottom < 0 || r.top > window.innerHeight) v.pause()
          return
        }
        v.muted = true
        if (v.paused) v.play().catch(() => {})
      })
    }, { threshold: 0.1 })
    root.querySelectorAll('video').forEach(v => io.observe(v))

    // Respaldo al montar: arranca los que ya están a la vista aunque el observer tarde
    const timer = setTimeout(() => {
      root.querySelectorAll('video').forEach(v => {
        const r = v.getBoundingClientRect()
        if (v.offsetWidth && r.top < window.innerHeight && r.bottom > 0 && v.paused) {
          v.muted = true
          v.play().catch(() => {})
        }
      })
    }, 300)

    return () => { io.disconnect(); clearTimeout(timer) }
  }, [])

  // "Flujo completo": el contenedor toma el color de la esquina del video en cada frame,
  // para empatar con escenas claras y oscuras. Con fondo claro lleva puntos; oscuro, liso.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const canvas = document.createElement('canvas')
    canvas.width = 4
    canvas.height = 4
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return
    let alive = true

    const sync = (v: HTMLVideoElement) => {
      const box = v.parentElement
      if (!box || !v.videoWidth || v.readyState < 2) return
      try {
        ctx.drawImage(v, 2, 2, 4, 4, 0, 0, 4, 4)
        const d = ctx.getImageData(0, 0, 4, 4).data
        let r = 0, g = 0, b = 0
        for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2] }
        const n = d.length / 4
        r = Math.round(r / n); g = Math.round(g / n); b = Math.round(b / n)
        const light = r * 0.299 + g * 0.587 + b * 0.114 > 128
        box.style.backgroundColor = `rgb(${r},${g},${b})`
        // Con data-bgplain el video trae sus propios puntos: el contenedor va liso para que no se vea el corte
        box.style.backgroundImage = light && !v.dataset.bgplain ? 'radial-gradient(#D9D8DD 1.1px, transparent 1.3px)' : 'none'
        box.style.borderColor = light ? '#ECEAEE' : 'transparent'
        const label = box.querySelector('span')
        if (label) label.style.color = light ? '#605D66' : '#C2C0C7'
      } catch { /* canvas no disponible */ }
    }

    const videos = [...root.querySelectorAll<HTMLVideoElement>('video[data-bgsync]')]
    const handles: (() => void)[] = []
    videos.forEach(v => {
      // Cada frame cuando el navegador lo soporta; timeupdate (~4 por segundo) como respaldo
      if ('requestVideoFrameCallback' in v) {
        const tick = () => { if (!alive) return; sync(v); v.requestVideoFrameCallback(tick) }
        v.requestVideoFrameCallback(tick)
      }
      const onTime = () => sync(v)
      v.addEventListener('timeupdate', onTime)
      handles.push(() => v.removeEventListener('timeupdate', onTime))
    })
    return () => { alive = false; handles.forEach(h => h()) }
  }, [])

  const facts = (
    <div className={p.facts}>
      {(c.facts ?? []).map(x => (
        <span key={x.k} className={p.fact}><span className={p.factKey}>{x.k}</span><span>{x.v}</span></span>
      ))}
    </div>
  )

  const title = (
    <div className={p.titleWrap} style={fit}>
      <h1 className={p.h1}>{c.titleA}</h1>
      <span className={`${s.script} ${p.accent}`}>{c.accent}</span>
    </div>
  )

  return (
    <div ref={rootRef} className={p.page}>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <linearGradient id="pg-accent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF6B5B" />
            <stop offset="1" stopColor="#AF86F7" />
          </linearGradient>
        </defs>
      </svg>

      {/* ---------------------------------------------------- Escritorio --- */}
      <div className={p.desktop}>
        <SiteHeader variant="project" />
        <div className={p.shell}>
          <div className={p.hero}>
            <div className={p.heroGrid}>
              <div className={p.heroText}>
                {title}
                <p className={p.lead}>{c.lead}</p>
                {facts}
              </div>
              <div className={p.frameCol}>
                <span className={p.frameLabel}><FrameIcon size={12} />{caption}</span>
                <div className={p.frame}>
                  {isRsvp || feat.heroVideo ? (
                    <video src={isRsvp ? `${D}mockup-animado-v2.mp4` : feat.heroVideo} poster={posterOf(isRsvp ? `${D}mockup-animado-v2.mp4` : feat.heroVideo)} muted loop playsInline preload="none" className={p.frameVideo} style={!isRsvp && feat.heroZoom ? { scale: feat.heroZoom } : undefined} />
                  ) : (
                    <div className={p.placeholderBottom}>Video / GIF</div>
                  )}
                </div>
                <Cursor className={`${p.cursor} ${p.cursorA}`} color="#FF6B5B" label={cursorA} path={0} />
                <Cursor className={`${p.cursor} ${p.cursorB}`} color="#AF86F7" label={cursorB} path={1} />
              </div>
            </div>
          </div>

          <div className={p.body}>
            <section className={p.problem}>
              <div className={p.storyHead}>
                <span className={`${p.storyLabel} ${p.toneProblem}`}>{t.problem}</span>
                <h2 className={p.h3}>{problemTitle}</h2>
              </div>
              <div className={p.storyBody}>
                {c.problemLead && <p className={`${p.storyLead} ${p.toneProblem}`}>{mark(c.problemLead)}</p>}
                <p className={p.storyText}>{c.origin}</p>
              </div>
            </section>

            <section className={p.solution}>
              <div className={p.storyHead}>
                <span className={`${p.storyLabel} ${p.toneSolution}`}>{t.solution}</span>
                <h2 className={p.h3}>{solutionTitle}</h2>
              </div>
              <div className={p.storyBody}>
                {c.solutionLead && <p className={`${p.storyLead} ${p.toneSolution}`}>{mark(c.solutionLead)}</p>}
                <p className={p.storyText}>{c.what}</p>
              </div>
            </section>

            {[d1, d2, d3].filter(Boolean).map((d, i) => (
              <div key={d.k} className={p.principle} style={{ gridArea: `d${i + 1}` }}>
                <span className={`${s.accent} ${p.principleN}`}>{d.n}</span>
                <span className={p.principleTitle}>{d.k}</span>
                <span className={p.principleText}>{d.v}</span>
              </div>
            ))}

            <div className={p.flowCard}>
              <span className={p.flowLabel}>{t.flow}</span>
              {isRsvp ? (
                <video data-bgsync src={`${D}rsvp-figma.mp4#t=2`} poster={posterOf(`${D}rsvp-figma.mp4#t=2`)} muted loop playsInline preload="none" className={p.flowVideo} />
              ) : feat.flowVideo ? (
                <video data-bgsync data-bgplain={feat.flowFit === 'fade' || undefined} src={feat.flowVideo} poster={posterOf(feat.flowVideo)} muted loop playsInline preload="none" className={feat.flowFit === 'cover' ? p.flowVideoFill : `${p.flowVideoContain} ${feat.flowFit === 'fade' ? p.flowFade : ''}`} />
              ) : (
                <div className={p.placeholderCenter}>{screenshotPending}</div>
              )}
            </div>

            {hasGallery && (
              <Gallery className={p.galleryDesk} items={galleryFor(1)} wide={!isRsvp && feat.galleryWide !== false} full={feat.galleryFull} title={t.screens} prev={t.prev} next={t.next} pending={screenshotPending} />
            )}

            <section className={p.result}>
              <div className={p.resultHead}>
                <div className={p.resultIntro}>
                  <span className={p.labelDark}>{t.result}</span>
                  <span className={p.resultLine}>{c.stat} <span className={p.resultMuted}>{c.statLabel}</span></span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------- Móvil --- */}
      <div className={p.mobile}>
        <div className={p.mBar}>
          <Link href="/" className={s.brand}><Wordmark /></Link>
          <CloseLink />
        </div>

        <div className={p.mIntro}>
          <div className={s.bar} />
          {title}
          <p className={p.lead}>{c.lead}</p>
          {facts}
        </div>

        <div className={p.mHero}>
          <div className={p.mHeroInner}>
            <span className={`${p.frameLabel} ${p.mFrameLabel} ${isRsvp ? '' : p.mFull}`}><FrameIcon size={11} />{caption}</span>
            <Cursor className={`${p.cursor} ${p.mCursor}`} color="#AF86F7" label={cursorB} path={1} scale={0.4} />
            {/* La máscara recorta el video al celular del mockup */}
            {isRsvp ? (
              <div className={p.mFrame}>
                <video src={`${D}mockup-animado-v2.mp4`} poster={posterOf(`${D}mockup-animado-v2.mp4`)} muted loop playsInline preload="none" className={p.mFrameVideo} />
              </div>
            ) : (
              <div className={`${p.mFrame} ${p.mFrameWide}`}>
                {feat.heroVideo
                  ? <video src={feat.heroVideo} poster={posterOf(feat.heroVideo)} muted loop playsInline preload="none" className={p.frameVideo} style={feat.heroZoom ? { scale: feat.heroZoom } : undefined} />
                  : <div className={p.placeholderBottom}>Video / GIF</div>}
              </div>
            )}
          </div>
        </div>

        <div className={p.mBody}>
          <div className={p.mStory}>
            <span className={`${p.storyLabel} ${p.toneProblem}`}>{t.problem}</span>
            <h2 className={p.mH3}>{problemTitle}</h2>
            {c.problemLead && <p className={`${p.mLead} ${p.toneProblem}`}>{mark(c.problemLead)}</p>}
            <p className={p.mText}>{c.origin}</p>
          </div>
          <div className={`${p.mStory} ${p.mStoryLine}`}>
            <span className={`${p.storyLabel} ${p.toneSolution}`}>{t.solution}</span>
            <h2 className={p.mH3}>{solutionTitle}</h2>
            {c.solutionLead && <p className={`${p.mLead} ${p.toneSolution}`}>{mark(c.solutionLead)}</p>}
            <p className={p.mText}>{c.what}</p>
          </div>

          <div className={p.mFlow}>
            <span className={p.mFlowLabel}>{t.flow}</span>
            {isRsvp ? (
              <video data-bgsync src={`${D}rsvp-figma.mp4#t=2`} poster={posterOf(`${D}rsvp-figma.mp4#t=2`)} muted loop playsInline preload="none" className={p.mFlowVideo} />
            ) : feat.flowVideo ? (
              <video data-bgsync data-bgplain={feat.flowFit === 'fade' || undefined} src={feat.flowVideo} poster={posterOf(feat.flowVideo)} muted loop playsInline preload="none" className={p.mFlowVideoContain} />
            ) : (
              <div className={`${p.placeholderCenter} ${p.mPlaceholder}`}>{screenshotPending}</div>
            )}
          </div>

          <div className={p.mPrinciples}>
            {[d1, d2, d3].filter(Boolean).map(d => (
              <div key={d.k} className={p.mPrinciple}>
                <span className={`${s.accent} ${p.mPrincipleN}`}>{d.n}</span>
                <span className={p.mPrincipleTitle}>{d.k}</span>
                <span className={p.principleText}>{d.v}</span>
              </div>
            ))}
          </div>
        </div>

        {hasGallery && (
          <Gallery className={p.galleryMob} items={galleryFor(0.9)} wide={!isRsvp && feat.galleryWide !== false} full={feat.galleryFull} title={t.screens} prev={t.prev} next={t.next} pending={screenshotPending} />
        )}

        <section className={p.mResult}>
          <div className={p.resultIntro} style={{ gap: 16 }}>
            <span className={p.labelDark}>{t.result}</span>
            <span className={p.mResultLine}>{c.stat} <span className={p.resultMuted}>{c.statLabel}</span></span>
          </div>
        </section>
      </div>

      <MoreProjects id={id} title={t.more} prev={t.prev} next={t.next} />
    </div>
  )
}

