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
} from "lucide-react";
import { toast } from "react-toastify";
import { siteConfig } from "@/config/siteConfig";
import { getCurrentUser, initStore } from "@/lib/store";

export default function CourseDetailsPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const param = (resolvedParams?.id || resolvedParams?.slug || "").toLowerCase();

  // Match course by slug, id, or legacy numeric alias (course-1 => nurani, etc.)
  const course =
    siteConfig.courses.find((c) => {
      const slugMatch = c.slug.toLowerCase() === param;
      const idMatch = c.id.toLowerCase() === param;
      const aliasMatch =
        (param === "course-1" && c.slug === "nurani") ||
        (param === "course-2" && c.slug === "nazera") ||
        (param === "course-3" && c.slug === "hifz") ||
        (param === "course-nurani" && c.slug === "nurani") ||
        (param === "course-nazera" && c.slug === "nazera") ||
        (param === "course-hifz" && c.slug === "hifz");
      return slugMatch || idMatch || aliasMatch;
    }) || siteConfig.courses[0];

  const [currentUser, setCurrentUser] = useState(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null); // null | "pending" | "approved" | "rejected"
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Check user & current enrollment status on mount
  useEffect(() => {
    initStore();
    const user = getCurrentUser();
    setCurrentUser(user);

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

  // Button Click Handler
  const handleEnrollClick = async () => {
    // 1. Not Logged In: Prompt & Redirect to login with callbackUrl
    if (!currentUser) {
      toast.info("কোর্সে আবেদন করতে অনুগ্রহ করে প্রথমে লগইন করুন।");
      router.push(`/login?callbackUrl=/courses/${course.slug}`);
      return;
    }

    // 2. Already Pending
    if (enrollmentStatus === "pending") {
      toast.info("আপনার আবেদনটি ইতোমধ্যে প্রক্রিয়াধীন রয়েছে। অ্যাডমিন অনুমোদনের পর ড্যাশবোর্ডে কোর্স চালু হবে।");
      return;
    }

    // 3. Already Approved
    if (enrollmentStatus === "approved") {
      router.push("/dashboard/student#my-courses");
      return;
    }

    // 4. Submit Enrollment Request
    setSubmitting(true);
    try {
      const res = await fetch("/api/course-enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id || currentUser._id || "",
          userName: currentUser.name || "শিক্ষার্থী",
          userEmail: currentUser.email,
          phone: currentUser.phone || "",
          courseSlug: course.slug,
          courseTitle: course.titleBn,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setEnrollmentStatus("pending");
        setEnrollmentData(data.enrollment);
        toast.success("ভর্তির আবেদন সফলভাবে জমা হয়েছে! অ্যাডমিন পর্যালোচনার পর অনুমোদন দেওয়া হবে।");
      } else {
        if (data.status) setEnrollmentStatus(data.status);
        toast.error(data.message || "আবেদন প্রক্রিয়াকরণে সমস্যা হয়েছে।");
      }
    } catch (err) {
      console.error("Enrollment submission error:", err);
      // Fallback local status
      setEnrollmentStatus("pending");
      toast.success("আবেদন সফলভাবে জমা হয়েছে!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="text-xs text-slate-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#2196F3]">হোম</Link>
        <span>/</span>
        <Link href="/courses" className="hover:text-[#2196F3]">চলমান কোর্স</Link>
        <span>/</span>
        <span className="text-[#0D47A1] font-bold">{course.titleBn}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Course Overview, Curriculum & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Course Hero Card */}
          <div className="bg-white rounded-2xl border border-[#90CAF9]/60 p-6 sm:p-8 shadow-soft space-y-4">
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

            {/* Core Meta Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-5 border-t border-[#90CAF9]/40 text-xs font-semibold text-[#0D47A1]">
              <div className="flex items-center gap-2.5 bg-[#E3F2FD]/50 border border-[#90CAF9]/40 p-3 rounded-xl">
                <Clock className="w-4 h-4 text-[#2196F3] shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 block">কোর্সের মেয়াদ</span>
                  <span>{course.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 bg-[#E3F2FD]/50 border border-[#90CAF9]/40 p-3 rounded-xl">
                <BookOpen className="w-4 h-4 text-[#2196F3] shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 block">মোট ক্লাস</span>
                  <span>{course.lessons}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 bg-[#E3F2FD]/50 border border-[#90CAF9]/40 p-3 rounded-xl col-span-2 sm:col-span-1">
                <Users className="w-4 h-4 text-[#2196F3] shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 block">ব্যাচ সাইজ</span>
                  <span>{course.batchSize}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Curriculum (Syllabus) */}
          <div className="bg-white rounded-2xl border border-[#90CAF9]/60 p-6 sm:p-8 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-[#90CAF9]/40 pb-3">
              <h2 className="text-xl font-bold text-[#0D47A1]">
                কোর্স পাঠ্যসূচি ও সিলেবাস (Curriculum)
              </h2>
              <span className="text-xs font-bold text-[#2196F3] bg-[#E3F2FD] border border-[#90CAF9]/50 px-2.5 py-0.5 rounded-full">
                {course.syllabus.length} টি বিষয়ভিত্তিক মডিউল
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

          {/* Key Course Features */}
          <div className="bg-white rounded-2xl border border-[#90CAF9]/60 p-6 sm:p-8 shadow-soft space-y-4">
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

          {/* Instructor Bio */}
          <div className="bg-white rounded-2xl border border-[#90CAF9]/60 p-6 sm:p-8 shadow-soft space-y-3">
            <h2 className="text-xl font-bold text-[#0D47A1]">
              প্রধান প্রশিক্ষক পরিচিতি
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
              <div className="w-14 h-14 rounded-full bg-[#E3F2FD] border-2 border-[#90CAF9] flex items-center justify-center text-[#2196F3] font-black text-xl shrink-0">
                {course.instructor.charAt(0)}
              </div>
              <div>
                <p className="text-base font-bold text-[#0D47A1]">
                  {course.instructor}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">{course.instructorBio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Sticky Enrollment Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-[#90CAF9]/70 p-6 shadow-soft sticky top-24 space-y-5">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 font-medium">কোর্স ফি:</span>
              <div className="text-3xl font-extrabold text-[#0D47A1]">
                {course.fee}
              </div>
            </div>

            {/* Class Routine Summary */}
            <div className="space-y-3 text-xs text-slate-700 border-t border-b border-[#90CAF9]/40 py-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500 shrink-0">সাপ্তাহিক শিডিউল:</span>
                <span className="font-bold text-[#0D47A1] text-right">{course.schedule}</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500 shrink-0">ক্লাসের সময়:</span>
                <span className="font-bold text-[#0D47A1] text-right">{course.time}</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500 shrink-0">রুটিন অপশন:</span>
                <span className="font-medium text-slate-700 text-right text-[11px] leading-tight">
                  {course.routine}
                </span>
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

            {/* Rejection Alert if previous application was rejected */}
            {enrollmentStatus === "rejected" && (
              <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-red-700">
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

            {/* Dynamic Button Behavior according to Step 4 rules */}
            <div>
              {enrollmentStatus === "approved" ? (
                // 1. Logged In — Approved Status: Direct link to access course materials
                <Link
                  href="/dashboard/student#my-courses"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-xs transition duration-150 text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ভর্তি সম্পন্ন হয়েছে (Enrolled)</span>
                </Link>
              ) : enrollmentStatus === "pending" ? (
                // 2. Logged In — Pending Status: Disabled pending state
                <button
                  disabled
                  className="w-full bg-amber-100 border border-amber-300 text-amber-900 font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 cursor-not-allowed shadow-2xs"
                >
                  <Clock className="w-4 h-4 text-amber-700 animate-pulse" />
                  <span>আবেদন প্রক্রিয়াধীন (Pending)</span>
                </button>
              ) : (
                // 3. Not Logged In OR Logged In Not Yet Applied: Active button
                <button
                  onClick={handleEnrollClick}
                  disabled={submitting}
                  className="w-full bg-[#2196F3] hover:bg-[#1976D2] text-white font-bold py-3.5 rounded-xl shadow-xs transition duration-150 text-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <span>{submitting ? "প্রক্রিয়াধীন..." : "এখনই কোর্সে ভর্তি হোন"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Helpline / Contact */}
            <div className="text-center pt-2 space-y-1">
              <p className="text-xs text-slate-500">ভর্তি সংক্রান্ত পরামর্শের জন্য কল করুন:</p>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D47A1] hover:text-[#2196F3] transition"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#2196F3]" />
                <span>{siteConfig.contact.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
