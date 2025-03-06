import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SolanaWalletButton } from "./solana-wallet-button"

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 z-0" />

      {/* Animated glow effects */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-block px-6 py-2 mb-6 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm">
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Web3 Consulting & Coaching
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Connect. Learn. Build.
          </h1>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl">
            Book 1:1 sessions with top Solana experts and accelerate your Web3 journey with personalized guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none h-12 px-8 rounded-full"
            >
              <Link href="/experts">Find an Expert</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none h-12 px-8 rounded-full"
            >
              <Link href="/register">Register as an Expert</Link>
            </Button>
            <SolanaWalletButton />
          </div>
        </div>
      </div>
    </div>
  )
}

