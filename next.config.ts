import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "picsum.photos",
      "jblcqcxckefmydvtrxbi.supabase.co",
    ],
  },
  // Rutas del portafolio anterior
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/consola", destination: "/feature/consola", permanent: true },
      { source: "/whats", destination: "/feature/whatsapp", permanent: true },
      { source: "/iattend", destination: "/feature/editor", permanent: true },
      { source: "/visual-cpm", destination: "/feature/consola", permanent: true },
      { source: "/visual-iattend", destination: "/feature/editor", permanent: true },
      { source: "/visual-ft", destination: "/#trabajo", permanent: true },
      { source: "/frama-tech", destination: "/#trabajo", permanent: true },
    ];
  },
};

export default nextConfig;
