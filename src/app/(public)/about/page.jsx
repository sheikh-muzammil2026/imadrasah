import { siteConfig } from "@/config/siteConfig";
import AboutSection from "@/components/public/about/AboutSection";

export const metadata = {
  title: `পরিচিতি ও শিক্ষাদর্শ - ${siteConfig.identity.name.bn}`,
  description: siteConfig.identity.description.bn,
};

export default function AboutPage() {
  return <AboutSection isFullPage={true} />;
}
