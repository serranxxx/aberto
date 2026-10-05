// Contenido de cada feature. Campos vacíos ('' o []) se ocultan en la página de detalle.
// img: null → placeholder hasta tener captura.
import type { Feature, Product, Theme } from './types'

export const PRODUCTS: Record<string, Product> = {
  iattend: { name: 'I attend', badgeEs: 'Proyecto propio · SaaS', badgeEn: 'My own project · SaaS', es: 'SaaS para la gestión de eventos: invitaciones, invitados, confirmaciones y acomodo. La fundé, la diseñé y la desarrollé; hoy está en producción con usuarios reales que pagan.', en: 'A SaaS for event management: invitations, guests, RSVPs and seating. I founded, designed and built it; it’s live today with real, paying users.', roleEs: 'Fundador · diseño y desarrollo', roleEn: 'Founder · design and development',
    stats: [{ v: '+176', es: 'Eventos creados', en: 'Events created' }, { v: '+9,019', es: 'Invitaciones enviadas', en: 'Invitations sent' }, { v: '+6,343', es: 'Invitados confirmados', en: 'Guests confirmed' }, { v: '+2,000', es: 'Seguidores en Instagram', en: 'Instagram followers' }] },
  canplast: { name: 'Canplast', badgeEs: 'Empresa · herramientas internas y e-commerce', badgeEn: 'Company · internal tools and e-commerce', es: 'El máximo especialista en cubrecanto de México, con centros de distribución en todo el país. Diseño las herramientas que usa su equipo todos los días, usuarios que no eligieron el software, y la experiencia de compra de fabricantes, distribuidores y carpinteros.', en: 'Mexico’s leading edge banding specialist, with distribution centers nationwide. I design the tools its team uses every day, for users who didn’t choose the software, and the buying experience for manufacturers, distributors and carpenters.', roleEs: 'Diseño de producto y desarrollo', roleEn: 'Product design and development',
    stats: [{ v: '30+', es: 'Años especializados en cubrecanto', en: 'Years specialized in edge banding' }, { v: 'Millones', es: 'De metros en inventario', en: 'Of meters in stock' }] },
  findiur: { name: 'Findiur', badgeEs: 'Cliente · SaaS', badgeEn: 'Client · SaaS', es: 'SaaS basada en España.', en: 'A SaaS based in Spain.', roleEs: 'Diseño UX y sistema de diseño', roleEn: 'UX design and design system' }
};

// Orden en el Home. Los ids dentro de un sub-arreglo se muestran juntos como un flujo.
export const FEATURE_ORDER: string[] = ['editor', 'confirmacion', 'whatsapp', 'spotlight', 'mesas', 'consola', 'invitados', 'render', 'certificados', 'lia', 'dashboard', 'ds', 'notas', 'ecommerce', 'modales', 'side', 'cobros', 'savethedate', 'flujos'];
export const FEATURED: string[] = ['confirmacion', 'whatsapp', 'spotlight'];
export const THEMES: Theme[] = [
  { id: 'all', es: 'Todas', en: 'All', ids: null },
  { id: 'ux', es: 'Flujos y experiencia', en: 'Flows and experience', ids: ['editor', 'confirmacion', 'mesas', 'savethedate', 'side', 'flujos', 'certificados'] },
  { id: 'ops', es: 'Herramientas internas', en: 'Internal tools', ids: ['whatsapp', 'invitados', 'cobros', 'dashboard', 'notas', 'modales'] },
  { id: 'sys', es: 'Navegación y sistemas', en: 'Navigation and systems', ids: ['consola', 'spotlight', 'ds'] },
  { id: 'com', es: 'Comercio e IA', en: 'Commerce and AI', ids: ['ecommerce', 'render', 'lia'] }
];

