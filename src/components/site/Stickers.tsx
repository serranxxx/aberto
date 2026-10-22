/*
 * Sistema de stickers decorativos: componentes de UI y flechas inclinados.
 * Siempre aria-hidden y sin eventos de puntero. Se ocultan en pantallas angostas
 * y se reducen en medianas (ver stickers.module.css).
 */
import st from './stickers.module.css'

export type IconName =
  | 'cursor' | 'frame' | 'pen' | 'text' | 'code' | 'dropper' | 'hand' | 'play' | 'chevron' | 'check' | 'search'

/** Sprite de íconos y el degradado de marca. Se monta una vez por página. */
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <defs>
        <linearGradient id="g-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF6B5B" />
          <stop offset="1" stopColor="#AF86F7" />
        </linearGradient>
        <symbol id="i-cursor" viewBox="0 0 24 24"><path d="M5.4 4.25 18.9 9.6Q20 10.1 19.5 11.1Q19.2 11.7 18.5 11.8L14.4 13.1Q13.6 13.4 13.3 14.2L11.5 19.3Q11.1 20.2 10.3 19.6Q10 19.3 9.9 18.9L4.15 5.6Q3.8 4.6 4.5 4.25Q4.9 4.05 5.4 4.25Z" /></symbol>
        <symbol id="i-frame" viewBox="0 0 24 24"><path d="M7.6 4V20M16.4 4V20M4 7.6H20M4 16.4H20" /></symbol>
        <symbol id="i-pen" viewBox="0 0 24 24"><path d="M5.2 4.3C8.5 4.6 12 5.2 14.5 6.2 17 7.2 18.3 9 18.5 11L18.7 12.6 20 13.9 14.3 19.6 13.2 18.6C11 17.9 8 17.1 6.3 15 4.9 13.1 4.3 10.2 4.1 6.2 4 5.2 4.3 4.25 5.2 4.3Z" /><circle cx="11.75" cy="11.9" r="2.05" /><path d="M5.1 5.1 10.3 10.4" /></symbol>
        <symbol id="i-text" viewBox="0 0 24 24"><path d="M4 7.8V4H20V7.8M12 4V20M8.6 20H15.4" /></symbol>
        <symbol id="i-code" viewBox="0 0 24 24"><path d="M8.2 7.8 4 10.6 8.2 13.4M15.8 7.8 20 10.6 15.8 13.4M13 6.6 10.8 16.6" /></symbol>
        <symbol id="i-dropper" viewBox="0 0 24 24"><g transform="rotate(45 12 11.7)"><path d="M10.8 5.6C10.8 5 10.4 4.6 10.4 3.9V2.9a1.6 1.6 0 0 1 3.2 0V3.9C13.6 4.6 13.2 5 13.2 5.6" /><rect x="8.3" y="5.6" width="7.4" height="1.8" rx="0.9" /><path d="M10.75 7.4V16.8L11.3 21.4Q12 22.4 12.7 21.4L13.25 16.8V7.4" /></g></symbol>
        <symbol id="i-hand" viewBox="0 0 24 24"><path d="M8.5 13V5.7Q8.5 5.1 9.1 5.1H10.4Q10.9 5.1 10.9 4.7Q10.9 4.2 11.4 4.2H13.25Q13.75 4.2 13.75 4.7V5H16.1Q16.6 5 16.6 5.5V6.9H18.75Q19.35 6.9 19.35 7.5V14C19.35 17.5 16.5 19.8 12.8 19.8 10.5 19.8 8.7 18.8 7.6 17.2L4.7 12.2Q4.5 11.5 5.1 11.3Q5.6 11.1 6 11.5L8.5 13Z" /><path d="M10.9 5.1V10.35M13.75 5V10.35M16.6 6.9V10.35" /></symbol>
        <symbol id="i-play" viewBox="0 0 24 24"><path d="M5.2 5.3Q5.2 4 6.33 4.63L18.37 11.37Q19.5 12 18.37 12.63L6.33 19.37Q5.2 20 5.2 18.7Z" /></symbol>
        <symbol id="i-chevron" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" /></symbol>
        <symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></symbol>
        <symbol id="i-search" viewBox="0 0 24 24"><circle cx="10.5" cy="10.6" r="6.5" /><path d="M15.4 15.4 19.5 19" /></symbol>
      </defs>
    </svg>
  )
}

