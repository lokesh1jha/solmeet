"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Star, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useWallet } from "@solana/wallet-adapter-react"

// Sample experts data
const experts = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Solana Core Developer",
    rating: 4.9,
    reviews: 124,
    price: 0.5,
    tags: ["Smart Contracts", "Program Development", "Security"],
    image: "/placeholder.svg?height=400&width=400",
    bio: "Solana core developer with 5+ years of experience building high-performance dApps and smart contracts. Specialized in secure program development and optimization techniques.",
    availability: "Next available: Today at 2:00 PM",
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "DeFi Architect",
    rating: 4.8,
    reviews: 98,
    price: 0.65,
    tags: ["DeFi Protocols", "Tokenomics", "Yield Strategies"],
    image: "/placeholder.svg?height=400&width=400",
    bio: "DeFi specialist with experience designing and auditing complex financial protocols on Solana. Former lead architect at a top 10 Solana DeFi project.",
    availability: "Next available: Tomorrow at 10:00 AM",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "NFT & Gaming Expert",
    rating: 4.7,
    reviews: 87,
    price: 0.45,
    tags: ["NFT Collections", "Game Economics", "Marketplaces"],
    image: "/placeholder.svg?height=400&width=400",
    bio: "NFT and gaming specialist who has launched multiple successful collections. Expert in on-chain gaming mechanics and NFT marketplace development.",
    availability: "Next available: Oct 18 at 3:30 PM",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "Solana Infrastructure Specialist",
    rating: 4.9,
    reviews: 56,
    price: 0.7,
    tags: ["RPC Nodes", "Validators", "Network Optimization"],
    image: "/placeholder.svg?height=400&width=400",
    bio: "Infrastructure expert specializing in Solana validator operations and RPC node optimization. Helps projects scale their infrastructure for maximum performance.",
    availability: "Next available: Oct 19 at 1:00 PM",
  },
  {
    id: 5,
    name: "David Kim",
    role: "Solana Frontend Developer",
    rating: 4.6,
    reviews: 72,
    price: 0.4,
    tags: ["React", "Web3 Integration", "UI/UX"],
    image: "/placeholder.svg?height=400&width=400",
    bio: "Frontend specialist focused on building beautiful and intuitive interfaces for Solana dApps. Expert in wallet integrations and transaction handling.",
    availability: "Next available: Oct 17 at 11:00 AM",
  },
  {
    id: 6,
    name: "Aisha Patel",
    role: "Tokenomics Consultant",
    rating: 4.8,
    reviews: 63,
    price: 0.6,
    tags: ["Token Design", "Economic Models", "Incentive Structures"],
    image: "/placeholder.svg?height=400&width=400",
    bio: "Tokenomics expert who has designed economic models for multiple successful Solana projects. Specializes in sustainable token economies and incentive alignment.",
    availability: "Next available: Oct 20 at 9:00 AM",
  },
]

export function ExpertsList() {
  const { connected } = useWallet()
  const [walletDialogOpen, setWalletDialogOpen] = useState(false)
  const [selectedExpert, setSelectedExpert] = useState<(typeof experts)[0] | null>(null)

  const handleConnectClick = (expert: (typeof experts)[0]) => {
    if (connected) {
      // If wallet is connected, proceed to booking
      window.location.href = `/booking/${expert.id}`
    } else {
      // If wallet is not connected, show dialog
      setSelectedExpert(expert)
      setWalletDialogOpen(true)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experts.map((expert) => (
          <Card
            key={expert.id}
            className="bg-black/40 backdrop-blur-sm border border-purple-500/20 overflow-hidden hover:border-purple-400/40 transition-all duration-300 group"
          >
            <CardContent className="p-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                <img
                  src={expert.image || "/placeholder.svg"}
                  alt={expert.name}
                  className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 z-20 flex items-center">
                  <div className="flex items-center bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{expert.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">({expert.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{expert.name}</h3>
                <p className="text-purple-400 mb-3">{expert.role}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {expert.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-purple-950/20 border-purple-500/30 text-purple-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <p className="text-sm text-gray-400 mb-4 line-clamp-3">{expert.bio}</p>

                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                  {expert.availability}
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">60 min</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">{expert.price} SOL</span>
                    <span className="text-gray-400 text-sm ml-1">/ session</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none"
                  onClick={() => handleConnectClick(expert)}
                >
                  {connected ? "Book Session" : "Connect to Book"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={walletDialogOpen} onOpenChange={setWalletDialogOpen}>
        <DialogContent className="sm:max-w-md bg-black/90 backdrop-blur-xl border border-purple-500/20">
          <DialogHeader>
            <DialogTitle className="text-xl text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Wallet Connection Required
            </DialogTitle>
            <DialogDescription className="text-center text-gray-400">
              Please connect your wallet to book a session with {selectedExpert?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4 space-y-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-900/20 border border-purple-500/30">
              <AlertCircle className="h-8 w-8 text-purple-400" />
            </div>
            <p className="text-center text-gray-400">
              You need to connect your Solana wallet to book sessions with experts. This allows for secure payments and
              verification.
            </p>
            <Button
              className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none"
              onClick={() => setWalletDialogOpen(false)}
            >
              Connect Wallet
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

