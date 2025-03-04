import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import Link from "next/link"

export function BookingPreview() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black z-0" />

      {/* Animated glow effect */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple Booking Process</h2>
            <p className="text-gray-400 mb-8">
              Book sessions with Solana experts in just a few clicks. Our streamlined process makes it easy to find the
              right mentor and schedule time that works for you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-900/30 border border-purple-500/30 shrink-0">
                  <span className="text-purple-400 font-medium">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Choose an Expert</h3>
                  <p className="text-gray-400">Browse profiles and find the perfect match for your needs.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-900/30 border border-blue-500/30 shrink-0">
                  <span className="text-blue-400 font-medium">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Select a Time Slot</h3>
                  <p className="text-gray-400">View availability and pick a time that works for your schedule.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-900/30 border border-purple-500/30 shrink-0">
                  <span className="text-purple-400 font-medium">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Pay with SOL</h3>
                  <p className="text-gray-400">Secure payment through your connected Solana wallet.</p>
                </div>
              </div>
            </div>

            <Button
              asChild
              className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none h-12 px-8 rounded-full"
            >
              <Link href="/experts">Find an Expert Now</Link>
            </Button>
          </div>

          <div className="lg:w-1/2">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 border border-purple-500/30 rounded-lg z-0" />
              <div className="absolute -bottom-6 -right-6 w-12 h-12 border border-blue-500/30 rounded-lg z-0" />

              <div className="relative bg-black/60 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden z-10">
                <div className="p-6 border-b border-purple-500/20">
                  <div className="flex items-center gap-4">
                    <img
                      src="/placeholder.svg?height=60&width=60"
                      alt="Expert"
                      className="w-14 h-14 rounded-full object-cover border-2 border-purple-500/30"
                    />
                    <div>
                      <h3 className="text-xl font-bold">Alex Rivera</h3>
                      <p className="text-purple-400">Solana Core Developer</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 rounded-lg border border-purple-500/20 bg-purple-900/10 cursor-pointer hover:bg-purple-900/20 transition-colors">
                      <p className="text-sm text-gray-400">Mon</p>
                      <p className="font-medium">15</p>
                    </div>
                    <div className="text-center p-3 rounded-lg border border-blue-500/30 bg-blue-900/20 cursor-pointer hover:bg-blue-900/30 transition-colors">
                      <p className="text-sm text-gray-400">Tue</p>
                      <p className="font-medium">16</p>
                    </div>
                    <div className="text-center p-3 rounded-lg border border-purple-500/20 bg-purple-900/10 cursor-pointer hover:bg-purple-900/20 transition-colors">
                      <p className="text-sm text-gray-400">Wed</p>
                      <p className="font-medium">17</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm text-gray-400">Available Times</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center justify-center p-3 rounded-lg border border-blue-500/30 bg-blue-900/20 cursor-pointer hover:bg-blue-900/30 transition-colors">
                        <Clock className="h-4 w-4 mr-2 text-blue-400" />
                        <span>10:00 AM</span>
                      </div>
                      <div className="flex items-center justify-center p-3 rounded-lg border border-purple-500/20 bg-purple-900/10 cursor-pointer hover:bg-purple-900/20 transition-colors">
                        <Clock className="h-4 w-4 mr-2 text-purple-400" />
                        <span>2:00 PM</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-purple-500/20 bg-purple-900/10">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Session Fee</span>
                      <span>0.5 SOL</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-400">Platform Fee</span>
                      <span>0.05 SOL</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>0.55 SOL</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none">
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

