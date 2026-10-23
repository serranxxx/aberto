'use client'

/*
 * Intro animada del home: "Make it obvious → Make it Clickable → Clickable" y tres cursores
 * tipo Figma que seleccionan la palabra. Todo se deriva de un solo reloj T (segundos);
 * se reproduce una vez y se queda en el último cuadro.
 * Portado de clickable-reel.jsx (handoff "Clickable home"). Los estilos que cambian en cada
 * cuadro van inline; el resto, en intro.module.css.
 */

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import c from './intro.module.css'

type Pt = [number, number]
// [t, x, y, ctrlX?, ctrlY?]: con punto de control, ese tramo es una parábola
type Key = number[]
type Layout = { W: number; H: number; CW: number; ls: { x: number; w: number }[] }

const EZ = {
  easeInOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
}
const CL = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const fade = (T: number, a: number, b: number) => EZ.easeOutCubic(CL((T - a) / (b - a), 0, 1))

const INK = '#19161E', WHITE = '#FFFFFF'
const CORAL = '#FF6B5B', LILA = '#AF86F7', PINK = '#DF72CB'
const GRAD_CSS = 'linear-gradient(135deg, #FF6B5B, #F06CAB, #DF72CB, #CA7BE5, #AF86F7)'
const WORD = 'Clickable'
const CUR_PATH = 'M5.4 4.25 18.9 9.6Q20 10.1 19.5 11.1Q19.2 11.7 18.5 11.8L14.4 13.1Q13.6 13.4 13.3 14.2L11.5 19.3Q11.1 20.2 10.3 19.6Q10 19.3 9.9 18.9L4.15 5.6Q3.8 4.6 4.5 4.25Q4.9 4.05 5.4 4.25Z'

const TYPE_AT = 0.5, TYPE_STEP = 0.17
const OUT = [13.65, 14.25]
const HERO_SPEED = 1.05
// Momento (reloj global) en que la intro ya está compuesta: firma visible y cursor del degradado fuera
const AUTO_SCROLL_AT = 14.6