export const FEATURES: Feature[] = [
  // ── I attend ──
  { id: 'editor', product: 'iattend', img: null, extra: [], source: 'BuildPage.jsx',
    // Posición de cada número sobre la imagen principal (x %, y %). Ajusta al soltar la captura real.
    pins: [[50, 4], [4, 45], [20, 40], [56, 55], [95, 35]],
    es: { titleA: 'Editor de', accent: 'invitaciones', tag: 'Diseño', lead: 'Once módulos y la invitación en vivo dentro de un teléfono. Cualquier pareja la arma sin saber diseño.',
      facts: [{ k: 'Rol', v: 'Diseño y desarrollo' }, { k: 'Plataforma', v: 'Web · escritorio y móvil' }, { k: 'Stack', v: 'React, Vite, Ant Design' }, { k: 'Estado', v: 'En producción' }],
      origin: 'Una amiga me pidió ayuda con su invitación de boda. Los servicios que existían dependían de plantillas rígidas: se veían bien, pero no se podían hacer propias.',
      what: 'Un editor por módulos con la invitación real corriendo a un lado. Cada cambio aparece al instante, se puede deshacer y se puede traducir a otros idiomas.',
      solves: 'Personalizar una invitación sin conocimientos técnicos y sin depender de un diseñador.',
      anatomy: [
        { k: 'Guardar y publicar', v: 'Dos acciones separadas. Un punto rojo avisa si hay cambios sin guardar.' },
        { k: 'Barra de módulos', v: 'Once íconos, uno por sección de la invitación.' },
        { k: 'Panel del módulo', v: 'El formulario del módulo activo. Se colapsa para ver el teléfono completo.' },
        { k: 'Preview en vivo', v: 'La invitación real dentro de un iPhone o un Android. Se arrastra y se acerca.' },
        { k: 'Herramientas', v: 'Deshacer, rehacer, cambio de dispositivo y zoom.' }
      ],
      modulesLabel: 'Los once módulos',
      modules: [
        { name: 'Generales', desc: 'Color, tipografía y datos del evento.' }, { name: 'Portada', desc: 'Nombres, fecha e imagen principal.' },
        { name: 'Bienvenida', desc: 'El mensaje con el que abre la invitación.' }, { name: 'Personas', desc: 'Padres, padrinos y familia.' },
        { name: 'Frase', desc: 'Una cita o dedicatoria.' }, { name: 'Itinerario', desc: 'Cada momento con hora y lugar.' },
        { name: 'Código de vestimenta', desc: 'Qué ponerse y qué evitar.' }, { name: 'Regalos', desc: 'Mesas de regalo y datos para aportar.' },
        { name: 'Destinos', desc: 'Hospedaje y lugares cercanos.' }, { name: 'Avisos', desc: 'Indicaciones para los invitados.' },
        { name: 'Galería', desc: 'Fotos de la pareja.' }
      ],
      flows: [
        { title: 'Editar y publicar', steps: ['Elige un módulo', 'El teléfono va a esa sección', 'Edita en el formulario', 'Guarda', 'Publica una versión'] },
        { title: 'Traducir', steps: ['Agrega un idioma', 'Se traduce todo', 'Cambia el español', 'Se marcan los módulos desactualizados', 'Vuelve a traducir solo esos'] }
      ],
      specs: [{ k: 'Atajos', v: 'Ctrl+Z deshacer · Ctrl+Shift+Z rehacer' }, { k: 'Historial', v: '20 pasos por sesión' }, { k: 'Dispositivos', v: 'Preview en iOS y Android' }, { k: 'Versiones', v: 'Cada publicación crea una' }, { k: 'Idiomas', v: 'Traducción completa por idioma' }, { k: 'Primera vez', v: 'Tour guiado por cada módulo' }],
      decisions: [
        { k: 'El preview es el editor', v: 'La invitación corre real dentro del teléfono, no una maqueta. Lo que ve la pareja es exactamente lo que verá su invitado.', shot: true },
        { k: 'Menú y teléfono sincronizados', v: 'Elegir un módulo lleva el teléfono a esa sección; hacer scroll en el teléfono selecciona el módulo. Nunca hay que buscar dónde se edita algo.', shot: true },
        { k: 'Guardar no es publicar', v: 'Guardar conserva el trabajo; publicar crea una versión y la pone en vivo. La pareja experimenta sin que sus invitados vean cambios a medias.', shot: true },
        { k: 'Deshacer sin miedo', v: 'Ctrl+Z y Ctrl+Shift+Z con veinte pasos de historial. Dentro de un campo de texto se respeta el deshacer nativo del navegador para no pelear con él.' },
        { k: 'Traducir sin romper', v: 'Agregar un idioma traduce la invitación completa. Si después cambia el español, cada módulo desactualizado se marca, y los textos traducidos se conservan aunque cambien imágenes o estilos.', shot: true },
        { k: 'Un tour, solo la primera vez', v: 'La primera vez, un recorrido presenta cada módulo y lleva el teléfono a su sección mientras lo explica. Después vive en el botón “?”.' },
        { k: 'En móvil, el panel se encoge', v: 'El panel de edición reduce su alto en vez de deslizarse fuera de pantalla: no queda una zona invisible bloqueando el scroll, y Guardar y Publicar siempre están a la vista.', shot: true }
      ],
      caption: 'Editor de invitaciones' },
    en: { titleA: 'Invitation', accent: 'editor', tag: 'Design', lead: 'Eleven modules and the live invitation inside a phone. Any couple can build it without design skills.',
      facts: [{ k: 'Role', v: 'Design and development' }, { k: 'Platform', v: 'Web · desktop and mobile' }, { k: 'Stack', v: 'React, Vite, Ant Design' }, { k: 'Status', v: 'Live' }],
      origin: 'A friend asked me to help with her wedding invitation. Existing services relied on rigid templates: they looked good, but you couldn’t make them yours.',
      what: 'A module-based editor with the real invitation running beside it. Every change shows instantly, can be undone and can be translated into other languages.',
      solves: 'Customizing an invitation without technical skills and without depending on a designer.',
      anatomy: [
        { k: 'Save and publish', v: 'Two separate actions. A red dot flags unsaved changes.' },
        { k: 'Module bar', v: 'Eleven icons, one per invitation section.' },
        { k: 'Module panel', v: 'The active module’s form. It collapses to show the full phone.' },
        { k: 'Live preview', v: 'The real invitation inside an iPhone or an Android. Drag and zoom it.' },
        { k: 'Tools', v: 'Undo, redo, device switch and zoom.' }
      ],
      modulesLabel: 'The eleven modules',
      modules: [
        { name: 'General', desc: 'Color, typeface and event details.' }, { name: 'Cover', desc: 'Names, date and main image.' },
        { name: 'Welcome', desc: 'The message that opens the invitation.' }, { name: 'People', desc: 'Parents, sponsors and family.' },
        { name: 'Quote', desc: 'A quote or dedication.' }, { name: 'Itinerary', desc: 'Each moment with time and place.' },
        { name: 'Dress code', desc: 'What to wear and what to avoid.' }, { name: 'Gifts', desc: 'Registries and contribution details.' },
        { name: 'Destinations', desc: 'Lodging and nearby places.' }, { name: 'Notices', desc: 'Instructions for guests.' },
        { name: 'Gallery', desc: 'Photos of the couple.' }
      ],
      flows: [
        { title: 'Edit and publish', steps: ['Pick a module', 'The phone scrolls there', 'Edit in the form', 'Save', 'Publish a version'] },
        { title: 'Translate', steps: ['Add a language', 'Everything is translated', 'The Spanish changes', 'Outdated modules are flagged', 'Re-translate only those'] }
      ],
      specs: [{ k: 'Shortcuts', v: 'Ctrl+Z undo · Ctrl+Shift+Z redo' }, { k: 'History', v: '20 steps per session' }, { k: 'Devices', v: 'iOS and Android preview' }, { k: 'Versions', v: 'Each publish creates one' }, { k: 'Languages', v: 'Full translation per language' }, { k: 'First time', v: 'Guided tour of every module' }],
      decisions: [
        { k: 'The preview is the editor', v: 'The invitation runs for real inside the phone, not as a mockup. What the couple sees is exactly what their guest will see.', shot: true },
        { k: 'Menu and phone in sync', v: 'Picking a module scrolls the phone to that section; scrolling the phone selects the module. You never hunt for where something is edited.', shot: true },
        { k: 'Saving isn’t publishing', v: 'Saving keeps the work; publishing creates a version and puts it live. Couples experiment without guests seeing half-finished changes.', shot: true },
        { k: 'Undo without fear', v: 'Ctrl+Z and Ctrl+Shift+Z with twenty steps of history. Inside a text field, the browser’s native undo is respected so the two never fight.' },
        { k: 'Translate without breaking', v: 'Adding a language translates the whole invitation. If the Spanish changes later, each outdated module is flagged, and translated text survives image or style changes.', shot: true },
        { k: 'One tour, first time only', v: 'The first time, a walkthrough introduces each module and scrolls the phone to its section as it explains. Afterwards it lives behind the “?” button.' },
        { k: 'On mobile, the panel shrinks', v: 'The editing panel reduces its height instead of sliding off-screen: no invisible zone blocks scrolling, and Save and Publish are always in view.', shot: true }
      ],
      caption: 'Invitation editor' } },

  { id: 'confirmacion', product: 'iattend', img: '/iattend/tickets_m.jpg', extra: ['/iattend/download_m.jpg'],
    es: { titleA: 'De invitación a', accent: 'aplicación', tag: 'Confirmación', lead: 'Confirmar convierte la invitación en la experiencia completa de I attend.',
      origin: '', what: 'Ligada a la invitación llega la confirmación: pases digitales con Apple Wallet, dudas resueltas en tiempo real con Lia y un photo wall para compartir fotografías dentro de la invitación.',
      solves: 'Que la invitación deje de ser una landing page y acompañe al invitado hasta el evento.', decisions: [], caption: 'Pases digitales' },
    en: { titleA: 'From invitation to', accent: 'app', tag: 'RSVP', lead: 'Confirming turns the invitation into the full I attend experience.',
      origin: '', what: 'RSVP is tied to the invitation: digital passes with Apple Wallet, real-time answers from Lia, and a photo wall to share pictures inside the invitation.',
      solves: 'The invitation stops being a landing page and stays with the guest until the event.', decisions: [], caption: 'Digital passes' } },

  { id: 'invitados', product: 'iattend', img: '/iattend/guests_m.jpg', extra: [],
    es: { titleA: 'Gestor de', accent: 'invitados', tag: 'Gestión', lead: 'Planeado como una tabla de confirmaciones; hoy es el centro de control del evento.',
      origin: 'Planeado para ser una simple tabla de confirmaciones.',
      what: 'Resumen de novedades, grupos y clasificación de invitados, envío automático de invitaciones y recordatorios, todo desde un solo lugar.',
      solves: 'Saber quién viene sin perseguir a nadie.',
      decisions: [{ k: 'El canal que ya usan', v: 'El invitado confirma desde WhatsApp. No tiene que crear cuenta ni instalar nada.' }],
      stat: '6,343', statLabel: 'invitados confirmados en 176 eventos.', caption: 'Gestión de invitados' },
    en: { titleA: 'Guest', accent: 'manager', tag: 'Management', lead: 'Planned as an RSVP table; now it’s the event’s control center.',
      origin: 'Planned as a simple RSVP table.',
      what: 'Activity summary, guest groups and categories, automatic invitations and reminders, all from one place.',
      solves: 'Knowing who’s coming without chasing anyone.',
      decisions: [{ k: 'The channel they already use', v: 'Guests confirm from WhatsApp. No account, nothing to install.' }],
      stat: '6,343', statLabel: 'guests confirmed across 176 events.', caption: 'Guest management' } },

  { id: 'mesas', product: 'iattend', img: null, extra: [], source: 'TablesPage.jsx',
    pins: [[30, 8], [88, 4], [38, 50], [24, 34], [80, 55], [60, 22]],
    es: { titleA: 'Acomodo de', accent: 'mesas', tag: 'Planeación', lead: 'Un plano del salón donde se sienta a los confirmados, con las mismas herramientas que un diseñador usa en Figma.',
      facts: [{ k: 'Rol', v: 'Diseño y desarrollo' }, { k: 'Plataforma', v: 'Web · escritorio y móvil' }, { k: 'Stack', v: 'React, Vite, Supabase' }, { k: 'Estado', v: 'En producción · v2' }],
      origin: 'El acomodo se hacía fuera de la plataforma, en hojas de cálculo o a mano. La primera versión del mapa tenía un bug real: las mesas podían salirse del plano y el contador seguía sumando lugares que nadie veía.',
      what: 'Un plano con mesas redondas, cuadradas y rectangulares, pista de baile y elementos del salón. A un lado, los confirmados agrupados por quién viene con quién. Arrastras, asignas y la franja de arriba te dice cuánto falta.',
      solves: 'Que la planeación use los mismos datos que las confirmaciones: nadie copia listas, y si alguien cancela, su lugar se libera solo.',
      anatomy: [
        { k: 'Franja de avance', v: '“72 de 80 sentados”, cuántos confirmados siguen sin mesa y la capacidad que va a sobrar.' },
        { k: 'Agregar', v: 'Un solo botón para mesas nuevas y elementos del salón.' },
        { k: 'Plano', v: 'Mesas, pista y elementos. Se arrastra, se hace zoom y se selecciona como en Figma.' },
        { k: 'Mesa', v: 'Sillas lilas ocupadas, sillas vacías con borde. Nombre y ocupación debajo.' },
        { k: 'Confirmados', v: 'Agrupados por acompañantes, con color por grupo y el botón Asignar.' },
        { k: 'Herramientas', v: 'Alinear, auto acomodo, centrar, deshacer y rehacer.' }
      ],
      modulesLabel: 'Las piezas',
      modules: [
        { name: 'Plano', desc: 'Lienzo de 3500 px con zoom, paneo y selección por arrastre.' },
        { name: 'Lista de mesas', desc: 'Las 24 mesas en una vista con su tira de asientos.' },
        { name: 'Panel de mesa', desc: 'Nombre, forma, sillas, bloqueo e invitados.' },
        { name: 'Panel de invitados', desc: 'Sin mesa y sentados, con filtros visibles.' },
        { name: 'Transferencia', desc: 'Mover a uno o a todos sin pasar el cupo.' },
        { name: 'Franja de avance', desc: 'Sentados, pendientes y capacidad sobrante.' },
        { name: 'Auto acomodo', desc: 'Alrededor de la pista, en 3 lados o en bloques.' },
        { name: 'Alinear', desc: 'Los seis controles de Figma, por filas y columnas.' },
        { name: 'Elementos del salón', desc: 'Pista, barra, mesa de dulces y lo que exista.' },
        { name: 'Onboarding', desc: 'De cero a un salón armado en dos pasos.' },
        { name: 'Seguimiento', desc: 'Widget del dashboard con el estado de las mesas.' },
        { name: 'Tour guiado', desc: 'Diez pasos sobre un salón de ejemplo.' }
      ],
      flows: [
        { title: 'Primer acomodo', steps: ['Elige cuántas mesas y de qué forma', 'Ve los lugares calculados en vivo', 'Elige uno de tres acomodos', 'Se crean las mesas y la pista', 'La vista se centra en la pista'] },
        { title: 'Sentar a un grupo', steps: ['Filtra los confirmados sin mesa', 'Pulsa Asignar en el titular', 'Las mesas sin cupo salen en gris', 'Elige una con su etiqueta afín', 'Se sienta todo el grupo'] }
      ],
      specs: [{ k: 'Formas', v: 'Redonda 12 · cuadrada 16 · rectangular 18 sillas' }, { k: 'Historial', v: 'Deshacer y rehacer de la geometría · Ctrl+Z' }, { k: 'Selección', v: 'Arrastre en el fondo o Shift+clic' }, { k: 'Auto acomodo', v: 'Tres arreglos, cero solapes en 24 mesas reales' }, { k: 'Modelo', v: 'Invitado → mesa, no por silla' }, { k: 'Móvil', v: 'Tres pestañas y hojas inferiores bajo 750 px' }],
      decisions: [
        { k: 'Lila es ocupado', v: 'Antes una silla lila significaba vacía. Se invirtió: el color marca a quien ya está sentado y el hueco se ve como hueco. Se cambió en el mapa, en el disco de la mesa y en la leyenda a la vez.', shot: true },
        { k: 'El arrastre no colisiona', v: 'Hubo una zona segura que impedía encimar mesas; peleaba con el cursor y dejaba zonas muertas. Se quitó: el usuario manda. Las colisiones solo se resuelven cuando el sistema acomoda por ti.', shot: true },
        { k: 'Alinear por grupos', v: 'Alinear 24 mesas a la izquierda las apilaría en una columna. Las que ya forman una fila o columna se alinean entre ellas, con una tolerancia de 140 px.', shot: true },
        { k: 'Mover sin perder el cupo', v: 'Al transferir, las mesas llenas o bloqueadas salen en gris y no son destino. “Mover todos” bloquea las mesas donde el grupo completo no cabe.', shot: true },
        { k: 'Nunca liberar en silencio', v: 'El mínimo de sillas de una mesa es su ocupación actual. Para quitar una silla primero hay que mover a alguien, y el aviso dice a cuántos.' },
        { k: 'Deshacer solo la geometría', v: 'Deshacer devuelve posiciones, formas y sillas, no quién se sienta dónde. Deshacer eso a ciegas confunde más de lo que ayuda.' },
        { k: 'El estado vacío enseña', v: 'Sin mesas no hay un mapa en blanco: hay un onboarding que calcula los lugares con tus pases y propone tres acomodos. El tour usa un salón de ejemplo que nunca se guarda.', shot: true }
      ],
      caption: 'Acomodo de mesas' },
    en: { titleA: 'Table', accent: 'seating', tag: 'Planning', lead: 'A floor plan where confirmed guests get seated, with the same tools a designer uses in Figma.',
      facts: [{ k: 'Role', v: 'Design and development' }, { k: 'Platform', v: 'Web · desktop and mobile' }, { k: 'Stack', v: 'React, Vite, Supabase' }, { k: 'Status', v: 'Live · v2' }],
      origin: 'Seating happened outside the platform, in spreadsheets or by hand. The first map had a real bug: tables could slip off the plan while the counter kept adding seats nobody could see.',
      what: 'A plan with round, square and rectangular tables, a dance floor and venue elements. Beside it, confirmed guests grouped by who comes with whom. Drag, assign, and the strip on top tells you what’s left.',
      solves: 'Planning on the same data as the RSVPs: nobody copies lists, and when someone cancels, their seat frees up on its own.',
      anatomy: [
        { k: 'Progress strip', v: '“72 of 80 seated”, how many confirmed guests still lack a table, and the capacity left over.' },
        { k: 'Add', v: 'One button for new tables and venue elements.' },
        { k: 'Plan', v: 'Tables, floor and elements. Drag, zoom and select like in Figma.' },
        { k: 'Table', v: 'Lilac chairs are taken, outlined chairs are free. Name and occupancy below.' },
        { k: 'Confirmed', v: 'Grouped by companions, color-coded per group, with an Assign button.' },
        { k: 'Tools', v: 'Align, auto layout, center, undo and redo.' }
      ],
      modulesLabel: 'The pieces',
      modules: [
        { name: 'Plan', desc: '3500 px canvas with zoom, pan and marquee selection.' },
        { name: 'Table list', desc: 'All 24 tables in one view with their seat strip.' },
        { name: 'Table panel', desc: 'Name, shape, chairs, lock and guests.' },
        { name: 'Guest panel', desc: 'Unseated and seated, with visible filters.' },
        { name: 'Transfer', desc: 'Move one or all without exceeding capacity.' },
        { name: 'Progress strip', desc: 'Seated, pending and leftover capacity.' },
        { name: 'Auto layout', desc: 'Around the floor, on 3 sides or in blocks.' },
        { name: 'Align', desc: 'Figma’s six controls, by rows and columns.' },
        { name: 'Venue elements', desc: 'Dance floor, bar, dessert table and more.' },
        { name: 'Onboarding', desc: 'From zero to a laid-out venue in two steps.' },
        { name: 'Tracking', desc: 'Dashboard widget with the seating status.' },
        { name: 'Guided tour', desc: 'Ten steps over a sample venue.' }
      ],
      flows: [
        { title: 'First layout', steps: ['Pick how many tables and which shapes', 'See seats calculated live', 'Pick one of three layouts', 'Tables and floor are created', 'The view centers on the floor'] },
        { title: 'Seat a group', steps: ['Filter unseated guests', 'Tap Assign on the lead guest', 'Full tables turn gray', 'Pick one with a matching tag', 'The whole group is seated'] }
      ],
      specs: [{ k: 'Shapes', v: 'Round 12 · square 16 · rectangular 18 chairs' }, { k: 'History', v: 'Geometry undo and redo · Ctrl+Z' }, { k: 'Selection', v: 'Drag on the background or Shift+click' }, { k: 'Auto layout', v: 'Three arrangements, zero overlaps on 24 real tables' }, { k: 'Model', v: 'Guest → table, not per chair' }, { k: 'Mobile', v: 'Three tabs and bottom sheets under 750 px' }],
      decisions: [
        { k: 'Lilac means taken', v: 'A lilac chair used to mean empty. It was flipped: color marks who’s seated and a gap reads as a gap. It changed on the map, the table disc and the legend at once.', shot: true },
        { k: 'Dragging doesn’t collide', v: 'A safe zone once blocked overlapping tables; it fought the cursor and left dead zones. It was removed: the user is in charge. Collisions are only resolved when the system lays out for you.', shot: true },
        { k: 'Align by groups', v: 'Aligning 24 tables left would stack them in one column. Tables that already form a row or column align among themselves, with a 140 px tolerance.', shot: true },
        { k: 'Move without breaking capacity', v: 'When transferring, full or locked tables turn gray and aren’t valid targets. “Move all” blocks tables where the whole group won’t fit.', shot: true },
        { k: 'Never free seats silently', v: 'A table’s minimum chairs is its current occupancy. To remove a chair you move someone first, and the hint says how many.' },
        { k: 'Undo only geometry', v: 'Undo restores positions, shapes and chairs, not who sits where. Undoing that blindly confuses more than it helps.' },
        { k: 'The empty state teaches', v: 'With no tables there’s no blank map: an onboarding calculates seats from your passes and proposes three layouts. The tour uses a sample venue that is never saved.', shot: true }
      ],
      caption: 'Table seating' } },

  { id: 'lia', product: 'iattend', img: null, extra: [],
    es: { titleA: 'Lia: tu', accent: 'wedding copilot', tag: 'IA', lead: 'Parece un chatbot más; es una asistente con el contexto completo de tu boda.',
      origin: '', what: 'Una asistente de IA que conoce a tus invitados, tu itinerario y las últimas novedades de tu evento, embebida en todos los rincones de I attend.',
      solves: 'Organizar, planear y resolver dudas sin salir de la plataforma.', decisions: [], caption: 'Lia' },
    en: { titleA: 'Lia: your', accent: 'wedding copilot', tag: 'AI', lead: 'It looks like another chatbot; it’s an assistant with your wedding’s full context.',
      origin: '', what: 'An AI assistant that knows your guests, your itinerary and your event’s latest updates, embedded across every corner of I attend.',
      solves: 'Organizing, planning and answering questions without leaving the platform.', decisions: [], caption: 'Lia' } },

  { id: 'side', product: 'iattend', img: '/iattend/side_m.jpg', extra: [],
    es: { titleA: 'Side', accent: 'events', tag: 'Producto', lead: 'Tu evento es más que un solo momento.',
      origin: 'Una boda no es un solo evento. Lo que pasaba alrededor se organizaba aparte.',
      what: 'Invitaciones pequeñas para eventos secundarios, fáciles de hacer y fáciles de confirmar.',
      solves: 'Organizar todo lo que rodea al evento sin abrir otro proyecto.', decisions: [], caption: 'Side events' },
    en: { titleA: 'Side', accent: 'events', tag: 'Product', lead: 'Your event is more than a single moment.',
      origin: 'A wedding isn’t a single event. Everything around it was organized separately.',
      what: 'Small invitations for secondary events, easy to create and easy to confirm.',
      solves: 'Organizing everything around the event without opening another project.', decisions: [], caption: 'Side events' } },

  { id: 'savethedate', product: 'iattend', img: null, extra: [],
    es: { titleA: 'Save the', accent: 'date', tag: 'Producto', lead: 'Gratis y hecho para llegar a más usuarios.',
      origin: '', what: 'Un save the date que se crea en minutos, donde los invitados reaccionan, comentan en tiempo real y guardan la fecha en su calendario.',
      solves: 'Trabajar la experiencia de la boda desde el primer momento.', decisions: [], caption: 'Save the date' },
    en: { titleA: 'Save the', accent: 'date', tag: 'Product', lead: 'Free, and built to reach more users.',
      origin: '', what: 'A save the date made in minutes, where guests react, comment in real time and add the date to their calendar.',
      solves: 'Shaping the wedding experience from the very first moment.', decisions: [], caption: 'Save the date' } },

  // ── Canplast ──
  { id: 'consola', product: 'canplast', img: '/cpm/after.jpg', extra: ['/cpm/sidebar.jpg', '/cpm/palette.jpg', '/cpm/before.jpg'],
    es: { titleA: 'Consola:', accent: 'tema claro y oscuro', tag: 'Rediseño', lead: 'Rediseño de la consola centrado en el usuario y en acabados de primer nivel.',
      origin: 'La consola anterior en Vue 2 no tenía un sistema visual y repartía la navegación entre menús distintos.',
      what: 'Temas claro y oscuro con una armonía sólida, navegación rápida y amigable, todo centrado en el usuario.',
      solves: '', decisions: [{ k: 'El rojo es escaso', v: 'Solo la acción principal. Nunca decoración ni error.' }],
      caption: 'Consola' },
    en: { titleA: 'Console:', accent: 'light and dark theme', tag: 'Redesign', lead: 'A console redesign centered on the user and top-tier finish.',
      origin: 'The previous Vue 2 console had no visual system and spread navigation across different menus.',
      what: 'Light and dark themes with solid harmony, fast and friendly navigation, all centered on the user.',
      solves: '', decisions: [{ k: 'Red is scarce', v: 'Primary action only. Never decoration, never error.' }],
      caption: 'Console' } },

  { id: 'dashboard', product: 'canplast', img: null, extra: [],
    es: { titleA: 'Dashboard de', accent: 'ventas', tag: 'Datos', lead: 'Hecho para iPad, en un entorno touch, con todo lo que necesitas a la mano.',
      origin: '', what: 'Definición de cómo interactúa el usuario con las gráficas en un entorno touch.',
      solves: '', decisions: [], caption: 'Dashboard de ventas' },
    en: { titleA: 'Sales', accent: 'dashboard', tag: 'Data', lead: 'Built for iPad, in a touch environment, with everything you need at hand.',
      origin: '', what: 'Defining how users interact with charts in a touch environment.',
      solves: '', decisions: [], caption: 'Sales dashboard' } },

  { id: 'ecommerce', product: 'canplast', img: null, extra: [],
    es: { titleA: 'E-commerce:', accent: 'funnel y producto', tag: 'Comercio', lead: 'Del primer clic al checkout.',
      origin: '', what: 'Lógica de funnel, planteamiento de la página, línea de productos y marcas, interacción del cliente, configuración de producto y checkout.',
      solves: '', decisions: [], caption: 'E-commerce' },
    en: { titleA: 'E-commerce:', accent: 'funnel and product', tag: 'Commerce', lead: 'From first click to checkout.',
      origin: '', what: 'Funnel logic, page structure, product lines and brands, customer interaction, product configuration and checkout.',
      solves: '', decisions: [], caption: 'E-commerce' } },

  { id: 'render', product: 'canplast', img: null, extra: [],
    es: { titleA: 'Product', accent: 'render', tag: 'Comercio', lead: 'Cambiar la manera en que se compra cubrecanto.',
      origin: '', what: 'El cliente interactúa con el producto en tiempo real: lo usa, lo configura y ve el resultado.',
      solves: 'Llevar la experiencia de compra a otro nivel.', decisions: [], caption: 'Product render' },
    en: { titleA: 'Product', accent: 'render', tag: 'Commerce', lead: 'Changing the way edge banding is bought.',
      origin: '', what: 'Customers interact with the product in real time: use it, configure it and see the result.',
      solves: 'Taking the buying experience to another level.', decisions: [], caption: 'Product render' } },

  { id: 'whatsapp', product: 'canplast', img: '/whats/cpm_whats.jpg', extra: [],
    es: { titleA: 'WhatsApp + CRM +', accent: 'aprobaciones', tag: 'Integración', lead: 'Una réplica de WhatsApp sobre la API de Meta, con el CRM adentro.',
      origin: '', what: 'Una experiencia idéntica a WhatsApp que lleva el CRM, las cotizaciones y los pedidos a una herramienta que el equipo ya conoce, y suma flujos de aprobación.',
      solves: 'Adaptar funciones internas a una herramienta conocida en lugar de enseñar una nueva.',
      decisions: [{ k: 'Lo que ya conocen', v: 'Se replica WhatsApp. El equipo no aprende una herramienta nueva para hacer lo mismo.' }],
      caption: 'Bandeja de WhatsApp' },
    en: { titleA: 'WhatsApp + CRM +', accent: 'approvals', tag: 'Integration', lead: 'A WhatsApp replica on Meta’s API, with the CRM inside.',
      origin: '', what: 'An experience identical to WhatsApp that brings CRM, quotes and orders into a tool the team already knows, and adds approval flows.',
      solves: 'Adapting internal functions to a familiar tool instead of teaching a new one.',
      decisions: [{ k: 'What they already know', v: 'It mirrors WhatsApp. The team doesn’t learn a new tool to do the same thing.' }],
      caption: 'WhatsApp inbox' } },

  { id: 'modales', product: 'canplast', img: '/cpm/component_1.jpg', extra: ['/cpm/component_2.jpg'],
    es: { titleA: 'Modales:', accent: 'existencias y automatizaciones', tag: 'Componentes', lead: 'Accesos rápidos a funciones, herramientas a la mano.',
      origin: '', what: 'Modales para búsqueda de existencias y automatizaciones, con el sistema de diseño aplicado en cada detalle.',
      solves: '', decisions: [], caption: 'Modales' },
    en: { titleA: 'Modals:', accent: 'stock and automations', tag: 'Components', lead: 'Quick access to functions, tools at hand.',
      origin: '', what: 'Modals for stock lookup and automations, with the design system applied in every detail.',
      solves: '', decisions: [], caption: 'Modals' } },

  { id: 'cobros', product: 'canplast', img: null, extra: [],
    es: { titleA: 'Módulo de', accent: 'cobros', tag: 'Operación', lead: 'Una UI que se adapta a lo que cada usuario necesita.',
      origin: '', what: 'Multitablas, splitter, botones flotantes para aprovechar el espacio y una interfaz personalizable por el usuario.',
      solves: '', decisions: [], caption: 'Cobros' },
    en: { titleA: 'Collections', accent: 'module', tag: 'Operations', lead: 'A UI that adapts to what each user needs.',
      origin: '', what: 'Multi-tables, a splitter, floating buttons to save space, and an interface users can customize.',
      solves: '', decisions: [], caption: 'Collections' } },

  // ── Findiur ──
  { id: 'certificados', product: 'findiur', img: null, extra: [],
    es: { titleA: 'Certificados +', accent: 'notificaciones', tag: 'Layout', lead: 'Una sola pantalla que se adapta a la necesidad actual del gestor.',
      origin: '', what: 'Rediseño de cómo el gestor se relaciona con certificados y notificaciones: responsive, adaptativo y hecho para cambiarse cientos de veces.',
      solves: '', decisions: [], caption: 'Certificados y notificaciones' },
    en: { titleA: 'Certificates +', accent: 'notifications', tag: 'Layout', lead: 'One screen that adapts to what the manager needs right now.',
      origin: '', what: 'Redesigning how managers work with certificates and notifications: responsive, adaptive, and made to be changed hundreds of times.',
      solves: '', decisions: [], caption: 'Certificates and notifications' } },

  { id: 'spotlight', product: 'findiur', img: null, extra: [],
    es: { titleA: 'Spotlight', accent: 'search', tag: 'Navegación', lead: 'La mejor manera de encontrar lo que busco.',
      origin: '', what: 'Un componente base del que depende la navegación y que activa un buscador inspirado en Mac: seguros, documentos, certificados, correos, notificaciones, ajustes y ayuda.',
      solves: 'Encontrar todo en segundos dentro de una aplicación compleja.', decisions: [], caption: 'Spotlight search' },
    en: { titleA: 'Spotlight', accent: 'search', tag: 'Navigation', lead: 'The best way to find what I’m looking for.',
      origin: '', what: 'A base component that drives navigation and opens a Mac-inspired search: policies, documents, certificates, emails, notifications, settings and help.',
      solves: 'Finding anything in seconds inside a complex application.', decisions: [], caption: 'Spotlight search' } },

  { id: 'notas', product: 'findiur', img: null, extra: [],
    es: { titleA: 'Notas y', accent: 'recordatorios', tag: 'Productividad', lead: 'Escondida, pero siempre a la mano.',
      origin: '', what: 'Pendientes del día, tareas y notas clasificadas por color y etiqueta, con deadlines en el calendario, ligadas a certificados o notificaciones, con recordatorios.',
      solves: '', decisions: [], caption: 'Notas' },
    en: { titleA: 'Notes and', accent: 'reminders', tag: 'Productivity', lead: 'Hidden, but always at hand.',
      origin: '', what: 'Today’s to-dos, tasks and notes sorted by color and tag, with deadlines on the calendar, linked to certificates or notifications, with reminders.',
      solves: '', decisions: [], caption: 'Notes' } },

  { id: 'flujos', product: 'findiur', img: null, extra: [],
    es: { titleA: 'Flujos de', accent: 'usuario', tag: 'UX', lead: 'Rediseñar cómo el administrador y el gestor interactúan con la plataforma.',
      origin: '', what: 'Estudio del flujo actual, mejoras y propuesta de flujos nuevos.',
      solves: '', decisions: [], caption: 'Flujos' },
    en: { titleA: 'User', accent: 'flows', tag: 'UX', lead: 'Redesigning how admins and managers interact with the platform.',
      origin: '', what: 'Study of the current flow, improvements and a proposal for new flows.',
      solves: '', decisions: [], caption: 'Flows' } },

  { id: 'ds', product: 'findiur', img: null, extra: [],
    es: { titleA: 'Design system y', accent: 'automatizaciones', tag: 'Sistema de diseño', lead: 'Componentes nuevos en segundos, sin perder la identidad de la marca.',
      origin: '', what: 'Diseño, desarrollo e implementación de un design system con automatizaciones, incorporable a Claude Code y Claude Design.',
      solves: 'Crear componentes nuevos rápido cuidando la identidad y consistencia visual.', decisions: [], caption: 'Design system' },
    en: { titleA: 'Design system and', accent: 'automations', tag: 'Design system', lead: 'New components in seconds, without losing the brand’s identity.',
      origin: '', what: 'Design, development and implementation of a design system with automations, pluggable into Claude Code and Claude Design.',
      solves: 'Building new components fast while keeping identity and visual consistency.', decisions: [], caption: 'Design system' } }
];
