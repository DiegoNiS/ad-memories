import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Dancing_Script, Great_Vibes, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-greatvibes",
  display: "swap",
});

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
      className={`${playfair.variable} ${inter.variable} ${montserrat.variable} ${dancingScript.variable} ${greatVibes.variable}`}
    >
      <head>
        {/* Bulletproof Google Fonts CDN Link for Cursive, Serif, and Montserrat */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Great+Vibes&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-[#D4AF37]/20 selection:text-[#4A3B32]">
        {children}
      </body>
    </html>
  );
}
