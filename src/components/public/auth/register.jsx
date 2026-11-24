"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BookOpen, User, Mail, Lock, GraduationCap, CheckCircle } from "lucide-react";
import { registerUser, initStore } from "@/lib/store";

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

  const handleSubmit = (e) => {
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

    const res = registerUser({
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role: formData.role,
    });

    setLoading(false);

    if (res.success) {
      toast.success(
        `অভিনন্দন! আপনার ${
          formData.role === "teacher" ? "শিক্ষক" : "শিক্ষার্থী"
        } অ্যাকাউন্ট তৈরি হয়েছে। এখন লগইন করুন।`
      );
      router.push(`/login?email=${encodeURIComponent(formData.email.trim())}`);
    } else {
      toast.error(res.message);
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
            নতুন অ্যাকাউন্ট নিবন্ধন
          </h2>
          <p className="text-xs text-[#4A606D]">
            কুরআন কাননের অনলাইন শিক্ষা প্ল্যাটফর্মে যুক্ত হতে তথ্য দিন
          </p>
        </div>

        {/* Mandatory Role Selector (Teacher vs Student) */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#064E73]">
            অ্যাকাউন্টের ধরন (Select Role) *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {/* Student Card Selector */}
            <button
              type="button"
              onClick={() => handleRoleSelect("student")}
              className={`p-3.5 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition text-left cursor-pointer ${
                formData.role === "student"
                  ? "border-[#0288D1] bg-[#D6EEFA]/30 text-[#0288D1] shadow-xs"
                  : "border-[#E2EEF5] bg-white text-[#4A606D] hover:bg-[#F5FAFD]"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-5 h-5" />
                <span className="text-xs font-bold">শিক্ষার্থী</span>
              </div>
              <span className="text-[10px] text-gray-500 text-center">
                কোর্সে ভর্তি ও ক্লাস করতে
              </span>
            </button>

            {/* Teacher Card Selector */}
            <button
              type="button"
              onClick={() => handleRoleSelect("teacher")}
              className={`p-3.5 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition text-left cursor-pointer ${
                formData.role === "teacher"
                  ? "border-[#0288D1] bg-[#D6EEFA]/30 text-[#0288D1] shadow-xs"
                  : "border-[#E2EEF5] bg-white text-[#4A606D] hover:bg-[#F5FAFD]"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <User className="w-5 h-5" />
                <span className="text-xs font-bold">শিক্ষক</span>
              </div>
              <span className="text-[10px] text-gray-500 text-center">
                কোর্স ও ক্লাস পরিচালনা করতে
              </span>
            </button>
          </div>
        </div>

        {/* Registration Form */}
        <form className="space-y-3.5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-[#064E73] mb-1">
              পুরো নাম *
            </label>
            <div className="relative">
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="আপনার পুরো নাম লিখুন"
                className="w-full pl-9 pr-3 py-2 border border-[#E2EEF5] rounded-lg bg-[#F5FAFD] text-xs text-[#064E73] focus:outline-hidden focus:border-[#0288D1]"
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#064E73] mb-1">
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
                className="w-full pl-9 pr-3 py-2 border border-[#E2EEF5] rounded-lg bg-[#F5FAFD] text-xs text-[#064E73] focus:outline-hidden focus:border-[#0288D1]"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#064E73] mb-1">
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
                className="w-full pl-9 pr-3 py-2 border border-[#E2EEF5] rounded-lg bg-[#F5FAFD] text-xs text-[#064E73] focus:outline-hidden focus:border-[#0288D1]"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#064E73] mb-1">
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
                className="w-full pl-9 pr-3 py-2 border border-[#E2EEF5] rounded-lg bg-[#F5FAFD] text-xs text-[#064E73] focus:outline-hidden focus:border-[#0288D1]"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-bold py-2.5 rounded-lg shadow-xs transition duration-150 disabled:opacity-50 mt-2"
          >
            {loading ? "নিবন্ধন সম্পন্ন হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন (Register)"}
          </button>
        </form>

        {/* Existing account prompt */}
        <div className="text-center pt-2 border-t border-[#E2EEF5]">
          <p className="text-xs text-[#4A606D]">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link href="/login" className="font-bold text-[#0288D1] hover:underline">
              লগইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
