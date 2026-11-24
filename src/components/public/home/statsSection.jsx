export default function StatsSection() {
  const stats = [
    {
      number: "১২,৪০০+",
      label: "নিবন্ধিত শিক্ষার্থী",
      numberColor: "text-[#0288D1]",
      circleColor: "bg-[#D6EEFA]/80",
    },
    {
      number: "৩৮",
      label: "চলমান কোর্স",
      numberColor: "text-[#0288D1]",
      circleColor: "bg-[#D6EEFA]/80",
    },
    {
      number: "২৬",
      label: "অভিজ্ঞ শিক্ষক",
      numberColor: "text-[#0288D1]",
      circleColor: "bg-[#D6EEFA]/80",
    },
    {
      number: "৯১০+",
      label: "সার্টিফিকেট প্রদান",
      numberColor: "text-[#064E73]",
      circleColor: "bg-[#FEF3C7]/90",
    },
  ];

  return (
    <section className="py-8 bg-[#F5FAFD]">
      {/* হিরো ব্যানারের প্রস্থের সাথে সামঞ্জস্য রেখে max-w-5xl ব্যবহার করা হয়েছে */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-6 relative overflow-hidden shadow-[0_6px_24px_rgba(6,78,115,0.05)] border border-[#EBF3F8] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(6,78,115,0.08)]"
            >
              {/* ছবির মতো উপরে-ডান কোণায় অফসেট পূর্ণ বৃত্ত (Quarter/Offset Circle) */}
              <div
                aria-hidden="true"
                className={`w-16 h-16 rounded-full ${stat.circleColor} absolute -top-3 -right-3 pointer-events-none transition-transform duration-300 group-hover:scale-110`}
              />

              <div className="relative z-10 space-y-1.5">
                <h3
                  className={`text-3xl sm:text-[32px] font-bold tracking-tight leading-none ${stat.numberColor}`}
                >
                  {stat.number}
                </h3>
                <p className="text-[13px] sm:text-sm font-medium text-[#5A7184]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}