import Link from "next/link";
import { HeartHandshake, CheckCircle2, PhoneCall } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function DonationPage() {
  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#E3F2FD] text-[#2196F3] border border-[#90CAF9]/60 px-3 py-1 rounded-full text-xs font-bold">
          <HeartHandshake className="w-4 h-4" />
          <span>সাদাকাহ জারিয়াহ</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0D47A1]">
          দ্বীনি শিক্ষা প্রসারে অংশীদার হোন
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          {siteConfig.identity.name.bn}-এর শিক্ষা, দাওয়াহ ও সুবিধাবঞ্চিত শিক্ষার্থীদের বিনামূল্যে কুরআন শিক্ষা কার্যক্রমে সদকায়ে জারিয়ার অংশীদার হতে অনুদান দিন।
        </p>
      </div>

      {/* 3 Donation Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-[#90CAF9]/60 p-6 shadow-soft space-y-2">
          <h3 className="font-bold text-base text-[#0D47A1]">অসহায় শিক্ষার্থী বৃত্তি</h3>
          <p className="text-xs text-slate-600">
            আর্থিকভাবে অসচ্ছল শিক্ষার্থীদের কোর্স ফি ও শিক্ষা উপকরণের ব্যবস্থা।
          </p>
        </div>
        <div className="bg-white rounded-xl border border-[#90CAF9]/60 p-6 shadow-soft space-y-2">
          <h3 className="font-bold text-base text-[#0D47A1]">ফ্রি ই-বুক প্রকাশনা</h3>
          <p className="text-xs text-slate-600">
            সর্বসাধারণের জন্য কুরআন ও সুন্নাহর মৌলিক বই বিনামূল্যে বিতরণ।
          </p>
        </div>
        <div className="bg-white rounded-xl border border-[#90CAF9]/60 p-6 shadow-soft space-y-2">
          <h3 className="font-bold text-base text-[#0D47A1]">সার্ভার ও ডিজিটাল ক্লাস</h3>
          <p className="text-xs text-slate-600">
            ডিজিটাল প্ল্যাটফর্মের লাইভ ক্লাস ও ক্লাউড স্টোরেজ পরিচালনা ব্যয়।
          </p>
        </div>
      </div>

      {/* Payment Channels Card */}
      <div className="bg-white rounded-2xl border border-[#90CAF9]/60 p-8 shadow-soft space-y-6">
        <h2 className="text-xl font-bold text-[#0D47A1] text-center">
          অনুদান পাঠানোর মাধ্যমসমূহ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#E3F2FD]/50 border border-[#90CAF9]/60 rounded-xl p-5 space-y-3">
            <span className="text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-2.5 py-1 rounded-md">
              মোবাইল ব্যাংকিং (ব্যক্তিগত / মার্চেন্ট)
            </span>
            <div className="space-y-1.5 pt-2 text-xs text-slate-700">
              <p><span className="font-bold text-[#0D47A1]">বিকাশ / নগদ (Personal):</span> {siteConfig.contact.phone}</p>
              <p><span className="font-bold text-[#0D47A1]">রেফারেন্স:</span> সাদাকাহ / অনুদান</p>
            </div>
          </div>

          <div className="bg-[#E3F2FD]/50 border border-[#90CAF9]/60 rounded-xl p-5 space-y-3">
            <span className="text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-2.5 py-1 rounded-md">
              যোগাযোগ ও সহায়তা
            </span>
            <div className="space-y-1.5 pt-2 text-xs text-slate-700">
              <p><span className="font-bold text-[#0D47A1]">হটলাইন:</span> {siteConfig.contact.phone}</p>
              <p><span className="font-bold text-[#0D47A1]">ইমেইল:</span> {siteConfig.contact.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
