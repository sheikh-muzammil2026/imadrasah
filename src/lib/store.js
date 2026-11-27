"use client";

import { siteConfig } from "@/config/siteConfig";

// Pre-seeded demo accounts (derived from siteConfig)
export const DEMO_TEACHER = {
  id: "teacher-1",
  name: "মাওলানা ক্বারী লোকমান আল মাহমুদ",
  email: `teacher@${siteConfig.identity.name.shortEn.toLowerCase().replace(/[^a-z0-9]/g, "") || "qurankanan"}.com`,
  role: "teacher",
  password: "password123",
  title: "প্রধান প্রশিক্ষক ও আন্তর্জাতিক ক্বারী",
  teacherId: "0202",
  phone: siteConfig.contact.phone,
};

export const DEMO_STUDENT = {
  id: "student-1",
  name: "মুহাম্মদ আব্দুল্লাহ",
  email: `student@${siteConfig.identity.name.shortEn.toLowerCase().replace(/[^a-z0-9]/g, "") || "qurankanan"}.com`,
  role: "student",
  password: "password123",
  studentId: "0401",
  phone: "01812345678",
};

export const DEMO_ADMIN = {
  id: "admin-1",
  name: "মুহাম্মদ সাইফুল ইসলাম",
  email: `admin@${siteConfig.identity.name.shortEn.toLowerCase().replace(/[^a-z0-9]/g, "") || "qurankanan"}.com`,
  role: "admin",
  password: "password123",
  title: "প্রধান সমন্বয়ক ও অ্যাডমিন",
  phone: siteConfig.contact.phone,
};

export const DEMO_SUPER_ADMIN = {
  id: "superadmin-1",
  name: "হাফেজ ক্বারী আব্দুল কাদের",
  email: `superadmin@${siteConfig.identity.name.shortEn.toLowerCase().replace(/[^a-z0-9]/g, "") || "qurankanan"}.com`,
  role: "super_admin",
  password: "password123",
  title: "মহাপরিচালক ও সুপার অ্যাডমিন",
  phone: siteConfig.contact.phone,
};

// Initial default courses strictly derived from siteConfig.courses
const INITIAL_COURSES = siteConfig.courses.map((c, idx) => ({
  id: c.slug || `course-${idx + 1}`,
  title: c.titleBn,
  teacherId: "teacher-1",
  teacherName: c.instructor,
  category: c.department,
  schedule: c.schedule,
  fee: c.fee,
  seats: 15,
  enrolledCount: 10,
  level: c.level,
  badge: c.badge || "অনলাইন লাইভ",
  description: c.shortDesc,
  createdAt: "2026-01-10",
}));

// Initial default assignments
const INITIAL_ASSIGNMENTS = [
  {
    id: "assign-1",
    courseId: siteConfig.courses[0]?.slug || "quran-foundations",
    courseTitle: siteConfig.courses[0]?.titleBn || "Quran Reading Foundations",
    title: "আরবি হরফের মাখরাজ উচ্চারণ রেকর্ড ও সাবমিট",
    dueDate: "2026-12-05",
    totalMarks: 20,
    instructions: "হলক ও জিহ্বার মাখরাজসমূহ স্পষ্ট অডিও রেকর্ড করে গুগল ড্রাইভ লিংক জমা দিন।",
    createdAt: "2026-11-20",
  },
  {
    id: "assign-2",
    courseId: siteConfig.courses[1]?.slug || "recitation-tajweed",
    courseTitle: siteConfig.courses[1]?.titleBn || "Quran Recitation & Tajweed",
    title: "সূরা নাবার প্রথম ১০ আয়াতের তাজবীদ মাশক",
    dueDate: "2026-12-10",
    totalMarks: 20,
    instructions: "মাদ ও গুন্নাহর নিয়ম ঠিক রেখে তিলাওয়াতের অডিও জমা দিন।",
    createdAt: "2026-11-22",
  },
];

// Initial student enrollments
const INITIAL_ENROLLMENTS = [
  {
    id: "enroll-1",
    studentId: "student-1",
    studentName: DEMO_STUDENT.name,
    studentEmail: DEMO_STUDENT.email,
    courseId: siteConfig.courses[0]?.slug || "quran-foundations",
    courseTitle: siteConfig.courses[0]?.titleBn || "Quran Reading Foundations",
    teacherName: DEMO_TEACHER.name,
    enrolledAt: "2026-02-15",
    progress: 75,
  },
];

