"use client";

import Link from "next/link";
import { BookOpen, Clock, Users, User, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F0F7FD] to-[#E3F2FD] pt-10 pb-16 md:pt-16 md:pb-20">
      {/* Subtle Diagonal Diamond Lattice Background Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='%2390CAF9' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
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

          {/* Dual-Tone Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-[56px] font-extrabold tracking-tight leading-tight text-[#0D47A1]">
            <span>{siteConfig.identity.name.bn}</span>
          </h1>

          {/* Dual-Tone Subtitle */}
          <h2 className="mt-2 text-xl sm:text-2xl md:text-[26px] font-semibold tracking-tight text-[#2196F3]">
            {siteConfig.identity.tagline.bn}
          </h2>

          {/* Description */}
          <p className="mt-5 text-sm sm:text-[15px] text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {siteConfig.identity.description.bn}
          </p>

          {/* Dual CTA Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/courses"
              className="bg-[#2196F3] hover:bg-[#1976D2] text-white font-bold px-7 py-3 rounded-lg shadow-sm transition duration-150 text-sm sm:text-[15px] flex items-center gap-1.5"
            >
              <span>এখনই কোর্সে ভর্তি হোন</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <Link
              href="/about"
              className="bg-white hover:bg-[#E3F2FD] text-[#0D47A1] border-2 border-[#0D47A1] font-bold px-7 py-3 rounded-lg transition duration-150 text-sm sm:text-[15px]"
            >
              প্রতিষ্ঠান সম্পর্কে
            </Link>
          </div>
        </div>

        {/* Featured Promo Banner Card */}
        <div className="mt-12 max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-[#90CAF9] bg-gradient-to-r from-white via-[#E3F2FD]/80 to-[#E3F2FD] shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 px-6 py-6 sm:px-8 sm:py-7">
              {/* Left Column: Instructor Photo Circle */}
              <div className="lg:col-span-3 flex justify-center">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-b from-[#2196F3] to-[#0D47A1] p-1 shadow-md flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full rounded-full bg-[#E3F2FD] flex flex-col items-center justify-center text-[#0D47A1]">
                    <User className="w-14 h-14 text-[#2196F3]" />
                    <span className="text-[10px] font-bold mt-1 text-[#0D47A1]">প্রধান প্রশিক্ষক</span>
                  </div>
                </div>
              </div>

              {/* Center Column: Schedule Info & Instructor Name */}
              <div className="lg:col-span-6 space-y-2 text-center lg:text-left">
                <div className="inline-block bg-[#2196F3] text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-2xs">
                  বিশেষ লাইভ ব্যাচ
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0D47A1]">
                  {siteConfig.identity.founder.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  {siteConfig.identity.founder.role}, {siteConfig.identity.name.bn}
                </p>
                <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-700">
                  <span className="flex items-center gap-1 font-semibold text-[#0D47A1]">
                    <Clock className="w-3.5 h-3.5 text-[#2196F3]" />
                    <span>ক্লাস: রাত ৯:০০ - ১০:০০</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-[#0D47A1]">
                    <Users className="w-3.5 h-3.5 text-[#2196F3]" />
                    <span>সীমিত আসন</span>
                  </span>
                </div>
              </div>

              {/* Right Column: CTA */}
              <div className="lg:col-span-3 flex justify-center lg:justify-end">
                <Link
                  href="/courses"
                  className="bg-[#0D47A1] hover:bg-[#0a3880] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-lg shadow-xs transition duration-150 flex items-center gap-1.5"
                >
                  <span>কোর্স সমূহ দেখুন</span>
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
