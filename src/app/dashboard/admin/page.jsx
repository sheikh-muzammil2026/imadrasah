"use client";

import { useState } from "react";
import {
  BookOpen,
  Users,
  GraduationCap,
  Library,
  MessageSquare,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
} from "lucide-react";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Courses state
  const [courses, setCourses] = useState([
    {
      id: "1",
      title: "আম্মা-পারা নাযেরা",
      teacher: "হাফেজ ক্বারী লোকমান আল মাহমুদ",
      schedule: "সপ্তাহে ৩ দিন (সন্ধ্যা ৭:৩০)",
      fee: "৳২০০০",
      seats: "১২",
      enrolled: 11,
    },
    {
      id: "2",
      title: "মাশকে কুরআন প্রশিক্ষণ",
      teacher: "হাফেজ ক্বারী লোকমান আল মাহমুদ",
      schedule: "সপ্তাহে ৩ দিন (রাত ৮:০০)",
      fee: "৳৩,৫০০",
      seats: "১৫",
      enrolled: 14,
    },
    {
      id: "3",
      title: "কুরআন সহিহকরণ কোর্স",
      teacher: "মাওলানা আব্দুল করিম",
      schedule: "রেকর্ডেড + উইকলি লাইভ",
      fee: "৳৯৮০",
      seats: "৫০",
      enrolled: 38,
    },
  ]);

  // Ebooks state
  const [ebooks, setEbooks] = useState([
    { id: "1", title: "তাজবীদের সহজ পাঠ", author: "লোকমান আল মাহমুদ", price: "৳১০০", pages: 120 },
    { id: "2", title: "সকাল-সন্ধ্যার আমল", author: "লোকমান আল মাহমুদ", price: "ফ্রি", pages: 64 },
    { id: "3", title: "আত-তামরীনুল কুরআনী", author: "লোকমান আল মাহমুদ", price: "৳২০০", pages: 180 },
  ]);

  // Testimonials state
  const [testimonials, setTestimonials] = useState([
    { id: "1", name: "মুহাম্মদ আব্দুল্লাহ", role: "আম্মা-পারা নাযেরা শিক্ষার্থী", rating: 5, comment: "অসাধারণ সহীহ পাঠদান।" },
    { id: "2", name: "নাসিমা বেগম", role: "অভিভাবক (যুক্তরাজ্য)", rating: 5, comment: "প্রবাসে থেকেও দ্বীনি পরিবেশ পেয়েছি।" },
  ]);

  // Users state
  const [users, setUsers] = useState([
    { id: "1", name: "লোকমান আল মাহমুদ", email: "lokman@qurankanon.com", role: "admin" },
    { id: "2", name: "মাওলানা আব্দুল করিম", email: "karim@qurankanon.com", role: "teacher" },
    { id: "3", name: "আব্দুর রহমান", email: "rahman@student.com", role: "student" },
    { id: "4", name: "ফাতেমা আক্তার", email: "fatema@student.com", role: "student" },
  ]);

  // New course form
  const [newCourse, setNewCourse] = useState({ title: "", teacher: "", fee: "", seats: "" });
  const [showAddCourse, setShowAddCourse] = useState(false);

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.fee) return;
    const added = {
      id: String(Date.now()),
      title: newCourse.title,
      teacher: newCourse.teacher || "লোকমান আল মাহমুদ",
      schedule: "সপ্তাহে ৩ দিন",
      fee: newCourse.fee,
      seats: newCourse.seats || "১৫",
      enrolled: 0,
    };
    setCourses([...courses, added]);
    setNewCourse({ title: "", teacher: "", fee: "", seats: "" });
    setShowAddCourse(false);
    toast.success("নতুন কোর্স সফলভাবে যুক্ত হয়েছে!");
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
    toast.info("কোর্স মুছে ফেলা হয়েছে।");
  };

  return (
    <div className="space-y-6">
      {/* Overview Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E2EEF5] shadow-soft relative overflow-hidden">
          <div className="w-12 h-12 rounded-bl-full bg-[#D6EEFA] absolute top-0 right-0" />
          <p className="text-xs font-semibold text-[#4A606D]">নিবন্ধিত শিক্ষার্থী</p>
          <h3 className="text-2xl font-black text-[#0288D1] mt-1">১২,৪০০+</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E2EEF5] shadow-soft relative overflow-hidden">
          <div className="w-12 h-12 rounded-bl-full bg-[#D6EEFA] absolute top-0 right-0" />
          <p className="text-xs font-semibold text-[#4A606D]">চলমান কোর্স</p>
          <h3 className="text-2xl font-black text-[#0288D1] mt-1">{courses.length} টি</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E2EEF5] shadow-soft relative overflow-hidden">
          <div className="w-12 h-12 rounded-bl-full bg-[#D6EEFA] absolute top-0 right-0" />
          <p className="text-xs font-semibold text-[#4A606D]">অভিজ্ঞ শিক্ষক</p>
          <h3 className="text-2xl font-black text-[#0288D1] mt-1">২৬ জন</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E2EEF5] shadow-soft relative overflow-hidden">
          <div className="w-12 h-12 rounded-bl-full bg-[#FEF3C7] absolute top-0 right-0" />
          <p className="text-xs font-semibold text-[#4A606D]">সার্টিফিকেট প্রদান</p>
          <h3 className="text-2xl font-black text-[#064E73] mt-1">৯১০+</h3>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E2EEF5] pb-2">
        {[
          { id: "overview", label: "কোর্স ব্যবস্থাপনা", icon: BookOpen },
          { id: "ebooks", label: "ই-বুক ব্যবস্থাপনা", icon: Library },
          { id: "testimonials", label: "টেস্টিমোনিয়াল", icon: MessageSquare },
          { id: "users", label: "ব্যবহারকারী তালিকা", icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === tab.id
                  ? "bg-[#0288D1] text-white shadow-xs"
                  : "bg-white text-[#064E73] border border-[#E2EEF5] hover:bg-[#F5FAFD]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Courses Management */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#064E73]">সকল চলমান অনলাইন কোর্স</h2>
            <button
              onClick={() => setShowAddCourse(!showAddCourse)}
              className="bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন কোর্স যোগ করুন</span>
            </button>
          </div>

          {showAddCourse && (
            <form onSubmit={handleAddCourse} className="bg-white p-5 rounded-xl border border-[#0288D1]/30 shadow-soft space-y-3">
              <h3 className="text-xs font-bold text-[#064E73]">নতুন কোর্সের তথ্য দিন</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="কোর্সের নাম *"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="px-3 py-1.5 border border-[#E2EEF5] rounded-md text-xs bg-[#F5FAFD]"
                  required
                />
                <input
                  type="text"
                  placeholder="শিক্ষকের নাম"
                  value={newCourse.teacher}
                  onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
                  className="px-3 py-1.5 border border-[#E2EEF5] rounded-md text-xs bg-[#F5FAFD]"
                />
                <input
                  type="text"
                  placeholder="ফি (যেমন: ৳২০০০) *"
                  value={newCourse.fee}
                  onChange={(e) => setNewCourse({ ...newCourse, fee: e.target.value })}
                  className="px-3 py-1.5 border border-[#E2EEF5] rounded-md text-xs bg-[#F5FAFD]"
                  required
                />
                <input
                  type="text"
                  placeholder="আসন সংখ্যা (যেমন: ১৫)"
                  value={newCourse.seats}
                  onChange={(e) => setNewCourse({ ...newCourse, seats: e.target.value })}
                  className="px-3 py-1.5 border border-[#E2EEF5] rounded-md text-xs bg-[#F5FAFD]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCourse(false)}
                  className="px-3 py-1 border border-gray-300 rounded text-xs"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 bg-[#0288D1] text-white rounded text-xs font-bold"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          )}

          {/* Table */}
          <div className="bg-white rounded-xl border border-[#E2EEF5] overflow-x-auto shadow-soft">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5FAFD] border-b border-[#E2EEF5] text-[#064E73]">
                <tr>
                  <th className="p-3">কোর্সের নাম</th>
                  <th className="p-3">প্রশিক্ষক</th>
                  <th className="p-3">সময়সূচি</th>
                  <th className="p-3">ফি</th>
                  <th className="p-3">ভর্তি / আসন</th>
                  <th className="p-3 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2EEF5]">
                {courses.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F5FAFD]/50">
                    <td className="p-3 font-bold text-[#064E73]">{c.title}</td>
                    <td className="p-3 text-gray-600">{c.teacher}</td>
                    <td className="p-3 text-gray-500">{c.schedule}</td>
                    <td className="p-3 font-bold text-[#0288D1]">{c.fee}</td>
                    <td className="p-3 text-gray-600">
                      {c.enrolled} / {c.seats}
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleDeleteCourse(c.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: E-Books */}
      {activeTab === "ebooks" && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#064E73]">ডিজিটাল ই-বুক তালিকা</h2>
          <div className="bg-white rounded-xl border border-[#E2EEF5] overflow-x-auto shadow-soft">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5FAFD] border-b border-[#E2EEF5] text-[#064E73]">
                <tr>
                  <th className="p-3">বইয়ের নাম</th>
                  <th className="p-3">লেখক</th>
                  <th className="p-3">পৃষ্ঠা সংখ্যা</th>
                  <th className="p-3">মূল্য</th>
                  <th className="p-3 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2EEF5]">
                {ebooks.map((b) => (
                  <tr key={b.id} className="hover:bg-[#F5FAFD]/50">
                    <td className="p-3 font-bold text-[#064E73]">{b.title}</td>
                    <td className="p-3 text-gray-600">{b.author}</td>
                    <td className="p-3 text-gray-500">{b.pages}</td>
                    <td className="p-3 font-bold text-[#0288D1]">{b.price}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setEbooks(ebooks.filter((item) => item.id !== b.id))}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Testimonials */}
      {activeTab === "testimonials" && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#064E73]">শিক্ষার্থী ও অভিভাবকদের মতামত</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-4 rounded-xl border border-[#E2EEF5] shadow-soft space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-[#064E73]">{t.name}</h3>
                    <p className="text-[11px] text-gray-400">{t.role}</p>
                  </div>
                  <button
                    onClick={() => setTestimonials(testimonials.filter((item) => item.id !== t.id))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-600 italic">"{t.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Users */}
      {activeTab === "users" && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#064E73]">প্ল্যাটফর্ম ইউজার তালিকা</h2>
          <div className="bg-white rounded-xl border border-[#E2EEF5] overflow-x-auto shadow-soft">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5FAFD] border-b border-[#E2EEF5] text-[#064E73]">
                <tr>
                  <th className="p-3">নাম</th>
                  <th className="p-3">ইমেইল</th>
                  <th className="p-3">রোল</th>
                  <th className="p-3 text-right">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2EEF5]">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#F5FAFD]/50">
                    <td className="p-3 font-bold text-[#064E73]">{u.name}</td>
                    <td className="p-3 text-gray-600">{u.email}</td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          u.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : u.role === "teacher"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        সক্রিয়
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
