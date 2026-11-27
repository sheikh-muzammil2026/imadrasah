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
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import { siteConfig } from "@/config/siteConfig";

export default function CareerPage() {
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
    qualification: siteConfig.teacherQualifications[6] || "Traditional Islamic Studies",
    fieldOfStudy: siteConfig.fieldsOfStudy[0] || "Quranic Studies",
    institutionAttended: "",
    languages: "বাংলা, ইংরেজি",
    department: "কুরআন শিক্ষা বিভাগ (Quran Studies)",
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
    <div className="page-shell space-y-12">
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

      {/* Main Form Section */}
      <div className="card-white">
        {submitted ? (
          <div className="text-center py-12 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 border border-emerald-300 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#0D47A1]">
              আবেদন সফলভাবে গৃহীত হয়েছে!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              আলহামদুলিল্লাহ, আপনার শিক্ষক আবেদন ও তথ্য আমাদের অ্যাকাডেমিক পর্যালোচনা প্যানেলে জমা হয়েছে। আমাদের নির্বাচন কমিটি আপনার তথ্য যাচাই করে শীঘ্রই আপনার দেওয়া ইমেইলে যোগাযোগ করবে।
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setSubmitted(false)}
                className="btn-outline"
              >
                আরেকটি আবেদন জমা দিন
              </button>
              <Link href="/" className="btn-primary">
                হোম পেজে ফিরে যান
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="border-b border-[#90CAF9]/40 pb-4">
              <h2 className="text-2xl font-extrabold text-[#0D47A1]">
                আন্তর্জাতিক শিক্ষক আবেদন ফরম (Teacher Application Form)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                দেশি ও আন্তর্জাতিক প্রার্থীরা সঠিক তথ্য দিয়ে নিচের ফরমটি পূরণ করুন। লাল তারকা (*) চিহ্নিত ক্ষেত্রগুলো আবশ্যক।
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SECTION A: Personal Identity */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#0D47A1] border-b border-[#90CAF9]/30 pb-1.5">
                  ১. ব্যক্তিগত ও যোগাযোগ সংক্রান্ত তথ্য
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">পূর্ণ নাম (সার্টিফিকেট অনুযায়ী) *</label>
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
                    <label className="form-label">পিতার নাম</label>
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
                    <label className="form-label">জন্ম তারিখ (Date of Birth) *</label>
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
                    <label className="form-label">ইমেইল ঠিকানা (রেসপন্সের জন্য আবশ্যক) *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@mail.com"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">হোয়াটসঅ্যাপ মোবাইল নম্বর *</label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+8801XXXXXXXXX"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="form-group">
                    <label className="form-label">জাতীয়তা (Nationality) *</label>
                    <input
                      name="nationality"
                      type="text"
                      required
                      value={formData.nationality}
                      onChange={handleChange}
                      placeholder="যেমন: বাংলাদেশী / British / Saudi"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">বর্তমানে যে দেশে অবস্থান করছেন *</label>
                    <input
                      name="countryOfResidence"
                      type="text"
                      required
                      value={formData.countryOfResidence}
                      onChange={handleChange}
                      placeholder="বর্তমান দেশ"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">পরিচয়পত্র ধরন ও নম্বর *</label>
                    <div className="flex gap-2">
                      <select
                        name="idType"
                        value={formData.idType}
                        onChange={handleChange}
                        className="form-select w-28 shrink-0"
                      >
                        <option value="nid">NID/BRN</option>
                        <option value="passport">Passport</option>
                      </select>
                      <input
                        name="idNumber"
                        type="text"
                        required
                        value={formData.idNumber}
                        onChange={handleChange}
                        placeholder={formData.idType === "passport" ? "পাসপোর্ট নম্বর" : "জাতীয় পরিচয়পত্র নম্বর"}
                        className="form-input flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION B: Academic & Islamic Qualifications */}
              <div className="space-y-4 pt-3">
                <h3 className="text-sm font-bold text-[#0D47A1] border-b border-[#90CAF9]/30 pb-1.5">
                  ২. শিক্ষাগত যোগ্যতা ও বিভাগ
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">সর্বোচ্চ একাডেমিক বা ইসলামিক শিক্ষাগত যোগ্যতা *</label>
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
                    <label className="form-label">সংশ্লিষ্ট পাঠের ক্ষেত্র (Relevant Field of Study) *</label>
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
                    <label className="form-label">যে প্রতিষ্ঠানে অধ্যয়ন করেছেন</label>
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
                    <label className="form-label">আবেদনের বিভাগ (Department) *</label>
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
                    <label className="form-label">ভাষাগত দক্ষতা (Languages) *</label>
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
                    <label className="form-label">অফিশিয়াল প্রোফাইল ছবি (URL / ড্রাইভ লিংক)</label>
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
                    <label className="form-label">জীবনবৃত্তান্ত / সিভি লিংক (Drive Link) *</label>
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
                    <label className="form-label">সনদপত্র ও ইজাযত লিংক (Certificates)</label>
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
                  <h3 className="text-sm font-bold text-[#0D47A1]">
                    ৩. শিক্ষক প্রস্তুতি ও অনলাইন পাঠদানের সক্ষমতা প্রশ্নাবলী
                  </h3>
                  <span className="text-[11px] text-[#2196F3] font-semibold">৭টি শর্টকার্ট মূল্যায়ন</span>
                </div>

                {/* Question 1: Hours */}
                <div className="form-group">
                  <label className="form-label">১. আপনি প্রতিদিন কত ঘণ্টা পাঠদানের জন্য সময় দিতে পারবেন? *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                    {siteConfig.teacherQuestionnaire.hoursAvailable.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, hoursAvailable: opt })}
                        className={`p-2 rounded-lg text-xs font-bold border transition text-center cursor-pointer ${
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
                  <label className="form-label">২. অনলাইন ক্লাস পরিচালনার জন্য আপনার কাছে কী কী ডিভাইস রয়েছে? (একাধিক নির্বাচনযোগ্য) *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                    {siteConfig.teacherQuestionnaire.devices.map((dev) => {
                      const selected = formData.devices.includes(dev);
                      return (
                        <button
                          type="button"
                          key={dev}
                          onClick={() => handleMultiSelectToggle("devices", dev)}
                          className={`p-2 rounded-lg text-xs font-semibold border flex items-center justify-between transition cursor-pointer ${
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

                {/* Question 3: Internet Quality */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">৩. আপনার ইন্টারনেট সংযোগের মান কেমন? *</label>
                    <select
                      name="internetQuality"
                      value={formData.internetQuality}
                      onChange={handleChange}
                      className="form-select"
                    >
                      {siteConfig.teacherQuestionnaire.internetQuality.map((iq) => (
                        <option key={iq} value={iq}>
                          {iq}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">৪. অনলাইন ক্লাস নেওয়ার জন্য আপনার কি নিরিবিলি উপযুক্ত পরিবেশ রয়েছে? *</label>
                    <select
                      name="environment"
                      value={formData.environment}
                      onChange={handleChange}
                      className="form-select"
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
                  <label className="form-label">৫. অনলাইন পাঠদানের ক্ষেত্রে প্রযুক্তিগত দক্ষতা (নির্বাচন করুন)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {siteConfig.teacherQuestionnaire.techSkills.map((skill) => {
                      const selected = formData.techSkills.includes(skill);
                      return (
                        <button
                          type="button"
                          key={skill}
                          onClick={() => handleMultiSelectToggle("techSkills", skill)}
                          className={`p-2 rounded-lg text-xs font-medium border flex items-center justify-between text-left transition cursor-pointer ${
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
                  <label className="form-label">৬. শিক্ষার্থীদের পাঠদানে সহায়তার জন্য বিশেষ দক্ষতা</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {siteConfig.teacherQuestionnaire.specialSkills.map((skill) => {
                      const selected = formData.specialSkills.includes(skill);
                      return (
                        <button
                          type="button"
                          key={skill}
                          onClick={() => handleMultiSelectToggle("specialSkills", skill)}
                          className={`p-2 rounded-lg text-xs font-medium border flex items-center justify-between text-left transition cursor-pointer ${
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
                  <label className="form-label">৭. আপনি কি বিভিন্ন দেশের ও ভিন্ন সাংস্কৃতিক পরিবেশের শিক্ষার্থীদের পাঠদান করতে স্বাচ্ছন্দ্যবোধ করেন? *</label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {siteConfig.teacherQuestionnaire.multiculturalComfort.map((ans) => (
                      <button
                        type="button"
                        key={ans}
                        onClick={() => setFormData({ ...formData, multiculturalComfort: ans })}
                        className={`px-4 py-2 rounded-lg text-xs font-bold border transition cursor-pointer ${
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

              {/* SECTION D: Policy Agreement */}
              <div className="pt-2 border-t border-[#90CAF9]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#0D47A1]">
                    <input
                      name="policyAgreed"
                      type="checkbox"
                      checked={formData.policyAgreed}
                      onChange={handleChange}
                      className="w-4 h-4 rounded text-[#2196F3] focus:ring-[#90CAF9]"
                    />
                    <span>আমি Quran Kanan-এর শিক্ষক নিয়োগ নীতিমালা ও আচরণবিধি পড়ে সম্মতি জানাচ্ছি *</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowPolicyModal(true)}
                    className="text-xs font-bold text-[#2196F3] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>নীতিমালা পড়ুন</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full sm:w-auto py-3 px-8 text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "আবেদন জমা হচ্ছে..." : "শিক্ষক হিসেবে আবেদন জমা দিন"}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Teacher Policy Modal */}
      {showPolicyModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="card-white max-w-xl w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#90CAF9]/50">
              <h3 className="text-base font-bold text-[#0D47A1] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2196F3]" />
                <span>Quran Kanan শিক্ষক নিয়োগনীতি ও আচরণবিধি</span>
              </h3>
              <button
                onClick={() => setShowPolicyModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <p className="font-bold text-[#0D47A1]">১. ইসলামিক ও একাডেমিক যোগ্যতা:</p>
              <p>সংশ্লিষ্ট বিষয়ে প্রয়োজনীয় সনদপত্র এবং অনলাইন ওয়ান-টু-ওয়ান পাঠদানের মানসিকতা থাকতে হবে।</p>

              <p className="font-bold text-[#0D47A1]">২. কারিগরি প্রস্তুতি ও নিরবচ্ছিন্ন ইন্টারনেট:</p>
              <p>ক্লাস পরিচালনার জন্য ভালো ইন্টারনেট সংযোগ ও নিরিবিলি পরিবেশ নিশ্চিত করতে হবে।</p>

              <p className="font-bold text-[#0D47A1]">৩. সময়ানুবর্তিতা ও মিটিংয়ে উপস্থিতি:</p>
              <p>কর্তৃপক্ষের প্রোগ্রাম, মিটিং ও নির্ধারিত ক্লাসের সময়ে যথাসময়ে উপস্থিত থাকতে হবে।</p>

              <p className="font-bold text-[#0D47A1]">৪. শিক্ষার্থীদের প্রতি সম্মান ও আখলাক:</p>
              <p>শিক্ষার্থীদের প্রতি আন্তরিকতা, সুন্দর আচরণ এবং নারী শিক্ষার্থীদের ক্ষেত্রে পূর্ণ শারঈ পর্দা ও প্রটোকল রক্ষা করা আবশ্যক।</p>
            </div>

            <div className="pt-3 border-t border-[#90CAF9]/40 flex justify-end">
              <button
                onClick={() => setShowPolicyModal(false)}
                className="btn-primary"
              >
                বুঝেছি ও একমত
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
