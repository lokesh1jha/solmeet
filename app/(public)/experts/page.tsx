import { ExpertsList } from "@/components/experts/experts-list"
import { ExpertsHeader } from "@/components/experts/experts-header"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ExpertsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <ExpertsHeader />
        <ExpertsList />
      </main>
      <Footer />
    </div>
  )
}

