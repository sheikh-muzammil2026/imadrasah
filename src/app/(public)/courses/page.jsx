"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, BookOpen, Clock, Users, CheckCircle } from "lucide-react";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const courses = [
    {
      id: "course-1",
      title: "আম্মা-পারা নাযেরা",
      category: "nazera",
      badge: "অনলাইন • রেকর্ড ভিডিও",
      features: "২৩টি ভিডিও লেসন • পিডিএফ • কুইজ • সার্টিফিকেট",
      meta: ["১২ সপ্তাহ", "৩৬ লেসন"],
      price: "৳২০০০",
      teacher: "হাফেজ মাওলানা ক্বারী লোকমান আল মাহমুদ",
      description:
        "শিশু ও বড়দের জন্য আম্মা-পারা সহীহভাবে তিলাওয়াত শেখার বিশেষ কোর্স। প্রতিটি হরফের মাখরাজ ও সিফাত পুঙ্খানুপুঙ্খভাবে অনুশীলন করানো হয়।",
      image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "course-2",
      title: "মাশকে কুরআন প্রশিক্ষণ",
      category: "mashq",
      badge: "লাইভ সেশন",
      features: "২৪টি লাইভ সেশন • অনুশীলন পিডিএফ • সার্টিফিকেট",
      meta: ["৮ সপ্তাহ", "২৪ ক্লাস"],
      price: "৳৩,৫০০",
      teacher: "হাফেজ ক্বারী লোকমান আল মাহমুদ",
      description:
        "মহিলা ও পুরুষদের জন্য পৃথক লাইভ মাশক ব্যাচ। সরাসরি শিক্ষকের সামনে তিলাওয়াত করে ভুল সংশোধনের সুবর্ণ সুযোগ।",
      image: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "course-3",
      title: "কুরআন সহিহকরণ কোর্স",
      category: "tajweed",
      badge: "রেকর্ড ভিডিও • সহজবোধ্য",
      features: "সবার জন্য কুরআন শিক্ষা • মৌলিক তাজবীদ",
      meta: ["লাইফটাইম", "রেকর্ডেড ভিডিও"],
      price: "৳৯৮০",
      teacher: "মাওলানা আব্দুল করিম",
      description:
        "ব্যস্ত চাকরিজীবী ও গৃহিণীদের জন্য নিজের সুবিধাজনক সময়ে তাজবীদ ও শুদ্ধ তিলাওয়াত শেখার সমন্বিত কোর্স।",
      image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "course-4",
      title: "অনলাইন হিফজুল কুরআন",
      category: "hifz",
      badge: "দৈনিক লাইভ ক্লাস",
      features: "১-অন-১ মেন্টরিং • দৈনিক সবক ও আমুখতা",
      meta: ["মাসিক ফি", "সপ্তাহে ৫ দিন"],
      price: "৳৪,০০০/মাস",
      teacher: "হাফেজ আহমাদুল্লাহ",
      description:
        "অভিজ্ঞ আন্তর্জাতিক মানের হাফেজগণের তত্ত্বাবধানে ঘরে বসেই পূর্ণাঙ্গ কুরআন মুখস্থ করার বিশেষ আয়োজন।",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.features.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title & Breadcrumbs */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#064E73]">
          চলমান অনলাইন কোর্সসমূহ
        </h1>
        <p className="text-sm text-[#4A606D] mt-2">
          আপনার পছন্দমতো কোর্সে ভর্তি হয়ে আজই সহীহ কুরআন শিক্ষা শুরু করুন
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-[#E2EEF5] p-4 shadow-soft mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", name: "সকল কোর্স" },
            { id: "nazera", name: "নাযেরা" },
            { id: "mashq", name: "মাশক" },
            { id: "tajweed", name: "তাজবীদ" },
            { id: "hifz", name: "হিফজ" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedCategory === cat.id
                  ? "bg-[#0288D1] text-white"
                  : "bg-[#F5FAFD] text-[#064E73] hover:bg-[#E2EEF5]"
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
            placeholder="কোর্স খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 border border-[#E2EEF5] rounded-lg text-xs bg-[#F5FAFD] focus:outline-hidden focus:border-[#0288D1]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl border border-[#E2EEF5] overflow-hidden shadow-soft hover:shadow-card-hover transition duration-200 flex flex-col justify-between"
          >
            {/* Image */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#0288D1] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                {course.badge}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-lg font-bold text-[#064E73]">
                  {course.title}
                </h3>
                <p className="text-xs text-[#4A606D] mt-1 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-xs font-semibold text-[#0288D1] mt-3">
                  {course.meta.map((m, idx) => (
                    <span key={idx} className="flex items-center gap-1">
                      <span className="text-[10px]">◆</span>
                      <span className="text-[#4A606D]">{m}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="border-t border-[#E2EEF5] pt-3 flex items-center justify-between">
                <span className="text-xl font-extrabold text-[#064E73]">
                  {course.price}
                </span>
                <Link
                  href={`/courses/${course.id}`}
                  className="bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-bold px-4 py-2 rounded-md shadow-xs transition"
                >
                  বিস্তারিত ও ভর্তি
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
