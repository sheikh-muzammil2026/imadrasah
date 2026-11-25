"use client";

import { siteConfig } from "@/config/siteConfig";

// Pre-seeded demo accounts (derived from siteConfig)
export const DEMO_TEACHER = {
  id: "teacher-1",
  name: siteConfig.identity.founder.name,
  email: `teacher@${siteConfig.identity.name.en.toLowerCase().replace(/[^a-z0-9]/g, "") || "madrasah"}.com`,
  role: "teacher",
  password: "password123",
  title: siteConfig.identity.founder.role,
  phone: siteConfig.contact.phone,
};

export const DEMO_STUDENT = {
  id: "student-1",
  name: "মুহাম্মদ আব্দুল্লাহ",
  email: `student@${siteConfig.identity.name.en.toLowerCase().replace(/[^a-z0-9]/g, "") || "madrasah"}.com`,
  role: "student",
  password: "password123",
  phone: "01812345678",
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
  level: c.titleEn,
  badge: c.badge || "অনলাইন লাইভ",
  description: c.shortDesc,
  createdAt: "2026-01-10",
}));

// Initial default assignments
const INITIAL_ASSIGNMENTS = [
  {
    id: "assign-1",
    courseId: "course-1",
    courseTitle: "আম্মা-পারা নাযেরা ও তাজবীদ কোর্স",
    title: "সূরা আন-নাবা ১-১০ আয়াতের মাখরাজ রেকর্ড ও জমা",
    dueDate: "2026-12-05",
    totalMarks: 20,
    instructions: "১-১০ আয়াতের স্পষ্ট অডিও বা ভিডিও রেকর্ড করে জমা দিন। হরফের সিফাত ও গুন্নাহর দিকে খেয়াল রাখুন।",
    createdAt: "2026-11-20",
  },
  {
    id: "assign-2",
    courseId: "course-1",
    courseTitle: "আম্মা-পারা নাযেরা ও তাজবীদ কোর্স",
    title: "নূন সাকিন ও তানভীনের ৪টি নিয়মের সারসংক্ষেপ",
    dueDate: "2026-12-10",
    totalMarks: 15,
    instructions: "ইযহার, ইদগাম, ইকলাব ও ইখফার সংজ্ঞা ও উদাহরণ খাতায় লিখে জমা দিন।",
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
    courseId: siteConfig.courses[0]?.slug || "nurani",
    courseTitle: siteConfig.courses[0]?.titleBn || "নূরানী বিভাগ",
    teacherName: DEMO_TEACHER.name,
    enrolledAt: "2026-02-15",
    progress: 60,
  },
];

// Initial assignment submissions
const INITIAL_SUBMISSIONS = [
  {
    id: "sub-1",
    assignmentId: "assign-1",
    assignmentTitle: "সূরা আন-নাবা ১-১০ আয়াতের মাখরাজ রেকর্ড ও জমা",
    studentId: "student-1",
    studentName: DEMO_STUDENT.name,
    studentEmail: DEMO_STUDENT.email,
    courseId: siteConfig.courses[0]?.slug || "nurani",
    submittedAt: "2026-11-23",
    status: "graded",
    grade: "১৮/২০",
    note: "মাশাল্লাহ, তিলাওয়াত চমৎকার হয়েছে। ইখফার গুন্নাহ আরো স্পষ্ট করবেন।",
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
    setStoredData("qk_users", [DEMO_TEACHER, DEMO_STUDENT]);
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
}

// Auth API
export function getCurrentUser() {
  return getStoredData("qk_current_user", null);
}

export function setCurrentUser(user) {
  setStoredData("qk_current_user", user);
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
      // Keep local store in sync with registered account
      const users = getStoredData("qk_users", [DEMO_TEACHER, DEMO_STUDENT]);
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

export function enrollStudent(student, course) {
  const enrollments = getEnrollments();
  const already = enrollments.find(
    (e) => e.studentId === student.id && e.courseId === course.id
  );
  if (already) {
    return { success: false, message: "আপনি ইতিমধ্যে এই কোর্সে তালিকাভুক্ত আছেন।" };
  }

  const newEnrollment = {
    id: `enroll-${Date.now()}`,
    studentId: student.id,
    studentName: student.name,
    studentEmail: student.email,
    courseId: course.id,
    courseTitle: course.title,
    teacherName: course.teacherName || siteConfig.identity.founder.name,
    enrolledAt: new Date().toISOString().split("T")[0],
    progress: 10,
  };

  enrollments.unshift(newEnrollment);
  setStoredData("qk_enrollments", enrollments);

  // Update course enrolledCount
  const courses = getCourses();
  const updatedCourses = courses.map((c) => {
    if (c.id === course.id) {
      return { ...c, enrolledCount: (c.enrolledCount || 0) + 1 };
    }
    return c;
  });
  setStoredData("qk_courses", updatedCourses);

  return { success: true, enrollment: newEnrollment };
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
