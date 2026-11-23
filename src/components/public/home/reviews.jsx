"use client";

import { Quote, Star } from "lucide-react";

export default function ReviewSection() {
  const testimonials = [
    {
      id: 1,
      name: "মুহাম্মদ আব্দুল্লাহ",
      role: "শিক্ষার্থী, আম্মা-পারা নাযেরা কোর্স",
      feedback:
        "অনলাইনে এতো সুন্দর নিয়মানুবর্তিতা এবং মাখরাজ সহীহ করার এমন যত্নশীল শিক্ষক আমি আগে পাইনি। আলহামদুলিল্লাহ, এখন আমি শুদ্ধভাবে তিলাওয়াত করতে পারি।",
      rating: 5,
    },
    {
      id: 2,
      name: "নাসিমা বেগম",
      role: "অভিভাবক (যুক্তরাজ্য প্রবাসী)",
      feedback:
        "প্রবাসে থেকে সন্তানকে দ্বীনি সহীহ শিক্ষা দেওয়া নিয়ে খুব দুশ্চিন্তায় ছিলাম। কুরআন কাননের অভিজ্ঞ শিক্ষকরা নিয়মিত অগ্রগতি রিপোর্ট দেওয়ায় আমি অত্যন্ত সন্তুষ্ট।",
      rating: 5,
    },
    {
      id: 3,
      name: "তানভীর হাসান",
      role: "শিক্ষার্থী, মাশকে কুরআন প্রশিক্ষণ",
      feedback:
        "চাকরির পাশাপাশি কুরআন শিক্ষার সেরা সমাধান। লাইভ ক্লাসের রেকর্ডিং এবং শিক্ষকদের নিয়মিত সংশোধন আমাকে অনেক সাহায্য করেছে।",
      rating: 5,
    },
  ];

  return (
    <section className="py-14 bg-[#F5FAFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#064E73]">
            শিক্ষার্থী ও অভিভাবকদের কথা
          </h2>
          <div className="w-12 h-1 bg-[#0288D1] rounded-full mx-auto mt-2" />
          <p className="text-xs sm:text-sm text-[#4A606D] mt-2">
            আমাদের বিশ্বস্ত পাঠদান পদ্ধতি সম্পর্কে তাদের অভিজ্ঞতা
          </p>
        </div>

        {/* 3-Column Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl border border-[#E2EEF5] p-6 shadow-soft hover:shadow-card-hover transition duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[#0288D1]/70" />
                <p className="text-xs sm:text-sm text-[#4A606D] leading-relaxed italic">
                  "{t.feedback}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2EEF5] mt-6 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#064E73]">{t.name}</h4>
                  <p className="text-[11px] text-[#4A606D]">{t.role}</p>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 text-[#F59E0B]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
