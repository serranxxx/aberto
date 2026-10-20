// Rutas del portafolio. Módulo sin 'use client' para poder usarse en server components.

// Proyectos con página de caso de estudio
export const PROJECT_IDS = ['dynamicrsvp', 'dashboardp', 'commandbar', 'flash']
export const projectHref = (id: string) => `/proyecto/${id}`
