import Link from "next/link";
import { FileText } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function TermsPage() {
  return (
    <div className="page-shell max-w-4xl space-y-8">
      {/* Header */}
      <div className="page-header-block">
        <div className="section-pill mb-2">
          <FileText className="w-4 h-4" />
          <span>ব্যবহারের শর্তাবলি ও নিয়মাবলি</span>
        </div>
        <h1 className="page-title-main">
          শর্তাবলি ও রিফান্ড নীতি (Terms of Service)
        </h1>
        <p className="page-subtitle-muted">
          সর্বশেষ হালনাগাদ: ২০২৬
        </p>
      </div>

      {/* Structured Legal Content */}
      <div className="card-white space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0D47A1]">১. সাধারণ নিয়ম ও গ্রহণযোগ্যতা</h2>
          <p>
            {siteConfig.identity.name.bn}-এর অনলাইন ১-অন-১ ক্লাস, কোর্স সামগ্রী অথবা যেকোনো সেবা ব্যবহারের মাধ্যমে আপনি এই সকল প্রাতিষ্ঠানিক শর্তাবলি মেনে নিতে অঙ্গীকারবদ্ধ।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0D47A1]">২. অনলাইন ক্লাস ও শিক্ষার্থীদের আচরণবিধি</h2>
          <p>
            পবিত্র কুরআনের শিক্ষা একটি সম্মানিত দ্বীনি আমল। অনলাইন ক্লাসে প্রতিটি শিক্ষার্থীকে মার্জিত পরিবেশ এবং শিক্ষকের প্রতি শ্রদ্ধা বজায় রেখে যথাসময়ে ক্লাসে উপস্থিত থাকতে হবে।
          </p>
        </section>

        <section id="refund" className="space-y-2 card-ice">
          <h2 className="text-base font-bold text-[#0D47A1]">৩. কোর্স ফি ও রিফান্ড পলিসি (Refund Policy)</h2>
          <p>
            শিক্ষার্থী যদি কোর্স শুরুর প্রথম ৩ দিনের মধ্যে সন্তুষ্ট না হন, তবে কোনো প্রশ্ন ছাড়াই তার সম্পূর্ণ কোর্স ফি রিফান্ড করা হবে। ৩ দিন অতিক্রান্ত হওয়ার পর রিফান্ড প্রযোজ্য হবে না।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0D47A1]">৪. মেধা ও কপিরাইট স্বত্বাধিকার</h2>
          <p>
            {siteConfig.identity.name.shortBn}-এর কোর্স ম্যাটেরিয়াল, কারিকুলাম ও প্রকাশনা কপিরাইট দ্বারা সুরক্ষিত। কর্তৃপক্ষের লিখিত অনুমতি ব্যতিরেকে বাণিজ্যিক উদ্দেশ্যে এগুলোর পুনরুৎপাদন নিষিদ্ধ।
          </p>
        </section>
      </div>
    </div>
  );
}
