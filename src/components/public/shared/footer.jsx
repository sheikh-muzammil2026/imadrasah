import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#064E73] text-white pt-14">
      {/* 4-Column Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand Info & Google Play Badge */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="bg-white rounded-xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-sm hover:shadow-md transition">
                <div className="w-8 h-8 rounded-full bg-[#0288D1]/10 flex items-center justify-center text-[#0288D1]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-sm text-[#064E73] leading-none">
                    কুরআন কানন
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">
                    ইনস্টিটিউট বাংলাদেশ
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              কুরআন কাননে সর্বস্তরের মুসলমান-যাদের কুরআন শিক্ষার সুযোগ হয়নি অথবা দ্বীনি প্রতিষ্ঠানে যাওয়ার সুযোগ নেই তাদের জন্য একটি বিশ্বস্ত প্ল্যাটফর্ম।
            </p>

            {/* Google Play Badge */}
            <div className="pt-1">
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-black/60 hover:bg-black/80 border border-white/20 rounded-lg px-3.5 py-2 text-white transition duration-150"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.793 12 3.61 22.186a1.99 1.99 0 01-.61-.914V2.728c.15-.355.372-.676.609-.914zm11.233 11.234l2.43 2.43-11.83 6.83 9.4-9.26zm2.43-2.096l2.128 1.228a1.298 1.298 0 010 2.24l-2.128 1.228-2.083-2.083 2.083-2.613zm-2.43-2.096L5.442 3.526l11.83 6.83-2.43 2.43z" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] uppercase tracking-wider text-gray-300">GET IT ON</span>
                  <span className="text-xs font-bold leading-tight">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Column 2: প্ল্যাটফর্ম ও কোর্স (Active Links) */}
          <div>
            <h3 className="text-base font-bold text-white mb-2">প্ল্যাটফর্ম ও কোর্স</h3>
            <div className="w-8 h-0.5 bg-[#FBBF24] mb-4 rounded-full" />
            <ul className="space-y-2.5 text-sm text-blue-100">
              <li>
                <Link href="/" className="hover:text-amber-300 transition duration-150">হোম পেজ</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition duration-150">আমাদের পরিচিতি</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-amber-300 transition duration-150">চলমান কোর্সসমূহ</Link>
              </li>
              <li>
                <Link href="/ebooks" className="hover:text-amber-300 transition duration-150">ডিজিটাল ই-বুক লাইব্রেরি</Link>
              </li>
              <li>
                <Link href="/donation" className="hover:text-amber-300 transition duration-150">সাদাকাহ ও অনুদান</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: সহায়তা ও আইন (Active Links) */}
          <div>
            <h3 className="text-base font-bold text-white mb-2">সহায়তা ও আইনি তথ্য</h3>
            <div className="w-8 h-0.5 bg-[#FBBF24] mb-4 rounded-full" />
            <ul className="space-y-2.5 text-sm text-blue-100">
              <li>
                <Link href="/faq" className="hover:text-amber-300 transition duration-150">হেল্প সেন্টার / সচরাচর জিজ্ঞাসা</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-300 transition duration-150">ব্যবহারের শর্তাবলি</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-300 transition duration-150">গোপনীয়তা নীতি</Link>
              </li>
              <li>
                <Link href="/terms#refund" className="hover:text-amber-300 transition duration-150">রিফান্ড পলিসি</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition duration-150">যোগাযোগ ও সাপোর্ট</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: যোগাযোগ */}
          <div>
            <h3 className="text-base font-bold text-white mb-2">যোগাযোগ</h3>
            <div className="w-8 h-0.5 bg-[#FBBF24] mb-4 rounded-full" />
            <ul className="space-y-3 text-sm text-blue-100">
              <li className="flex items-center gap-2">
                <span className="text-[#0288D1] text-xs">◆</span>
                <a href="mailto:info@qurankanon.com" className="hover:text-amber-300 transition break-all">
                  info@qurankanon.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#0288D1] text-xs">◆</span>
                <a href="tel:+8801767911188" className="hover:text-amber-300 transition">
                  +880 1767 911 188
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#0288D1] text-xs">◆</span>
                <span>সেক্টর-১১, উত্তরা, ঢাকা, বাংলাদেশ</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mt-5">
              {[
                { name: "Facebook", icon: "f", href: "https://facebook.com" },
                { name: "YouTube", icon: "yt", href: "https://youtube.com" },
                { name: "WhatsApp", icon: "wa", href: "https://wa.me/8801767911188" },
                { name: "TikTok", icon: "tt", href: "https://tiktok.com" },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-blue-200/40 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center text-xs font-bold transition duration-150"
                  title={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#04354F] py-4 text-center text-xs text-blue-200 border-t border-white/5">
        <p>© ২০২৬ কুরআন কানন - সর্বস্বত্ব সংরক্ষিত।</p>
      </div>
    </footer>
  );
}
