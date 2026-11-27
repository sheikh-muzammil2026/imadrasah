/**
 * Centralized Site Configuration for Quran Kanan International Islamic Institute
 * Central source of truth for branding, identity, presence, courses, contact, and data models.
 * Editing this file makes the entire platform 100% white-label and cloneable for any client madrasah.
 */

export const siteConfig = {
  // Institutional Identity & Philosophy (Strictly parsed from Quran Kanan.docx)
  identity: {
    name: {
      bn: "কুরআন কানন ইন্টারন্যাশনাল ইসলামিক ইনস্টিটিউট",
      en: "Quran Kanan International Islamic Institute",
      shortBn: "কুরআন কানন",
      shortEn: "Quran Kanan",
    },
    tagline: {
      bn: "জ্ঞান, বিশ্বাস ও উত্তম চরিত্র গঠনের এক আন্তর্জাতিক শিক্ষাঙ্গন",
      en: "Knowledge. Faith. Character.",
    },
    secondaryTagline: {
      bn: "ইসলামিক জ্ঞানের এক সুবিশাল কানন",
      en: "A Garden of Islamic Knowledge",
    },
    pledge: {
      bn: "আমাদের অঙ্গীকার: জ্ঞান, ঈমান ও উত্তম চরিত্রের সমন্বয়ে একটি আলোকিত মুসলিম সমাজ গঠনে অবদান রাখা।",
      en: "Our Commitment: Contributing to an enlightened Muslim society through the synthesis of knowledge, faith, and noble character.",
    },
    description: {
      bn: "Quran Kanan International Islamic Institute একটি আন্তর্জাতিক অনলাইনভিত্তিক ইসলামিক শিক্ষাপ্রতিষ্ঠান। পবিত্র কুরআন ও সুন্নাহর আলোকে বিশুদ্ধ ইসলামিক জ্ঞান প্রচার, নৈতিক ও চারিত্রিক উৎকর্ষ সাধন এবং বিশ্বব্যাপী মুসলিম জনগোষ্ঠীর জন্য মানসম্মত দ্বীনি শিক্ষার সুযোগ সৃষ্টি করাই এ প্রতিষ্ঠানের মূল উদ্দেশ্য। শিশু-কিশোর, তরুণ-তরুণী, প্রাপ্তবয়স্ক এবং উচ্চশিক্ষায় অধ্যয়নরত শিক্ষার্থীদের জন্য বয়স, যোগ্যতা ও প্রয়োজন অনুযায়ী বিভিন্ন স্তরের শিক্ষাকার্যক্রম পরিচালনা করা হয়। ইংরেজি, আরবি ও বাংলা—এই তিনটি ভাষায় শিক্ষার সুযোগ প্রদানের মাধ্যমে বিশ্বের বিভিন্ন দেশের শিক্ষার্থীদের কাছে ইসলামিক জ্ঞান সহজলভ্য করে তোলার উদ্যোগ গ্রহণ করা হয়েছে।",
      en: "Quran Kanan International Islamic Institute is an international online Islamic institution dedicated to providing authentic Islamic education based on the Noble Quran and Sunnah to learners worldwide in English, Arabic, and Bengali.",
    },
    logo: "/images/logo.png",
    favicon: "/favicon.ico",
    establishedYear: 2026,
    founder: {
      name: "শায়েখ তারেক জামিল (হাফি)",
      nameEn: "Shaykh Tariq Jamil",
      roleBn: "চেয়ারম্যান",
      roleEn: "Chairman",
      bioBn: "প্রতিষ্ঠানের দিকনির্দেশনা, নীতি ও সার্বিক তত্ত্বাবধান।",
      bioEn: "Institutional guidance, policy formulation, and overall patron.",
    },
    leadership: {
      chairman: {
        name: "শায়েখ তারেক জামিল (হাফি)",
        nameEn: "Shaykh Tariq Jamil",
        roleBn: "চেয়ারম্যান",
        roleEn: "Chairman",
        bioBn: "প্রতিষ্ঠানের দিকনির্দেশনা, নীতি ও সার্বিক তত্ত্বাবধান।",
        bioEn: "Institutional guidance, policy formulation, and overall patron.",
      },
      facultyOverview: {
        bn: "দেশ-বিদেশের অভিজ্ঞ ও আন্তর্জাতিক সনদপ্রাপ্ত উস্তাদ এবং নারী শিক্ষার্থীদের জন্য নিবেদিত নারী শিক্ষিকাবৃন্দ।",
        en: "Internationally certified Ustadhs and dedicated female instructors for female learners.",
      },
    },
    languages: ["English", "العربية (Arabic)", "বাংলা (Bengali)"],
  },

  // Strictly 100% Online Institutional Presence (No fake physical address per doc spec)
  presence: {
    modeOfOperation: "100% Online",
    serviceArea: "Worldwide",
    learningEnvironment: "Online Classes & Distance Learning (1-on-1 & Live Batches)",
    contactMethod: "Official Email & Website Portal",
    titleBn: "প্রাতিষ্ঠানিক উপস্থিতি (Institutional Presence)",
    titleEn: "Institutional Presence",
    summaryBn:
      "Quran Kanan International Islamic Institute একটি সম্পূর্ণ অনলাইনভিত্তিক ও আন্তর্জাতিক প্রতিষ্ঠান। কোনো কাল্পনিক শারীরিক ঠিকানার পরিবর্তে বিশ্বের সকল দেশের শিক্ষার্থীদের জন্য আমাদের ডিজিটাল ক্লাসরুম উন্মুক্ত।",
    summaryEn:
      "Quran Kanan is an online international Islamic institute, dedicated to making authentic Islamic education accessible to learners around the world.",
  },

  // Contact Information
  contact: {
    email: "kurankanan@gmail.com",
    whatsapp: "+8801767911188",
    whatsappNumberOnly: "8801767911188",
    phone: "+880 1767 911 188",
    supportHours: {
      bn: "২৪/৭ অনলাইন ও হোয়াটসঅ্যাপ সাপোর্ট",
      en: "24/7 Online & WhatsApp Support",
    },
    socialLinks: {
      facebook: "https://facebook.com",
      youtube: "https://youtube.com",
      whatsapp: "https://wa.me/8801767911188",
      tiktok: "https://tiktok.com",
    },
  },

  // 4-Tone Blue Color System
  theme: {
    colors: {
      primary: "#0D47A1", // Deep Navy Blue — Navbar, Footer, h1/h2 headings, primary buttons
      accent: "#2196F3", // Vibrant Blue — CTAs like "এখনই কোর্সে ভর্তি হোন", active links, icons, badges
      secondary: "#90CAF9", // Soft Sky Blue — card borders, input focus rings, active tab indicators, table header borders
      surface: "#E3F2FD", // Ice Blue — page tint, alternating table rows, feature cards, notice banners
    },
  },

  // Strictly 3 Core Courses (Quran Kanan.docx specifications with USD pricing)
  courses: [
    {
      id: "quran-foundations",
      slug: "quran-foundations",
      titleBn: "Quran Reading Foundations (কুরআন পাঠের ভিত্তি)",
      titleEn: "Quran Reading Foundations",
      department: "কুরআন শিক্ষা বিভাগ (Quran Studies)",
      badge: "অনলাইন লাইভ • প্রাথমিক স্তর",
      level: "Beginner",
      classDuration: "৪৫ মিনিট",
      hourlyFee: "$7",
      monthlyFee: "$63",
      fee: "$63/মাস ($7/ঘণ্টা)",
      currency: "USD",
      duration: "৩ মাস (৩৬টি ক্লাস)",
      lessons: "৩৬টি লাইভ ওয়ান-টু-ওয়ান ক্লাস",
      schedule: "সপ্তাহে ৪ দিন (সুবিধাজনক নমনীয় সময়)",
      classPlatform: "গুগল মিট / জুম লাইভ (১-অন-১)",
      batchSize: "১-অন-১ ব্যক্তিগত যত্ন ও মাশক",
      instructor: "অভিজ্ঞ আন্তর্জাতিক ক্বারী টিম",
      instructorBio: "তাজবীদ ও মাখরাজে আন্তর্জাতিক সনদপ্রাপ্ত প্রশিক্ষক",
      specialProvision: "শিশুদের ও নতুনদের জন্য সহজ পাঠদান ও পৃথক সময়",
      shortDesc: "আরবি হরফ চেনা, সঠিক উচ্চারণ ও মাখরাজ শেখা এবং কুরআন পাঠের প্রাথমিক অনুশীলন।",
      fullDesc:
        "শিশু ও বয়স্ক শিক্ষার্থীদের জন্য গোড়া থেকে বিশুদ্ধ কুরআন তিলাওয়াত শেখার পূর্ণাঙ্গ আন্তর্জাতিক কোর্স। আরবি ২৯টি হরফের সঠিক মাখরাজ, সিফাত, হরকত, তানভীন, মাদ ও গুন্নাহর ব্যবহারিক নিয়ম হাতে-কলমে অনুশীলন করিয়ে শুদ্ধ তিলাওয়াতের উপযোগী করে তোলা হয়।",
      syllabus: [
        "আরবি ২৯টি হরফের সঠিক মাখরাজ (উচ্চারণস্থান) ও সিফাত পরিচিতি",
        "হরকত (যবর, যের, পেশ) ও তানভীন (দুই যবর, দুই যের, দুই পেশ)-এর সহীহ উচ্চারণ",
        "জযম ও তাশদীদের ব্যবহারিক মাশক ও বানান অনুশীলন",
        "মাদ (টান) ও গুন্নাহর মৌলিক নীতিমালা এবং মাত্রা নির্ধারণ",
        "নূন সাকিন ও তানভীনের ৪টি বিধান (ইযহার, ইদগাম, ইকলাব, ইখফা)",
        "মীম সাকিনের নিয়মাবলি এবং ওয়াকফের (থামা) প্রাথমিক নিয়ম",
        "ছোট ছোট কুরআনিক শব্দ ও আয়াত বানান করে সরাসরি পড়ার দক্ষতা অর্জন",
        "দৈনন্দিন জীবনের প্রয়োজনীয় মাসনুন দোয়া, অজু-নামাজের দোয়া ও ছোট সূরা",
      ],
      features: [
        "৪৫ মিনিটের সরাসরি ইন্টারঅ্যাক্টিভ ওয়ান-টু-ওয়ান লাইভ ক্লাস",
        "১-অন-১ মাশক সেশন ও প্রতিদিনের ভুল সংশোধন",
        "ডিজিটাল কালার-কোডেড নূরানী কায়দা ও ওয়ার্কশিট পিডিএফ",
        "পুরুষ ও মহিলা শিক্ষার্থীদের জন্য সম্পূর্ণ স্বতন্ত্র ব্যাচ ও শিক্ষক",
        "অভিভাবকদের জন্য নিয়মিত অগ্রগতি রিপোর্ট ও লগবুক",
        "কোর্স সমাপনী মূল্যায়ন পরীক্ষা ও আন্তর্জাতিক মানের সার্টিফিকেট",
      ],
      requirements: "স্মার্টফোন/কম্পিউটার, ইন্টারনেট সংযোগ এবং নিয়মিত ক্লাসে উপস্থিত থাকার মানসিকতা।",
      image:
        "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "recitation-tajweed",
      slug: "recitation-tajweed",
      titleBn: "Quran Recitation & Tajweed (কুরআন তিলাওয়াত ও তাজবিদ)",
      titleEn: "Quran Recitation & Tajweed",
      department: "কুরআন শিক্ষা বিভাগ (Quran Studies)",
      badge: "অনলাইন লাইভ • মধ্যম স্তর",
      level: "Intermediate",
      classDuration: "৪৫ মিনিট",
      hourlyFee: "$8",
      monthlyFee: "$72",
      fee: "$72/মাস ($8/ঘণ্টা)",
      currency: "USD",
      duration: "৬ মাস (৭২টি ক্লাস)",
      lessons: "৭২টি লাইভ ও মাশক ক্লাস",
      schedule: "সপ্তাহে ৩ দিন (সুবিধাজনক সময়)",
      classPlatform: "গুগল মিট / জুম লাইভ",
      batchSize: "১-অন-১ বা সর্বোচ্চ ৩-৫ জন",
      instructor: "আন্তর্জাতিক সনদপ্রাপ্ত ক্বারী ও ক্বারিয়াহ টিম",
      instructorBio: "আন্তর্জাতিক ক্বিরাত প্রতিযোগিতার অভিজ্ঞ শিক্ষকবৃন্দ",
      specialProvision: "নারী শিক্ষার্থীদের জন্য সম্পূর্ণ পৃথক নারী শিক্ষিকা পরিচালিত স্বতন্ত্র ব্যাচ",
      shortDesc: "তাজবিদের নিয়ম মেনে শুদ্ধভাবে কুরআন তিলাওয়াত, নিয়মিত অনুশীলন ও শিক্ষকের মাধ্যমে সংশোধন।",
      fullDesc:
        "যাদের আরবি হরফ চেনা আছে কিন্তু তিলাওয়াতে জড়তা বা টান-গুন্নাহর ভুল রয়েছে, তাদের জন্য এই কোর্স। মাখরাজ ও সিফাতের পুঙ্খানুপুঙ্খ অনুশীলনের মাধ্যমে পূর্ণাঙ্গ আম্মা-পারা বিশুদ্ধ লয় ও তারতীলের সাথে তিলাওয়াত শেখানো হয়। নারী শিক্ষার্থীদের জন্য রয়েছে আন্তর্জাতিক সনদপ্রাপ্ত নারী শিক্ষিকা পরিচালিত স্বতন্ত্র ব্যবস্থা।",
      syllabus: [
        "সিফাতে লাযিমাহ ও সিফাতে আরিযাহর গভীর প্রয়োগ",
        "মাদ্দের প্রকারভেদ (মাদে আসলী ও মাদে ফারঈ) এবং নিখুঁত হরকত পরিমাপ",
        "নূন সাকিন, তানভীন ও মীম সাকিনের উচ্চতর নিয়মাবলি",
        "র (Ra) ও লাম (Lam)-এর পুর (মোটা) ও বারিক (চিকন) পড়ার নিয়ম",
        "ওয়াকফ (থামা) ও ইবতিদা (শুরু করা)-এর নিখুঁত বিধান ও চিহ্ন পরিচিতি",
        "সূরা ফাতিহা থেকে সূরা নাস পর্যন্ত প্রতিটি সূরার শব্দে শব্দে তিলাওয়াত ও মাশক",
        "তারতীল ও সুরের সৌন্দর্যসহ কুরআন তিলাওয়াতের বিশেষ কলাকৌশল",
        "নামাজের ফরজ, ওয়াজিব ও তিলাওয়াতে সিজদার আয়াতসমূহ বিশ্লেষণ",
      ],
      features: [
        "৪৫ মিনিটের ইন্টারঅ্যাক্টিভ লাইভ ওয়ান-টু-ওয়ান লেসন",
        "নারী শিক্ষার্থীদের জন্য সম্পূর্ণ পর্দা বজায় রেখে নারী শিক্ষিকা দ্বারা পাঠদান",
        "আন্তর্জাতিক মানের ক্বারীগণের প্রত্যক্ষ তত্ত্বাবধান",
        "ক্লাসের পর ব্যক্তিগত উচ্চারণ সংশোধনের অডিও ফিডব্যাক",
        "কুরআন কানন ইন্টারন্যাশনাল ইসলামিক ইনস্টিটিউট ভেরিফাইড সনদপত্র",
      ],
      requirements: "নূরানী কায়দা সমাপ্ত বা সাধারণ হরফ চেনার প্রাথমিক জ্ঞান আবশ্যক।",
      image:
        "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "quran-hifz",
      slug: "quran-hifz",
      titleBn: "Quran Memorization Program (হিফজুল কুরআন কর্মসূচি)",
      titleEn: "Quran Memorization Program (Hifz)",
      department: "হিফজুল কুরআন বিভাগ (Hifz Studies)",
      badge: "দৈনিক ১-অন-১ লাইভ • অ্যাডভান্সড",
      level: "Personalized",
      classDuration: "৪৫ মিনিট",
      hourlyFee: "$10",
      monthlyFee: "$90",
      fee: "$90/মাস ($10/ঘণ্টা)",
      currency: "USD",
      duration: "১-২ বছর (নমনীয় অগ্রগতি)",
      lessons: "সপ্তাহে ৫ দিন দৈনিক একক সেশন",
      schedule: "সপ্তাহে ৫ দিন (রবি থেকে বৃহস্পতি)",
      classPlatform: "গুগল মিট / জুম লাইভ (১-অন-১)",
      batchSize: "১-অন-১ একক মেন্টরিং (একক শিক্ষার্থী)",
      instructor: "আন্তর্জাতিক হাফেজ ও ক্বারী পরিষদ",
      instructorBio: "আন্তর্জাতিক পুরস্কারপ্রাপ্ত ও সনদপ্রাপ্ত হাফেজে কুরআন প্রশিক্ষক",
      specialProvision: "অভিভাবকের জন্য নিয়মিত অগ্রগতি রিপোর্ট ও রিয়েল-টাইম লগবুক",
      shortDesc: "অভিজ্ঞ শিক্ষকের ব্যক্তিগত তত্ত্বাবধানে কুরআন মুখস্থ, নিয়মিত পুনরাবৃত্তি ও অগ্রগতি পর্যবেক্ষণ।",
      fullDesc:
        "ব্যক্তিগত যত্ন ও আন্তর্জাতিক হিফজ পদ্ধতিতে পরিচালিত অনলাইন হিফজ প্রোগ্রাম। দৈনিক নতুন সবক মুখস্থ, সাতপাক (সাম্প্রতিক পড়া) ও আমুখতা (পূর্বের পড়া) তদারকির বৈজ্ঞানিক পদ্ধতিতে কুরআন স্মৃতিতে দীর্ঘমেয়াদে সংরক্ষিত রাখা হয়। দেশি ও প্রবাসী শিক্ষার্থীদের জন্য রয়েছে নমনীয় সময়সূচি।",
      syllabus: [
        "দৈনিক নতুন সবক (নতুন পৃষ্ঠা বা আয়াত মুখস্থকরণ ও শিক্ষকের কাছে পেশ)",
        "সাতপাক (বিগত ৭ দিনের মুখস্থ অংশ দৈনিক পুনরাবৃত্তি ও ত্রুটিমুক্তকরণ)",
        "আমুখতা (অতীতের মুখস্থকৃত সকল পারার সুশৃঙ্খল রুটিনভিত্তিক রিভিশন)",
        "মুতাশাবিহাত (কুরআনের সদৃশ বা মিলযুক্ত আয়াতসমূহ) শনাক্তকরণ ও সহজ টেকনিক",
        "তাজবীদ ও তারতীলের সাথে নিখুঁত লাহনে তিলাওয়াত অনুশীলন",
        "প্রতি পারা সমাপ্তির পর নিবিড় পারা পরীক্ষা ও সার্টিফিকেট",
        "পূর্ণাঙ্গ ৩০ পারা হিফজ সমাপ্তির পর আন্তর্জাতিক মানের সমাপনী পরীক্ষা ও সনদপত্র",
      ],
      features: [
        "৪৫ মিনিটের ১-অন-১ একক মেন্টরিং ও শিক্ষার্থী-কেন্দ্রিক পাঠদান",
        "অভিভাবকদের জন্য প্রতিদিনের রিয়েল-টাইম অগ্রগতি রিপোর্ট ও লগবুক",
        "আন্তর্জাতিক সনদপ্রাপ্ত অভিজ্ঞ হাফেজে কুরআন শিক্ষক",
        "নমনীয় সময়সূচি (দেশি ও প্রবাসী শিক্ষার্থীদের সময় অঞ্চলের উপযোগী)",
        "মানসিক চাপমুক্ত উৎসাহব্যঞ্জক ও আনন্দময় ইসলামি পরিবেশ",
        "হিফজ সমাপনী পাগড়ি প্রদান ও আন্তর্জাতিক হিফজ সনদপত্র",
      ],
      requirements: "সহীহ-শুদ্ধভাবে নাযেরা তিলাওয়াত সম্পন্ন থাকতে হবে এবং নিয়মিত মুখস্থের সময় দিতে হবে।",
      image:
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop",
    },
  ],

  // 6 Academic Departments from doc Section 07
  departments: [
    {
      id: "dept-quran",
      nameBn: "Department of Quran Studies (কুরআন শিক্ষা বিভাগ)",
      nameEn: "Department of Quran Studies",
      topics: ["Quran Reading", "Tajweed", "Hifz-ul-Quran", "Tafsir", "Ulum al-Quran"],
    },
    {
      id: "dept-hadith",
      nameBn: "Department of Hadith Studies (হাদিস শিক্ষা বিভাগ)",
      nameEn: "Department of Hadith Studies",
      topics: ["Hadith Studies", "Selected Hadith Collections", "Usul al-Hadith", "Hadith Explanation"],
    },
    {
      id: "dept-arabic",
      nameBn: "Department of Arabic Language (আরবি ভাষা বিভাগ)",
      nameEn: "Department of Arabic Language",
      topics: ["Arabic Grammar (Nahw)", "Arabic Morphology (Sarf)", "Arabic Conversation", "Arabic Reading & Writing"],
    },
    {
      id: "dept-fiqh",
      nameBn: "Department of Islamic Jurisprudence (ইসলামিক ফিকহ বিভাগ)",
      nameEn: "Department of Islamic Jurisprudence",
      topics: ["Fiqh", "Usul al-Fiqh", "Islamic Aqidah", "Contemporary Fiqh Studies"],
    },
    {
      id: "dept-studies",
      nameBn: "Department of Islamic Studies (ইসলামিক স্টাডিজ বিভাগ)",
      nameEn: "Department of Islamic Studies",
      topics: ["Seerah", "Islamic History", "Islamic Civilization", "Islamic Ethics", "Dawah Studies"],
    },
    {
      id: "dept-research",
      nameBn: "Department of Research & Publications (গবেষণা ও প্রকাশনা বিভাগ)",
      nameEn: "Department of Research & Publications",
      topics: ["Islamic Research", "Academic Writing", "Research Publications", "Digital Islamic Library"],
    },
  ],

  // 7 Educational Programs from doc Section 08
  programs: [
    {
      id: "prog-kids",
      titleBn: "Kids Islamic Education Program",
      descBn: "শিশুদের জন্য কুরআন শিক্ষা, ছোট সূরা, প্রয়োজনীয় দোয়া, নামাজ, ইসলামী আদব ও মৌলিক আকিদা শিক্ষা।",
    },
    {
      id: "prog-junior",
      titleBn: "Junior Islamic Education Program",
      descBn: "কিশোর-কিশোরীদের জন্য কুরআন, তাজবিদ, আকিদা, ফিকহ, সিরাত ও মৌলিক ইসলামিক জ্ঞান।",
    },
    {
      id: "prog-youth",
      titleBn: "Youth Islamic Studies Program",
      descBn: "তরুণ শিক্ষার্থীদের জন্য তুলনামূলক গভীর ইসলামিক শিক্ষা, আরবি ভাষা, হাদিস, ফিকহ ও সমসাময়িক বিষয়াবলি।",
    },
    {
      id: "prog-adult",
      titleBn: "Adult Islamic Learning Program",
      descBn: "প্রাপ্তবয়স্কদের জন্য প্রয়োজনভিত্তিক ইসলামিক শিক্ষা, কুরআন পাঠ, তাজবিদ, দৈনন্দিন মাসআলা ও জ্ঞানচর্চা।",
    },
    {
      id: "prog-advanced",
      titleBn: "Advanced Islamic Studies Program",
      descBn: "যোগ্য ও প্রস্তুত শিক্ষার্থীদের জন্য তাফসির, হাদিস, ফিকহ, উসুল ও অন্যান্য উচ্চতর ইসলামিক বিষয়ে অধ্যয়ন।",
    },
    {
      id: "prog-arabic",
      titleBn: "Arabic Language Program",
      descBn: "আরবি ভাষা শেখার জন্য প্রাথমিক, মধ্যম ও উচ্চতর পর্যায়ের পৃথক শিক্ষাকার্যক্রম।",
    },
    {
      id: "prog-special",
      titleBn: "Special Courses & Workshops",
      descBn: "নির্দিষ্ট বিষয়ভিত্তিক স্বল্পমেয়াদি কোর্স, সেমিনার, ওয়েবিনার ও প্রশিক্ষণ কর্মসূচি।",
    },
  ],

  // Core Values from doc Section 05
  coreValues: [
    { title: "Authenticity", bn: "বিশুদ্ধতা", desc: "কুরআন ও সুন্নাহর নির্ভরযোগ্য শিক্ষার ভিত্তিতে ইসলামিক জ্ঞান পরিবেশন করা।" },
    { title: "Excellence", bn: "উৎকর্ষ", desc: "শিক্ষার মান, পাঠদান পদ্ধতি ও প্রাতিষ্ঠানিক কার্যক্রমে উৎকর্ষ অর্জনের চেষ্টা করা।" },
    { title: "Integrity", bn: "সততা ও বিশ্বস্ততা", desc: "প্রতিষ্ঠানের প্রতিটি কার্যক্রমে সততা, স্বচ্ছতা ও দায়িত্বশীলতা বজায় রাখা।" },
    { title: "Knowledge", bn: "জ্ঞানচর্চা", desc: "জ্ঞান অর্জন, অনুধাবন, গবেষণা ও প্রচারের প্রতি আগ্রহ সৃষ্টি করা।" },
    { title: "Character", bn: "চারিত্রিক উৎকর্ষ", desc: "শিক্ষার্থীদের মধ্যে উত্তম আখলাক, শিষ্টাচার ও নৈতিক মূল্যবোধ গড়ে তোলা।" },
    { title: "Respect", bn: "পারস্পরিক সম্মান", desc: "শিক্ষক, শিক্ষার্থী ও অভিভাবকদের মধ্যে সম্মান ও সহযোগিতার পরিবেশ তৈরি করা।" },
    { title: "Accessibility", bn: "সহজলভ্যতা", desc: "বিশ্বের বিভিন্ন প্রান্তের মানুষের জন্য ইসলামিক শিক্ষার সুযোগ সহজলভ্য করা।" },
    { title: "Responsibility", bn: "দায়িত্বশীলতা", desc: "শিক্ষা, সমাজ ও মানবতার প্রতি দায়িত্বশীল মনোভাব গড়ে তোলা।" },
  ],

  // Global Teacher Qualification Options from doc
  teacherQualifications: [
    "Primary / Elementary Education",
    "Secondary School Certificate",
    "Higher Secondary / High School Diploma",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctoral Degree (PhD)",
    "Traditional Islamic Studies (দাওরায়ে হাদীস / কওমি মাদরাসা)",
    "Advanced Islamic Scholarship (মুফতি / উচ্চতর উলুম)",
    "Specialized Islamic Certification",
    "Ijazah / Sanad in Quran, Hadith or other Islamic Sciences",
    "Other Relevant Qualifications",
  ],

  // Relevant Fields of Study from doc
  fieldsOfStudy: [
    "Quranic Studies (কুরআন ও কিরাত)",
    "Hadith Studies (হাদিস শাস্ত্র)",
    "Islamic Jurisprudence (Fiqh - ফিকহ)",
    "Islamic Theology (Aqidah - আকিদা)",
    "Arabic Language & Literature (আরবি ভাষা ও সাহিত্য)",
    "Islamic Studies (ইসলামিক স্টাডিজ)",
    "Shariah Studies (শরিয়াহ শাস্ত্র)",
    "Education & Teaching (শিক্ষা ও শিক্ষাদান)",
    "Other Relevant Fields (অন্যান্য)",
  ],

  // Teacher Readiness Questionnaire Config from doc
  teacherQuestionnaire: {
    hoursAvailable: [
      "১–২ ঘণ্টা",
      "২–৪ ঘণ্টা",
      "৪–৬ ঘণ্টা",
      "৬ ঘণ্টার বেশি",
      "প্রয়োজন অনুযায়ী / সময় নমনীয়",
    ],
    devices: [
      "ল্যাপটপ",
      "ডেস্কটপ কম্পিউটার",
      "ট্যাবলেট",
      "স্মার্টফোন",
      "হেডফোন / মাইক্রোফোন",
      "ওয়েবক্যাম",
    ],
    internetQuality: [
      "অত্যন্ত ভালো",
      "ভালো",
      "মোটামুটি",
      "দুর্বল / অনিয়মিত",
    ],
    environment: [
      "হ্যাঁ, আলাদা পাঠদানের কক্ষ রয়েছে।",
      "হ্যাঁ, নিরিবিলি পরিবেশ রয়েছে।",
      "কখনো পাওয়া যায়, কখনো যায় না।",
      "না।",
    ],
    techSkills: [
      "Zoom / Google Meet পরিচালনা",
      "ডিজিটাল হোয়াইটবোর্ড ব্যবহার",
      "স্ক্রিন শেয়ারিং",
      "PowerPoint প্রেজেন্টেশন তৈরি",
      "অনলাইন ক্লাস পরিচালনা ও নিয়ন্ত্রণ",
      "শিক্ষার্থীদের অনলাইন মূল্যায়ন",
      "কম্পিউটারের সাধারণ ব্যবহার",
    ],
    specialSkills: [
      "কুরআন তিলাওয়াত ও তাজবিদ শিক্ষা",
      "হিফজ ও মুখস্থকরণে সহায়তা",
      "আরবি ভাষায় কথোপকথন শেখানো",
      "অনুবাদ ও ব্যাখ্যা প্রদান",
      "পাঠ পরিকল্পনা তৈরি",
      "শিক্ষার্থীদের ব্যক্তিগতভাবে পাঠদান ও দিকনির্দেশনা",
      "শিক্ষার্থীদের অগ্রগতি মূল্যায়ন",
    ],
    multiculturalComfort: [
      "হ্যাঁ",
      "না",
      "প্রয়োজনীয় দিকনির্দেশনা পেলে পারব।",
    ],
  },

  // Contact Form Subjects
  contactSubjects: [
    "কোর্সে ভর্তি সংক্রান্ত তথ্য ও পরামর্শ",
    "কোর্স ফি ও পেমেন্ট সংক্রান্ত জিজ্ঞাসা",
    "শিক্ষক নিয়োগ ও ক্যারিয়ার তথ্য",
    "মহিলা শিক্ষার্থীদের জন্য বিশেষ ব্যাচ",
    "সাদাকাহ ও অনুদান সংক্রান্ত",
    "অন্যান্য সাধারণ অনুসন্ধান",
  ],

  // Frequently Asked Questions (Aligned with online model)
  faqs: [
    {
      q: "Quran Kanan-এর অনলাইন ক্লাসে কীভাবে অংশ নিতে হয়?",
      a: "আমাদের সকল অনলাইন ক্লাস গুগল মিট (Google Meet) ও জুম (Zoom) প্ল্যাটফর্মের মাধ্যমে সরাসরি লাইভ পরিচালিত হয়। কোর্সে ভর্তি অনুমোদনের পর শিক্ষার্থী ড্যাশবোর্ডে স্বয়ংক্রিয়ভাবে ক্লাসের লিংক ও সময়সূচি প্রদর্শিত হবে।",
      category: "ক্লাস পদ্ধতি",
    },
    {
      q: "আমি কোনো ক্লাস মিস করলে পরবর্তীতে দেখার সুযোগ আছে?",
      a: "হ্যাঁ, প্রতিটি লাইভ ক্লাসের প্রয়োজনীয় লেকচার সামারি ও অগ্রগতি নোট ড্যাশবোর্ডে সংরক্ষিত থাকে এবং শিক্ষক পরবর্তী ক্লাসে পূর্বের পড়া রিভিশন করিয়ে দেন।",
      category: "ক্লাস পদ্ধতি",
    },
    {
      q: "আন্তর্জাতিক ও দেশি শিক্ষার্থীদের জন্য কোর্স ফি কীভাবে পরিশোধ করতে হবে?",
      a: "দেশি শিক্ষার্থীদের জন্য বিকাশ, নগদ, রকেটের পাশাপাশি আন্তর্জাতিক শিক্ষার্থীদের জন্য ভিসা, মাস্টারকার্ড ও আন্তর্জাতিক পেমেন্ট চ্যানেলে ঘরে বসেই কোর্স ফি পরিশোধের সুবিধা রয়েছে।",
      category: "পেমেন্ট ও ভর্তি",
    },
    {
      q: "নারী শিক্ষার্থীদের জন্য কি পৃথক নারী শিক্ষিকা পরিচালিত ব্যবস্থা রয়েছে?",
      a: "হ্যাঁ, আমাদের নারী শিক্ষার্থীদের সম্পূর্ণ পর্দা ও শারঈ পরিবেশ নিশ্চিত করার সুবিধার্থে আন্তর্জাতিক সনদপ্রাপ্ত নারী শিক্ষিকা পরিচালিত সম্পূর্ণ স্বতন্ত্র ১-অন-১ ও গ্রুপ ব্যাচ রয়েছে।",
      category: "শিক্ষক ও পাঠদান",
    },
    {
      q: "কোর্স সম্পন্ন করার পর কি সনদপত্র প্রদান করা হয়?",
      a: "হ্যাঁ, কোর্সের নির্ধারিত উপস্থিতি ও সমাপনী মাশক পরীক্ষার ভিত্তিতে Quran Kanan International Islamic Institute কর্তৃক আন্তর্জাতিক মানের ভেরিফাইড ডিজিটাল সার্টিফিকেট ও গ্রেডশিট প্রদান করা হয়।",
      category: "সার্টিফিকেট",
    },
    {
      q: "অসন্তুষ্ট হলে রিফান্ড পাওয়ার নিয়ম কী?",
      a: "ক্লাস শুরুর প্রথম ৩ দিনের মধ্যে আপনি যদি পাঠদানে সন্তুষ্ট না হন, কোনো প্রশ্ন ছাড়াই আপনার সম্পূর্ণ কোর্স ফি ফেরত দেওয়া হবে।",
      category: "পেমেন্ট ও ভর্তি",
    },
  ],

  // Role-Based Access Control (RBAC) Definitions
  roles: {
    SUPER_ADMIN: "super_admin",
    ADMIN: "admin",
    TEACHER: "teacher",
    STUDENT: "student",
  },

  roleLabels: {
    super_admin: { bn: "সুপার অ্যাডমিন", en: "Super Admin", badgeClass: "badge-superadmin" },
    admin: { bn: "অ্যাডমিন", en: "Admin", badgeClass: "badge-admin" },
    teacher: { bn: "শিক্ষক", en: "Teacher", badgeClass: "badge-teacher" },
    student: { bn: "শিক্ষার্থী", en: "Student", badgeClass: "badge-success" },
  },

  // Route-level permission mappings for edge guards (proxy.js)
  routePermissions: {
    "/dashboard/super-admin": ["super_admin"],
    "/dashboard/admin": ["admin", "super_admin"],
    "/dashboard/teacher": ["teacher", "admin", "super_admin"],
    "/dashboard/student": ["student", "teacher", "admin", "super_admin"],
  },

  // Centralized Dynamic Dashboard Navigation
  dashboardNav: {
    super_admin: [
      { title: "সুপার অ্যাডমিন ওভারভিউ", href: "/dashboard/super-admin", icon: "ShieldAlert" },
      { title: "অ্যাডমিন ম্যানেজমেন্ট", href: "/dashboard/super-admin#admins", icon: "ShieldCheck" },
      { title: "সিস্টেম অডিট লগ", href: "/dashboard/super-admin#audit-logs", icon: "History" },
      { title: "ইনস্টিটিউট সেটিংস", href: "/dashboard/super-admin#settings", icon: "Settings" },
      { title: "কোর্স ভর্তি আবেদন", href: "/dashboard/admin/course-enrollments", icon: "BookOpen" },
      { title: "শিক্ষক আবেদনসমূহ", href: "/dashboard/admin/teacher-applications", icon: "Briefcase" },
      { title: "কোর্স ও বিভাগ", href: "/dashboard/admin#courses", icon: "GraduationCap" },
      { title: "ব্যবহারকারী তালিকা", href: "/dashboard/admin#users", icon: "Users" },
    ],
    admin: [
      { title: "অ্যাডমিন ড্যাশবোর্ড", href: "/dashboard/admin", icon: "LayoutDashboard" },
      { title: "কোর্স ভর্তি আবেদন", href: "/dashboard/admin/course-enrollments", icon: "BookOpen" },
      { title: "শিক্ষক আবেদনসমূহ", href: "/dashboard/admin/teacher-applications", icon: "Briefcase" },
      { title: "কোর্স ও বিভাগ", href: "/dashboard/admin#courses", icon: "GraduationCap" },
      { title: "ব্যবহারকারী তালিকা", href: "/dashboard/admin#users", icon: "Users" },
    ],
    teacher: [
      { title: "ড্যাশবোর্ড ওভারভিউ", href: "/dashboard/teacher", icon: "LayoutDashboard" },
      { title: "ক্লাস হাজিরা (হাজিরা গ্রহণ)", href: "/dashboard/teacher#attendance", icon: "CalendarCheck2" },
      { title: "কোর্স ও অ্যাসাইনমেন্ট", href: "/dashboard/teacher#courses", icon: "BookOpen" },
      { title: "তালিকাভুক্ত শিক্ষার্থী", href: "/dashboard/teacher#students", icon: "Users" },
      { title: "জমা পড়া অ্যাসাইনমেন্ট", href: "/dashboard/teacher#submissions", icon: "FileCheck" },
    ],
    student: [
      { title: "আমার ড্যাশবোর্ড", href: "/dashboard/student", icon: "LayoutDashboard" },
      { title: "আমার কোর্সসমূহ", href: "/dashboard/student#my-courses", icon: "BookOpen" },
      { title: "মাসিক ভেরিফাইড রিপোর্ট", href: "/dashboard/student#monthly-report", icon: "FileSpreadsheet" },
      { title: "সকল কোর্সে ভর্তি হোন", href: "/dashboard/student#available-courses", icon: "PlusCircle" },
      { title: "অ্যাসাইনমেন্ট ও টাস্ক", href: "/dashboard/student#assignments", icon: "FileCheck" },
    ],
  },

  // About Page Full Institutional Profile Specification
  aboutPage: {
    hero: {
      badge: "English • العربية • বাংলা",
      titleBn: "প্রতিষ্ঠানের পরিচিতি",
      titleEn: "Institutional Profile",
      academyName: "Quran Kanan International Islamic Institute",
      subheading: "পবিত্র কুরআন ও সুন্নাহর আলোকে বিশুদ্ধ জ্ঞান, নৈতিক উৎকর্ষ ও বিশ্বব্যাপী মুসলিম জনগোষ্ঠীর জন্য মানসম্মত দ্বীনি শিক্ষাঙ্গন",
      quote: "Quran Kanan—জ্ঞান, বিশ্বাস ও উত্তম চরিত্র গঠনের এক আন্তর্জাতিক শিক্ষাঙ্গন।",
      paragraphs: [
        "Quran Kanan International Islamic Institute একটি আন্তর্জাতিক অনলাইনভিত্তিক ইসলামিক শিক্ষাপ্রতিষ্ঠান। পবিত্র কুরআন ও সুন্নাহর আলোকে বিশুদ্ধ ইসলামিক জ্ঞান প্রচার, নৈতিক ও চারিত্রিক উৎকর্ষ সাধন এবং বিশ্বব্যাপী মুসলিম জনগোষ্ঠীর জন্য মানসম্মত দ্বীনি শিক্ষার সুযোগ সৃষ্টি করাই এ প্রতিষ্ঠানের মূল উদ্দেশ্য।",
        "শিশু-কিশোর, তরুণ-তরুণী, প্রাপ্তবয়স্ক এবং উচ্চশিক্ষায় অধ্যয়নরত শিক্ষার্থীদের জন্য বয়স, যোগ্যতা ও প্রয়োজন অনুযায়ী বিভিন্ন স্তরের শিক্ষাকার্যক্রম পরিচালনা করা হবে।",
        "ইংরেজি, আরবি ও বাংলা—এই তিনটি ভাষায় শিক্ষার সুযোগ প্রদানের মাধ্যমে বিশ্বের বিভিন্ন দেশের শিক্ষার্থীদের কাছে ইসলামিক জ্ঞান সহজলভ্য করে তোলার উদ্যোগ গ্রহণ করা হবে।",
        "কুরআন, হাদিস, তাফসির, ফিকহ, আকিদা, আরবি ভাষা, ইসলামের ইতিহাস, সিরাত এবং অন্যান্য প্রয়োজনীয় ইসলামিক শাস্ত্রে সুশৃঙ্খল ও মানসম্মত শিক্ষার পরিবেশ গড়ে তোলাই Quran Kanan-এর অন্যতম অঙ্গীকার।",
      ],
      languages: [
        { code: "en", label: "English", note: "আন্তর্জাতিক মাধ্যম" },
        { code: "ar", label: "العربية", note: "কুরআন ও সুন্নাহর মূল ভাষা" },
        { code: "bn", label: "বাংলা", note: "মাতৃভাষায় সহজ অনুধাবন" },
      ],
      targetGroups: [
        { title: "শিশু-কিশোর", desc: "বুনিয়াদি ইসলামি শিক্ষা ও হিফজ" },
        { title: "তরুণ-তরুণী", desc: "চরিত্র গঠন ও জীবনমুখী দ্বীনি জ্ঞান" },
        { title: "প্রাপ্তবয়স্ক", desc: "তিলাওয়াত শুদ্ধিকরণ ও জরুরি মাসআলা" },
        { title: "উচ্চশিক্ষা", desc: "উলূমুল কুরআন ও উচ্চতর ইসলামি শাস্ত্র" },
      ],
    },

    vision: {
      sectionNumber: "02",
      tag: "02. Vision",
      titleBn: "আমাদের স্বপ্ন",
      titleEn: "Our Vision",
      subtitle: "বিশ্বব্যাপী একটি আদর্শ, সুসংগঠিত ও আন্তর্জাতিক মানসম্পন্ন ইসলামিক শিক্ষাপ্রতিষ্ঠান হিসেবে Quran Kanan-কে প্রতিষ্ঠিত করা, যেখানে পবিত্র কুরআন ও সুন্নাহর আলোকে মানুষ বিশুদ্ধ ইসলামিক জ্ঞান অর্জন, নৈতিক উৎকর্ষ সাধন এবং জীবনের প্রতিটি ক্ষেত্রে ইসলামের সুমহান শিক্ষা অনুসরণের সুযোগ লাভ করবে।",
      leadIn: "আমাদের স্বপ্ন হলো—",
      items: [
        { id: 1, text: "বিশ্বের প্রতিটি প্রান্তে ইসলামিক শিক্ষার সুযোগ পৌঁছে দেওয়া।" },
        { id: 2, text: "কুরআন ও সুন্নাহভিত্তিক বিশুদ্ধ জ্ঞানচর্চার পরিবেশ গড়ে তোলা।" },
        { id: 3, text: "জ্ঞানী, আদর্শবান, নৈতিক ও দায়িত্বশীল মুসলিম প্রজন্ম গড়ে তোলা।" },
        { id: 4, text: "প্রযুক্তির সর্বোত্তম ব্যবহারের মাধ্যমে ইসলামিক শিক্ষাকে সহজ, সাবলীল ও সর্বজনীন করে তোলা।" },
        { id: 5, text: "আন্তর্জাতিক পর্যায়ে একটি বিশ্বস্ত ও সুপরিচিত ইসলামিক শিক্ষাপ্রতিষ্ঠান হিসেবে আত্মপ্রকাশ করা।" },
        {
          id: 6,
          text: "স্পেশালি ছোট্ট ছোট্ট ঘরে বসে শিশুদের ইসলামিক ব্যাসিক শিক্ষা ও হিফজুল ক্বোর’আনের সুযোগ করে দেয়া।",
          isSpecial: true,
          highlightTag: "বিশেষ শিশু কর্মসূচি",
        },
        { id: 7, text: "বয়স্ক পুরষ / মহিলাদের জন্য ক্বোর’আন ও প্রয়োজনীয় মাস’আলা-মাসাঈলের জ্ঞান পৌঁছে দেয়া।" },
        {
          id: 8,
          text: "মহিলাদের জন্য মহিলা টিচারের মাধ্যমে সম্পূর্ণ পাঠদানের ব্যবস্থা।",
          isSpecial: true,
          highlightTag: "নারী শিক্ষিকা পরিচালিত স্বতন্ত্র ব্যাচ",
        },
      ],
    },

    mission: {
      sectionNumber: "03",
      tag: "03. Mission",
      titleBn: "আমাদের লক্ষ্য",
      titleEn: "Our Mission",
      subtitle: "Quran Kanan-এর মূল লক্ষ্য হলো পবিত্র কুরআন ও রাসুলুল্লাহ ﷺ-এর সুন্নাহর আলোকে বিশ্বব্যাপী মানুষের কাছে নির্ভরযোগ্য ইসলামিক জ্ঞান পৌঁছে দেওয়া এবং শিক্ষার্থীদের জ্ঞান, আমল ও চরিত্রের সমন্বয়ে গড়ে তোলা।",
      leadIn: "আমাদের কার্যক্রমের প্রধান লক্ষ্যসমূহ—",
      items: [
        { id: 1, text: "শিশু, কিশোর ও প্রাপ্তবয়স্কদের জন্য মানসম্মত ইসলামিক শিক্ষার ব্যবস্থা করা।" },
        { id: 2, text: "কুরআন তিলাওয়াত, তাজবিদ, হিফজ ও তাফসির শিক্ষার সুযোগ সৃষ্টি করা।" },
        { id: 3, text: "হাদিস, ফিকহ, আকিদা, সিরাত ও ইসলামের ইতিহাসসহ বিভিন্ন শাস্ত্রে সুশৃঙ্খল শিক্ষাব্যবস্থা গড়ে তোলা।" },
        { id: 4, text: "আরবি ভাষা শিক্ষার মাধ্যমে শিক্ষার্থীদের কুরআন ও সুন্নাহর মূল ভাষা বোঝার যোগ্যতা বৃদ্ধি করা।" },
        { id: 5, text: "ইংরেজি, আরবি ও বাংলা ভাষায় আন্তর্জাতিক শিক্ষাকার্যক্রম পরিচালনা করা।" },
        { id: 6, text: "যোগ্য ও অভিজ্ঞ শিক্ষকদের মাধ্যমে মানসম্মত পাঠদান নিশ্চিত করা।" },
        { id: 7, text: "শিক্ষার্থীদের মধ্যে ইসলামী আদর্শ, নৈতিকতা, শিষ্টাচার ও দায়িত্ববোধ সৃষ্টি করা।" },
        { id: 8, text: "গবেষণা, প্রকাশনা ও জ্ঞানচর্চার মাধ্যমে ইসলামিক শিক্ষার প্রসারে অবদান রাখা।" },
      ],
    },

    objectives: {
      sectionNumber: "04",
      tag: "04. Institutional Objectives",
      titleBn: "প্রতিষ্ঠানের উদ্দেশ্যসমূহ",
      titleEn: "Institutional Objectives",
      subtitle: "Quran Kanan প্রতিষ্ঠার পেছনে রয়েছে কিছু সুনির্দিষ্ট শিক্ষা ও সমাজকল্যাণমূলক উদ্দেশ্য।",
      items: [
        { id: 1, text: "বিশ্বব্যাপী মুসলিমদের জন্য সহজলভ্য ও মানসম্মত ইসলামিক শিক্ষার সুযোগ সৃষ্টি করা।" },
        { id: 2, text: "বিশুদ্ধ কুরআন ও সুন্নাহভিত্তিক জ্ঞানচর্চার প্রসার ঘটানো।" },
        { id: 3, text: "নতুন প্রজন্মকে ইসলামের মৌলিক বিশ্বাস, বিধিবিধান ও আদর্শ সম্পর্কে সচেতন করা।" },
        { id: 4, text: "শিক্ষার্থীদের কুরআন পাঠ, অনুধাবন ও বাস্তব জীবনে অনুসরণের যোগ্যতা তৈরি করা।" },
        { id: 5, text: "আরবি ভাষা ও ইসলামিক শাস্ত্রসমূহের প্রাথমিক থেকে উচ্চতর পর্যায়ের শিক্ষাব্যবস্থা গড়ে তোলা।" },
        { id: 6, text: "শিক্ষার্থীদের মধ্যে সুন্দর চরিত্র, সততা, শৃঙ্খলা, সহনশীলতা ও মানবিক মূল্যবোধ বিকশিত করা।" },
        { id: 7, text: "আধুনিক প্রযুক্তিনির্ভর শিক্ষাব্যবস্থার মাধ্যমে ভৌগোলিক দূরত্বের বাধা দূর করা।" },
        { id: 8, text: "ইসলামিক শিক্ষা ও গবেষণার জন্য একটি সমৃদ্ধ ডিজিটাল জ্ঞানভান্ডার গড়ে তোলা।" },
        { id: 9, text: "যোগ্য ইসলামিক শিক্ষক ও জ্ঞানচর্চায় আগ্রহী শিক্ষার্থী তৈরিতে ভূমিকা রাখা।" },
        { id: 10, text: "বিশ্বব্যাপী মুসলিম শিক্ষার্থী ও শিক্ষকদের মধ্যে জ্ঞানভিত্তিক সহযোগিতা ও যোগাযোগের ক্ষত্র তৈরি করা।" },
      ],
    },

    philosophy: {
      sectionNumber: "06",
      tag: "06. Educational Philosophy",
      titleBn: "আমাদের শিক্ষাদর্শ",
      titleEn: "Educational Philosophy",
      subtitle: "Quran Kanan বিশ্বাস করে, প্রকৃত শিক্ষা কেবল তথ্য ও জ্ঞান অর্জনের মধ্যে সীমাবদ্ধ নয়; বরং অর্জিত জ্ঞানের সঠিক অনুধাবন, বাস্তব জীবনে প্রয়োগ এবং সুন্দর চরিত্র গঠনের মধ্যেই শিক্ষার প্রকৃত সার্থকতা নিহিত।",
      leadIn: "আমাদের শিক্ষাদর্শের মূল ভিত্তি হলো—",
      pillars: [
        {
          id: 1,
          title: "জ্ঞান ও আমল",
          text: "জ্ঞান অর্জনের পাশাপাশি সেই জ্ঞান অনুযায়ী আমল করার মানসিকতা তৈরি করা।",
          icon: "BookOpen",
        },
        {
          id: 2,
          title: "অনুধাবন ও বিশ্লেষণ",
          text: "শিক্ষার্থীদের কেবল মুখস্থনির্ভর না করে অনুধাবন, চিন্তা ও বিশ্লেষণে উৎসাহিত করা।",
          icon: "Sparkles",
        },
        {
          id: 3,
          title: "বাস্তবমুখী উপস্থাপন",
          text: "কুরআন ও সুন্নাহর শিক্ষা বাস্তব জীবনের সঙ্গে সম্পর্কিত করে উপস্থাপন করা।",
          icon: "Compass",
        },
        {
          id: 4,
          title: "ব্যক্তিগত যত্ন ও গতি",
          text: "বয়স, মেধা, যোগ্যতা ও শেখার গতির প্রতি গুরুত্ব দেওয়া।",
          icon: "UserCheck",
        },
        {
          id: 5,
          title: "আত্মশুদ্ধি ও তাকওয়া",
          text: "শিক্ষার্থীদের মধ্যে আত্মশুদ্ধি, তাকওয়া, উত্তম আখলাক ও দায়িত্ববোধ সৃষ্টি করা।",
          icon: "Heart",
        },
        {
          id: 6,
          title: "শ্রদ্ধা ও আন্তরিকতা",
          text: "শিক্ষক ও শিক্ষার্থীর মধ্যে পারস্পরিক শ্রদ্ধা, আন্তরিকতা ও জ্ঞানভিত্তিক সম্পর্ক গড়ে তোলা।",
          icon: "Users",
        },
      ],
      closingQuote: "আমরা বিশ্বাস করি, শিক্ষার প্রকৃত উদ্দেশ্য হলো মানুষকে জ্ঞানে সমৃদ্ধ করা, ঈমানে সুদৃঢ় করা এবং চরিত্রে সুন্দর করে গড়ে তোলা।",
    },

    methodology: {
      sectionNumber: "09",
      tag: "09. Teaching Methodology",
      titleBn: "আমাদের পাঠদান পদ্ধতি",
      titleEn: "Teaching Methodology",
      subtitle: "Quran Kanan আধুনিক প্রযুক্তি ও কার্যকর শিক্ষণপদ্ধতির সমন্বয়ে একটি সহজ, সুশৃঙ্খল ও শিক্ষার্থীবান্ধব অনলাইন শিক্ষাব্যবস্থা গড়ে তুলতে প্রতিশ্রুতিবদ্ধ।",
      leadIn: "আমাদের পাঠদান পদ্ধতির বৈশিষ্ট্যসমূহ—",
      items: [
        {
          id: 1,
          step: "০১",
          title: "১-অন-১ লাইভ সেশন",
          desc: "অভিজ্ঞ ও যোগ্য শিক্ষকদের মাধ্যমে সরাসরি অনলাইন (ওয়ান টু ওয়ান) ক্লাস পরিচালনা।",
        },
        {
          id: 2,
          step: "০২",
          title: "রেকর্ডেড লেকচার আর্কাইভ",
          desc: "শিক্ষার্থীদের সুবিধার্থে লাইভ ক্লাসের পাশাপাশি রেকর্ডেড লেকচারের ব্যবস্থা।",
        },
        {
          id: 3,
          step: "০৩",
          title: "সুনির্দিষ্ট সিলেবাস",
          desc: "বিষয়ভিত্তিক সিলেবাস ও নির্ধারিত পাঠপরিকল্পনা অনুসরণ।",
        },
        {
          id: 4,
          step: "০৪",
          title: "প্রশ্নোত্তর ও উন্মুক্ত আলোচনা",
          desc: "শিক্ষার্থীদের বোঝার সুবিধার্থে প্রশ্নোত্তর ও আলোচনা পদ্ধতি অনুসরণ।",
        },
        {
          id: 5,
          step: "০৫",
          title: "ব্যক্তিগত ও দলীয় সেশন",
          desc: "প্রয়োজন অনুযায়ী ব্যক্তিগত ও দলীয় পাঠদানের ব্যবস্থা।",
        },
        {
          id: 6,
          step: "০৬",
          title: "নিয়মিত অনুশীলন ও অ্যাসাইনমেন্ট",
          desc: "নিয়মিত হোমওয়ার্ক, অ্যাসাইনমেন্ট ও অনুশীলন।",
        },
        {
          id: 7,
          step: "০৭",
          title: "নিরবচ্ছিন্ন পরীক্ষা ও মূল্যায়ন",
          desc: "নির্ধারিত সময় অন্তর পরীক্ষা ও মূল্যায়ন।",
        },
        {
          id: 8,
          step: "০৮",
          title: "অগ্রগতি পর্যবেক্ষণ ও ফিডব্যাক",
          desc: "শিক্ষার্থীদের অগ্রগতি পর্যবেক্ষণ ও প্রয়োজনীয় পরামর্শ প্রদান।",
        },
        {
          id: 9,
          step: "০৯",
          title: "বয়সভিত্তিক পাঠদান কৌশল",
          desc: "বয়স ও শিক্ষার স্তর অনুযায়ী পৃথক পাঠদান পদ্ধতি।",
        },
        {
          id: 10,
          step: "১০",
          title: "ত্রৈভাষিক শিক্ষাসামগ্রী",
          desc: "ইংরেজি, আরবি ও বাংলা ভাষায় শিক্ষাসামগ্রী প্রস্তুত করা।",
        },
      ],
    },
  },
};

export default siteConfig;