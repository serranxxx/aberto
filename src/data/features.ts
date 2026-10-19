// Contenido de cada feature. Campos vacíos ('' o []) se ocultan en la página de detalle.
// img: null → placeholder hasta tener captura.
import type { Feature, Product, Theme } from './types'

export const PRODUCTS: Record<string, Product> = {
  iattend: { name: 'I attend', badgeEs: 'Proyecto propio · SaaS', badgeEn: 'My own project · SaaS', es: 'SaaS para la gestión de eventos: invitaciones, invitados, confirmaciones y acomodo. La fundé, la diseñé y la desarrollé; hoy está en producción con usuarios reales que pagan.', en: 'A SaaS for event management: invitations, guests, RSVPs and seating. I founded, designed and built it; it’s live today with real, paying users.', roleEs: 'Fundador · diseño y desarrollo', roleEn: 'Founder · design and development',
    // Datos reales de I attend (Admin → Analítica de iattend-vite), consultados el 15 oct 2026.
    // Eventos, envíos y confirmados incluyen invitaciones + side events + flash, también los de prueba.
    // Respuesta: 88.4% de los invitados que recibieron su invitación respondieron (sin pruebas), redondeado a 90%.
    stats: [{ v: '+172', es: 'Eventos creados', en: 'Events created' }, { v: '+8,791', es: 'Invitaciones enviadas', en: 'Invitations sent' }, { v: '+6,231', es: 'Invitados confirmados', en: 'Guests confirmed' }, { v: '90%', es: 'de eficiencia en confirmaciones', en: 'RSVP efficiency', noteEs: 'Con I attend, mis usuarios saben quién viene y quién no en el 90% de sus invitados.', noteEn: 'With I attend, my users know who’s coming and who isn’t for 90% of their guests.' }, { v: '+2,050', es: 'Seguidores en Instagram', en: 'Instagram followers' }] },
  canplast: { name: 'Canplast', badgeEs: 'Empresa · herramientas internas y e-commerce', badgeEn: 'Company · internal tools and e-commerce', es: 'El máximo especialista en cubrecanto de México, con centros de distribución en todo el país. Diseño las herramientas que usa su equipo todos los días, usuarios que no eligieron el software, y la experiencia de compra de fabricantes, distribuidores y carpinteros.', en: 'Mexico’s leading edge banding specialist, with distribution centers nationwide. I design the tools its team uses every day, for users who didn’t choose the software, and the buying experience for manufacturers, distributors and carpenters.', roleEs: 'Diseño de producto y desarrollo', roleEn: 'Product design and development',
    stats: [{ v: '30+', es: 'Años especializados en cubrecanto', en: 'Years specialized in edge banding' }, { v: 'Millones', es: 'De metros en inventario', en: 'Of meters in stock' }] },
  findiur: { name: 'Findiur', badgeEs: 'Cliente · SaaS', badgeEn: 'Client · SaaS', es: 'SaaS basada en España.', en: 'A SaaS based in Spain.', roleEs: 'Diseño UX y sistema de diseño', roleEn: 'UX design and design system' }
};

// Orden en el Home. Los ids dentro de un sub-arreglo se muestran juntos como un flujo.
export const FEATURE_ORDER: string[] = ['dynamicrsvp', 'dashboardp'];
export const FEATURED: string[] = ['dynamicrsvp', 'dashboardp'];
export const THEMES: Theme[] = [
  { id: 'all', es: 'Todas', en: 'All', ids: null }
];

