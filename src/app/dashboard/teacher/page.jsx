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
  CalendarCheck2,
  Check,
  X,
  Clock,
  Sparkles,
  FileSpreadsheet,
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
  getAttendanceRecords,
  saveAttendanceRecord,
  initStore,
} from "@/lib/store";
import { siteConfig } from "@/config/siteConfig";

export default function TeacherDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [attendanceLogs, setAttendanceLogs] = useState([]);

  // Modal / Form state for Course
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: "",
    category: "নাযেরা ও তাজবীদ",
    schedule: "সপ্তাহে ৩ দিন (সোম, বুধ, শুক্র সন্ধ্যা ৭:৩০)",
    fee: "$72/month",
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

  // Easy Attendance taking state ("হাজিরা নেয়ার অপশন সহজ করা")
  const [attendanceCourse, setAttendanceCourse] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [lessonTopic, setLessonTopic] = useState("মাখরাজ ও গুন্নাহর মাশক");
  const [rosterAttendance, setRosterAttendance] = useState({});
  const [savingAttendance, setSavingAttendance] = useState(false);

  // Grading state
  const [gradingSubId, setGradingSubId] = useState(null);
  const [gradeInput, setGradeInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");

  const refreshData = async () => {
    initStore();
    const user = getCurrentUser();
    setCurrentUser(user);
    const storedCourses = getCourses();
    setCourses(storedCourses);
    setAssignments(getAssignments());
    const storedEnrollments = getEnrollments();
    setEnrollments(storedEnrollments);
    setSubmissions(getSubmissions());

    if (storedCourses.length > 0 && !attendanceCourse) {
      setAttendanceCourse(storedCourses[0].slug || storedCourses[0].id);
    }

    // Initialize roster state for attendance
    const initialRoster = {};
    storedEnrollments.forEach((enr) => {
      initialRoster[enr.id || enr.studentEmail] = "present";
    });
    setRosterAttendance((prev) =>
      Object.keys(prev).length === 0 ? initialRoster : prev
    );

    // Fetch attendance logs (API or fallback)
    try {
      const res = await fetch("/api/attendance", {
        headers: {
          "x-user-id": user?.id || "",
          "x-user-role": user?.role || "teacher",
          "x-user-email": user?.email || "",
        },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.records) && data.records.length > 0) {
        setAttendanceLogs(data.records);
      } else {
        setAttendanceLogs(getAttendanceRecords());
      }
    } catch {
      setAttendanceLogs(getAttendanceRecords());
    }
  };

  useEffect(() => {
    refreshData();
    window.addEventListener("storage", refreshData);
    return () => window.removeEventListener("storage", refreshData);
  }, []);

  // Compute metrics
  const totalStudents = enrollments.length;
  const activeCoursesCount = courses.length;
  const pendingGradingCount = submissions.filter(
    (s) => s.status !== "graded"
  ).length;

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
      fee: "$72/month",
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

  // Mark all present in 1 click
  const handleMarkAllPresent = () => {
    const updated = {};
    enrollments.forEach((enr) => {
      updated[enr.id || enr.studentEmail] = "present";
    });
    setRosterAttendance(updated);
    toast.info("সকল শিক্ষার্থীকে 'উপস্থিত' হিসেবে চিহ্নিত করা হয়েছে।");
  };

  // Toggle single student attendance
  const handleToggleStatus = (studentKey, newStatus) => {
    setRosterAttendance((prev) => ({
      ...prev,
      [studentKey]: newStatus,
    }));
  };

  // Submit Class Attendance ("হাজিরা নেয়ার অপশন সহজ করা")
  const handleSaveAttendance = async (e) => {
    e.preventDefault();
    if (!attendanceCourse) {
      toast.error("দয়া করে কোর্স সিলেক্ট করুন।");
      return;
    }

    setSavingAttendance(true);
    const selectedCourseObj = courses.find(
      (c) => c.slug === attendanceCourse || c.id === attendanceCourse
    );

    const recordsArray = enrollments.map((enr) => {
      const key = enr.id || enr.studentEmail;
      return {
        studentId: enr.studentId || "0401",
        studentName: enr.studentName,
        studentEmail: enr.studentEmail,
        status: rosterAttendance[key] || "present",
      };
    });

    const payload = {
      courseSlug: selectedCourseObj?.slug || attendanceCourse,
      courseTitle: selectedCourseObj?.title || selectedCourseObj?.titleBn || "কুরআন ক্লাস",
      date: attendanceDate,
      teacherId: currentUser?.id || "teacher-1",
      teacherName: currentUser?.name || siteConfig.identity.founder.name,
      lessonTopic: lessonTopic.trim() || "দৈনিক পাঠ ও তিলাওয়াত মাশক",
      records: recordsArray,
    };

    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": currentUser?.id || "",
          "x-user-role": currentUser?.role || "teacher",
          "x-user-email": currentUser?.email || "",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("আজকের ক্লাসের হাজিরা সফলভাবে সংরক্ষিত হয়েছে!");
      } else {
        saveAttendanceRecord(payload);
        toast.success("হাজিরা সফলভাবে সংরক্ষিত হয়েছে (লোকাল স্টোরেজ)!");
      }
    } catch {
      saveAttendanceRecord(payload);
      toast.success("হাজিরা সফলভাবে সংরক্ষিত হয়েছে!");
    } finally {
      setSavingAttendance(false);
      refreshData();
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="card-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="section-pill">
              শিক্ষক ব্যবস্থাপনা প্যানেল (Teacher Portal)
            </span>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              {siteConfig.identity.name.bn}
            </span>
          </div>
          <h1 className="page-title-main">
            আসসালামু আলাইকুম, {currentUser?.name || siteConfig.identity.founder.name}
          </h1>
          <p className="page-subtitle-muted">
            সহজেই ক্লাসের হাজিরা গ্রহণ করুন, নতুন কোর্স ও অ্যাসাইনমেন্ট তৈরি করুন এবং শিক্ষার্থীদের মূল্যায়ন পরিচালনা করুন।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href="#attendance"
            className="btn-accent flex items-center gap-1.5"
          >
            <CalendarCheck2 className="w-4 h-4" />
            <span>সহজ হাজিরা গ্রহণ</span>
          </a>
          <button
            onClick={() => setShowCourseModal(true)}
            className="btn-primary flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন কোর্স</span>
          </button>
          <button
            onClick={() => setShowAssignModal(true)}
            className="btn-outline flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>অ্যাসাইনমেন্ট</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="card-white flex items-center gap-4">
          <div className="icon-box-primary">
            <Users className="w-6 h-6 text-[#0D47A1]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">মোট শিক্ষার্থী</p>
            <h3 className="text-2xl font-black text-[#0D47A1] mt-0.5">
              {totalStudents} জন
            </h3>
          </div>
        </div>

        <div className="card-white flex items-center gap-4">
          <div className="icon-box-primary bg-sky-50 text-[#2196F3]">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">চলমান কোর্স</p>
            <h3 className="text-2xl font-black text-[#2196F3] mt-0.5">
              {activeCoursesCount} টি
            </h3>
          </div>
        </div>

        <div className="card-white flex items-center gap-4">
          <div className="icon-box-primary bg-amber-50 text-amber-600 border-amber-200">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">মূল্যায়ন বাকি</p>
            <h3 className="text-2xl font-black text-amber-600 mt-0.5">
              {pendingGradingCount} টি
            </h3>
          </div>
        </div>

        <div className="card-white flex items-center gap-4">
          <div className="icon-box-primary bg-emerald-50 text-emerald-600 border-emerald-200">
            <CalendarCheck2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">হাজিরা লগ সংখ্যা</p>
            <h3 className="text-2xl font-black text-emerald-700 mt-0.5">
              {attendanceLogs.length} টি
            </h3>
          </div>
        </div>
      </div>

      {/* SECTION: 1-Click Easy Attendance Tool ("হাজিরা নেয়ার অপশন সহজ করা") */}
      <div id="attendance" className="card-white space-y-6 scroll-mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-[#E3F2FD] rounded-lg text-[#0D47A1]">
                <CalendarCheck2 className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-black text-[#0D47A1]">
                ক্লাস হাজিরা গ্রহণ (1-Click Easy Attendance Taking)
              </h2>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              উস্তাদদের জন্য সহজ হাজিরা পোর্টাল: ১-ক্লিকে উপস্থিতি নিশ্চিত করুন ও দৈনিক পাঠ রেকর্ড রাখুন।
            </p>
          </div>

          <button
            type="button"
            onClick={handleMarkAllPresent}
            className="btn-accent flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>সবাইকে 'উপস্থিত' মার্ক করুন</span>
          </button>
        </div>

        <form onSubmit={handleSaveAttendance} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-group">
              <label className="form-label">কোর্স নির্বাচন করুন *</label>
              <select
                value={attendanceCourse}
                onChange={(e) => setAttendanceCourse(e.target.value)}
                className="form-select"
                required
              >
                {courses.map((c) => (
                  <option key={c.id || c.slug} value={c.slug || c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">তারিখ (Class Date) *</label>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">আজকের পাঠের বিষয়বস্তু / সূরা</label>
              <input
                type="text"
                value={lessonTopic}
                onChange={(e) => setLessonTopic(e.target.value)}
                placeholder="যেমন: সূরা আল-মুলক ১-১০ আয়াত মাশক"
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Roster of Students for Attendance */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                শিক্ষার্থীদের তালিকা ও তাৎক্ষণিক হাজিরা টগল ({enrollments.length} জন শিক্ষার্থী)
              </h3>
              <span className="text-xs text-slate-500">
                সবুজ = উপস্থিত, লাল = অনুপস্থিত, হলুদ = ছুটি/ওজর
              </span>
            </div>

            <div className="table-wrapper">
              <table className="table-element">
                <thead className="table-head">
                  <tr>
                    <th className="table-th">আইডি / রোল</th>
                    <th className="table-th">শিক্ষার্থীর নাম</th>
                    <th className="table-th">ইমেইল</th>
                    <th className="table-th text-center">উপস্থিতি স্থিতি (১-ক্লিক টগল)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enrollments.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="table-td text-center text-slate-400 py-6">
                        বর্তমানে কোনো সক্রিয় শিক্ষার্থী তালিকাভুক্ত নেই।
                      </td>
                    </tr>
                  ) : (
                    enrollments.map((enr) => {
                      const key = enr.id || enr.studentEmail;
                      const currentStatus = rosterAttendance[key] || "present";

                      return (
                        <tr key={key} className="hover:bg-slate-50/60">
                          <td className="table-td font-mono font-bold text-[#0D47A1]">
                            {enr.studentId || "0401"}
                          </td>
                          <td className="table-td font-bold text-slate-800">
                            {enr.studentName}
                          </td>
                          <td className="table-td text-slate-500">
                            {enr.studentEmail}
                          </td>
                          <td className="table-td">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleToggleStatus(key, "present")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                                  currentStatus === "present"
                                    ? "bg-emerald-600 text-white shadow-xs"
                                    : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                                }`}
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>উপস্থিত</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleToggleStatus(key, "absent")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                                  currentStatus === "absent"
                                    ? "bg-rose-600 text-white shadow-xs"
                                    : "bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700"
                                }`}
                              >
                                <X className="w-3.5 h-3.5" />
                                <span>অনুপস্থিত</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleToggleStatus(key, "excused")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                                  currentStatus === "excused"
                                    ? "bg-amber-500 text-white shadow-xs"
                                    : "bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                                }`}
                              >
                                <Clock className="w-3.5 h-3.5" />
                                <span>ছুটি / ওজর</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={savingAttendance}
              className="btn-primary flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {savingAttendance ? "সংরক্ষণ হচ্ছে..." : "আজকের ক্লাস হাজিরা সংরক্ষণ করুন"}
              </span>
            </button>
          </div>
        </form>

        {/* Recent Attendance History */}
        {attendanceLogs.length > 0 && (
          <div className="pt-6 border-t border-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              সম্প্রতি গৃহীত হাজিরা রেকর্ড ({attendanceLogs.length} টি সেশন)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {attendanceLogs.slice(0, 4).map((log, idx) => (
                <div
                  key={log._id || log.id || idx}
                  className="card-ice p-3 text-xs space-y-1.5"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#0D47A1]">
                      {log.courseTitle || log.courseSlug}
                    </span>
                    <span className="font-mono text-slate-500 text-[11px]">
                      {log.date}
                    </span>
                  </div>
                  <p className="text-slate-600">পাঠ: {log.lessonTopic}</p>
                  <div className="text-[11px] text-slate-500 flex items-center gap-3 pt-1">
                    <span>হাজিরা নেওয়া হয়েছে: {log.records?.length || 0} জন</span>
                    <span className="text-emerald-700 font-bold">
                      উপস্থিত: {log.records?.filter((r) => r.status === "present").length || 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Published Courses Section */}
      <div id="courses" className="space-y-4 scroll-mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-[#0D47A1]">
            আমার প্রকাশিত কোর্সসমূহ (Published Courses)
          </h2>
          <button
            onClick={() => setShowCourseModal(true)}
            className="text-xs font-bold text-[#2196F3] hover:underline cursor-pointer"
          >
            + নতুন কোর্স যোগ করুন
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => (
            <div
              key={course.id}
              className="card-white flex flex-col justify-between space-y-4 hover:border-[#2196F3] transition"
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] font-bold text-[#0D47A1] bg-[#E3F2FD] px-2.5 py-0.5 rounded border border-[#90CAF9]/60">
                    {course.category}
                  </span>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-rose-400 hover:text-rose-600 transition"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-bold text-base text-[#0D47A1] mt-2">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {course.description || "কোর্সের বিস্তারিত তথ্য..."}
                </p>
                <div className="text-xs text-slate-500 mt-2 space-y-1">
                  <p>সময়: {course.schedule}</p>
                  <p>ভর্তি: {course.enrolledCount || 0} / {course.seats} আসন</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-lg font-black text-[#0D47A1]">{course.fee}</span>
                <span className="badge-success">সক্রিয়</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrolled Students Table */}
      <div id="students" className="space-y-4 scroll-mt-6">
        <h2 className="text-lg font-black text-[#0D47A1]">
          তালিকাভুক্ত শিক্ষার্থীদের বিবরণ (Enrolled Students)
        </h2>

        <div className="table-wrapper">
          <table className="table-element">
            <thead className="table-head">
              <tr>
                <th className="table-th">আইডি</th>
                <th className="table-th">শিক্ষার্থীর নাম</th>
                <th className="table-th">ইমেইল</th>
                <th className="table-th">কোর্সের নাম</th>
                <th className="table-th">ভর্তির তারিখ</th>
                <th className="table-th">অগ্রগতি</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enrollments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="table-td text-center text-slate-400 py-8">
                    এখনো কোনো শিক্ষার্থী তালিকাভুক্ত হয়নি।
                  </td>
                </tr>
              ) : (
                enrollments.map((enr) => (
                  <tr key={enr.id} className="hover:bg-slate-50/60">
                    <td className="table-td font-mono font-bold text-[#0D47A1]">
                      {enr.studentId || "0401"}
                    </td>
                    <td className="table-td font-bold text-slate-800">
                      {enr.studentName}
                    </td>
                    <td className="table-td text-slate-600">{enr.studentEmail}</td>
                    <td className="table-td font-semibold text-[#0D47A1]">
                      {enr.courseTitle}
                    </td>
                    <td className="table-td text-slate-500">{enr.enrolledAt}</td>
                    <td className="table-td">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#2196F3] h-full"
                            style={{ width: `${enr.progress || 10}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-700 text-xs">
                          {enr.progress || 10}%
                        </span>
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
      <div id="submissions" className="space-y-4 scroll-mt-6">
        <h2 className="text-lg font-black text-[#0D47A1]">
          জমা পড়া অ্যাসাইনমেন্ট ও মূল্যায়ন (Submitted Assignments)
        </h2>

        <div className="table-wrapper">
          <table className="table-element">
            <thead className="table-head">
              <tr>
                <th className="table-th">অ্যাসাইনমেন্টের নাম</th>
                <th className="table-th">শিক্ষার্থী</th>
                <th className="table-th">জমা দেওয়ার তারিখ</th>
                <th className="table-th">স্ট্যাটাস</th>
                <th className="table-th">প্রাপ্ত মার্কস</th>
                <th className="table-th text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="table-td text-center text-slate-400 py-8">
                    এখনো কোনো অ্যাসাইনমেন্ট জমা পড়েনি।
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/60">
                    <td className="table-td font-bold text-[#0D47A1]">
                      {sub.assignmentTitle}
                    </td>
                    <td className="table-td font-semibold text-slate-800">
                      {sub.studentName}
                    </td>
                    <td className="table-td text-slate-500">{sub.submittedAt}</td>
                    <td className="table-td">
                      <span
                        className={
                          sub.status === "graded" ? "badge-success" : "badge-pending"
                        }
                      >
                        {sub.status === "graded" ? "মূল্যায়িত" : "মূল্যায়ন অপেক্ষমান"}
                      </span>
                    </td>
                    <td className="table-td font-bold text-[#2196F3]">
                      {sub.grade}
                    </td>
                    <td className="table-td text-right">
                      <button
                        onClick={() => {
                          setGradingSubId(sub.id);
                          setGradeInput(
                            sub.grade === "মূল্যায়ন অপেক্ষমান" ? "১৯/২০" : sub.grade
                          );
                          setFeedbackInput(sub.note || "");
                        }}
                        className="btn-primary text-xs px-3 py-1 cursor-pointer"
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
          <div className="card-white max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="text-base font-black text-[#0D47A1]">
                নতুন কোর্স প্রকাশ করুন (Publish New Course)
              </h3>
              <button
                onClick={() => setShowCourseModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-3">
              <div className="form-group">
                <label className="form-label">কোর্সের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, title: e.target.value })
                  }
                  placeholder="যেমন: তাজবীদুল কুরআন ডিপ্লোমা"
                  className="form-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label">ক্যাটাগরি</label>
                  <select
                    value={courseForm.category}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, category: e.target.value })
                    }
                    className="form-select"
                  >
                    <option value="নাযেরা ও তাজবীদ">নাযেরা ও তাজবীদ</option>
                    <option value="মাশক">মাশক</option>
                    <option value="হিফজ">হিফজ</option>
                    <option value="আরবি ভাষা">আরবি ভাষা</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">কোর্স ফি (USD / Month)</label>
                  <input
                    type="text"
                    required
                    value={courseForm.fee}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, fee: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label">আসন সংখ্যা</label>
                  <input
                    type="number"
                    value={courseForm.seats}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        seats: Number(e.target.value),
                      })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ক্লাসের সময়সূচি</label>
                  <input
                    type="text"
                    value={courseForm.schedule}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, schedule: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">সংক্ষিপ্ত বিবরণ</label>
                <textarea
                  rows={3}
                  value={courseForm.description}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, description: e.target.value })
                  }
                  placeholder="কোর্সের মূল বিষয়বস্তু..."
                  className="form-textarea"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCourseModal(false)}
                  className="btn-outline cursor-pointer"
                >
                  বাতিল
                </button>
                <button type="submit" className="btn-primary cursor-pointer">
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
          <div className="card-white max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="text-base font-black text-[#0D47A1]">
                নতুন অ্যাসাইনমেন্ট দিন (Create Assignment)
              </h3>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-3">
              <div className="form-group">
                <label className="form-label">কোর্স নির্বাচন করুন *</label>
                <select
                  required
                  value={assignForm.courseId}
                  onChange={(e) =>
                    setAssignForm({ ...assignForm, courseId: e.target.value })
                  }
                  className="form-select"
                >
                  <option value="">-- কোর্স সিলেক্ট করুন --</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">অ্যাসাইনমেন্টের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={assignForm.title}
                  onChange={(e) =>
                    setAssignForm({ ...assignForm, title: e.target.value })
                  }
                  placeholder="যেমন: সূরা বাকারার শেষ দুই আয়াতের তিলাওয়াত"
                  className="form-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label">জমা দেওয়ার শেষ তারিখ</label>
                  <input
                    type="date"
                    required
                    value={assignForm.dueDate}
                    onChange={(e) =>
                      setAssignForm({ ...assignForm, dueDate: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">মোট মার্কস</label>
                  <input
                    type="number"
                    value={assignForm.totalMarks}
                    onChange={(e) =>
                      setAssignForm({
                        ...assignForm,
                        totalMarks: Number(e.target.value),
                      })
                    }
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">নির্দেশনাবলি (Instructions)</label>
                <textarea
                  rows={3}
                  value={assignForm.instructions}
                  onChange={(e) =>
                    setAssignForm({
                      ...assignForm,
                      instructions: e.target.value,
                    })
                  }
                  placeholder="কীভাবে জমা দিতে হবে..."
                  className="form-textarea"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="btn-outline cursor-pointer"
                >
                  বাতিল
                </button>
                <button type="submit" className="btn-primary cursor-pointer">
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
          <div className="card-white max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-[#0D47A1]">
              শিক্ষার্থীর কাজ মূল্যায়ন করুন
            </h3>

            <div className="form-group">
              <label className="form-label">প্রাপ্ত মার্কস / গ্রেড *</label>
              <input
                type="text"
                value={gradeInput}
                onChange={(e) => setGradeInput(e.target.value)}
                placeholder="যেমন: ১৯/২০"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">শিক্ষকের মন্তব্য / সংশোধন</label>
              <textarea
                rows={3}
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                placeholder="মাশাল্লাহ, সুন্দর তিলাওয়াত..."
                className="form-textarea"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setGradingSubId(null)}
                className="btn-outline text-xs cursor-pointer"
              >
                বাতিল
              </button>
              <button
                onClick={() => handleSaveGrade(gradingSubId)}
                className="btn-primary text-xs cursor-pointer"
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
