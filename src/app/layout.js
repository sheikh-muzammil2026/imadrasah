import { Geist, Geist_Mono, Reem_Kufi, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers/providers";
import { siteConfig } from "@/config/siteConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const reemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: `${siteConfig.identity.name.bn} (${siteConfig.identity.name.en}) | ${siteConfig.identity.tagline.bn}`,
  description: siteConfig.identity.description.bn,
  keywords: [
    "online madrasah",
    siteConfig.identity.name.en.toLowerCase(),
    siteConfig.identity.name.bn,
    "quran learning",
    "hifz online",
    "bengali islamic platform",
  ],
  icons: {
    icon: siteConfig.identity.favicon,
  },
};

export default function RootLayout({ children }) {
  const { colors } = siteConfig.theme;
  const themeCssVars = `
    :root {
      --color-primary: ${colors.primary};
      --color-accent: ${colors.accent};
      --color-secondary: ${colors.secondary};
      --color-surface: ${colors.surface};
    }
  `;

  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} ${reemKufi.variable} ${hindSiliguri.variable} h-full antialiased light`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCssVars }} />
      </head>
      <body className="min-h-full flex flex-col bg-[#E3F2FD] text-slate-800">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
