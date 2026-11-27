"use client";

import Link from "next/link";
import { ChevronRight, Clock, CheckCircle2, UserCheck } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function CoursesSection() {
  const courses = siteConfig.courses;

  return (
    <section className="py-14 bg-[#E3F2FD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="section-pill mb-2">
              আন্তর্জাতিক পাঠ্যক্রম ও কোর্সসমূহ
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D47A1]">
              চলমান ৩টি মূল কোর্স প্রোগ্রাম
            </h2>
            <div className="w-16 h-1 bg-[#2196F3] rounded-full mt-2" />
          </div>

          <Link
            href="/courses"
            className="self-start sm:self-auto btn-primary"
          >
            <span>সকল কোর্সের বিবরণ</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-[#90CAF9]/60 overflow-hidden shadow-soft card-interactive flex flex-col justify-between group"
            >
              {/* Thumbnail Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <img
                  src={course.image}
                  alt={course.titleBn}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#2196F3] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                  {course.badge}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] font-bold text-[#2196F3] tracking-wide uppercase">
                    {course.department}
                  </div>
                  <h3 className="text-lg font-bold text-[#0D47A1] group-hover:text-[#2196F3] transition mt-1">
                    {course.titleBn}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {course.shortDesc}
                  </p>

                  {/* Special Provision Alert if any */}
                  {course.specialProvision && (
                    <div className="mt-3 bg-[#E3F2FD] border border-[#90CAF9]/50 rounded-lg p-2 text-[11px] text-[#0D47A1] font-semibold flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-[#2196F3] shrink-0" />
                      <span>{course.specialProvision}</span>
                    </div>
                  )}

                  {/* Duration & Schedule Meta */}
                  <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-[#2196F3] mt-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-slate-700">{course.classDuration} / ক্লাস</span>
                    </span>
                    <span className="text-[#90CAF9]">|</span>
                    <span className="text-slate-700">{course.duration}</span>
                  </div>

                  {/* Highlights */}
                  <div className="mt-4 pt-4 border-t border-[#90CAF9]/30 space-y-1.5">
                    {course.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2196F3] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Price & Action */}
                <div className="pt-4 border-t border-[#90CAF9]/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 block">মাসিক ফি (ঘণ্টাপ্রতি ফি)</span>
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
    </section>
  );
}
