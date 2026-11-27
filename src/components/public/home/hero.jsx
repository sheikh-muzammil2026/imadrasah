"use client";

import Link from "next/link";
import { BookOpen, Clock, Users, User, ChevronRight, Award, Globe } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function HeroSection() {
  const chairman = siteConfig.identity.leadership.chairman;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F0F7FD] to-[#E3F2FD] pt-10 pb-16 md:pt-16 md:pb-20">
      {/* Subtle Diagonal Diamond Lattice Background Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 bg-lattice"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header & CTAs */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Arabic Bismillah */}
          <p
            dir="rtl"
            className="font-arabic text-2xl sm:text-3xl text-[#2196F3] font-normal tracking-wide mb-3"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          {/* Section Pill */}
          <div className="section-pill mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>{siteConfig.presence.serviceArea} • {siteConfig.presence.modeOfOperation}</span>
          </div>

          {/* Dual-Tone Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-[#0D47A1]">
            <span>{siteConfig.identity.name.shortBn}</span>
          </h1>

          {/* Subtitle / Tagline */}
          <h2 className="mt-2 text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#2196F3]">
            {siteConfig.identity.tagline.en} — {siteConfig.identity.secondaryTagline.bn}
          </h2>

          {/* Educational Philosophy */}
          <p className="mt-4 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {siteConfig.identity.tagline.bn}। শিশু-কিশোর ও বয়স্ক শিক্ষার্থীদের জন্য ১-অন-১ লাইভ ক্লাসে সহীহ কুরআন শিক্ষা ও হিফজ।
          </p>

          {/* Dual CTA Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/courses"
              className="btn-accent text-sm sm:text-[15px] px-7 py-3"
            >
              <span>চলমান ৩টি কোর্স দেখুন</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <Link
              href="/about"
              className="btn-outline text-sm sm:text-[15px] px-7 py-3"
            >
              পরিচিতি ও শিক্ষাদর্শ
            </Link>
          </div>
        </div>

        {/* Featured Leadership & Faculty Banner Card */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-[#90CAF9] bg-gradient-to-r from-white via-[#E3F2FD]/80 to-[#E3F2FD] shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 px-6 py-6 sm:px-8 sm:py-7">
              {/* Left Column: Chairman Avatar */}
              <div className="lg:col-span-3 flex justify-center">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-[#2196F3] to-[#0D47A1] p-1 shadow-md flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full rounded-full bg-[#E3F2FD] flex flex-col items-center justify-center text-[#0D47A1]">
                    <User className="w-12 h-12 text-[#2196F3]" />
                    <span className="text-[10px] font-bold mt-1 text-[#0D47A1]">{chairman.roleBn}</span>
                  </div>
                </div>
              </div>

              {/* Center Column: Chairman & Supervision Info */}
              <div className="lg:col-span-6 space-y-2 text-center lg:text-left">
                <div className="inline-block bg-[#2196F3] text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-2xs">
                  সার্বিক তত্ত্বাবধান ও দিকনির্দেশনা
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0D47A1]">
                  {chairman.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  {chairman.roleBn}, {siteConfig.identity.name.shortBn}
                </p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {siteConfig.identity.leadership.facultyOverview.bn}
                </p>
                <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-700">
                  <span className="flex items-center gap-1 font-semibold text-[#0D47A1]">
                    <Clock className="w-3.5 h-3.5 text-[#2196F3]" />
                    <span>ক্লাস দৈর্ঘ্য: ৪৫ মিনিট (১-অন-১)</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-[#0D47A1]">
                    <Award className="w-3.5 h-3.5 text-[#2196F3]" />
                    <span>আন্তর্জাতিক ভেরিফাইড সনদপত্র</span>
                  </span>
                </div>
              </div>

              {/* Right Column: CTA */}
              <div className="lg:col-span-3 flex justify-center lg:justify-end">
                <Link
                  href="/courses"
                  className="btn-primary py-3 px-5 text-xs sm:text-sm"
                >
                  <span>কোর্সে ভর্তি আবেদন</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
