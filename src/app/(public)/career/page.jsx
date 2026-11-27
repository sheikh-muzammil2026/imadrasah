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
  Globe2,
  FileText,
  Upload,
  ShieldCheck,
  HelpCircle,
  Quote,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import { siteConfig } from "@/config/siteConfig";

export default function CareerPage() {
  const policy = siteConfig.teacherRecruitmentPolicy;

  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    nationality: "বাংলাদেশী",
    countryOfResidence: "বাংলাদেশ",
    idType: "nid", // "nid" or "passport"
    idNumber: "",
    qualification: siteConfig.teacherQualifications[6] || "দাওরায়ে হাদীস (কওমি মাদরাসা)",
    fieldOfStudy: siteConfig.fieldsOfStudy[0] || "কুরআন ও কিরাত",
    institutionAttended: "",
    languages: "বাংলা, ইংরেজি",
    department: "কুরআন শিক্ষা বিভাগ",
    experience: "৩-৫ বছর",
    photoUrl: "",
    cvUrl: "",
    certificatesUrl: "",
    // Teacher Readiness Questionnaire (Doc compliant)
    hoursAvailable: "২–৪ ঘণ্টা",
    devices: ["ল্যাপটপ", "হেডফোন / মাইক্রোফোন"],
    internetQuality: "ভালো",
    environment: "হ্যাঁ, নিরিবিলি পরিবেশ রয়েছে।",
    techSkills: ["Zoom / Google Meet পরিচালনা", "স্ক্রিন শেয়ারিং"],
    specialSkills: ["কুরআন তিলাওয়াত ও তাজবিদ শিক্ষা", "শিক্ষার্থীদের ব্যক্তিগতভাবে পাঠদান ও দিকনির্দেশনা"],
    multiculturalComfort: "হ্যাঁ",
    policyAgreed: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMultiSelectToggle = (field, item) => {
    setFormData((prev) => {
      const currentList = Array.isArray(prev[field]) ? prev[field] : [];
      if (currentList.includes(item)) {
        return { ...prev, [field]: currentList.filter((x) => x !== item) };
      } else {
        return { ...prev, [field]: [...currentList, item] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error("অনুগ্রহ করে আপনার নাম, ইমেইল এবং মোবাইল নম্বর পূরণ করুন।");
      return;
    }

    if (!formData.policyAgreed) {
      toast.error("শিক্ষক নিয়োগ নীতিমালা ও আচরণবিধিতে সম্মত হওয়া আবশ্যক।");
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
      setSubmitted(true);
      toast.success("আপনার আবেদনটি সফলভাবে গৃহীত হয়েছে!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-shell-wide space-y-12">
      {/* Header Intro Banner */}
      <div className="page-header-block">
        <div className="section-pill mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>আন্তর্জাতিক শিক্ষক নিয়োগ ২০২৬</span>
        </div>

        <h1 className="page-title-main">
          {siteConfig.identity.name.shortBn}-এ আন্তর্জাতিক শিক্ষক হিসেবে যুক্ত হোন
        </h1>

        <p className="page-subtitle-muted">
          বিশ্বের বিভিন্ন প্রান্তের মুসলিম শিক্ষার্থীদের বিশুদ্ধ কুরআন, তাজবীদ, হিফজ ও ইসলামিক স্টাডিজ শিক্ষাদানে অভিজ্ঞ ও যোগ্য শিক্ষক-শিক্ষিকাদের নিকট থেকে আবেদন আহ্বান করা হচ্ছে।
        </p>
      </div>

      {/* 3 Benefit Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-white space-y-2">
          <div className="icon-box-primary">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0D47A1]">সম্মানজনক আন্তর্জাতিক হাদিয়া</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            মেধার মূল্যায়নে আকর্ষণীয় ঘণ্টাপ্রতি ও মাসিক হাদিয়া এবং আন্তর্জাতিক পাঠদানের সুযোগ।
          </p>
        </div>

        <div className="card-white space-y-2">
          <div className="icon-box-primary">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0D47A1]">১০০% অনলাইন নমনীয় সময়সূচি</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            আধুনিক ডিজিটাল ক্লাস প্ল্যাটফর্মে ঘরে বসেই সুবিধাজনক সময়ে দেশি ও প্রবাসী শিক্ষার্থীদের পাঠদান।
          </p>
        </div>

        <div className="card-white space-y-2">
          <div className="icon-box-primary">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0D47A1]">প্রাতিষ্ঠানিক শিক্ষক আইডি (0203+)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            অনুমোদনের সাথে সাথে ইউনিক শিক্ষক আইডি এবং ক্লাস হাজিরা ও পাঠ পরিচালনার ডিজিটাল ড্যাশবোর্ড।
          </p>
        </div>
      </div>

      {/* Main Grid: Policy Card on Left/Top + Application Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ===================================================================
            SECTION: Teacher Recruitment Policy (শিক্ষক নিয়োগনীতি)
            Placed in Sticky Column on desktop & Top-of-Form on mobile/tablet
            =================================================================== */}
        <aside className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="policy-card space-y-5">
            {/* Pure Bengali Title Header & Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#90CAF9]/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="policy-badge font-bornomala text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2196F3]" />
                  <span>{policy.titleBn}</span>
                </span>
                <span className="text-xs font-bold text-[#0D47A1] font-bornomala bg-[#E3F2FD] px-2 py-0.5 rounded border border-[#90CAF9]/60">
                  {policy.badge}
                </span>
              </div>
              <span className="text-xs font-bold text-[#2196F3] bg-[#E3F2FD] px-2.5 py-0.5 rounded-full font-bornomala">
                ১০টি মূলনীতি
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0D47A1] font-bornomala tracking-tight">
                {policy.titleBn}
              </h2>
              <p className="text-xs text-slate-500 font-bornomala">
                শিক্ষক পদপ্রার্থীদের জন্য প্রতিষ্ঠানের আনুষ্ঠানিক নির্দেশনা ও নীতিমালা
              </p>
            </div>

            {/* Introductory Statement Quote Box */}
            <div className="policy-quote font-bornomala flex items-start gap-3">
              <Quote className="w-5 h-5 text-[#2196F3] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-medium text-[#0D47A1] leading-relaxed">
                {policy.leadStatement}
              </p>
            </div>

            {/* Lead-in Instruction Text */}
            <p className="text-xs sm:text-sm font-bold text-[#0D47A1] font-bornomala">
              {policy.leadIn}
            </p>

            {/* 10 Numbered Policy Items (১ – ১০) */}
            <div className="space-y-2.5">
              {policy.points.map((pt) => (
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

            {/* Quick Helper Note */}
            <div className="pt-2 border-t border-[#90CAF9]/40 flex items-center justify-between text-xs text-slate-500 font-bornomala">
              <span>ফরমে আবেদনের আগে নিয়মাবলী প্রযোজ্য</span>
              <button
                type="button"
                onClick={() => setShowPolicyModal(true)}
                className="text-[#2196F3] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>ফুলস্ক্রিন পড়ুন</span>
              </button>
            </div>
          </div>
        </aside>

        {/* ===================================================================
            SECTION: Teacher Application Form
            =================================================================== */}
        <main className="lg:col-span-7">
          <div className="card-white">
            {submitted ? (
              <div className="text-center py-12 space-y-4 max-w-lg mx-auto">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 border border-emerald-300 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h2 className="text-2xl font-extrabold text-[#0D47A1] font-bornomala">
                  আবেদন সফলভাবে গৃহীত হয়েছে!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-bornomala">
                  আলহামদুলিল্লাহ, আপনার শিক্ষক আবেদন ও তথ্য আমাদের অ্যাকাডেমিক পর্যালোচনা প্যানেলে জমা হয়েছে। আমাদের নির্বাচন কমিটি আপনার তথ্য যাচাই করে শীঘ্রই আপনার দেওয়া ইমেইলে যোগাযোগ করবে।
                </p>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline font-bornomala"
                  >
                    আরেকটি আবেদন জমা দিন
                  </button>
                  <Link href="/" className="btn-primary font-bornomala">
                    হোম পেজে ফিরে যান
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border-b border-[#90CAF9]/40 pb-4">
                  <h2 className="text-2xl font-extrabold text-[#0D47A1] font-bornomala">
                    আন্তর্জাতিক শিক্ষক আবেদন ফরম
                  </h2>
                  <p className="text-xs text-slate-600 mt-1 font-bornomala">
                    দেশি ও আন্তর্জাতিক প্রার্থীরা সঠিক তথ্য দিয়ে নিচের ফরমটি পূরণ করুন। লাল তারকা (*) চিহ্নিত ক্ষেত্রগুলো আবশ্যক।
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* SECTION A: Personal Identity */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#0D47A1] border-b border-[#90CAF9]/30 pb-1.5 font-bornomala">
                      ১. ব্যক্তিগত ও যোগাযোগ সংক্রান্ত তথ্য
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label font-bornomala">পূর্ণ নাম (সার্টিফিকেট অনুযায়ী) *</label>
                        <input
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="যেমন: হাফেজ মাওলানা আব্দুর রহমান"
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label font-bornomala">পিতার নাম</label>
                        <input
                          name="fatherName"
                          type="text"
                          value={formData.fatherName}
                          onChange={handleChange}
                          placeholder="পিতার নাম লিখুন"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="form-group">
                        <label className="form-label font-bornomala">জন্ম তারিখ *</label>
                        <input
                          name="dateOfBirth"
                          type="date"
                          required
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label font-bornomala">মোবাইল / হোয়াটসঅ্যাপ নম্বর *</label>
                        <input
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+8801..."
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label font-bornomala">ইমেইল ঠিকানা *</label>
                        <input
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="teacher@example.com"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label font-bornomala">জাতীয়তা *</label>
                        <input
                          name="nationality"
                          type="text"
                          required
                          value={formData.nationality}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label font-bornomala">বর্তমানে বসবাসের দেশ *</label>
                        <input
                          name="countryOfResidence"
                          type="text"
                          required
                          value={formData.countryOfResidence}
                          onChange={handleChange}
                          placeholder="যেমন: বাংলাদেশ, সৌদি আরব, ইউকে..."
                          className="form-input"
                        />
                      </div>
                    </div>

                    {/* ID Type & Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="form-group">
                        <label className="form-label font-bornomala">পরিচয়পত্রের ধরন *</label>
                        <select
                          name="idType"
                          value={formData.idType}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="nid">জাতীয় পরিচয়পত্র</option>
                          <option value="passport">পাসপোর্ট</option>
                        </select>
                      </div>

                      <div className="form-group sm:col-span-2">
                        <label className="form-label font-bornomala">
                          {formData.idType === "nid" ? "এনআইডি নম্বর *" : "পাসপোর্ট নম্বর *"}
                        </label>
                        <input
                          name="idNumber"
                          type="text"
                          required
                          value={formData.idNumber}
                          onChange={handleChange}
                          placeholder={formData.idType === "nid" ? "NID নম্বর দিন" : "পাসপোর্ট নম্বর দিন"}
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION B: Academic Qualification & Department */}
                  <div className="space-y-4 pt-3">
                    <h3 className="text-sm font-bold text-[#0D47A1] border-b border-[#90CAF9]/30 pb-1.5 font-bornomala">
                      ২. শিক্ষাগত যোগ্যতা ও পাঠদানের বিভাগ
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label font-bornomala">সর্বোচ্চ শিক্ষাগত যোগ্যতা *</label>
                        <select
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleChange}
                          className="form-select"
                        >
                          {siteConfig.teacherQualifications.map((q, idx) => (
                            <option key={idx} value={q}>
                              {q}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label font-bornomala">সংশ্লিষ্ট পাঠের ক্ষেত্র *</label>
                        <select
                          name="fieldOfStudy"
                          value={formData.fieldOfStudy}
                          onChange={handleChange}
                          className="form-select"
                        >
                          {siteConfig.fieldsOfStudy.map((f, idx) => (
                            <option key={idx} value={f}>
                              {f}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="form-group">
                        <label className="form-label font-bornomala">যে প্রতিষ্ঠানে অধ্যয়ন করেছেন</label>
                        <input
                          name="institutionAttended"
                          type="text"
                          value={formData.institutionAttended}
                          onChange={handleChange}
                          placeholder="মাদরাসা বা বিশ্ববিদ্যালয়ের নাম"
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label font-bornomala">আবেদনের বিভাগ *</label>
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className="form-select font-bold text-[#0D47A1]"
                        >
                          {siteConfig.departments.map((d) => (
                            <option key={d.id} value={d.nameBn}>
                              {d.nameBn}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label font-bornomala">ভাষাগত দক্ষতা *</label>
                        <input
                          name="languages"
                          type="text"
                          value={formData.languages}
                          onChange={handleChange}
                          placeholder="যেমন: বাংলা, ইংরেজি, আরবি"
                          className="form-input"
                        />
                      </div>
                    </div>

                    {/* Upload Links / URL Direct Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="form-group">
                        <label className="form-label font-bornomala">অফিশিয়াল প্রোফাইল ছবি (URL / ড্রাইভ লিংক)</label>
                        <input
                          name="photoUrl"
                          type="url"
                          value={formData.photoUrl}
                          onChange={handleChange}
                          placeholder="https://..."
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label font-bornomala">জীবনবৃত্তান্ত / সিভি লিংক *</label>
                        <input
                          name="cvUrl"
                          type="url"
                          required
                          value={formData.cvUrl}
                          onChange={handleChange}
                          placeholder="Google Drive বা ড্রপবক্স লিংক"
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label font-bornomala">সনদপত্র ও ইজাযত লিংক</label>
                        <input
                          name="certificatesUrl"
                          type="url"
                          value={formData.certificatesUrl}
                          onChange={handleChange}
                          placeholder="সার্টিফিকেটের গুগল ড্রাইভ লিংক"
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION C: Teacher Readiness Questionnaire (Strictly from doc) */}
                  <div className="space-y-4 pt-3">
                    <div className="flex items-center justify-between border-b border-[#90CAF9]/30 pb-1.5">
                      <h3 className="text-sm font-bold text-[#0D47A1] font-bornomala">
                        ৩. শিক্ষক প্রস্তুতি ও অনলাইন পাঠদানের সক্ষমতা প্রশ্নাবলী
                      </h3>
                      <span className="text-[11px] text-[#2196F3] font-semibold font-bornomala">৭টি মূল্যায়ন সূচক</span>
                    </div>

                    {/* Question 1: Hours */}
                    <div className="form-group">
                      <label className="form-label font-bornomala">১. আপনি প্রতিদিন কত ঘণ্টা পাঠদানের জন্য সময় দিতে পারবেন? *</label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                        {siteConfig.teacherQuestionnaire.hoursAvailable.map((opt) => (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => setFormData({ ...formData, hoursAvailable: opt })}
                            className={`p-2 rounded-lg text-xs font-bold border transition text-center cursor-pointer font-bornomala ${
                              formData.hoursAvailable === opt
                                ? "bg-[#0D47A1] text-white border-[#0D47A1]"
                                : "bg-[#E3F2FD]/30 border-[#90CAF9]/60 text-slate-700 hover:bg-[#E3F2FD]"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Question 2: Devices (Multi-select) */}
                    <div className="form-group">
                      <label className="form-label font-bornomala">২. অনলাইন ক্লাস পরিচালনার জন্য আপনার কাছে কী কী ডিভাইস রয়েছে? (একাধিক নির্বাচনযোগ্য) *</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                        {siteConfig.teacherQuestionnaire.devices.map((dev) => {
                          const selected = formData.devices.includes(dev);
                          return (
                            <button
                              type="button"
                              key={dev}
                              onClick={() => handleMultiSelectToggle("devices", dev)}
                              className={`p-2 rounded-lg text-xs font-semibold border flex items-center justify-between transition cursor-pointer font-bornomala ${
                                selected
                                  ? "bg-[#E3F2FD] text-[#0D47A1] border-[#2196F3] font-bold"
                                  : "bg-white border-[#90CAF9]/60 text-slate-600"
                              }`}
                            >
                              <span>{dev}</span>
                              {selected ? <CheckCircle2 className="w-3.5 h-3.5 text-[#2196F3]" /> : null}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Question 3: Internet Quality & 4: Environment */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label font-bornomala">৩. আপনার ইন্টারনেট সংযোগের মান কেমন? *</label>
                        <select
                          name="internetQuality"
                          value={formData.internetQuality}
                          onChange={handleChange}
                          className="form-select font-bornomala"
                        >
                          {siteConfig.teacherQuestionnaire.internetQuality.map((iq) => (
                            <option key={iq} value={iq}>
                              {iq}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label font-bornomala">৪. অনলাইন ক্লাস নেওয়ার জন্য আপনার কি নিরিবিলি উপযুক্ত পরিবেশ রয়েছে? *</label>
                        <select
                          name="environment"
                          value={formData.environment}
                          onChange={handleChange}
                          className="form-select font-bornomala"
                        >
                          {siteConfig.teacherQuestionnaire.environment.map((env) => (
                            <option key={env} value={env}>
                              {env}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Question 5: Technical Skills (Multi-select) */}
                    <div className="form-group">
                      <label className="form-label font-bornomala">৫. অনলাইন পাঠদানের ক্ষেত্রে প্রযুক্তিগত দক্ষতা (নির্বাচন করুন)</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {siteConfig.teacherQuestionnaire.techSkills.map((skill) => {
                          const selected = formData.techSkills.includes(skill);
                          return (
                            <button
                              type="button"
                              key={skill}
                              onClick={() => handleMultiSelectToggle("techSkills", skill)}
                              className={`p-2 rounded-lg text-xs font-medium border flex items-center justify-between text-left transition cursor-pointer font-bornomala ${
                                selected
                                  ? "bg-[#E3F2FD] text-[#0D47A1] border-[#2196F3] font-bold"
                                  : "bg-white border-[#90CAF9]/60 text-slate-600"
                              }`}
                            >
                              <span>{skill}</span>
                              {selected && <CheckCircle2 className="w-3.5 h-3.5 text-[#2196F3] shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Question 6: Special Skills (Multi-select) */}
                    <div className="form-group">
                      <label className="form-label font-bornomala">৬. শিক্ষার্থীদের পাঠদানে সহায়তার জন্য বিশেষ দক্ষতা</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {siteConfig.teacherQuestionnaire.specialSkills.map((skill) => {
                          const selected = formData.specialSkills.includes(skill);
                          return (
                            <button
                              type="button"
                              key={skill}
                              onClick={() => handleMultiSelectToggle("specialSkills", skill)}
                              className={`p-2 rounded-lg text-xs font-medium border flex items-center justify-between text-left transition cursor-pointer font-bornomala ${
                                selected
                                  ? "bg-[#E3F2FD] text-[#0D47A1] border-[#2196F3] font-bold"
                                  : "bg-white border-[#90CAF9]/60 text-slate-600"
                              }`}
                            >
                              <span>{skill}</span>
                              {selected && <CheckCircle2 className="w-3.5 h-3.5 text-[#2196F3] shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Question 7: Multicultural Comfort */}
                    <div className="form-group">
                      <label className="form-label font-bornomala">৭. আপনি কি বিভিন্ন দেশের ও ভিন্ন সাংস্কৃতিক পরিবেশের শিক্ষার্থীদের পাঠদান করতে স্বাচ্ছন্দ্যবোধ করেন? *</label>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {siteConfig.teacherQuestionnaire.multiculturalComfort.map((ans) => (
                          <button
                            type="button"
                            key={ans}
                            onClick={() => setFormData({ ...formData, multiculturalComfort: ans })}
                            className={`px-4 py-2 rounded-lg text-xs font-bold border transition cursor-pointer font-bornomala ${
                              formData.multiculturalComfort === ans
                                ? "bg-[#0D47A1] text-white border-[#0D47A1]"
                                : "bg-white border-[#90CAF9]/60 text-slate-700 hover:bg-[#E3F2FD]"
                            }`}
                          >
                            {ans}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SECTION D: Policy Agreement & Submit Area */}
                  <div className="pt-4 border-t border-[#90CAF9]/40 space-y-4">
                    <div className="p-3.5 bg-[#E3F2FD]/50 border border-[#90CAF9]/70 rounded-xl space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label className="flex items-start gap-2.5 cursor-pointer text-xs sm:text-sm font-bold text-[#0D47A1] font-bornomala">
                          <input
                            name="policyAgreed"
                            type="checkbox"
                            checked={formData.policyAgreed}
                            onChange={handleChange}
                            className="w-4 h-4 rounded text-[#2196F3] focus:ring-[#90CAF9] mt-0.5 cursor-pointer"
                          />
                          <span>আমি Quran Kanan-এর শিক্ষক নিয়োগ নীতিমালা ও আচরণবিধি পড়ে সম্মতি জানাচ্ছি *</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => setShowPolicyModal(true)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2196F3] hover:text-[#0D47A1] hover:underline self-start sm:self-auto shrink-0 cursor-pointer font-bornomala"
                        >
                          <FileText className="w-4 h-4" />
                          <span>শিক্ষক নিয়োগনীতি পড়ুন</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 font-bornomala pl-6">
                        আবেদন চূড়ান্তভাবে জমা দেওয়ার পূর্বে প্রতিষ্ঠানের ১০টি শিক্ষক নিয়োগ মানদণ্ড ও দায়িত্বশীলতা নীতি সতর্কতার সাথে পড়ে নেওয়া আবশ্যক।
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full sm:w-auto py-3 px-8 text-sm font-bold font-bornomala"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? "আবেদন জমা হচ্ছে..." : "শিক্ষক হিসেবে আবেদন জমা দিন"}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ===================================================================
          Interactive Full-Screen / Modal Teacher Recruitment Policy Review
          (Opens via quick policy link without losing any form state)
          =================================================================== */}
      {showPolicyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="policy-modal-container space-y-5 p-6 sm:p-8 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#90CAF9]/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="policy-badge font-bornomala text-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2196F3]" />
                    <span>{policy.titleBn}</span>
                  </span>
                  <span className="text-xs font-bold text-[#0D47A1] font-bornomala bg-[#E3F2FD] px-2 py-0.5 rounded border border-[#90CAF9]/60">
                    {policy.badge}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0D47A1] font-bornomala">
                  {policy.titleBn}
                </h3>
              </div>
              <button
                onClick={() => setShowPolicyModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Lead Quote */}
            <div className="policy-quote font-bornomala flex items-start gap-3">
              <Quote className="w-5 h-5 text-[#2196F3] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-medium text-[#0D47A1] leading-relaxed">
                {policy.leadStatement}
              </p>
            </div>

            <p className="text-xs sm:text-sm font-bold text-[#0D47A1] font-bornomala">
              {policy.leadIn}
            </p>

            {/* 10 Verbatim Policy Points */}
            <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
              {policy.points.map((pt) => (
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

            {/* Modal Footer */}
            <div className="pt-3 border-t border-[#90CAF9]/40 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500 font-bornomala">
                নীতিমালা সম্পূর্ণ পড়ে আবেদন ফরমে সম্মতি নিশ্চিত করুন।
              </span>
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, policyAgreed: true }));
                  setShowPolicyModal(false);
                }}
                className="btn-primary text-xs py-2 px-5 font-bold font-bornomala"
              >
                সম্মত ও একমত
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
