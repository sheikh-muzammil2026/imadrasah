"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Users,
  GraduationCap,
  Library,
  MessageSquare,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";
import { siteConfig } from "@/config/siteConfig";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Courses state driven by 3 core courses from siteConfig
  const [courses, setCourses] = useState(
    siteConfig.courses.map((c, idx) => ({
      id: String(idx + 1),
      title: c.titleBn,
      teacher: c.instructor,
      schedule: c.schedule,
      fee: c.fee,
      seats: "15",
      enrolled: 10,
    }))
  );

  // Ebooks state
  const [ebooks, setEbooks] = useState([
    { id: "1", title: "তাজবীদের সহজ পাঠ", author: siteConfig.identity.founder.name, price: "৳১০০", pages: 120 },
    { id: "2", title: "সকাল-সন্ধ্যার আমল", author: siteConfig.identity.founder.name, price: "ফ্রি", pages: 64 },
    { id: "3", title: "আত-তামরীনুল কুরআনী", author: siteConfig.identity.founder.name, price: "৳২০০", pages: 180 },
  ]);

  // Testimonials state
  const [testimonials, setTestimonials] = useState([
    { id: "1", name: "মুহাম্মদ আব্দুল্লাহ", role: "আম্মা-পারা নাযেরা শিক্ষার্থী", rating: 5, comment: "অসাধারণ সহীহ পাঠদান।" },
    { id: "2", name: "নাসিমা বেগম", role: "অভিভাবক (যুক্তরাজ্য)", rating: 5, comment: "প্রবাসে থেকেও দ্বীনি পরিবেশ পেয়েছি।" },
  ]);

  // Users state
  const [users, setUsers] = useState([
    { id: "1", name: siteConfig.identity.founder.name, email: siteConfig.contact.email, role: "admin", teacherId: "0201" },
    { id: "2", name: "মাওলানা আব্দুল করিম", email: "teacher@madrasah.com", role: "teacher", teacherId: "0202" },
    { id: "3", name: "আব্দুর রহমান", email: "student1@example.com", role: "student" },
    { id: "4", name: "ফাতেমা আক্তার", email: "student2@example.com", role: "student" },
  ]);

  // New course form
  const [newCourse, setNewCourse] = useState({ title: "", teacher: "", fee: "", seats: "" });
  const [showAddCourse, setShowAddCourse] = useState(false);

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.fee) return;
    const added = {
      id: String(Date.now()),
      title: newCourse.title,
      teacher: newCourse.teacher || "লোকমান আল মাহমুদ",
      schedule: "সপ্তাহে ৩ দিন",
      fee: newCourse.fee,
      seats: newCourse.seats || "১৫",
      enrolled: 0,
    };
    setCourses([...courses, added]);
    setNewCourse({ title: "", teacher: "", fee: "", seats: "" });
    setShowAddCourse(false);
    toast.success("নতুন কোর্স সফলভাবে যুক্ত হয়েছে!");
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
    toast.info("কোর্স মুছে ফেলা হয়েছে।");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Notices: Teacher Recruitment & Course Enrollment Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Course Enrollments Management Card */}
        <div className="bg-[#E3F2FD] border border-[#90CAF9] rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-soft">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#2196F3] border border-[#90CAF9] flex items-center justify-center font-bold shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0D47A1]">
                কোর্স ভর্তি আবেদন ও স্টুডেন্ট আইডি (0401+)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                শিক্ষার্থীদের কোর্স ভর্তি আবেদন অনুমোদন করুন, স্টুডেন্ট আইডি বরাদ্দ করুন অথবা কারণ দর্শিয়ে আবেদন প্রত্যাখ্যান করুন।
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/admin/course-enrollments"
            className="self-start bg-[#0D47A1] hover:bg-[#0a3880] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <span>ভর্তি আবেদন তালিকা দেখুন</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Teacher Applications Card */}
        <div className="bg-white border border-[#90CAF9] rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-soft">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E3F2FD] text-[#2196F3] border border-[#90CAF9] flex items-center justify-center font-bold shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0D47A1]">
                শিক্ষক নিয়োগ আবেদন ও আইডি (0203+)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                নতুন শিক্ষকদের আবেদন পর্যালোচনা করুন এবং অনুমোদনের সাথে সাথে 0203+ আইডি বরাদ্দ করুন।
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/admin/teacher-applications"
            className="self-start bg-[#2196F3] hover:bg-[#1976D2] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <span>শিক্ষক আবেদন দেখুন</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Overview Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#90CAF9]/60 shadow-soft relative overflow-hidden">
          <div className="w-12 h-12 rounded-bl-full bg-[#E3F2FD] absolute top-0 right-0 border-l border-b border-[#90CAF9]/50" />
          <p className="text-xs font-semibold text-slate-600">নিবন্ধিত শিক্ষার্থী</p>
          <h3 className="text-2xl font-black text-[#0D47A1] mt-1">১২,৪০০+</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#90CAF9]/60 shadow-soft relative overflow-hidden">
          <div className="w-12 h-12 rounded-bl-full bg-[#E3F2FD] absolute top-0 right-0 border-l border-b border-[#90CAF9]/50" />
          <p className="text-xs font-semibold text-slate-600">চলমান কোর্স</p>
          <h3 className="text-2xl font-black text-[#2196F3] mt-1">{courses.length} টি</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#90CAF9]/60 shadow-soft relative overflow-hidden">
          <div className="w-12 h-12 rounded-bl-full bg-[#E3F2FD] absolute top-0 right-0 border-l border-b border-[#90CAF9]/50" />
          <p className="text-xs font-semibold text-slate-600">অনুমোদিত শিক্ষক</p>
          <h3 className="text-2xl font-black text-[#2196F3] mt-1">২৬ জন</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#90CAF9]/60 shadow-soft relative overflow-hidden">
          <div className="w-12 h-12 rounded-bl-full bg-[#90CAF9]/30 absolute top-0 right-0 border-l border-b border-[#90CAF9]/50" />
          <p className="text-xs font-semibold text-slate-600">সার্টিফিকেট প্রদান</p>
          <h3 className="text-2xl font-black text-[#0D47A1] mt-1">৯১০+</h3>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#90CAF9]/50 pb-2">
        {[
          { id: "overview", label: "কোর্স ব্যবস্থাপনা", icon: BookOpen },
          { id: "ebooks", label: "ই-বুক ব্যবস্থাপনা", icon: Library },
          { id: "testimonials", label: "টেস্টিমোনিয়াল", icon: MessageSquare },
          { id: "users", label: "ব্যবহারকারী তালিকা", icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#0D47A1] text-white shadow-xs"
                  : "bg-white text-[#0D47A1] border border-[#90CAF9] hover:bg-[#E3F2FD]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Courses Management */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0D47A1]">চলমান কোর্স ও বিভাগসমূহ</h2>
            <button
              onClick={() => setShowAddCourse(!showAddCourse)}
              className="bg-[#2196F3] hover:bg-[#1976D2] text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন কোর্স যোগ করুন</span>
            </button>
          </div>

          {showAddCourse && (
            <form onSubmit={handleAddCourse} className="bg-white p-5 rounded-xl border border-[#90CAF9] shadow-soft space-y-3">
              <h3 className="text-xs font-bold text-[#0D47A1]">নতুন কোর্সের তথ্য দিন</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="কোর্সের নাম *"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="px-3 py-1.5 border border-[#90CAF9]/60 rounded-md text-xs bg-[#E3F2FD]/20"
                  required
                />
                <input
                  type="text"
                  placeholder="শিক্ষকের নাম"
                  value={newCourse.teacher}
                  onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
                  className="px-3 py-1.5 border border-[#90CAF9]/60 rounded-md text-xs bg-[#E3F2FD]/20"
                />
                <input
                  type="text"
                  placeholder="ফি (যেমন: ৳২০০০) *"
                  value={newCourse.fee}
                  onChange={(e) => setNewCourse({ ...newCourse, fee: e.target.value })}
                  className="px-3 py-1.5 border border-[#90CAF9]/60 rounded-md text-xs bg-[#E3F2FD]/20"
                  required
                />
                <input
                  type="text"
                  placeholder="আসন সংখ্যা (যেমন: ১৫)"
                  value={newCourse.seats}
                  onChange={(e) => setNewCourse({ ...newCourse, seats: e.target.value })}
                  className="px-3 py-1.5 border border-[#90CAF9]/60 rounded-md text-xs bg-[#E3F2FD]/20"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCourse(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="bg-[#0D47A1] text-white text-xs font-bold px-4 py-1.5 rounded-md"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-5 rounded-xl border border-[#90CAF9]/60 shadow-soft space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm text-[#0D47A1]">{course.title}</h3>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-500">প্রশিক্ষক: {course.teacher}</p>
                <div className="flex justify-between text-xs pt-2 border-t border-[#90CAF9]/30">
                  <span className="font-bold text-[#0D47A1]">{course.fee}</span>
                  <span className="text-slate-500">ভর্তি: {course.enrolled}/{course.seats}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Users List */}
      {activeTab === "users" && (
        <div className="bg-white rounded-xl border border-[#90CAF9]/60 p-5 shadow-soft space-y-4">
          <h2 className="text-base font-bold text-[#0D47A1]">সিস্টেম ব্যবহারকারী ও শিক্ষকবৃন্দ</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#90CAF9] text-[#0D47A1] font-bold bg-[#E3F2FD]/40">
                  <th className="py-2.5 px-3">নাম</th>
                  <th className="py-2.5 px-3">ইমেইল</th>
                  <th className="py-2.5 px-3">রোল (Role)</th>
                  <th className="py-2.5 px-3">শিক্ষক আইডি (Teacher ID)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#90CAF9]/30">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#E3F2FD]/20">
                    <td className="py-2.5 px-3 font-semibold text-[#0D47A1]">{u.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{u.email}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          u.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : u.role === "teacher"
                            ? "bg-blue-100 text-[#0D47A1]"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {u.role === "admin" ? "অ্যাডমিন" : u.role === "teacher" ? "শিক্ষক" : "শিক্ষার্থী"}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                      {u.teacherId || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
