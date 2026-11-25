import Link from "next/link";
import { Shield, Lock } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function PrivacyPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-[#E3F2FD] text-[#2196F3] border border-[#90CAF9]/60 px-3 py-1 rounded-full text-xs font-bold">
          <Shield className="w-4 h-4" />
          <span>ডেটা ও তথ্য সুরক্ষা পলিসি</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0D47A1]">
          গোপনীয়তা নীতি (Privacy Policy)
        </h1>
        <p className="text-xs text-slate-600">
          {siteConfig.identity.name.bn} আপনার তথ্যের সর্বোচ্চ নিরাপত্তা দিতে প্রতিশ্রুতিবদ্ধ
        </p>
      </div>

      {/* Structured Privacy Content */}
      <div className="bg-white rounded-2xl border border-[#90CAF9]/60 p-6 sm:p-8 shadow-soft space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0D47A1]">১. আমরা কী কী তথ্য সংগ্রহ করি</h2>
          <p>
            কোর্সে নিবন্ধন ও ভর্তির সময় আমরা আপনার নাম, ইমেইল ঠিকানা, মোবাইল নম্বর এবং অ্যাকাউন্টের ভূমিকা (শিক্ষার্থী বা শিক্ষক) সংগ্রহ করি। পেমেন্ট প্রক্রিয়াকরণে সরাসরি ব্যাংক বা বিকাশ গেটওয়ে ব্যবহার করা হয়; আমরা আপনার কোনো পিন বা কার্ডের পাসওয়ার্ড সংরক্ষণ করি না।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0D47A1]">২. সংগৃহীত তথ্যের ব্যবহার</h2>
          <p>
            আপনার সংগৃহীত তথ্য শুধুমাত্র ক্লাসের লিংক প্রেরণ, অগ্রগতি পর্যবেক্ষণ, কাস্টমার সার্ভিস ও সার্টিফিকেট তৈরির উদ্দেশ্যে ব্যবহার করা হয়।
          </p>
        </section>

        <section className="space-y-2 bg-[#E3F2FD]/50 p-4 rounded-xl border border-[#90CAF9]/50">
          <h2 className="text-base font-bold text-[#0D47A1]">৩. তৃতীয় পক্ষের কাছে তথ্য স্থানান্তর নিষিদ্ধ</h2>
          <p>
            আমরা কখনো আপনার ব্যক্তিগত তথ্য, ফোন নম্বর বা ইমেইল কোনো তৃতীয় পক্ষের বাণিজ্যিক বিজ্ঞাপনদাতা বা বহিরাগত সংস্থার কাছে বিক্রি বা হস্তান্তর করি না।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0D47A1]">৪. অডিও-ভিডিও ক্লাসের গোপনীয়তা</h2>
          <p>
            মহিলাদের বিশেষ ব্যাচ এবং সাধারণ ক্লাসের গোপনীয়তা শতভাগ সংরক্ষিত। শিক্ষকের অনুমতি ব্যতিরেকে কোনো ক্লাসের স্ক্রিনশট বা ভিডিও রেকর্ড অননুমোদিতভাবে বাইরে ছড়ানো সম্পূর্ণ নিষিদ্ধ।
          </p>
        </section>
      </div>
    </div>
  );
}
