import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Alex Chen",
    role: "DeFi Developer",
    company: "Web3 Startup",
    image: "/api/placeholder/64/64",
    rating: 5,
    text: "SolMeet connected me with an expert who helped me optimize my smart contract gas usage. The session was incredibly valuable and saved me weeks of research."
  },
  {
    name: "Sarah Johnson",
    role: "Blockchain Entrepreneur",
    company: "TokenFlow",
    image: "/api/placeholder/64/64",
    rating: 5,
    text: "As a non-technical founder, I needed guidance on Solana's ecosystem. The consultant I found through SolMeet explained everything clearly and helped me make informed decisions."
  },
  {
    name: "Marcus Rodriguez",
    role: "Senior Developer",
    company: "Solana Labs",
    image: "/api/placeholder/64/64",
    rating: 5,
    text: "I've been on both sides of SolMeet - as a consultant and client. The platform makes it easy to share knowledge and get quality help when needed."
  },
  {
    name: "Emily Wong",
    role: "NFT Artist",
    company: "Independent",
    image: "/api/placeholder/64/64",
    rating: 5,
    text: "The consultant helped me understand the technical aspects of minting on Solana. Now I'm successfully running my own NFT collection!"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black z-0" />
      
      {/* Floating elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-blue-600/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-600/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            What Our Community Says
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real stories from developers, entrepreneurs, and Web3 enthusiasts who've accelerated their Solana journey with expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl border border-purple-500/20 bg-black/40 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300 group"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity">
                <Quote className="h-8 w-8 text-purple-400" />
              </div>
              
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              {/* Testimonial text */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              {/* User info */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-white font-medium">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Ready to join our community?</p>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  )
}
