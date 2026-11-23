import Link from "next/link";
import { HeartHandshake, CheckCircle2, PhoneCall, Copy } from "lucide-react";

export default function DonationPage() {
  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#D6EEFA]/40 text-[#0288D1] px-3 py-1 rounded-full text-xs font-bold">
          <HeartHandshake className="w-4 h-4" />
          <span>সাদাকাহ জারিয়াহ</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#064E73]">
          দ্বীনি শিক্ষা প্রসারে অংশীদার হোন
        </h1>
        <p className="text-sm text-[#4A606D] leading-relaxed">
          কুরআন কাননের শিক্ষা, দাওয়াহ ও সুবিধাবঞ্চিত শিক্ষার্থীদের বিনামূল্যে কুরআন শিক্ষা কার্যক্রমে সদকায়ে জারিয়ার অংশীদার হতে অনুদান দিন।
        </p>
      </div>

      {/* 3 Donation Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-[#E2EEF5] p-6 shadow-soft space-y-2">
          <h3 className="font-bold text-base text-[#064E73]">অসহায় শিক্ষার্থী বৃত্তি</h3>
          <p className="text-xs text-[#4A606D]">
            আর্থিকভাবে অসচ্ছল শিক্ষার্থীদের কোর্স ফি ও শিক্ষা উপকরণের ব্যবস্থা।
          </p>
        </div>
        <div className="bg-white rounded-xl border border-[#E2EEF5] p-6 shadow-soft space-y-2">
          <h3 className="font-bold text-base text-[#064E73]">ফ্রি ই-বুক প্রকাশনা</h3>
          <p className="text-xs text-[#4A606D]">
            সর্বসাধারণের জন্য কুরআন ও সুন্নাহর মৌলিক বই বিনামূল্যে বিতরণ।
          </p>
        </div>
        <div className="bg-white rounded-xl border border-[#E2EEF5] p-6 shadow-soft space-y-2">
          <h3 className="font-bold text-base text-[#064E73]">সার্ভার ও ডিজিটাল ক্লাস</h3>
          <p className="text-xs text-[#4A606D]">
            ডিজিটাল প্ল্যাটফর্মের লাইভ ক্লাস ও ক্লাউড স্টোরেজ পরিচালনা ব্যয়।
          </p>
        </div>
      </div>

      {/* Payment Channels Card */}
      <div className="bg-white rounded-2xl border border-[#E2EEF5] p-8 shadow-soft space-y-6">
        <h2 className="text-xl font-bold text-[#064E73] text-center">
          অনুদান পাঠানোর মাধ্যমসমূহ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* bKash / Nagad / Rocket */}
          <div className="p-5 rounded-xl bg-[#F5FAFD] border border-[#E2EEF5] space-y-3">
            <span className="text-xs font-bold text-pink-600 bg-pink-100 px-2.5 py-0.5 rounded-md inline-block">
              বিকাশ / নগদ (মার্চেন্ট ও পার্সোনাল)
            </span>
            <div className="text-2xl font-black text-[#064E73] tracking-wide">
              01767 911 188
            </div>
            <p className="text-xs text-[#4A606D]">
              অনুদান পাঠানোর পর রেফারেন্সে <span className="font-bold text-[#0288D1]">Sadaqah</span> লিখুন।
            </p>
          </div>

          {/* Bank Transfer */}
          <div className="p-5 rounded-xl bg-[#F5FAFD] border border-[#E2EEF5] space-y-2">
            <span className="text-xs font-bold text-[#0288D1] bg-[#D6EEFA] px-2.5 py-0.5 rounded-md inline-block">
              ব্যাংক একাউন্ট বিবরণী
            </span>
            <div className="text-xs space-y-1 text-[#064E73]">
              <p><span className="font-semibold text-gray-500">ব্যাংক:</span> ইসলামী ব্যাংক বাংলাদেশ লিমিটেড</p>
              <p><span className="font-semibold text-gray-500">হিসাবের নাম:</span> কুরআন কানন ইনস্টিটিউট</p>
              <p><span className="font-semibold text-gray-500">হিসাব নম্বর:</span> ২০৫০ ৩১৮০ ২০০০ ১১২৩৪</p>
              <p><span className="font-semibold text-gray-500">শাখা:</span> উত্তরা শাখা, ঢাকা</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-[#4A606D]">
            যেকোনো তথ্য জানতে বা অনুদানের রসিদ সংগ্রহ করতে যোগাযোগ করুন:{" "}
            <a href="tel:01767911188" className="font-bold text-[#0288D1] hover:underline">
              +880 1767 911 188
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
