"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserProfileMenu } from "@/components/user-profile-menu"
import { Mountain, Menu, X } from "lucide-react"
import { SolanaWalletButton } from "@/components/solana-wallet-button"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-500/20 bg-black/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Mountain className="h-8 w-8 text-purple-400 mr-2" />
              <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                SolMeet
              </span>
            </Link>

            <nav className="hidden ml-10 space-x-8 md:flex">
              <Link
                href="/experts"
                className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors"
              >
                Find Experts
              </Link>
              {/* <Link
                href="/how-it-works"
                className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors"
              >
                Pricing
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
                About
              </Link> */}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <SolanaWalletButton />
            <UserProfileMenu />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-purple-500/20 bg-black/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/experts"
              className="block text-base font-medium text-gray-300 hover:text-purple-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Experts
            </Link>
            <Link
              href="/how-it-works"
              className="block text-base font-medium text-gray-300 hover:text-purple-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              className="block text-base font-medium text-gray-300 hover:text-purple-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="block text-base font-medium text-gray-300 hover:text-purple-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

