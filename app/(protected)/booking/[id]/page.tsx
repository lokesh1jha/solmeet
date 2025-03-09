"use client"

import { useState, use } from "react";
import { useWallet } from "@solana/wallet-adapter-react"
import { useRouter } from "next/navigation"
import { processPayment } from "@/lib/payment-service"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Clock, CreditCard, Star } from "lucide-react"
import Link from "next/link"

export default function BookingPage(props: { params: Promise<{ id: string }> }) {
  const ALLOWED_WINDOW_FOR_BOOKING = 7;
  const params = use(props.params);
  const wallet = useWallet()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  
  // This would fetch the expert data based on the ID in a real app
  const expert = {
    id: params.id,
    name: "Alex Rivera",
    role: "Solana Core Developer",
    rating: 4.9,
    reviews: 124,
    price: 0.5,
    tags: ["Smart Contracts", "Program Development", "Security"],
    image: "/placeholder.svg?height=400&width=400",
    bio: "Solana core developer with 5+ years of experience building high-performance dApps and smart contracts. Specialized in secure program development and optimization techniques.",
    walletAddress: "EXPERT_WALLET_ADDRESS", // Replace with actual expert wallet address
    availableWeekDays: ["Mon", "Tue", "Sat"],
    startTimeSlot: "12:00 AM",
    endTimeSlot: "04:00 PM"
  }

  const mockBookedSlots: { [key: string]: string[] } = {
    "11-03-2025": ["1:00 PM", "2:00 PM"],
    "15-03-2025": ["9:00 AM", "10:00 AM"]
  }

  const handlePayment = async () => {
    if (!wallet.connected) {
      setError("Please connect your wallet to make a payment.")
      return
    }

    setIsProcessing(true)
    setError("")
    setSuccess("")

    try {
      const signature = await processPayment(wallet, expert.walletAddress, expert.price)
      setSuccess(`Payment successful! Transaction signature: ${signature}`)
      // Here you would typically update the booking status in your database
    } catch (err) {
      setError(`Payment failed: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const renderCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dayName = date.toLocaleString('default', { weekday: 'short' });

      if (expert.availableWeekDays.includes(dayName) && i >= today.getDate() && i <= today.getDate() + ALLOWED_WINDOW_FOR_BOOKING) {
        days.push(
          <button
            key={date.toDateString()}
            className={`text-center py-2 rounded-md text-sm ${
              selectedDate?.toDateString() === date.toDateString()
                ? "bg-blue-900/30 border border-blue-500/30 text-white"
                : "hover:bg-purple-900/20 text-gray-300"
            }`}
            onClick={() => setSelectedDate(date)}
          >
            {i}
          </button>
        );
      } else {
        days.push(
          <div key={date.toDateString()} className="text-center py-2 rounded-md text-sm text-gray-400 bg-gray-800">
            {i}
          </div>
        );
      }
    }

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const emptyDays = Array.from({ length: firstDayOfMonth }, (_, index) => (
      <div key={`empty-${index}`} className="text-center py-2 rounded-md text-sm text-gray-400 bg-gray-800"></div>
    ));

    return (
      <div className="mb-6">
        <h3 className="text-sm text-gray-400 mb-3">{today.toLocaleString('default', { month: 'long' })} {year}</h3>
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs text-gray-400 py-1">
              {day}
            </div>
          ))}
          {emptyDays}
          {days}
        </div>
      </div>
    );
  };

  const renderTimeSlots = () => {
    if (!selectedDate) return null;

    const startTime = new Date(`1970-01-01T${expert.startTimeSlot}`);
    const endTime = new Date(`1970-01-01T${expert.endTimeSlot}`);
    console.log(selectedDate, startTime, endTime)
    const slots = [];
    const bookedSlots = mockBookedSlots[selectedDate.toISOString().split('T')[0]] || [];

    for (let time = startTime; time < endTime; time.setHours(time.getHours() + 1)) {
      const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      slots.push(
        <button
          key={timeString}
          className={`flex items-center justify-center p-3 rounded-lg border text-sm ${
            selectedTime === timeString
              ? "border-blue-500/30 bg-blue-900/20 text-white"
              : bookedSlots.includes(timeString)
              ? "border-gray-500/20 bg-gray-900/10 text-gray-500 cursor-not-allowed"
              : "border-purple-500/20 bg-purple-900/10 hover:bg-purple-900/20 text-gray-300"
          }`}
          onClick={() => !bookedSlots.includes(timeString) && setSelectedTime(timeString)}
          disabled={bookedSlots.includes(timeString)}
        >
          <Clock className={`h-4 w-4 mr-2 ${selectedTime === timeString ? "text-blue-400" : "text-purple-400"}`} />
          <span>{timeString}</span>
        </button>
      );
    }

    return (
      <div>
        <h3 className="text-sm text-gray-400 mb-3">Available Time Slots</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {slots}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-purple-400 mb-8">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Experts
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20 sticky top-8">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    <img
                      src={expert.image || "/placeholder.svg"}
                      alt={expert.name}
                      className="w-32 h-32 rounded-full object-cover border-2 border-purple-500/30"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full border border-yellow-500/30">
                      <Star className="h-3 w-3 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{expert.rating}</span>
                      <span className="text-xs text-gray-400 ml-1">({expert.reviews})</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold">{expert.name}</h2>
                  <p className="text-purple-400 mb-3">{expert.role}</p>

                  <div className="flex flex-wrap justify-center gap-2 mb-4">
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
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg border border-purple-500/20 bg-purple-900/10">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-purple-400 mr-2" />
                      <span>Session Duration</span>
                    </div>
                    <span className="font-medium">60 minutes</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg border border-purple-500/20 bg-purple-900/10">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-purple-400 mr-2" />
                      <span>Session Price</span>
                    </div>
                    <span className="font-medium">{expert.price} SOL</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-2">About {expert.name}</h3>
                  <p className="text-gray-400 text-sm">{expert.bio}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20 mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Select a Date & Time</h2>

                {renderCalendar()}
                {renderTimeSlots()}
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20 mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Session Details</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">What would you like to discuss?</label>
                    <textarea
                      className="w-full h-32 rounded-lg border border-purple-500/20 bg-black/60 text-white p-3 focus:border-purple-400 focus:ring focus:ring-purple-400/20 focus:outline-none"
                      placeholder="Describe what you'd like to learn or discuss in this session..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Your experience level</label>
                    <select className="w-full rounded-lg border border-purple-500/20 bg-black/60 text-white p-3 focus:border-purple-400 focus:ring focus:ring-purple-400/20 focus:outline-none">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Payment Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Session Fee</span>
                    <span>{expert.price} SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Platform Fee</span>
                    <span>0.05 SOL</span>
                  </div>
                  <div className="border-t border-purple-500/20 pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span>{(expert.price + 0.05).toFixed(2)} SOL</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none h-12"
                  onClick={handlePayment}
                  disabled={isProcessing || !wallet.connected}
                >
                  {isProcessing ? "Processing..." : wallet.connected ? "Confirm and Pay" : "Connect Wallet to Pay"}
                </Button>

                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert variant="default" className="mt-4 bg-green-900/20 border-green-500/20 text-green-400">
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <p className="text-xs text-gray-400 text-center mt-4">
                  By confirming, you agree to our Terms of Service and Payment Policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
