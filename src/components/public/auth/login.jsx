"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { BookOpen, LogIn, Lock, Mail, User, GraduationCap, Zap } from "lucide-react";
import { loginUser, setCurrentUser, DEMO_TEACHER, DEMO_STUDENT, initStore } from "@/lib/store";
import { siteConfig } from "@/config/siteConfig";

export default function LoginComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    initStore();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const redirectAfterLogin = (user) => {
    if (callbackUrl) {
      router.push(callbackUrl);
      return;
    }
    const role = user.role?.toLowerCase();
    if (role === "teacher") {
      router.push("/dashboard/teacher");
    } else if (role === "admin") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/student");
    }
  };

  const handleLogin = (email, password) => {
    setIsSubmitting(true);
    initStore();

    const res = loginUser(email, password);
    setIsSubmitting(false);

    if (res.success) {
      toast.success(`স্বাগতম, ${res.user.name}! লগইন সফল হয়েছে।`);
      redirectAfterLogin(res.user);
    } else {
      toast.error(res.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("দয়া করে ইমেইল ও পাসওয়ার্ড প্রদান করুন।");
      return;
    }
    handleLogin(formData.email.trim(), formData.password);
  };

  // Demo 1-Click Quick-Login
  const handleQuickLogin = (demoUser) => {
    initStore();
    setCurrentUser(demoUser);
    toast.success(`${demoUser.role === "teacher" ? "শিক্ষক" : "শিক্ষার্থী"} ডেমো হিসেবে লগইন সম্পন্ন!`);
    redirectAfterLogin(demoUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E3F2FD] px-4 py-12">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-soft border border-[#90CAF9]/60">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <div className="mx-auto w-12 h-12 rounded-full bg-[#E3F2FD] text-[#2196F3] border border-[#90CAF9] flex items-center justify-center shadow-xs hover:bg-[#0D47A1] hover:text-white transition">
              <BookOpen className="w-6 h-6" />
            </div>
          </Link>
          <h2 className="text-2xl font-black text-[#0D47A1]">
            {siteConfig.identity.name.bn} পোর্টালে লগইন
          </h2>
          <p className="text-xs text-slate-600">
            {callbackUrl
              ? "কোর্সে আবেদন সম্পন্ন করতে অনুগ্রহ করে লগইন করুন"
              : "শিক্ষক বা শিক্ষার্থী ড্যাশবোর্ডে প্রবেশ করতে লগইন করুন"}
          </p>
        </div>

        {/* Demo Quick-Login Buttons Section */}
        <div className="bg-[#E3F2FD]/50 border border-[#90CAF9]/60 rounded-xl p-3.5 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0D47A1]">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>ডেমো কুইক-লগইন (১-ক্লিকে টেস্ট করুন):</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin(DEMO_TEACHER)}
              className="flex items-center justify-center gap-2 bg-white border border-[#90CAF9] hover:bg-[#0D47A1] hover:text-white text-[#0D47A1] p-2 rounded-lg text-xs font-bold transition shadow-2xs group cursor-pointer"
            >
              <User className="w-4 h-4 text-[#2196F3] group-hover:text-white" />
              <span>শিক্ষক ডেমো</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin(DEMO_STUDENT)}
              className="flex items-center justify-center gap-2 bg-white border border-[#90CAF9] hover:bg-[#0D47A1] hover:text-white text-[#0D47A1] p-2 rounded-lg text-xs font-bold transition shadow-2xs group cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-[#2196F3] group-hover:text-white" />
              <span>শিক্ষার্থী ডেমো</span>
            </button>
          </div>
        </div>

        {/* Standard Email/Password Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-[#0D47A1] mb-1">
              ইমেইল ঠিকানা
            </label>
            <div className="relative">
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="w-full pl-9 pr-3 py-2.5 border border-[#90CAF9]/60 rounded-lg bg-[#E3F2FD]/30 text-xs text-slate-800 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-[#0D47A1]">
                পাসওয়ার্ড
              </label>
            </div>
            <div className="relative">
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 border border-[#90CAF9]/60 rounded-lg bg-[#E3F2FD]/30 text-xs text-slate-800 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-[#0D47A1] hover:bg-[#0a3880] text-white text-xs font-bold rounded-lg shadow-xs transition duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{isSubmitting ? "লগইন হচ্ছে..." : "লগইন করুন"}</span>
          </button>
        </form>

        {/* Register CTA */}
        <div className="text-center pt-2 border-t border-[#90CAF9]/40">
          <p className="text-xs text-slate-600">
            এখনো অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/register"
              className="font-bold text-[#2196F3] hover:underline"
            >
              নতুন অ্যাকাউন্ট খুলুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