// Tres cursores: cada uno entra, hace clic, arrastra su selección y sale cuando llega el siguiente
type Member = { id: 'pink' | 'coral' | 'grad'; color: string; click: number; drag: [number, number]; fade?: [number, number]; solid?: boolean }
const TEAM: Member[] = [
  { id: 'pink', color: PINK, click: 4.5, drag: [4.6, 5.35], fade: [5.85, 6.4], solid: true },
  { id: 'coral', color: CORAL, click: 6.65, drag: [6.75, 7.55], fade: [8.05, 8.6], solid: true },
  { id: 'grad', color: 'grad', click: 8.85, drag: [8.85, 9.65] },
]
// El fondo cambia de golpe en el cuadro exacto de cada clic
const DARK_SWITCH: [number, number][] = [[4.5, 1], [13.95, 0]]
const darkAt = (T: number) => DARK_SWITCH.reduce((d, [at, v]) => (T >= at ? v : d), 0)
const hex = (h: string) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16))
const mix = (a: string, b: string, p: number) => {
  const A = hex(a), B = hex(b)
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * p)).join(',')})`
}

// Los puntos fuera de pantalla se alejan hasta la distancia D del centro de la palabra
const farPt = (p: Pt, ctr: Pt, D: number): Pt => {
  const dx = p[0] - ctr[0], dy = p[1] - ctr[1], d = Math.hypot(dx, dy) || 1
  return d >= D ? p : [ctr[0] + dx / d * D, ctr[1] + dy / d * D]
}
function farKeys(K: Record<string, Key[]>, L: Layout, D: number) {
  if (!D) return K
  const ctr: Pt = [L.W / 2, L.H / 2]
  const fk = (k: Key) => { const [x, y] = farPt([k[1], k[2]], ctr, D); return [k[0], x, y, ...k.slice(3)] }
  const out: Record<string, Key[]> = {}
  Object.keys(K).forEach(id => {
    const a = K[id].map(k => k.slice())
    a[0] = fk(a[0]); a[1] = fk(a[1])
    if (id !== 'grad') a[a.length - 1] = fk(a[a.length - 1])
    out[id] = a
  })
  return out
}
// "UX design" aparece (sube y se desvanece hacia arriba) mientras el cursor del degradado pasa sobre ella en un solo arco
const SIG_T = [9.7, 10.3]
// Posiciones de la punta del cursor relativas a la esquina superior izquierda de la palabra (sw: ancho de la firma)
function teamKeys(L: Layout, sw: number): Record<string, Key[]> {
  const { W, H, CW } = L, top = H * 0.03, bot = H * 0.94
  return {
    // los recorridos nunca se cruzan: el rosa entra arriba a la derecha y sale por la misma diagonal abajo a la izquierda,
    // el coral va de abajo a la derecha hacia arriba, y el degradado viene de la izquierda
    pink: [[0, W + 700, -H * 2.8], [3.6, W + 700, -H * 2.8], [4.4, W + 12, -H * 0.12, W + 250, -H * 0.4], [4.6, W + 12, -H * 0.12], [5.35, -16, bot], [5.85, -16, bot],
      [6.4, -16 + (-16 - W - 12) * 4, bot + (bot + H * 0.12) * 4]],
    coral: [[0, W * 0.9, H * 4.2], [5.85, W * 0.9, H * 4.2], [6.65, W + 26, bot + H * 0.08, W * 1.25, H * 2.2], [6.75, W + 26, bot + H * 0.08],
      [7.55, -16, top], [8.05, -16, top], [8.6, -700, -H * 2.8, -W * 0.2, -H * 0.6]],
    // el degradado selecciona "Click" y, sin detenerse, sale en un arco que pasa sobre la firma
    grad: [[0, -W * 0.9, H * 3], [8.05, -W * 0.9, H * 3], [8.8, -H * 0.03, top - H * 0.07, -W * 0.45, H * 0.6], [8.85, -H * 0.03, top - H * 0.07],
      [9.65, CW + H * 0.035, bot],
      [11.0, W + 700, H * 1.35, W - (sw || H * 1.2) * 0.3, H * 1.45]],
  }
}
// Cada tramo se curva un poco hacia un lado; los arrastres van en línea recta
function cursorAt(keys: Key[], T: number): Pt {
  if (T <= keys[0][0]) return [keys[0][1], keys[0][2]]
  for (let i = 0; i < keys.length - 1; i++) {
    const [a, ax, ay] = keys[i], [b, bx, by, qx, qy] = keys[i + 1]
    if (T <= b) {
      const p = EZ.easeInOutCubic((T - a) / (b - a || 1))
      if (qx !== undefined) { const u = 1 - p; return [u * u * ax + 2 * u * p * qx + p * p * bx, u * u * ay + 2 * u * p * qy + p * p * by] }
      const dx = bx - ax, dy = by - ay, dist = Math.hypot(dx, dy)
      const drag = TEAM.some(({ drag: [s, e] }) => a >= s - 0.01 && b <= e + 0.01)
      const bow = drag ? 0 : Math.sin(Math.PI * p) * 0.08 * dist
      const nx = dist ? -dy / dist : 0, ny = dist ? dx / dist : 0
      return [ax + dx * p + nx * bow, ay + dy * p + ny * bow]
    }
  }
  const l = keys[keys.length - 1]
  return [l[1], l[2]]
}

/** Mide la palabra y cada letra (cuando ya cargó la fuente) para colocar los cursores. */
function useLayout(wordRef: React.RefObject<HTMLSpanElement | null>, letterRefs: React.RefObject<(HTMLSpanElement | null)[]>, fs: number) {
  const [L, setL] = useState<Layout | null>(null)
  useLayoutEffect(() => {
    let n = 0, timer: ReturnType<typeof setTimeout> | undefined, alive = true
    const measure = () => {
      const w = wordRef.current
      if (!w || !w.offsetWidth) return false
      const ls = letterRefs.current.map(el => ({ x: el?.offsetLeft ?? 0, w: el?.offsetWidth ?? 0 }))
      setL({ W: w.offsetWidth, H: w.offsetHeight, CW: ls[4].x + ls[4].w, ls })
      return true
    }
    const tick = () => { if (alive && !measure() && n++ < 60) timer = setTimeout(tick, 100) }
    document.fonts.ready.then(tick)
    return () => { alive = false; clearTimeout(timer) }
  }, [fs, wordRef, letterRefs])
  return L
}

function Caret({ T, L, ink, s }: { T: number; L: Layout | null; ink: string; s: number }) {
  if (!L) return null
  const typed = CL(Math.floor((T - TYPE_AT) / TYPE_STEP) + 1, 0, WORD.length)
  const x = typed === 0 ? 0 : L.ls[typed - 1].x + L.ls[typed - 1].w
  const typing = T < TYPE_AT + WORD.length * TYPE_STEP
  const inOutro = T >= OUT[1]
  let o = typing || inOutro ? 1 : (Math.floor(T * 2) % 2 === 0 ? 1 : 0)
  if (!typing && !inOutro) o *= 1 - fade(T, 3.4, 3.6)
  return <div className={c.caret} style={{ left: (inOutro ? 0 : x) + 20 * s, top: L.H * 0.12, width: Math.max(2, 3 * s), height: L.H * 0.76, background: ink, opacity: o }} />
}

const handle = (ui: number, extra: CSSProperties): CSSProperties => ({ width: 16 * ui, height: 16 * ui, ...extra })

/** Selección del cursor con degradado: se queda al final. */
function Box({ T, keys, ui }: { T: number; keys: Key[]; ui: number }) {
  const drag = TEAM[2].drag
  if (T < drag[0] || T > OUT[1]) return null
  const [cx, cy] = cursorAt(keys, Math.min(T, drag[1]))
  const [ax, ay] = cursorAt(keys, drag[0])
  const l = Math.min(ax, cx), r = Math.max(ax, cx), t = Math.min(ay, cy), b = Math.max(ay, cy)
  const hw = Math.max(1.5, 3 * ui)
  const hs = handle(ui, { border: `${hw}px solid transparent`, background: `linear-gradient(#FFFFFF,#FFFFFF) padding-box, ${GRAD_CSS} border-box` })
  return (
    <div className={c.box} style={{ left: l, top: t, width: r - l, height: b - t, opacity: 1 - fade(T, OUT[0], OUT[1]) }}>
      {/* Relleno con el degradado al 16%: tiñe las letras seleccionadas */}
      <div className={c.edge} style={{ inset: 0, background: GRAD_CSS, opacity: 0.16 }} />
      <div className={c.edge} style={{ left: 0, right: 0, top: 0, height: hw, background: GRAD_CSS }} />
      <div className={c.edge} style={{ left: 0, right: 0, bottom: 0, height: hw, background: GRAD_CSS }} />
      <div className={c.edge} style={{ left: 0, top: 0, bottom: 0, width: hw, background: CORAL }} />
      <div className={c.edge} style={{ right: 0, top: 0, bottom: 0, width: hw, background: LILA }} />
      <span className={c.node} style={{ ...hs, left: -10 * ui, top: -10 * ui }} />
      <span className={c.node} style={{ ...hs, right: -10 * ui, top: -10 * ui }} />
      <span className={c.node} style={{ ...hs, left: -10 * ui, bottom: -10 * ui }} />
      <span className={c.node} style={{ ...hs, right: -10 * ui, bottom: -10 * ui }} />
    </div>
  )
}

