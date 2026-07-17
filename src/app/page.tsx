import { HeroSection } from "@/components/sections/HeroSection";
import { JourneySelector } from "@/components/sections/JourneySelector";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { CompaniesSection } from "@/components/sections/CompaniesSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <JourneySelector />
      <FeaturedProjects />
      <CompaniesSection />
      <TimelineSection />
      <CTASection />
    </>
  );
}
