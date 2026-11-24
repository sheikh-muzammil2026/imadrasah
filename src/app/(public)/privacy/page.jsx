import Link from "next/link";
import { Shield, Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-[#D6EEFA]/40 text-[#0288D1] px-3 py-1 rounded-full text-xs font-bold">
          <Shield className="w-4 h-4" />
          <span>ডেটা ও তথ্য সুরক্ষা পলিসি</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#064E73]">
          গোপনীয়তা নীতি (Privacy Policy)
        </h1>
        <p className="text-xs text-[#4A606D]">
          কুরআন কানন ইনস্টিটিউট আপনার তথ্যের সর্বোচ্চ নিরাপত্তা দিতে প্রতিশ্রুতিবদ্ধ
        </p>
      </div>

      {/* Structured Privacy Content */}
      <div className="bg-white rounded-2xl border border-[#E2EEF5] p-6 sm:p-8 shadow-soft space-y-6 text-xs sm:text-sm text-[#4A606D] leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#064E73]">১. আমরা কী কী তথ্য সংগ্রহ করি</h2>
          <p>
            কোর্সে নিবন্ধন ও ভর্তির সময় আমরা আপনার নাম, ইমেইল ঠিকানা, মোবাইল নম্বর এবং অ্যাকাউন্টের ভূমিকা (শিক্ষার্থী বা শিক্ষক) সংগ্রহ করি। পেমেন্ট প্রক্রিয়াকরণে সরাসরি ব্যাংক বা বিকাশ গেটওয়ে ব্যবহার করা হয়; আমরা আপনার কোনো পিন বা কার্ডের পাসওয়ার্ড সংরক্ষণ করি না।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#064E73]">২. সংগৃহীত তথ্যের ব্যবহার</h2>
          <p>
            আপনার সংগৃহীত তথ্য শুধুমাত্র ক্লাসের লিংক প্রেরণ, অগ্রগতি পর্যবেক্ষণ, কাস্টমার সার্ভিস ও সার্টিফিকেট তৈরির উদ্দেশ্যে ব্যবহার করা হয়।
          </p>
        </section>

        <section className="space-y-2 bg-[#F5FAFD] p-4 rounded-xl border border-[#E2EEF5]">
          <h2 className="text-base font-bold text-[#064E73]">৩. তৃতীয় পক্ষের কাছে তথ্য স্থানান্তর নিষিদ্ধ</h2>
          <p>
            আমরা কখনো আপনার ব্যক্তিগত তথ্য, ফোন নম্বর বা ইমেইল কোনো তৃতীয় পক্ষের বাণিজ্যিক বিজ্ঞাপনদাতা বা বহিরাগত সংস্থার কাছে বিক্রি বা হস্তান্তর করি না।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#064E73]">৪. অডিও-ভিডিও ক্লাসের গোপনীয়তা</h2>
          <p>
            মহিলাদের বিশেষ ব্যাচ এবং সাধারণ ক্লাসের গোপনীয়তা শতভাগ সংরক্ষিত। শিক্ষকের অনুমতি ব্যতিরেকে কোনো ক্লাসের স্ক্রিনশট বা ভিডিও রেকর্ড অননুমোদিতভাবে বাইরে ছড়ানো সম্পূর্ণ নিষিদ্ধ।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#064E73]">৫. অ্যাকাউন্ট মুছে ফেলার অনুরোধ</h2>
          <p>
            আপনি চাইলে যেকোনো সময় আপনার অ্যাকাউন্ট ও যাবতীয় ব্যক্তিগত তথ্য মুছে ফেলার জন্য আমাদের সাপোর্ট সেন্টারে আবেদন জানাতে পারেন।
          </p>
        </section>

        <div className="pt-4 border-t border-[#E2EEF5] text-xs text-gray-500">
          তথ্য সুরক্ষা বিষয়ক যেকোনো তথ্যের জন্য যোগাযোগ করুন:{" "}
          <a href="mailto:info@qurankanon.com" className="text-[#0288D1] font-bold hover:underline">
            info@qurankanon.com
          </a>
        </div>
      </div>
    </div>
  );
}
