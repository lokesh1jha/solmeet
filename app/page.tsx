import { HeroSection } from "@/components/hero-section"
import { ExpertShowcase } from "@/components/expert-showcase"
import { BookingPreview } from "@/components/booking-preview"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <ExpertShowcase />
      <BookingPreview />
      <Features />
      <Footer />
    </div>
  )
}

