"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"

export function SolanaWalletButton() {
  const { wallet, publicKey, disconnect, connected } = useWallet()

  if (connected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <WalletMultiButton
            // variant="outline"
            className="border-green-500/50 bg-green-950/20 hover:bg-green-950/30 hover:border-green-400 h-10 px-4 rounded-full"
          >
            {publicKey?.toBase58().substring(0, 7)}...
          </WalletMultiButton>
        </DropdownMenuTrigger>
      </DropdownMenu>
    )
  }

  return <WalletMultiButton className="wallet-adapter-button-custom" />
}
