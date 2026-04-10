import { Hero } from "@/components/landing/Hero";
import { Promise as PromiseSection } from "@/components/landing/Promise";
import { MarketStats } from "@/components/landing/MarketStats";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PacksPreview } from "@/components/landing/PacksPreview";
import { DiagnosticTeaser } from "@/components/landing/DiagnosticTeaser";
import { WhyHL } from "@/components/landing/WhyHL";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTAFinal } from "@/components/landing/CTAFinal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromiseSection />
      <MarketStats />
      <HowItWorks />
      <PacksPreview />
      <DiagnosticTeaser />
      <WhyHL />
      <Testimonials />
      <FAQ />
      <CTAFinal />
    </>
  );
}
