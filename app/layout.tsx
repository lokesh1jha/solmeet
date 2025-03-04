import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { SolanaWalletProvider } from "@/components/solana-wallet-provider"

export const metadata: Metadata = {
  title: "SolMeet - Connect with Solana Experts",
  description: "Book 1:1 sessions with top Solana experts and accelerate your Web3 journey with personalized guidance.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
      </body>
    </html>
  )
}



import './globals.css'