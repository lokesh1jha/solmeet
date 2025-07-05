"use client"

import type React from "react"

import { useMemo } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { 
  PhantomWalletAdapter, 
  SolflareWalletAdapter, 
  TorusWalletAdapter
} from "@solana/wallet-adapter-wallets"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"

// Import the CSS for the wallet adapter UI
import "@solana/wallet-adapter-react-ui/styles.css"

export function SolanaWalletProvider({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => {
      // Create wallet adapters with explicit configurations to avoid duplicates
      const walletList = []
      
      try {
        walletList.push(new PhantomWalletAdapter())
      } catch (error) {
        console.warn('PhantomWalletAdapter failed to initialize:', error)
      }
      
      try {
        walletList.push(new SolflareWalletAdapter({ network }))
      } catch (error) {
        console.warn('SolflareWalletAdapter failed to initialize:', error)
      }
      
      try {
        walletList.push(new TorusWalletAdapter())
      } catch (error) {
        console.warn('TorusWalletAdapter failed to initialize:', error)
      }
      
      return walletList
    },
    [network]
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

