// components/public/virtual-campus/CampusIntro.jsx
"use client";

// ১. ডিজিটাল ক্যাম্পাস পরিচিতি কম্পোনেন্ট
export function CampusAbout({ data }) {
  const fallbackData = {
    title: "ডিজিটাল ক্যাম্পাস পরিচিতি",
    subtitle: "বিশ্বজুড়ে শিক্ষার্থীদের জন্য উন্নত ভার্চুয়াল লার্নিং পরিবেশ নিশ্চিতকরণ",
    desc: "আমাদের অনলাইন মাদরাসা লার্নিং প্ল্যাটফর্ম শিক্ষার্থীদের জন্য একটি আদেশ দ্বীনি ও ভার্চুয়াল শিক্ষা পরিবেশ প্রদান করে। এখানে দক্ষ ওস্তাদদের সার্বক্ষণিক দিকনির্দেশনায় থেকে শিক্ষার্থীরা পড়ালেখার পাশাপাশি তাকওয়া, শৃঙ্খলা এবং সুন্নতি জীবনযাপনে অভ্যস্ত হওয়ার সুযোগ পায়। আধুনিক ক্লাউড প্রযুক্তি ও সমৃদ্ধ লার্নিং ম্যানেজমেন্ট সিস্টেমের মাধ্যমে পরিচালিত এই ডিজিটাল ক্যাম্পাসটি ইসলামি মূল্যবোধের আলোকে গড়ে তোলা হয়েছে।"
  };
  const currentData = data || fallbackData;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-400 flex items-center justify-center gap-2">
          <span className="text-amber-500">❖</span> {currentData.title} <span className="text-amber-500">❖</span>
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{currentData.subtitle}</p>
      </div>
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 border border-emerald-100 dark:border-slate-700/80 p-6 md:p-8 rounded-2xl shadow-sm text-center">
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
          {currentData.desc}
        </p>
      </div>
    </div>
  );
}

// ২. অনলাইন লার্নিং চার্ট কম্পোনেন্ট
export function CampusChart({ data }) {
  const fallbackData = {
    title: "অনলাইন ব্যাচ ও লার্নিং পরিসংখ্যান",
    subtitle: "আমাদের চলমান অনলাইন কোর্স, ব্যাচ ও নিবন্ধিত শিক্ষার্থীদের বিবরণ",
    stats: [
      { label: "চলমান কোর্সসমূহ", value: "০৮ টি" },
      { label: "ভার্চুয়াল ব্যাচ", value: "১২ টি" },
      { label: "সক্রিয় শিক্ষার্থী", value: "১০০০+ জন" },
      { label: "মেন্টর ও ওস্তাদজি", value: "২৫+ জন" }
    ]
  };
  const currentData = data || fallbackData;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-400 flex items-center justify-center gap-2">
          <span className="text-amber-500">❖</span> {currentData.title} <span className="text-amber-500">❖</span>
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{currentData.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {currentData.stats?.map((stat, idx) => (
          <div key={idx} className="bg-emerald-50/40 dark:bg-slate-800/50 border border-emerald-100 dark:border-slate-700 p-5 rounded-xl text-center">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 block mb-1">{stat.label}</span>
            <span className="text-xl md:text-2xl font-black text-emerald-800 dark:text-amber-400">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
