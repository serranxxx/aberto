/*
 * Motion de los stickers con Web Animations API.
 * Cada sticker con [data-anim] se anima una sola vez al entrar en viewport
 * (threshold .4) y después queda en loop. Se usan las propiedades individuales
 * translate/scale/rotate para no pisar el transform (inclinación) de cada sticker.
 * Desactivado con prefers-reduced-motion.
 */

const EZ = 'cubic-bezier(.2,.8,.2,1)'
const NS = 'http://www.w3.org/2000/svg'
const TYPE_WORDS = ['Diseño UX', 'Flujos de usuario', 'Sistemas de diseño']

type Ctx = {
  later: (fn: () => void, ms: number) => void
  raf: (fn: FrameRequestCallback) => void
  cleanup: (fn: () => void) => void
}

const pop = (el: Element, delay = 0) =>
  el.animate(
    [
      { opacity: 0, scale: '.6', translate: '0 30px' },
      { opacity: 1, scale: '1.08', translate: '0 -4px', offset: 0.65 },
      { opacity: 1, scale: '1', translate: '0 0' },
    ],
    { duration: 650, delay, easing: EZ, fill: 'backwards' },
  )

const float = (c: Ctx, el: Element, delay: number, amp = 6, duration = 3000) =>
  c.later(() => {
    el.animate([{ translate: '0 0' }, { translate: `0 -${amp}px` }], {
      duration,
      direction: 'alternate',
      iterations: Infinity,
      easing: 'ease-in-out',
      composite: 'add',
    })
  }, delay)

