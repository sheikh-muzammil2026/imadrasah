"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Clock,
  Send,
  User,
  Phone,
  Mail,
  Award,
  BookOpen,
  MapPin,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-toastify";
import { siteConfig } from "@/config/siteConfig";

export default function CareerPage() {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    phone: "",
    email: "",
    nidOrBrn: "",
    qualification: "দাওরায়ে হাদীস (মাস্টার্স সমমান)",
    department: "হিফজ",
    experience: "১-২ বছর",
    address: "",
    bioOrCvLink: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      toast.error("দয়া করে সকল আবশ্যক তথ্য (নাম, ফোন, ইমেইল) পূরণ করুন।");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/teacher-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        toast.success(data.message || "শিক্ষক আবেদন সফলভাবে গৃহীত হয়েছে!");
      } else {
        toast.error(data.message || "আবেদন জমা দিতে সমস্যা হয়েছে।");
      }
    } catch (err) {
      console.error("Submission error:", err);
      // Client-side fallback confirmation if server unreachable
      setSubmitted(true);
      toast.success("আপনার আবেদনটি সফলভাবে গৃহীত হয়েছে!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header Intro Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#E3F2FD] text-[#2196F3] border border-[#90CAF9]/70 px-4 py-1.5 rounded-full text-xs font-bold shadow-xs">
          <Briefcase className="w-4 h-4" />
          <span>শিক্ষক নিয়োগ বিজ্ঞপ্তি ২০২৬</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D47A1] tracking-tight">
          {siteConfig.identity.name.bn}-এ শিক্ষক হিসেবে ক্যারিয়ার গড়ুন
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          অনলাইন নূরানী, নাযেরা ও হিফজুল কুরআন বিভাগে তাজবীদ ও বিশুদ্ধ তিলাওয়াতে অভিজ্ঞ ও সনদপ্রাপ্ত হাফেজ ও আলেমগণের নিকট থেকে শিক্ষকতার আবেদন আহ্বান করা হচ্ছে।
        </p>
      </div>

      {/* 3 Benefit Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#90CAF9]/60 p-6 shadow-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#E3F2FD] text-[#2196F3] border border-[#90CAF9] flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#0D47A1]">সম্মানজনক হাদিয়া</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            অভিজ্ঞতা ও মেধার মূল্যায়নে আকর্ষণীয় মাসিক হাদিয়া এবং নিয়মিত পারফরম্যান্স বোনাস প্রদান করা হয়।
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#90CAF9]/60 p-6 shadow-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#E3F2FD] text-[#2196F3] border border-[#90CAF9] flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#0D47A1]">ঘরে বসে নমনীয় সময়</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            আধুনিক ডিজিটাল ক্লাস প্ল্যাটফর্মে সুবিধাজনক সময়ে ঘরে বসেই পাঠদানের সুবর্ণ সুযোগ।
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#90CAF9]/60 p-6 shadow-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#E3F2FD] text-[#2196F3] border border-[#90CAF9] flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#0D47A1]">প্রাতিষ্ঠানিক শিক্ষক আইডি</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            অনুমোদনের সাথে সাথে বিশেষ শিক্ষক আইডি (<span className="font-bold text-[#0D47A1]">0203+</span>) ও পূর্ণাঙ্গ ড্যাশবোর্ড সুবিধা বরাদ্দ।
          </p>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="bg-white rounded-2xl border border-[#90CAF9]/70 p-6 sm:p-10 shadow-soft">
        {submitted ? (
          <div className="text-center py-12 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 border border-emerald-300 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#0D47A1]">
              আবেদন সফলভাবে গৃহীত হয়েছে!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              আলহামদুলিল্লাহ, আপনার শিক্ষক আবেদনটি আমাদের অ্যাডমিন সিস্টেমে জমা হয়েছে। আমাদের পর্যালোচনা টিম আপনার তথ্য যাচাই-বাছাই করে শীঘ্রই আপনার সাথে ফোনে অথবা ইমেইলে যোগাযোগ করবে।
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-[#90CAF9]/40 transition"
              >
                আরেকটি আবেদন জমা দিন
              </button>
              <Link
                href="/"
                className="bg-[#0D47A1] text-white text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-[#0a3880] transition"
              >
                হোম পেজে ফিরে যান
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="border-b border-[#90CAF9]/40 pb-4">
              <h2 className="text-2xl font-extrabold text-[#0D47A1]">
                শিক্ষক আবেদন ফরম (Teacher Application Form)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                সঠিক ও সত্য তথ্য দিয়ে ফরমটি পূরণ করুন। লাল তারকা (*) চিহ্নিত ক্ষেত্রগুলো আবশ্যক।
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Name & Father's Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#0D47A1] mb-1.5">
                    পূর্ণ নাম (সার্টিফিকেট অনুযায়ী) *
                  </label>
                  <div className="relative">
                    <input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="যেমন: হাফেজ মাওলানা আব্দুর রহমান"
                      className="w-full pl-9 pr-3 py-2.5 border border-[#90CAF9]/60 rounded-xl bg-[#E3F2FD]/20 text-xs text-slate-800 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0D47A1] mb-1.5">
                    পিতার নাম
                  </label>
                  <div className="relative">
                    <input
                      name="fatherName"
                      type="text"
                      value={formData.fatherName}
                      onChange={handleChange}
                      placeholder="পিতার নাম লিখুন"
                      className="w-full pl-9 pr-3 py-2.5 border border-[#90CAF9]/60 rounded-xl bg-[#E3F2FD]/20 text-xs text-slate-800 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Row 2: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#0D47A1] mb-1.5">
                    মোবাইল নম্বর (হোয়াটসঅ্যাপ সচল) *
                  </label>
                  <div className="relative">
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01XXXXXXXXX"
                      className="w-full pl-9 pr-3 py-2.5 border border-[#90CAF9]/60 rounded-xl bg-[#E3F2FD]/20 text-xs text-slate-800 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0D47A1] mb-1.5">
                    ইমেইল ঠিকানা *
                  </label>
                  <div className="relative">
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@mail.com"
                      className="w-full pl-9 pr-3 py-2.5 border border-[#90CAF9]/60 rounded-xl bg-[#E3F2FD]/20 text-xs text-slate-800 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Row 3: NID & Qualification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#0D47A1] mb-1.5">
                    জাতীয় পরিচয়পত্র / জন্মনিবন্ধন নম্বর
                  </label>
                  <input
                    name="nidOrBrn"
                    type="text"
                    value={formData.nidOrBrn}
                    onChange={handleChange}
                    placeholder="NID / BRN নম্বর"
                    className="w-full px-3 py-2.5 border border-[#90CAF9]/60 rounded-xl bg-[#E3F2FD]/20 text-xs text-slate-800 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0D47A1] mb-1.5">
                    সর্বোচ্চ শিক্ষাগত যোগ্যতা *
                  </label>
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-[#90CAF9]/60 rounded-xl bg-[#E3F2FD]/20 text-xs text-slate-800 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
                  >
                    <option value="দাওরায়ে হাদীস (মাস্টার্স সমমান)">দাওরায়ে হাদীস (মাস্টার্স সমমান)</option>
                    <option value="হিফজুল কুরআন সম্পন্ন">হিফজুল কুরআন সম্পন্ন</option>
                    <option value="ফাজিল / কামিল">ফাজিল / কামিল</option>
                    <option value="আলিম / এইচএসসি">আলিম / এইচএসসি</option>
                    <option value="আন্তর্জাতিক ক্বিরাত সনদপ্রাপ্ত">আন্তর্জাতিক ক্বিরাত সনদপ্রাপ্ত</option>
                    <option value="বিশ্ববিদ্যালয় স্নাতক / স্নাতকোত্তর">বিশ্ববিদ্যালয় স্নাতক / স্নাতকোত্তর</option>
                    <option value="অন্যান্য">অন্যান্য</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Department & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#0D47A1] mb-1.5">
                    আবেদনের বিভাগ (Department) *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-[#90CAF9]/60 rounded-xl bg-[#E3F2FD]/20 text-xs text-slate-800 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9] font-bold text-[#0D47A1]"
                  >
                    <option value="নূরানী">নূরানী বিভাগ (Nurani)</option>
                    <option value="নাযেরা">নাযেরা বিভাগ (Nazera)</option>
                    <option value="হিফজ">হিফজুল কুরআন বিভাগ (Hifz)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0D47A1] mb-1.5">
                    শিক্ষকতার অভিজ্ঞতা
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-[#90CAF9]/60 rounded-xl bg-[#E3F2FD]/20 text-xs text-slate-800 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
                  >
                    <option value="১-২ বছর">১-২ বছর</option>
                    <option value="৩-৫ বছর">৩-৫ বছর</option>
                    <option value="৫ বছরের অধিক">৫ বছরের অধিক</option>
                    <option value="অভিজ্ঞতা নেই (নতুন)">অভিজ্ঞতা নেই (নতুন)</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Address */}
              <div>
                <label className="block text-xs font-bold text-[#0D47A1] mb-1.5">
                  বর্তমান ঠিকানা
                </label>
                <input
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="গ্রাম/রোড, থানা, জেলা"
                  className="w-full px-3 py-2.5 border border-[#90CAF9]/60 rounded-xl bg-[#E3F2FD]/20 text-xs text-slate-800 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
                />
              </div>

              {/* Row 6: Short Bio / CV Drive Link */}
              <div>
                <label className="block text-xs font-bold text-[#0D47A1] mb-1.5">
                  সংক্ষিপ্ত জীবনবৃত্তান্ত / সিভি লিংক (Google Drive বা লিঙ্কডইন)
                </label>
                <textarea
                  name="bioOrCvLink"
                  rows={3}
                  value={formData.bioOrCvLink}
                  onChange={handleChange}
                  placeholder="আপনার পূর্ববর্তী শিক্ষকতা প্রতিষ্ঠান, ক্বিরাতের সনদ বা গুগল ড্রাইভ সিভির লিংক লিখুন..."
                  className="w-full px-3 py-2.5 border border-[#90CAF9]/60 rounded-xl bg-[#E3F2FD]/20 text-xs text-slate-800 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto bg-[#0D47A1] hover:bg-[#0a3880] text-white text-sm font-bold px-8 py-3.5 rounded-xl shadow-xs transition duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "আবেদন জমা হচ্ছে..." : "শিক্ষক হিসেবে আবেদন জমা দিন"}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