/** Selecciones rosa y coral: el clic fija una esquina y el cursor estira la opuesta; se desvanecen al irse su cursor. */
function SolidBoxes({ T, keys, ui }: { T: number; keys: Record<string, Key[]>; ui: number }) {
  return TEAM.filter(m => m.solid && m.fade).map(m => {
    const f = m.fade as [number, number]
    if (T < m.click || T >= f[1]) return null
    const k = keys[m.id], [ax, ay] = cursorAt(k, m.click), [cx, cy] = cursorAt(k, Math.min(T, m.drag[1]))
    const l = Math.min(ax, cx), r = Math.max(ax, cx), t = Math.min(ay, cy), bt = Math.max(ay, cy)
    const hw = Math.max(1.5, 3 * ui)
    const hs = handle(ui, { border: `${hw}px solid ${m.color}`, background: WHITE })
    return (
      <div key={m.id} className={c.solid} style={{ left: l, top: t, width: r - l, height: bt - t, opacity: 1 - fade(T, f[0], f[1]), border: `${hw}px solid ${m.color}`, background: `rgba(${hex(m.color).join(',')},.16)` }}>
        <span className={c.node} style={{ ...hs, left: -9 * ui, top: -9 * ui }} />
        <span className={c.node} style={{ ...hs, right: -9 * ui, top: -9 * ui }} />
        <span className={c.node} style={{ ...hs, left: -9 * ui, bottom: -9 * ui }} />
        <span className={c.node} style={{ ...hs, right: -9 * ui, bottom: -9 * ui }} />
      </div>
    )
  })
}

