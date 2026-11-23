"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Video, Calendar, BookOpen } from "lucide-react";

export default function CoursesSection() {
  const [courses] = useState([
    {
      id: "course-1",
      title: "আম্মা-পারা নাযেরা",
      badge: "অনলাইন • রেকর্ড ভিডিও",
      features: "২৩টি ভিডিও লেসন • পিডিএফ • কুইজ • সার্টিফিকেট",
      meta: ["১২ সপ্তাহ", "৩৬ লেসন"],
      price: "৳২০০০",
      image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "course-2",
      title: "মাশকে কুরআন প্রশিক্ষণ",
      badge: "লাইভ সেশন",
      features: "২৪টি লাইভ সেশন • অনুশীলন পিডিএফ • সার্টিফিকেট",
      meta: ["৮ সপ্তাহ", "২৪ ক্লাস"],
      price: "৳৩,৫০০",
      image: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "course-3",
      title: "কুরআন সহিহকরণ কোর্স",
      badge: "রেকর্ড ভিডিও • সহজবোধ্য",
      features: "সবার জন্য কুরআন শিক্ষা • মৌলিক তাজবীদ",
      meta: ["লাইফটাইম", "রেকর্ডেড ভিডিও"],
      price: "৳৯৮০",
      image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=600&auto=format&fit=crop",
    },
  ]);

  return (
    <section className="py-12 bg-[#F5FAFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#064E73]">
              চলমান কোর্স
            </h2>
            <div className="w-10 h-1 bg-[#0288D1] rounded-full mt-2" />
          </div>

          <Link
            href="/courses"
            className="bg-[#0288D1] hover:bg-[#0277BD] text-white text-sm font-bold px-4 py-2 rounded-lg transition duration-150 shadow-xs flex items-center gap-1.5"
          >
            <span>সব কোর্স</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Carousel / 3-Column Grid */}
        <div className="relative">
          {/* Navigation Arrows for reference look */}
          <div className="hidden lg:flex items-center justify-between absolute top-1/2 -left-4 -right-4 -translate-y-1/2 z-20 pointer-events-none">
            <button
              className="w-10 h-10 rounded-full bg-[#0288D1] hover:bg-[#0277BD] text-white flex items-center justify-center shadow-md pointer-events-auto transition cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-[#0288D1] hover:bg-[#0277BD] text-white flex items-center justify-center shadow-md pointer-events-auto transition cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-[#E2EEF5] overflow-hidden shadow-soft hover:shadow-card-hover transition duration-200 flex flex-col"
              >
                {/* 16:9 Thumbnail Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#0288D1] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                    {course.badge}
                  </div>
                </div>

                {/* Body Padding p-5 */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#064E73] hover:text-[#0288D1] transition">
                      {course.title}
                    </h3>
                    <p className="text-xs text-[#4A606D] mt-1 line-clamp-1">
                      {course.features}
                    </p>

                    {/* Meta tags with blue diamonds */}
                    <div className="flex items-center gap-4 text-xs font-semibold text-[#0288D1] mt-3">
                      {course.meta.map((m, idx) => (
                        <span key={idx} className="flex items-center gap-1.5">
                          <span className="text-[10px]">◆</span>
                          <span className="text-[#4A606D]">{m}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Divider line */}
                  <div className="border-t border-[#E2EEF5] pt-3 flex items-center justify-between">
                    <span className="text-xl font-extrabold text-[#064E73]">
                      {course.price}
                    </span>
                    <Link
                      href={`/courses/${course.id}`}
                      className="bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-bold px-4 py-2 rounded-md shadow-xs transition"
                    >
                      বিস্তারিত
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
