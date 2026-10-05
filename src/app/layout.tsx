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
  title: "Alberto Serrano · Diseño UX",
  description:
    "Diseño UX para SaaS y herramientas internas. Diseño, y cuando hace falta construyo, desde el primer flujo hasta la pantalla en producción.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.className}>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
