import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/options"
import prisma from "@/lib/prisma"


export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { bookingId, amount, fromWalletAddress, toWalletAddress, transactionId } = (await request.json()).data
    
    // Validate required fields
    if (!bookingId || !amount || !fromWalletAddress || !toWalletAddress || !transactionId) {
      return NextResponse.json({ error: "Missing required payment fields" }, { status: 400 })
    }

    // Check if booking exists
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } })
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        bookingId,
        amount,
        currency: "SOL",
        fromWalletAddress,
        toWalletAddress,
        transactionId,
        paymentStatus: "completed", // Mark as completed since transaction was successful
      },
    })

    // Update booking status to confirmed
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "confirmed" },
    })

    return NextResponse.json({ 
      message: "Payment created successfully", 
      data: payment 
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

