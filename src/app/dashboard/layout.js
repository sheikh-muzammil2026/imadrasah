"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/sidebar";
import { Menu, LogOut, User, GraduationCap, Shield } from "lucide-react";
import { getCurrentUser, logoutUser, initStore } from "@/lib/store";
import { siteConfig } from "@/config/siteConfig";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initStore();
    const user = getCurrentUser();
    if (!user) {
      router.push("/login");
      return;
    }

    // Role-based protection from centralized siteConfig.routePermissions
    const role = user.role?.toLowerCase() || "student";
    if (pathname.startsWith("/dashboard/super-admin") && role !== "super_admin") {
      if (role === "admin") router.push("/dashboard/admin");
      else if (role === "teacher") router.push("/dashboard/teacher");
      else router.push("/dashboard/student");
      return;
    }
    if (pathname.startsWith("/dashboard/admin") && !["admin", "super_admin"].includes(role)) {
      if (role === "teacher") router.push("/dashboard/teacher");
      else router.push("/dashboard/student");
      return;
    }
    if (pathname.startsWith("/dashboard/teacher") && !["teacher", "admin", "super_admin"].includes(role)) {
      router.push("/dashboard/student");
      return;
    }

    setCurrUser(user);
    setLoading(false);
  }, [pathname, router]);

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F5FAFD] text-[#0D47A1]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-[#2196F3] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold">ড্যাশবোর্ড লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F5FAFD] antialiased overflow-hidden">
      {/* Responsive Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={currentUser} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-[#90CAF9]/60 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-[#0D47A1] hover:text-[#2196F3] lg:hidden"
              aria-label="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-[#0D47A1] tracking-tight">
                {siteConfig.identity.name.shortBn} ড্যাশবোর্ড
              </span>
            </div>
          </div>

          {/* User Profile & Role Badge & Logout */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Role Badge */}
            {(() => {
              const roleMeta = siteConfig.roleLabels?.[currentUser?.role] || {
                bn: "শিক্ষার্থী",
                en: "Student",
                badgeClass: "badge-success",
              };
              return (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${roleMeta.badgeClass}`}>
                  {currentUser?.role === "super_admin" ? (
                    <Shield className="w-3.5 h-3.5" />
                  ) : currentUser?.role === "admin" ? (
                    <Shield className="w-3.5 h-3.5" />
                  ) : currentUser?.role === "teacher" ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <GraduationCap className="w-3.5 h-3.5" />
                  )}
                  <span>{roleMeta.bn}</span>
                </span>
              );
            })()}

            {/* User Name */}
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-[#0D47A1] leading-tight">
                {currentUser?.name}
              </p>
              <p className="text-[10px] text-gray-400 leading-none mt-0.5">
                {currentUser?.email}
              </p>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="btn-danger py-1.5 px-2.5 text-xs"
              title="লগআউট করুন"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">লগআউট</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