function CursorGlyph({ fill, grad }: { fill: string; grad?: boolean }) {
  return (
    <svg width="72" height="72" viewBox="-2 -2 28 28" fill="none" strokeLinecap="round" strokeLinejoin="round" className={c.glyph}>
      {grad && (
        <defs>
          <linearGradient id="clk-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF6B5B" /><stop offset="0.5" stopColor="#DF72CB" /><stop offset="1" stopColor="#AF86F7" />
          </linearGradient>
        </defs>
      )}
      <path d={CUR_PATH} fill={WHITE} stroke={WHITE} strokeWidth="5.5" />
      <path d={CUR_PATH} fill={fill} stroke={fill} strokeWidth="1.6" />
    </svg>
  )
}

function TeamCursor({ T, keys, m, ui }: { T: number; keys: Key[]; m: Member; ui: number }) {
  const [x, y] = cursorAt(keys, T)
  const grad = m.color === 'grad'
  // el cursor del degradado no desaparece: escribe la firma y sale de la pantalla
  const press = 1 - 0.16 * Math.max(0, 1 - Math.abs(T - m.click) / 0.14)
  return (
    <div className={c.cursor} style={{ left: x - 15, top: y - 15, transform: `scale(${press * ui})` }}>
      <CursorGlyph fill={grad ? 'url(#clk-grad)' : m.color} grad={grad} />
    </div>
  )
}

