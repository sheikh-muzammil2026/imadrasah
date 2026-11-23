"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, BookOpen, Download, Eye, ChevronRight } from "lucide-react";

export default function EbooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeBook, setActiveBook] = useState(null);

  const ebooks = [
    {
      id: "book-1",
      title: "তাজবীদের সহজ পাঠ",
      author: "হাফেজ মাওলানা ক্বারী লোকমান আল মাহমুদ",
      pages: 120,
      price: "৳১০০",
      category: "তাজবীদ",
      description: "কুরআন শুদ্ধ তিলাওয়াতের মৌলিক নিয়মাবলি সহজ বাংলায় লিখিত প্র্যাক্টিক্যাল গাইড বুক।",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "book-2",
      title: "সকাল-সন্ধ্যার আমল ও মাসনূন দোয়া",
      author: "হাফেজ মাওলানা ক্বারী লোকমান আল মাহমুদ",
      pages: 64,
      price: "ফ্রি",
      category: "দোয়া",
      description: "সহীহ হাদীসভিত্তিক দৈনন্দিন জীবনের সকল জরুরি মাসনূন দোয়া ও সকাল-সন্ধ্যার জিকির।",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "book-3",
      title: "আত-তামরীনুল কুরআনী",
      author: "হাফেজ মাওলানা ক্বারী লোকমান আল মাহমুদ",
      pages: 180,
      price: "৳২০০",
      category: "মাশক ও অনুশীলন",
      description: "হরফের মাখরাজ ও সিফাত দ্রুত আয়ত্ত করার প্র্যাকটিস এক্সারসাইজ শিট ও নির্দেশিকা।",
      image: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "book-4",
      title: "হুসনুল কুরআন",
      author: "হাফেজ মাওলানা ক্বারী লোকমান আল মাহমুদ",
      pages: 80,
      price: "৳৫০",
      category: "তিলাওয়াত",
      description: "তারতীল ও সুরের সৌন্দর্যসহ কুরআন তিলাওয়াতের বিশেষ নিয়মাবলি।",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400&auto=format&fit=crop",
    },
  ];

  const filtered = ebooks.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#064E73]">
          কুরআন কানন ডিজিটাল ই-বুক লাইব্রেরি
        </h1>
        <p className="text-sm text-[#4A606D] mt-2">
          কেনার আগে নমুনা পড়ে দেখুন — পছন্দ হলে সরাসরি সংগ্রহ ও ডাউনলোড করুন
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-10 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="বইয়ের নাম বা লেখক খুঁজুন..."
          className="w-full pl-10 pr-4 py-2.5 border border-[#E2EEF5] bg-white rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-[#0288D1] shadow-xs"
        />
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl border border-[#E2EEF5] p-4 shadow-soft hover:shadow-card-hover transition duration-200 flex flex-col justify-between"
          >
            <div className="bg-[#F3F4F6] rounded-lg p-5 flex justify-center items-center h-56 relative overflow-hidden group">
              <div className="w-32 h-44 rounded-md shadow-lg transform transition-transform group-hover:scale-105 duration-200 overflow-hidden relative border border-black/10">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <span className="text-[10px] font-bold text-[#0288D1] bg-[#D6EEFA]/40 px-2 py-0.5 rounded-full inline-block">
                {book.category}
              </span>
              <h3 className="font-bold text-base text-[#064E73] line-clamp-1">
                {book.title}
              </h3>
              <p className="text-xs text-[#4A606D]">{book.author}</p>
              <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">
                {book.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E2EEF5] flex items-center justify-between">
              <span
                className={`font-bold text-base ${
                  book.price === "ফ্রি" ? "text-emerald-600" : "text-[#0288D1]"
                }`}
              >
                {book.price}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveBook(book)}
                  className="p-1.5 border border-[#E2EEF5] text-[#064E73] hover:text-[#0288D1] hover:bg-[#F5FAFD] rounded-md transition"
                  title="নমুনা পড়ুন"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => alert(`ডাউনলোড শুরু হচ্ছে: ${book.title}`)}
                  className="bg-[#0288D1] hover:bg-[#0277BD] text-white px-3 py-1.5 rounded-md text-xs font-bold shadow-xs transition flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>সংগ্রহ</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {activeBook && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-[#E2EEF5]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2EEF5]">
              <h3 className="text-lg font-bold text-[#064E73]">
                নমুনা পৃষ্ঠা: {activeBook.title}
              </h3>
              <button
                onClick={() => setActiveBook(null)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-[#F5FAFD] rounded-lg text-xs leading-relaxed space-y-3 text-[#4A606D]">
              <p className="font-bold text-[#064E73] text-sm">
                সূচিপত্র ও ভূমিকা:
              </p>
              <p>
                ১. মাখরাজের স্থান ও হরফের উচ্চারণ সংক্ষেপ...<br />
                ২. গুন্নাহ ও নূন সাকিনের মূল নিয়মাবলি...<br />
                ৩. প্রতিদিনের অনুশীলনী চার্ট...
              </p>
              <p className="text-emerald-700 font-semibold">
                সম্পূর্ণ বইটি পড়ার জন্য ডাউনলোড অথবা অনলাইন রিডিং এক্সেস নিন।
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveBook(null)}
                className="px-4 py-2 border border-[#E2EEF5] text-xs font-bold text-gray-600 rounded-md"
              >
                বন্ধ করুন
              </button>
              <button
                onClick={() => {
                  alert(`ডাউনলোড শুরু হচ্ছে: ${activeBook.title}`);
                  setActiveBook(null);
                }}
                className="px-4 py-2 bg-[#0288D1] text-white text-xs font-bold rounded-md"
              >
                ডাউনলোড করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
