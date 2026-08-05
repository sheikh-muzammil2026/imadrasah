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

// আরবি ফন্ট
const reemKufi = Reem_Kufi({
    variable: "--font-reem-kufi",
    subsets: ["arabic"],
    weight: ["400", "700"],
    display: "swap",
});

// পুরো ওয়েবসাইটের জন্য আকর্ষণীয় বাংলা ফন্ট (Hind Siliguri)
const hindSiliguri = Hind_Siliguri({
    variable: "--font-hind-siliguri",
    subsets: ["bengali"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

export const metadata = {
    title: "অনলাইন আইডিয়াল মাদ্রাসা (OIM) - বিশ্বমানের অনলাইন ইসলামিক শিক্ষা",
    description: "অনলাইন আইডিয়াল মাদ্রাসা একটি আধুনিক দ্বীনি শিক্ষাদানের ডিজিটাল লার্নিং প্ল্যাটফর্ম। ঘরে বসেই হিফজ, নাজেরা ও একাডেমিক বিষয়ে অভিজ্ঞ উলামাদের তত্ত্বাবধানে কুরআন ও সুন্নাহর সঠিক শিক্ষা অর্জন করুন।",
};

export default function RootLayout({ children }) {
    return (
        <html
            className={`${geistSans.variable} ${geistMono.variable} ${reemKufi.variable} ${hindSiliguri.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
