import type { Metadata, Viewport } from "next";
import { fontPlayfair, fontInter, fontMontserrat, fontDancingScript, fontGreatVibes } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diego & Angeles ❤️",
  description: "Una declaración muy especial para la persona más increíble.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Diego & Angeles",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#FDFBF7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fontPlayfair.className} ${fontInter.className} ${fontMontserrat.className} ${fontDancingScript.className} ${fontGreatVibes.className}`}
    >
      <body className={`${fontMontserrat.className} antialiased selection:bg-[#D4AF37]/20 selection:text-[#4A3B32]`}>
        {children}
      </body>
    </html>
  );
}
