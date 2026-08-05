// app/virtual-campus/page.js
"use client";

import { useEffect, useState } from "react";
import { CampusAbout, CampusChart } from "@/components/public/virtual-campus/CampusIntro";
import CampusMentors from "@/components/public/virtual-campus/CampusMentors";
import CampusRules from "@/components/public/virtual-campus/CampusRules";
import CampusRoutine from "@/components/public/virtual-campus/CampusRoutine";

export default function VirtualCampusPage() {
  const [campusData, setCampusData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampusData() {
      try {
        // ফিউচার এপিআই ইন্টিগ্রেশনের জন্য স্টেট প্লেসহোল্ডার
        setCampusData({
          about: null,
          directors: null,
          rules: null,
          chart: null,
          routine: null,
        });
      } catch (error) {
        console.error("Campus data fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCampusData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-emerald-800"></div>
      </div>
    );
  }

  return (
    <div className="scroll-smooth min-h-screen bg-gray-50 dark:bg-slate-900">
      
      {/* ১. ডিজিটাল ক্যাম্পাস পরিচিতি সেকশন */}
      <section id="about" className="py-16 scroll-mt-24 border-b border-gray-100 dark:border-slate-800/60">
        <CampusAbout data={campusData?.about} />
      </section>

      {/* ২. অনলাইন মেন্টরবৃন্দ সেকশন (অল্টারনেট ব্যাকগ্রাউন্ড) */}
      <section id="directors" className="py-16 scroll-mt-24 border-b border-gray-100 dark:border-slate-800/60 bg-emerald-50/10 dark:bg-slate-900/40">
        <CampusMentors data={campusData?.directors} />
      </section>

      {/* ৩. অনলাইন ক্লাসের নিয়মাবলী সেকশন */}
      <section id="rules" className="py-16 scroll-mt-24 border-b border-gray-100 dark:border-slate-800/60">
        <CampusRules data={campusData?.rules} />
      </section>

      {/* ৪. শিক্ষা কার্যক্রম চার্ট সেকশন (অল্টারনেট ব্যাকগ্রাউন্ড) */}
      <section id="chart" className="py-16 scroll-mt-24 border-b border-gray-100 dark:border-slate-800/60 bg-emerald-50/10 dark:bg-slate-900/40">
        <CampusChart data={campusData?.chart} />
      </section>

      {/* ৫. দৈনিক অনলাইন কার্যসূচি সেকশন */}
      <section id="routine" className="py-16">
        <CampusRoutine data={campusData?.routine} />
      </section>

    </div>
  );
}
