"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  FileCheck,
  Plus,
  Calendar,
  CheckCircle2,
  Trash2,
  Award,
  Video,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  getCurrentUser,
  getCourses,
  addCourse,
  deleteCourse,
  getAssignments,
  addAssignment,
  getEnrollments,
  getSubmissions,
  gradeSubmission,
  initStore,
} from "@/lib/store";
import { siteConfig } from "@/config/siteConfig";

export default function TeacherDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  // Modal / Form state for Course
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: "",
    category: "নাযেরা ও তাজবীদ",
    schedule: "সপ্তাহে ৩ দিন (সোম, বুধ, শুক্র সন্ধ্যা ৭:৩০)",
    fee: "৳২,০০০",
    seats: 15,
    level: "প্রাথমিক",
    description: "",
  });

  // Modal / Form state for Assignment
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignForm, setAssignForm] = useState({
    courseId: "",
    title: "",
    dueDate: "",
    totalMarks: 20,
    instructions: "",
  });

  // Grading state
  const [gradingSubId, setGradingSubId] = useState(null);
  const [gradeInput, setGradeInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");

  const refreshData = () => {
    initStore();
    const user = getCurrentUser();
    setCurrentUser(user);
    setCourses(getCourses());
    setAssignments(getAssignments());
    setEnrollments(getEnrollments());
    setSubmissions(getSubmissions());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener("storage", refreshData);
    return () => window.removeEventListener("storage", refreshData);
  }, []);

  // Compute metrics
  const totalStudents = enrollments.length;
  const activeCoursesCount = courses.length;
  const pendingGradingCount = submissions.filter((s) => s.status !== "graded").length;

  // Handle Course Creation
  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!courseForm.title.trim()) {
      toast.error("কোর্সের শিরোনাম আবশ্যক।");
      return;
    }

    addCourse({
      ...courseForm,
      teacherId: currentUser?.id || "teacher-1",
      teacherName: currentUser?.name || siteConfig.identity.founder.name,
      badge: "অনলাইন লাইভ",
    });

    toast.success("নতুন কোর্স সফলভাবে প্রকাশ করা হয়েছে!");
    setCourseForm({
      title: "",
      category: "নাযেরা ও তাজবীদ",
      schedule: "সপ্তাহে ৩ দিন (সোম, বুধ, শুক্র সন্ধ্যা ৭:৩০)",
      fee: "৳২,০০০",
      seats: 15,
      level: "প্রাথমিক",
      description: "",
    });
    setShowCourseModal(false);
    refreshData();
  };

  // Handle Assignment Creation
  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!assignForm.title.trim() || !assignForm.courseId) {
      toast.error("অ্যাসাইনমেন্টের শিরোনাম এবং কোর্স নির্বাচন আবশ্যক।");
      return;
    }

    const selectedCourse = courses.find((c) => c.id === assignForm.courseId);

    addAssignment({
      ...assignForm,
      courseTitle: selectedCourse?.title || "অনলাইন কোর্স",
    });

    toast.success("নতুন অ্যাসাইনমেন্ট সফলভাবে প্রকাশ করা হয়েছে!");
    setAssignForm({
      courseId: "",
      title: "",
      dueDate: "",
      totalMarks: 20,
      instructions: "",
    });
    setShowAssignModal(false);
    refreshData();
  };

  // Handle Delete Course
  const handleDeleteCourse = (id) => {
    if (confirm("আপনি কি নিশ্চিতভাবে এই কোর্সটি মুছে ফেলতে চান?")) {
      deleteCourse(id);
      toast.info("কোর্স মুছে ফেলা হয়েছে।");
      refreshData();
    }
  };

  // Handle Grading
  const handleSaveGrade = (submissionId) => {
    if (!gradeInput.trim()) {
      toast.error("দয়া করে মার্ক বা গ্রেড প্রদান করুন।");
      return;
    }
    gradeSubmission(submissionId, gradeInput.trim(), feedbackInput.trim());
    toast.success("অ্যাসাইনমেন্ট মূল্যায়ন সম্পন্ন হয়েছে!");
    setGradingSubId(null);
    setGradeInput("");
    setFeedbackInput("");
    refreshData();
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl border border-[#90CAF9] p-6 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9]/60 px-3 py-1 rounded-full">
            শিক্ষক ব্যবস্থাপনা প্যানেল
          </span>
          <h1 className="text-2xl font-black text-[#0D47A1] mt-2">
            আসসালামু আলাইকুম, {currentUser?.name || siteConfig.identity.founder.name || "সম্মানিত শিক্ষক"}
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            আপনার চলমান কোর্সসমূহ, শিক্ষার্থী এবং অ্যাসাইনমেন্ট মূল্যায়ন পরিচালনা করুন।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowCourseModal(true)}
            className="flex items-center gap-1.5 bg-[#2196F3] hover:bg-[#1976D2] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন কোর্স তৈরি</span>
          </button>
          <button
            onClick={() => setShowAssignModal(true)}
            className="flex items-center gap-1.5 bg-[#0D47A1] hover:bg-[#0a3880] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন অ্যাসাইনমেন্ট</span>
          </button>
        </div>
      </div>

      {/* Overview Cards (Total Students, Active Courses, Pending Grading) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl p-5 border border-[#90CAF9]/60 shadow-soft relative overflow-hidden">
          <div className="w-12 h-12 rounded-bl-full bg-[#E3F2FD] absolute top-0 right-0 border-l border-b border-[#90CAF9]/50" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E3F2FD] text-[#0D47A1] flex items-center justify-center font-bold border border-[#90CAF9]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">মোট শিক্ষার্থী (Total Students)</p>
              <h3 className="text-2xl font-extrabold text-[#0D47A1] mt-0.5">{totalStudents} জন</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#90CAF9]/60 shadow-soft relative overflow-hidden">
          <div className="w-12 h-12 rounded-bl-full bg-[#E3F2FD] absolute top-0 right-0 border-l border-b border-[#90CAF9]/50" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E3F2FD] text-[#2196F3] flex items-center justify-center font-bold border border-[#90CAF9]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600">চলমান কোর্স (Active Courses)</p>
              <h3 className="text-2xl font-extrabold text-[#2196F3] mt-0.5">{activeCoursesCount} টি</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#E2EEF5] shadow-soft relative overflow-hidden">
          <div className="w-12 h-12 rounded-bl-full bg-[#FEF3C7] absolute top-0 right-0" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#4A606D]">মূল্যায়ন বাকি (Pending Grading)</p>
              <h3 className="text-2xl font-extrabold text-amber-600 mt-0.5">{pendingGradingCount} টি</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div id="courses" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#064E73]">
            আমার প্রকাশিত কোর্সসমূহ (Published Courses)
          </h2>
          <button
            onClick={() => setShowCourseModal(true)}
            className="text-xs font-bold text-[#0288D1] hover:underline"
          >
            + নতুন কোর্স যোগ করুন
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-[#E2EEF5] p-5 shadow-soft hover:shadow-card-hover transition duration-200 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] font-bold text-[#0288D1] bg-[#D6EEFA]/50 px-2 py-0.5 rounded">
                    {course.category}
                  </span>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-red-400 hover:text-red-600"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-bold text-base text-[#064E73] mt-2">
                  {course.title}
                </h3>
                <p className="text-xs text-[#4A606D] mt-1 line-clamp-2">
                  {course.description || "কোর্সের বিস্তারিত তথ্য..."}
                </p>
                <div className="text-xs text-gray-500 mt-2 space-y-1">
                  <p>সময়: {course.schedule}</p>
                  <p>ভর্তি: {course.enrolledCount || 0} / {course.seats} আসন</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2EEF5] flex items-center justify-between">
                <span className="text-lg font-black text-[#0288D1]">{course.fee}</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                  সক্রিয়
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrolled Students Table */}
      <div id="students" className="space-y-4">
        <h2 className="text-lg font-bold text-[#064E73]">
          তালিকাভুক্ত শিক্ষার্থীদের বিবরণ (Enrolled Students)
        </h2>

        <div className="bg-white rounded-xl border border-[#E2EEF5] overflow-x-auto shadow-soft">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5FAFD] border-b border-[#E2EEF5] text-[#064E73]">
              <tr>
                <th className="p-3.5">শিক্ষার্থীর নাম</th>
                <th className="p-3.5">ইমেইল</th>
                <th className="p-3.5">কোর্সের নাম</th>
                <th className="p-3.5">ভর্তির তারিখ</th>
                <th className="p-3.5">অগ্রগতি</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2EEF5]">
              {enrollments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    এখনো কোনো শিক্ষার্থী তালিকাভুক্ত হয়নি।
                  </td>
                </tr>
              ) : (
                enrollments.map((enr) => (
                  <tr key={enr.id} className="hover:bg-[#F5FAFD]/50">
                    <td className="p-3.5 font-bold text-[#064E73]">{enr.studentName}</td>
                    <td className="p-3.5 text-gray-600">{enr.studentEmail}</td>
                    <td className="p-3.5 font-semibold text-[#0288D1]">{enr.courseTitle}</td>
                    <td className="p-3.5 text-gray-500">{enr.enrolledAt}</td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#0288D1] h-full"
                            style={{ width: `${enr.progress || 10}%` }}
                          />
                        </div>
                        <span className="font-bold text-gray-700">{enr.progress || 10}%</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submitted Assignments & Grading Section */}
      <div id="submissions" className="space-y-4">
        <h2 className="text-lg font-bold text-[#064E73]">
          জমা পড়া অ্যাসাইনমেন্ট ও মূল্যায়ন (Submitted Assignments)
        </h2>

        <div className="bg-white rounded-xl border border-[#E2EEF5] overflow-x-auto shadow-soft">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5FAFD] border-b border-[#E2EEF5] text-[#064E73]">
              <tr>
                <th className="p-3.5">অ্যাসাইনমেন্টের নাম</th>
                <th className="p-3.5">শিক্ষার্থী</th>
                <th className="p-3.5">জমা দেওয়ার তারিখ</th>
                <th className="p-3.5">স্ট্যাটাস</th>
                <th className="p-3.5">প্রাপ্ত মার্কস</th>
                <th className="p-3.5 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2EEF5]">
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-400">
                    এখনো কোনো অ্যাসাইনমেন্ট জমা পড়েনি।
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#F5FAFD]/50">
                    <td className="p-3.5 font-bold text-[#064E73]">{sub.assignmentTitle}</td>
                    <td className="p-3.5 font-semibold text-gray-700">{sub.studentName}</td>
                    <td className="p-3.5 text-gray-500">{sub.submittedAt}</td>
                    <td className="p-3.5">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          sub.status === "graded"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {sub.status === "graded" ? "মূল্যায়িত" : "মূল্যায়ন অপেক্ষমান"}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-[#0288D1]">{sub.grade}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => {
                          setGradingSubId(sub.id);
                          setGradeInput(sub.grade === "মূল্যায়ন অপেক্ষমান" ? "১৯/২০" : sub.grade);
                          setFeedbackInput(sub.note || "");
                        }}
                        className="bg-[#0288D1] hover:bg-[#0277BD] text-white text-[11px] font-bold px-3 py-1 rounded transition"
                      >
                        মার্ক দিন / এডিট
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create Course */}
      {showCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-[#E2EEF5]">
            <div className="flex justify-between items-center pb-2 border-b border-[#E2EEF5]">
              <h3 className="text-base font-bold text-[#064E73]">
                নতুন কোর্স প্রকাশ করুন (Publish New Course)
              </h3>
              <button
                onClick={() => setShowCourseModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#064E73] mb-1">
                  কোর্সের শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  placeholder="যেমন: তাজবীদুল কুরআন ডিপ্লোমা"
                  className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#064E73] mb-1">
                    ক্যাটাগরি
                  </label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD]"
                  >
                    <option value="নাযেরা ও তাজবীদ">নাযেরা ও তাজবীদ</option>
                    <option value="মাশক">মাশক</option>
                    <option value="হিফজ">হিফজ</option>
                    <option value="আরবি ভাষা">আরবি ভাষা</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#064E73] mb-1">
                    কোর্স ফি
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.fee}
                    onChange={(e) => setCourseForm({ ...courseForm, fee: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#064E73] mb-1">
                    আসন সংখ্যা
                  </label>
                  <input
                    type="number"
                    value={courseForm.seats}
                    onChange={(e) => setCourseForm({ ...courseForm, seats: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#064E73] mb-1">
                    ক্লাসের সময়সূচি
                  </label>
                  <input
                    type="text"
                    value={courseForm.schedule}
                    onChange={(e) => setCourseForm({ ...courseForm, schedule: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#064E73] mb-1">
                  সংক্ষিপ্ত বিবরণ
                </label>
                <textarea
                  rows={3}
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  placeholder="কোর্সের মূল বিষয়বস্তু..."
                  className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCourseModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-600"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-bold rounded-lg"
                >
                  কোর্স প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Assignment */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-[#E2EEF5]">
            <div className="flex justify-between items-center pb-2 border-b border-[#E2EEF5]">
              <h3 className="text-base font-bold text-[#064E73]">
                নতুন অ্যাসাইনমেন্ট দিন (Create Assignment)
              </h3>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#064E73] mb-1">
                  কোর্স নির্বাচন করুন *
                </label>
                <select
                  required
                  value={assignForm.courseId}
                  onChange={(e) => setAssignForm({ ...assignForm, courseId: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD]"
                >
                  <option value="">-- কোর্স সিলেক্ট করুন --</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#064E73] mb-1">
                  অ্যাসাইনমেন্টের শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  value={assignForm.title}
                  onChange={(e) => setAssignForm({ ...assignForm, title: e.target.value })}
                  placeholder="যেমন: সূরা বাকারার শেষ দুই আয়াতের তিলাওয়াত"
                  className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#064E73] mb-1">
                    জমা দেওয়ার শেষ তারিখ
                  </label>
                  <input
                    type="date"
                    required
                    value={assignForm.dueDate}
                    onChange={(e) => setAssignForm({ ...assignForm, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#064E73] mb-1">
                    মোট মার্কস
                  </label>
                  <input
                    type="number"
                    value={assignForm.totalMarks}
                    onChange={(e) => setAssignForm({ ...assignForm, totalMarks: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#064E73] mb-1">
                  নির্দেশনাবলি (Instructions)
                </label>
                <textarea
                  rows={3}
                  value={assignForm.instructions}
                  onChange={(e) => setAssignForm({ ...assignForm, instructions: e.target.value })}
                  placeholder="কীভাবে জমা দিতে হবে..."
                  className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-600"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-bold rounded-lg"
                >
                  প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Grading Submission */}
      {gradingSubId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-[#E2EEF5]">
            <h3 className="text-base font-bold text-[#064E73]">
              শিক্ষার্থীর কাজ মূল্যায়ন করুন
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                প্রাপ্ত মার্কস / গ্রেড *
              </label>
              <input
                type="text"
                value={gradeInput}
                onChange={(e) => setGradeInput(e.target.value)}
                placeholder="যেমন: ১৯/২০"
                className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                শিক্ষকের মন্তব্য / সংশোধন
              </label>
              <textarea
                rows={3}
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                placeholder="মাশাল্লাহ, সুন্দর তিলাওয়াত..."
                className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setGradingSubId(null)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs"
              >
                বাতিল
              </button>
              <button
                onClick={() => handleSaveGrade(gradingSubId)}
                className="px-4 py-1.5 bg-[#0288D1] text-white rounded-lg text-xs font-bold"
              >
                মার্ক সংরক্ষণ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
