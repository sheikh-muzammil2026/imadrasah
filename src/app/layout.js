import "./globals.css";
import Providers from "@/components/Providers/providers";
import { siteConfig } from "@/config/siteConfig";

export const metadata = {
  title: `${siteConfig.identity.name.bn} (${siteConfig.identity.name.en}) | ${siteConfig.identity.tagline.en}`,
  description: siteConfig.identity.description.bn,
  keywords: [
    "online madrasah",
    siteConfig.identity.name.en.toLowerCase(),
    siteConfig.identity.name.bn,
    "quran learning",
    "tajweed online",
    "hifz online",
    "international islamic institute",
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
      className="h-full antialiased light"
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
