"use client";

import HeroSection from "@/components/public/home/hero";
import StatsSection from "@/components/public/home/statsSection";
import CoursesSection from "@/components/public/home/featuredSection";
import EbooksSection from "@/components/public/home/ebooksSection";
import WhyChooseUs from "@/components/public/home/whyChooseUs";
import ReviewSection from "@/components/public/home/reviews";
import SadaqahBanner from "@/components/public/home/sadaqahBanner";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5FAFD]">
      <HeroSection />
      <StatsSection />
      <CoursesSection />
      <EbooksSection />
      <WhyChooseUs />
      <ReviewSection />
      <SadaqahBanner />
    </div>
  );
}
