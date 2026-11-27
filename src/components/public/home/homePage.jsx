"use client";

import HeroSection from "@/components/public/home/hero";
import StatsSection from "@/components/public/home/statsSection";
import CoursesSection from "@/components/public/home/featuredSection";
import EbooksSection from "@/components/public/home/ebooksSection";
import AboutSection from "@/components/public/about/AboutSection";
import ReviewSection from "@/components/public/home/reviews";
import SadaqahBanner from "@/components/public/home/sadaqahBanner";
import FaqSection from "@/components/public/home/faqSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#E3F2FD]">
      <HeroSection />
      {/* <StatsSection /> */}
      <CoursesSection />
      <EbooksSection />
      {/* Unified Single Source of Truth About Section */}
      <AboutSection isFullPage={false} />
      {/* <ReviewSection /> */}
      <SadaqahBanner />
      {/* FAQ Relocated to the bottom of Home page, above Footer */}
      <FaqSection />
    </div>
  );
}
