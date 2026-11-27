"use client";

import { useState } from "react";
import { Search, BookOpen, Download, Eye } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function EbooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeBook, setActiveBook] = useState(null);

  const ebooks = [
    {
      id: "book-1",
      title: "তাজবীদের সহজ পাঠ ও অনুশীলন",
      author: "কুরআন কানন শিক্ষা প্যানেল",
      pages: 120,
      price: "$2 (ফ্রি প্রিভিউ)",
      category: "তাজবীদ",
      description: "কুরআন শুদ্ধ তিলাওয়াতের মৌলিক নিয়মাবলি সহজ ভাষায় লিখিত আন্তর্জাতিক প্র্যাক্টিক্যাল গাইড বুক।",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "book-2",
      title: "দৈনন্দিন মাসনূন দোয়া ও সকাল-সন্ধ্যার জিকির",
      author: "কুরআন কানন গবেষণা বিভাগ",
      pages: 64,
      price: "ফ্রি (Free)",
      category: "দোয়া",
      description: "সহীহ হাদীসভিত্তিক দৈনন্দিন জীবনের সকল জরুরি মাসনূন দোয়া ও সকাল-সন্ধ্যার প্রামাণ্য জিকির।",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "book-3",
      title: "আত-তামরীনুল কুরআনী (মাশক নির্দেশিকা)",
      author: "আন্তর্জাতিক ক্বিরাত পরিষদ",
      pages: 180,
      price: "$3 (ফ্রি প্রিভিউ)",
      category: "মাশক ও অনুশীলন",
      description: "হরফের মাখরাজ ও সিফাত দ্রুত আয়ত্ত করার প্র্যাকটিস এক্সারসাইজ শিট ও নির্দেশিকা।",
      image: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "book-4",
      title: "তারতীল ও সুরের সৌন্দর্যসহ কুরআন পাঠ",
      author: "কুরআন কানন শিক্ষক পরিষদ",
      pages: 80,
      price: "ফ্রি (Free)",
      category: "তিলাওয়াত",
      description: "তারতীল ও সুরের সৌন্দর্যসহ কুরআন তিলাওয়াতের আন্তর্জাতিক নিয়মাবলি।",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400&auto=format&fit=crop",
    },
  ];

  const filtered = ebooks.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-shell">
      {/* Header */}
      <div className="page-header-block">
        <div className="section-pill mb-2">
          ডিজিটাল লাইব্রেরি
        </div>
        <h1 className="page-title-main">
          {siteConfig.identity.name.shortBn} ডিজিটাল ই-বুক লাইব্রেরি
        </h1>
        <p className="page-subtitle-muted">
          কুরআন ও ইসলামিক স্টাডিজের বিশুদ্ধ বইসমূহ অনলাইনে পড়ুন ও সংগ্রহ করুন
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-10 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="বইয়ের নাম বা বিষয় খুঁজুন..."
          className="form-input pl-10"
        />
        <Search className="w-4 h-4 text-[#2196F3] absolute left-3.5 top-3" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((book) => (
          <div
            key={book.id}
            className="card-white card-interactive p-4! flex flex-col justify-between"
          >
            <div className="bg-[#E3F2FD]/50 rounded-lg p-5 flex justify-center items-center h-52 relative overflow-hidden group">
              <div className="w-32 h-44 rounded-md shadow-md transform transition-transform group-hover:scale-105 duration-200 overflow-hidden relative border border-black/10">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <span className="text-[10px] font-bold text-[#2196F3] bg-[#E3F2FD] border border-[#90CAF9]/50 px-2 py-0.5 rounded-full inline-block">
                {book.category}
              </span>
              <h3 className="font-bold text-base text-[#0D47A1] line-clamp-1">
                {book.title}
              </h3>
              <p className="text-xs text-slate-600">{book.author}</p>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                {book.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#90CAF9]/40 flex items-center justify-between">
              <span
                className={`font-bold text-sm ${
                  book.price.includes("ফ্রি") ? "text-emerald-600" : "text-[#0D47A1]"
                }`}
              >
                {book.price}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveBook(book)}
                  className="p-1.5 border border-[#90CAF9]/60 text-[#0D47A1] hover:text-[#2196F3] hover:bg-[#E3F2FD] rounded-md transition cursor-pointer"
                  title="নমুনা পড়ুন"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => alert(`ডাউনলোড শুরু হচ্ছে: ${book.title}`)}
                  className="btn-primary py-1.5 px-3 text-xs"
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
          <div className="card-white max-w-lg w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#90CAF9]/50">
              <h3 className="text-lg font-bold text-[#0D47A1]">
                নমুনা পৃষ্ঠা: {activeBook.title}
              </h3>
              <button
                onClick={() => setActiveBook(null)}
                className="text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="card-ice text-xs leading-relaxed space-y-2 text-slate-700">
              <p className="font-bold text-[#0D47A1] text-sm">
                সূচিপত্র ও নমুনা বিষয়বস্তু:
              </p>
              <p>
                ১. বিশুদ্ধ মাখরাজ ও হরফের উচ্চারণ স্থানসমূহ...<br />
                ২. গুন্নাহ ও নূন সাকিন তানভীনের ব্যবহারিক প্রয়োগ...<br />
                ৩. প্রতিদিনের তারতীল চার্ট...
              </p>
              <p className="text-emerald-700 font-semibold pt-1">
                সম্পূর্ণ বইটি পড়ার জন্য ডাউনলোড অথবা অনলাইন রিডিং এক্সেস নিন।
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveBook(null)}
                className="btn-outline"
              >
                বন্ধ করুন
              </button>
              <button
                onClick={() => {
                  alert(`ডাউনলোড শুরু হচ্ছে: ${activeBook.title}`);
                  setActiveBook(null);
                }}
                className="btn-primary"
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
