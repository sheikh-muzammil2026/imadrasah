"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, Clock, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Strictly the 3 core courses
  const courses = siteConfig.courses;

  // Dynamic categories strictly based on siteConfig.courses
  const categories = [
    { id: "all", name: "সকল কোর্স" },
    ...siteConfig.courses.map((c) => ({ id: c.slug, name: c.titleBn })),
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.titleBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || c.slug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title & Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0D47A1]">
          চলমান ৩টি মূল বিভাগ
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          আপনার পছন্দমতো বিভাগে ভর্তি হয়ে আজই সহীহ কুরআন শিক্ষা শুরু করুন
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-[#90CAF9]/60 p-4 shadow-soft mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
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
            placeholder="বিভাগ খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 border border-[#90CAF9]/60 rounded-lg text-xs bg-[#E3F2FD]/30 focus:outline-hidden focus:border-[#2196F3] focus:ring-1 focus:ring-[#90CAF9]"
          />
          <Search className="w-4 h-4 text-[#2196F3] absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl border border-[#90CAF9]/60 overflow-hidden shadow-soft hover:shadow-card-hover transition duration-200 flex flex-col justify-between"
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
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
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

                {/* Duration & Schedule Meta */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#2196F3] mt-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-slate-700">{course.duration}</span>
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
                  <span className="text-[10px] text-slate-500 block">কোর্স ফি</span>
                  <span className="text-xl font-extrabold text-[#0D47A1]">
                    {course.fee}
                  </span>
                </div>
                <Link
                  href={`/courses/${course.slug}`}
                  className="bg-[#2196F3] hover:bg-[#1976D2] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs transition duration-150 flex items-center gap-1"
                >
                  <span>এখনই কোর্সে ভর্তি হোন</span>
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
