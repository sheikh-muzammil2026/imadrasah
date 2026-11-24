import Link from "next/link";
import { ShieldCheck, FileText, CheckCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-[#D6EEFA]/40 text-[#0288D1] px-3 py-1 rounded-full text-xs font-bold">
          <FileText className="w-4 h-4" />
          <span>ব্যবহারের শর্তাবলি ও নিয়মাবলি</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#064E73]">
          শর্তাবলি (Terms of Service)
        </h1>
        <p className="text-xs text-[#4A606D]">
          সর্বশেষ হালনাগাদ: জানুয়ারি ২০২৬
        </p>
      </div>

      {/* Structured Legal Content */}
      <div className="bg-white rounded-2xl border border-[#E2EEF5] p-6 sm:p-8 shadow-soft space-y-6 text-xs sm:text-sm text-[#4A606D] leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#064E73]">১. সাধারণ নিয়ম ও গ্রহণযোগ্যতা</h2>
          <p>
            কুরআন কানন ইনস্টিটিউট বাংলাদেশ-এর অনলাইন প্ল্যাটফর্ম, কোর্স, ই-বুক অথবা যেকোনো সেবা ব্যবহারের মাধ্যমে আপনি এই সকল শর্তাবলি মানতে অঙ্গীকারবদ্ধ। যদি আপনি এই শর্তাবলিতে সম্মত না হন, তবে অনুগ্রহ করে সেবা গ্রহণ থেকে বিরত থাকুন।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#064E73]">২. অনলাইন ক্লাস ও শিক্ষার্থীদের আচরণবিধি</h2>
          <p>
            কুরআন মজিদের শিক্ষা একটি অত্যন্ত পবিত্র ও দ্বীনি আমল। অনলাইন ক্লাসে প্রতিটি শিক্ষার্থীকে মার্জিত পোশাক, শান্ত পরিবেশ এবং শিক্ষকের প্রতি সর্বোচ্চ সম্মান বজায় রেখে অংশগ্রহণ করতে হবে। ক্লাসে কোনো প্রকার অশোভন আচরণ বা বিশৃঙ্খলা কঠোরভাবে নিষিদ্ধ।
          </p>
        </section>

        <section id="refund" className="space-y-2 bg-[#F5FAFD] p-4 rounded-xl border border-[#E2EEF5]">
          <h2 className="text-base font-bold text-[#064E73]">৩. কোর্স ফি ও রিফান্ড পলিসি (Refund Policy)</h2>
          <p>
            শিক্ষার্থী যদি কোর্স শুরুর প্রথম ৩ দিনের মধ্যে কোর্সটি চালিয়ে নিতে অক্ষম হন অথবা পাঠদানে সন্তুষ্ট না হন, তবে কোনো প্রশ্ন ছাড়াই তার প্রদানকৃত ফি সম্পূর্ণ ফেরত প্রদান করা হবে। ৩ দিন অতিক্রান্ত হওয়ার পর কোনো রিফান্ড প্রযোজ্য হবে না।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#064E73]">৪. মেধা ও কপিরাইট স্বত্বাধিকার</h2>
          <p>
            কুরআন কাননের সকল কোর্স ভিডিও, লেকচার নোট, অনুশীলন শিট এবং ই-বুক কপিরাইট দ্বারা সুরক্ষিত। কর্তৃপক্ষের লিখিত অনুমতি ছাড়া এগুলো রেকর্ড করা, বাণিজ্যিকভাবে বিক্রয় করা বা কোনো সোশ্যাল মিডিয়ায় শেয়ার করা আইনত দণ্ডনীয়।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#064E73]">৫. অ্যাকাউন্ট নিরাপত্তা</h2>
          <p>
            আপনার অ্যাকাউন্ট ও পাসওয়ার্ডের গোপনীয়তা বজায় রাখার দায়িত্ব আপনার। কোনো অ্যাকাউন্টের অপব্যবহার লক্ষ্য করা গেলে কর্তৃপক্ষ তাৎক্ষণিকভাবে অ্যাকাউন্ট স্থগিত করার অধিকার সংরক্ষণ করে।
          </p>
        </section>

        <div className="pt-4 border-t border-[#E2EEF5] text-xs text-gray-500">
          যেকোনো আইনি বা প্রশাসনিক প্রশ্নের জন্য ইমেইল করুন:{" "}
          <a href="mailto:info@qurankanon.com" className="text-[#0288D1] font-bold hover:underline">
            info@qurankanon.com
          </a>
        </div>
      </div>
    </div>
  );
}
