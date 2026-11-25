"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, Menu, X, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { getCurrentUser, logoutUser, initStore } from "@/lib/store";
import { siteConfig } from "@/config/siteConfig";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState("bn");
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  const checkUser = () => {
    initStore();
    const u = getCurrentUser();
    setUser(u);
  };

  useEffect(() => {
    checkUser();
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", checkUser);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  // Removed standalone FAQ link, replaced with Career link
  const navLinks = [
    { name: "কোর্স", href: "/courses" },
    { name: "ই-বুক", href: "/ebooks" },
    { name: "পরিচিতি", href: "/about" },
    { name: "ক্যারিয়ার", href: "/career" },
    { name: "ডোনেশন", href: "/donation" },
  ];

  const userRole = user?.role?.toLowerCase() || "student";

  const getDashboardLink = () => {
    if (userRole === "teacher") return "/dashboard/teacher";
    if (userRole === "admin") return "/dashboard/admin";
    return "/dashboard/student";
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setIsOpen(false);
    router.push("/login");
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#90CAF9]/50 transition-all duration-200 ${isScrolled ? "shadow-sm py-2.5" : "py-3"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Institute Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#E3F2FD] border border-[#90CAF9] flex items-center justify-center text-[#2196F3] group-hover:bg-[#0D47A1] group-hover:text-white transition-all shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg text-[#0D47A1] tracking-tight leading-tight">
                {siteConfig.identity.name.bn}
              </span>
              <span className="text-[11px] font-semibold text-[#2196F3] -mt-0.5 tracking-wide hidden sm:block">
                {siteConfig.identity.subtitle.bn}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-bold transition-colors duration-150 relative py-1 ${isActive
                      ? "text-[#2196F3]"
                      : "text-[#0D47A1] hover:text-[#2196F3]"
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2196F3] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher Pill */}
            <button
              onClick={() => setLang(lang === "bn" ? "en" : "bn")}
              className="flex items-center bg-[#E3F2FD] border border-[#90CAF9] rounded-full px-3 py-1 text-xs font-bold text-[#0D47A1] hover:bg-[#90CAF9]/30 transition cursor-pointer"
            >
              <span className={lang === "bn" ? "text-[#0D47A1]" : "text-slate-400"}>বাং</span>
              <span className="mx-1 text-[#90CAF9]">/</span>
              <span className={lang === "en" ? "text-[#0D47A1]" : "text-slate-400"}>EN</span>
            </button>

            {/* Auth Button */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href={getDashboardLink()}
                  className="flex items-center gap-1.5 bg-[#0D47A1] hover:bg-[#0a3880] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xs transition duration-150"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>ড্যাশবোর্ড ({user.role})</span>
                </Link>
                <button
                  onClick={handleLogout}
                  title="লগআউট"
                  className="p-2 border border-[#90CAF9] text-slate-500 hover:text-red-600 hover:border-red-300 rounded-lg transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 bg-[#0D47A1] hover:bg-[#0a3880] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xs transition duration-150"
                >
                  <LogIn className="w-4 h-4" />
                  <span>লগইন</span>
                </Link>
                <Link
                  href="/register"
                  className="border border-[#0D47A1] text-[#0D47A1] hover:bg-[#E3F2FD] text-xs font-bold px-3 py-2 rounded-lg transition"
                >
                  রেজিস্টার
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {user ? (
              <Link
                href={getDashboardLink()}
                className="bg-[#0D47A1] text-white text-xs font-bold px-3 py-1.5 rounded-md"
              >
                ড্যাশবোর্ড
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-[#0D47A1] text-white text-xs font-bold px-3 py-1.5 rounded-md"
              >
                লগইন
              </Link>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#0D47A1] hover:text-[#2196F3] focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-[#90CAF9]/50 mt-3 pt-3 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-bold ${pathname === link.href
                    ? "bg-[#E3F2FD] text-[#2196F3]"
                    : "text-[#0D47A1] hover:bg-[#E3F2FD]/50"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-[#90CAF9]/50 flex items-center justify-between px-3">
              <button
                onClick={() => setLang(lang === "bn" ? "en" : "bn")}
                className="text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] border border-[#90CAF9] px-3 py-1 rounded-full"
              >
                ভাষা: {lang === "bn" ? "বাংলা" : "English"}
              </button>
              {user && (
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-red-600 flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>লগআউট</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
