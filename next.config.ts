import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "picsum.photos",
      "jblcqcxckefmydvtrxbi.supabase.co",
    ],
  },
  // Rutas del portafolio anterior y de las páginas de feature retiradas
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/feature/dynamicrsvp", destination: "/proyecto/dynamicrsvp", permanent: true },
      { source: "/feature/:id", destination: "/#trabajo", permanent: false },
      { source: "/:old(consola|whats|iattend|visual-cpm|visual-iattend|visual-ft|frama-tech)", destination: "/#trabajo", permanent: true },
    ];
  },
};

export default nextConfig;
