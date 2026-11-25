"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BookOpen, User, Mail, Lock, GraduationCap, CheckCircle } from "lucide-react";
import { registerUser, initStore } from "@/lib/store";
import { siteConfig } from "@/config/siteConfig";

export default function RegisterComponent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student", // default role
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      toast.error("অনুগ্রহ করে সকল আবশ্যক তথ্য পূরণ করুন।");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মেলেনি! দয়া করে সঠিক পাসওয়ার্ড দিন।");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);
    initStore();

    const res = await registerUser({
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role: formData.role,
    });

    setLoading(false);

    if (res.success) {
      toast.success(res.message || "নিবন্ধন সফলভাবে সম্পন্ন হয়েছে! অনুগ্রহ করে লগইন করুন।");
      router.push("/login");
    } else {
      toast.error(res.message || "নিবন্ধন ব্যর্থ হয়েছে।");
    }
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
            নতুন অ্যাকাউন্ট তৈরি করুন
          </h2>
          <p className="text-xs text-slate-600">
            {siteConfig.identity.name.bn}-এ যোগ দিন এবং আপনার দ্বীনি শিক্ষা সফর শুরু করুন
          </p>
        </div>

        {/* Role Toggle Switcher */}
        <div className="grid grid-cols-2 gap-3 p-1 bg-[#E3F2FD]/50 border border-[#90CAF9]/50 rounded-xl">
          <button
            type="button"
            onClick={() => handleRoleSelect("student")}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition duration-150 cursor-pointer ${
              formData.role === "student"
                ? "bg-white text-[#0D47A1] shadow-xs border border-[#90CAF9]"
                : "text-slate-600 hover:text-[#0D47A1]"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>আমি শিক্ষার্থী</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect("teacher")}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition duration-150 cursor-pointer ${
              formData.role === "teacher"
                ? "bg-white text-[#0D47A1] shadow-xs border border-[#90CAF9]"
                : "text-slate-600 hover:text-[#0D47A1]"
            }`}
          >
            <User className="w-4 h-4" />
            <span>আমি শিক্ষক</span>
          </button>
        </div>

        {/* Registration Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-[#0D47A1] mb-1">
              আপনার পুরো নাম *
            </label>
            <div className="relative">
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="যেমন: মুহাম্মদ আব্দুল্লাহ"
                className="w-full pl-9 pr-3 py-2.5 border border-[#90CAF9]/60 rounded-lg bg-[#E3F2FD]/30 text-xs text-slate-800 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0D47A1] mb-1">
              ইমেইল ঠিকানা *
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
            <label className="block text-xs font-semibold text-[#0D47A1] mb-1">
              পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর) *
            </label>
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

          <div>
            <label className="block text-xs font-semibold text-[#0D47A1] mb-1">
              পাসওয়ার্ড নিশ্চিত করুন *
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 border border-[#90CAF9]/60 rounded-lg bg-[#E3F2FD]/30 text-xs text-slate-800 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
              />
              <CheckCircle className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#0D47A1] hover:bg-[#0a3880] text-white text-xs font-bold rounded-lg shadow-xs transition duration-150 cursor-pointer disabled:opacity-50"
          >
            {loading ? "নিবন্ধন সম্পন্ন হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        {/* Login CTA */}
        <div className="text-center pt-2 border-t border-[#90CAF9]/40">
          <p className="text-xs text-slate-600">
            ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/login"
              className="font-bold text-[#2196F3] hover:underline"
            >
              লগইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