/** Ícono de línea simple. */
export function Icon({ name, size, stroke, width = 1.5 }: { name: IconName; size: number; stroke: string; width?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round">
      <use href={`#i-${name}`} />
    </svg>
  )
}

/** Ícono-sticker: contorno blanco grueso debajo y trazo con degradado encima. */
export function StickerIcon({ name, size, inner = 1.35, outer = 5.5, solid, anim, className, style }: {
  name: IconName
  /** Color sólido de relleno en lugar del contorno con degradado */
  solid?: string
  anim?: string
  size?: number | string
  inner?: number
  outer?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-2 -2 28 28"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${st.stickerIcon} ${className ?? ''}`}
      style={style}
      data-anim={anim}
      aria-hidden
    >
      <use href={`#i-${name}`} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={outer} />
      <use href={`#i-${name}`} fill={solid ?? 'none'} stroke={solid ?? 'url(#g-accent)'} strokeWidth={inner} />
    </svg>
  )
}

/** Servicios: barra de herramientas, buscador y pluma. */
export function ServicesStickers() {
  return (
    <div className={`${st.deco} ${st.services}`} aria-hidden>
      <div data-anim="pop" className={st.sticker} style={{ position: 'absolute', right: 8, top: 0, zIndex: 2, transform: 'rotate(4deg)', borderRadius: 22 }}>
        <div className={st.toolbar}>
          <div className={st.toolOn}><Icon name="cursor" size={22} stroke="#FFFFFF" /></div>
          <div className={st.tool}><Icon name="frame" size={22} stroke="#C2C0C7" /></div>
          <div className={st.tool}><Icon name="pen" size={22} stroke="#C2C0C7" /></div>
          <div className={st.tool}><Icon name="text" size={22} stroke="#C2C0C7" /></div>
        </div>
      </div>
      <div data-anim="type" className={st.sticker} style={{ position: 'absolute', left: 0, top: 56, transform: 'rotate(-3deg)', borderRadius: 22 }}>
        <div className={st.search}>
          <Icon name="search" size={20} stroke="#605D66" width={1.75} />
          <span className={st.searchText}><span data-type-text style={{ whiteSpace: 'pre' }}>Diseño UX</span><span className={st.caret} /></span>
          <span className={st.kbd}>⌘K</span>
        </div>
      </div>
      <StickerIcon name="pen" size={54} anim="pen" style={{ position: 'absolute', left: 236, top: 92, zIndex: 3, transform: 'rotate(-6deg)' }} />
    </div>
  )
}

/** Por qué yo: bifurcación Sí / No. */
export function ForkSticker({ yes, no }: { yes: string; no: string }) {
  return (
    <span data-anim="fork" className={`${st.decoInline} ${st.fork}`} aria-hidden>
      <svg width="170" height="130" viewBox="0 0 170 130" fill="none" strokeLinecap="round" strokeLinejoin="round" className={st.forkSvg}>
        <defs>
          <linearGradient id="whyfork" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="170" y2="130">
            <stop offset="0" stopColor="#FF6B5B" />
            <stop offset="1" stopColor="#AF86F7" />
          </linearGradient>
        </defs>
        <path d="M10 65H58C80 65 78 25 100 25H156M146 15 157 25 146 35M58 65C80 65 78 105 100 105H156M146 95 157 105 146 115" stroke="url(#whyfork)" strokeWidth="8" pathLength={1} />
      </svg>
      <span className={st.forkPill} style={{ top: -2 }}>{yes}</span>
      <span className={st.forkPill} style={{ bottom: -2 }}>{no}</span>
    </span>
  )
}

/** Trabajo: slider de degradado sobre el botón "Ver código". */
export function WorkStickers({ code }: { code: string }) {
  return (
    <div className={`${st.decoFlex} ${st.work}`} aria-hidden>
      <div data-anim="slider" className={st.sticker} style={{ position: 'relative', zIndex: 3, margin: '0 0 -18px 90px', borderRadius: 999, transform: 'translate(31px, 10px) rotate(27deg) scale(0.97, 1.05)' }}>
        <div className={st.slider}>
          <div data-knob className={st.knob}><div /></div>
        </div>
      </div>
      <div data-anim="press" className={st.sticker} style={{ position: 'relative', zIndex: 2, borderRadius: 999, transform: 'rotate(3deg)' }}>
        <div className={st.codeBtn}>
          <span>{code}</span>
          <span className={st.codeIcon}><Icon name="code" size={20} stroke="url(#g-accent)" width={1.75} /></span>
        </div>
      </div>
    </div>
  )
}
