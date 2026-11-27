"use client";

import { useState } from "react";
import { Mail, Phone, Globe2, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { toast } from "react-toastify";
import { siteConfig } from "@/config/siteConfig";

// Common country codes and names for international learners
const COUNTRIES = [
  { code: "+880", name: "Bangladesh (বাংলাদেশ)", iso: "BD" },
  { code: "+966", name: "Saudi Arabia (সৌদি আরব)", iso: "SA" },
  { code: "+971", name: "United Arab Emirates (ইউএই)", iso: "AE" },
  { code: "+44", name: "United Kingdom (যুক্তরাজ্য)", iso: "GB" },
  { code: "+1", name: "United States (যুক্তরাষ্ট্র)", iso: "US" },
  { code: "+1", name: "Canada (কানাডা)", iso: "CA" },
  { code: "+61", name: "Australia (অস্ট্রেলিয়া)", iso: "AU" },
  { code: "+60", name: "Malaysia (মালয়েশিয়া)", iso: "MY" },
  { code: "+974", name: "Qatar (কাতার)", iso: "QA" },
  { code: "+968", name: "Oman (ওমান)", iso: "OM" },
  { code: "+965", name: "Kuwait (কুয়েত)", iso: "KW" },
  { code: "+91", name: "India (ভারত)", iso: "IN" },
  { code: "+92", name: "Pakistan (পাকিস্তান)", iso: "PK" },
  { code: "+39", name: "Italy (ইতালি)", iso: "IT" },
  { code: "+49", name: "Germany (জার্মানি)", iso: "DE" },
  { code: "+33", name: "France (ফ্রান্স)", iso: "FR" },
  { code: "+81", name: "Japan (জাপান)", iso: "JP" },
  { code: "+65", name: "Singapore (সিঙ্গাপুর)", iso: "SG" },
  { code: "other", name: "Other Country (অন্যান্য দেশ)", iso: "XX" },
];

export default function ContactComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "", // Mandatory per doc
    countryCode: "+880",
    phone: "", // Optional per doc
    country: "Bangladesh (বাংলাদেশ)",
    subject: siteConfig.contactSubjects[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      toast.error("ইমেইল ঠিকানা প্রদান করা বাধ্যতামূলক।");
      return;
    }
    setSubmitted(true);
    toast.success("আপনার বার্তা সফলভাবে পাঠানো হয়েছে। দ্রুত আপনার সাথে ইমেইল অথবা হোয়াটসঅ্যাপে যোগাযোগ করা হবে।");
  };

  return (
    <div className="page-shell">
      {/* Header */}
      <div className="page-header-block">
        <div className="section-pill mb-2">
          যোগাযোগ ও সাপোর্ট
        </div>
        <h1 className="page-title-main">
          আমাদের সাথে যোগাযোগ করুন
        </h1>
        <p className="page-subtitle-muted">
          কোর্সে ভর্তি পরামর্শ বা যেকোনো প্রাতিষ্ঠানিক তথ্যের জন্য সরাসরি যোগাযোগ করুন
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Institutional Presence & Contact Info Cards */}
        <div className="space-y-4">
          {/* Institutional Presence Card */}
          <div className="card-white-sm space-y-2">
            <div className="flex items-center gap-3">
              <div className="icon-box-primary">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0D47A1]">
                  {siteConfig.presence.titleBn}
                </h3>
                <span className="text-[11px] text-slate-500 font-semibold">
                  {siteConfig.presence.modeOfOperation} • {siteConfig.presence.serviceArea}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {siteConfig.presence.summaryBn}
            </p>
          </div>

          {/* Email Info Card */}
          <div className="card-white-sm flex items-start gap-4">
            <div className="icon-box-primary">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#0D47A1]">অফিশিয়াল ইমেইল</h3>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-xs text-[#2196F3] font-bold block mt-0.5 hover:underline break-all"
              >
                {siteConfig.contact.email}
              </a>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                সকল লিখিত তথ্যের জন্য প্রধান চ্যানেল
              </span>
            </div>
          </div>

          {/* Phone & WhatsApp Card */}
          <div className="card-white-sm flex items-start gap-4">
            <div className="icon-box-primary">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#0D47A1]">হটলাইন ও হোয়াটসঅ্যাপ</h3>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                className="text-xs text-[#2196F3] font-bold block mt-0.5 hover:underline"
              >
                {siteConfig.contact.phone}
              </a>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                {siteConfig.contact.supportHours.bn}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form (Doc Compliant) */}
        <div className="lg:col-span-2 card-white">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-[#0D47A1]">ধন্যবাদ! আপনার বার্তাটি গ্রহণ করা হয়েছে।</h3>
              <p className="text-xs text-slate-600">
                আমাদের অ্যাডমিশন টিম আপনার দেওয়া ইমেইলে ({formData.email}) দ্রুত বিস্তারিত রেসপন্স পাঠাবে।
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-outline mt-3"
              >
                আরেকটি বার্তা পাঠান
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name & Mandatory Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">
                    আপনার পূর্ণ নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    placeholder="পুরো নাম লিখুন"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    ইমেইল ঠিকানা (বাধ্যতামূলক) *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    placeholder="example@mail.com (রেসপন্সের জন্য জরুরি)"
                  />
                </div>
              </div>

              {/* Row 2: WhatsApp Number with Country Code (Optional) & Country Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">
                    হোয়াটসঅ্যাপ নম্বর (ঐচ্ছিক)
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.countryCode}
                      onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                      className="form-select w-36 shrink-0"
                    >
                      {COUNTRIES.map((c, i) => (
                        <option key={i} value={c.code}>
                          {c.iso} ({c.code})
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input flex-1"
                      placeholder="হোয়াটসঅ্যাপ নম্বর"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    আপনার দেশ (Country) *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="form-select"
                  >
                    {COUNTRIES.map((c, i) => (
                      <option key={i} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Subject Dropdown (Doc spec) */}
              <div className="form-group">
                <label className="form-label">
                  যোগাযোগের বিষয় (Subject) *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-select"
                >
                  {siteConfig.contactSubjects.map((sub, i) => (
                    <option key={i} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 4: Message */}
              <div className="form-group">
                <label className="form-label">
                  আপনার বার্তা / বিস্তারিত অনুসন্ধান *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-textarea"
                  placeholder="আপনি কোন কোর্সে আগ্রহী বা আপনার প্রশ্নটি বিস্তারিত লিখুন..."
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
              >
                <Send className="w-3.5 h-3.5" />
                <span>বার্তা পাঠান</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
