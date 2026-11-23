"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5FAFD] text-[#4A606D] flex flex-col justify-center items-center px-6">
      <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-soft border border-[#E2EEF5]">
        <div className="w-16 h-16 rounded-full bg-[#0288D1]/10 text-[#0288D1] flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8" />
        </div>

        <h1 className="text-4xl font-extrabold text-[#064E73] mb-1">৪০৪</h1>
        <h2 className="text-lg font-bold text-[#064E73] mb-3">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!
        </h2>

        <p className="text-xs text-[#4A606D] leading-relaxed mb-6">
          দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা উপলব্ধ নেই।
        </p>

        <Link
          href="/"
          className="inline-block bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold px-6 py-2.5 rounded-lg text-xs shadow-xs transition"
        >
          প্রধান পাতায় ফিরে যান
        </Link>
      </div>
    </div>
  );
}
