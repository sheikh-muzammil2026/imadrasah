import Link from "next/link";
import { HeartHandshake, CheckCircle2, PhoneCall, Globe2 } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function DonationPage() {
  return (
    <div className="page-shell space-y-10">
      {/* Header */}
      <div className="page-header-block">
        <div className="section-pill mb-2">
          <HeartHandshake className="w-4 h-4" />
          <span>সাদাকাহ জারিয়াহ</span>
        </div>
        <h1 className="page-title-main">
          দ্বীনি শিক্ষা প্রসারে অংশীদার হোন
        </h1>
        <p className="page-subtitle-muted">
          {siteConfig.identity.name.shortBn}-এর বিশ্বব্যাপী কুরআন শিক্ষা ও সুবিধাবঞ্চিত শিক্ষার্থীদের কল্যাণে আপনার সাদাকাহ পৌঁছে দিন।
        </p>
      </div>

      {/* 3 Donation Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-white space-y-2">
          <h3 className="font-bold text-base text-[#0D47A1]">অসহায় শিক্ষার্থী বৃত্তি</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            আর্থিকভাবে অসচ্ছল শিক্ষার্থীদের সম্পূর্ণ বিনামূল্যে কুরআন শিক্ষা কোর্স ও শিক্ষা উপকরণের ব্যবস্থা।
          </p>
        </div>
        <div className="card-white space-y-2">
          <h3 className="font-bold text-base text-[#0D47A1]">ফ্রি ডিজিটাল ই-বুক প্রকাশনা</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            সর্বসাধারণের জন্য কুরআন ও সুন্নাহর বিশুদ্ধ মৌলিক বই বিনামূল্যে অনলাইন বিতরণ ও প্রচার।
          </p>
        </div>
        <div className="card-white space-y-2">
          <h3 className="font-bold text-base text-[#0D47A1]">সার্ভার ও ডিজিটাল ক্লাস</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            আন্তর্জাতিক ডিজিটাল প্ল্যাটফর্মের নিরবচ্ছিন্ন লাইভ ক্লাস, ব্রডকাস্টিং ও ক্লাউড স্টোরেজ পরিচালনা।
          </p>
        </div>
      </div>

      {/* Payment Channels Card */}
      <div className="card-white space-y-6">
        <h2 className="text-xl font-bold text-[#0D47A1] text-center">
          অনুদানের মাধ্যম ও ব্যাংক বিবরণী
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-ice space-y-3">
            <span className="text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-2.5 py-1 rounded-md">
              মোবাইল ব্যাংকিং (বিকাশ / নগদ)
            </span>
            <div className="space-y-1.5 pt-2 text-xs text-slate-700">
              <p><span className="font-bold text-[#0D47A1]">বিকাশ / নগদ (Personal):</span> {siteConfig.contact.phone}</p>
              <p><span className="font-bold text-[#0D47A1]">রেফারেন্স:</span> সাদাকাহ / অনুদান</p>
            </div>
          </div>

          <div className="card-ice space-y-3">
            <span className="text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-2.5 py-1 rounded-md">
              আন্তর্জাতিক সহায়তা ও ইমেইল যোগাযোগ
            </span>
            <div className="space-y-1.5 pt-2 text-xs text-slate-700">
              <p><span className="font-bold text-[#0D47A1]">অফিশিয়াল ইমেইল:</span> {siteConfig.contact.email}</p>
              <p><span className="font-bold text-[#0D47A1]">হোয়াটসঅ্যাপ:</span> {siteConfig.contact.whatsapp}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
