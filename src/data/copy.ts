// Textos del home en español e inglés.

export const COPY = {
  es: {
    discipline: 'Diseño UX', navServices: 'Servicios', navWhy: 'Por qué nosotros', navWork: 'Trabajo', navProcess: 'Proceso',
    ctaShort: 'Agenda una llamada', ctaMain: 'Agenda una llamada', ctaSecondary: 'Cómo te podemos ayudar',
    heroLabel: 'Diseño UX · SaaS y herramientas internas',
    heroA: 'Tu producto ya funciona.', heroAccent: 'falta que se entienda.',
    heroLead: 'Venimos del lado que construye software. Sabemos por qué tu producto se siente complicado, y cómo hacer que se sienta tan simple como es potente.',
    trustLabel: 'Trabajo reciente',
    painLabel: '¿Te suena?',
    painTitle: 'Tu producto funciona.\nEl problema es\nque no se nota.',
    // Comentarios de un equipo, como en Figma: quién lo dice, cuándo y qué
    pains: [
      { who: 'Soporte', when: 'hace 2 h', text: 'Mis usuarios piden ayuda para cosas que deberían ser obvias.' },
      { who: 'Customer Success', when: 'ayer', text: 'Se nos va demasiado tiempo en onboardings.' },
      { who: 'Producto', when: 'hace 3 días', text: 'Cada pantalla nueva se ve distinta a la anterior.' },
      { who: 'Desarrollo', when: 'la semana pasada', text: 'Lo que se diseñó no es lo que se terminó construyendo.' },
    ],
    painClose: 'Si hay que explicarlo,', painCloseAccent: 'todavía no está diseñado.',
    servicesLabel: 'Cómo te podemos ayudar', servicesTitle: 'Diseño UX hecho para tu producto, no una plantilla.', servicesLead: 'Cada proyecto empieza por entender a quien usa tu producto. Desde ahí, esto es lo que podemos hacer por ti.',
    forYou: 'Es para ti si', youGet: 'Lo que recibes',
    services: [
      { k: 'Rediseño de producto', who: 'Tu producto ya funciona, pero los usuarios se pierden, piden ayuda o lo abandonan.', get: 'Diagnóstico de los flujos, rediseño en Figma y acompañamiento mientras se implementa.', ex: 'consola', exLabel: 'Ver un rediseño' },
      { k: 'Una feature nueva', who: 'Vas a construir algo nuevo y quieres que se entienda desde el primer día.', get: 'Flujos, pantallas y todos sus estados, listos para que tu equipo los construya.', ex: 'mesas', exLabel: 'Ver una feature' },
      { k: 'Sistema de diseño', who: 'Cada pantalla se ve distinta y tu equipo diseña desde cero cada vez.', get: 'Componentes, reglas y documentación que tu equipo reutiliza sin preguntarnos, con automatizaciones en Claude para crear pantallas nuevas sin salirse del sistema.', ex: 'ds', exLabel: 'Ver un sistema' },
      { k: 'Diseño y desarrollo', who: 'No tienes quién construya el front-end, o quieres que lo diseñado llegue igual a producción.', get: 'La interfaz funcionando, con el código en tu repositorio.', ex: 'editor', exLabel: 'Ver algo construido' }
    ],
    forkYes: 'Sí', forkNo: 'No', decoSearch: 'Buscar un feature…', decoCode: 'Ver código', whyLabel: 'Por qué nosotros', whyTitle: 'Lo que necesitas no es solo diseño.',
    why: [
      { n: '01', k: 'Diseñamos lo que se puede construir', v: 'Venimos de la ingeniería y desarrollamos lo que diseñamos. Sabemos cuánto cuesta cada decisión antes de proponerla, así que lo que te entregamos tu equipo lo puede construir.', proof: 'Prueba: I attend, diseñado y construido por nosotros' },
      { n: '02', k: 'Pensamos como dueños de producto', v: 'Tenemos un SaaS propio que hoy está en producción. Sabemos lo que es priorizar con tiempo y dinero propios, y diseñamos con eso en mente.', proof: 'Prueba: las cifras de abajo' },
      { n: '03', k: 'Diseñamos para quien no eligió el software', v: 'En Canplast diseñamos herramientas que el equipo usa todo el día porque es su trabajo, no porque quiera. Ahí no hay margen para lo confuso.', proof: 'Prueba: Consola y WhatsApp + CRM' },
      { n: '04', k: 'Cada decisión tiene una razón', v: 'El argumento nunca es «así se ve mejor». Es «así lo entiende quien lo usa». Cada decisión te llega explicada, para que la puedas defender.', proof: 'Prueba: cualquier feature documentada' }
    ],
    proofLead: 'La prueba: I attend,', proofRest: 'nuestro SaaS de gestión de eventos, diseñado y construido por nosotros.', statsIntro: 'SaaS para la gestión de eventos: invitaciones, invitados, confirmaciones y acomodo. Lo fundamos, lo diseñamos y lo construimos.', statsLink: 'Ver cómo está hecho',
    aboutLabel: '¿Quiénes somos?',
    aboutP1: 'Diseñamos la experiencia de productos digitales sabiendo cómo se construyen. Venimos del lado que programa, y eso cambia cómo diseñamos.',
    aboutP2: 'Clickable nace del trabajo de Alberto Serrano, ingeniero y diseñador UX. Hoy diseñamos herramientas internas para una empresa industrial, nuestro propio SaaS y sistemas de diseño para equipos de producto en México y España.',
    aboutChip: 'Diseño UX · Ingeniería', toolsLabel: 'Con lo que trabajamos',
    resume: 'Descargar CV', flipHint: 'Toca la tarjeta para girarla',
    workLabel: 'Conoce nuestro trabajo', workTitle: 'Proyectos reales, soluciones reales.', workLead: 'Qué problema había, qué decidimos y por qué.',
    seeFeature: 'Ver feature', solvesLabel: 'Qué resuelve', noImg: 'Captura pendiente', exploreTitle: 'Más ejemplos',
    processLabel: 'Cómo trabajamos', processTitle: 'Escribirnos no te compromete a nada.',
    steps: [
      { k: 'Llamada', v: 'Nos cuentas qué está pasando y vemos si podemos ayudarte.' },
      { k: 'Diagnóstico', v: 'Revisamos tu producto y dónde se pierden tus usuarios.' },
      { k: 'Propuesta', v: 'Alcance, tiempo y costo por escrito. Sin sorpresas.' },
      { k: 'Diseño y entrega', v: 'Figma si es diseño; la interfaz funcionando si es desarrollo.' }
    ],
    notForTitle: 'Para quién es',
    notFor: 'Para quien ya tiene un producto funcionando y nota que sus usuarios se atoran.\nUn SaaS en producción, una herramienta interna que nadie usa como se pensó.\nCon equipo de desarrollo o sin él: lo que importa es que ya viste el problema.',
    ctaTitle: '¿Tus usuarios se pierden en tu producto?', ctaTitleAccent: 'Hablemos.',
    ctaLead: 'Cuéntanos qué está pasando. En una llamada corta sabremos si podemos ayudarte.'
  },
  en: {
    discipline: 'UX Design', navServices: 'Services', navWhy: 'Why us', navWork: 'Work', navProcess: 'Process',
    ctaShort: 'Book a call', ctaMain: 'Book a call', ctaSecondary: 'How we can help',
    heroLabel: 'UX design · SaaS and internal tools',
    heroA: 'Your product already works.', heroAccent: 'now it needs to make sense.',
    heroLead: 'We come from the side that builds software. We know why your product feels complicated, and how to make it feel as simple as it is powerful.',
    trustLabel: 'Recent work',
    painLabel: 'Sound familiar?',
    painTitle: 'Your product works.\nThe problem is\nnobody can tell.',
    pains: [
      { who: 'Support', when: '2h ago', text: 'My users ask for help with things that should be obvious.' },
      { who: 'Customer Success', when: 'yesterday', text: 'We spend way too much time on onboarding.' },
      { who: 'Product', when: '3 days ago', text: 'Every new screen looks different from the last.' },
      { who: 'Development', when: 'last week', text: 'What was designed isn’t what got built.' },
    ],
    painClose: 'If it needs explaining,', painCloseAccent: 'it isn’t designed yet.',
    servicesLabel: 'How we can help', servicesTitle: 'UX design made for your product, not a template.', servicesLead: 'Every project starts by understanding who uses your product. From there, this is what we can do for you.',
    forYou: 'It’s for you if', youGet: 'What you get',
    services: [
      { k: 'Product redesign', who: 'Your product works, but users get lost, ask for help or drop off.', get: 'A flow diagnosis, a redesign in Figma and support while it’s implemented.', ex: 'consola', exLabel: 'See a redesign' },
      { k: 'A new feature', who: 'You’re building something new and want it understood from day one.', get: 'Flows, screens and every state, ready for your team to build.', ex: 'mesas', exLabel: 'See a feature' },
      { k: 'Design system', who: 'Every screen looks different and your team designs from scratch each time.', get: 'Components, rules and docs your team reuses without asking us, with Claude automations to build new screens without leaving the system.', ex: 'ds', exLabel: 'See a system' },
      { k: 'Design and development', who: 'You have no one to build the front end, or want the design to reach production intact.', get: 'The working interface, with the code in your repository.', ex: 'editor', exLabel: 'See something built' }
    ],
    forkYes: 'Yes', forkNo: 'No', decoSearch: 'Search a feature…', decoCode: 'View code', whyLabel: 'Why us', whyTitle: 'What you need isn’t just design.',
    why: [
      { n: '01', k: 'We design what can be built', v: 'We come from engineering and we build what we design. We know what each decision costs before proposing it, so your team can build what we deliver.', proof: 'Proof: I attend, designed and built by us' },
      { n: '02', k: 'We think like product owners', v: 'We run our own SaaS, live today. We know what it’s like to prioritize with our own time and money, and we design with that in mind.', proof: 'Proof: the numbers below' },
      { n: '03', k: 'We design for people who didn’t choose the software', v: 'At Canplast we design tools the team uses all day because it’s their job, not because they want to. There’s no room for confusion there.', proof: 'Proof: Console and WhatsApp + CRM' },
      { n: '04', k: 'Every decision has a reason', v: 'The argument is never “it looks better.” It’s “this is how users understand it.” Every decision comes explained, so you can defend it.', proof: 'Proof: any documented feature' }
    ],
    proofLead: 'The proof: I attend,', proofRest: 'our event management SaaS, designed and built by us.', statsIntro: 'A SaaS for event management: invitations, guests, RSVPs and seating. We founded, designed and built it.', statsLink: 'See how it’s made',
    aboutLabel: 'Who are we?',
    aboutP1: 'We design the experience of digital products knowing how they’re built. We come from the side that codes, and that changes how we design.',
    aboutP2: 'Clickable grew out of the work of Alberto Serrano, engineer and UX designer. Today we design internal tools for an industrial company, our own SaaS, and design systems for product teams in Mexico and Spain.',
    aboutChip: 'UX design · Engineering', toolsLabel: 'What we work with',
    resume: 'Download résumé', flipHint: 'Tap the card to flip it',
    workLabel: 'See our work', workTitle: 'Real projects, real solutions.', workLead: 'What the problem was, what we decided and why.',
    seeFeature: 'See feature', solvesLabel: 'What it solves', noImg: 'Screenshot pending', exploreTitle: 'More examples',
    processLabel: 'How we work', processTitle: 'Writing to us commits you to nothing.',
    steps: [
      { k: 'Call', v: 'You tell us what’s happening and we see if we can help.' },
      { k: 'Diagnosis', v: 'We review your product and where your users get lost.' },
      { k: 'Proposal', v: 'Scope, timeline and cost in writing. No surprises.' },
      { k: 'Design and delivery', v: 'Figma for design work; the working interface for development.' }
    ],
    notForTitle: 'Who it’s for',
    notFor: 'For anyone who already has a working product and notices their users getting stuck.\nA SaaS in production, an internal tool nobody uses the way it was meant to be used.\nWith a dev team or without one: what matters is that you’ve already seen the problem.',
    ctaTitle: 'Are your users getting lost in your product?', ctaTitleAccent: 'Let’s talk.',
    ctaLead: 'Tell us what’s happening. In a short call we’ll know if we can help.'
  }
}

