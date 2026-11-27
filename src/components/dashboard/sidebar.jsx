"use client";

import { useState, useEffect } from "react";
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
  CalendarCheck2,
  FileSpreadsheet,
  ShieldAlert,
  ShieldCheck,
  History,
  Settings,
} from "lucide-react";
import { logoutUser } from "@/lib/store";
import { siteConfig } from "@/config/siteConfig";

const ICON_MAP = {
  LayoutDashboard,
  BookOpen,
  Briefcase,
  GraduationCap,
  Users,
  CalendarCheck2,
  FileCheck,
  FileSpreadsheet,
  PlusCircle,
  ShieldAlert,
  ShieldCheck,
  History,
  Settings,
};

export default function Sidebar({ isOpen, setIsOpen, user }) {
  const pathname = usePathname();
  const router = useRouter();
  const userRole = user?.role?.toLowerCase() || "student";

  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    const handleHashSync = () => {
      if (typeof window !== "undefined") {
        setCurrentHash(window.location.hash || "");
      }
    };
    handleHashSync();
    window.addEventListener("hashchange", handleHashSync);
    window.addEventListener("popstate", handleHashSync);
    return () => {
      window.removeEventListener("hashchange", handleHashSync);
      window.removeEventListener("popstate", handleHashSync);
    };
  }, [pathname]);

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  const roleMeta = siteConfig.roleLabels?.[userRole] || {
    bn: "ব্যবহারকারী",
    en: "User",
    badgeClass: "badge-success",
  };

  const getNavItems = () => {
    const rawNav = siteConfig.dashboardNav?.[userRole] || siteConfig.dashboardNav?.student || [];
    return rawNav.map((item) => {
      const IconComponent = typeof item.icon === "string" ? ICON_MAP[item.icon] || LayoutDashboard : item.icon;
      return {
        ...item,
        icon: IconComponent,
      };
    });
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
                <span className="font-extrabold text-xs sm:text-sm text-[#0D47A1] block leading-tight">
                  {siteConfig.identity.name.shortBn}
                </span>
                <span className={`text-[10px] mt-0.5 ${roleMeta.badgeClass}`}>
                  {roleMeta.bn}
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
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const cleanPath = (pathname || "").replace(/\/$/, "") || "/";

              const checkIsActive = (href) => {
                if (!href) return false;
                const cleanHref = href.replace(/\/$/, "") || "/";
                if (cleanHref.includes("#")) {
                  const [pathPart, hashPart] = cleanHref.split("#");
                  const normalizedPathPart = pathPart.replace(/\/$/, "") || "/";
                  return cleanPath === normalizedPathPart && currentHash === `#${hashPart}`;
                }
                return cleanPath === cleanHref && !currentHash;
              };

              const isActive = checkIsActive(item.href);

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition duration-150 ${
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
              {user?.name ? user.name.charAt(0) : "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#0D47A1] truncate">
                {user?.name || "ব্যবহারকারী"}
              </p>
              <p className="text-[10px] text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href="/"
              className="btn-outline py-1.5 px-2 text-[11px] justify-center"
            >
              <Home className="w-3.5 h-3.5" />
              <span>হোম সাইট</span>
            </Link>
            <button
              onClick={handleLogout}
              className="btn-danger py-1.5 px-2 text-[11px] justify-center"
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
