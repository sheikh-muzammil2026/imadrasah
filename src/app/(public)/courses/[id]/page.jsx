"use client";

import { use, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Users, BookOpen, ShieldCheck, PhoneCall } from "lucide-react";
import { toast } from "react-toastify";

export default function CourseDetailsPage({ params }) {
  const resolvedParams = use(params);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  const course = {
    id: resolvedParams.id,
    title: "আম্মা-পারা নাযেরা ও মাশক কোর্স",
    badge: "অনলাইন লাইভ + রেকর্ড",
    fee: "৳২০০০",
    duration: "১২ সপ্তাহ",
    lessons: "৩৬ লেসন",
    schedule: "সপ্তাহে ৩ দিন (সোম, বুধ, শুক্র)",
    time: "সন্ধ্যা ৭:৩০ - ৯:০০",
    instructor: "হাফেজ মাওলানা ক্বারী লোকমান আল মাহমুদ",
    instructorBio: "৮+ বছর আন্তর্জাতিক অনলাইন কুরআন পাঠদানে অভিজ্ঞ",
    description:
      "কুরআন মজিদের ৩০তম পারা (আম্মা-পারা) হরফের উচ্চারণ, তাজবীদের সকল নিয়ম এবং তারতীলের সাথে সহীহভাবে তিলাওয়াত শেখার বিশেষ সমন্বিত প্রশিক্ষণ।",
    modules: [
      "মৌলিক মাখরাজ ও সিফাত পরিচিতি",
      "নূন সাকিন ও তানভীনের নিয়মাবলি (ইযহার, ইদগাম, ইকলাব, ইখফা)",
      "মীম সাকিনের নিয়মাবলি ও গুন্নাহর প্রকারভেদ",
      "মাদ্দের প্রকার ও সঠিক মাত্রা বজায় রাখা",
      "আম্মা-পারার প্রতিটি সূরার শব্দে শব্দে তিলাওয়াত ও মাশক",
      "নামাযের প্রয়োজনীয় ছোট সূরা ও জরুরি দোয়া মুখস্থকরণ",
    ],
  };

  const handleEnroll = () => {
    setEnrolling(true);
    setTimeout(() => {
      setEnrolling(false);
      setEnrolled(true);
      toast.success("অভিনন্দন! আপনার কোর্সে আবেদন সফলভাবে সম্পন্ন হয়েছে।");
    }, 1000);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="text-xs text-[#4A606D] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#0288D1]">হোম</Link>
        <span>/</span>
        <Link href="/courses" className="hover:text-[#0288D1]">চলমান কোর্স</Link>
        <span>/</span>
        <span className="text-[#064E73] font-bold">{course.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Course Overview & Curriculum */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-[#E2EEF5] p-6 shadow-soft space-y-4">
            <span className="bg-[#0288D1] text-white text-xs font-bold px-3 py-1 rounded-md">
              {course.badge}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#064E73]">
              {course.title}
            </h1>
            <p className="text-sm text-[#4A606D] leading-relaxed">
              {course.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E2EEF5] text-xs font-semibold text-[#064E73]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0288D1]" />
                <span>মেয়াদ: {course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#0288D1]" />
                <span>ক্লাস: {course.lessons}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0288D1]" />
                <span>ব্যাচ: সর্বোচ্চ ১২ জন</span>
              </div>
            </div>
          </div>

          {/* Curriculum */}
          <div className="bg-white rounded-xl border border-[#E2EEF5] p-6 shadow-soft space-y-4">
            <h2 className="text-xl font-bold text-[#064E73]">
              কোর্স পাঠ্যসূচি (Curriculum)
            </h2>
            <div className="space-y-3">
              {course.modules.map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[#F5FAFD] border border-[#E2EEF5] text-xs sm:text-sm text-[#064E73] font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0288D1] shrink-0 mt-0.5" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor Bio */}
          <div className="bg-white rounded-xl border border-[#E2EEF5] p-6 shadow-soft space-y-2">
            <h2 className="text-xl font-bold text-[#064E73]">
              প্রধান প্রশিক্ষক
            </h2>
            <p className="text-base font-bold text-[#0288D1]">
              {course.instructor}
            </p>
            <p className="text-xs text-[#4A606D]">{course.instructorBio}</p>
          </div>
        </div>

        {/* Right Col: Enrollment Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-[#E2EEF5] p-6 shadow-soft sticky top-24 space-y-5">
            <div className="space-y-1">
              <span className="text-xs text-gray-500 font-medium">কোর্স ফি:</span>
              <div className="text-3xl font-extrabold text-[#064E73]">
                {course.fee}
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#4A606D] border-t border-b border-[#E2EEF5] py-4">
              <div className="flex justify-between">
                <span>ক্লাসের দিন:</span>
                <span className="font-bold text-[#064E73]">{course.schedule}</span>
              </div>
              <div className="flex justify-between">
                <span>ক্লাসের সময়:</span>
                <span className="font-bold text-[#064E73]">{course.time}</span>
              </div>
              <div className="flex justify-between">
                <span>প্লাটফর্ম:</span>
                <span className="font-bold text-[#064E73]">গুগল মিট / জুম লাইভ</span>
              </div>
            </div>

            {enrolled ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-lg text-center text-xs font-bold space-y-2">
                <div>✓ আপনি সফলভাবে তালিকাভুক্ত হয়েছেন!</div>
                <Link
                  href="/dashboard/student"
                  className="block bg-[#0288D1] text-white py-2 rounded-md"
                >
                  স্টুডেন্ট ড্যাশবোর্ডে যান
                </Link>
              </div>
            ) : (
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full bg-[#0288D1] hover:bg-[#0277BD] text-white font-bold py-3 rounded-lg shadow-sm transition duration-150 text-sm"
              >
                {enrolling ? "প্রক্রিয়াধীন..." : "এখনই কোর্সে ভর্তি হোন"}
              </button>
            )}

            <div className="text-center pt-2">
              <p className="text-xs text-gray-400">সরাসরি কথা বলতে কল করুন:</p>
              <a
                href="tel:01767911188"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#064E73] hover:text-[#0288D1] mt-1"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#0288D1]" />
                <span>+880 1767 911 188</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
