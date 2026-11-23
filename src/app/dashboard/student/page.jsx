"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Video, Library, Download, Award, Clock, CheckCircle } from "lucide-react";

export default function StudentDashboard() {
  const [enrolledCourses] = useState([
    {
      id: "1",
      title: "আম্মা-পারা নাযেরা",
      teacher: "হাফেজ মাওলানা ক্বারী লোকমান আল মাহমুদ",
      schedule: "সপ্তাহে ৩ দিন (সোম, বুধ, শুক্র)",
      time: "সন্ধ্যা ৭:৩০ - ৯:০০",
      progress: "৫০%",
      nextClass: "আজ সন্ধ্যা ৭:৩০ মিনিটে",
      liveLink: "https://meet.google.com/qkn-quran-live",
    },
  ]);

  const [myEbooks] = useState([
    { id: "1", title: "তাজবীদের সহজ পাঠ", author: "লোকমান আল মাহমুদ", pages: 120 },
    { id: "2", title: "সকাল-সন্ধ্যার আমল", author: "লোকমান আল মাহমুদ", pages: 64 },
  ]);

  return (
    <div className="space-y-6">
      {/* Welcome Hero */}
      <div className="bg-white p-6 rounded-xl border border-[#E2EEF5] shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#0288D1] bg-[#D6EEFA]/40 px-3 py-1 rounded-full">
            শিক্ষার্থী ড্যাশবোর্ড
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#064E73] mt-2">
            স্বাগতম, শিক্ষার্থী পোর্টালে
          </h1>
          <p className="text-xs text-[#4A606D] mt-1">
            আপনার অনলাইন কুরআন ক্লাস, অগ্রগতি ও পাঠ্য উপাদানসমূহ এখানে দেখতে পারেন
          </p>
        </div>

        <a
          href={enrolledCourses[0]?.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-bold px-6 py-3 rounded-lg shadow-xs flex items-center gap-2 transition"
        >
          <Video className="w-4 h-4" />
          <span>আজকের লাইভ ক্লাসে যোগ দিন</span>
        </a>
      </div>

      {/* Enrolled Courses */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#064E73]">আমার চলমান কোর্সসমূহ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrolledCourses.map((c) => (
            <div
              key={c.id}
              className="bg-white p-5 rounded-xl border border-[#E2EEF5] shadow-soft space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base text-[#064E73]">{c.title}</h3>
                  <p className="text-xs text-[#4A606D] mt-0.5">প্রশিক্ষক: {c.teacher}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  চলমান
                </span>
              </div>

              <div className="bg-[#F5FAFD] rounded-lg p-3 text-xs space-y-1 text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#0288D1]" />
                  <span>ক্লাসের সময়: {c.schedule} ({c.time})</span>
                </div>
                <div className="flex items-center gap-2 text-[#0288D1] font-bold">
                  <span>পরবর্তী ক্লাস: {c.nextClass}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>কোর্স সমাপ্তি</span>
                  <span className="font-bold text-[#064E73]">{c.progress}</span>
                </div>
                <div className="w-full bg-[#E2EEF5] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0288D1] h-full rounded-full"
                    style={{ width: c.progress }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E2EEF5]">
                <a
                  href={c.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0288D1] text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-[#0277BD] transition"
                >
                  লাইভ ক্লাসে যোগ দিন
                </a>
                <button
                  onClick={() => alert("পূর্ববর্তী ক্লাসের রেকর্ডিং ড্রাইভ ওপেন হচ্ছে...")}
                  className="text-xs font-bold text-[#064E73] hover:text-[#0288D1] border border-[#E2EEF5] px-3 py-1.5 rounded-md"
                >
                  রেকর্ডেড ক্লাস
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Digital E-Books */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#064E73]">আমার ডিজিটাল ই-বুকসমূহ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myEbooks.map((b) => (
            <div
              key={b.id}
              className="bg-white p-4 rounded-xl border border-[#E2EEF5] shadow-soft flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D6EEFA]/50 text-[#0288D1] flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#064E73]">{b.title}</h4>
                  <p className="text-[10px] text-gray-400">{b.author}</p>
                </div>
              </div>

              <button
                onClick={() => alert(`ডাউনলোড হচ্ছে: ${b.title}`)}
                className="p-2 border border-[#E2EEF5] rounded-lg text-[#0288D1] hover:bg-[#F5FAFD] transition"
                title="ডাউনলোড"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
