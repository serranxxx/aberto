import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LangProvider } from "@/components/site/LangProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clickable · UX design",
  description:
    "Diseño UX para SaaS y herramientas internas. Diseñamos, y cuando hace falta construimos, desde el primer flujo hasta la pantalla en producción.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.className}>
      <head>
        {/* Momo Signature aún no está en next/font: solo se usa para los acentos manuscritos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Momo+Signature&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