export const FEATURES: Feature[] = [
  { id: 'dynamicrsvp', product: 'iattend', img: '/iattend/dynamic/02-formulario.png', video: '/iattend/dynamic/rsvp-figma.mp4', extra: ['/iattend/dynamic/crop/06-pases.png', '/iattend/dynamic/crop/07-lia.png', '/iattend/dynamic/crop/08-photo-wall.png'],
    es: { titleA: 'Herramientas que se', accent: 'presentan solas', tag: 'Dynamic RSVP', lead: 'La invitación digital tenía cuatro herramientas que casi nadie encontraba. Las reuní en una sola pieza que aparece cuando el invitado confirma.',
      facts: [{ k: 'Rol', v: 'Diseño UX e implementación' }, { k: 'Plataforma', v: 'Invitación digital · móvil' }, { k: 'Inspiración', v: 'Dynamic Island de Apple' }, { k: 'Estado', v: 'En producción' }],
      origin: 'Fui sumando funciones a la invitación: confirmación, pases digitales, fotos en vivo y un asistente para resolver dudas. Cada una tenía sentido desde el lado de quien la construyó. Desde el lado del invitado, eran cuatro cosas sueltas sin un lugar claro. No llegaba a ellas: era desarrollo sin uso, y los problemas que las originaron seguían ahí.',
      what: 'Lo único que todo invitado hace es confirmar. Usé ese momento como puerta: la isla aparece sola, se confirma en un toque y, al terminar, se queda como la barra que lleva a pases, fotos y Lia. El invitado no tiene que buscar nada. Las herramientas llegan cuando ya le sirven.',
      solves: 'Que el invitado descubra herramientas que no sabía que existían, sin tener que explorar.',
      decisions: [
        { k: 'Un solo toque', v: 'El invitado no va a explorar la invitación. Todo tiene que estar a un toque.', shot: '/iattend/dynamic/crop/01-pildora.png' },
        { k: 'El movimiento como guía', v: 'Las animaciones avisan que algo cambió y que hay más por abrir.', shot: '/iattend/dynamic/crop/04-gracias.png' },
        { k: 'Presente, sin estorbar', v: 'Aparece sola, pero no interrumpe ni se siente como publicidad.', shot: '/iattend/dynamic/crop/05-barra.png' }
      ],
      stat: 'Desde el primer evento, los invitados empezaron a usar', statLabel: 'la galería y Lia.', caption: 'Dynamic RSVP' },
    en: { titleA: 'Tools that', accent: 'introduce themselves', tag: 'Dynamic RSVP', lead: 'An animated RSVP, inspired by Apple’s Dynamic Island, that reveals every tool in the invitation with a single tap.',
      facts: [{ k: 'Role', v: 'Design and development' }, { k: 'Platform', v: 'Digital invitation · mobile' }, { k: 'Inspiration', v: 'Apple’s Dynamic Island' }, { k: 'Status', v: 'Live' }],
      origin: 'The invitation kept gaining features: smart RSVP, AI answers, live photos and digital passes. Each was useful, but together they were hard to understand. Guests never reached them: it was development nobody used, and the original problems were still there.',
      what: 'An RSVP that introduces itself. It expands, animates and shows each tool at the right moment, without feeling like spam. With one tap, guests understand what’s in front of them.',
      solves: 'Guests discover tools they didn’t know existed, without having to explore.',
      decisions: [
        { k: 'One tap', v: 'Guests don’t have time to explore the invitation. Everything had to be a tap away.', shot: '/iattend/dynamic/crop/01-pildora.png' },
        { k: 'Motion as a guide', v: 'Animation makes it obvious something is happening and there’s more to find.', shot: '/iattend/dynamic/crop/04-gracias.png' },
        { k: 'Present, not pushy', v: 'It shows up on its own, without interrupting or feeling like an ad.', shot: '/iattend/dynamic/crop/05-barra.png' }
      ],
      stat: 'From the first event', statLabel: 'the gallery and AI answers started being used.', caption: 'Dynamic RSVP' } },

  { id: 'dashboardp', product: 'canplast', img: null, extra: [], video: '/dashboard/full-flow.mp4', flowVideo: '/dashboard/full-flow.mp4', heroVideo: '/dashboard/short-mockup.mp4',
    gallery: [{ src: '/dashboard/gallery/01-tablero.png', label: 'El tablero' }, { src: '/dashboard/gallery/02-redimensionar-grafica.png', label: 'Cada gráfica cambia de tamaño' }, { src: '/dashboard/gallery/03-grafica-2x2.png', label: 'Una gráfica ocupa 2×2' }, { src: '/dashboard/gallery/04-ajustar-tablero.png', label: 'El tablero se ajusta' }, { src: '/dashboard/gallery/05-densidad-4x3.png', label: 'Doce gráficas por página' }, { src: '/dashboard/gallery/06-densidad-6x3.png', label: 'Más gráficas por página' }, { src: '/dashboard/gallery/07-tema-oscuro.png', label: 'El tablero en tema oscuro' }, { src: '/dashboard/gallery/08-oscuro-3x2.png', label: 'Tema oscuro, 3×2' }, { src: '/dashboard/gallery/09-grafica-expandida.png', label: 'Una gráfica a pantalla completa' }],
    es: { titleA: 'Un tablero que se adapta', accent: 'a quien lo lee', tag: 'Tablero de ventas', caption: 'Tablero de ventas', lead: 'El tablero de ventas: 15 gráficas que se reorganizan según quién lo usa, en qué pantalla y para qué.',
      facts: [{ k: 'Proyecto', v: 'Plataforma de ventas' }, { k: 'Rol', v: 'Diseño UX y de interfaz' }, { k: 'Plataforma', v: 'Tableta, escritorio, TV y proyector' }],
      problemTitle: 'Cuatro pantallas. Distintas personas. Un solo tablero.',
      origin: 'Dirección de Ventas necesitaba analizar las ventas del año y presentarlas en juntas. El reto no eran las gráficas, sino el contexto: el mismo tablero tenía que leerse en una tableta, en una computadora, en una TV o proyectado en una junta. Y a cada persona le importaba un dato distinto.',
      solutionTitle: 'El orden lo pone cada persona. El acomodo, el tablero.',
      what: 'Le di el orden al usuario y el acomodo al tablero. Cada persona decide qué gráficas ve y en qué orden; el tablero decide cómo caben en cada pantalla sin perder lo que va primero.',
      keyIdea: 'Le di el orden al usuario y el acomodo al tablero.',
      solves: 'Que cada persona lea su dato a la primera, en cualquier pantalla.',
      decisions: [
        { k: 'Cada quien arma el suyo', v: 'No hay un tablero para todos. Cada persona elige las gráficas que le sirven y en qué orden.' },
        { k: 'Lo primero nunca se cae', v: 'Al cambiar de pantalla, el tablero se reacomoda en el orden que eligió cada persona. Lo que va primero siempre cabe.' },
        { k: 'Hecho para presentar', v: 'En TV o proyector, el tablero se lee a distancia: menos ruido y cifras más grandes.' }
      ],
      stat: 'Interfaces que se adaptan al usuario,', statLabel: 'no usuarios que se adaptan a la interfaz.' },
    en: { titleA: 'A board that adapts', accent: 'to whoever reads it', tag: 'Sales board', caption: 'Sales board', lead: 'The sales board: 15 charts that rearrange around who’s using it, on which screen, and why.',
      facts: [{ k: 'Project', v: 'Sales platform' }, { k: 'Role', v: 'UX and interface design' }, { k: 'Platform', v: 'Tablet, desktop, TV and projector' }],
      problemTitle: 'Four screens. Different people. One board.',
      origin: 'Sales leadership needed to analyze the year’s sales and present them in meetings. The challenge wasn’t the charts but the context: the same board had to read on a tablet, a computer, a TV or projected in a meeting. And each person cared about a different number.',
      solutionTitle: 'Each person sets the order. The board sets the layout.',
      what: 'I gave the order to the user and the layout to the board. Each person decides which charts they see and in what order; the board decides how they fit on each screen without losing what comes first.',
      keyIdea: 'I gave the order to the user and the layout to the board.',
      solves: 'Each person reads their number at first glance, on any screen.',
      decisions: [
        { k: 'Everyone builds their own', v: 'There’s no one board for everyone. Each person picks the charts they need and their order.' },
        { k: 'What comes first never drops', v: 'When the screen changes, the board rearranges in the order each person chose. What comes first always fits.' },
        { k: 'Made to present', v: 'On a TV or projector, the board reads from across the room: less noise, bigger numbers.' }
      ],
      stat: 'Interfaces that adapt to users,', statLabel: 'not users who adapt to the interface.' } }
];
