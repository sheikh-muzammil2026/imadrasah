"use client";

import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";

export default function EbooksSection() {
  const ebooks = [
    {
      id: "book-1",
      title: "তাজবীদের সহজ পাঠ",
      author: "লোকমান আল মাহমুদ",
      price: "৳১০০",
      coverColor: "bg-amber-800",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "book-2",
      title: "সকাল-সন্ধ্যার আমল",
      author: "লোকমান আল মাহমুদ",
      price: "ফ্রি",
      coverColor: "bg-sky-700",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "book-3",
      title: "আত-তামরীনুল কুরআনী",
      author: "লোকমান আল মাহমুদ",
      price: "৳২০০",
      coverColor: "bg-emerald-800",
      image: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "book-4",
      title: "হুসনুল কুরআন",
      author: "লোকমান আল মাহমুদ",
      price: "৳৫০",
      coverColor: "bg-blue-900",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-12 bg-[#F5FAFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#064E73]">
              ই-বুক
            </h2>
            <p className="text-xs sm:text-sm text-[#4A606D] mt-1">
              কেনার আগে নমুনা পড়ে দেখুন — পছন্দ হলে সংগ্রহ করুন
            </p>
          </div>

          <Link
            href="/ebooks"
            className="self-start sm:self-auto bg-[#0288D1] hover:bg-[#0277BD] text-white text-sm font-bold px-4 py-2 rounded-lg transition duration-150 shadow-xs flex items-center gap-1.5"
          >
            <span>সব বই</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-Column Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ebooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl border border-[#E2EEF5] p-4 shadow-soft hover:shadow-card-hover transition duration-200 flex flex-col justify-between"
            >
              {/* 3D Book Cover Presentation Container */}
              <div className="bg-[#F3F4F6] rounded-lg p-5 flex justify-center items-center h-52 relative overflow-hidden group">
                <div className="w-32 h-44 rounded-md shadow-lg transform transition-transform group-hover:scale-105 duration-200 overflow-hidden relative border border-black/10">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[10px] text-white font-bold leading-tight">
                      {book.title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Book Info */}
              <div className="mt-3 space-y-1">
                <h3 className="font-bold text-base text-[#064E73] line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-xs text-[#4A606D]">{book.author}</p>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-[#E2EEF5] flex items-center justify-between">
                <span
                  className={`font-bold text-base ${
                    book.price === "ফ্রি" ? "text-emerald-600" : "text-[#0288D1]"
                  }`}
                >
                  {book.price}
                </span>

                <Link
                  href={`/ebooks/${book.id}`}
                  className="bg-[#0288D1] hover:bg-[#0277BD] text-white px-3.5 py-1.5 rounded-md text-xs font-bold shadow-xs transition"
                >
                  বিস্তারিত
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
