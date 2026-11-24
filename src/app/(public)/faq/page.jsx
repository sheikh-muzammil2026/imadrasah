"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, BookOpen, GraduationCap, Users } from "lucide-react";

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "কুরআন কাননের অনলাইন ক্লাসে কীভাবে অংশ নিতে হয়?",
      a: "আমাদের সকল অনলাইন ক্লাস গুগল মিট (Google Meet) ও জুম (Zoom) প্ল্যাটফর্মের মাধ্যমে সরাসরি লাইভ পরিচালিত হয়। কোর্সে ভর্তি হওয়ার পর আপনার স্টুডেন্ট ড্যাশবোর্ডে স্বয়ংক্রিয়ভাবে ক্লাসের লিংক প্রদর্শিত হবে।",
      category: "ক্লাস পদ্ধতি",
    },
    {
      q: "আমি কোনো ক্লাস মিস করলে পরবর্তীতে রেকর্ডিং দেখতে পারব?",
      a: "হ্যাঁ, প্রতিটি লাইভ ক্লাসের অডিও-ভিডিও রেকর্ডিং শিক্ষার্থী ড্যাশবোর্ডে আপলোড করা হয়। আপনি যেকোনো সময় ক্লাসের রেকর্ডিং দেখে আপনার পাঠ সম্পন্ন করতে পারবেন।",
      category: "ক্লাস পদ্ধতি",
    },
    {
      q: "কোর্স ফি কীভাবে পরিশোধ করতে হবে?",
      a: "বিকাশ, নগদ, রকেট অথবা যেকোনো বাংলাদেশি ও আন্তর্জাতিক ব্যাংক কার্ড বা ট্রান্সফারের মাধ্যমে ঘরে বসেই অনলাইনের মাধ্যমে নিরাপদভাবে ফি পরিশোধ করা যায়।",
      category: "পেমেন্ট ও ভর্তি",
    },
    {
      q: "শিক্ষকদের যোগ্যতা ও তদারকি কীভাবে করা হয়?",
      a: "আমাদের সকল সম্মানিত শিক্ষক অভিজ্ঞ হাফেজ ও সনদপ্রাপ্ত ক্বারী। আন্তর্জাতিক মানের তাজবীদ ও উচ্চারণের নিয়মিত মূল্যায়ন এবং প্রধান প্রশিক্ষক হাফেজ মাওলানা লোকমান আল মাহমুদের প্রত্যক্ষ তত্ত্বাবধানে পরিচালিত হয়।",
      category: "শিক্ষক ও পাঠদান",
    },
    {
      q: "কোর্স সম্পন্ন করার পর কি সার্টিফিকেট প্রদান করা হয়?",
      a: "হ্যাঁ, কোর্সের নির্ধারিত উপস্থিতি ও সমাপনী মাশক পরীক্ষার ভিত্তিতে কুরআন কানন ইনস্টিটিউট বাংলাদেশ কর্তৃক ভেরিফাইড ডিজিটাল সার্টিফিকেট ও গ্রেডশিট প্রদান করা হয়।",
      category: "সার্টিফিকেট",
    },
    {
      q: "অসন্তুষ্ট হলে রিফান্ড পাওয়ার নিয়ম কী?",
      a: "ক্লাস শুরুর প্রথম ৩ দিনের মধ্যে আপনি যদি পাঠদানে সন্তুষ্ট না হন, কোনো প্রশ্ন ছাড়াই আপনার সম্পূর্ণ কোর্স ফি ফেরত দেওয়া হবে।",
      category: "পেমেন্ট ও ভর্তি",
    },
  ];

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#D6EEFA]/40 text-[#0288D1] px-3.5 py-1 rounded-full text-xs font-bold">
          <HelpCircle className="w-4 h-4" />
          <span>হেল্প সেন্টার ও সাধারণ জিজ্ঞাসা</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#064E73]">
          সচরাচর জিজ্ঞাসিত প্রশ্নাবলি (FAQ)
        </h1>
        <p className="text-xs sm:text-sm text-[#4A606D] max-w-xl mx-auto">
          কুরআন কাননের অনলাইন পাঠদান, ভর্তি ও নিয়মাবলি সম্পর্কিত আপনার যেকোনো প্রশ্নের উত্তর এখানে পাবেন।
        </p>
      </div>

      {/* Accordion FAQ Items */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#E2EEF5] overflow-hidden shadow-soft transition"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F5FAFD] transition"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#0288D1]/10 text-[#0288D1] text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-sm text-[#064E73]">
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#0288D1] shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#4A606D] leading-relaxed border-t border-[#E2EEF5]/60 bg-[#F5FAFD]/40">
                  <p>{faq.a}</p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-[#0288D1] bg-[#D6EEFA]/30 px-2 py-0.5 rounded">
                    ক্যাটাগরি: {faq.category}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still need help? */}
      <div className="bg-white rounded-2xl border border-[#E2EEF5] p-6 text-center space-y-3 shadow-soft">
        <h3 className="font-bold text-base text-[#064E73]">
          আপনার প্রয়োজনীয় উত্তরটি খুঁজে পাননি?
        </h3>
        <p className="text-xs text-[#4A606D]">
          আমাদের সাপোর্ট টিম সর্বদা আপনার সহযোগিতায় নিয়োজিত রয়েছে।
        </p>
        <div className="flex items-center justify-center gap-4 pt-1">
          <Link
            href="/contact"
            className="bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition"
          >
            যোগাযোগ পেজে যান
          </Link>
          <a
            href="tel:+8801767911188"
            className="border border-[#0288D1] text-[#064E73] hover:bg-[#F5FAFD] text-xs font-bold px-5 py-2.5 rounded-lg transition"
          >
            সরাসরি কল করুন
          </a>
        </div>
      </div>
    </div>
  );
}
