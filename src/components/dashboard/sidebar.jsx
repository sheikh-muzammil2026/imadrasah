"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  BookOpen,
  LayoutDashboard,
  GraduationCap,
  Users,
  MessageSquare,
  Library,
  Video,
  LogOut,
  Home,
  UserCheck,
  ChevronRight,
  Shield,
} from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userRole = user?.role?.toLowerCase() || "student";

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  // Strictly 3 roles menu items
  const getNavItems = () => {
    if (userRole === "admin") {
      return [
        { title: "ওভারভিউ", href: "/dashboard/admin", icon: LayoutDashboard },
        { title: "চলমান কোর্স পরিচালনা", href: "/dashboard/admin?tab=courses", icon: BookOpen },
        { title: "ই-বুক লাইব্রেরি", href: "/dashboard/admin?tab=ebooks", icon: Library },
        { title: "রিভিউ ও টেস্টিমোনিয়াল", href: "/dashboard/admin?tab=testimonials", icon: MessageSquare },
        { title: "শিক্ষার্থী ও শিক্ষক তালিকা", href: "/dashboard/admin?tab=users", icon: Users },
      ];
    }
    if (userRole === "teacher") {
      return [
        { title: "ড্যাশবোর্ড", href: "/dashboard/teacher", icon: LayoutDashboard },
        { title: "আমার কোর্সসমূহ", href: "/dashboard/teacher?tab=courses", icon: BookOpen },
        { title: "লাইভ ক্লাস ও লেকচার", href: "/dashboard/teacher?tab=classes", icon: Video },
        { title: "তালিকাভুক্ত শিক্ষার্থী", href: "/dashboard/teacher?tab=students", icon: Users },
      ];
    }
    // Student
    return [
      { title: "আমার ড্যাশবোর্ড", href: "/dashboard/student", icon: LayoutDashboard },
      { title: "আমার কোর্সসমূহ", href: "/dashboard/student?tab=courses", icon: BookOpen },
      { title: "লাইভ ক্লাস ও রেকর্ডিং", href: "/dashboard/student?tab=classes", icon: Video },
      { title: "আমার ই-বুকসমূহ", href: "/dashboard/student?tab=ebooks", icon: Library },
    ];
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile backdrop */}
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
        {/* Brand Header */}
        <div>
          <div className="h-16 px-5 border-b border-[#E2EEF5] flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0288D1]/10 text-[#0288D1] flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-sm text-[#064E73] block leading-tight">
                  কুরআন কানন
                </span>
                <span className="text-[10px] text-[#0288D1] font-bold uppercase tracking-wider">
                  {userRole} প্যানেল
                </span>
              </div>
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href.split("?")[0];
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

        {/* Footer profile & actions */}
        <div className="p-4 border-t border-[#E2EEF5] space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-[#D6EEFA] text-[#064E73] font-black flex items-center justify-center text-sm shrink-0">
              {user?.name ? user.name.charAt(0) : "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#064E73] truncate">
                {user?.name || "ব্যবহারকারী"}
              </p>
              <p className="text-[10px] text-gray-400 truncate">
                {user?.email || "student@mail.com"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href="/"
              className="flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-bold text-[#064E73] bg-[#F5FAFD] border border-[#E2EEF5] rounded-md hover:bg-[#E2EEF5] transition"
            >
              <Home className="w-3.5 h-3.5" />
              <span>হোম</span>
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
