"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState(0);
  const faqs = siteConfig.faqs;

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#E3F2FD] text-[#2196F3] border border-[#90CAF9]/60 px-3.5 py-1 rounded-full text-xs font-bold shadow-xs">
          <HelpCircle className="w-4 h-4" />
          <span>হেল্প সেন্টার ও সাধারণ জিজ্ঞাসা</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0D47A1]">
          সচরাচর জিজ্ঞাসিত প্রশ্নাবলি (FAQ)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          {siteConfig.identity.name.bn}-এর অনলাইন পাঠদান, ভর্তি ও নিয়মাবলি সম্পর্কিত আপনার যেকোনো প্রশ্নের উত্তর এখানে পাবেন।
        </p>
      </div>

      {/* Accordion FAQ Items */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#90CAF9]/60 overflow-hidden shadow-soft transition duration-200"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#E3F2FD]/40 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#E3F2FD] text-[#2196F3] border border-[#90CAF9]/50 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-sm text-[#0D47A1]">
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#2196F3] shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-[#90CAF9]/40 bg-[#E3F2FD]/30">
                  <p>{faq.a}</p>
                  <span className="inline-block mt-3 text-[10px] font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9]/50 px-2.5 py-0.5 rounded-full">
                    ক্যাটাগরি: {faq.category}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still need help? */}
      <div className="bg-white rounded-2xl border border-[#90CAF9]/60 p-6 sm:p-8 text-center space-y-3 shadow-soft">
        <h3 className="font-bold text-base sm:text-lg text-[#0D47A1]">
          আপনার প্রয়োজনীয় উত্তরটি খুঁজে পাননি?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          আমাদের সাপোর্ট টিম সর্বদা আপনার সহযোগিতায় নিয়োজিত রয়েছে।
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/contact"
            className="bg-[#0D47A1] hover:bg-[#0a3880] text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-xs transition"
          >
            যোগাযোগ পেজে যান
          </Link>
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
            className="border border-[#0D47A1] text-[#0D47A1] hover:bg-[#E3F2FD] text-xs font-bold px-5 py-2.5 rounded-lg transition"
          >
            সরাসরি কল করুন
          </a>
        </div>
      </div>
    </div>
  );
}
