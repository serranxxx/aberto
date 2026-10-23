// Contenido de cada feature. Campos vacíos ('' o []) se ocultan en la página de detalle.
// img: null → placeholder hasta tener captura.
import type { Feature, Product, Theme } from './types'

export const PRODUCTS: Record<string, Product> = {
  iattend: { name: 'I attend', badgeEs: 'Proyecto propio · SaaS', badgeEn: 'Our own project · SaaS', es: 'SaaS para la gestión de eventos: invitaciones, invitados, confirmaciones y acomodo. La fundamos, la diseñamos y la desarrollamos; hoy está en producción con usuarios reales que pagan.', en: 'A SaaS for event management: invitations, guests, RSVPs and seating. We founded, designed and built it; it’s live today with real, paying users.', roleEs: 'Fundador · diseño y desarrollo', roleEn: 'Founder · design and development',
    // Datos reales de I attend (Admin → Analítica de iattend-vite), consultados el 15 oct 2026.
    // Eventos, envíos y confirmados incluyen invitaciones + side events + flash, también los de prueba.
    // Respuesta: 88.4% de los invitados que recibieron su invitación respondieron (sin pruebas), redondeado a 90%.
    stats: [{ v: '+172', es: 'Eventos creados', en: 'Events created' }, { v: '+8,791', es: 'Invitaciones enviadas', en: 'Invitations sent' }, { v: '+6,231', es: 'Invitados confirmados', en: 'Guests confirmed' }, { v: '90%', es: 'de eficiencia en confirmaciones', en: 'RSVP efficiency', noteEs: 'Con I attend, nuestros usuarios saben quién viene y quién no en el 90% de sus invitados.', noteEn: 'With I attend, our users know who’s coming and who isn’t for 90% of their guests.' }, { v: '+2,080', es: 'Seguidores en Instagram', en: 'Instagram followers' }] },
  canplast: { name: 'Canplast', badgeEs: 'Empresa · herramientas internas y e-commerce', badgeEn: 'Company · internal tools and e-commerce', es: 'El máximo especialista en cubrecanto de México, con centros de distribución en todo el país. Diseñamos las herramientas que usa su equipo todos los días, usuarios que no eligieron el software, y la experiencia de compra de fabricantes, distribuidores y carpinteros.', en: 'Mexico’s leading edge banding specialist, with distribution centers nationwide. We design the tools its team uses every day, for users who didn’t choose the software, and the buying experience for manufacturers, distributors and carpenters.', roleEs: 'Diseño de producto y desarrollo', roleEn: 'Product design and development',
    stats: [{ v: '30+', es: 'Años especializados en cubrecanto', en: 'Years specialized in edge banding' }, { v: 'Millones', es: 'De metros en inventario', en: 'Of meters in stock' }] },
  findiur: { name: 'Findiur', badgeEs: 'Cliente · SaaS', badgeEn: 'Client · SaaS', es: 'SaaS basada en España.', en: 'A SaaS based in Spain.', roleEs: 'Diseño UX y sistema de diseño', roleEn: 'UX design and design system' }
};

// Orden en el Home. Los ids dentro de un sub-arreglo se muestran juntos como un flujo.
export const FEATURE_ORDER: string[] = ['designsystem', 'dynamicrsvp', 'dashboardp', 'commandbar', 'flash'];
export const FEATURED: string[] = ['designsystem', 'dynamicrsvp', 'dashboardp', 'commandbar', 'flash'];
export const THEMES: Theme[] = [
  { id: 'all', es: 'Todas', en: 'All', ids: null }
];

