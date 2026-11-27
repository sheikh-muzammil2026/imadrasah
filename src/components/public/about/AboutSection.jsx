"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  Compass,
  UserCheck,
  Heart,
  Users,
  CheckCircle2,
  Globe2,
  Award,
  Shield,
  Target,
  GraduationCap,
  Video,
  PlayCircle,
  FileText,
  MessageSquare,
  ClipboardList,
  TrendingUp,
  Layers,
  Languages,
  Quote,
  ArrowRight,
  ChevronRight,
  Eye,
  Rocket,
  Building2,
  Library,
} from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

// Icon mapping helper for educational philosophy pillars
const philosophyIcons = {
  BookOpen: BookOpen,
  Sparkles: Sparkles,
  Compass: Compass,
  UserCheck: UserCheck,
  Heart: Heart,
  Users: Users,
};

// Methodology icons mapping
const methodologyIcons = [
  Video,         // 01: 1-on-1 live session
  PlayCircle,    // 02: Recorded lecture archive
  FileText,      // 03: Specific syllabus
  MessageSquare, // 04: Q&A and open discussion
  Users,         // 05: Individual & group sessions
  ClipboardList, // 06: Regular practice & assignment
  Award,         // 07: Continuous assessment
  TrendingUp,    // 08: Progress tracking & feedback
  Layers,        // 09: Age-appropriate teaching strategy
  Languages,     // 10: Trilingual learning materials
];

// Bengali numeral conversion helper
const toBengaliNumber = (num) => {
  const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((d) => digits[parseInt(d, 10)] ?? d)
    .join("");
};

