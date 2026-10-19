// Rutas del portafolio. Módulo sin 'use client' para poder usarse en server components.

export const featureHref = (id: string) => `/feature/${id}`

// Proyectos con página de caso de estudio propia; el resto usa la página de feature.
export const PROJECT_IDS = ['dynamicrsvp', 'dashboardp']
export const projectHref = (id: string) => `/proyecto/${id}`
export const workHref = (id: string) => (PROJECT_IDS.includes(id) ? projectHref(id) : featureHref(id))
