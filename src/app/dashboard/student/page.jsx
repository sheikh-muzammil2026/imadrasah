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
  Send,
  PlusCircle,
  ExternalLink,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  getCurrentUser,
  getCourses,
  getAssignments,
  getEnrollments,
  getSubmissions,
  enrollStudent,
  submitAssignment,
  initStore,
} from "@/lib/store";

export default function StudentDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  // Assignment submission modal
  const [selectedAssign, setSelectedAssign] = useState(null);
  const [submitNote, setSubmitNote] = useState("");

  const refreshData = () => {
    initStore();
    const user = getCurrentUser();
    setCurrentUser(user);
    setAllCourses(getCourses());
    setAssignments(getAssignments());
    setEnrollments(getEnrollments());
    setSubmissions(getSubmissions());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener("storage", refreshData);
    return () => window.removeEventListener("storage", refreshData);
  }, []);

  // Filter student's enrollments
  const myEnrollments = enrollments.filter(
    (e) => e.studentId === currentUser?.id || e.studentEmail === currentUser?.email
  );

  // Filter student's submissions
  const mySubmissions = submissions.filter(
    (s) => s.studentId === currentUser?.id || s.studentEmail === currentUser?.email
  );

  // Filter assignments relevant to enrolled courses
  const enrolledCourseIds = myEnrollments.map((e) => e.courseId);
  const relevantAssignments = assignments.filter((a) =>
    enrolledCourseIds.includes(a.courseId)
  );

  // Compute metrics
  const enrolledCoursesCount = myEnrollments.length;
  const completedAssignmentsCount = mySubmissions.filter((s) => s.status === "graded").length;
  const averageGrade =
    completedAssignmentsCount > 0
      ? "A (চমৎকার)"
      : mySubmissions.length > 0
      ? "মূল্যায়ন চলছে"
      : "শুরু হয়নি";

  // Calculate overall progress percentage
  const totalTasks = (relevantAssignments.length || 1);
  const progressPercent = Math.min(
    100,
    Math.round(((mySubmissions.length) / totalTasks) * 100)
  );

  // Handle Enrollment
  const handleEnroll = (course) => {
    if (!currentUser) return;
    const res = enrollStudent(currentUser, course);
    if (res.success) {
      toast.success(`অভিনন্দন! আপনি "${course.title}" কোর্সে সফলভাবে ভর্তি হয়েছেন।`);
      refreshData();
    } else {
      toast.info(res.message);
    }
  };

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
      <div className="bg-white rounded-2xl border border-[#E2EEF5] p-6 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#0288D1] bg-[#D6EEFA]/40 px-3 py-1 rounded-full">
            শিক্ষার্থী পোর্টাল (Student Portal)
          </span>
          <h1 className="text-2xl font-black text-[#064E73] mt-2">
            স্বাগতম, {currentUser?.name || "শিক্ষার্থী"}
          </h1>
          <p className="text-xs text-[#4A606D] mt-1">
            আপনার অনলাইন ক্লাস, লেকচার নোটস এবং হোমওয়ার্ক অ্যাসাইনমেন্ট সম্পন্ন করুন।
          </p>
        </div>

        <a
          href="https://meet.google.com/qkn-quran-live"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-bold px-5 py-3 rounded-xl shadow-xs flex items-center gap-2 transition"
        >
          <Video className="w-4 h-4" />
          <span>আজকের লাইভ ক্লাসে যোগ দিন</span>
        </a>
      </div>

      {/* Overview Cards (Enrolled Courses, Completed Assignments, Average Grade) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl p-5 border border-[#E2EEF5] shadow-soft relative overflow-hidden">
          <div className="w-12 h-12 rounded-bl-full bg-[#D6EEFA] absolute top-0 right-0" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0288D1]/10 text-[#0288D1] flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#4A606D]">তালিকাভুক্ত কোর্স (Enrolled Courses)</p>
              <h3 className="text-2xl font-extrabold text-[#064E73] mt-0.5">
                {enrolledCoursesCount} টি
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#E2EEF5] shadow-soft relative overflow-hidden">
          <div className="w-12 h-12 rounded-bl-full bg-[#D6EEFA] absolute top-0 right-0" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0288D1]/10 text-[#0288D1] flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#4A606D]">জমা দেওয়া অ্যাসাইনমেন্ট (Submitted)</p>
              <h3 className="text-2xl font-extrabold text-[#0288D1] mt-0.5">
                {mySubmissions.length} টি
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#E2EEF5] shadow-soft relative overflow-hidden">
          <div className="w-12 h-12 rounded-bl-full bg-[#FEF3C7] absolute top-0 right-0" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#4A606D]">গড় গ্রেড / পারফরম্যান্স (Average Grade)</p>
              <h3 className="text-lg font-extrabold text-amber-600 mt-1">
                {averageGrade}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Progress Tracker */}
      <div className="bg-white rounded-xl border border-[#E2EEF5] p-5 shadow-soft space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-[#064E73]">
            সার্বিক পড়াশোনা ও টাস্ক অগ্রগতি (Overall Progress Tracker)
          </span>
          <span className="font-extrabold text-[#0288D1]">{progressPercent}% সম্পন্ন</span>
        </div>
        <div className="w-full bg-[#F5FAFD] border border-[#E2EEF5] h-3 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#0288D1] to-[#0277BD] h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* My Enrolled Courses Section */}
      <div id="my-courses" className="space-y-4">
        <h2 className="text-lg font-bold text-[#064E73]">
          আমার তালিকাভুক্ত কোর্সসমূহ (My Enrolled Courses)
        </h2>

        {myEnrollments.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-[#E2EEF5] p-8 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="text-xs text-gray-500">
              আপনি এখনো কোনো কোর্সে ভর্তি হননি। নিচের তালিকা থেকে আপনার পছন্দের কোর্সে ভর্তি হতে পারেন।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {myEnrollments.map((enr) => (
              <div
                key={enr.id}
                className="bg-white rounded-xl border border-[#E2EEF5] p-5 shadow-soft flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      ভর্তি সম্পন্ন: {enr.enrolledAt}
                    </span>
                    <span className="text-xs font-bold text-[#0288D1]">সক্রিয় ব্যাচ</span>
                  </div>
                  <h3 className="font-bold text-base text-[#064E73] mt-2">
                    {enr.courseTitle}
                  </h3>
                  <p className="text-xs text-[#4A606D] mt-0.5">
                    প্রশিক্ষক: {enr.teacherName}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E2EEF5] flex items-center justify-between">
                  <a
                    href="https://meet.google.com/qkn-quran-live"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>ক্লাসে জয়েন করুন</span>
                  </a>
                  <span className="text-xs font-bold text-gray-500">
                    অগ্রগতি: {enr.progress || 10}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Courses To Enroll (Interactive Feature) */}
      <div id="available-courses" className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#064E73]">
            নতুন কোর্সে ভর্তি হোন (Available Courses to Enroll)
          </h2>
          <span className="text-xs text-gray-400">শিক্ষকগণ কর্তৃক প্রকাশিত কোর্স</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {allCourses.map((c) => {
            const isEnrolled = myEnrollments.some((e) => e.courseId === c.id);
            return (
              <div
                key={c.id}
                className="bg-white rounded-xl border border-[#E2EEF5] p-5 shadow-soft hover:shadow-card-hover transition duration-200 flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#0288D1] bg-[#D6EEFA]/40 px-2 py-0.5 rounded">
                    {c.category || "অনলাইন কোর্স"}
                  </span>
                  <h3 className="font-bold text-sm text-[#064E73] mt-2 line-clamp-1">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#4A606D] mt-1 line-clamp-2">
                    {c.description || "কোর্সের বিস্তারিত..."}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-2">
                    সময়: {c.schedule}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E2EEF5] flex items-center justify-between">
                  <span className="text-base font-extrabold text-[#064E73]">
                    {c.fee}
                  </span>

                  {isEnrolled ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>ভর্তি আছেন</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleEnroll(c)}
                      className="bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-2xs transition cursor-pointer"
                    >
                      কোর্সে ভর্তি হোন
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Assignments Section & Interactive Submission */}
      <div id="assignments" className="space-y-4">
        <h2 className="text-lg font-bold text-[#064E73]">
          অ্যাসাইনমেন্ট ও হোমওয়ার্ক (Course Assignments)
        </h2>

        {relevantAssignments.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E2EEF5] p-6 text-center text-xs text-gray-400">
            বর্তমানে আপনার কোর্সে কোনো পেন্ডিং অ্যাসাইনমেন্ট নেই।
          </div>
        ) : (
          <div className="space-y-3">
            {relevantAssignments.map((assign) => {
              const submission = mySubmissions.find((s) => s.assignmentId === assign.id);
              return (
                <div
                  key={assign.id}
                  className="bg-white rounded-xl border border-[#E2EEF5] p-5 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#0288D1] bg-[#D6EEFA]/40 px-2 py-0.5 rounded">
                      {assign.courseTitle}
                    </span>
                    <h3 className="text-sm font-bold text-[#064E73]">{assign.title}</h3>
                    <p className="text-xs text-[#4A606D]">{assign.instructions}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 pt-1">
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
                          <p className="text-[11px] text-gray-500 mt-1 italic">
                            মন্তব্য: {submission.note}
                          </p>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedAssign(assign)}
                        className="bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-bold px-4 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
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
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-[#E2EEF5]">
            <div className="flex justify-between items-center pb-2 border-b border-[#E2EEF5]">
              <h3 className="text-base font-bold text-[#064E73]">
                অ্যাসাইনমেন্ট জমা দিন
              </h3>
              <button
                onClick={() => setSelectedAssign(null)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitAssignment} className="space-y-3">
              <div>
                <p className="text-xs font-bold text-[#064E73]">{selectedAssign.title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{selectedAssign.instructions}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#064E73] mb-1">
                  আপনার উত্তর / অডিও রেকর্ড লিংক বা বিবরণ *
                </label>
                <textarea
                  rows={4}
                  required
                  value={submitNote}
                  onChange={(e) => setSubmitNote(e.target.value)}
                  placeholder="যেমন: সূরা আন-নাবা ১-১০ আয়াত তিলাওয়াত রেকর্ড ড্রাইভ লিংক: https://drive.google.com/..."
                  className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedAssign(null)}
                  className="px-4 py-1.5 border border-gray-300 rounded-lg text-xs font-bold text-gray-600"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-bold rounded-lg"
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
