import Link from "next/link";
import { Users, Globe2, Award, BookOpen, Shield, HeartHandshake, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import AboutSection from "@/components/public/about/AboutSection";

export const metadata = {
  title: `পরিচিতি ও শিক্ষাদর্শ - ${siteConfig.identity.name.bn}`,
  description: siteConfig.identity.description.bn,
};

export default function AboutPage() {
  const chairman = siteConfig.identity.leadership.chairman;

  return (
    <div className="page-shell space-y-16">
      {/* Page Header Block */}
      <div className="page-header-block">
        <div className="section-pill mb-3">
          প্রতিষ্ঠানের পরিচিতি ও শিক্ষাদর্শ
        </div>
        <h1 className="page-title-main">
          {siteConfig.identity.name.bn}
        </h1>
        <p className="page-subtitle-muted">
          {siteConfig.identity.tagline.en} • {siteConfig.identity.tagline.bn}
        </p>
      </div>

      {/* Primary Scholarly Institutional Profile Specification (Sections 01, 02, 03, 04, 06, 09) */}
      <AboutSection />

      {/* Leadership Profile: Chairman Shaykh Tariq Jamil */}
      <div className="section-card bg-white border border-[#90CAF9]/60 shadow-soft flex flex-col md:flex-row items-center gap-8 p-6 sm:p-8">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#0D47A1] text-white flex flex-col items-center justify-center shrink-0 shadow-md border-4 border-[#90CAF9]">
          <Users className="w-12 h-12 text-[#90CAF9]" />
          <span className="text-[10px] text-white font-bold mt-1 font-bornomala">{chairman.roleBn}</span>
        </div>
        <div className="space-y-2 text-center md:text-left flex-1">
          <div className="inline-block bg-[#E3F2FD] text-[#0D47A1] border border-[#90CAF9]/60 px-2.5 py-0.5 rounded text-xs font-bold font-bornomala">
            সার্বিক দিকনির্দেশনা ও তত্ত্বাবধান
          </div>
          <h3 className="text-2xl font-bold text-[#0D47A1] font-bornomala">
            {chairman.name}
          </h3>
          <p className="text-xs font-bold text-[#2196F3] font-ubuntu-sans">
            {chairman.roleBn} ({chairman.roleEn}), {siteConfig.identity.name.shortBn}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic font-bornomala">
            "{chairman.bioBn} কুরআন ও সুন্নাহর বিশুদ্ধ জ্ঞান প্রতিটি মুসলিম পরিবারে পৌঁছে দিয়ে আলোকিত প্রজন্ম গড়ে তোলাই আমাদের প্রধান অঙ্গীকার।"
          </p>
        </div>
      </div>

      {/* 6 Academic Departments (Doc Section 07) */}
      <div className="space-y-5">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="font-ubuntu-sans text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-3 py-1 rounded-full inline-block">
            07. Academic Departments
          </span>
          <h2 className="text-2xl font-extrabold text-[#0D47A1] font-bornomala">
            শিক্ষা বিভাগসমূহ
          </h2>
          <p className="text-xs text-slate-600 font-bornomala">
            Quran Kanan-এ ইসলামিক জ্ঞানের বিভিন্ন শাখায় সুশৃঙ্খল শিক্ষাব্যবস্থা পরিচালিত হয়
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteConfig.departments.map((dept, idx) => (
            <div key={dept.id} className="section-card p-5 space-y-3 bg-white border border-[#90CAF9]/50 shadow-soft hover:border-[#2196F3] transition-all">
              <span className="text-xs font-bold text-[#2196F3] bg-[#E3F2FD] px-2.5 py-0.5 rounded font-bornomala inline-block">
                বিভাগ ০{idx + 1}
              </span>
              <h3 className="font-bold text-sm text-[#0D47A1] font-bornomala">
                {dept.nameBn}
              </h3>
              <ul className="space-y-1.5 pt-1 text-xs text-slate-600 font-bornomala">
                {dept.topics.map((t, tidx) => (
                  <li key={tidx} className="flex items-center gap-1.5">
                    <span className="text-[#2196F3]">›</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 7 Educational Programs (Doc Section 08) */}
      <div className="space-y-5">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="font-ubuntu-sans text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-3 py-1 rounded-full inline-block">
            08. Educational Programs
          </span>
          <h2 className="text-2xl font-extrabold text-[#0D47A1] font-bornomala">
            শিক্ষা কার্যক্রম
          </h2>
          <p className="text-xs text-slate-600 font-bornomala">
            শিক্ষার্থীদের বয়স, যোগ্যতা ও প্রয়োজন অনুযায়ী বিভিন্ন স্তরে পরিচালিত প্রোগ্রাম
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {siteConfig.programs.map((prog, idx) => (
            <div key={prog.id} className="p-4 rounded-xl bg-white border border-[#90CAF9]/50 shadow-2xs flex items-start gap-3 hover:border-[#2196F3] transition-all">
              <span className="w-6 h-6 rounded-full bg-[#0D47A1] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-ubuntu-sans">
                {idx + 1}
              </span>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-[#0D47A1] font-bornomala">{prog.titleBn}</h4>
                <p className="text-xs text-slate-600 font-bornomala">{prog.descBn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8 Core Values Grid (Doc Section 05) */}
      <div className="section-card p-6 sm:p-8 bg-white border border-[#90CAF9]/60 shadow-soft space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="font-ubuntu-sans text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-3 py-1 rounded-full inline-block">
            05. Core Values
          </span>
          <h3 className="text-xl font-bold text-[#0D47A1] font-bornomala">আমাদের মূলনীতি ও আদর্শ</h3>
          <p className="text-xs text-slate-600 font-bornomala">প্রতিষ্ঠানের প্রতিটি কার্যক্রম যে মৌলিক ভিত্তির ওপর প্রতিষ্ঠিত</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bornomala">
          {siteConfig.coreValues.map((val) => (
            <div key={val.title} className="p-3.5 bg-[#E3F2FD]/40 rounded-xl border border-[#90CAF9]/40 space-y-1 hover:border-[#2196F3] transition-all">
              <span className="font-bold text-[#0D47A1] block font-ubuntu-sans">{val.title} ({val.bn})</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Institutional Presence Statement (Strict Doc requirement) */}
      <div className="section-card border-2 border-[#90CAF9] text-center space-y-3 p-6 sm:p-8 bg-gradient-to-b from-[#E3F2FD]/50 to-white shadow-soft">
        <Globe2 className="w-8 h-8 text-[#2196F3] mx-auto" />
        <h3 className="text-lg font-bold text-[#0D47A1] font-bornomala">
          {siteConfig.presence.titleBn}
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed font-bornomala">
          {siteConfig.presence.summaryBn}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-bornomala">
          <Link href="/courses" className="btn-primary">
            চলমান কোর্সে ভর্তি আবেদন
          </Link>
          <Link href="/contact" className="btn-outline">
            অফিশিয়াল যোগাযোগ
          </Link>
        </div>
      </div>
    </div>
  );
}
