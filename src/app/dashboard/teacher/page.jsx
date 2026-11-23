"use client";

import { useState } from "react";
import { BookOpen, Video, Users, FileText, CheckCircle2, Clock } from "lucide-react";
import { toast } from "react-toastify";

export default function TeacherDashboard() {
  const [liveLink, setLiveLink] = useState("https://meet.google.com/qkn-quran-live");
  const [classNotice, setClassNotice] = useState("আজকের ক্লাসে সূরা আন-নাবার ১-১৫ আয়াতের মাশক নেওয়া হবে।");

  const [courses] = useState([
    {
      id: "1",
      title: "আম্মা-পারা নাযেরা (ব্যাচ-০৩)",
      schedule: "সোম, বুধ, শুক্র (সন্ধ্যা ৭:৩০)",
      totalStudents: 12,
      completedLessons: 18,
      totalLessons: 36,
    },
    {
      id: "2",
      title: "মহিলাদের মাশকে কুরআন (ব্যাচ-০১)",
      schedule: "রবি, মঙ্গল, বৃহস্পতি (রাত ৮:০০)",
      totalStudents: 15,
      completedLessons: 12,
      totalLessons: 24,
    },
  ]);

  const [students] = useState([
    { id: "s1", name: "মুহাম্মদ আব্দুল্লাহ", course: "আম্মা-পারা নাযেরা", attendance: "৯৬%", progress: "ভালো" },
    { id: "s2", name: "আহমদ শাফী", course: "আম্মা-পারা নাযেরা", attendance: "১০০%", progress: "চমৎকার" },
    { id: "s3", name: "ফারহানা আক্তার", course: "মাশকে কুরআন", attendance: "৯২%", progress: "ভালো" },
  ]);

  const handleUpdateClass = (e) => {
    e.preventDefault();
    toast.success("লাইভ ক্লাসের লিংক ও নোটিশ আপডেট হয়েছে!");
  };

  return (
    <div className="space-y-6">
      {/* Teacher Welcome Header */}
      <div className="bg-white p-6 rounded-xl border border-[#E2EEF5] shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#0288D1] bg-[#D6EEFA]/40 px-3 py-1 rounded-full">
            শিক্ষক ড্যাশবোর্ড
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#064E73] mt-2">
            আসসালামু আলাইকুম, সম্মানিত শিক্ষক
          </h1>
          <p className="text-xs text-[#4A606D] mt-1">
            আজকের নির্ধারিত অনলাইন ক্লাস পরিচালনা ও শিক্ষার্থীদের অগ্রগতি পরিচালনা করুন
          </p>
        </div>

        <a
          href={liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-xs flex items-center gap-2 transition"
        >
          <Video className="w-4 h-4" />
          <span>লাইভ ক্লাসরুমে প্রবেশ</span>
        </a>
      </div>

      {/* Live Class Management Box */}
      <div className="bg-white p-6 rounded-xl border border-[#E2EEF5] shadow-soft space-y-4">
        <h2 className="text-sm font-bold text-[#064E73] flex items-center gap-2">
          <Video className="w-4 h-4 text-[#0288D1]" />
          <span>পরবর্তী লাইভ ক্লাসের লিংক ও নোটিশ নিয়ন্ত্রণ</span>
        </h2>

        <form onSubmit={handleUpdateClass} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              গুগল মিট / জুম লিংক
            </label>
            <input
              type="url"
              value={liveLink}
              onChange={(e) => setLiveLink(e.target.value)}
              className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              ক্লাসের আজকের নোটিশ / সবক
            </label>
            <input
              type="text"
              value={classNotice}
              onChange={(e) => setClassNotice(e.target.value)}
              className="w-full px-3 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD]"
              required
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-bold px-4 py-2 rounded-lg transition"
            >
              আপডেট করুন
            </button>
          </div>
        </form>
      </div>

      {/* Assigned Courses */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#064E73]">আমার সক্রিয় ব্যাচসমূহ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((c) => (
            <div key={c.id} className="bg-white p-5 rounded-xl border border-[#E2EEF5] shadow-soft space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm text-[#064E73]">{c.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{c.schedule}</p>
                </div>
                <span className="text-xs font-bold text-[#0288D1] bg-[#D6EEFA]/40 px-2 py-0.5 rounded">
                  {c.totalStudents} জন শিক্ষার্থী
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>অগ্রগতি</span>
                  <span className="font-bold text-[#064E73]">
                    {c.completedLessons} / {c.totalLessons} লেসন
                  </span>
                </div>
                <div className="w-full bg-[#E2EEF5] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0288D1] h-full rounded-full"
                    style={{ width: `${(c.completedLessons / c.totalLessons) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrolled Students Table */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#064E73]">শিক্ষার্থীদের উপস্থিতি ও মূল্যায়ন</h2>
        <div className="bg-white rounded-xl border border-[#E2EEF5] overflow-x-auto shadow-soft">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5FAFD] border-b border-[#E2EEF5] text-[#064E73]">
              <tr>
                <th className="p-3">শিক্ষার্থীর নাম</th>
                <th className="p-3">কোর্স</th>
                <th className="p-3">গড় উপস্থিতি</th>
                <th className="p-3">মূল্যায়ন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2EEF5]">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-[#F5FAFD]/50">
                  <td className="p-3 font-bold text-[#064E73]">{s.name}</td>
                  <td className="p-3 text-gray-600">{s.course}</td>
                  <td className="p-3 font-bold text-emerald-600">{s.attendance}</td>
                  <td className="p-3">
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {s.progress}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
