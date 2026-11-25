"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  LayoutDashboard,
  Users,
  LogOut,
  Home,
  FileCheck,
  PlusCircle,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { logoutUser } from "@/lib/store";
import { siteConfig } from "@/config/siteConfig";

export default function Sidebar({ isOpen, setIsOpen, user }) {
  const pathname = usePathname();
  const router = useRouter();
  const userRole = user?.role?.toLowerCase() || "student";

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  const getNavItems = () => {
    if (userRole === "admin") {
      return [
        { title: "অ্যাডমিন ড্যাশবোর্ড", href: "/dashboard/admin", icon: LayoutDashboard },
        { title: "কোর্স ভর্তি আবেদন", href: "/dashboard/admin/course-enrollments", icon: BookOpen },
        { title: "শিক্ষক আবেদনসমূহ", href: "/dashboard/admin/teacher-applications", icon: Briefcase },
        { title: "কোর্স ও বিভাগ", href: "/dashboard/admin#courses", icon: GraduationCap },
        { title: "ব্যবহারকারী তালিকা", href: "/dashboard/admin#users", icon: Users },
      ];
    }
    if (userRole === "teacher") {
      return [
        { title: "ড্যাশবোর্ড ওভারভিউ", href: "/dashboard/teacher", icon: LayoutDashboard },
        { title: "কোর্স ও অ্যাসাইনমেন্ট", href: "/dashboard/teacher#courses", icon: BookOpen },
        { title: "তালিকাভুক্ত শিক্ষার্থী", href: "/dashboard/teacher#students", icon: Users },
        { title: "জমা পড়া অ্যাসাইনমেন্ট", href: "/dashboard/teacher#submissions", icon: FileCheck },
      ];
    }
    // Student
    return [
      { title: "আমার ড্যাশবোর্ড", href: "/dashboard/student", icon: LayoutDashboard },
      { title: "আমার কোর্সসমূহ", href: "/dashboard/student#my-courses", icon: BookOpen },
      { title: "সকল কোর্সে ভর্তি হোন", href: "/dashboard/student#available-courses", icon: PlusCircle },
      { title: "অ্যাসাইনমেন্ট ও টাস্ক", href: "/dashboard/student#assignments", icon: FileCheck },
    ];
  };

  const navItems = getNavItems();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-[#90CAF9]/60 flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo Header */}
          <div className="h-16 px-5 border-b border-[#90CAF9]/60 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E3F2FD] text-[#2196F3] flex items-center justify-center font-bold border border-[#90CAF9]">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-sm text-[#0D47A1] block leading-tight">
                  {siteConfig.identity.name.bn}
                </span>
                <span className="text-[10px] text-[#2196F3] font-bold">
                  {userRole === "admin"
                    ? "অ্যাডমিন প্যানেল"
                    : userRole === "teacher"
                    ? "শিক্ষক প্যানেল"
                    : "শিক্ষার্থী পোর্টাল"}
                </span>
              </div>
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-400 hover:text-gray-600 p-1"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href.split("#")[0];
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition duration-150 ${
                    isActive
                      ? "bg-[#0D47A1] text-white shadow-xs"
                      : "text-slate-600 hover:bg-[#E3F2FD] hover:text-[#0D47A1]"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer Profile & Action */}
        <div className="p-4 border-t border-[#90CAF9]/60 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-[#E3F2FD] text-[#0D47A1] border border-[#90CAF9] font-black flex items-center justify-center text-sm shrink-0">
              {user?.name ? user.name.charAt(0) : "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#0D47A1] truncate">
                {user?.name || "অ্যাডমিনিস্ট্রেটর"}
              </p>
              <p className="text-[10px] text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href="/"
              className="flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] rounded-md hover:bg-[#90CAF9]/30 transition"
            >
              <Home className="w-3.5 h-3.5" />
              <span>হোম সাইট</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-bold text-red-600 bg-red-50 border border-red-100 rounded-md hover:bg-red-100 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>লগআউট</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
