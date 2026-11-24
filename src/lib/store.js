"use client";

// Pre-seeded demo accounts
export const DEMO_TEACHER = {
  id: "teacher-1",
  name: "মাওলানা লোকমান আল মাহমুদ",
  email: "teacher@qurankanon.com",
  role: "teacher",
  password: "password123",
  title: "প্রধান প্রশিক্ষক ও পরিচালক",
  phone: "01767911188",
};

export const DEMO_STUDENT = {
  id: "student-1",
  name: "মুহাম্মদ আব্দুল্লাহ",
  email: "student@qurankanon.com",
  role: "student",
  password: "password123",
  phone: "01812345678",
};

// Initial default courses
const INITIAL_COURSES = [
  {
    id: "course-1",
    title: "আম্মা-পারা নাযেরা ও তাজবীদ কোর্স",
    teacherId: "teacher-1",
    teacherName: "মাওলানা লোকমান আল মাহমুদ",
    category: "নাযেরা ও তাজবীদ",
    schedule: "সপ্তাহে ৩ দিন (সোম, বুধ, শুক্র সন্ধ্যা ৭:৩০)",
    fee: "৳২,০০০",
    seats: 15,
    enrolledCount: 12,
    level: "প্রাথমিক",
    badge: "অনলাইন লাইভ",
    description: "সহীহ মাখরাজ ও সিফাতসহ ৩০তম পারা (আম্মা-পারা) বিশুদ্ধ তিলাওয়াত শিক্ষা।",
    createdAt: "2026-01-10",
  },
  {
    id: "course-2",
    title: "মাশকে কুরআন ও তারতীল প্রশিক্ষণ",
    teacherId: "teacher-1",
    teacherName: "মাওলানা লোকমান আল মাহমুদ",
    category: "মাশক",
    schedule: "সপ্তাহে ৩ দিন (রবি, মঙ্গল, বৃহস্পতি রাত ৮:০০)",
    fee: "৳৩,৫০০",
    seats: 12,
    enrolledCount: 8,
    level: "মাধ্যমিক",
    badge: "লাইভ ক্লাস",
    description: "সরাসরি শিক্ষকের তত্ত্বাবধানে তিলাওয়াত অনুশীলন ও তারতীল সুর সংশোধন।",
    createdAt: "2026-02-01",
  },
];

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
    studentName: "মুহাম্মদ আব্দুল্লাহ",
    studentEmail: "student@qurankanon.com",
    courseId: "course-1",
    courseTitle: "আম্মা-পারা নাযেরা ও তাজবীদ কোর্স",
    teacherName: "মাওলানা লোকমান আল মাহমুদ",
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
    studentName: "মুহাম্মদ আব্দুল্লাহ",
    studentEmail: "student@qurankanon.com",
    courseId: "course-1",
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

export function registerUser({ name, email, password, role }) {
  const users = getStoredData("qk_users", [DEMO_TEACHER, DEMO_STUDENT]);
  const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return { success: false, message: "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট তৈরি করা আছে।" };
  }
  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email: email.toLowerCase(),
    password,
    role: role || "student",
  };
  users.push(newUser);
  setStoredData("qk_users", users);
  return { success: true, user: newUser };
}

export function loginUser(email, password) {
  const users = getStoredData("qk_users", [DEMO_TEACHER, DEMO_STUDENT]);
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) {
    return { success: false, message: "ভুল ইমেইল বা পাসওয়ার্ড। দয়া করে আবার চেষ্টা করুন।" };
  }
  setCurrentUser(user);
  return { success: true, user };
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
    teacherName: course.teacherName || "হাফেজ লোকমান আল মাহমুদ",
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
