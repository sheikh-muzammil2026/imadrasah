import Link from "next/link";
import { BookOpen, Globe2, Mail, Phone, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D47A1] text-white pt-14 border-t-4 border-[#2196F3]">
      {/* 4-Column Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand Info & Institutional Presence */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="bg-white rounded-xl px-4 py-2.5 inline-flex items-center gap-2.5 shadow-sm hover:shadow-md transition">
                <div className="w-8 h-8 rounded-full bg-[#E3F2FD] flex items-center justify-center text-[#2196F3]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xs sm:text-sm text-[#0D47A1] leading-none">
                    {siteConfig.identity.name.shortBn}
                  </span>
                  <span className="text-[10px] text-slate-600 font-semibold mt-0.5">
                    {siteConfig.identity.tagline.en}
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-xs text-[#E3F2FD]/90 leading-relaxed">
              {siteConfig.identity.pledge.bn}
            </p>

            {/* Institutional Presence Badge (100% Online Worldwide) */}
            <div className="bg-white/10 rounded-xl p-3 border border-white/15 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Globe2 className="w-4 h-4 text-[#90CAF9]" />
                <span>{siteConfig.presence.titleBn}</span>
              </div>
              <p className="text-[11px] text-[#E3F2FD]/80">
                মোড: {siteConfig.presence.modeOfOperation} • সার্ভিস এরিয়া: {siteConfig.presence.serviceArea}
              </p>
            </div>
          </div>

          {/* Column 2: প্ল্যাটফর্ম ও ৩টি মূল কোর্স */}
          <div>
            <h3 className="text-base font-bold text-white mb-2">কোর্স ও বিভাগসমূহ</h3>
            <div className="w-8 h-0.5 bg-[#90CAF9] mb-4 rounded-full" />
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#E3F2FD]">
              {siteConfig.courses.map((course) => (
                <li key={course.id}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="hover:text-white hover:underline transition duration-150 block truncate"
                    title={course.titleBn}
                  >
                    • {course.titleBn}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/ebooks" className="hover:text-white hover:underline transition duration-150">
                  • ডিজিটাল ই-বুক লাইব্রেরি
                </Link>
              </li>
              <li>
                <Link href="/donation" className="hover:text-white hover:underline transition duration-150">
                  • সাদাকাহ জারিয়াহ ও অনুদান
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: সহায়তা ও আইন */}
          <div>
            <h3 className="text-base font-bold text-white mb-2">সহায়তা ও প্রাতিষ্ঠানিক নীতি</h3>
            <div className="w-8 h-0.5 bg-[#90CAF9] mb-4 rounded-full" />
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#E3F2FD]">
              <li>
                <Link href="/about" className="hover:text-white hover:underline transition duration-150">
                  আমাদের পরিচিতি ও শিক্ষাদর্শ
                </Link>
              </li>
              <li>
                <Link href="/career" className="hover:text-white hover:underline transition duration-150">
                  শিক্ষক নিয়োগ ও ক্যারিয়ার
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white hover:underline transition duration-150">
                  হেল্প সেন্টার / সাধারণ জিজ্ঞাসা
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white hover:underline transition duration-150">
                  ব্যবহারের শর্তাবলি ও রিফান্ড নীতি
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white hover:underline transition duration-150">
                  গোপনীয়তা ও ডেটা সুরক্ষা নীতি
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: অফিশিয়াল যোগাযোগ */}
          <div>
            <h3 className="text-base font-bold text-white mb-2">অফিশিয়াল যোগাযোগ</h3>
            <div className="w-8 h-0.5 bg-[#90CAF9] mb-4 rounded-full" />
            <ul className="space-y-3 text-xs sm:text-sm text-[#E3F2FD]">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#90CAF9] shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition break-all">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#90CAF9] shrink-0" />
                <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="hover:text-white transition">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Globe2 className="w-4 h-4 text-[#90CAF9] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {siteConfig.presence.serviceArea} ({siteConfig.presence.modeOfOperation})
                </span>
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
        <p>© {currentYear} {siteConfig.identity.name.en} - সর্বস্বত্ব সংরক্ষিত।</p>
      </div>
    </footer>
  );
}
