import Link from "next/link";
import {
  BookOpen,
  ShieldCheck,
  Briefcase,
  Quote,
  CheckCircle2,
  ChevronRight,
  Globe2,
  FileText,
  Lock,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export const metadata = {
  title: `প্রাতিষ্ঠানিক নীতিমালা ও আচরণবিধি - ${siteConfig.identity.name.bn}`,
  description: "Quran Kanan International Islamic Institute-এর ভর্তি নীতিমালা, শিক্ষার্থীদের আচরণবিধি এবং শিক্ষক নিয়োগ নীতিমালা।",
};

export default function PoliciesPage() {
  const { admissionPolicy, studentCodeOfConduct, teacherRecruitmentPolicy, identity } = siteConfig;

  return (
    <div className="page-shell-wide space-y-14">
      {/* Page Header */}
      <div className="page-header-block">
        <div className="section-pill mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2196F3]" />
          <span>প্রাতিষ্ঠানিক নীতিমালা ও আচরণবিধি</span>
        </div>
        <h1 className="page-title-main">
          {identity.name.shortBn} নীতিমালা ও আচরণবিধি
        </h1>
        <p className="page-subtitle-muted">
          স্বচ্ছ, জবাবদিহিমূলক ও সুশৃঙ্খল অনলাইন শিক্ষাব্যবস্থা পরিচালনায় আমাদের প্রাতিষ্ঠানিক নিয়মাবলি ও স্ট্যান্ডার্ড
        </p>

        {/* Quick Anchor Jump Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-5">
          <a
            href="#admission"
            className="px-4 py-2 bg-white hover:bg-[#E3F2FD] text-[#0D47A1] border border-[#90CAF9] rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 font-bornomala"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#2196F3]" />
            <span>ভর্তি নীতিমালা</span>
          </a>
          <a
            href="#conduct"
            className="px-4 py-2 bg-white hover:bg-[#E3F2FD] text-[#0D47A1] border border-[#90CAF9] rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 font-bornomala"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#2196F3]" />
            <span>শিক্ষার্থীদের আচরণবিধি</span>
          </a>
          <a
            href="#recruitment"
            className="px-4 py-2 bg-white hover:bg-[#E3F2FD] text-[#0D47A1] border border-[#90CAF9] rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 font-bornomala"
          >
            <Briefcase className="w-3.5 h-3.5 text-[#2196F3]" />
            <span>শিক্ষক নিয়োগনীতি</span>
          </a>
        </div>
      </div>

      {/* ===================================================================
          POLICY 1: Admission Policy (ভর্তি নীতিমালা)
          =================================================================== */}
      <section id="admission" className="policy-card space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#90CAF9]/40 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="policy-badge font-bornomala text-xs">
                <BookOpen className="w-3.5 h-3.5 text-[#2196F3]" />
                <span>{admissionPolicy.headingBn}</span>
              </span>
              <span className="text-xs font-bold text-[#0D47A1] font-bornomala bg-[#E3F2FD] px-2.5 py-0.5 rounded border border-[#90CAF9]/60">
                {admissionPolicy.badge}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#0D47A1] font-bornomala tracking-tight">
              {admissionPolicy.headingBn}
            </h2>
          </div>
          <span className="text-xs font-bold text-[#2196F3] bg-[#E3F2FD] px-3 py-1 rounded-full self-start sm:self-auto font-ubuntu-sans">
            ৮টি সুনির্দিষ্ট ধারা
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 font-bornomala leading-relaxed bg-[#E3F2FD]/30 p-4 rounded-xl border border-[#90CAF9]/40">
          {admissionPolicy.intro}
        </p>

        {/* 8 Policy Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {admissionPolicy.points.map((pt) => (
            <div key={pt.id} className="policy-item font-bornomala">
              <span className="policy-num-badge font-bornomala">
                {pt.numBn}
              </span>
              <span className="text-xs sm:text-sm text-slate-700 font-bornomala leading-relaxed flex-1">
                {pt.text}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-bornomala border-t border-[#90CAF9]/30">
          <span>ভর্তি সংক্রান্ত তথ্যের জন্য নিয়মিত কোর্স পেজ পর্যবেক্ষণ করুন।</span>
          <Link
            href="/courses"
            className="text-[#2196F3] hover:text-[#0D47A1] font-bold flex items-center gap-1 hover:underline"
          >
            <span>চলমান ৩টি মূল কোর্স দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ===================================================================
          POLICY 2: Student Code of Conduct (শিক্ষার্থীদের আচরণবিধি)
          =================================================================== */}
      <section id="conduct" className="policy-card space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#90CAF9]/40 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="policy-badge font-ubuntu-sans text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2196F3]" />
                <span>{studentCodeOfConduct.tag}</span>
              </span>
              <span className="text-xs font-bold text-[#0D47A1] font-bornomala bg-[#E3F2FD] px-2.5 py-0.5 rounded border border-[#90CAF9]/60">
                {studentCodeOfConduct.badge}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#0D47A1] font-bornomala tracking-tight">
              {studentCodeOfConduct.headingBn}
            </h2>
          </div>
          <span className="text-xs font-bold text-[#2196F3] bg-[#E3F2FD] px-3 py-1 rounded-full self-start sm:self-auto font-ubuntu-sans">
            ১০টি মৌলিক আচরণবিধি
          </span>
        </div>

        {/* Lead Quote */}
        <div className="policy-quote font-bornomala flex items-start gap-3">
          <Quote className="w-5 h-5 text-[#2196F3] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm font-medium text-[#0D47A1] leading-relaxed">
            {studentCodeOfConduct.intro}
          </p>
        </div>

        {/* 10 Conduct Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {studentCodeOfConduct.rules.map((rule) => (
            <div key={rule.id} className="policy-item font-bornomala">
              <span className="policy-num-badge font-bornomala">
                {rule.numBn}
              </span>
              <span className="text-xs sm:text-sm text-slate-700 font-bornomala leading-relaxed flex-1">
                {rule.text}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-bornomala border-t border-[#90CAF9]/30">
          <span>সকল শিক্ষার্থী ও অভিভাবকদের জন্য এই নীতিমালা প্রযোজ্য।</span>
          <Link
            href="/dashboard/student"
            className="text-[#2196F3] hover:text-[#0D47A1] font-bold flex items-center gap-1 hover:underline"
          >
            <span>শিক্ষার্থী পোর্টালে যান</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ===================================================================
          POLICY 3: Teacher Recruitment Policy (শিক্ষক নিয়োগনীতি)
          =================================================================== */}
      <section id="recruitment" className="policy-card space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#90CAF9]/40 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="policy-badge font-bornomala text-xs">
                <Briefcase className="w-3.5 h-3.5 text-[#2196F3]" />
                <span>{teacherRecruitmentPolicy.titleBn}</span>
              </span>
              <span className="text-xs font-bold text-[#0D47A1] font-bornomala bg-[#E3F2FD] px-2.5 py-0.5 rounded border border-[#90CAF9]/60">
                {teacherRecruitmentPolicy.badge}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#0D47A1] font-bornomala tracking-tight">
              {teacherRecruitmentPolicy.titleBn}
            </h2>
          </div>
          <span className="text-xs font-bold text-[#2196F3] bg-[#E3F2FD] px-3 py-1 rounded-full self-start sm:self-auto font-ubuntu-sans">
            ১০টি শিক্ষক মানদণ্ড
          </span>
        </div>

        <div className="policy-quote font-bornomala flex items-start gap-3">
          <Quote className="w-5 h-5 text-[#2196F3] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm font-medium text-[#0D47A1] leading-relaxed">
            {teacherRecruitmentPolicy.leadStatement}
          </p>
        </div>

        <p className="text-xs sm:text-sm font-bold text-[#0D47A1] font-bornomala">
          {teacherRecruitmentPolicy.leadIn}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {teacherRecruitmentPolicy.points.map((pt) => (
            <div key={pt.id} className="policy-item font-bornomala">
              <span className="policy-num-badge font-bornomala">
                {pt.numBn}
              </span>
              <span className="text-xs sm:text-sm text-slate-700 font-bornomala leading-relaxed flex-1">
                {pt.text}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-bornomala border-t border-[#90CAF9]/30">
          <span>আন্তর্জাতিক অনলাইন শিক্ষক হিসেবে যুক্ত হতে আবেদন করুন।</span>
          <Link
            href="/career"
            className="text-[#2196F3] hover:text-[#0D47A1] font-bold flex items-center gap-1 hover:underline"
          >
            <span>শিক্ষক নিয়োগ ফরমে যান</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Auxiliary Policy Links */}
      <div className="card-white flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-gradient-to-r from-[#E3F2FD]/60 via-white to-[#E3F2FD]/60 border border-[#90CAF9]/60">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-sm text-[#0D47A1] font-bornomala">
            অতিরিক্ত প্রাতিষ্ঠানিক শর্তাবলি ও ডেটা সুরক্ষা নীতি
          </h3>
          <p className="text-xs text-slate-600 font-bornomala">
            আমাদের ওয়েবসাইট ব্যবহারের শর্ত, ফি রিফান্ড নীতি এবং ব্যবহারকারীর গোপনীয়তা সুরক্ষা সংক্রান্ত বিস্তারিত দেখুন।
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 font-bornomala">
          <Link href="/terms" className="btn-outline text-xs py-2 px-3.5">
            ব্যবহারের শর্তাবলি (Terms)
          </Link>
          <Link href="/privacy" className="btn-outline text-xs py-2 px-3.5">
            গোপনীয়তা নীতি (Privacy)
          </Link>
        </div>
      </div>
    </div>
  );
}
