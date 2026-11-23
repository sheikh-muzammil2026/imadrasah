"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { BookOpen, User, Mail, Lock } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মেলেনি!");
      return;
    }

    setLoading(true);
    await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      },
      {
        onSuccess: () => {
          setLoading(false);
          toast.success("নিবন্ধন সফল হয়েছে! অনুগ্রহ করে লগইন করুন।");
          router.push("/login");
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(ctx.error.message || "নিবন্ধন করতে সমস্যা হয়েছে।");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5FAFD] px-4 py-12">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-soft border border-[#E2EEF5]">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#0288D1]/10 text-[#0288D1] flex items-center justify-center shadow-xs">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-[#064E73]">
            শিক্ষার্থী নিবন্ধন (Register)
          </h2>
          <p className="text-xs text-[#4A606D]">
            কুরআন কাননের অনলাইন ক্লাসে অংশ নিতে অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-[#064E73] mb-1">
              পুরো নাম
            </label>
            <div className="relative">
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="আপনার নাম"
                className="w-full pl-9 pr-3 py-2 border border-[#E2EEF5] rounded-lg bg-[#F5FAFD] text-xs text-[#064E73] focus:outline-hidden focus:border-[#0288D1]"
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#064E73] mb-1">
              ইমেইল
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
              পাসওয়ার্ড
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
              পাসওয়ার্ড নিশ্চিত করুন
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
            className="w-full bg-[#0288D1] hover:bg-[#0277BD] text-white text-sm font-bold py-2.5 rounded-lg shadow-xs transition duration-150 disabled:opacity-50"
          >
            {loading ? "নিবন্ধন সম্পন্ন হচ্ছে..." : "নিবন্ধন করুন (Register)"}
          </button>
        </form>

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
