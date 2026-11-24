"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  LayoutDashboard,
  GraduationCap,
  Users,
  Video,
  LogOut,
  Home,
  FileCheck,
  PlusCircle,
} from "lucide-react";
import { logoutUser } from "@/lib/store";

export default function Sidebar({ isOpen, setIsOpen, user }) {
  const pathname = usePathname();
  const router = useRouter();
  const userRole = user?.role?.toLowerCase() || "student";

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  const getNavItems = () => {
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
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-[#E2EEF5] flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo Header */}
          <div className="h-16 px-5 border-b border-[#E2EEF5] flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0288D1]/10 text-[#0288D1] flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-sm text-[#064E73] block leading-tight">
                  কুরআন কানন
                </span>
                <span className="text-[10px] text-[#0288D1] font-bold">
                  {userRole === "teacher" ? "শিক্ষক প্যানেল" : "শিক্ষার্থী পোর্টাল"}
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
                      ? "bg-[#0288D1] text-white shadow-xs"
                      : "text-[#4A606D] hover:bg-[#F5FAFD] hover:text-[#064E73]"
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
        <div className="p-4 border-t border-[#E2EEF5] space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-[#D6EEFA] text-[#064E73] font-black flex items-center justify-center text-sm shrink-0">
              {user?.name ? user.name.charAt(0) : "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#064E73] truncate">
                {user?.name}
              </p>
              <p className="text-[10px] text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href="/"
              className="flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-bold text-[#064E73] bg-[#F5FAFD] border border-[#E2EEF5] rounded-md hover:bg-[#E2EEF5] transition"
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
