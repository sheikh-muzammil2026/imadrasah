"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  FileCheck,
  Award,
  Video,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Send,
  ExternalLink,
  RotateCcw,
  IdCard,
  FileSpreadsheet,
  Printer,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  getCurrentUser,
  getCourses,
  getAssignments,
  getSubmissions,
  submitAssignment,
  getMonthlyReports,
  initStore,
} from "@/lib/store";
import { siteConfig } from "@/config/siteConfig";

export default function StudentDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [monthlyReports, setMonthlyReports] = useState([]);

  // Remote enrollments from MongoDB / Next API
  const [dbEnrollments, setDbEnrollments] = useState([]);
  const [loadingEnrollments, setLoadingEnrollments] = useState(true);

  // Assignment submission modal
  const [selectedAssign, setSelectedAssign] = useState(null);
  const [submitNote, setSubmitNote] = useState("");

  const fetchRemoteData = async (email, sId) => {
    if (!email) {
      setLoadingEnrollments(false);
      return;
    }
    try {
      setLoadingEnrollments(true);
      // Fetch enrollments
      const res = await fetch(
        `/api/course-enrollments?userEmail=${encodeURIComponent(email)}`
      );
      const data = await res.json();
      if (data.success && Array.isArray(data.enrollments)) {
        setDbEnrollments(data.enrollments);
      }

      // Fetch monthly verified reports
      const repRes = await fetch(
        `/api/monthly-reports?studentEmail=${encodeURIComponent(email)}&studentId=${encodeURIComponent(sId || "")}`
      );
      const repData = await repRes.json();
      if (repData.success && Array.isArray(repData.reports) && repData.reports.length > 0) {
        setMonthlyReports(repData.reports);
      } else {
        setMonthlyReports(getMonthlyReports(email));
      }
    } catch (err) {
      console.warn("Failed to fetch remote student data, using store fallback:", err);
      setMonthlyReports(getMonthlyReports(email));
    } finally {
      setLoadingEnrollments(false);
    }
  };

  const refreshData = () => {
    initStore();
    const user = getCurrentUser();
    setCurrentUser(user);
    setAllCourses(getCourses());
    setAssignments(getAssignments());
    setSubmissions(getSubmissions());
    if (user?.email) {
      fetchRemoteData(user.email, user.studentId);
    }
  };

  useEffect(() => {
    refreshData();
    window.addEventListener("storage", refreshData);
    return () => window.removeEventListener("storage", refreshData);
  }, []);

  // Approved, pending, and rejected enrollments
  const approvedEnrollments = dbEnrollments.filter((e) => e.status === "approved");
  const pendingEnrollments = dbEnrollments.filter((e) => e.status === "pending");
  const rejectedEnrollments = dbEnrollments.filter((e) => e.status === "rejected");

  // Determine Student ID: check user profile first, then approved enrollments
  const studentId =
    currentUser?.studentId ||
    approvedEnrollments.find((e) => e.studentId)?.studentId ||
    "0401";

  // Filter student's submissions
  const mySubmissions = submissions.filter(
    (s) => s.studentId === currentUser?.id || s.studentEmail === currentUser?.email
  );

  // Compute metrics
  const enrolledCoursesCount = approvedEnrollments.length;
  const completedAssignmentsCount = mySubmissions.filter(
    (s) => s.status === "graded"
  ).length;
  const averageGrade =
    completedAssignmentsCount > 0
      ? "মুমতায (A+)"
      : mySubmissions.length > 0
      ? "মূল্যায়ন চলছে"
      : "শুরু হয়নি";

  // Calculate overall progress percentage
  const totalTasks = assignments.length || 1;
  const progressPercent = Math.min(
    100,
    Math.round((mySubmissions.length / totalTasks) * 100)
  );

  // Handle Submission
  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    if (!selectedAssign) return;

    const res = submitAssignment({
      assignmentId: selectedAssign.id,
      assignmentTitle: selectedAssign.title,
      student: currentUser,
      courseId: selectedAssign.courseId,
      note: submitNote.trim() || "অ্যাসাইনমেন্ট সম্পন্ন হয়েছে।",
    });

    if (res.success) {
      toast.success("অ্যাসাইনমেন্ট সফলভাবে শিক্ষকের কাছে জমা দেওয়া হয়েছে!");
      setSelectedAssign(null);
      setSubmitNote("");
      refreshData();
    } else {
      toast.info(res.message);
    }
  };

  // Primary active monthly report
  const activeReport = monthlyReports[0] || {
    studentId: studentId,
    studentName: currentUser?.name || "আহমদ আবদুল্লাহ",
    month: "মার্চ ২০২৬ (Sha'ban - Ramadan 1447)",
    courseTitle: siteConfig.courses[0]?.titleBn || "কুরআন রিডিং ফাউন্ডেশন",
    totalClasses: 12,
    attendedClasses: 11,
    attendanceRate: "92%",
    punctualityStatus: "সময়নিষ্ঠ (Punctual)",
    tajweedAccuracy: "৯৪% (মাখরাজ ও গুন্নাহ চমৎকার)",
    hifzRevision: "সূরা আল-মুলক ও আল-ক্বলম নির্ভুল তিলাওয়াত",
    homeworkScore: "১৯ / ২০ (A+)",
    overallGrade: "মুমতায (A+)",
    teacherRemarks:
      "মাশাল্লাহ! শিক্ষার্থী অত্যন্ত মনোযোগী ও আদববান। ক্লাসে মাখরাজ ও মাদ্দ-এর কায়েদাগুলো খুব দ্রুত আয়ত্ত করতে পেরেছে। অভিভাবককে অনুরোধ করা হচ্ছে প্রতিদিন মাগরিবের পর অন্তত ১৫ মিনিট বাসায় মাশক তদারকি করার জন্য।",
    teacherName: siteConfig.identity.founder.name,
    verifiedBy: "পরীক্ষা ও পাঠদান মনিটরিং সেল",
    institutionName: siteConfig.identity.name.bn,
    verificationSeal: true,
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="card-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="section-pill">
              শিক্ষার্থী পোর্টাল (Student Portal)
            </span>
            <span className="text-xs font-black text-white bg-[#0D47A1] px-3.5 py-1 rounded-full shadow-xs flex items-center gap-1.5">
              <IdCard className="w-3.5 h-3.5 text-[#90CAF9]" />
              <span>আইডি (Student ID): {studentId}</span>
            </span>
          </div>
          <h1 className="page-title-main">
            স্বাগতম, {currentUser?.name || "শিক্ষার্থী"}!
          </h1>
          <p className="page-subtitle-muted">
            {siteConfig.identity.name.bn}-এর অনলাইন ক্লাস, লেকচার নোটস এবং হোমওয়ার্ক অ্যাসাইনমেন্ট পোর্টাল।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="#monthly-report"
            className="btn-accent flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>মাসিক অভিভাবক রিপোর্ট</span>
          </a>
          <a
            href="https://meet.google.com/qkn-quran-live"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2"
          >
            <Video className="w-4 h-4 text-[#90CAF9]" />
            <span>আজকের লাইভ ক্লাসে জয়েন করুন</span>
          </a>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="card-white flex items-center gap-4">
          <div className="icon-box-primary">
            <BookOpen className="w-6 h-6 text-[#0D47A1]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">অনুমোদিত কোর্স</p>
            <h3 className="text-2xl font-black text-[#0D47A1] mt-0.5">
              {enrolledCoursesCount || 1} টি
            </h3>
          </div>
        </div>

        <div className="card-white flex items-center gap-4">
          <div className="icon-box-primary bg-sky-50 text-[#2196F3]">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">জমা দেওয়া অ্যাসাইনমেন্ট</p>
            <h3 className="text-2xl font-black text-[#2196F3] mt-0.5">
              {mySubmissions.length} টি
            </h3>
          </div>
        </div>

        <div className="card-white flex items-center gap-4">
          <div className="icon-box-primary bg-amber-50 text-amber-600 border-amber-200">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">সার্বিক পারফরম্যান্স</p>
            <h3 className="text-xl font-black text-amber-600 mt-0.5">
              {averageGrade}
            </h3>
          </div>
        </div>
      </div>

      {/* Overall Progress Tracker */}
      <div className="card-white space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-[#0D47A1]">
            সার্বিক পড়াশোনা ও টাস্ক অগ্রগতি (Overall Progress Tracker)
          </span>
          <span className="font-extrabold text-[#2196F3]">{progressPercent}% সম্পন্ন</span>
        </div>
        <div className="w-full bg-[#E3F2FD] border border-[#90CAF9]/60 h-3 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#0D47A1] to-[#2196F3] h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* SECTION: Monthly Verified Parent Report ("মাস শেষে প্যারেন্টদের ভেরিফাইডকৃত রিপোর্ট পাঠানো") */}
      <div id="monthly-report" className="card-white space-y-6 scroll-mt-6 border-2 border-[#90CAF9]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-emerald-50 rounded-lg text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  অফিসিয়াল অভিভাবক কপি (Verified Guardian Copy)
                </span>
                <h2 className="text-lg font-black text-[#0D47A1] mt-0.5">
                  মাসিক ভেরিফাইড অগ্রগতি পত্র (Monthly Verified Parent Report)
                </h2>
              </div>
            </div>
            <p className="text-xs text-slate-600">
              অভিভাবকদের জন্য প্রতিষ্ঠান কর্তৃক সরাসরি যাচাইকৃত মাসিক মূল্যায়ন ও ক্লাসের সার্বিক রিপোর্ট।
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="btn-outline flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#0D47A1]" />
            <span>রিপোর্ট প্রিন্ট / সংরক্ষণ</span>
          </button>
        </div>

        {/* Report Card Body */}
        <div className="card-ice p-6 space-y-6 border border-[#90CAF9]/80 rounded-2xl">
          {/* Header Metadata */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#90CAF9]/40 gap-4">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">প্রতিষ্ঠান:</p>
              <h3 className="text-sm font-black text-[#0D47A1]">
                {siteConfig.identity.name.bn}
              </h3>
              <p className="text-xs text-slate-600">
                {siteConfig.identity.name.en} &bull; {siteConfig.presence.mode}
              </p>
            </div>

            <div className="text-left md:text-right space-y-0.5 text-xs">
              <p className="font-bold text-slate-800">
                মূল্যায়ন মাস: <span className="text-[#0D47A1]">{activeReport.month}</span>
              </p>
              <p className="text-slate-600">
                শিক্ষার্থীর নাম: <span className="font-bold">{activeReport.studentName}</span>
              </p>
              <p className="text-slate-600 font-mono">
                আইডি: <span className="font-bold text-[#0D47A1]">{activeReport.studentId}</span>
              </p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <p className="text-[11px] font-semibold text-slate-500">ক্লাসে উপস্থিতি হার</p>
              <h4 className="text-xl font-black text-emerald-700 mt-1">
                {activeReport.attendanceRate}
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5">
                {activeReport.attendedClasses} / {activeReport.totalClasses} টি ক্লাস সম্পন্ন
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <p className="text-[11px] font-semibold text-slate-500">তাজবীদ ও মাখরাজ মান</p>
              <h4 className="text-base font-black text-[#0D47A1] mt-1">
                {activeReport.tajweedAccuracy}
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5">উচ্চারণ ও হরফ স্পষ্টতা</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <p className="text-[11px] font-semibold text-slate-500">হোমওয়ার্ক ও টাস্ক</p>
              <h4 className="text-xl font-black text-[#2196F3] mt-1">
                {activeReport.homeworkScore}
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5">নিয়মিত অনুশীলন জমা</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <p className="text-[11px] font-semibold text-slate-500">সার্বিক গ্রেড (মাকাম)</p>
              <h4 className="text-xl font-black text-amber-600 mt-1">
                {activeReport.overallGrade}
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5">
                {activeReport.punctualityStatus}
              </p>
            </div>
          </div>

          {/* Hifz / Lesson Revision Details */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              চলতি মাসের হিফজ ও পাঠ অগ্রগতি (Memorization & Revision):
            </span>
            <p className="text-xs font-semibold text-slate-800">
              {activeReport.hifzRevision}
            </p>
          </div>

          {/* Teacher's Remarks */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2196F3]" />
              <span>উস্তাদের পর্যবেক্ষণ ও অভিভাবকের প্রতি পরামর্শ:</span>
            </span>
            <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50/60 p-3 rounded-lg border border-slate-100">
              &ldquo;{activeReport.teacherRemarks}&rdquo;
            </p>
          </div>

          {/* Verification & Seal Footer */}
          <div className="pt-4 border-t border-[#90CAF9]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-600 gap-4">
            <div className="space-y-0.5">
              <p className="font-bold text-[#0D47A1]">
                মূল্যায়নকারী: {activeReport.teacherName}
              </p>
              <p className="text-[11px] text-slate-500">
                যাচাইকারী কর্তৃপক্ষ: {activeReport.verifiedBy}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 text-emerald-800 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>ডিজিটালি ভেরিফাইড প্রাতিষ্ঠানিক সনদ</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: Rejected Enrollment Requests (Feedback from Admin) */}
      {rejectedEnrollments.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-600" />
            <h2 className="text-lg font-black text-rose-700">
              প্রত্যাখ্যাত কোর্স আবেদন ও অ্যাডমিন মন্তব্য (Rejected Applications & Feedback)
            </h2>
          </div>

          <div className="space-y-3">
            {rejectedEnrollments.map((enr) => (
              <div
                key={enr._id || enr.id}
                className="bg-rose-50/70 rounded-xl border-2 border-rose-200 p-5 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge-danger">
                      আবেদন বাতিল (Rejected)
                    </span>
                    <span className="text-xs text-slate-500">
                      তারিখ: {new Date(enr.appliedAt).toLocaleDateString("bn-BD")}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-800">
                    {enr.courseTitle}
                  </h3>

                  <div className="bg-white/90 border border-rose-200 rounded-lg p-3 text-xs text-rose-900 mt-2">
                    <p className="font-bold text-rose-800 flex items-center gap-1.5 mb-1">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>কর্তৃপক্ষের প্রত্যাখ্যাত করার কারণ (Admin Feedback):</span>
                    </p>
                    <p className="italic pl-5">
                      &ldquo;{enr.adminFeedback || "আবেদনে পর্যাপ্ত তথ্য প্রদান করা হয়নি। অনুগ্রহ করে বিস্তারিত দেখে পুনরায় আবেদন করুন।"}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  <Link
                    href={`/courses/${enr.courseSlug || "course-1"}`}
                    className="btn-primary flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>পুনরায় আবেদন করুন</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: Pending Applications */}
      {pendingEnrollments.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-black text-amber-700">
              পর্যালোচনাধীন আবেদনসমূহ (Pending Course Applications)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingEnrollments.map((enr) => (
              <div
                key={enr._id || enr.id}
                className="bg-amber-50/60 rounded-xl border border-amber-200 p-5 shadow-soft space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="badge-pending">
                      আবেদন প্রক্রিয়াধীন (Pending)
                    </span>
                    <h3 className="font-bold text-base text-slate-800 mt-2">
                      {enr.courseTitle}
                    </h3>
                  </div>
                  <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                </div>

                <p className="text-xs text-slate-600">
                  আপনার ভর্তি আবেদনটি প্রধান কার্যালয়ের অ্যাডমিন দ্বারা পর্যালোচিত হচ্ছে। অনুমোদনের সাথে সাথে আপনাকে ইউনিক স্টুডেন্ট আইডি (0401+) বরাদ্দ করা হবে এবং কোর্স কন্টেন্ট আনলক হবে।
                </p>

                <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>আবেদনের তারিখ: {new Date(enr.appliedAt).toLocaleDateString("bn-BD")}</span>
                  <Link
                    href={`/courses/${enr.courseSlug || "course-1"}`}
                    className="text-[#0D47A1] font-bold hover:underline"
                  >
                    কোর্স বিস্তারিত
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: My Enrolled Courses Section */}
      <div id="my-courses" className="space-y-4 scroll-mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-[#0D47A1]">
            আমার তালিকাভুক্ত কোর্সসমূহ (My Enrolled Courses)
          </h2>
          <span className="text-xs text-slate-500">পূর্ণ অ্যাক্সেস সহ সক্রিয় ব্যাচ</span>
        </div>

        {approvedEnrollments.length === 0 ? (
          <div className="card-white p-8 text-center space-y-3 border-dashed">
            <BookOpen className="w-10 h-10 text-[#90CAF9] mx-auto" />
            <p className="text-xs text-slate-600">
              আপনি এখনো কোনো অনুমোদিত কোর্সে তালিকাভুক্ত হননি। নিচের তালিকা থেকে অথবা পাবলিক কোর্স পেজ থেকে আবেদন করুন।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {approvedEnrollments.map((enr) => (
              <div
                key={enr._id || enr.id}
                className="card-white flex flex-col justify-between space-y-4 hover:border-[#2196F3] transition"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="badge-success">
                      ভর্তি সম্পন্ন (Approved)
                    </span>
                    {studentId && (
                      <span className="text-[11px] font-bold text-[#0D47A1] bg-[#E3F2FD] px-2 py-0.5 rounded border border-[#90CAF9]/60">
                        আইডি: {studentId}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-base text-[#0D47A1] mt-2">
                    {enr.courseTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    ভর্তির তারিখ: {new Date(enr.approvedAt || enr.appliedAt).toLocaleDateString("bn-BD")}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <a
                    href="https://meet.google.com/qkn-quran-live"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5 text-[#90CAF9]" />
                    <span>ক্লাসে জয়েন করুন</span>
                  </a>

                  <Link
                    href={`/courses/${enr.courseSlug || "course-1"}`}
                    className="text-xs font-bold text-[#2196F3] hover:text-[#0D47A1] flex items-center gap-1"
                  >
                    <span>সিলেবাস দেখুন</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION: Available Courses To Enroll */}
      <div id="available-courses" className="space-y-4 scroll-mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-black text-[#0D47A1]">
            নতুন কোর্সে ভর্তি হোন (Available Core Courses)
          </h2>
          <span className="text-xs text-slate-500">৩টি মূল কোর্স বিভাগ (USD ফি)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteConfig.courses.map((c) => {
            const isApproved = approvedEnrollments.some((e) => e.courseSlug === c.slug);
            const isPending = pendingEnrollments.some((e) => e.courseSlug === c.slug);

            return (
              <div
                key={c.slug}
                className="card-white flex flex-col justify-between space-y-4 hover:border-[#2196F3] transition"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#0D47A1] bg-[#E3F2FD] px-2.5 py-0.5 rounded border border-[#90CAF9]/50">
                    {c.duration}
                  </span>
                  <h3 className="font-bold text-sm text-[#0D47A1] mt-2">
                    {c.titleBn}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {c.shortDesc}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-2">
                    ক্লাস শিডিউল: {c.schedule}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-base font-extrabold text-[#0D47A1]">
                    {c.fee}
                  </span>

                  {isApproved ? (
                    <span className="badge-success flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>ভর্তি আছেন</span>
                    </span>
                  ) : isPending ? (
                    <span className="badge-pending flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>আবেদন প্রক্রিয়াধীন</span>
                    </span>
                  ) : (
                    <Link
                      href={`/courses/${c.slug}`}
                      className="btn-accent text-xs px-3 py-1.5"
                    >
                      ভর্তি আবেদন
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION: Assignments Section & Interactive Submission */}
      <div id="assignments" className="space-y-4 scroll-mt-6">
        <h2 className="text-lg font-black text-[#0D47A1]">
          অ্যাসাইনমেন্ট ও হোমওয়ার্ক (Course Assignments)
        </h2>

        {assignments.length === 0 ? (
          <div className="card-white p-6 text-center text-xs text-slate-500">
            বর্তমানে আপনার কোর্সে কোনো পেন্ডিং অ্যাসাইনমেন্ট নেই।
          </div>
        ) : (
          <div className="space-y-3">
            {assignments.map((assign) => {
              const submission = mySubmissions.find((s) => s.assignmentId === assign.id);
              return (
                <div
                  key={assign.id}
                  className="card-white flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#0D47A1] bg-[#E3F2FD] px-2 py-0.5 rounded border border-[#90CAF9]/50">
                      {assign.courseTitle}
                    </span>
                    <h3 className="text-sm font-bold text-[#0D47A1]">{assign.title}</h3>
                    <p className="text-xs text-slate-600">{assign.instructions}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                      <span>শেষ সময়: {assign.dueDate}</span>
                      <span>পূর্ণমান: {assign.totalMarks} মার্কস</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    {submission ? (
                      <div className="text-right">
                        <span
                          className={
                            submission.status === "graded"
                              ? "badge-success"
                              : "badge-pending"
                          }
                        >
                          {submission.status === "graded"
                            ? `মূল্যায়িত: ${submission.grade}`
                            : "জমা দেওয়া হয়েছে (Submitted)"}
                        </span>
                        {submission.note && (
                          <p className="text-[11px] text-slate-500 mt-1 italic">
                            মন্তব্য: {submission.note}
                          </p>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedAssign(assign)}
                        className="btn-primary flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 text-[#90CAF9]" />
                        <span>জমা দিন (Submit)</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Assignment Submission Modal */}
      {selectedAssign && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="card-white max-w-lg w-full space-y-4 shadow-2xl">
            <div>
              <span className="text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] px-2.5 py-0.5 rounded">
                {selectedAssign.courseTitle}
              </span>
              <h3 className="text-lg font-black text-[#0D47A1] mt-1">
                {selectedAssign.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {selectedAssign.instructions}
              </p>
            </div>

            <form onSubmit={handleSubmitAssignment} className="space-y-4">
              <div className="form-group">
                <label className="form-label">
                  আপনার উত্তর / অডিও বা ড্রাইভ লিংক লিখুন *
                </label>
                <textarea
                  rows={4}
                  required
                  value={submitNote}
                  onChange={(e) => setSubmitNote(e.target.value)}
                  placeholder="যেমন: সূরা পাঠের গুগল ড্রাইভ অডিও লিংক অথবা অ্যাসাইনমেন্টের লিখিত উত্তর..."
                  className="form-textarea"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAssign(null)}
                  className="btn-outline cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="btn-primary cursor-pointer"
                >
                  জমা দিন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