// Initial assignment submissions
const INITIAL_SUBMISSIONS = [
  {
    id: "sub-1",
    assignmentId: "assign-1",
    assignmentTitle: "আরবি হরফের মাখরাজ উচ্চারণ রেকর্ড ও সাবমিট",
    studentId: "student-1",
    studentName: DEMO_STUDENT.name,
    studentEmail: DEMO_STUDENT.email,
    courseId: siteConfig.courses[0]?.slug || "quran-foundations",
    submittedAt: "2026-11-23",
    status: "graded",
    grade: "১৯/২০",
    note: "মাশাল্লাহ, হরফের সিফাত ও মাখরাজ সঠিক হয়েছে। নিয়মিত মাশক জারি রাখুন।",
  },
];

// Initial demo attendance records
const INITIAL_ATTENDANCE = [
  {
    id: "att-1",
    courseSlug: siteConfig.courses[0]?.slug || "quran-foundations",
    courseTitle: siteConfig.courses[0]?.titleBn,
    date: new Date().toISOString().split("T")[0],
    teacherId: "teacher-1",
    lessonTopic: "হরকত ও তানভীনের মাশক",
    records: [
      { studentId: "0401", studentName: DEMO_STUDENT.name, studentEmail: DEMO_STUDENT.email, status: "present" },
    ],
  },
];

// Safe LocalStorage Helpers
export function getStoredData(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function setStoredData(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Error setting localStorage:", e);
  }
}

// Initialize default store if not present
export function initStore() {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem("qk_users")) {
    setStoredData("qk_users", [DEMO_SUPER_ADMIN, DEMO_ADMIN, DEMO_TEACHER, DEMO_STUDENT]);
  }
  if (!localStorage.getItem("qk_courses")) {
    setStoredData("qk_courses", INITIAL_COURSES);
  }
  if (!localStorage.getItem("qk_assignments")) {
    setStoredData("qk_assignments", INITIAL_ASSIGNMENTS);
  }
  if (!localStorage.getItem("qk_enrollments")) {
    setStoredData("qk_enrollments", INITIAL_ENROLLMENTS);
  }
  if (!localStorage.getItem("qk_submissions")) {
    setStoredData("qk_submissions", INITIAL_SUBMISSIONS);
  }
  if (!localStorage.getItem("qk_attendance")) {
    setStoredData("qk_attendance", INITIAL_ATTENDANCE);
  }
}

// Auth API
export function getCurrentUser() {
  return getStoredData("qk_current_user", null);
}

export function setCurrentUser(user) {
  setStoredData("qk_current_user", user);
  if (typeof document !== "undefined") {
    if (user) {
      const roleStr = encodeURIComponent(user.role || "student");
      const userPayload = encodeURIComponent(
        JSON.stringify({
          id: user.id || user._id,
          role: user.role || "student",
          email: user.email,
          name: user.name,
        })
      );
      document.cookie = `qk_role=${roleStr}; path=/; max-age=604800; SameSite=Lax`;
      document.cookie = `qk_user=${userPayload}; path=/; max-age=604800; SameSite=Lax`;
    } else {
      document.cookie = "qk_role=; path=/; max-age=0; SameSite=Lax";
      document.cookie = "qk_user=; path=/; max-age=0; SameSite=Lax";
    }
  }
}

export async function registerUser({ name, email, password, role }) {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.success) {
      const users = getStoredData("qk_users", [DEMO_SUPER_ADMIN, DEMO_ADMIN, DEMO_TEACHER, DEMO_STUDENT]);
      users.push({
        id: data.user?.id || `user-${Date.now()}`,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        role: role || "student",
      });
      setStoredData("qk_users", users);
      return { success: true, user: data.user, message: data.message };
    }

    return {
      success: false,
      message: data.message || "নিবন্ধন সম্পন্ন করতে ব্যর্থ হয়েছে। দয়া করে আবার চেষ্টা করুন।",
    };
  } catch (err) {
    console.error("registerUser API error:", err);
    return {
      success: false,
      message: "সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি। অনুগ্রহ করে ইন্টারনেট সংযোগ পরীক্ষা করুন।",
    };
  }
}

export async function loginUser(email, password) {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.success && data.user) {
      setCurrentUser(data.user);
      return { success: true, user: data.user, message: data.message };
    }

    return {
      success: false,
      message: data.message || "ভুল ইমেইল বা পাসওয়ার্ড। দয়া করে আবার চেষ্টা করুন।",
    };
  } catch (err) {
    console.error("loginUser API error:", err);
    return {
      success: false,
      message: "সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    };
  }
}

export function logoutUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("qk_current_user");
    if (typeof document !== "undefined") {
      document.cookie = "qk_role=; path=/; max-age=0; SameSite=Lax";
      document.cookie = "qk_user=; path=/; max-age=0; SameSite=Lax";
    }
    window.dispatchEvent(new Event("storage"));
  }
}

// Course API
export function getCourses() {
  return getStoredData("qk_courses", INITIAL_COURSES);
}

