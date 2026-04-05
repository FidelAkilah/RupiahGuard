import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import TechStackSection from "@/components/landing/TechStackSection";
import AlignmentSection from "@/components/landing/AlignmentSection";
import CTAFooter from "@/components/landing/CTAFooter";

export default function LandingPage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <TechStackSection />
      <AlignmentSection />
      <CTAFooter />
    </main>
  );
}
