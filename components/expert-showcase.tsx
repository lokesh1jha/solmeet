import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Star } from "lucide-react"
import Link from "next/link"

const experts = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Solana Core Developer",
    rating: 4.9,
    reviews: 124,
    price: 0.5,
    tags: ["Smart Contracts", "Program Development", "Security"],
    image: "https://images.pexels.com/photos/8090290/pexels-photo-8090290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "DeFi Architect",
    rating: 4.8,
    reviews: 98,
    price: 0.65,
    tags: ["DeFi Protocols", "Tokenomics", "Yield Strategies"],
    image: "https://images.pexels.com/photos/7606047/pexels-photo-7606047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "NFT & Gaming Expert",
    rating: 4.7,
    reviews: 87,
    price: 0.45,
    tags: ["NFT Collections", "Game Economics", "Marketplaces"],
    image: "https://images.pexels.com/photos/7606016/pexels-photo-7606016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
]

export function ExpertShowcase() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Solana Experts</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Learn from the best minds in the Solana ecosystem. Our experts are ready to help you navigate the Web3
            landscape.
          </p>
        </div>

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
                    asChild
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none"
                  >
                    <Link href={`/booking/${expert.id}`}>Book Session</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            className="border-purple-500/30 hover:bg-purple-950/20 hover:border-purple-400/50"
          >
            <Link href="/experts">View All Experts</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

