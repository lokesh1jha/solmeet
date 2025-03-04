"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"

export function SolanaWalletButton() {
  const { wallet, connect, connecting, connected } = useWallet()

  if (connected) {
    return (
      <Button
        variant="outline"
        className="border-green-500/50 bg-green-950/20 hover:bg-green-950/30 hover:border-green-400 h-10 px-4 rounded-full"
      >
        {wallet?.adapter.name}
      </Button>
    )
  }

  return <WalletMultiButton className="wallet-adapter-button-custom" />
}

