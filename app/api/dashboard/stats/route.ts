import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/options"
import prisma from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const userId = session.user.id

    // Get total completed bookings for this user
    const totalBookings = await prisma.booking.count({
      where: {
        userId,
        status: "confirmed"
      }
    })

    // Calculate total hours spent (assuming 30-minute sessions by default)
    const bookingsWithDuration = await prisma.booking.findMany({
      where: {
        userId,
        status: "confirmed"
      },
      select: {
        bookingDuration: true,
        durationUnit: true
      }
    })

    const totalMinutes = bookingsWithDuration.reduce((total, booking) => {
      if (booking.durationUnit === "hours") {
        return total + (booking.bookingDuration * 60)
      }
      return total + booking.bookingDuration
    }, 0)

    const hoursSpent = totalMinutes / 60

    // Get unique experts the user has booked with
    const expertsMet = await prisma.booking.findMany({
      where: {
        userId,
        status: "confirmed"
      },
      select: {
        expertId: true
      },
      distinct: ['expertId']
    })

    // Calculate total amount spent
    const payments = await prisma.payment.findMany({
      where: {
        booking: {
          userId
        },
        paymentStatus: "completed"
      },
      select: {
        amount: true
      }
    })

    const totalSpent = payments.reduce((total, payment) => total + payment.amount, 0)

    return NextResponse.json({
      totalSessions: totalBookings,
      hoursSpent: Math.round(hoursSpent * 10) / 10, // Round to 1 decimal
      expertsMetCount: expertsMet.length,
      totalSpent: Math.round(totalSpent * 100) / 100 // Round to 2 decimals
    })
  } catch (error) {
    console.error("Dashboard stats error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
