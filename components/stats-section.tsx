import { Users, Calendar, Star, DollarSign } from "lucide-react"

const stats = [
  {
    icon: Users,
    number: "500+",
    label: "Expert Consultants",
    description: "Verified Solana professionals"
  },
  {
    icon: Calendar,
    number: "10,000+",
    label: "Sessions Completed",
    description: "Successful consultations"
  },
  {
    icon: Star,
    number: "4.9",
    label: "Average Rating",
    description: "Client satisfaction score"
  },
  {
    icon: DollarSign,
    number: "$2M+",
    label: "Value Exchanged",
    description: "In SOL transactions"
  }
]

export function StatsSection() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-black to-blue-900/10 z-0" />
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-600/20 rounded-full blur-2xl animate-pulse" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Trusted by the Solana Community
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of developers, entrepreneurs, and Web3 enthusiasts who have accelerated their Solana journey with our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl border border-purple-500/20 bg-black/40 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300 group"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-white font-medium mb-1">{stat.label}</div>
              <div className="text-sm text-gray-400">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
