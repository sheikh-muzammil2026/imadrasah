"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { BookOpen, LogIn, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (data && !error) {
        toast.success("স্বাগতম! লগইন সফল হয়েছে।");

        const userRole = data?.user?.role?.toLowerCase();

        // 3-Role strict redirect
        if (userRole === "admin") {
          router.push("/dashboard/admin");
        } else if (userRole === "teacher") {
          router.push("/dashboard/teacher");
        } else {
          router.push("/dashboard/student");
        }
      }

      if (error) {
        toast.error(error.message || "ভুল ইমেইল বা পাসওয়ার্ড। আবার চেষ্টা করুন।");
      }
    } catch (err) {
      console.error("Login crash:", err);
      toast.error("লগইন করার সময় একটি অপ্রত্যাশিত সমস্যা হয়েছে।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5FAFD] px-4 py-12">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-soft border border-[#E2EEF5]">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#0288D1]/10 text-[#0288D1] flex items-center justify-center shadow-xs">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-[#064E73]">
            কুরআন কানন পোর্টালে লগইন
          </h2>
          <p className="text-xs text-[#4A606D]">
            অনলাইন মাদ্রাসা অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন
          </p>
        </div>

        <form className="space-y-4 pt-2" onSubmit={handleSubmit}>
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
                className="w-full pl-9 pr-3 py-2.5 border border-[#E2EEF5] rounded-lg bg-[#F5FAFD] text-xs text-[#064E73] focus:outline-hidden focus:border-[#0288D1]"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0288D1] hover:bg-[#0277BD] text-white text-sm font-bold py-2.5 rounded-lg shadow-xs transition duration-150 disabled:opacity-50"
          >
            {isSubmitting ? "প্রবেশ করা হচ্ছে..." : "লগইন করুন (Login)"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#E2EEF5]">
          <p className="text-xs text-[#4A606D]">
            নতুন শিক্ষার্থী?{" "}
            <Link href="/register" className="font-bold text-[#0288D1] hover:underline">
              এখানে নিবন্ধন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
