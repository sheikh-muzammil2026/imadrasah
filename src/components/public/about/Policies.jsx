// components/about/Policies.jsx
"use client";

export default function Policies({ data }) {
  const fallbackData = {
    title: "আমাদের নীতিমালা",
    subtitle: "মাদরাসার শৃঙ্খলা বজায় রাখতে ছাত্র ও অভিভাবকদের জন্য পালনীয় সাধারণ নিয়মাবলী",
    rules: [
      { id: 1, title: "অনলাইন উপস্থিতি", detail: "লাইভ ক্লাসে নিয়মিত উপস্থিতি আবশ্যক। কোনো জরুরি কারণে ক্লাস মিস হলে পোর্টাল থেকে রেকর্ডেড ক্লাস দেখে নিতে হবে এবং মেন্টরকে অবহিত করতে হবে।" },
      { id: 2, title: "লাইভ ক্লাসের আদব", desc: "লাইভ ক্লাসে যুক্ত হওয়ার সময় শালীন ও সুন্নাহ সম্মত পোশাক পরিধান করতে হবে এবং ক্লাসের পরিবেশ শান্ত রাখতে হবে।" },
      { id: 3, title: "ডিজিটাল ডিভাইস ও ইন্টারনেট", detail: "অনলাইন ক্লাসে অংশ নেওয়ার জন্য নির্ভরযোগ্য ইন্টারনেট সংযোগ ও উপযুক্ত ডিভাইস (স্মার্টফোন/ল্যাপটপ) থাকতে হবে এবং এর মাধ্যমে পড়াশোনার বাইরে অন্য কাজে সময় নষ্ট করা যাবে না।" }
    ]
  };

  const policyData = data || fallbackData;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 dark:text-emerald-400 flex items-center justify-center gap-3">
          <span className="hidden sm:inline text-amber-500">❖</span>
          {policyData.title}
          <span className="hidden sm:inline text-amber-500">❖</span>
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{policyData.subtitle}</p>
        <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full relative">
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-emerald-800 rotate-45 border border-amber-400"></div>
        </div>
      </div>

      <div className="space-y-4">
        {policyData.rules?.map((rule, index) => (
          <div key={rule.id || index} className="bg-white dark:bg-slate-800 border border-emerald-100/60 dark:border-slate-700 rounded-xl p-6 shadow-sm hover:border-emerald-800 dark:hover:border-emerald-500 transition-colors">
            <h4 className="text-lg font-bold text-emerald-950 dark:text-emerald-400 flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              {rule.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-justify pl-5">
              {rule.detail || rule.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
