// components/public/virtual-campus/CampusRoutine.jsx
"use client";

export default function CampusRoutine({ data }) {
  const fallbackData = {
    title: "দৈনিক অনলাইন লার্নিং সময়সূচী",
    subtitle: "অনলাইন একাডেমির লাইভ ক্লাস, মেন্টরিং সেশন ও সেলফ-লার্নিং রুটিন",
    schedule: [
      { time: "০৬:০০ AM - ০৭:০০ AM", task: "সকালের কুরআন তিলাওয়াত ও হিফজ সবক পুনরাবৃত্তি" },
      { time: "০৯:০০ AM - ১১:০০ AM", task: "প্রথম শিফট: লাইভ ক্লাস ও ইন্টারেক্টিভ ওস্তাদ সেশন" },
      { time: "০২:০০ PM - ০৩:০০ PM", task: "দ্বিতীয় শিফট: লাইভ ক্লাস ও তাজউইদ প্র্যাকটিস সেশন" },
      { time: "০৪:০০ PM - ০৫:০০ PM", task: "১-অন-১ ওস্তাদ ফিডব্যাক ও ডাউট সলভিং সেশন" },
      { time: "০৭:৩০ PM - ০৯:০০ PM", task: "রাতের শিফট: লাইভ ক্লাস, কুইজ ও এসাইনমেন্ট জমাদান" },
      { time: "০৯:০০ PM - ১০:০০ PM", task: "স্বতন্ত্র মুতালাআ ও পরবর্তী দিনের প্রস্তুতি" }
    ]
  };

  const currentData = data || fallbackData;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-400 flex items-center justify-center gap-2">
          <span className="text-amber-500">❖</span> {currentData.title} <span className="text-amber-500">❖</span>
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{currentData.subtitle}</p>
      </div>

      <div className="relative border-l border-emerald-200 dark:border-slate-700 pl-6 space-y-6 max-w-2xl mx-auto">
        {currentData.schedule?.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* টাইমলাইন ডট */}
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-500 border-4 border-white dark:border-slate-900 group-hover:scale-125 transition-transform"></div>
            
            <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/60 p-4 rounded-xl shadow-sm">
              <span className="text-xs font-mono font-bold text-emerald-800 dark:text-amber-400 block mb-1">
                ⏱ {item.time}
              </span>
              <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">
                {item.task}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