const MOTIONS: Record<string, (el: HTMLElement, i: number, c: Ctx) => void> = {
  /** Cursor del hero: entra y luego hace clic en su lugar cada pocos segundos. */
  cursor: (el, _i, c) => {
    el.animate([{ opacity: 0, translate: '-12px 12px' }, { opacity: 1, translate: '0 0' }], {
      duration: 700, delay: 300, easing: 'cubic-bezier(.3,0,.1,1)', fill: 'backwards',
    })
    // El clic se encoge hacia la punta de la flecha
    el.style.transformOrigin = '23% 22%'
    const loop = () => {
      // Baja con suavidad, rebota apenas y se asienta
      el.animate(
        [
          { scale: '1', easing: 'cubic-bezier(.45,0,.55,1)' },
          { scale: '.86', offset: 0.32, easing: 'cubic-bezier(.3,0,.2,1)' },
          { scale: '1.04', offset: 0.68, easing: 'cubic-bezier(.45,0,.55,1)' },
          { scale: '1' },
        ],
        { duration: 760 },
      )
      c.later(loop, 2600)
    }
    c.later(loop, 1300)
  },

  /** Comentarios de "¿Te suena?": aparecen uno tras otro, deslizándose suave y sin rebote. */
  comment: (el, i) => {
    el.animate(
      [
        { opacity: 0, scale: '.98', translate: '0 18px' },
        { opacity: 1, scale: '1', translate: '0 0' },
      ],
      { duration: 900, delay: 100 + i * 140, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' },
    )
  },

  pop: (el, i, c) => {
    pop(el, 100 + i * 120)
    float(c, el, 900, 5, 2800 + i * 300)
  },

  /** Botón "Ver código": se presiona cada 3.4s. */
  press: (el, _i, c) => {
    pop(el, 350)
    const loop = () => {
      el.animate([{ scale: '1' }, { scale: '.92', offset: 0.4 }, { scale: '1.03', offset: 0.7 }, { scale: '1' }], {
        duration: 500, easing: 'ease-out', composite: 'add',
      })
      c.later(loop, 3400)
    }
    c.later(loop, 1600)
  },

  /** Pluma: entra rotada y luego "escribe" con un vaivén suave. */
  pen: (el, _i, c) => {
    el.animate([{ opacity: 0, translate: '40px -40px', rotate: '18deg' }, { opacity: 1, translate: '0 0', rotate: '0deg' }], {
      duration: 1100, delay: 500, easing: 'cubic-bezier(.25,.1,.25,1)', fill: 'backwards',
    })
    c.later(() => {
      el.animate(
        [
          { translate: '0 0', rotate: '0deg' },
          { translate: '-6px 2px', rotate: '-3deg', offset: 0.25 },
          { translate: '-10px -1px', rotate: '-1deg', offset: 0.5 },
          { translate: '-4px 2px', rotate: '2deg', offset: 0.75 },
          { translate: '0 0', rotate: '0deg' },
        ],
        { duration: 4200, iterations: Infinity, easing: 'cubic-bezier(.45,.05,.55,.95)' },
      )
    }, 1300)
  },

  /** Buscador: máquina de escribir que alterna palabras. */
  type: (el, _i, c) => {
    pop(el, 150)
    const t = el.querySelector<HTMLElement>('[data-type-text]')
    if (!t) return
    const original = t.textContent
    c.cleanup(() => { t.textContent = original })
    let w = 0
    const type = (str: string, k = 0) => {
      t.textContent = str.slice(0, k)
      if (k < str.length) c.later(() => type(str, k + 1), 70 + Math.random() * 60)
      else c.later(() => erase(str, str.length), 1600)
    }
    const erase = (str: string, k: number) => {
      t.textContent = str.slice(0, k)
      if (k > 0) c.later(() => erase(str, k - 1), 35)
      else {
        w = (w + 1) % TYPE_WORDS.length
        c.later(() => type(TYPE_WORDS[w]), 350)
      }
    }
    t.textContent = ''
    c.later(() => type(TYPE_WORDS[0]), 700)
  },

  /** Bifurcación: el trazo se dibuja, las pills rebotan y una bolita elige rama. */
  fork: (el, _i, c) => {
    const path = el.querySelector('path[pathLength]')
    const pills = [...el.querySelectorAll(':scope > span')]
    const svg = el.querySelector('svg')
    el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, fill: 'backwards' })
    path?.animate([{ strokeDasharray: '1 1', strokeDashoffset: 1 }, { strokeDasharray: '1 1', strokeDashoffset: 0 }], {
      duration: 1100, easing: 'cubic-bezier(.6,0,.2,1)', fill: 'backwards',
    })
    pills.forEach((pl, k) =>
      pl.animate([{ opacity: 0, scale: '.4' }, { opacity: 1, scale: '1.15', offset: 0.7 }, { opacity: 1, scale: '1' }], {
        duration: 420, delay: 900 + k * 220, easing: EZ, fill: 'backwards',
      }),
    )
    if (!svg) return

    const added: SVGElement[] = []
    const mk = (d: string) => {
      const q = document.createElementNS(NS, 'path')
      q.setAttribute('d', d)
      q.setAttribute('fill', 'none')
      q.setAttribute('stroke', 'none')
      svg.appendChild(q)
      added.push(q)
      return q
    }
    const routes = [mk('M10 65H58C80 65 78 25 100 25H150'), mk('M10 65H58C80 65 78 105 100 105H150')]
    const dot = document.createElementNS(NS, 'circle')
    dot.setAttribute('r', '7')
    dot.setAttribute('fill', '#FFFFFF')
    dot.style.filter = 'drop-shadow(0 0 6px rgba(255,255,255,.7))'
    dot.style.opacity = '0'
    svg.appendChild(dot)
    added.push(dot)
    c.cleanup(() => added.forEach(n => n.remove()))

    let last = 1
    const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
    const go = () => {
      // 60% de las veces cambia de rama
      const k = Math.random() < 0.6 ? 1 - last : last
      last = k
      const r = routes[k], L = r.getTotalLength(), D = 1700, t0 = performance.now()
      const step = (now: number) => {
        const x = Math.min(1, (now - t0) / D)
        const pt = r.getPointAtLength(ease(x) * L)
        dot.setAttribute('cx', String(pt.x))
        dot.setAttribute('cy', String(pt.y))
        dot.style.opacity = String(x < 0.08 ? x / 0.08 : x > 0.92 ? (1 - x) / 0.08 : 1)
        if (x < 1) c.raf(step)
        else {
          pills[k]?.animate([{ scale: '1' }, { scale: '1.22', offset: 0.35 }, { scale: '1' }], { duration: 500, easing: 'ease-out' })
          c.later(go, 900)
        }
      }
      c.raf(step)
    }
    c.later(go, 1600)
  },

  /** Slider: el knob recorre la barra cada 5.6s. */
  slider: (el, _i, c) => {
    pop(el, 100)
    const knob = el.querySelector('[data-knob]')
    if (!knob) return
    const run = () =>
      knob.animate([{ left: '62%' }, { left: '12%', offset: 0.3 }, { left: '88%', offset: 0.7 }, { left: '62%' }], {
        duration: 2600, easing: 'cubic-bezier(.45,0,.25,1)',
      })
    c.later(run, 800)
    const loop = () => { run(); c.later(loop, 5600) }
    c.later(loop, 5000)
  },
}

/** Arranca el motion de todos los [data-anim] dentro de root. Devuelve la función de limpieza. */
export function startStickerMotion(root: HTMLElement): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const timers: ReturnType<typeof setTimeout>[] = []
  const frames = new Set<number>()
  const cleanups: (() => void)[] = []
  const animated: HTMLElement[] = []
  const ctx: Ctx = {
    later: (fn, ms) => { timers.push(setTimeout(fn, ms)) },
    raf: fn => {
      const id = requestAnimationFrame(now => { frames.delete(id); fn(now) })
      frames.add(id)
    },
    cleanup: fn => { cleanups.push(fn) },
  }

  const counts: Record<string, number> = {}
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return
      const el = e.target as HTMLElement
      io.unobserve(el)
      const kind = el.dataset.anim ?? 'pop'
      const i = (counts[kind] = (counts[kind] ?? -1) + 1)
      animated.push(el)
      ;(MOTIONS[kind] ?? MOTIONS.pop)(el, i, ctx)
    })
  }, { threshold: 0.4 })

  root.querySelectorAll<HTMLElement>('[data-anim]').forEach(el => io.observe(el))

  return () => {
    io.disconnect()
    timers.forEach(clearTimeout)
    frames.forEach(cancelAnimationFrame)
    animated.forEach(el => el.getAnimations({ subtree: true }).forEach(a => a.cancel()))
    cleanups.forEach(fn => fn())
  }
}
