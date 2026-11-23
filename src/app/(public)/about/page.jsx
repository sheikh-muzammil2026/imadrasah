import Link from "next/link";
import { BookOpen, CheckCircle, Shield, Award, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Hero Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#0288D1] bg-[#D6EEFA]/40 px-3 py-1 rounded-full">
          আমাদের পরিচিতি
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#064E73]">
          কুরআন কানন ইনস্টিটিউট বাংলাদেশ
        </h1>
        <p className="text-sm sm:text-base text-[#4A606D] leading-relaxed">
          আট বছর ধরে আমরা শিশু ও বয়স্কদের সহীহ কুরআন শিক্ষা দিয়ে আসছি। অনলাইন কোর্স, লাইভ ক্লাস, ই-বুক ও প্রতিদিনের অগ্রগতি রিপোর্ট — সবই এক জায়গায়।
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-[#E2EEF5] p-6 shadow-soft space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#0288D1]/10 text-[#0288D1] flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-[#064E73]">আমাদের লক্ষ্য (Vision)</h2>
          <p className="text-xs sm:text-sm text-[#4A606D] leading-relaxed">
            বিশ্বের প্রতিটি ঘরে ঘরে বিশুদ্ধ কুরআন তিলাওয়াতের সুর ছড়িয়ে দেওয়া। যাতে কোনো মুসলমান ভৌগোলিক দূরত্ব বা সময়ের অভাবে আল্লাহর কালাম শিক্ষা থেকে বঞ্চিত না হন।
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#E2EEF5] p-6 shadow-soft space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-[#064E73]">আমাদের উদ্দেশ্য (Mission)</h2>
          <p className="text-xs sm:text-sm text-[#4A606D] leading-relaxed">
            অভিজ্ঞ ও আন্তর্জাতিক সনদপ্রাপ্ত ক্বারীগণের তত্ত্বাবধানে সম্পূর্ণ অনলাইন প্ল্যাটফর্মে ব্যক্তিগত যত্ন ও নিয়মিত মূল্যায়নের মাধ্যমে মানসম্মত ইসলামি শিক্ষা নিশ্চিত করা।
          </p>
        </div>
      </div>

      {/* Founder Profile Message */}
      <div className="bg-white rounded-2xl border border-[#E2EEF5] p-8 shadow-soft flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 rounded-full bg-[#064E73] text-white flex flex-col items-center justify-center shrink-0 shadow-md border-4 border-[#D6EEFA]">
          <Users className="w-12 h-12 text-blue-200" />
          <span className="text-[10px] text-amber-300 font-bold mt-1">প্রতিষ্ঠাতা</span>
        </div>
        <div className="space-y-3 text-center md:text-left">
          <h3 className="text-2xl font-bold text-[#064E73]">
            হাফেজ মাওলানা ক্বারী লোকমান আল মাহমুদ
          </h3>
          <p className="text-xs font-semibold text-[#0288D1]">
            প্রতিষ্ঠাতা পরিচালক ও প্রধান প্রশিক্ষক, কুরআন কানন
          </p>
          <p className="text-xs sm:text-sm text-[#4A606D] leading-relaxed italic">
            "কুরআন শিক্ষা প্রতিটি মুসলমানের ওপর ফরজ। আধুনিক প্রযুক্তির সর্বোচ্চ সদ্ব্যবহার করে আমরা কুরআন শিক্ষাকে সহজ, আকর্ষণীয় ও সবার জন্য উন্মুক্ত করতে নিরলস কাজ করে যাচ্ছি। আল্লাহ তায়ালা আমাদের এই ক্ষুদ্র প্রয়াসকে কবুল করুন।"
          </p>
        </div>
      </div>

      {/* Policies & Transparency Section */}
      <div id="policies" className="bg-[#F5FAFD] border border-[#E2EEF5] rounded-xl p-8 space-y-6">
        <h3 className="text-xl font-bold text-[#064E73]">
          প্রাতিষ্ঠানিক নীতিমালা ও স্বচ্ছতা
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#4A606D]">
          <div className="space-y-2">
            <h4 className="font-bold text-[#064E73] text-sm">১. ক্লাসের নিয়মাবলি</h4>
            <p>সঠিক সময়ে লাইভ ক্লাসে উপস্থিতি আবশ্যক। অনুপস্থিত থাকলে ক্লাস রেকর্ডিং প্রদান করা হয়।</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-[#064E73] text-sm">২. রিফান্ড পলিসি</h4>
            <p>প্রথম ৩টি ক্লাসের মধ্যে সন্তুষ্ট না হলে কোনো প্রশ্ন ছাড়াই সম্পূর্ণ ফি রিফান্ড করা হয়।</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-[#064E73] text-sm">৩. হাদিয়া ও অনুদান স্বচ্ছতা</h4>
            <p>সকল সাদাকাহ ও উন্নয়ন তহবিলের আয়-ব্যয়ের হিসাব প্রতিমাসে দাতা সদস্যবৃন্দের মাঝে প্রকাশ করা হয়।</p>
          </div>
        </div>
      </div>
    </div>
  );
}
