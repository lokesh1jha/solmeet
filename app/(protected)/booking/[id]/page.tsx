"use client"

import { useState, use, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { processPayment } from "@/lib/payment-service"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Clock, CreditCard, Star, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import { SolanaWalletButton } from "@/components/solana-wallet-button";
import { toast } from "sonner";
import { createBooking, createPayment } from "@/lib/helper";
import { generateTimeSlots, formatDateTime, addDays } from "@/lib/dateUtils";

export default function BookingPage(props: { params: Promise<{ id: string }> }) {
  const ALLOWED_WINDOW_FOR_BOOKING = 14;
  const params = use(props.params);
  const wallet = useWallet()
  const router = useRouter()
  const { data: session } = useSession()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [halfHourlyRate, setHalfHourlyRate] = useState(0)
  const [platformFee, setPlatformFee] = useState(0.05)
  const [total, setTotal] = useState(0)
  const [bookingId, setBookingId] = useState<string | null>(null)
  const { expertForBooking } = useAppContext()
  const [expert, setExpert] = useState(expertForBooking);
  const [connectedUserWalletAddress, setConnectedUserWalletAddress] = useState("")
  const [discussionTopic, setDiscussionTopic] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("Beginner")

  useEffect(() => {
    if (!expertForBooking) {
      const expertSelected = localStorage.getItem("expertForBooking");
      if (expertSelected) {
        setExpert(JSON.parse(expertSelected));
      } else {
        console.error("No expert selected for booking");
        router.push("/experts");
      }
    }

  }, [expertForBooking, router]);

  useEffect(() => {
    if(wallet.publicKey) {
      setConnectedUserWalletAddress(wallet.publicKey.toString())
    }
  }, [wallet])


  useEffect(() => {
    if (expert) {
      const halfHourRate = parseFloat((expert.hourlyRate / 2).toFixed(2))
      let platformFeePercentage = parseFloat(process.env.NEXT_PUBLIC_PLATFORM_FEES_PERCENTAGE || "0.1")
      const platformFees = halfHourRate * platformFeePercentage

      setPlatformFee(parseFloat(platformFees.toFixed(2)));
      setHalfHourlyRate(halfHourRate);
      setTotal(halfHourRate + platformFees);
    }
  }, [expert]);

  if (!expert) return null;

  const createNewBooking = async () => {
    // Check if user is authenticated
    if (!session?.user?.id) {
      setError("Please log in to create a booking.")
      return null
    }
    
    if (!wallet.connected) {
      setError("Please connect your wallet to make a payment.")
      return null
    }
    
    if (!selectedDate || !selectedTime) {
      setError("Please select a date and time for the booking.")
      return null
    }
    
    try {
      const bookingDateTime = formatDateTime(selectedDate, selectedTime!);
      
      console.log("Creating booking with user ID:", session.user.id);
      
      let response: any = await createBooking(
        session.user.id, // Use actual user ID from session instead of wallet address
        expert.user.id,
        "pending",
        bookingDateTime,
        30,
        "minutes",
        halfHourlyRate,
      )

      if (response.error) {
        console.error("Booking creation failed:", response.error)
        toast.error(`Failed to create booking: ${response.error}`)
        return null
      }
      
      console.log("Booking created successfully", response)
      const newBookingId = response.bookingId || response.data?.id
      setBookingId(newBookingId)
      return newBookingId
    } catch (error) {
      console.error("Error creating booking:", error)
      toast.error("Failed to create booking")
      return null
    }
  }

  const handlePayment = async () => {
    console.log("Payment processing...", wallet, expert.user.walletAddress, halfHourlyRate, platformFee);

    if (!wallet.connected) {
      setError("Please connect your wallet to make a payment.")
      return
    }

    if (!selectedDate || !selectedTime) {
      setError("Please select a date and time for the booking.")
      return
    }
    
    if(wallet.publicKey) {
      setConnectedUserWalletAddress(wallet.publicKey.toString())
    }
    setIsProcessing(true)
    setError("")
    setSuccess("")

    try {
      setIsProcessing(true);

      // Step 1: Create Booking and get bookingId
      const newBookingId = await createNewBooking()
      if(!newBookingId) {
        setError("Failed to create booking")
        setIsProcessing(false)
        return
      }

      // Step 2: Process Payment and get Transaction Signature
      const signature = await processPayment(wallet, expert.user.walletAddress, halfHourlyRate, platformFee)

      // Step 3: Save Payment with Booking ID and Signature 
      await toast.promise(
        createPayment(newBookingId, halfHourlyRate, connectedUserWalletAddress, expert.user.walletAddress, signature),
        {
          loading: "Saving payment...",
          success: "Payment saved successfully!",
          error: "Failed to save payment",
        }
      );

      setSuccess(`Payment successful! Transaction signature: ${signature}`);
    } catch (err) {
      setError(`Payment failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsProcessing(false);
    }
  }

  const renderCalendar = () => {
      const today = new Date();
      const days = [];

      for (let i = 0; i <= ALLOWED_WINDOW_FOR_BOOKING; i++) {
        const date = addDays(today, i);
        const dayName = date.toLocaleString('default', { weekday: 'long' });

        // Check if this day is in the expert's available days
        if (expert?.availableWeekDays.includes(dayName)) {
          days.push(
            <button
              key={date.toDateString()}
              className={`text-center py-2 rounded-md text-sm transition-colors ${
                selectedDate?.toDateString() === date.toDateString()
                  ? "bg-blue-900/30 border border-blue-500/30 text-white"
                  : "hover:bg-purple-900/20 text-gray-300 border border-transparent"
              }`}
              onClick={() => setSelectedDate(date)}
            >
              <div className="text-xs text-gray-400 mb-1">{dayName}</div>
              <div className="font-medium">
                {date.getDate()} {date.toLocaleString('default', { month: 'short' })}
              </div>
            </button>
          );
        }
      }

      return (
        <div className="mb-6">
          <h3 className="text-sm text-gray-400 mb-3">Select a Date</h3>
          <div className="grid grid-cols-3 gap-2">
            {days}
          </div>
        </div>
      );
    };

    const renderTimeSlots = () => {
      if (!selectedDate || !expert) return null;

      const startTime = new Date(expert.startTimeSlot);
      const endTime = new Date(expert.endTimeSlot);
      
      // Generate time slots using utility function
      const timeSlots = generateTimeSlots(selectedDate, startTime, endTime, 30);
      
      if (timeSlots.length === 0) {
        return (
          <div>
            <h3 className="text-sm text-gray-400 mb-3">Available Time Slots</h3>
            <p className="text-gray-500 text-sm">No time slots available for this date.</p>
          </div>
        );
      }

      return (
        <div>
          <h3 className="text-sm text-gray-400 mb-3">Available Time Slots</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {timeSlots.map((timeString) => {
              // Check if this time slot is in the past for today
              const now = new Date();
              const slotDateTime = formatDateTime(selectedDate, timeString);
              const isPastSlot = slotDateTime <= now;
              
              return (
                <button
                  key={timeString}
                  disabled={isPastSlot}
                  className={`flex items-center justify-center p-3 rounded-lg border text-sm transition-colors ${
                    isPastSlot
                      ? "border-gray-600 bg-gray-800/20 text-gray-600 cursor-not-allowed"
                      : selectedTime === timeString
                      ? "border-blue-500/30 bg-blue-900/20 text-white"
                      : "border-purple-500/20 bg-purple-900/10 hover:bg-purple-900/20 text-gray-300"
                  }`}
                  onClick={() => !isPastSlot && setSelectedTime(timeString)}
                >
                  <Clock className={`h-4 w-4 mr-2 ${
                    isPastSlot
                      ? "text-gray-600"
                      : selectedTime === timeString
                      ? "text-blue-400"
                      : "text-purple-400"
                  }`} />
                  <span>{timeString}</span>
                </button>
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-purple-400 mb-8">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Experts
            </Link>
            <SolanaWalletButton />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20 sticky top-8">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="relative mb-4">
                      <img
                        src={expert.user.image || "/placeholder.svg"}
                        alt={expert.user.name}
                        className="w-32 h-32 rounded-full object-cover border-2 border-purple-500/30"
                      />
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full border border-yellow-500/30">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{expert.rating}</span>
                        <span className="text-xs text-gray-400 ml-1">({expert.reviewCount})</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold">{expert.user.name}</h2>
                    {/* <p className="text-purple-400 mb-3">{expert.role}</p> */}

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
                      <span className="font-medium">30 minutes</span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg border border-purple-500/20 bg-purple-900/10">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 text-purple-400 mr-2" />
                        <span>Session Price</span>
                      </div>
                      <span className="font-medium">{halfHourlyRate} SOL</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium mb-2">About {expert.user.name}</h3>
                    <p className="text-gray-400 text-sm">{expert.user.bio}</p>
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
                        value={discussionTopic}
                        onChange={(e) => setDiscussionTopic(e.target.value)}
                        className="w-full h-32 rounded-lg border border-purple-500/20 bg-black/60 text-white p-3 focus:border-purple-400 focus:ring focus:ring-purple-400/20 focus:outline-none"
                        placeholder="Describe what you'd like to learn or discuss in this session..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Your experience level</label>
                      <select 
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        className="w-full rounded-lg border border-purple-500/20 bg-black/60 text-white p-3 focus:border-purple-400 focus:ring focus:ring-purple-400/20 focus:outline-none"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
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
                      <span>{halfHourlyRate} SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Platform Fee</span>
                      <span>{platformFee} SOL</span>
                    </div>
                    <div className="border-t border-purple-500/20 pt-3 flex justify-between font-bold">
                      <span>Total</span>
                      <span>{total.toFixed(2)} SOL</span>
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

