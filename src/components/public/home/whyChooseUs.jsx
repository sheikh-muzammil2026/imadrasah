import { siteConfig } from "@/config/siteConfig";

export default function WhyChooseUs() {
  const coreValues = siteConfig.coreValues.slice(0, 3);

  return (
    <section className="py-12 bg-[#E3F2FD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="section-pill">
            আমাদের মূলনীতি ও শিক্ষাদর্শ
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D47A1]">
            কেন কুরআন কানন আন্তর্জাতিক ইনস্টিটিউট?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {siteConfig.identity.tagline.bn}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((item, idx) => (
            <div
              key={item.title}
              className="card-white card-interactive space-y-3"
            >
              {/* Diamond Icon */}
              <div>
                <div className="w-8 h-8 rotate-45 bg-[#0D47A1] rounded-xs flex items-center justify-center shadow-xs text-white text-xs font-bold">
                  <span className="-rotate-45">{idx + 1}</span>
                </div>
              </div>

              {/* Title & Desc */}
              <div className="space-y-1.5 pt-1">
                <h3 className="text-lg font-bold text-[#0D47A1]">
                  {item.title} — {item.bn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
