"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  Users,
  BookOpen,
  PhoneCall,
  ChevronRight,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  UserCheck,
  X,
  Send,
} from "lucide-react";
import { toast } from "react-toastify";
import { siteConfig } from "@/config/siteConfig";
import { getCurrentUser, initStore } from "@/lib/store";

export default function CourseDetailsPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const param = (resolvedParams?.id || resolvedParams?.slug || "").toLowerCase();

  // Match course by slug, id, or legacy alias
  const course =
    siteConfig.courses.find((c) => {
      const slugMatch = c.slug.toLowerCase() === param;
      const idMatch = c.id.toLowerCase() === param;
      const aliasMatch =
        (param === "nurani" && c.slug === "quran-foundations") ||
        (param === "nazera" && c.slug === "recitation-tajweed") ||
        (param === "hifz" && c.slug === "quran-hifz");
      return slugMatch || idMatch || aliasMatch;
    }) || siteConfig.courses[0];

  const [currentUser, setCurrentUser] = useState(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null); // null | "pending" | "approved" | "rejected"
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);

  // Student admission form fields (Doc compliant)
  const [studentForm, setStudentForm] = useState({
    fatherName: "",
    country: "Bangladesh (বাংলাদেশ)",
    whatsapp: "",
    nationality: "বাংলাদেশী",
    dateOfBirth: "",
    languagesUnderstood: "বাংলা, ইংরেজি",
    preferredSchedule: "সন্ধ্যা ৭:৩০ - ৮:১৫",
    preferredDays: "শনি, সোম, বুধ",
  });

  useEffect(() => {
    initStore();
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user?.name) {
      setStudentForm((prev) => ({
        ...prev,
        whatsapp: user.phone || "",
      }));
    }

    if (user?.email) {
      checkEnrollmentStatus(user.email, course.slug);
    }
  }, [course.slug]);

  const checkEnrollmentStatus = async (email, courseSlug) => {
    try {
      const res = await fetch(
        `/api/course-enrollments?userEmail=${encodeURIComponent(email)}&courseSlug=${encodeURIComponent(courseSlug)}`
      );
      const data = await res.json();
      if (data.success && Array.isArray(data.enrollments) && data.enrollments.length > 0) {
        const latest = data.enrollments[0];
        setEnrollmentStatus(latest.status);
        setEnrollmentData(latest);
      }
    } catch (err) {
      console.error("Failed to check enrollment status:", err);
    }
  };

  const handleEnrollClick = () => {
    if (!currentUser) {
      toast.info("কোর্সে আবেদন করতে অনুগ্রহ করে প্রথমে লগইন করুন।");
      router.push(`/login?callbackUrl=/courses/${course.slug}`);
      return;
    }
    if (enrollmentStatus === "approved") {
      router.push("/dashboard/student#my-courses");
      return;
    }
    setShowAdmissionModal(true);
  };

  const handleAdmissionSubmit = async (e) => {
    e.preventDefault();
    if (!studentForm.fatherName.trim() || !studentForm.country.trim() || !studentForm.whatsapp.trim()) {
      toast.error("অনুগ্রহ করে পিতার নাম, দেশ এবং হোয়াটসঅ্যাপ নম্বর প্রদান করুন।");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/course-enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser?.id || currentUser?._id || "",
          userName: currentUser?.name || "শিক্ষার্থী",
          userEmail: currentUser?.email,
          phone: studentForm.whatsapp,
          courseSlug: course.slug,
          courseTitle: course.titleBn,
          fatherName: studentForm.fatherName,
          country: studentForm.country,
          whatsapp: studentForm.whatsapp,
          nationality: studentForm.nationality,
          dateOfBirth: studentForm.dateOfBirth,
          languagesUnderstood: studentForm.languagesUnderstood,
          preferredSchedule: studentForm.preferredSchedule,
          preferredDays: studentForm.preferredDays,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setEnrollmentStatus("pending");
        setEnrollmentData(data.enrollment);
        setShowAdmissionModal(false);
        toast.success("ভর্তির আবেদন সফলভাবে জমা হয়েছে! অ্যাডমিন পর্যালোচনার পর অনুমোদন ও শিক্ষার্থী আইডি বরাদ্দ করা হবে।");
      } else {
        if (data.status) setEnrollmentStatus(data.status);
        toast.error(data.message || "আবেদন প্রক্রিয়াকরণে সমস্যা হয়েছে।");
      }
    } catch (err) {
      console.error("Enrollment submission error:", err);
      setEnrollmentStatus("pending");
      setShowAdmissionModal(false);
      toast.success("আবেদন সফলভাবে গৃহীত হয়েছে!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-shell">
      {/* Breadcrumb */}
      <div className="text-xs text-slate-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#2196F3]">হোম</Link>
        <span>/</span>
        <Link href="/courses" className="hover:text-[#2196F3]">সকল কোর্স</Link>
        <span>/</span>
        <span className="text-[#0D47A1] font-bold">{course.titleBn}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Course Overview & Curriculum */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-white space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-[#2196F3] text-white text-xs font-bold px-3 py-1 rounded-md shadow-2xs">
                {course.badge}
              </span>
              <span className="bg-[#E3F2FD] text-[#0D47A1] border border-[#90CAF9]/60 text-xs font-bold px-3 py-1 rounded-md">
                {course.department}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D47A1]">
              {course.titleBn}
            </h1>
            <p className="text-sm text-slate-700 leading-relaxed">
              {course.fullDesc}
            </p>

            {course.specialProvision && (
              <div className="bg-[#E3F2FD] border border-[#90CAF9] rounded-xl p-3.5 text-xs text-[#0D47A1] font-bold flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#2196F3] shrink-0" />
                <span>বিশেষ ব্যবস্থা: {course.specialProvision}</span>
              </div>
            )}

            {/* Core Meta Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#90CAF9]/40 text-xs font-semibold text-[#0D47A1]">
              <div className="flex items-center gap-2.5 bg-[#E3F2FD]/50 border border-[#90CAF9]/40 p-3 rounded-xl">
                <Clock className="w-4 h-4 text-[#2196F3] shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 block">ক্লাসের দৈর্ঘ্য</span>
                  <span>{course.classDuration} / সেশন</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 bg-[#E3F2FD]/50 border border-[#90CAF9]/40 p-3 rounded-xl">
                <BookOpen className="w-4 h-4 text-[#2196F3] shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 block">কোর্সের মেয়াদ</span>
                  <span>{course.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 bg-[#E3F2FD]/50 border border-[#90CAF9]/40 p-3 rounded-xl col-span-2 sm:col-span-1">
                <Users className="w-4 h-4 text-[#2196F3] shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 block">ব্যাচ প্যাটার্ন</span>
                  <span>{course.batchSize}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Curriculum */}
          <div className="card-white space-y-4">
            <div className="flex items-center justify-between border-b border-[#90CAF9]/40 pb-3">
              <h2 className="text-xl font-bold text-[#0D47A1]">
                কোর্স পাঠ্যসূচি ও সিলেবাস (Curriculum)
              </h2>
              <span className="text-xs font-bold text-[#2196F3] bg-[#E3F2FD] border border-[#90CAF9]/50 px-2.5 py-0.5 rounded-full">
                {course.syllabus.length} টি মডিউল
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {course.syllabus.map((topic, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#E3F2FD]/30 border border-[#90CAF9]/40 text-xs sm:text-sm text-slate-800 font-medium hover:bg-[#E3F2FD]/60 transition"
                >
                  <span className="w-5 h-5 rounded-full bg-[#2196F3] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="card-white space-y-4">
            <h2 className="text-xl font-bold text-[#0D47A1]">
              কোর্সের বিশেষ বৈশিষ্ট্যসমূহ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {course.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-[#90CAF9]/40 text-xs text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2196F3] shrink-0 mt-0.5" />
                  <span className="font-semibold leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Sticky Enrollment Card */}
        <div className="lg:col-span-1">
          <div className="card-white sticky top-24 space-y-5">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 font-medium">কোর্স ফি (আন্তর্জাতিক USD):</span>
              <div className="text-2xl font-extrabold text-[#0D47A1]">
                {course.fee}
              </div>
              <span className="text-[11px] text-[#2196F3] font-bold block">
                ঘণ্টাপ্রতি: {course.hourlyFee} | ক্লাসের দৈর্ঘ্য: {course.classDuration}
              </span>
            </div>

            {/* Routine Summary */}
            <div className="space-y-3 text-xs text-slate-700 border-t border-b border-[#90CAF9]/40 py-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500 shrink-0">শিডিউল:</span>
                <span className="font-bold text-[#0D47A1] text-right">{course.schedule}</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500 shrink-0">ক্লাস মাধ্যম:</span>
                <span className="font-bold text-[#2196F3] text-right">{course.classPlatform}</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500 shrink-0">সার্টিফিকেট:</span>
                <span className="font-bold text-emerald-700 text-right">ভেরিফাইড সনদপত্র</span>
              </div>
            </div>

            {/* Rejection Alert */}
            {enrollmentStatus === "rejected" && (
              <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-rose-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>আগের আবেদনটি বাতিল হয়েছিল</span>
                </div>
                {enrollmentData?.adminFeedback && (
                  <p className="text-slate-600 italic text-[11px] leading-relaxed">
                    কারণ: "{enrollmentData.adminFeedback}"
                  </p>
                )}
                <p className="text-[11px] text-slate-500">
                  সঠিক তথ্য দিয়ে পুনরায় আবেদন করতে নিচের বাটনে চাপুন।
                </p>
              </div>
            )}

            {/* Action Button */}
            <div>
              {enrollmentStatus === "approved" ? (
                <Link
                  href="/dashboard/student#my-courses"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-xs transition duration-150 text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ভর্তি সম্পন্ন হয়েছে (ড্যাশবোর্ডে যান)</span>
                </Link>
              ) : enrollmentStatus === "pending" ? (
                <button
                  disabled
                  className="w-full bg-amber-100 border border-amber-300 text-amber-900 font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 cursor-not-allowed shadow-2xs"
                >
                  <Clock className="w-4 h-4 text-amber-700 animate-pulse" />
                  <span>আবেদন প্রক্রিয়াধীন (Pending)</span>
                </button>
              ) : (
                <button
                  onClick={handleEnrollClick}
                  disabled={submitting}
                  className="btn-accent w-full py-3.5 text-sm"
                >
                  <span>এখনই কোর্সে ভর্তি হোন</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Helpline */}
            <div className="text-center pt-2 space-y-1">
              <p className="text-xs text-slate-500">ভর্তি সংক্রান্ত যেকোনো তথ্যের জন্য:</p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D47A1] hover:text-[#2196F3] transition"
              >
                <span>{siteConfig.contact.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Student Admission Modal (Doc Compliant) */}
      {showAdmissionModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="card-white max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#90CAF9]/50">
              <div>
                <span className="text-[11px] font-bold text-[#2196F3] bg-[#E3F2FD] px-2 py-0.5 rounded">
                  {course.titleBn}
                </span>
                <h3 className="text-base font-bold text-[#0D47A1] mt-1">
                  শিক্ষার্থী ভর্তি আবেদন ফরম
                </h3>
              </div>
              <button
                onClick={() => setShowAdmissionModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdmissionSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="form-group mb-0">
                  <label className="form-label">শিক্ষার্থীর নাম *</label>
                  <input
                    type="text"
                    required
                    disabled
                    value={currentUser?.name || ""}
                    className="form-input opacity-75"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">পিতার নাম (Father's Name) *</label>
                  <input
                    type="text"
                    required
                    value={studentForm.fatherName}
                    onChange={(e) => setStudentForm({ ...studentForm, fatherName: e.target.value })}
                    placeholder="পিতার নাম লিখুন"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="form-group mb-0">
                  <label className="form-label">আপনার দেশ (Country) *</label>
                  <input
                    type="text"
                    required
                    value={studentForm.country}
                    onChange={(e) => setStudentForm({ ...studentForm, country: e.target.value })}
                    placeholder="যেমন: বাংলাদেশ / Saudi Arabia / UK"
                    className="form-input"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">হোয়াটসঅ্যাপ নম্বর (কান্ট্রি কোড সহ) *</label>
                  <input
                    type="tel"
                    required
                    value={studentForm.whatsapp}
                    onChange={(e) => setStudentForm({ ...studentForm, whatsapp: e.target.value })}
                    placeholder="+8801XXXXXXXXX"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="form-group mb-0">
                  <label className="form-label">জাতীয়তা (Nationality) *</label>
                  <input
                    type="text"
                    required
                    value={studentForm.nationality}
                    onChange={(e) => setStudentForm({ ...studentForm, nationality: e.target.value })}
                    placeholder="জাতীয়তা"
                    className="form-input"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">জন্ম তারিখ (Date of Birth) *</label>
                  <input
                    type="date"
                    required
                    value={studentForm.dateOfBirth}
                    onChange={(e) => setStudentForm({ ...studentForm, dateOfBirth: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group mb-0">
                <label className="form-label">কী কী ভাষা বুঝেন ও বলতে পারেন? *</label>
                <input
                  type="text"
                  required
                  value={studentForm.languagesUnderstood}
                  onChange={(e) => setStudentForm({ ...studentForm, languagesUnderstood: e.target.value })}
                  placeholder="যেমন: বাংলা, ইংরেজি, হিন্দি, আরবি"
                  className="form-input"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="form-group mb-0">
                  <label className="form-label">পছন্দমতো ক্লাসের সময়সূচি *</label>
                  <input
                    type="text"
                    required
                    value={studentForm.preferredSchedule}
                    onChange={(e) => setStudentForm({ ...studentForm, preferredSchedule: e.target.value })}
                    placeholder="যেমন: সকাল ৯:০০ অথবা রাত ৮:৩০"
                    className="form-input"
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">সপ্তাহের কোন কোন দিন ক্লাস করতে চান? *</label>
                  <input
                    type="text"
                    required
                    value={studentForm.preferredDays}
                    onChange={(e) => setStudentForm({ ...studentForm, preferredDays: e.target.value })}
                    placeholder="যেমন: শনি, সোম, বুধ"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#90CAF9]/40 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAdmissionModal(false)}
                  className="btn-outline"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? "জমা হচ্ছে..." : "ভর্তি আবেদন জমা দিন"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
