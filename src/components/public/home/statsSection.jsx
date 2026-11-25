export default function StatsSection() {
  const stats = [
    {
      number: "১২,৪০০+",
      label: "নিবন্ধিত শিক্ষার্থী",
      numberColor: "text-[#0D47A1]",
      circleColor: "bg-[#E3F2FD]",
    },
    {
      number: "৩৮",
      label: "চলমান কোর্স",
      numberColor: "text-[#2196F3]",
      circleColor: "bg-[#E3F2FD]",
    },
    {
      number: "২৬",
      label: "অভিজ্ঞ শিক্ষক",
      numberColor: "text-[#2196F3]",
      circleColor: "bg-[#E3F2FD]",
    },
    {
      number: "৯১০+",
      label: "সার্টিফিকেট প্রদান",
      numberColor: "text-[#0D47A1]",
      circleColor: "bg-[#90CAF9]/40",
    },
  ];

  return (
    <section className="py-8 bg-[#E3F2FD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-6 relative overflow-hidden shadow-soft border border-[#90CAF9]/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <div
                aria-hidden="true"
                className={`w-16 h-16 rounded-full ${stat.circleColor} absolute -top-3 -right-3 pointer-events-none transition-transform duration-300 group-hover:scale-110 border border-[#90CAF9]/30`}
              />

              <div className="relative z-10 space-y-1.5">
                <h3
                  className={`text-3xl sm:text-[32px] font-bold tracking-tight leading-none ${stat.numberColor}`}
                >
                  {stat.number}
                </h3>
                <p className="text-[13px] sm:text-sm font-medium text-slate-600">
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