// Pre-intro: "Make it obvious" → borra "obvious" → "Make it Clickable" → borra "Make it" → queda "Clickable"
const PREFIX = 'Make it ', OBV = 'obvious'
const PRE = { a: 0.3, s1: 0.11, d1: 2.8, sd: 0.07, c: 3.6, sc: 0.12, d2: 5.3, g: [5.85, 6.75], end: 6.75, off: 3.55, scale: 0.78 }
function preState(T: number) {
  const n1 = CL(Math.floor((T - PRE.a) / PRE.s1) + 1, 0, PREFIX.length + OBV.length)
  const del1 = CL(Math.floor((T - PRE.d1) / PRE.sd) + 1, 0, OBV.length)
  const nc = CL(Math.floor((T - PRE.c) / PRE.sc) + 1, 0, WORD.length)
  const pre = Math.min(n1, PREFIX.length), obv = Math.max(0, n1 - PREFIX.length) - del1
  let caret: ['p' | 'o' | 'w', number]
  if (T < PRE.d1) caret = n1 <= PREFIX.length ? ['p', n1] : ['o', n1 - PREFIX.length]
  else if (T < PRE.c) caret = ['o', obv]
  else caret = ['w', nc]
  const hideCaret = T >= PRE.d2 && T < 6.3
  // "Make it" se selecciona (derecha → izquierda) y se disuelve mientras la cámara se acerca a Clickable
  const sel = EZ.easeInOutCubic(CL((T - PRE.d2) / 0.35, 0, 1))
  const fadeP = EZ.easeInOutCubic(CL((T - PRE.g[0]) / 0.5, 0, 1))
  const busy = (T >= PRE.a && T < PRE.a + 15 * PRE.s1 + 0.1) || (T >= PRE.d1 && T < PRE.d1 + 7 * PRE.sd + 0.1) || (T >= PRE.c && T < PRE.c + 9 * PRE.sc + 0.1)
  const g = EZ.easeInOutCubic(CL((T - PRE.g[0]) / (PRE.g[1] - PRE.g[0]), 0, 1))
  return { pre, obv, nc, caret, caretOn: !hideCaret && (busy || Math.floor(T * 2.5) % 2 === 0), g, sel, fadeP }
}
// Tras "Make it obvious" un cursor entra (abajo a la derecha), hace clic en el lienzo → oscuro, y sale arriba a la izquierda.
// Luego otro entra arriba a la derecha y arrastra de derecha a izquierda sobre "Make it". Coordenadas relativas a la palabra.
const PRE_CLICK = 2.6
const SEL_IN = [4.7, 5.25], SEL_DRAG = [PRE.d2, PRE.d2 + 0.35]
const quad = (A: Pt, Q: Pt, B: Pt, p: number): Pt => { const u = 1 - p; return [u * u * A[0] + 2 * u * p * Q[0] + p * p * B[0], u * u * A[1] + 2 * u * p * Q[1] + p * p * B[1]] }
const preDark = (T: number) => (T >= PRE_CLICK ? 1 : 0) * (1 - EZ.easeInOutCubic(CL((T - PRE.g[0]) / 0.6, 0, 1)))
type PrePath = Record<'click' | 'inA' | 'inQ' | 'outQ' | 'outB' | 'selA' | 'selQ' | 'a' | 'b' | 'exQ' | 'exB', Pt>
function prePath(W: number, H: number, pw: number): PrePath {
  return {
    click: [W * 0.62, H * 1.75],
    inA: [W + 700, H * 3.6], inQ: [W * 1.1, H * 2.6],
    outQ: [W * 0.05, H * 1.9], outB: [-pw - 900, -H * 2.6],
    selA: [W + 800, -H * 2.8], selQ: [W * 0.2, -H * 1.2],
    a: [-0.1 * H, 0.86 * H], b: [-pw + 0.03 * H, 0.86 * H], exQ: [-pw - 0.2 * H, 1.6 * H], exB: [-pw - 900, 3.2 * H],
  }
}
function preCursorAt(T: number, G: PrePath): Pt | null {
  if (T < 2.2) return null
  if (T < PRE_CLICK) return quad(G.inA, G.inQ, G.click, EZ.easeOutCubic((T - 2.2) / (PRE_CLICK - 2.2)))
  if (T < 2.75) return G.click
  if (T < 3.45) { const p = (T - 2.75) / 0.7; return quad(G.click, G.outQ, G.outB, p * p * p) }
  if (T < SEL_IN[0]) return null
  if (T < SEL_IN[1]) return quad(G.selA, G.selQ, G.a, EZ.easeOutCubic((T - SEL_IN[0]) / (SEL_IN[1] - SEL_IN[0])))
  if (T < SEL_DRAG[0]) return G.a
  if (T < SEL_DRAG[1]) { const p = EZ.easeInOutCubic((T - SEL_DRAG[0]) / (SEL_DRAG[1] - SEL_DRAG[0])); return [G.a[0] + (G.b[0] - G.a[0]) * p, G.a[1]] }
  if (T < PRE.g[0]) return G.b
  if (T < PRE.g[0] + 0.6) { const p = (T - PRE.g[0]) / 0.6; return quad(G.b, G.exQ, G.exB, p * p * p) }
  return null
}
function PreCursor({ T, G, ui }: { T: number; G: PrePath; ui: number }) {
  const pos = preCursorAt(T, G)
  if (!pos) return null
  const [x, y] = pos
  const dragging = T >= SEL_DRAG[0] - 0.05 && T <= SEL_DRAG[1] + 0.05
  const press = dragging ? 0.88 : 1 - 0.16 * Math.max(0, 1 - Math.abs(T - PRE_CLICK) / 0.14)
  const rp = (T - PRE_CLICK) / 0.55, r = 10 + 60 * EZ.easeOutCubic(CL(rp, 0, 1))
  return (
    <>
      {rp >= 0 && rp <= 1 && <div className={c.ripple} style={{ left: G.click[0] - r, top: G.click[1] - r, width: r * 2, height: r * 2, borderColor: CORAL, opacity: 1 - rp }} />}
      <div className={c.cursor} style={{ left: x - 15, top: y - 15, transform: `scale(${press * ui})` }}>
        {/* el primer cursor (clic en el lienzo) es coral; el que selecciona "Make it", morado */}
        <CursorGlyph fill={T < SEL_IN[0] ? CORAL : LILA} />
      </div>
    </>
  )
}
function InCaret({ ink }: { ink: string }) {
  return <span className={c.inCaret}><span style={{ background: ink }} /></span>
}

