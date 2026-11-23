export default function WhyChooseUs() {
  const features = [
    {
      id: "sahih",
      iconType: "solid-blue",
      title: "সহীহ পাঠদান",
      description:
        "প্রতিটি কোর্স তৈরি হয়েছে অভিজ্ঞ ক্বারী ও আলিমদের তত্ত্বাবধানে। তাজবীদ থেকে হিফজ পর্যন্ত ধাপে ধাপে পাঠক্রম।",
    },
    {
      id: "monitoring",
      iconType: "outlined-blue",
      title: "অভিভাবকের নজরদারি",
      description:
        "শিক্ষার্থীর দৈনিক ও মাসিক রিপোর্ট পিডিএফ আকারে ডাউনলোড করা যায়। উপস্থিতি, কুইজ ও অগ্রগতি একসাথে।",
    },
    {
      id: "transparent",
      iconType: "solid-gold",
      title: "স্বচ্ছ হিসাব",
      description:
        "দান ও প্রাতিষ্ঠানিক আয়-ব্যয়ের হিসাব প্রতি মাসে প্রকাশ করা হয়। কোথায় খরচ হলো, দাতারা জানতে পারেন।",
    },
  ];

  return (
    <section className="py-12 bg-[#F5FAFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-[#E2EEF5] p-6 shadow-soft hover:shadow-card-hover transition duration-200 space-y-4"
            >
              {/* Diamond Icon */}
              <div>
                {item.iconType === "solid-blue" && (
                  <div className="w-8 h-8 rotate-45 bg-[#0288D1] rounded-xs flex items-center justify-center shadow-xs" />
                )}
                {item.iconType === "outlined-blue" && (
                  <div className="w-8 h-8 rotate-45 border-3 border-[#0288D1] bg-white rounded-xs flex items-center justify-center shadow-xs" />
                )}
                {item.iconType === "solid-gold" && (
                  <div className="w-8 h-8 rotate-45 bg-[#F59E0B] rounded-xs flex items-center justify-center shadow-xs" />
                )}
              </div>

              {/* Title & Desc */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#064E73]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4A606D] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
