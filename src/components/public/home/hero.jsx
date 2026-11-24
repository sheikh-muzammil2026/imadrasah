"use client";

import Link from "next/link";
import { BookOpen, Clock, Users, User } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F7FBFE] to-[#F5FAFD] pt-10 pb-16 md:pt-16 md:pb-20">
      {/* Subtle Diagonal Diamond Lattice Background Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='%23D6EEFA' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header & CTAs */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Arabic Bismillah */}
          <p
            dir="rtl"
            className="font-arabic text-2xl sm:text-3xl text-[#0288D1] font-normal tracking-wide mb-3"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          {/* Dual-Tone Main Heading: Deep Navy -> Warm Gold/Olive */}
          <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold tracking-tight leading-tight">
            <span className="text-[#064E73]">কুরআন </span>
            <span className="bg-gradient-to-r from-[#8D7B2B] to-[#C89D28] bg-clip-text text-transparent">
              কানন
            </span>
          </h1>

          {/* Dual-Tone Subtitle */}
          <h2 className="mt-2 text-xl sm:text-2xl md:text-[26px] font-medium tracking-tight">
            <span className="text-[#064E73]">একটি আন্তর্জাতিক অনলাইন </span>
            <span className="bg-gradient-to-r from-[#8D7B2B] to-[#C89D28] bg-clip-text text-transparent">
              শিক্ষাপ্রতিষ্ঠান
            </span>
          </h2>

          {/* Description */}
          <p className="mt-5 text-sm sm:text-[15px] text-[#4A606D] max-w-2xl mx-auto leading-relaxed">
            আট বছর ধরে আমরা শিশু ও বয়স্কদের সহীহ কুরআন শিক্ষা দিয়ে আসছি। অনলাইন কোর্স,
            <br className="hidden sm:inline" /> লাইভ ক্লাস, ই-বুক ও প্রতিদিনের অগ্রগতি রিপোর্ট — সবই এক জায়গায়।
          </p>

          {/* Dual CTA Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/courses"
              className="bg-[#0288D1] hover:bg-[#0277BD] text-white font-semibold px-7 py-2.5 rounded-lg shadow-xs transition duration-150 text-sm sm:text-[15px]"
            >
              কোর্সে ভর্তি হোন
            </Link>

            <Link
              href="/about"
              className="bg-white hover:bg-[#F5FAFD] text-[#064E73] border border-[#0288D1]/60 font-semibold px-7 py-2.5 rounded-lg transition duration-150 text-sm sm:text-[15px]"
            >
              প্রতিষ্ঠান সম্পর্কে
            </Link>
          </div>
        </div>

        {/* Featured Promo Banner Card */}
        <div className="mt-12 max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-[#D6EEFA] bg-gradient-to-r from-[#D4EDFA] via-[#EBF6FC] to-[#CBE8F8] shadow-sm">
            {/* Decorative Subtle Islamic Lanterns (Top Right) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-10 hidden lg:flex items-start gap-5 opacity-35 text-[#0288D1]"
            >
              <div className="flex flex-col items-center">
                <div className="w-[1px] h-7 bg-[#0288D1]" />
                <div className="w-3.5 h-5 rounded-full border border-[#0288D1]" />
              </div>
              <div className="flex flex-col items-center">
                <div className="w-[1px] h-12 bg-[#0288D1]" />
                <div className="w-4 h-6 rounded-full border border-[#0288D1]" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 px-6 py-6 sm:px-8 sm:py-7">
              {/* Left Column: Instructor Photo Circle & Badge */}
              <div className="lg:col-span-3 flex justify-center">
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-b from-[#38BDF8] to-[#0288D1] p-1 shadow-md flex items-center justify-center overflow-hidden">
                  {/* Replace this placeholder block with your instructor <img src="/images/ustadh.png" ... /> */}
                  <div className="w-full h-full rounded-full bg-[#E0F2FE] flex flex-col items-center justify-center text-[#064E73]">
                    <User className="w-16 h-16 text-[#0288D1]" />
                    <span className="text-[11px] font-semibold mt-1">প্রধান প্রশিক্ষক</span>
                  </div>
                </div>
              </div>

              {/* Center Column: Schedule Info & Instructor Name */}
              <div className="lg:col-span-5 space-y-3 text-center lg:text-left">
                <ul className="space-y-1.5 text-xs sm:text-sm font-semibold text-[#064E73] inline-block text-left">
                  <li className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#B91C1C] shrink-0" />
                    <span>ক্লাস: সপ্তাহে ৩ দিন</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#0288D1] shrink-0" />
                    <span>সময়: সন্ধ্যা ৭:৩০ – ৯:০০</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#0288D1] shrink-0" />
                    <span>প্রতি ব্যাচে: সর্বোচ্চ ১২ জন</span>
                  </li>
                </ul>

                <div className="pt-1">
                  <span className="inline-block bg-[#0288D1] text-white text-[11px] font-semibold px-3 py-0.5 rounded-full">
                    প্রধান প্রশিক্ষক
                  </span>
                  <h3 className="mt-1.5 text-sm sm:text-base font-bold text-[#064E73]">
                    হাফেজ মাওলানা ক্বারী
                  </h3>
                  <p className="text-lg sm:text-xl font-extrabold text-[#B91C1C] leading-snug">
                    লোকমান আল মাহমুদ{" "}
                    <span className="text-xs font-semibold text-[#4A606D]">হাফিজাহুল্লাহ</span>
                  </p>
                </div>
              </div>

              {/* Right Column: Course Title Callout & Registration Phone */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right space-y-3">
                <div className="inline-flex flex-col items-center">
                  <span className="bg-[#B91C1C] text-white text-[11px] font-bold px-3 py-0.5 rounded-full">
                    মহিলাদের জন্য
                  </span>
                  <span className="mt-1 bg-[#F59E0B] text-white text-xs font-bold px-3 py-0.5 rounded-full shadow-2xs">
                    ২ মাসব্যাপী
                  </span>

                  <p className="mt-2 text-sm sm:text-base font-extrabold text-[#064E73]">
                    অনলাইন মাশকে
                  </p>
                  <h4 className="text-3xl sm:text-4xl font-black text-[#B91C1C] leading-none tracking-tight">
                    কুরআন
                  </h4>
                  <span className="mt-1 inline-block bg-[#15803D] text-white text-base sm:text-lg font-extrabold px-4 py-0.5 rounded-md">
                    প্রশিক্ষণ
                  </span>
                </div>

                <div className="pt-1">
                  <span className="block text-[11px] font-semibold text-[#064E73]">
                    রেজিস্ট্রেশন করুন
                  </span>
                  <a
                    href="tel:01767911188"
                    className="text-lg sm:text-xl font-extrabold text-[#0288D1] hover:text-[#0277BD] tracking-wide transition"
                  >
                    01767 911 188
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}