// Subtítulo tipo karaoke bajo la palabra: una frase por cursor; el color se extiende letra por letra
// desde una letra de origen (la p de "product", la s de "works")
const SUBS = [
  { at: 4.5, who: 'pink', out: [5.85, 6.1], text: 'The UX your product is missing', origin: 29, color: PINK, fromDrag: true },
  { at: 6.65, who: 'coral', out: [8.05, 8.3], text: 'UX for software that works', origin: 25, color: CORAL, fromDrag: false },
]
function Subtitle({ T, ink, out, s, keys, L }: { T: number; ink: string; out: number; s: number; keys: Record<string, Key[]>; L: Layout }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]), word = useRef<HTMLDivElement>(null), ox = useRef<Record<number, number>>({})
  const sub = SUBS.filter(x => T >= x.at).pop()
  useLayoutEffect(() => {
    if (!sub || ox.current[sub.at] != null) return
    const el = refs.current[sub.origin], wd = word.current?.parentElement
    if (!el || !wd) return
    const W = wd.getBoundingClientRect(), r = el.getBoundingClientRect(), k = W.width / L.W || 1
    ox.current[sub.at] = (r.left + r.width / 2 - W.left) / k
  })
  if (!sub || T >= sub.out[1]) return null // se va junto con su cursor
  const m = TEAM.find(x => x.id === sub.who) as Member
  // si la selección nunca pasa por la letra de origen, la ola termina justo al soltar
  let tint = sub.fromDrag ? m.drag[0] : m.drag[1] - (Math.max(sub.origin, sub.text.length - 1 - sub.origin) * 0.014 + 0.16)
  const x0 = ox.current[sub.at]
  if (!sub.fromDrag && x0 != null) {
    for (let t = m.drag[0]; t <= m.drag[1]; t += 0.01) if (cursorAt(keys[m.id], t)[0] <= x0) { tint = t; break }
  }
  const e = EZ.easeOutCubic(CL((T - sub.at) / 0.3, 0, 1)) * (1 - fade(T, sub.out[0], sub.out[1]))
  let n = 0
  return (
    <div ref={word} className={c.subtitle} style={{ top: `calc(100% + ${13 * s}px)`, transform: `translate(-50%, ${(1 - e) * 14 * s}px)`, opacity: e * out, gap: `0 ${15 * s}px`, fontSize: 60 * s }}>
      {sub.text.split(' ').map((w, wi) => {
        const start = n
        n += w.length + 1
        return (
          <span key={wi} className={c.subWord}>
            {w.split('').map((ch, ci) => {
              const idx = start + ci, t0 = tint + Math.abs(idx - sub.origin) * 0.014
              const f = EZ.easeInOutSine(CL((T - t0) / 0.16, 0, 1))
              return <span key={ci} ref={el => { refs.current[idx] = el }} style={{ color: f <= 0 ? ink : f >= 1 ? sub.color : mix(ink, sub.color, f) }}>{ch}</span>
            })}
          </span>
        )
      })}
    </div>
  )
}

/**
 * Firma "UX design": aparece bajo la palabra (alineada a la derecha). "design" empieza en el color del
 * texto y se pinta con el degradado de izquierda a derecha justo donde va pasando el cursor.
 */
function Signature({ T, ink, out, s, sigRef, sw, cx, W }: {
  T: number; ink: string; out: number; s: number
  sigRef: React.RefObject<HTMLDivElement | null>; sw: number; cx: number | null; W: number
}) {
  const p = fade(T, SIG_T[0], SIG_T[1])
  const dRef = useRef<HTMLSpanElement>(null)
  const [dOff, setDOff] = useState<number | null>(null)
  useLayoutEffect(() => {
    const d = dRef.current?.offsetLeft
    if (d != null && d !== dOff) setDOff(d)
  })
  // Borde del pintado: posición del cursor respecto al inicio de "design", con orilla suave de ±40px×s
  const dl = dOff != null && sw ? W - sw + dOff : null
  const pos = cx == null || dl == null ? (T > SIG_T[1] + 1.5 ? 1e4 : -1e4) : cx - dl
  const soft = 40 * s
  const gradMask = `linear-gradient(90deg, #000 ${pos - soft}px, transparent ${pos + soft}px)`
  const inkMask = `linear-gradient(90deg, transparent ${pos - soft}px, #000 ${pos + soft}px)`
  return (
    <div ref={sigRef} className={c.signature} style={{ marginTop: -19 * s, gap: 11 * s, opacity: out * p, transform: `translateY(${(1 - p) * 14 * s}px)` }}>
      <span className={c.sigUx} style={{ fontSize: 55 * s, color: ink }}>UX</span>
      <span ref={dRef} className={c.sigDesign} style={{ fontSize: 62 * s }}>
        <span style={{ color: ink, WebkitMaskImage: inkMask, maskImage: inkMask }}>design</span>
        <span className={c.sigGrad} style={{ backgroundImage: GRAD_CSS, WebkitMaskImage: gradMask, maskImage: gradMask }}>design</span>
      </span>
    </div>
  )
}