export type Copy = (typeof COPY)['es']

// Textos fijos de la página de proyecto (por ahora, solo Dynamic RSVP).
export const PROJECT_COPY = {
  es: {
    back: '← Proyectos', problem: 'El problema', solution: 'La solución', business: 'La decisión de negocio',
    problemTitle: 'Cuatro herramientas que casi nadie encontraba.', solutionTitle: 'Usamos la confirmación como puerta.',
    flow: 'Flujo completo', screens: 'Pantallas', prev: 'Anterior', next: 'Siguiente',
    result: 'El resultado',
    more: 'Proyectos que te pueden interesar',
    cursorDesign: 'Diseñando flujos', cursorTest: 'Probando con usuarios',
    gallery: ['Aparece sola', 'Se confirma en un toque', 'Agradece y agenda', 'Se queda como menú', 'Lleva a los pases', 'Responde con Lia', 'Muestra las fotos'],
  },
  en: {
    back: '← Projects', problem: 'The problem', solution: 'The solution', business: 'The business decision',
    problemTitle: 'Four tools almost nobody found.', solutionTitle: 'We used the RSVP as the door.',
    flow: 'Full flow', screens: 'Screens', prev: 'Previous', next: 'Next',
    result: 'The result',
    more: 'Projects you might like',
    cursorDesign: 'Designing flows', cursorTest: 'Testing with users',
    gallery: ['Shows up on its own', 'Confirm in one tap', 'Thanks and schedules', 'Stays as a menu', 'Leads to the passes', 'Answers with Lia', 'Shows the photos'],
  },
}
