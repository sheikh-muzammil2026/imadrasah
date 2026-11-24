"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/sidebar";
import { Menu, BookOpen, LogOut, User, GraduationCap, Shield } from "lucide-react";
import { getCurrentUser, logoutUser, initStore } from "@/lib/store";

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

    // Role protection
    const role = user.role?.toLowerCase();
    if (role === "student" && pathname.startsWith("/dashboard/teacher")) {
      router.push("/dashboard/student");
      return;
    }
    if (role === "teacher" && pathname.startsWith("/dashboard/student")) {
      router.push("/dashboard/teacher");
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
      <div className="h-screen flex items-center justify-center bg-[#F5FAFD] text-[#064E73]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-[#0288D1] border-t-transparent rounded-full animate-spin mx-auto" />
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
        <header className="h-16 bg-white border-b border-[#E2EEF5] px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-[#064E73] hover:text-[#0288D1] lg:hidden"
              aria-label="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-[#064E73] tracking-tight">
                কুরআন কানন ড্যাশবোর্ড
              </span>
            </div>
          </div>

          {/* User Profile & Role Badge & Logout */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Role Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                currentUser?.role === "teacher"
                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                  : currentUser?.role === "admin"
                  ? "bg-purple-100 text-purple-800 border border-purple-200"
                  : "bg-blue-100 text-[#0288D1] border border-blue-200"
              }`}
            >
              {currentUser?.role === "teacher" ? (
                <>
                  <User className="w-3.5 h-3.5" />
                  <span>শিক্ষক (Teacher)</span>
                </>
              ) : currentUser?.role === "admin" ? (
                <>
                  <Shield className="w-3.5 h-3.5" />
                  <span>অ্যাডমিন (Admin)</span>
                </>
              ) : (
                <>
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>শিক্ষার্থী (Student)</span>
                </>
              )}
            </span>

            {/* User Name */}
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-[#064E73] leading-tight">
                {currentUser?.name}
              </p>
              <p className="text-[10px] text-gray-400 leading-none mt-0.5">
                {currentUser?.email}
              </p>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-2xs cursor-pointer"
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