/** Un cuadro de la animación en el tiempo TG (segundos, incluye el pre-intro). */
function Piece({ TG, fs, ui, dotK, farD }: { TG: number; fs: number; ui: number; dotK: number; farD: number }) {
  const inPre = TG < PRE.end
  const T = Math.max(0, TG - PRE.off)
  const P = inPre ? preState(TG) : null
  const prefixRef = useRef<HTMLSpanElement>(null)
  const [pw, setPw] = useState(0)
  const s = fs / 230
  const wordRef = useRef<HTMLSpanElement>(null), letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const L = useLayout(wordRef, letterRefs, fs)

  const sigRef = useRef<HTMLDivElement>(null)
  const [sw, setSw] = useState(0)

  // Anchos de "Make it " (para centrar la frase) y de la firma (para que el cursor la recorra)
  useLayoutEffect(() => {
    const w = prefixRef.current?.offsetWidth
    if (w && w !== pw) setPw(w)
    const ws = sigRef.current?.offsetWidth
    if (ws && ws !== sw) setSw(ws)
  })

  let G: PrePath | null = null
  if (L) {
    G = prePath(L.W, L.H, pw)
    const ctr: Pt = [L.W / 2, L.H / 2]
    ;(['inA', 'outB', 'selA', 'exB'] as const).forEach(k => { if (G) G[k] = farPt(G[k], ctr, farD) })
  }
  const keys = L ? farKeys(teamKeys(L, sw), L, farD) : null
  const typed = CL(Math.floor((T - TYPE_AT) / TYPE_STEP) + 1, 0, WORD.length)
  const out = 1 - fade(T, OUT[0], OUT[1])
  const f = P ? preDark(TG) : darkAt(T)
  const on = f > 0.5
  const bg = mix('#FFFFFF', '#0C0A10', f), bg2 = mix('#F5F5F5', '#2A2634', f)
  const dot = on ? '#37333C' : '#DCDBDF', ink = on ? '#FCFCFD' : INK

  return (
    <div className={c.piece} style={{
      backgroundColor: bg,
      backgroundImage: `radial-gradient(${dot} ${2.7 * dotK}px, transparent ${3.1 * dotK}px), linear-gradient(155deg, ${bg}, ${bg2})`,
      backgroundSize: `${52 * dotK}px ${52 * dotK}px, 100% 100%`,
    }}>
      <div className={c.center}>
        <div className={c.stack} style={{ transform: P ? `translateX(${(1 - P.g) * pw * PRE.scale / 2}px) scale(${PRE.scale + (1 - PRE.scale) * P.g})` : 'none' }}>
          <span ref={wordRef} className={c.word} style={{ fontSize: fs, color: ink }}>
            {WORD.split('').map((ch, i) => (
              <Fragment key={i}>
                {P && P.caretOn && P.caret[0] === 'w' && P.caret[1] === i && <InCaret ink={ink} />}
                <span ref={el => { letterRefs.current[i] = el }} style={{ opacity: P ? (i < P.nc ? 1 : 0) : (i < typed ? out : 0) }}>{ch}</span>
              </Fragment>
            ))}
            {P && P.caretOn && P.caret[0] === 'w' && P.caret[1] === WORD.length && <InCaret ink={ink} />}
            {P && (
              <span ref={prefixRef} className={c.prefix} style={{ opacity: 1 - P.fadeP, filter: `blur(${P.fadeP * 10}px)` }}>
                <span className={c.prefixSel} style={{ width: `calc((100% - 0.12em) * ${P.sel})`, background: on ? 'rgba(175,134,247,.38)' : 'rgba(175,134,247,.28)' }} />
                {PREFIX.split('').map((ch, i) => (
                  <Fragment key={i}>
                    {P.caretOn && P.caret[0] === 'p' && P.caret[1] === i && <InCaret ink={ink} />}
                    <span style={{ opacity: i < P.pre ? 1 : 0 }}>{ch}</span>
                  </Fragment>
                ))}
                {P.caretOn && P.caret[0] === 'p' && P.caret[1] === PREFIX.length && <InCaret ink={ink} />}
              </span>
            )}
            {P && (
              <span className={c.obvious}>
                {OBV.split('').map((ch, i) => (
                  <Fragment key={i}>
                    {P.caretOn && P.caret[0] === 'o' && P.caret[1] === i && <InCaret ink={ink} />}
                    <span style={{ opacity: i < P.obv ? 1 : 0 }}>{ch}</span>
                  </Fragment>
                ))}
                {P.caretOn && P.caret[0] === 'o' && P.caret[1] === OBV.length && <InCaret ink={ink} />}
              </span>
            )}
            {!P && <Caret T={T} L={L} ink={ink} s={s} />}
            {keys && L && (
              <>
                <Box T={T} keys={keys.grad} ui={ui} />
                <SolidBoxes T={T} keys={keys} ui={ui} />
                <Subtitle T={T} ink={ink} out={out} s={s} keys={keys} L={L} />
                {P && G && <PreCursor T={TG} G={G} ui={ui} />}
                <div style={{ opacity: P ? 0 : 1 }}>
                  {TEAM.map(m => <TeamCursor key={m.id} T={T} keys={keys[m.id]} m={m} ui={ui} />)}
                </div>
              </>
            )}
          </span>
          <Signature T={T} ink={ink} out={out} s={s} sigRef={sigRef} sw={sw} cx={keys ? cursorAt(keys.grad, T)[0] : null} W={L ? L.W : 0} />
        </div>
      </div>
    </div>
  )
}

