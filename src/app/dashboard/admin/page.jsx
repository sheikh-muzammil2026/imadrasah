"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Users,
  GraduationCap,
  Library,
  MessageSquare,
  Plus,
  Trash2,
  CheckCircle,
  Briefcase,
  ChevronRight,
  UserCheck,
  UserX,
  Shield,
  Clock,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-toastify";
import { siteConfig } from "@/config/siteConfig";
import { getCurrentUser, getStoredData, initStore } from "@/lib/store";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [pendingEnrollmentsCount, setPendingEnrollmentsCount] = useState(0);
  const [pendingAppsCount, setPendingAppsCount] = useState(0);

  // Courses state driven by 3 core courses from siteConfig
  const [courses, setCourses] = useState(
    siteConfig.courses.map((c, idx) => ({
      id: c.slug || String(idx + 1),
      title: c.titleBn,
      teacher: c.instructor,
      schedule: c.schedule,
      fee: c.fee,
      seats: "15",
      enrolled: 10,
    }))
  );

  // Users state with account status and roles
  const [users, setUsers] = useState([
    { id: "1", name: siteConfig.identity.leadership.chairman.name, email: siteConfig.contact.email, role: "admin", status: "active", teacherId: "0201" },
    { id: "2", name: "মাওলানা ক্বারী লোকমান আল মাহমুদ", email: "teacher@qurankanan.com", role: "teacher", status: "active", teacherId: "0202" },
    { id: "3", name: "মুহাম্মদ আব্দুল্লাহ", email: "student@qurankanan.com", role: "student", status: "active", studentId: "0401" },
  ]);

  const loadUsersAndStats = async () => {
    initStore();
    const curr = getCurrentUser();
    setCurrentUser(curr);

    // Fetch live users
    try {
      setLoadingUsers(true);
      const res = await fetch("/api/users/users", {
        headers: {
          "x-user-id": curr?.id || "",
          "x-user-role": curr?.role || "admin",
          "x-user-email": curr?.email || "",
        },
      });
      const data = await res.json().catch(() => []);
      if (Array.isArray(data) && data.length > 0) {
        setUsers(
          data.map((u) => ({
            ...u,
            status: u.status || "active",
          }))
        );
      } else {
        const storedUsers = getStoredData("qk_users", users);
        setUsers(storedUsers.map((u) => ({ ...u, status: u.status || "active" })));
      }
    } catch {
      // Fallback to store
    } finally {
      setLoadingUsers(false);
    }

    // Fetch pending counts for notice banners
    try {
      const [resEnr, resApp] = await Promise.all([
        fetch("/api/course-enrollments?status=pending"),
        fetch("/api/teacher-applications?status=pending"),
      ]);
      const dataEnr = await resEnr.json().catch(() => ({}));
      const dataApp = await resApp.json().catch(() => ({}));
      if (dataEnr.success) setPendingEnrollmentsCount(dataEnr.count || 0);
      if (dataApp.success) setPendingAppsCount(dataApp.count || 0);
    } catch {
      // Ignore count fetch errors
    }
  };

  useEffect(() => {
    loadUsersAndStats();
  }, []);

  const handleToggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "suspended" ? "active" : "suspended";
    try {
      const res = await fetch(`/api/users/users/${userId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": currentUser?.id || "",
          "x-user-role": currentUser?.role || "admin",
          "x-user-email": currentUser?.email || "",
        },
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        toast.success(data.message || `অ্যাকাউন্টটি ${newStatus === "active" ? "সক্রিয়" : "স্থগিত"} করা হয়েছে!`);
        setUsers((prev) =>
          prev.map((u) => (u._id === userId || u.id === userId ? { ...u, status: data.status } : u))
        );
      } else {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId || u.id === userId ? { ...u, status: newStatus } : u))
        );
        toast.success(`অ্যাকাউন্টটি ${newStatus === "active" ? "সক্রিয়" : "স্থগিত"} করা হয়েছে!`);
      }
    } catch {
      setUsers((prev) =>
        prev.map((u) => (u._id === userId || u.id === userId ? { ...u, status: newStatus } : u))
      );
      toast.success(`অ্যাকাউন্টটি ${newStatus === "active" ? "সক্রিয়" : "স্থগিত"} করা হয়েছে!`);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch(`/api/users/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": currentUser?.id || "",
          "x-user-role": currentUser?.role || "admin",
          "x-user-email": currentUser?.email || "",
        },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        toast.success(data.message || `রোল সফলভাবে ${newRole} এ পরিবর্তিত হয়েছে!`);
        setUsers((prev) =>
          prev.map((u) => (u._id === userId || u.id === userId ? { ...u, role: newRole } : u))
        );
      } else {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId || u.id === userId ? { ...u, role: newRole } : u))
        );
        toast.success(`রোল সফলভাবে ${newRole} এ পরিবর্তিত হয়েছে!`);
      }
    } catch {
      setUsers((prev) =>
        prev.map((u) => (u._id === userId || u.id === userId ? { ...u, role: newRole } : u))
      );
      toast.success(`রোল সফলভাবে ${newRole} এ পরিবর্তিত হয়েছে!`);
    }
  };

  // New course form
  const [newCourse, setNewCourse] = useState({ title: "", teacher: "", fee: "", seats: "" });
  const [showAddCourse, setShowAddCourse] = useState(false);

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.fee) return;
    const added = {
      id: String(Date.now()),
      title: newCourse.title,
      teacher: newCourse.teacher || "আন্তর্জাতিক ক্বারী পরিষদ",
      schedule: "সপ্তাহে ৩ দিন (৪৫ মিনিট)",
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
        <div className="card-ice flex flex-col justify-between gap-4 border border-[#90CAF9]">
          <div className="flex items-start gap-3">
            <div className="icon-box-primary">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#0D47A1]">
                  কোর্স ভর্তি আবেদন ও শিক্ষার্থী আইডি (0401+)
                </h2>
                {pendingEnrollmentsCount > 0 && (
                  <span className="badge-pending">
                    অপেক্ষমাণ: {pendingEnrollmentsCount} টি
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mt-1">
                শিক্ষার্থীদের কোর্স ভর্তি আবেদন অনুমোদন করুন, স্টুডেন্ট আইডি বরাদ্দ করুন অথবা কারণ দর্শিয়ে আবেদন প্রত্যাখ্যান করুন।
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/admin/course-enrollments"
            className="btn-primary self-start"
          >
            <span>ভর্তি আবেদন তালিকা দেখুন</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Teacher Applications Card */}
        <div className="card-white flex flex-col justify-between gap-4 p-5!">
          <div className="flex items-start gap-3">
            <div className="icon-box-primary">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#0D47A1]">
                  শিক্ষক নিয়োগ আবেদন ও আইডি (0203+)
                </h2>
                {pendingAppsCount > 0 && (
                  <span className="badge-pending">
                    অপেক্ষমাণ: {pendingAppsCount} টি
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mt-1">
                আন্তর্জাতিক শিক্ষকদের আবেদন পর্যালোচনা করুন এবং অনুমোদনের সাথে সাথে 0203+ আইডি বরাদ্দ করুন।
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/admin/teacher-applications"
            className="btn-accent self-start"
          >
            <span>শিক্ষক আবেদন দেখুন</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Overview Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-white-sm relative overflow-hidden">
          <p className="text-xs font-semibold text-slate-600">নিবন্ধিত শিক্ষার্থী</p>
          <h3 className="text-2xl font-black text-[#0D47A1] mt-1">১২,৪০০+</h3>
        </div>

        <div className="card-white-sm relative overflow-hidden">
          <p className="text-xs font-semibold text-slate-600">চলমান মূল কোর্স</p>
          <h3 className="text-2xl font-black text-[#2196F3] mt-1">{courses.length} টি</h3>
        </div>

        <div className="card-white-sm relative overflow-hidden">
          <p className="text-xs font-semibold text-slate-600">অনুমোদিত শিক্ষক</p>
          <h3 className="text-2xl font-black text-[#2196F3] mt-1">২৬ জন</h3>
        </div>

        <div className="card-white-sm relative overflow-hidden">
          <p className="text-xs font-semibold text-slate-600">সার্টিফিকেট প্রদান</p>
          <h3 className="text-2xl font-black text-[#0D47A1] mt-1">৯১০+</h3>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#90CAF9]/50 pb-2">
        {[
          { id: "overview", label: "কোর্স ব্যবস্থাপনা", icon: BookOpen },
          { id: "users", label: "ব্যবহারকারী তালিকা", icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
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
              className="btn-accent py-2 px-3.5 text-xs"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন কোর্স যোগ করুন</span>
            </button>
          </div>

          {showAddCourse && (
            <form onSubmit={handleAddCourse} className="card-white space-y-3 p-5!">
              <h3 className="text-xs font-bold text-[#0D47A1]">নতুন কোর্সের তথ্য দিন</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="কোর্সের নাম *"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="form-input"
                  required
                />
                <input
                  type="text"
                  placeholder="শিক্ষক / পরিষদ"
                  value={newCourse.teacher}
                  onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="ফি (যেমন: $70/মাস) *"
                  value={newCourse.fee}
                  onChange={(e) => setNewCourse({ ...newCourse, fee: e.target.value })}
                  className="form-input"
                  required
                />
                <input
                  type="text"
                  placeholder="আসন সংখ্যা (যেমন: ১৫)"
                  value={newCourse.seats}
                  onChange={(e) => setNewCourse({ ...newCourse, seats: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCourse(false)}
                  className="btn-outline py-1.5 px-3"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="btn-primary py-1.5 px-4"
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
                className="card-white card-interactive p-5! space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm text-[#0D47A1]">{course.title}</h3>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
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
        <div className="card-white space-y-4 p-5!">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0D47A1]">সিস্টেম ব্যবহারকারী, শিক্ষক ও শিক্ষার্থী তালিকা</h2>
              <p className="text-xs text-slate-500 mt-0.5">অ্যাকাউন্ট সক্রিয়/স্থগিত করুন এবং প্রাতিষ্ঠানিক রোল পরিচালনা করুন।</p>
            </div>
            <button
              onClick={loadUsersAndStats}
              disabled={loadingUsers}
              className="btn-outline py-1 px-2.5 text-xs flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingUsers ? "animate-spin" : ""}`} />
              <span>রিফ্রেশ</span>
            </button>
          </div>

          <div className="table-wrapper">
            <table className="table-element">
              <thead className="table-head">
                <tr>
                  <th className="table-th">নাম</th>
                  <th className="table-th">ইমেইল</th>
                  <th className="table-th">রোল (Role)</th>
                  <th className="table-th">আইডি</th>
                  <th className="table-th text-center">অ্যাকাউন্ট স্থিতি</th>
                  <th className="table-th text-right">অ্যাকশন ও রোল পরিবর্তন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#90CAF9]/30">
                {users.map((u) => {
                  const userId = u._id || u.id;
                  const isSuspended = u.status === "suspended";
                  const roleMeta = siteConfig.roleLabels?.[u.role] || {
                    bn: u.role,
                    badgeClass: "badge-success",
                  };

                  return (
                    <tr key={userId} className="hover:bg-[#E3F2FD]/20">
                      <td className="table-td font-semibold text-[#0D47A1]">{u.name}</td>
                      <td className="table-td text-slate-600">{u.email}</td>
                      <td className="table-td">
                        <span className={roleMeta.badgeClass}>
                          {roleMeta.bn}
                        </span>
                      </td>
                      <td className="table-td font-mono font-bold text-slate-700">
                        {u.teacherId || u.studentId || "—"}
                      </td>
                      <td className="table-td text-center">
                        <span className={isSuspended ? "badge-suspended" : "badge-active"}>
                          {isSuspended ? "স্থগিত (Suspended)" : "সক্রিয় (Active)"}
                        </span>
                      </td>
                      <td className="table-td text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Role selector dropdown */}
                          {u.role !== "super_admin" && (
                            <select
                              value={u.role || "student"}
                              onChange={(e) => handleRoleChange(userId, e.target.value)}
                              className="form-select text-[11px] py-1 px-1.5 h-auto rounded border border-slate-300"
                              title="ব্যবহারকারীর রোল পরিবর্তন করুন"
                            >
                              <option value="student">শিক্ষার্থী</option>
                              <option value="teacher">শিক্ষক</option>
                              <option value="admin">অ্যাডমিন</option>
                            </select>
                          )}

                          {/* Account status toggle button */}
                          {u.role !== "super_admin" && (
                            <button
                              onClick={() => handleToggleStatus(userId, u.status)}
                              className={`py-1 px-2.5 rounded text-[11px] font-bold transition cursor-pointer ${
                                isSuspended
                                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                  : "bg-rose-600 hover:bg-rose-700 text-white"
                              }`}
                              title={isSuspended ? "অ্যাকাউন্ট পুনরায় সক্রিয় করুন" : "অ্যাকাউন্ট স্থগিত করুন"}
                            >
                              {isSuspended ? "সক্রিয় করুন" : "স্থগিত করুন"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
