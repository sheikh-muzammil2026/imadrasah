import Link from "next/link";
import { ChevronRight, HeartHandshake } from "lucide-react";

export default function SadaqahBanner() {
  return (
    <section className="py-8 bg-[#F5FAFD]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-white to-[#EBF6FC] border border-[#D6EEFA] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft">
          {/* Left Text & CTA */}
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#064E73]">
              সাদাকাহ জারিয়াহ
            </h2>
            <p className="text-sm sm:text-base text-[#4A606D] max-w-xl leading-relaxed">
              কুরআন কাননের শিক্ষা, দাওয়াহ ও মানবসেবা কার্যক্রমে সদকায়ে জারিয়ার অংশীদার হতে অনুদান দিন ।
            </p>
            <div className="pt-2">
              <Link
                href="/donation"
                className="inline-flex items-center gap-1.5 bg-[#0288D1] hover:bg-[#0277BD] text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-xs transition duration-150"
              >
                <span>অনুদান দিন</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Vector Illustration */}
          <div className="shrink-0 flex items-center justify-center">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-[#D6EEFA]/40 border border-[#0288D1]/20 flex flex-col items-center justify-center text-[#0288D1] p-3 shadow-inner">
              <HeartHandshake className="w-12 h-12 text-[#0288D1] mb-1" />
              <span className="text-[11px] font-bold text-[#064E73] text-center leading-tight">
                সদকায়ে জারিয়াহ ফান্ড
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
