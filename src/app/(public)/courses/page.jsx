"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, Clock, CheckCircle2, UserCheck } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const courses = siteConfig.courses;

  const categories = [
    { id: "all", name: "সকল কোর্স" },
    ...siteConfig.courses.map((c) => ({ id: c.slug, name: c.level })),
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.titleBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || c.slug === selectedCategory || c.level === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-shell">
      {/* Title & Header */}
      <div className="page-header-block">
        <div className="section-pill mb-2">
          আন্তর্জাতিক সিলেবাস
        </div>
        <h1 className="page-title-main">
          চলমান ৩টি মূল কোর্স প্রোগ্রাম
        </h1>
        <p className="page-subtitle-muted">
          ৪৫ মিনিটের ১-অন-১ লাইভ ক্লাসে আন্তর্জাতিক সনদপ্রাপ্ত শিক্ষকদের সরাসরি তত্ত্বাবধানে সহীহ কুরআন শিক্ষা
        </p>
        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-[#2196F3] font-bornomala">
          <Link href="/policies#admission" className="hover:underline hover:text-[#0D47A1] inline-flex items-center gap-1 bg-[#E3F2FD] border border-[#90CAF9]/60 px-3 py-1 rounded-full">
            <span>কোর্সে আবেদনের পূর্বে প্রাতিষ্ঠানিক ভর্তি নীতিমালা ও শিক্ষার্থীদের আচরণবিধি দেখুন →</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card-white-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#0D47A1] text-white shadow-xs"
                  : "bg-[#E3F2FD] text-[#0D47A1] border border-[#90CAF9]/50 hover:bg-[#90CAF9]/30"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="কোর্স বা স্তর খুঁজুন..."
            className="form-input pl-9"
          />
          <Search className="w-4 h-4 text-[#2196F3] absolute left-3 top-3" />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="card-white card-interactive flex flex-col justify-between overflow-hidden p-0!"
          >
            {/* Image */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
              <img
                src={course.image}
                alt={course.titleBn}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#2196F3] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                {course.badge}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-[11px] font-bold text-[#2196F3] uppercase">
                  {course.department}
                </div>
                <h3 className="text-lg font-bold text-[#0D47A1] mt-0.5">
                  {course.titleBn}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {course.shortDesc}
                </p>

                {/* Special Provision */}
                {course.specialProvision && (
                  <div className="mt-3 bg-[#E3F2FD] border border-[#90CAF9]/50 rounded-lg p-2 text-[11px] text-[#0D47A1] font-semibold flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#2196F3] shrink-0" />
                    <span>{course.specialProvision}</span>
                  </div>
                )}

                {/* Duration & Class Length */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-[#2196F3] mt-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-slate-700">{course.classDuration} / ক্লাস</span>
                  </span>
                  <span className="text-[#90CAF9]">|</span>
                  <span className="text-slate-700">{course.schedule}</span>
                </div>

                {/* Highlights */}
                <div className="mt-3 pt-3 border-t border-[#90CAF9]/30 space-y-1">
                  {course.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2196F3] shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="border-t border-[#90CAF9]/40 pt-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block">মাসিক ফি (ঘণ্টাপ্রতি)</span>
                  <span className="text-lg font-extrabold text-[#0D47A1]">
                    {course.fee}
                  </span>
                </div>
                <Link
                  href={`/courses/${course.slug}`}
                  className="btn-accent px-3.5 py-2 text-xs"
                >
                  <span>ভর্তি আবেদন</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
