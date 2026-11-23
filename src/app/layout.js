import { Geist, Geist_Mono, Reem_Kufi, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers/providers";

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
  title: "কুরআন কানন (Quran Kanon) | আন্তর্জাতিক অনলাইন শিক্ষাপ্রতিষ্ঠান",
  description: "আট বছর ধরে আমরা শিশু ও বয়স্কদের সহীহ কুরআন শিক্ষা দিয়ে আসছি। অনলাইন কোর্স, লাইভ ক্লাস, ই-বুক ও প্রতিদিনের অগ্রগতি রিপোর্ট — সবই এক জায়গায়।",
  keywords: ["online madrasah", "quran kanon", "quran learning", "hifz online", "bengali islamic platform"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} ${reemKufi.variable} ${hindSiliguri.variable} h-full antialiased light`}
    >
      <body className="min-h-full flex flex-col bg-[#F5FAFD] text-[#4A606D]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
