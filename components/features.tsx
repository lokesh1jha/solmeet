import { Shield, Video, MessageSquare, Zap } from "lucide-react"

const features = [
  {
    icon: Video,
    title: "HD Video Calls",
    description: "Crystal clear video sessions with screen sharing capabilities for effective collaboration.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Direct Solana blockchain payments with no middlemen and low transaction fees.",
  },
  {
    icon: MessageSquare,
    title: "Chat Support",
    description: "Ongoing chat support with your expert between scheduled sessions.",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    description: "Book sessions instantly with real-time availability and calendar syncing.",
  },
]

export function Features() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            SolMeet provides everything you need for productive consulting sessions on the Solana blockchain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-purple-500/20 bg-black/40 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