export default function AboutSection({ isFullPage = true }) {
  const [visionMissionTab, setVisionMissionTab] = useState("all"); // 'all' | 'vision' | 'mission'
  const [homeTab, setHomeTab] = useState("philosophy"); // 'philosophy' | 'vision' | 'roadmap'

  const { aboutPage, identity, departments, programs, coreValues, presence } = siteConfig;
  const { hero, vision, mission, objectives, philosophy, methodology, futureDevelopmentPlan } = aboutPage;
  const chairman = identity.leadership.chairman;

  // =========================================================================
  // VIEW MODE A: COMPACT HOME PAGE OVERVIEW (isFullPage === false)
  // Unified single source of truth used directly on the landing page
  // =========================================================================
  if (!isFullPage) {
    return (
      <section className="py-16 bg-[#E3F2FD] border-t border-[#90CAF9]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="section-pill inline-flex items-center gap-1.5 font-bornomala">
              <Globe2 className="w-3.5 h-3.5 text-[#2196F3]" />
              <span>আমাদের পরিচিতি ও শিক্ষাদর্শ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D47A1] font-bornomala tracking-tight">
              {identity.name.shortBn}—জ্ঞান, বিশ্বাস ও উত্তম চরিত্র গঠনের শিক্ষাঙ্গন
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-bornomala leading-relaxed">
              {hero.subheading}
            </p>
          </div>

          {/* Interactive Navigation Pills */}
          <div className="flex items-center justify-center">
            <div className="inline-flex p-1 bg-white border border-[#90CAF9]/60 rounded-xl shadow-xs">
              <button
                type="button"
                onClick={() => setHomeTab("philosophy")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all font-bornomala cursor-pointer ${
                  homeTab === "philosophy"
                    ? "bg-[#0D47A1] text-white shadow-xs"
                    : "text-[#0D47A1] hover:bg-[#E3F2FD]"
                }`}
              >
                শিক্ষাদর্শ ও মূলনীতি
              </button>
              <button
                type="button"
                onClick={() => setHomeTab("vision")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all font-bornomala cursor-pointer ${
                  homeTab === "vision"
                    ? "bg-[#0D47A1] text-white shadow-xs"
                    : "text-[#0D47A1] hover:bg-[#E3F2FD]"
                }`}
              >
                আমাদের স্বপ্ন ও লক্ষ্য
              </button>
              <button
                type="button"
                onClick={() => setHomeTab("roadmap")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all font-bornomala cursor-pointer ${
                  homeTab === "roadmap"
                    ? "bg-[#0D47A1] text-white shadow-xs"
                    : "text-[#0D47A1] hover:bg-[#E3F2FD]"
                }`}
              >
                ভবিষ্যৎ উন্নয়ন পরিকল্পনা
              </button>
            </div>
          </div>

          {/* Tab 1: Philosophy & Core Values */}
          {homeTab === "philosophy" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {philosophy.pillars.map((pillar) => {
                  const IconComp = philosophyIcons[pillar.icon] || BookOpen;
                  return (
                    <div
                      key={pillar.id}
                      className="bento-card space-y-3 bg-white border border-[#90CAF9]/50 shadow-soft"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E3F2FD] to-[#BBDEFB] text-[#0D47A1] flex items-center justify-center shadow-2xs">
                          <IconComp className="w-5 h-5 text-[#2196F3]" />
                        </div>
                        <span className="text-[11px] font-bold text-[#90CAF9] font-ubuntu-sans">
                          0{pillar.id}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-[#0D47A1] font-bornomala">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-slate-600 font-bornomala leading-relaxed">
                        {pillar.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Core Values 4-Grid Preview */}
              <div className="p-6 bg-white border border-[#90CAF9]/60 rounded-2xl shadow-soft space-y-3">
                <span className="text-xs font-bold text-[#0D47A1] font-bornomala block">
                  আমাদের মৌলিক মূলনীতি ও আদর্শ:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-bornomala">
                  {coreValues.slice(0, 4).map((val) => (
                    <div
                      key={val.title}
                      className="p-3 bg-[#E3F2FD]/40 rounded-xl border border-[#90CAF9]/40 space-y-1"
                    >
                      <span className="font-bold text-[#0D47A1] block font-bornomala">
                        {val.bn}
                      </span>
                      <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">
                        {val.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Vision & Mission */}
          {homeTab === "vision" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-200">
              {/* Vision Card */}
              <div className="section-card space-y-4 bg-white border border-[#90CAF9]/60 shadow-soft">
                <div className="flex items-center justify-between border-b border-[#90CAF9]/40 pb-3">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-[#0D47A1] font-bornomala">আমাদের স্বপ্ন</h3>
                  </div>
                  <Eye className="w-5 h-5 text-[#2196F3]" />
                </div>
                <p className="text-xs text-slate-700 font-bornomala leading-relaxed bg-[#E3F2FD]/30 p-3 rounded-lg">
                  {vision.subtitle}
                </p>
                <div className="space-y-2">
                  {vision.items.slice(0, 4).map((item) => (
                    <div key={item.id} className="p-2.5 bg-white border border-[#90CAF9]/40 rounded-lg text-xs flex items-start gap-2 font-bornomala">
                      <span className="w-5 h-5 rounded-full bg-[#E3F2FD] text-[#0D47A1] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {toBengaliNumber(item.id)}
                      </span>
                      <span className="text-slate-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mission Card */}
              <div className="section-card space-y-4 bg-white border border-[#90CAF9]/60 shadow-soft">
                <div className="flex items-center justify-between border-b border-[#90CAF9]/40 pb-3">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-[#0D47A1] font-bornomala">আমাদের লক্ষ্য</h3>
                  </div>
                  <Target className="w-5 h-5 text-[#2196F3]" />
                </div>
                <p className="text-xs text-slate-700 font-bornomala leading-relaxed bg-[#E3F2FD]/30 p-3 rounded-lg">
                  {mission.subtitle}
                </p>
                <div className="space-y-2">
                  {mission.items.slice(0, 4).map((item) => (
                    <div key={item.id} className="p-2.5 bg-white border border-[#90CAF9]/40 rounded-lg text-xs flex items-start gap-2 font-bornomala">
                      <span className="w-5 h-5 rounded-full bg-[#E3F2FD] text-[#0D47A1] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {toBengaliNumber(item.id)}
                      </span>
                      <span className="text-slate-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Future Development Plan Preview */}
          {homeTab === "roadmap" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="section-card space-y-4 bg-white border border-[#90CAF9]/60 shadow-soft">
                <div className="flex items-center justify-between border-b border-[#90CAF9]/40 pb-3">
                  <div className="space-y-0.5">
                    <span className="font-ubuntu-sans text-xs font-bold text-[#2196F3] bg-[#E3F2FD] px-2 py-0.5 rounded">
                      {futureDevelopmentPlan.tag}
                    </span>
                    <h3 className="text-xl font-bold text-[#0D47A1] font-bornomala">
                      {futureDevelopmentPlan.titleBn}
                    </h3>
                  </div>
                  <Rocket className="w-6 h-6 text-[#2196F3]" />
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-bornomala leading-relaxed">
                  {futureDevelopmentPlan.intro}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  {futureDevelopmentPlan.initiatives.slice(0, 6).map((item) => (
                    <div key={item.id} className="roadmap-card font-bornomala">
                      <span className="roadmap-badge font-bornomala">
                        {item.numBn}
                      </span>
                      <span className="text-xs text-slate-700 leading-relaxed font-bornomala flex-1">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Unified Section Footer CTA Banner */}
          <div className="pledge-banner flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-xs font-bold text-[#90CAF9] font-bornomala block">
                প্রাতিষ্ঠানিক পরিচিতি ও শিক্ষাদর্শ
              </span>
              <p className="text-sm sm:text-base font-bold text-white font-bornomala max-w-2xl leading-relaxed">
                {futureDevelopmentPlan.closingPledge}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/about"
                className="px-5 py-2.5 bg-white text-[#0D47A1] hover:bg-[#E3F2FD] font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5 font-bornomala"
              >
                <span>সম্পূর্ণ পরিচিতি ও শিক্ষাদর্শ পড়ুন</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // VIEW MODE B: FULL SCHOLARLY INSTITUTIONAL PROFILE (isFullPage === true)
  // Rendered on /about route covering all 14 institutional sections
  // =========================================================================
  return (
    <div className="page-shell space-y-16">
      {/* Page Header Block */}
      <div className="page-header-block">
        <div className="section-pill mb-3">
          প্রতিষ্ঠানের পরিচিতি ও শিক্ষাদর্শ
        </div>
        <h1 className="page-title-main">
          {identity.name.bn}
        </h1>
        <p className="page-subtitle-muted">
          {identity.tagline.en} • {identity.tagline.bn}
        </p>
      </div>

      {/* ===================================================================
          SECTION 01: Institutional Introduction & Hero
          =================================================================== */}
      <section className="relative overflow-hidden section-card p-6 sm:p-10 lg:p-12 bg-white border border-[#90CAF9]/60 shadow-soft">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#E3F2FD] to-[#BBDEFB]/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-gradient-to-tr from-[#E3F2FD] to-[#90CAF9]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bornomala text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2196F3] animate-pulse" />
                <span>{hero.titleBn}</span>
              </span>
            </div>

            <div className="gradient-badge font-ubuntu-sans text-xs shadow-sm">
              <Globe2 className="w-3.5 h-3.5 text-[#2196F3]" />
              <span>{hero.badge}</span>
            </div>
          </div>

          <div className="space-y-3 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D47A1] tracking-tight font-ubuntu-sans">
              {hero.academyName}
            </h1>
            <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed font-bornomala">
              {hero.subheading}
            </p>
          </div>

          <div className="quote-callout flex items-start gap-3 sm:gap-4 border-l-4 border-[#0D47A1] shadow-sm">
            <Quote className="w-6 h-6 text-[#2196F3] shrink-0 mt-0.5" />
            <blockquote className="text-sm sm:text-base font-semibold text-[#0D47A1] leading-relaxed font-bornomala">
              "{hero.quote}"
            </blockquote>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-bornomala">
            {hero.paragraphs.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#E3F2FD]/30 border border-[#90CAF9]/30 flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-[#2196F3]/15 text-[#0D47A1] font-ubuntu-sans font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p>{p}</p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-[#90CAF9]/40 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0D47A1]">
                <Languages className="w-4 h-4 text-[#2196F3]" />
                <span className="font-bornomala">শিক্ষাদানের ৩টি আন্তর্জাতিক ভাষা:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {hero.languages.map((lang) => (
                  <div
                    key={lang.code}
                    className="p-3 bg-white border border-[#90CAF9]/50 rounded-lg shadow-2xs hover:border-[#2196F3] transition-colors"
                  >
                    <span className="text-xs font-bold text-[#0D47A1] block font-ubuntu-sans">
                      {lang.label}
                    </span>
                    <span className="text-[11px] text-slate-600 font-bornomala block mt-0.5">
                      {lang.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0D47A1]">
                <Target className="w-4 h-4 text-[#2196F3]" />
                <span className="font-bornomala">যাদের জন্য আমাদের শিক্ষাকার্যক্রম:</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {hero.targetGroups.map((group, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-white border border-[#90CAF9]/50 rounded-lg text-center shadow-2xs hover:border-[#2196F3] transition-colors"
                  >
                    <span className="text-xs font-bold text-[#0D47A1] block font-bornomala">
                      {group.title}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bornomala block mt-0.5 line-clamp-1">
                      {group.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 02 & 03: Vision & Mission Showcase (Interactive Tabs)
          =================================================================== */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bornomala text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-3 py-1 rounded-full">
                আমাদের স্বপ্ন ও লক্ষ্য
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#0D47A1] mt-2 font-bornomala">
              আদর্শ ও সুসংগঠিত দ্বীনি ভবিষ্যৎ গঠনের প্রত্যয়
            </h2>
          </div>

          <div className="inline-flex p-1 bg-[#E3F2FD] border border-[#90CAF9]/60 rounded-xl shadow-2xs self-start sm:self-auto">
            <button
              onClick={() => setVisionMissionTab("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                visionMissionTab === "all"
                  ? "bg-[#0D47A1] text-white shadow-xs"
                  : "text-[#0D47A1] hover:bg-white/60"
              }`}
            >
              উভয়টি একনজরে
            </button>
            <button
              onClick={() => setVisionMissionTab("vision")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                visionMissionTab === "vision"
                  ? "bg-[#0D47A1] text-white shadow-xs"
                  : "text-[#0D47A1] hover:bg-white/60"
              }`}
            >
              <span>{vision.titleBn}</span>
              <span className="text-[10px] opacity-80 font-ubuntu-sans">({vision.items.length})</span>
            </button>
            <button
              onClick={() => setVisionMissionTab("mission")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                visionMissionTab === "mission"
                  ? "bg-[#0D47A1] text-white shadow-xs"
                  : "text-[#0D47A1] hover:bg-white/60"
              }`}
            >
              <span>{mission.titleBn}</span>
              <span className="text-[10px] opacity-80 font-ubuntu-sans">({mission.items.length})</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Vision Card */}
          {(visionMissionTab === "all" || visionMissionTab === "vision") && (
            <div
              className={`section-card space-y-5 bg-white border border-[#90CAF9]/60 shadow-soft transition-all duration-300 ${
                visionMissionTab === "vision" ? "lg:col-span-2" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3 border-b border-[#90CAF9]/40 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bornomala text-xs font-bold text-[#2196F3] bg-[#E3F2FD] px-2.5 py-0.5 rounded-md">
                      {vision.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0D47A1] font-bornomala">
                    {vision.titleBn}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#E3F2FD] text-[#0D47A1] flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5 text-[#2196F3]" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-bornomala bg-[#E3F2FD]/30 p-3.5 rounded-lg border border-[#90CAF9]/30">
                {vision.subtitle}
              </p>

              <div className="space-y-3">
                <span className="text-xs font-bold text-[#0D47A1] font-bornomala block">
                  {vision.leadIn}
                </span>

                <div
                  className={`grid gap-2.5 ${
                    visionMissionTab === "vision" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {vision.items.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-lg border transition-all text-xs leading-relaxed font-bornomala ${
                        item.isSpecial
                          ? "bg-gradient-to-r from-[#E3F2FD] to-white border-[#2196F3] shadow-xs"
                          : "bg-white border-[#90CAF9]/40 hover:border-[#2196F3]"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span
                          className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-bornomala ${
                            item.isSpecial
                              ? "bg-[#0D47A1] text-white"
                              : "bg-[#E3F2FD] text-[#0D47A1] border border-[#90CAF9]"
                          }`}
                        >
                          {toBengaliNumber(item.id)}
                        </span>
                        <div className="space-y-1 flex-1">
                          <p className="text-slate-700">{item.text}</p>
                          {item.highlightTag && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0D47A1] bg-[#90CAF9]/30 px-2 py-0.5 rounded border border-[#90CAF9]">
                              <Sparkles className="w-3 h-3 text-[#2196F3]" />
                              <span>{item.highlightTag}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mission Card */}
          {(visionMissionTab === "all" || visionMissionTab === "mission") && (
            <div
              className={`section-card space-y-5 bg-white border border-[#90CAF9]/60 shadow-soft transition-all duration-300 ${
                visionMissionTab === "mission" ? "lg:col-span-2" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3 border-b border-[#90CAF9]/40 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bornomala text-xs font-bold text-[#2196F3] bg-[#E3F2FD] px-2.5 py-0.5 rounded-md">
                      {mission.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0D47A1] font-bornomala">
                    {mission.titleBn}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#E3F2FD] text-[#0D47A1] flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-[#2196F3]" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-bornomala bg-[#E3F2FD]/30 p-3.5 rounded-lg border border-[#90CAF9]/30">
                {mission.subtitle}
              </p>

              <div className="space-y-3">
                <span className="text-xs font-bold text-[#0D47A1] font-bornomala block">
                  {mission.leadIn}
                </span>

                <div
                  className={`grid gap-2.5 ${
                    visionMissionTab === "mission" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {mission.items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-white border border-[#90CAF9]/40 hover:border-[#2196F3] rounded-lg transition-all text-xs leading-relaxed font-bornomala"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#E3F2FD] text-[#0D47A1] border border-[#90CAF9] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-bornomala">
                          {toBengaliNumber(item.id)}
                        </span>
                        <p className="text-slate-700 flex-1">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================================
          SECTION 04: Institutional Objectives (10-Item 2-Column Grid)
          =================================================================== */}
      <section className="section-card p-6 sm:p-10 bg-white border border-[#90CAF9]/60 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#90CAF9]/40 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bornomala text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-3 py-1 rounded-full">
                {objectives.tag}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0D47A1] font-bornomala">
              {objectives.titleBn}
            </h2>
          </div>
          <span className="text-xs font-bold text-[#2196F3] bg-[#E3F2FD] px-3 py-1 rounded-full self-start sm:self-auto font-ubuntu-sans">
            ১০টি মৌলিক উদ্দেশ্য
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 font-bornomala leading-relaxed">
          {objectives.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          {objectives.items.map((item) => (
            <div
              key={item.id}
              className="checklist-item transition-all duration-200"
            >
              <div className="w-6 h-6 rounded-full bg-[#E3F2FD] text-[#0D47A1] border border-[#90CAF9] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-bornomala">
                {toBengaliNumber(item.id)}
              </div>
              <div className="flex-1 text-xs sm:text-sm text-slate-700 font-bornomala leading-relaxed">
                {item.text}
              </div>
              <CheckCircle2 className="w-4 h-4 text-[#2196F3] shrink-0 mt-0.5" />
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================
          Leadership Profile: Chairman Shaykh Tariq Jamil
          =================================================================== */}
      <section className="section-card bg-white border border-[#90CAF9]/60 shadow-soft flex flex-col md:flex-row items-center gap-8 p-6 sm:p-8">
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
          <p className="text-xs font-bold text-[#2196F3] font-bornomala">
            {chairman.roleBn}, {identity.name.shortBn}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic font-bornomala">
            "{chairman.bioBn} কুরআন ও সুন্নাহর বিশুদ্ধ জ্ঞান প্রতিটি মুসলিম পরিবারে পৌঁছে দিয়ে আলোকিত প্রজন্ম গড়ে তোলাই আমাদের প্রধান অঙ্গীকার।"
          </p>
        </div>
      </section>

      {/* ===================================================================
          SECTION 05: Core Values (আমাদের মূলনীতি ও আদর্শ)
          =================================================================== */}
      <section className="section-card p-6 sm:p-8 bg-white border border-[#90CAF9]/60 shadow-soft space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="font-bornomala text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-3 py-1 rounded-full inline-block">
            প্রাতিষ্ঠানিক মূল্যবোধ
          </span>
          <h3 className="text-xl font-bold text-[#0D47A1] font-bornomala">আমাদের মূলনীতি ও আদর্শ</h3>
          <p className="text-xs text-slate-600 font-bornomala">প্রতিষ্ঠানের প্রতিটি কার্যক্রম যে মৌলিক ভিত্তির ওপর প্রতিষ্ঠিত</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bornomala">
          {coreValues.map((val) => (
            <div key={val.title} className="p-3.5 bg-[#E3F2FD]/40 rounded-xl border border-[#90CAF9]/40 space-y-1 hover:border-[#2196F3] transition-all">
              <span className="font-bold text-[#0D47A1] block font-bornomala">{val.bn}</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================
          SECTION 06: Educational Philosophy (6 Pillars Bento Grid)
          =================================================================== */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="font-ubuntu-sans text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-3 py-1 rounded-full inline-block">
            {philosophy.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D47A1] font-bornomala">
            {philosophy.titleBn}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-bornomala leading-relaxed">
            {philosophy.subtitle}
          </p>
        </div>

        <div className="text-center">
          <span className="text-xs font-bold text-[#0D47A1] font-bornomala bg-white px-3 py-1 rounded-md border border-[#90CAF9]/40 shadow-2xs">
            {philosophy.leadIn}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {philosophy.pillars.map((pillar) => {
            const IconComp = philosophyIcons[pillar.icon] || BookOpen;
            return (
              <div
                key={pillar.id}
                className="bento-card space-y-3 bg-white border border-[#90CAF9]/50 shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E3F2FD] to-[#BBDEFB] text-[#0D47A1] flex items-center justify-center shadow-2xs">
                    <IconComp className="w-5 h-5 text-[#2196F3]" />
                  </div>
                  <span className="text-[11px] font-bold text-[#90CAF9] font-ubuntu-sans">
                    0{pillar.id}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#0D47A1] font-bornomala">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 font-bornomala leading-relaxed">
                  {pillar.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="quote-callout text-center p-6 bg-gradient-to-r from-[#E3F2FD] via-white to-[#E3F2FD] border-t-2 border-b-2 sm:border-l-4 sm:border-r-0 border-[#0D47A1] rounded-xl shadow-xs">
          <Quote className="w-6 h-6 text-[#2196F3] mx-auto mb-2 opacity-75" />
          <p className="text-sm sm:text-base font-bold text-[#0D47A1] font-bornomala leading-relaxed max-w-3xl mx-auto">
            "{philosophy.closingQuote}"
          </p>
        </div>
      </section>

      {/* ===================================================================
          SECTION 07: Academic Departments (শিক্ষা বিভাগসমূহ)
          =================================================================== */}
      <section className="space-y-5">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="font-bornomala text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-3 py-1 rounded-full inline-block">
            একাডেমিক বিভাগ
          </span>
          <h2 className="text-2xl font-extrabold text-[#0D47A1] font-bornomala">
            শিক্ষা বিভাগসমূহ
          </h2>
          <p className="text-xs text-slate-600 font-bornomala">
            {siteConfig.departmentsIntro || "Quran Kanan-এ ইসলামিক জ্ঞানের বিভিন্ন শাখায় সুশৃঙ্খল শিক্ষাব্যবস্থা গড়ে তোলার লক্ষ্যে নিম্নলিখিত বিভাগসমূহ পরিচালনার পরিকল্পনা রয়েছে।"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {departments.map((dept, idx) => (
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
      </section>

      {/* ===================================================================
          SECTION 08: Educational Programs (শিক্ষা কার্যক্রম)
          =================================================================== */}
      <section className="space-y-5">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="font-bornomala text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-3 py-1 rounded-full inline-block">
            প্রোগ্রামসমূহ
          </span>
          <h2 className="text-2xl font-extrabold text-[#0D47A1] font-bornomala">
            শিক্ষা কার্যক্রম
          </h2>
          <p className="text-xs text-slate-600 font-bornomala">
            শিক্ষার্থীদের বয়স, যোগ্যতা ও প্রয়োজন অনুযায়ী বিভিন্ন স্তরে পরিচালিত প্রোগ্রাম
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((prog, idx) => (
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
      </section>

      {/* ===================================================================
          SECTION 09: Teaching Methodology (10 Numbered Feature Cards)
          =================================================================== */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bornomala text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-3 py-1 rounded-full">
                {methodology.tag}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#0D47A1] mt-2 font-bornomala">
              {methodology.titleBn}
            </h2>
          </div>
          <span className="text-xs font-bold text-[#2196F3] bg-[#E3F2FD] border border-[#90CAF9]/60 px-3 py-1 rounded-full self-start sm:self-auto font-bornomala">
            ১০টি সমন্বিত আধুনিক কৌশল
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 font-bornomala leading-relaxed">
          {methodology.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {methodology.items.map((item, idx) => {
            const IconComponent = methodologyIcons[idx] || Video;
            return (
              <div
                key={item.id}
                className="section-card p-4 space-y-3 bg-white border border-[#90CAF9]/50 shadow-soft hover:-translate-y-1 hover:border-[#2196F3] transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bornomala text-xs font-extrabold text-[#2196F3] bg-[#E3F2FD] px-2 py-0.5 rounded-md border border-[#90CAF9]/60">
                      ধাপ {item.step}
                    </span>
                    <IconComponent className="w-4 h-4 text-[#0D47A1]" />
                  </div>
                  <h3 className="font-bold text-sm text-[#0D47A1] font-bornomala leading-snug">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-600 font-bornomala leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================================================================
          SECTION 14: Future Development Plan (ভবিষ্যৎ উন্নয়ন পরিকল্পনা)
          Doc Section 14 verbatim specification with 12 strategic initiatives
          =================================================================== */}
      <section className="section-card p-6 sm:p-10 bg-white border border-[#90CAF9]/60 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#90CAF9]/40 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-ubuntu-sans text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-3 py-1 rounded-full flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5 text-[#2196F3]" />
                <span>{futureDevelopmentPlan.tag}</span>
              </span>
              <span className="text-xs font-bold text-[#0D47A1] font-bornomala bg-[#E3F2FD] px-2 py-0.5 rounded border border-[#90CAF9]/60">
                {futureDevelopmentPlan.badge}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0D47A1] font-bornomala tracking-tight">
              {futureDevelopmentPlan.titleBn}
            </h2>
          </div>
          <span className="text-xs font-bold text-[#2196F3] bg-[#E3F2FD] px-3 py-1 rounded-full self-start sm:self-auto font-ubuntu-sans">
            ১২টি কৌশলগত উদ্যোগ
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-xs sm:text-sm text-slate-700 font-bornomala leading-relaxed font-medium">
            {futureDevelopmentPlan.intro}
          </p>
          <p className="text-xs sm:text-sm font-bold text-[#0D47A1] font-bornomala">
            {futureDevelopmentPlan.leadIn}
          </p>
        </div>

        {/* 12 Strategic Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {futureDevelopmentPlan.initiatives.map((item) => (
            <div
              key={item.id}
              className="roadmap-card font-bornomala"
            >
              <span className="roadmap-badge font-bornomala">
                {item.numBn}
              </span>
              <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-bornomala flex-1">
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Closing Pledge Callout Banner */}
        <div className="pledge-banner mt-6 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#90CAF9] font-bornomala">
            <Sparkles className="w-4 h-4 text-[#90CAF9]" />
            <span>আমাদের স্থায়ী প্রাতিষ্ঠানিক অঙ্গীকার</span>
          </div>
          <p className="text-sm sm:text-base lg:text-lg font-bold text-white font-bornomala leading-relaxed max-w-3xl mx-auto">
            {futureDevelopmentPlan.closingPledge}
          </p>
        </div>
      </section>

      {/* ===================================================================
          Institutional Presence Statement & Admissions Callout
          =================================================================== */}
      <section className="section-card border-2 border-[#90CAF9] text-center space-y-4 p-6 sm:p-10 bg-gradient-to-b from-[#E3F2FD]/50 to-white shadow-soft">
        <Globe2 className="w-9 h-9 text-[#2196F3] mx-auto" />
        <h3 className="text-lg sm:text-xl font-bold text-[#0D47A1] font-bornomala">
          {presence.titleBn}
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 max-w-3xl mx-auto leading-relaxed font-bornomala">
          {presence.summaryBn}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3 font-bornomala">
          <Link href="/courses" className="btn-primary">
            চলমান ৩টি কোর্সে ভর্তি আবেদন
          </Link>
          <Link href="/contact" className="btn-outline">
            অফিশিয়াল যোগাযোগ ও পরামর্শ
          </Link>
        </div>
      </section>
    </div>
  );
}