/**
 * Intro del home: llena su contenedor, se reproduce una vez a 1.05× y se queda en el
 * último cuadro compuesto (justo antes del fundido del reel). Un clic la reinicia. Con movimiento reducido, va directo al final.
 */
export function ClickableIntro() {
  const box = useRef<HTMLDivElement>(null)
  const [T, setT] = useState(0)
  const [dim, setDim] = useState({ w: 0, h: 0, fs: 80 })
  const play = useRef<() => void>(() => {})

  useEffect(() => {
    const END = OUT[0] + PRE.off - 0.01
    let raf = 0
    let endTimer: ReturnType<typeof setTimeout> | undefined
    let scrolled = false
    let scrollRaf = 0
    // Deja el header a ~23% de la pantalla, con "Clickable" todavía a la vista en la franja de arriba.
    // Mientras dura el parallax el header sube 2 px por cada px de scroll: scroll = (posición actual − destino) / 2
    const autoScroll = () => {
      if (window.scrollY > 10) return
      const header = document.querySelector('header')
      if (!header) return
      const target = Math.max(window.innerHeight * 0.23, 200)
      const top = (header.getBoundingClientRect().top - target) / 2
      if (top <= 0) return
      // Scroll propio (el 'smooth' del navegador es corto y brusco): 1.6 s con entrada y salida suaves.
      // Si la persona toca, usa la rueda o una tecla, se suelta
      const from = window.scrollY, dist = top - from, dur = 1600, t0 = performance.now()
      const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2)
      let stop = false
      const cancel = () => { stop = true }
      const evs = ['wheel', 'touchstart', 'keydown', 'mousedown'] as const
      evs.forEach(e => window.addEventListener(e, cancel, { passive: true, once: true }))
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / dur)
        if (stop) return
        window.scrollTo({ top: from + dist * ease(p), behavior: 'instant' })
        if (p < 1) scrollRaf = requestAnimationFrame(step)
        else evs.forEach(e => window.removeEventListener(e, cancel))
      }
      scrollRaf = requestAnimationFrame(step)
    }
    // Arranca (o reinicia) el reloj desde cero
    play.current = () => {
      cancelAnimationFrame(raf)
      clearTimeout(endTimer)
      scrolled = false
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setT(END); return }
      const t0 = performance.now()
      const tick = (now: number) => {
        const t = (now - t0) / 1000 * HERO_SPEED
        // En cuanto el cursor del degradado sale (la firma ya está), baja sola si la persona sigue arriba
        if (!scrolled && t >= AUTO_SCROLL_AT) {
          scrolled = true
          endTimer = setTimeout(autoScroll, 200)
        }
        if (t >= END) { setT(END); return }
        setT(t)
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    play.current()
    // El tamaño de la palabra depende del contenedor: así "Clickable" y los subtítulos siempre caben
    const fit = () => {
      const el = box.current
      if (!el) return
      const W = el.clientWidth, H = el.clientHeight
      const k = W < 640 ? 0.155 : W < 1100 ? 0.0983 : 0.0756
      setDim({ w: W, h: H, fs: Math.round(Math.max(30, Math.min(101, W * k, H * 0.24))) })
    }
    fit()
    const ro = new ResizeObserver(fit)
    if (box.current) ro.observe(box.current)
    return () => { cancelAnimationFrame(raf); cancelAnimationFrame(scrollRaf); clearTimeout(endTimer); ro.disconnect() }
  }, [])

  return (
    // Un clic en la intro la vuelve a reproducir desde el principio
    <div ref={box} className={c.stage} aria-hidden onClick={() => play.current()}>
      {dim.w > 0 && <Piece TG={T} fs={dim.fs} ui={0.55} dotK={0.48} farD={Math.hypot(dim.w, dim.h) * 0.62} />}
    </div>
  )
}
