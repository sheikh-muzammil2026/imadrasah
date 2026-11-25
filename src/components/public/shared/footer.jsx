import Link from "next/link";
import { BookOpen } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D47A1] text-white pt-14 border-t-4 border-[#2196F3]">
      {/* 4-Column Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand Info & Google Play Badge */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="bg-white rounded-xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-sm hover:shadow-md transition">
                <div className="w-8 h-8 rounded-full bg-[#E3F2FD] flex items-center justify-center text-[#2196F3]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-sm text-[#0D47A1] leading-none">
                    {siteConfig.identity.name.bn}
                  </span>
                  <span className="text-[10px] text-slate-600 font-semibold mt-0.5">
                    {siteConfig.identity.subtitle.bn}
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#E3F2FD]/90 leading-relaxed">
              {siteConfig.identity.description.bn}
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
            <div className="w-8 h-0.5 bg-[#90CAF9] mb-4 rounded-full" />
            <ul className="space-y-2.5 text-sm text-[#E3F2FD]">
              <li>
                <Link href="/" className="hover:text-white hover:underline transition duration-150">হোম পেজ</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:underline transition duration-150">আমাদের পরিচিতি</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white hover:underline transition duration-150">চলমান ৩টি বিভাগ</Link>
              </li>
              <li>
                <Link href="/ebooks" className="hover:text-white hover:underline transition duration-150">ডিজিটাল ই-বুক লাইব্রেরি</Link>
              </li>
              <li>
                <Link href="/donation" className="hover:text-white hover:underline transition duration-150">সাদাকাহ ও অনুদান</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: সহায়তা ও আইন (Active Links) */}
          <div>
            <h3 className="text-base font-bold text-white mb-2">সহায়তা ও আইনি তথ্য</h3>
            <div className="w-8 h-0.5 bg-[#90CAF9] mb-4 rounded-full" />
            <ul className="space-y-2.5 text-sm text-[#E3F2FD]">
              <li>
                <Link href="/#faq" className="hover:text-white hover:underline transition duration-150">হেল্প সেন্টার / সচরাচর জিজ্ঞাসা</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white hover:underline transition duration-150">ব্যবহারের শর্তাবলি</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white hover:underline transition duration-150">গোপনীয়তা নীতি</Link>
              </li>
              <li>
                <Link href="/terms#refund" className="hover:text-white hover:underline transition duration-150">রিফান্ড পলিসি</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:underline transition duration-150">যোগাযোগ ও সাপোর্ট</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: যোগাযোগ */}
          <div>
            <h3 className="text-base font-bold text-white mb-2">যোগাযোগ</h3>
            <div className="w-8 h-0.5 bg-[#90CAF9] mb-4 rounded-full" />
            <ul className="space-y-3 text-sm text-[#E3F2FD]">
              <li className="flex items-center gap-2">
                <span className="text-[#90CAF9] text-xs">◆</span>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition break-all">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#90CAF9] text-xs">◆</span>
                <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="hover:text-white transition">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#90CAF9] text-xs mt-1">◆</span>
                <span className="leading-relaxed">{siteConfig.contact.address.bn}</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mt-5">
              {[
                { name: "Facebook", icon: "f", href: siteConfig.contact.socialLinks.facebook },
                { name: "YouTube", icon: "yt", href: siteConfig.contact.socialLinks.youtube },
                { name: "WhatsApp", icon: "wa", href: siteConfig.contact.socialLinks.whatsapp },
                { name: "TikTok", icon: "tt", href: siteConfig.contact.socialLinks.tiktok },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#90CAF9]/60 hover:border-white hover:bg-[#2196F3] text-white flex items-center justify-center text-xs font-bold transition duration-150"
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
      <div className="bg-[#09357A] py-4 text-center text-xs text-[#E3F2FD]/80 border-t border-white/10">
        <p>© {currentYear} {siteConfig.identity.name.bn} - সর্বস্বত্ব সংরক্ষিত।</p>
      </div>
    </footer>
  );
}
