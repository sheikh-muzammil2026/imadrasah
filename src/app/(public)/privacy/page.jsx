import { Shield } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function PrivacyPage() {
  return (
    <div className="page-shell max-w-4xl space-y-8">
      {/* Header */}
      <div className="page-header-block">
        <div className="section-pill mb-2">
          <Shield className="w-4 h-4" />
          <span>ডেটা ও তথ্য সুরক্ষা নীতি</span>
        </div>
        <h1 className="page-title-main">
          গোপনীয়তা নীতি (Privacy Policy)
        </h1>
        <p className="page-subtitle-muted">
          {siteConfig.identity.name.bn} বিশ্বব্যাপী শিক্ষার্থীদের তথ্যের সর্বোচ্চ নিরাপত্তা বজায় রাখতে প্রতিশ্রুতিবদ্ধ
        </p>
      </div>

      {/* Structured Privacy Content */}
      <div className="card-white space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0D47A1]">১. সংগৃহীত তথ্য</h2>
          <p>
            কোর্সে ভর্তি আবেদন ও শিক্ষক নিবন্ধনের সময় আমরা আপনার নাম, ইমেইল ঠিকানা, হোয়াটসঅ্যাপ নম্বর, দেশ ও শিক্ষাগত যোগ্যতা সংক্রান্ত তথ্য সংগ্রহ করি। পেমেন্ট প্রক্রিয়াকরণে সুরক্ষিত আন্তর্জাতিক চ্যানেল ব্যবহৃত হয়; আমরা কোনো কার্ড পিন বা পাসওয়ার্ড সংরক্ষণ করি না।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0D47A1]">২. তথ্যের ব্যবহার</h2>
          <p>
            আপনার সংগৃহীত তথ্য শুধুমাত্র লাইভ ক্লাসের লিংক প্রেরণ, অগ্রগতি লগবুক সংরক্ষণ, কাস্টমার সার্ভিস ও প্রাতিষ্ঠানিক সনদপত্র তৈরির কাজে ব্যবহৃত হয়।
          </p>
        </section>

        <section className="space-y-2 card-ice">
          <h2 className="text-base font-bold text-[#0D47A1]">৩. তথ্যের পূর্ণ গোপনীয়তা</h2>
          <p>
            আমরা কখনো আপনার ব্যক্তিগত তথ্য, ফোন নম্বর বা ইমেইল কোনো তৃতীয় পক্ষের বাণিজ্যিক বিজ্ঞাপনদাতা বা বহিরাগত সংস্থার কাছে বিক্রি বা হস্তান্তর করি না।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0D47A1]">৪. অনলাইন ক্লাসের প্রাইভেসী ও পর্দা</h2>
          <p>
            নারী শিক্ষার্থীদের জন্য পরিচালিত বিশেষ ব্যাচ ও সাধারণ ক্লাসের গোপনীয়তা শতভাগ সংরক্ষিত। শিক্ষকের অনুমতি ব্যতিরেকে কোনো ক্লাসের স্ক্রিনশট বা ভিডিও রেকর্ড অননুমোদিতভাবে বাইরে ছড়ানো সম্পূর্ণ নিষিদ্ধ।
          </p>
        </section>
      </div>
    </div>
  );
}
