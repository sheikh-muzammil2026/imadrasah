// components/public/virtual-campus/CampusRules.jsx
"use client";

export default function CampusRules({ data }) {
  const fallbackData = {
    title: "অনলাইন ক্লাসে অংশগ্রহণের নিয়মাবলী ও শর্তসমূহ",
    subtitle: "ভার্চুয়াল লার্নিং প্ল্যাটফর্মে নিয়মিত অংশগ্রহণ ও অ্যাক্সেস বজায় রাখার গাইডলাইন",
    rules: [
      "পছন্দের কোর্সে ভর্তি হওয়ার পর ইমেইল/এসএমএস-এর মাধ্যমে স্টুডেন্ট পোর্টালের লগইন ডিটেইলস সংগ্রহ করতে হবে।",
      "অনলাইন ক্লাস করার জন্য ন্যূনতম প্রয়োজনীয় ডিভাইস (স্মার্টফোন/ল্যাপটপ) এবং ইন্টারনেট কানেকশন থাকতে হবে।",
      "লাইভ ক্লাসে ক্লাসরুমের আদব ও শৃঙ্খলা কঠোরভাবে বজায় রাখতে হবে এবং চ্যাট বক্সে শালীনতা বজায় রাখতে হবে।",
      "নির্ধারিত সময়ে কোর্সের সাবস্ক্রিপশন বা সেমিস্টার ফি পরিশোধ করা বাধ্যতামূলক।",
      "যেকোনো প্রকার কোর্স পরিবর্তন বা টেকনিক্যাল সমস্যার জন্য সাপোর্ট টিকেট অথবা ওস্তাদের সাথে যোগাযোগ করতে হবে।"
    ]
  };

  const currentData = data || fallbackData;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-400 flex items-center justify-center gap-2">
          <span className="text-amber-500">❖</span> {currentData.title} <span className="text-amber-500">❖</span>
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{currentData.subtitle}</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-dashed border-emerald-300 dark:border-slate-700 shadow-sm space-y-3">
        {currentData.rules?.map((rule, idx) => (
          <div key={idx} className="flex items-start gap-3 p-2 rounded hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
            <span className="w-5 h-5 bg-amber-500 text-white font-mono text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              {idx + 1}
            </span>
            <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{rule}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
