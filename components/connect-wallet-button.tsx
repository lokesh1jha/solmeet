"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Create a context to share wallet state across components
type WalletContextType = {
  isConnected: boolean
  walletAddress: string
  connectWallet: (walletType: string) => void
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  walletAddress: "",
  connectWallet: () => {},
  disconnectWallet: () => {},
})

export const useWallet = () => useContext(WalletContext)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  // Check if wallet was previously connected
  useEffect(() => {
    const savedWalletState = localStorage.getItem("solmeet_wallet")
    if (savedWalletState) {
      try {
        const { address } = JSON.parse(savedWalletState)
        setWalletAddress(address)
        setIsConnected(true)
      } catch (error) {
        console.error("Failed to parse wallet state:", error)
        localStorage.removeItem("solmeet_wallet")
      }
    }
  }, [])

  const connectWallet = (walletType: string) => {
    // Simulate wallet connection
    const mockAddress = `${walletType.substring(0, 2)}${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`
    setWalletAddress(mockAddress)
    setIsConnected(true)

    // Save connection state
    localStorage.setItem(
      "solmeet_wallet",
      JSON.stringify({
        type: walletType,
        address: mockAddress,
      }),
    )
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress("")
    localStorage.removeItem("solmeet_wallet")
  }

  return (
    <WalletContext.Provider value={{ isConnected, walletAddress, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  )
}

export function ConnectWalletButton() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { isConnected, walletAddress, connectWallet, disconnectWallet } = useWallet()

  const handleConnect = (walletType: string) => {
    connectWallet(walletType)
    setDialogOpen(false)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isConnected ? "outline" : "default"}
          className={
            isConnected
              ? "border-green-500/50 bg-green-950/20 hover:bg-green-950/30 hover:border-green-400 h-10 px-4 rounded-full"
              : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-10 px-4 rounded-full"
          }
        >
          {isConnected ? (
            <>
              <Check className="mr-2 h-4 w-4 text-green-400" />
              {walletAddress}
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-black/90 backdrop-blur-xl border border-purple-500/20">
        {isConnected ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Wallet Connected
              </DialogTitle>
              <DialogDescription className="text-center text-gray-400">
                Your wallet is currently connected to SolMeet
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center py-4 space-y-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-900/20 border border-green-500/30">
                <Check className="h-8 w-8 text-green-400" />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">Connected Address</p>
                <p className="font-medium">{walletAddress}</p>
              </div>
              <Button variant="destructive" className="mt-4" onClick={disconnectWallet}>
                Disconnect Wallet
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Connect your wallet
              </DialogTitle>
              <DialogDescription className="text-center text-gray-400">
                Choose a wallet to connect to SolMeet
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {["Phantom", "Solflare", "Backpack", "Glow"].map((wallet) => (
                <Button
                  key={wallet}
                  variant="outline"
                  className="flex justify-between items-center h-14 px-6 border border-purple-500/20 bg-black/50 hover:bg-purple-900/20 hover:border-purple-400/50 rounded-xl"
                  onClick={() => handleConnect(wallet)}
                >
                  <span className="font-medium">{wallet}</span>
                  <img
                    src={`/placeholder.svg?height=24&width=24`}
                    alt={`${wallet} logo`}
                    className="h-6 w-6 rounded-full"
                  />
                </Button>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

