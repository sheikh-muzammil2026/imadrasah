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
  PlusCircle,
  ExternalLink,
  RotateCcw,
  IdCard,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  getCurrentUser,
  getCourses,
  getAssignments,
  getEnrollments,
  getSubmissions,
  submitAssignment,
  initStore,
} from "@/lib/store";
import { siteConfig } from "@/config/siteConfig";

export default function StudentDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  // Remote enrollments from MongoDB / Next API
  const [dbEnrollments, setDbEnrollments] = useState([]);
  const [loadingEnrollments, setLoadingEnrollments] = useState(true);

  // Assignment submission modal
  const [selectedAssign, setSelectedAssign] = useState(null);
  const [submitNote, setSubmitNote] = useState("");

  const fetchRemoteEnrollments = async (email) => {
    if (!email) {
      setLoadingEnrollments(false);
      return;
    }
    try {
      setLoadingEnrollments(true);
      const res = await fetch(`/api/course-enrollments?userEmail=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.enrollments)) {
        setDbEnrollments(data.enrollments);
      }
    } catch (err) {
      console.warn("Failed to fetch remote enrollments, using store fallback:", err);
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
      fetchRemoteEnrollments(user.email);
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
    null;

  // Filter student's submissions
  const mySubmissions = submissions.filter(
    (s) => s.studentId === currentUser?.id || s.studentEmail === currentUser?.email
  );

  // Compute metrics
  const enrolledCoursesCount = approvedEnrollments.length;
  const completedAssignmentsCount = mySubmissions.filter((s) => s.status === "graded").length;
  const averageGrade =
    completedAssignmentsCount > 0
      ? "A (চমৎকার)"
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

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl border border-[#90CAF9] p-6 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] px-3 py-1 rounded-full border border-[#90CAF9]/60">
              শিক্ষার্থী পোর্টাল (Student Portal)
            </span>
            {studentId ? (
              <span className="text-xs font-black text-white bg-[#0D47A1] px-3.5 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                <IdCard className="w-3.5 h-3.5 text-[#90CAF9]" />
                <span>শিক্ষার্থী আইডি (Student ID): {studentId}</span>
              </span>
            ) : (
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                আইডি: কোর্স অনুমোদনের পর বরাদ্দ হবে (0401+)
              </span>
            )}
          </div>
          <h1 className="text-2xl font-black text-[#0D47A1]">
            স্বাগতম, {currentUser?.name || "শিক্ষার্থী"}!
          </h1>
          <p className="text-xs text-slate-600">
            {siteConfig.identity.name.bn}-এর অনলাইন ক্লাস, লেকচার নোটস এবং হোমওয়ার্ক অ্যাসাইনমেন্ট পোর্টাল।
          </p>
        </div>

        <a
          href="https://meet.google.com/qkn-quran-live"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0D47A1] hover:bg-[#0a3880] text-white text-xs font-bold px-5 py-3 rounded-xl shadow-xs flex items-center gap-2 transition shrink-0"
        >
          <Video className="w-4 h-4 text-[#90CAF9]" />
          <span>আজকের লাইভ ক্লাসে যোগ দিন</span>
        </a>
      </div>

      {/* Overview Cards (Enrolled Courses, Completed Assignments, Average Grade) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl p-5 border border-[#90CAF9]/60 shadow-soft relative overflow-hidden">
          <div className="w-12 h-12 rounded-bl-full bg-[#E3F2FD] absolute top-0 right-0 border-l border-b border-[#90CAF9]/50" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E3F2FD] text-[#0D47A1] flex items-center justify-center font-bold border border-[#90CAF9]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">অনুমোদিত কোর্স (Enrolled)</p>
              <h3 className="text-2xl font-extrabold text-[#0D47A1] mt-0.5">
                {enrolledCoursesCount} টি
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#90CAF9]/60 shadow-soft relative overflow-hidden">
          <div className="w-12 h-12 rounded-bl-full bg-[#E3F2FD] absolute top-0 right-0 border-l border-b border-[#90CAF9]/50" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E3F2FD] text-[#2196F3] flex items-center justify-center font-bold border border-[#90CAF9]">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">জমা দেওয়া অ্যাসাইনমেন্ট</p>
              <h3 className="text-2xl font-extrabold text-[#2196F3] mt-0.5">
                {mySubmissions.length} টি
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#90CAF9]/60 shadow-soft relative overflow-hidden">
          <div className="w-12 h-12 rounded-bl-full bg-amber-50 absolute top-0 right-0 border-l border-b border-amber-200" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold border border-amber-200">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">সার্বিক পারফরম্যান্স</p>
              <h3 className="text-lg font-extrabold text-amber-600 mt-1">
                {averageGrade}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Progress Tracker */}
      <div className="bg-white rounded-xl border border-[#90CAF9]/60 p-5 shadow-soft space-y-2">
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

      {/* SECTION 1: Rejected Enrollment Requests (Feedback from Admin) */}
      {rejectedEnrollments.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-600" />
            <h2 className="text-lg font-bold text-rose-700">
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
                    <span className="text-[11px] font-black text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-md border border-rose-200">
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
                    className="bg-[#0D47A1] hover:bg-[#0a3880] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs flex items-center gap-1.5 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>পুনরায় আবেদন করুন (Re-apply)</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: Pending Applications */}
      {pendingEnrollments.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-amber-700">
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
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
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

      {/* SECTION 3: My Enrolled Courses Section */}
      <div id="my-courses" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#0D47A1]">
            আমার তালিকাভুক্ত কোর্সসমূহ (My Enrolled Courses)
          </h2>
          <span className="text-xs text-slate-500">পূর্ণ অ্যাক্সেস সহ সক্রিয় ব্যাচ</span>
        </div>

        {approvedEnrollments.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-[#90CAF9] p-8 text-center space-y-3">
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
                className="bg-white rounded-xl border border-[#90CAF9] p-5 shadow-soft flex flex-col justify-between space-y-4 hover:border-[#2196F3] transition"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
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

                <div className="pt-3 border-t border-[#90CAF9]/40 flex items-center justify-between gap-3">
                  <a
                    href="https://meet.google.com/qkn-quran-live"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0D47A1] hover:bg-[#0a3880] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition"
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

      {/* SECTION 4: Available Courses To Enroll */}
      <div id="available-courses" className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#0D47A1]">
            নতুন কোর্সে ভর্তি হোন (Available Core Courses)
          </h2>
          <span className="text-xs text-slate-500">৩টি মূল কোর্স বিভাগ</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteConfig.courses.map((c) => {
            const isApproved = approvedEnrollments.some((e) => e.courseSlug === c.slug);
            const isPending = pendingEnrollments.some((e) => e.courseSlug === c.slug);

            return (
              <div
                key={c.slug}
                className="bg-white rounded-xl border border-[#90CAF9]/60 p-5 shadow-soft hover:shadow-card-hover transition duration-200 flex flex-col justify-between space-y-4"
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

                <div className="pt-3 border-t border-[#90CAF9]/40 flex items-center justify-between">
                  <span className="text-base font-extrabold text-[#0D47A1]">
                    {c.fee}
                  </span>

                  {isApproved ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-1 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>ভর্তি আছেন</span>
                    </span>
                  ) : isPending ? (
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg flex items-center gap-1 border border-amber-200">
                      <Clock className="w-3.5 h-3.5" />
                      <span>আবেদন প্রক্রিয়াধীন</span>
                    </span>
                  ) : (
                    <Link
                      href={`/courses/${c.slug}`}
                      className="bg-[#2196F3] hover:bg-[#1976D2] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-2xs transition"
                    >
                      কোর্সে ভর্তি হোন
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 5: Assignments Section & Interactive Submission */}
      <div id="assignments" className="space-y-4">
        <h2 className="text-lg font-bold text-[#0D47A1]">
          অ্যাসাইনমেন্ট ও হোমওয়ার্ক (Course Assignments)
        </h2>

        {assignments.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#90CAF9]/60 p-6 text-center text-xs text-slate-500">
            বর্তমানে আপনার কোর্সে কোনো পেন্ডিং অ্যাসাইনমেন্ট নেই।
          </div>
        ) : (
          <div className="space-y-3">
            {assignments.map((assign) => {
              const submission = mySubmissions.find((s) => s.assignmentId === assign.id);
              return (
                <div
                  key={assign.id}
                  className="bg-white rounded-xl border border-[#90CAF9]/60 p-5 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4"
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
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            submission.status === "graded"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
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
                        className="bg-[#0D47A1] hover:bg-[#0a3880] text-white text-xs font-bold px-4 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-xs"
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
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#90CAF9] space-y-4">
            <div>
              <span className="text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] px-2.5 py-0.5 rounded">
                {selectedAssign.courseTitle}
              </span>
              <h3 className="text-lg font-bold text-[#0D47A1] mt-1">
                {selectedAssign.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {selectedAssign.instructions}
              </p>
            </div>

            <form onSubmit={handleSubmitAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0D47A1] mb-1">
                  আপনার উত্তর / অডিও বা ড্রাইভ লিংক লিখুন
                </label>
                <textarea
                  rows={4}
                  required
                  value={submitNote}
                  onChange={(e) => setSubmitNote(e.target.value)}
                  placeholder="যেমন: সূরা পাঠের গুগল ড্রাইভ অডিও লিংক অথবা অ্যাসাইনমেন্টের লিখিত উত্তর..."
                  className="w-full text-xs p-3 border border-[#90CAF9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] bg-[#E3F2FD]/20"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAssign(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0D47A1] hover:bg-[#0a3880] rounded-lg shadow-xs transition cursor-pointer"
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
