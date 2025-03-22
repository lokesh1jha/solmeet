import axios from "axios"

export async function createBooking(userId: string, expertId: string, status: string, bookingDate: Date, bookingDuration: number, durationUnit: string = "minutes", priceAtBooking: number) {
    try {
  const response = await axios.post("/api/booking", {
      data: {
        userId,
        expertId,
        status,
        bookingDate,
        bookingDuration,
        durationUnit,
        priceAtBooking,
      },
    })
    return response.data
    } catch (error) {
      console.error("Booking creation error:", error)
      return { error: "Internal server error" }
    }
  
  }
  
  export async function createPayment(bookingId: string, amount: number, fromWalletAddress: string, toWalletAddress: string, transactionId: string) {
    const response = await axios.post("/api/payment", {
      data: {
        bookingId,
        amount,
        fromWalletAddress,
        toWalletAddress,
        transactionId,
      },
    })
  
    return response.data
  }