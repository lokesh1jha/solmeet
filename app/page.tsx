import { HeroSection } from "@/components/hero-section"
import { ExpertShowcase } from "@/components/expert-showcase"
import { BookingPreview } from "@/components/booking-preview"
import { Features } from "@/components/features"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ExpertShowcase />
      <Features />
      <BookingPreview />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}