export function addCourse(course) {
  const courses = getCourses();
  const newCourse = {
    ...course,
    id: `course-${Date.now()}`,
    enrolledCount: 0,
    createdAt: new Date().toISOString().split("T")[0],
  };
  courses.unshift(newCourse);
  setStoredData("qk_courses", courses);
  return newCourse;
}

export function deleteCourse(courseId) {
  const courses = getCourses().filter((c) => c.id !== courseId);
  setStoredData("qk_courses", courses);
}

// Assignment API
export function getAssignments() {
  return getStoredData("qk_assignments", INITIAL_ASSIGNMENTS);
}

export function addAssignment(assignment) {
  const assignments = getAssignments();
  const newAssign = {
    ...assignment,
    id: `assign-${Date.now()}`,
    createdAt: new Date().toISOString().split("T")[0],
  };
  assignments.unshift(newAssign);
  setStoredData("qk_assignments", assignments);
  return newAssign;
}

// Enrollment API
export function getEnrollments() {
  return getStoredData("qk_enrollments", INITIAL_ENROLLMENTS);
}

// Submissions API
export function getSubmissions() {
  return getStoredData("qk_submissions", INITIAL_SUBMISSIONS);
}

export function submitAssignment({ assignmentId, assignmentTitle, student, courseId, note }) {
  const subs = getSubmissions();
  const existing = subs.find(
    (s) => s.assignmentId === assignmentId && s.studentId === student.id
  );
  if (existing) {
    return { success: false, message: "আপনি ইতিমধ্যে এই অ্যাসাইনমেন্ট জমা দিয়েছেন।" };
  }

  const newSub = {
    id: `sub-${Date.now()}`,
    assignmentId,
    assignmentTitle,
    studentId: student.id,
    studentName: student.name,
    studentEmail: student.email,
    courseId,
    submittedAt: new Date().toISOString().split("T")[0],
    status: "submitted",
    grade: "মূল্যায়ন অপেক্ষমান",
    note: note || "অ্যাসাইনমেন্ট সম্পন্ন হয়েছে।",
  };

  subs.unshift(newSub);
  setStoredData("qk_submissions", subs);
  return { success: true, submission: newSub };
}

export function gradeSubmission(submissionId, grade, feedback) {
  const subs = getSubmissions();
  const updated = subs.map((s) => {
    if (s.id === submissionId) {
      return {
        ...s,
        status: "graded",
        grade,
        note: feedback || s.note,
      };
    }
    return s;
  });
  setStoredData("qk_submissions", updated);
}

// Attendance API (Local fallback)
export function getAttendanceRecords() {
  return getStoredData("qk_attendance", INITIAL_ATTENDANCE);
}

export function saveAttendanceRecord(record) {
  const list = getAttendanceRecords();
  const newRecord = {
    ...record,
    id: `att-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  list.unshift(newRecord);
  setStoredData("qk_attendance", list);
  return newRecord;
}

// Monthly Verified Reports (Local fallback)
export function getMonthlyReports(studentEmail) {
  const list = getStoredData("qk_monthly_reports", [
    {
      id: "report-1",
      studentId: "0401",
      studentName: DEMO_STUDENT.name,
      studentEmail: DEMO_STUDENT.email,
      month: "মার্চ ২০২৬",
      courseTitle: siteConfig.courses[0]?.titleBn || "কুরআন রিডিং ফাউন্ডেশন",
      totalClasses: 12,
      attendedClasses: 11,
      attendanceRate: "92%",
      punctualityStatus: "সময়নিষ্ঠ",
      tajweedAccuracy: "৯৪% (মাখরাজ ও গুন্নাহ চমৎকার)",
      hifzRevision: "সূরা আল-মুলক নির্ভুল তিলাওয়াত",
      homeworkScore: "১৯ / ২০ (A+)",
      overallGrade: "মুমতায (A+)",
      teacherRemarks: "মাশাল্লাহ! ছাত্র অত্যন্ত নিয়মিত ও মনোযোগী। মাখরাজের উচ্চারণ অনেক পরিষ্কার হয়েছে।",
      teacherName: siteConfig.identity.founder.name,
      verifiedBy: "পরীক্ষা ও পাঠদান সেল",
      issuedAt: new Date().toISOString().split("T")[0],
      verificationSeal: true,
    },
  ]);
  if (!studentEmail) return list;
  return list.filter((r) => r.studentEmail?.toLowerCase() === studentEmail.toLowerCase());
}

export function saveMonthlyReport(report) {
  const list = getMonthlyReports();
  const newReport = {
    ...report,
    id: `report-${Date.now()}`,
    issuedAt: new Date().toISOString().split("T")[0],
    verificationSeal: true,
  };
  list.unshift(newReport);
  setStoredData("qk_monthly_reports", list);
  return newReport;
}
