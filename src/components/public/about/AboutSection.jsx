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
  Check,
  CheckCheck,
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

export default function AboutSection() {
  const [visionMissionTab, setVisionMissionTab] = useState("all"); // 'all' | 'vision' | 'mission'
  const { aboutPage, identity } = siteConfig;
  const { hero, vision, mission, objectives, philosophy, methodology } = aboutPage;

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* ===================================================================
          SECTION 01: Institutional Introduction & Hero
          =================================================================== */}
      <section className="relative overflow-hidden section-card p-6 sm:p-10 lg:p-12 bg-white border border-[#90CAF9]/60 shadow-soft">
        {/* Decorative background aura */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#E3F2FD] to-[#BBDEFB]/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-gradient-to-tr from-[#E3F2FD] to-[#90CAF9]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* Top Pill & Badges Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-ubuntu-sans text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2196F3] animate-pulse" />
                <span>01. {hero.titleEn}</span>
              </span>
              <span className="text-xs font-semibold text-slate-500 font-bornomala">
                {hero.titleBn}
              </span>
            </div>

            {/* Global Language Tri-Badge */}
            <div className="gradient-badge font-ubuntu-sans text-xs shadow-sm">
              <Globe2 className="w-3.5 h-3.5 text-[#2196F3]" />
              <span>{hero.badge}</span>
            </div>
          </div>

          {/* Academy Identity & Title */}
          <div className="space-y-3 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D47A1] tracking-tight font-ubuntu-sans">
              {hero.academyName}
            </h1>
            <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed font-bornomala">
              {hero.subheading}
            </p>
          </div>

          {/* Featured Core Mission Callout Quote */}
          <div className="quote-callout flex items-start gap-3 sm:gap-4 border-l-4 border-[#0D47A1] shadow-sm">
            <Quote className="w-6 h-6 text-[#2196F3] shrink-0 mt-0.5" />
            <blockquote className="text-sm sm:text-base font-semibold text-[#0D47A1] leading-relaxed font-bornomala">
              "{hero.quote}"
            </blockquote>
          </div>

          {/* Descriptive Content Paragraphs */}
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

          {/* Instruction Languages & Target Groups Highlights */}
          <div className="pt-6 border-t border-[#90CAF9]/40 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 3 Instruction Languages */}
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

            {/* Target Age Groups */}
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
              <span className="font-ubuntu-sans text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-3 py-1 rounded-full">
                02 & 03. Vision & Mission
              </span>
              <span className="text-xs font-semibold text-slate-500 font-bornomala">
                আমাদের স্বপ্ন ও লক্ষ্য
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#0D47A1] mt-2 font-bornomala">
              আদর্শ ও সুসংগঠিত দ্বীনি ভবিষ্যৎ গঠনের প্রত্যয়
            </h2>
          </div>

          {/* Interactive Tab Switcher */}
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

        {/* Tab Content Display */}
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
                    <span className="font-ubuntu-sans text-xs font-bold text-[#2196F3] bg-[#E3F2FD] px-2.5 py-0.5 rounded-md">
                      {vision.tag}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 font-ubuntu-sans">
                      {vision.titleEn}
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

              {/* Subtitle / Statement */}
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
                    <span className="font-ubuntu-sans text-xs font-bold text-[#2196F3] bg-[#E3F2FD] px-2.5 py-0.5 rounded-md">
                      {mission.tag}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 font-ubuntu-sans">
                      {mission.titleEn}
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

              {/* Subtitle / Statement */}
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
              <span className="font-ubuntu-sans text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-3 py-1 rounded-full">
                {objectives.tag}
              </span>
              <span className="text-xs font-semibold text-slate-500 font-ubuntu-sans">
                {objectives.titleEn}
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

        {/* 10 Items in 2-Column Checklist Grid */}
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

        {/* Lead-in Label */}
        <div className="text-center">
          <span className="text-xs font-bold text-[#0D47A1] font-bornomala bg-white px-3 py-1 rounded-md border border-[#90CAF9]/40 shadow-2xs">
            {philosophy.leadIn}
          </span>
        </div>

        {/* 6 Pillars Bento Grid */}
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

        {/* Closing Philosophy Belief Banner */}
        <div className="quote-callout text-center p-6 bg-gradient-to-r from-[#E3F2FD] via-white to-[#E3F2FD] border-t-2 border-b-2 sm:border-l-4 sm:border-r-0 border-[#0D47A1] rounded-xl shadow-xs">
          <Quote className="w-6 h-6 text-[#2196F3] mx-auto mb-2 opacity-75" />
          <p className="text-sm sm:text-base font-bold text-[#0D47A1] font-bornomala leading-relaxed max-w-3xl mx-auto">
            "{philosophy.closingQuote}"
          </p>
        </div>
      </section>

      {/* ===================================================================
          SECTION 09: Teaching Methodology (10 Numbered Feature Cards)
          =================================================================== */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-ubuntu-sans text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-3 py-1 rounded-full">
                {methodology.tag}
              </span>
              <span className="text-xs font-semibold text-slate-500 font-ubuntu-sans">
                {methodology.titleEn}
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

        {/* 10 Cards in Responsive Grid */}
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
          Institutional Quick Actions & Registration Callout
          =================================================================== */}
      <section className="section-card p-6 sm:p-8 bg-gradient-to-r from-[#0D47A1] to-[#09357A] text-white shadow-soft rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#90CAF9] bg-white/10 px-3 py-1 rounded-full">
            <GraduationCap className="w-3.5 h-3.5 text-[#90CAF9]" />
            <span>দ্বীনি শিক্ষার পথচলায় আপনার বিশ্বস্ত সঙ্গী</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-bornomala">
            আপনি কি কুরআন ও সুন্নাহর বিশুদ্ধ জ্ঞান অর্জনে আগ্রহী?
          </h3>
          <p className="text-xs sm:text-sm text-[#E3F2FD]/80 font-bornomala max-w-xl">
            ছোট্ট শিশুদের বুনিয়াদি হিফজ থেকে শুরু করে প্রাপ্তবয়স্কদের বিশুদ্ধ তিলাওয়াত ও জরুরি মাসআলা—আজই Quran Kanan-এর সঙ্গে যুক্ত হোন।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/courses"
            className="px-5 py-2.5 bg-[#2196F3] hover:bg-[#1E88E5] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5 font-bornomala"
          >
            <span>চলমান কোর্সসমূহ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm rounded-xl transition-all font-bornomala"
          >
            যোগাযোগ ও পরামর্শ
          </Link>
        </div>
      </section>
    </div>
  );
}