export const FEATURES: Feature[] = [
  { id: 'dynamicrsvp', product: 'iattend', img: '/iattend/dynamic/02-formulario.png', video: '/iattend/dynamic/rsvp-figma.mp4', extra: ['/iattend/dynamic/crop/06-pases.png', '/iattend/dynamic/crop/07-lia.png', '/iattend/dynamic/crop/08-photo-wall.png'],
    es: { titleA: 'Herramientas que se', accent: 'presentan solas', tag: 'RSVP dinámico', lead: 'La invitación digital tenía cuatro herramientas que casi nadie encontraba. Las reunimos en una sola pieza que aparece cuando el invitado confirma.',
      facts: [{ k: 'Rol', v: 'Diseño UX e implementación' }, { k: 'Plataforma', v: 'Invitación digital · móvil' }, { k: 'Inspiración', v: 'Dynamic Island de Apple' }, { k: 'Estado', v: 'En producción' }],
      problemLead: 'Para el invitado, *eran cuatro herramientas sueltas sin un lugar claro*.',
      origin: 'Fuimos sumando funciones a la invitación: confirmación, pases digitales, fotos en vivo y un asistente para resolver dudas. Cada una tenía sentido desde el lado de quien la construyó, pero el invitado no llegaba a ellas: era desarrollo sin uso, y los problemas que las originaron seguían ahí.',
      solutionLead: 'Lo único que todo invitado hace es confirmar: *usamos ese momento como puerta*.',
      what: 'La isla aparece sola, se confirma en un toque y, al terminar, se queda como la barra que lleva a pases, fotos y Lia. El invitado no tiene que buscar nada. Las herramientas llegan cuando ya le sirven.',
      solves: 'Que el invitado descubra herramientas que no sabía que existían, sin tener que explorar.',
      decisions: [
        { k: 'Un solo toque', v: 'El invitado no va a explorar la invitación. Todo tiene que estar a un toque.', shot: '/iattend/dynamic/crop/01-pildora.png' },
        { k: 'El movimiento como guía', v: 'Las animaciones avisan que algo cambió y que hay más por abrir.', shot: '/iattend/dynamic/crop/04-gracias.png' },
        { k: 'Presente, sin estorbar', v: 'Aparece sola, pero no interrumpe ni se siente como publicidad.', shot: '/iattend/dynamic/crop/05-barra.png' }
      ],
      stat: 'Desde el primer evento, los invitados empezaron a usar', statLabel: 'la galería y Lia.', caption: 'RSVP dinámico' },
    en: { titleA: 'Tools that', accent: 'introduce themselves', tag: 'Dynamic RSVP', lead: 'An animated RSVP, inspired by Apple’s Dynamic Island, that reveals every tool in the invitation with a single tap.',
      facts: [{ k: 'Role', v: 'Design and development' }, { k: 'Platform', v: 'Digital invitation · mobile' }, { k: 'Inspiration', v: 'Apple’s Dynamic Island' }, { k: 'Status', v: 'Live' }],
      problemLead: 'For guests, *they were four loose tools with no clear place*.',
      origin: 'The invitation kept gaining features: RSVP, digital passes, live photos and an assistant to answer questions. Each made sense from the side of whoever built it, but guests never reached them: it was development nobody used, and the original problems were still there.',
      solutionLead: 'The one thing every guest does is RSVP: *we used that moment as the door*.',
      what: 'The island shows up on its own, confirms in one tap and, once done, stays as the bar that leads to passes, photos and Lia. Guests don’t have to look for anything. The tools arrive when they’re useful.',
      solves: 'Guests discover tools they didn’t know existed, without having to explore.',
      decisions: [
        { k: 'One tap', v: 'Guests don’t have time to explore the invitation. Everything had to be a tap away.', shot: '/iattend/dynamic/crop/01-pildora.png' },
        { k: 'Motion as a guide', v: 'Animation makes it obvious something is happening and there’s more to find.', shot: '/iattend/dynamic/crop/04-gracias.png' },
        { k: 'Present, not pushy', v: 'It shows up on its own, without interrupting or feeling like an ad.', shot: '/iattend/dynamic/crop/05-barra.png' }
      ],
      stat: 'From the first event', statLabel: 'the gallery and AI answers started being used.', caption: 'Dynamic RSVP' } },

  { id: 'dashboardp', product: 'canplast', img: null, extra: [], video: '/dashboard/full-flow.mp4', flowVideo: '/dashboard/full-flow.mp4', heroVideo: '/dashboard/short-mockup.mp4',
    gallery: [{ src: '/dashboard/gallery/01-tablero.png', label: 'El tablero' }, { src: '/dashboard/gallery/02-redimensionar-grafica.png', label: 'Cada gráfica cambia de tamaño' }, { src: '/dashboard/gallery/03-grafica-2x2.png', label: 'Una gráfica ocupa 2×2' }, { src: '/dashboard/gallery/04-ajustar-tablero.png', label: 'El tablero se ajusta' }, { src: '/dashboard/gallery/05-densidad-4x3.png', label: 'Doce gráficas por página' }, { src: '/dashboard/gallery/06-densidad-6x3.png', label: 'Más gráficas por página' }, { src: '/dashboard/gallery/07-tema-oscuro.png', label: 'El tablero en tema oscuro' }, { src: '/dashboard/gallery/08-oscuro-3x2.png', label: 'Tema oscuro, 3×2' }, { src: '/dashboard/gallery/09-grafica-expandida.png', label: 'Una gráfica a pantalla completa' }],
    es: { titleA: 'Una UI que se adapta', accent: 'a quien la usa', tag: 'Tablero de ventas', caption: 'Tablero de ventas', lead: 'El tablero de ventas: 15 gráficas que se reorganizan según quién lo usa, en qué pantalla y para qué.',
      facts: [{ k: 'Proyecto', v: 'Plataforma de ventas' }, { k: 'Rol', v: 'Diseño UX y de interfaz' }, { k: 'Plataforma', v: 'Tableta, escritorio, TV y proyector' }],
      problemTitle: 'Cuatro pantallas. Distintas personas. Un solo tablero.',
      problemLead: 'El reto no eran las gráficas: *el mismo tablero tenía que leerse en cuatro pantallas distintas*.',
      origin: 'Dirección de Ventas necesitaba analizar las ventas del año y presentarlas en juntas. El tablero se usaba en una tableta, en una computadora, en una TV o proyectado en una junta, y a cada persona le importaba un dato distinto.',
      solutionTitle: 'El orden lo pone cada persona. El acomodo, el tablero.',
      solutionLead: 'Le dimos *el orden al usuario y el acomodo al tablero*.',
      what: 'Cada persona decide qué gráficas ve y en qué orden; el tablero decide cómo caben en cada pantalla sin perder lo que va primero.',
      keyIdea: 'Le dimos el orden al usuario y el acomodo al tablero.',
      solves: 'Que cada persona lea su dato a la primera, en cualquier pantalla.',
      decisions: [
        { k: 'Cada quien arma el suyo', v: 'No hay un tablero para todos. Cada persona elige las gráficas que le sirven y en qué orden.' },
        { k: 'Lo primero nunca se cae', v: 'Al cambiar de pantalla, el tablero se reacomoda en el orden que eligió cada persona. Lo que va primero siempre cabe.' },
        { k: 'Hecho para presentar', v: 'En TV o proyector, el tablero se lee a distancia: menos ruido y cifras más grandes.' }
      ],
      stat: 'Interfaces que se adaptan al usuario,', statLabel: 'no usuarios que se adaptan a la interfaz.' },
    en: { titleA: 'A UI that adapts', accent: 'to whoever uses it', tag: 'Sales board', caption: 'Sales board', lead: 'The sales board: 15 charts that rearrange around who’s using it, on which screen, and why.',
      facts: [{ k: 'Project', v: 'Sales platform' }, { k: 'Role', v: 'UX and interface design' }, { k: 'Platform', v: 'Tablet, desktop, TV and projector' }],
      problemTitle: 'Four screens. Different people. One board.',
      problemLead: 'The challenge wasn’t the charts: *the same board had to read on four different screens*.',
      origin: 'Sales leadership needed to analyze the year’s sales and present them in meetings. The board was used on a tablet, a computer, a TV or projected in a meeting, and each person cared about a different number.',
      solutionTitle: 'Each person sets the order. The board sets the layout.',
      solutionLead: 'We gave *the order to the user and the layout to the board*.',
      what: 'Each person decides which charts they see and in what order; the board decides how they fit on each screen without losing what comes first.',
      keyIdea: 'We gave the order to the user and the layout to the board.',
      solves: 'Each person reads their number at first glance, on any screen.',
      decisions: [
        { k: 'Everyone builds their own', v: 'There’s no one board for everyone. Each person picks the charts they need and their order.' },
        { k: 'What comes first never drops', v: 'When the screen changes, the board rearranges in the order each person chose. What comes first always fits.' },
        { k: 'Made to present', v: 'On a TV or projector, the board reads from across the room: less noise, bigger numbers.' }
      ],
      stat: 'Interfaces that adapt to users,', statLabel: 'not users who adapt to the interface.' } },

  // Caso anónimo: no se nombra la empresa ni la app. Los [corchetes] son datos por llenar antes de publicar.
  { id: 'commandbar', img: null, extra: [], video: '/commandbar/navbar-demo.mp4', heroVideo: '/commandbar/hero.mp4', flowVideo: '/commandbar/navbar-demo.mp4', flowFit: 'cover',
    gallery: [{ src: '/commandbar/gallery/01-barra.png', label: 'La barra' }, { src: '/commandbar/gallery/02-buscar.png', label: 'Busca un registro' }, { src: '/commandbar/gallery/03-modulos.png', label: 'Todos los módulos a un clic' }, { src: '/commandbar/gallery/04-asistente.png', label: 'El asistente' }, { src: '/commandbar/gallery/05-respuesta.png', label: 'Responde con datos' }],
    galleryWide: false,
    es: { titleA: 'Todo el día cabe en', accent: 'una sola barra', tag: 'Barra de comando', caption: 'Barra de comando',
      lead: 'Navegación, búsquedas, consultas y un asistente vivían en lugares distintos de la aplicación. Los reunimos en una sola barra, siempre a la mano.',
      facts: [{ k: 'Producto', v: '[Aplicación interna de operación / gestión]' }, { k: 'Rol', v: 'Diseño UX [e implementación]' }, { k: 'Plataforma', v: 'Escritorio' }, { k: 'Estado', v: '[En producción desde…]' }],
      cursors: ['[Ventas]', '[Almacén]'],
      problemTitle: 'Cuatro caminos para lo mismo.',
      problemLead: 'Quien la usaba todos los días *tenía que saber dónde estaba cada cosa antes de hacerla*.',
      origin: 'La aplicación fue creciendo por funciones: navegación entre páginas, búsquedas, consultas a [la base de datos / el sistema de gestión] y un asistente con IA. Cada una vivía en su propio lugar: [ej. para consultar un pedido había que entrar a una pantalla, filtrar y abrir otra]. Eso se notaba en [N] llamadas a soporte [por semana], en lo que tardaba alguien nuevo en aprender la aplicación y en [qué no encontraba la gente].',
      solutionTitle: 'No hay que saber dónde vive cada cosa.',
      solutionLead: 'Todo empieza en la misma barra: *el usuario ya no elige el camino*.',
      what: 'El usuario escribe lo que busca y la barra resuelve si es una página, un registro, una consulta o una pregunta para el asistente. La navegación va primero porque es lo que más se hace en el día.',
      keyIdea: 'El usuario ya no elige el camino: la barra lo resuelve.',
      solves: 'Que nadie tenga que recordar en qué pantalla vive cada función.',
      decisions: [
        { k: 'Un solo punto de partida', v: 'No hay que recordar en qué pantalla está cada función. Todo se busca desde el mismo lugar.' },
        { k: 'Navegar primero', v: 'Moverse entre páginas es lo más frecuente, así que es lo más rápido: [atajo de teclado, resultados recientes, lo que aplique].' },
        { k: 'El asistente, sin salir', v: 'Preguntar no obliga a dejar lo que el usuario está haciendo. La respuesta llega en la misma barra.' }
      ],
      stat: '[Las llamadas a soporte bajaron de X a Y].', statLabel: '[Alguien nuevo aprende la aplicación en N días en lugar de M].' },
    en: { titleA: 'The whole day fits in', accent: 'a single bar', tag: 'Command bar', caption: 'Command bar',
      lead: 'Navigation, search, lookups and an assistant lived in different places across the app. We brought them together in a single bar, always at hand.',
      facts: [{ k: 'Product', v: '[Internal operations / management app]' }, { k: 'Role', v: 'UX design [and implementation]' }, { k: 'Platform', v: 'Desktop' }, { k: 'Status', v: '[Live since…]' }],
      cursors: ['[Sales]', '[Warehouse]'],
      problemTitle: 'Four paths to the same thing.',
      problemLead: 'People who used it every day *had to know where each thing was before doing it*.',
      origin: 'The app grew one feature at a time: page navigation, search, lookups in [the database / management system] and an AI assistant. Each lived in its own place: [e.g. checking an order meant opening one screen, filtering and opening another]. It showed in [N] support calls [per week], in how long it took someone new to learn the app and in [what people couldn’t find].',
      solutionTitle: 'No need to know where each thing lives.',
      solutionLead: 'Everything starts in the same bar: *users no longer pick the path*.',
      what: 'Users type what they’re looking for and the bar works out whether it’s a page, a record, a lookup or a question for the assistant. Navigation comes first because it’s what people do most during the day.',
      keyIdea: 'Users no longer pick the path: the bar works it out.',
      solves: 'Nobody has to remember which screen each feature lives on.',
      decisions: [
        { k: 'One starting point', v: 'No need to remember which screen holds each feature. Everything is searched from the same place.' },
        { k: 'Navigate first', v: 'Moving between pages is the most frequent task, so it’s the fastest: [keyboard shortcut, recent results, whatever applies].' },
        { k: 'The assistant, without leaving', v: 'Asking a question doesn’t mean leaving what the user is doing. The answer arrives in the same bar.' }
      ],
      stat: '[Support calls dropped from X to Y].', statLabel: '[Someone new learns the app in N days instead of M].' } },
  // Caso de I attend contado desde el anfitrión. Los [corchetes] son datos por llenar antes de publicar.
  { id: 'flash', product: 'iattend', img: null, extra: [], video: '/flash/flow.mp4', heroVideo: '/flash/hero.mp4', heroZoom: 1.125, flowVideo: '/flash/flow.mp4',
    gallery: [{ src: '/flash/gallery/01-en-blanco.webp', label: 'El anfitrión empieza en blanco' }, { src: '/flash/gallery/02-fondo.webp', label: 'El anfitrión añade un fondo' }, { src: '/flash/gallery/03-titulo.webp', label: 'El anfitrión escribe el título' }, { src: '/flash/gallery/04-tipografia.webp', label: 'El anfitrión ajusta la tipografía' }, { src: '/flash/gallery/05-elementos.webp', label: 'El anfitrión acomoda la portada' }, { src: '/flash/gallery/07-portada.webp', label: 'Le llega al invitado' }, { src: '/flash/gallery/08-itinerario.webp', label: 'El invitado ve el itinerario' }, { src: '/flash/gallery/09-como-llegar.webp', label: 'El invitado ve cómo llegar' }, { src: '/flash/gallery/10-confirmado.webp', label: 'El invitado confirma en un toque' }],
    galleryWide: false,
    es: { titleA: 'Una reunión lista', accent: 'en un minuto', tag: 'Eventos flash', caption: 'Eventos flash',
      lead: 'Quien organiza una reunión no quiere diseñar una invitación. Quiere saber quién va. Los eventos flash de I attend resuelven eso, y nada más.',
      facts: [{ k: 'Proyecto', v: 'I attend · Eventos flash' }, { k: 'Rol', v: 'Diseño UX [e implementación]' }, { k: 'Plataforma', v: 'Invitación digital · móvil' }, { k: 'Estado', v: 'En producción' }],
      cursors: ['Anfitrión', 'Invitado'],
      problemTitle: 'La invitación le quedaba grande.',
      problemLead: 'Para una reunión pequeña, *la invitación de boda era demasiado*.',
      origin: 'I attend tiene todo para una boda: itinerario, pases, fotos, un asistente. Pero hay eventos pequeños: la tornaboda, una despedida, una reunión con amigos. Para esos, el anfitrión volvía a lo de siempre: mandar un mensaje al grupo de WhatsApp, esperar respuestas sueltas y contar a mano quién iba.',
      solutionTitle: 'Saber quién va, en minutos.',
      solutionLead: 'Conservamos el envío y la confirmación, y *quitamos todo lo que el anfitrión no necesita*.',
      what: 'Sin itinerario, pases ni fotos: solo lo necesario para saber quién va. El invitado confirma en un toque, y el anfitrión ve la lista en un solo lugar, sin contar mensajes.',
      solves: 'Que el anfitrión sepa quién va sin contar mensajes en el chat.',
      decisions: [
        { k: 'Lo que el anfitrión necesita saber', v: 'Quién va. Fecha, lugar y confirmación; lo demás no está.' },
        { k: 'Más rápido que el grupo de WhatsApp', v: 'Si armarlo toma más que mandar un mensaje, el anfitrión vuelve al chat. Se arma en minutos.' },
        { k: 'Sencillo, no improvisado', v: 'Aunque el evento sea pequeño, el invitado recibe una invitación desarrollada con mucho cuidado y hecha para verse bien siempre.' }
      ],
      stat: 'Lo que empezó como un extra terminó ayudando a vender.', statLabel: 'Cada boda en I attend incluye dos eventos flash, y hoy pesan en la decisión de contratar.' },
    en: { titleA: 'A get-together ready', accent: 'in a minute', tag: 'Flash events', caption: 'Flash events',
      lead: 'Whoever organizes a get-together doesn’t want to design an invitation. They want to know who’s coming. I attend’s flash events solve that, and nothing else.',
      facts: [{ k: 'Project', v: 'I attend · Flash events' }, { k: 'Role', v: 'UX design [and implementation]' }, { k: 'Platform', v: 'Digital invitation · mobile' }, { k: 'Status', v: 'Live' }],
      cursors: ['Host', 'Guest'],
      problemTitle: 'The invitation was too big for the party.',
      problemLead: 'For a small get-together, *a wedding invitation was too much*.',
      origin: 'I attend has everything for a wedding: a schedule, passes, photos, an assistant. But there are small events: the after-party, a farewell, a get-together with friends. For those, the host went back to the usual: a message to the WhatsApp group, scattered replies and counting by hand who was coming.',
      solutionTitle: 'Know who’s coming, in minutes.',
      solutionLead: 'We kept sending and confirming, and *removed everything the host doesn’t need*.',
      what: 'No schedule, passes or photos: just what you need to know who’s coming. Guests confirm with a single tap, and the host sees the list in one place, without counting messages.',
      solves: 'The host knows who’s coming without counting messages in the chat.',
      decisions: [
        { k: 'What the host needs to know', v: 'Who’s coming. Date, place and RSVP; everything else is gone.' },
        { k: 'Faster than the WhatsApp group', v: 'If setting it up takes longer than sending a message, the host goes back to the chat. It’s set up in minutes.' },
        { k: 'Simple, not improvised', v: 'Even when the event is small, guests get an invitation built with great care and made to always look right.' }
      ],
      stat: 'What started as an extra ended up helping sell.', statLabel: 'Every wedding on I attend includes two flash events, and today they weigh in the decision to book.' } },

  // Sistema de diseño: no documenta una solución puntual, sino la base que todo proyecto necesita
  // y cómo se conecta con Claude. Galería: cuadros del video del flujo completo.
  { id: 'designsystem', img: null, extra: [], video: '/designsystem/hero.mp4', heroVideo: '/designsystem/hero.mp4', flowVideo: '/designsystem/flow.mp4', flowFit: 'fade', galleryFull: true,
    gallery: [{ src: '/designsystem/gallery/01.webp', label: 'La portada' }, { src: '/designsystem/gallery/02.webp', label: 'Cambias un alias y todo se actualiza' }, { src: '/designsystem/gallery/03.webp', label: 'La escala tipográfica' }, { src: '/designsystem/gallery/04.webp', label: 'El radio manda el espaciado' }, { src: '/designsystem/gallery/05.webp', label: 'Iconos con color por token' }, { src: '/designsystem/gallery/06.webp', label: 'Cada estado con su color' }, { src: '/designsystem/gallery/07.webp', label: 'Un botón que carga y confirma' }, { src: '/designsystem/gallery/08.webp', label: 'Validación en vivo' }, { src: '/designsystem/gallery/09.webp', label: 'El sistema en el producto' }, { src: '/designsystem/gallery/10.webp', label: 'Vista general' }],
    es: { titleA: 'La base que todo', accent: 'proyecto necesita', tag: 'Sistema de diseño', caption: 'Sistema de diseño',
      lead: 'La base de todo proyecto, documentada para personas y para Claude, para que el equipo diseñe desde reglas y no desde cero.',
      facts: [{ k: 'Tipo', v: 'Base de producto' }, { k: 'Rol', v: 'Diseño UX y documentación' }, { k: 'Herramientas', v: 'Figma · código · Claude' }, { k: 'Aplica en', v: 'Todos los proyectos' }],
      cursors: ['Diseño', 'Claude'],
      problemTitle: 'Cada pantalla empezaba de cero.',
      problemLead: 'Sin una base común, *cada pantalla nueva se diseña desde cero*.',
      origin: 'Otro botón parecido al anterior, otro espaciado, otra forma de mostrar un error. Nadie lo decide así; simplemente no hay dónde consultar cómo se hace. El producto se vuelve inconsistente, el equipo pierde tiempo rehaciendo lo que ya existía y el usuario tiene que aprender cada pantalla como si fuera nueva.',
      solutionTitle: 'Una base que también lee Claude.',
      solutionLead: 'Las pantallas nuevas *ya nacen dentro del sistema*.',
      what: 'Primero definimos las piezas mínimas: color, tipografía, espaciado y estados. Sobre ellas armamos los componentes y escribimos para cada uno cuándo se usa, cuándo no y por qué. Esa documentación la conectamos con Claude, y el diseño se enfoca en decidir, no en volver a dibujar.',
      solves: 'Que cada pantalla nueva salga consistente desde el primer intento, sin empezar de cero.',
      decisions: [
        { k: 'Primero las reglas, luego las piezas', v: 'Color, tipografía y espaciado se definen como tokens. Los componentes se construyen encima, así un cambio en la base llega a todo el producto.' },
        { k: 'Documentado para personas y para Claude', v: 'Cada componente dice cuándo se usa, cuándo no y por qué. Escrito así, lo entiende alguien nuevo en el equipo y lo puede seguir Claude.' },
        { k: 'Diseñar es decidir', v: 'Con Claude armando pantallas desde el sistema, el tiempo de diseño se va a lo que importa: el flujo, el contenido y los casos difíciles.' }
      ],
      stat: 'Las pantallas nuevas ya nacen dentro del sistema.', statLabel: 'El diseño deja de empezar de cero en cada proyecto.' },
    en: { titleA: 'The foundation every', accent: 'project needs', tag: 'Design system', caption: 'Design system',
      lead: 'The foundation of every project, documented for people and for Claude, so the team designs from rules, not from scratch.',
      facts: [{ k: 'Type', v: 'Product foundation' }, { k: 'Role', v: 'UX design and documentation' }, { k: 'Tools', v: 'Figma · code · Claude' }, { k: 'Applies to', v: 'Every project' }],
      cursors: ['Design', 'Claude'],
      problemTitle: 'Every screen started from scratch.',
      problemLead: 'Without a shared foundation, *every new screen is designed from scratch*.',
      origin: 'Another button that looks like the last one, another spacing, another way to show an error. Nobody decides it that way; there’s just nowhere to check how it’s done. The product turns inconsistent, the team loses time redoing what already existed and users have to learn every screen as if it were new.',
      solutionTitle: 'A foundation Claude can read too.',
      solutionLead: 'New screens *are born inside the system*.',
      what: 'First we define the smallest pieces: color, type, spacing and states. On top of them we build the components and write, for each one, when to use it, when not to and why. We connect that documentation to Claude, and design focuses on deciding, not redrawing.',
      solves: 'Every new screen comes out consistent on the first try, without starting from scratch.',
      decisions: [
        { k: 'Rules first, then pieces', v: 'Color, type and spacing are defined as tokens. Components are built on top, so a change in the foundation reaches the whole product.' },
        { k: 'Documented for people and for Claude', v: 'Each component says when to use it, when not to and why. Written that way, someone new on the team understands it and Claude can follow it.' },
        { k: 'Designing is deciding', v: 'With Claude building screens from the system, design time goes where it matters: the flow, the content and the hard cases.' }
      ],
      stat: 'New screens are born inside the system.', statLabel: 'Design stops starting from scratch on every project.' } }
];
