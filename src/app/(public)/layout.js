import Footer from '@/components/public/shared/footer';
import BottomNavbar from '@/components/public/shared/BottomNavbar';
import AIChatbot from "@/components/AIChatbot";
import React from 'react';
import WhatsAppButton from '@/components/WhatsAppButton';


export const metadata = {
  title: {
    default: "online Madrasah",
    template: "%s | online Madrasah",
  },
  description: "আধুনিক ও সুশৃঙ্খল আবাসন ব্যবস্থাসহ চারবর্ষে হিফজ ও একাডেমিক শিক্ষার এক অনন্য প্রতিষ্ঠান, হবিগঞ্জ।",
  keywords: ["imadrasah", "online Madrasah", "Hifz Madrasah"],
  openGraph: {
    title: "online Madrasah",
    description: "আধুনিক ও সুশৃঙ্খল আবাসন ব্যবস্থাসহ ৬ মাসে হিফজ একাডেমিক শিক্ষার এক অনন্য প্রতিষ্ঠান।",
    url: "https://imadrasah.vercel.app", // আপনার বর্তমান ডোমেইন
    siteName: "online Madrasah",
    locale: "bn_BD",
    type: "website",
  },
};

const layout = ({ children }) => {
  return (
    <div>

      <main className="min-h-screen pb-16 md:pb-0">
        {children}
      </main>

      <BottomNavbar />
      <AIChatbot />
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default layout;

// MONGODB_URI=mongodb://imadrasah:uk7XNc2jvROkYshM@ac-famfzlt-shard-00-00.w9cbrwo.mongodb.net:27017,ac-famfzlt-shard-00-01.w9cbrwo.mongodb.net:27017,ac-famfzlt-shard-00-02.w9cbrwo.mongodb.net:27017/imadrasah?ssl=true&replicaSet=atlas-131uq2-shard-0&authSource=admin&appName=Cluster0
// BETTER_AUTH_URL=https://imadrasah.vercel.app
// GEMINI_API_KEY=AQ.Ab8RN6I-3s6LG9nM8T-7OiFqxXcSf7amO8v4OsK43NJLiMRb2w
// BETTER_AUTH_SECRET=Y0hjcNgdsWbhfSn9CPtPLGB0YMsHKMfK
// NEXT_PUBLIC_SERVER_API=https://imd-server-two.vercel.app
// NEXT_PUBLIC_IMGBB_API_KEY=5a4f8c279ddcedf0d73f50444bad88b0
