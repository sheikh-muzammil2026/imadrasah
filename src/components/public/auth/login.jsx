"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BookOpen, LogIn, Lock, Mail, User, GraduationCap, Zap } from "lucide-react";
import { loginUser, setCurrentUser, DEMO_TEACHER, DEMO_STUDENT, initStore } from "@/lib/store";

export default function LoginComponent() {
  const router = useRouter();

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

  const handleLogin = (email, password) => {
    setIsSubmitting(true);
    initStore();

    const res = loginUser(email, password);
    setIsSubmitting(false);

    if (res.success) {
      toast.success(`স্বাগতম, ${res.user.name}! লগইন সফল হয়েছে।`);

      // Role-based auto redirect
      const role = res.user.role?.toLowerCase();
      if (role === "teacher") {
        router.push("/dashboard/teacher");
      } else if (role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/student");
      }
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

    if (demoUser.role === "teacher") {
      router.push("/dashboard/teacher");
    } else {
      router.push("/dashboard/student");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5FAFD] px-4 py-12">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-soft border border-[#E2EEF5]">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <div className="mx-auto w-12 h-12 rounded-full bg-[#0288D1]/10 text-[#0288D1] flex items-center justify-center shadow-xs hover:bg-[#0288D1] hover:text-white transition">
              <BookOpen className="w-6 h-6" />
            </div>
          </Link>
          <h2 className="text-2xl font-black text-[#064E73]">
            কুরআন কানন পোর্টালে লগইন
          </h2>
          <p className="text-xs text-[#4A606D]">
            শিক্ষক বা শিক্ষার্থী ড্যাশবোর্ডে প্রবেশ করতে লগইন করুন
          </p>
        </div>

        {/* Demo Quick-Login Buttons Section */}
        <div className="bg-[#F5FAFD] border border-[#D6EEFA] rounded-xl p-3.5 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#064E73]">
            <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>ডেমো কুইক-লগইন (১-ক্লিকে টেস্ট করুন):</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin(DEMO_TEACHER)}
              className="flex items-center justify-center gap-2 bg-white border border-[#0288D1]/40 hover:bg-[#0288D1] hover:text-white text-[#064E73] p-2 rounded-lg text-xs font-bold transition shadow-2xs group cursor-pointer"
            >
              <User className="w-4 h-4 text-[#0288D1] group-hover:text-white" />
              <span>শিক্ষক ডেমো</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin(DEMO_STUDENT)}
              className="flex items-center justify-center gap-2 bg-white border border-[#0288D1]/40 hover:bg-[#0288D1] hover:text-white text-[#064E73] p-2 rounded-lg text-xs font-bold transition shadow-2xs group cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-[#0288D1] group-hover:text-white" />
              <span>শিক্ষার্থী ডেমো</span>
            </button>
          </div>
        </div>

        {/* Standard Email/Password Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-[#064E73] mb-1">
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
                className="w-full pl-9 pr-3 py-2.5 border border-[#E2EEF5] rounded-lg bg-[#F5FAFD] text-xs text-[#064E73] focus:outline-hidden focus:border-[#0288D1]"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-[#064E73]">
                পাসওয়ার্ড
              </label>
              <span className="text-[11px] text-[#0288D1] cursor-pointer hover:underline">
                পাসওয়ার্ড ভুলে গেছেন?
              </span>
            </div>
            <div className="relative">
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 border border-[#E2EEF5] rounded-lg bg-[#F5FAFD] text-xs text-[#064E73] focus:outline-hidden focus:border-[#0288D1]"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-bold py-2.5 rounded-lg shadow-xs transition duration-150 disabled:opacity-50"
          >
            {isSubmitting ? "লগইন হচ্ছে..." : "লগইন করুন (Login)"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#E2EEF5]">
          <p className="text-xs text-[#4A606D]">
            নতুন ব্যবহারকারী?{" "}
            <Link href="/register" className="font-bold text-[#0288D1] hover:underline">
              এখানে নিবন্ধন করুন (Register)
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
