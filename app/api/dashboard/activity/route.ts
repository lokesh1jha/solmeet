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
    const activities = []

    // Get recent bookings
    const recentBookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        expert: {
          select: { name: true }
        }
      },
      orderBy: { bookingDate: "desc" },
      take: 3
    })

    // Get recent payments
    const recentPayments = await prisma.payment.findMany({
      where: {
        booking: { userId }
      },
      include: {
        booking: {
          include: {
            expert: {
              select: { name: true }
            }
          }
        }
      },
      orderBy: { id: "desc" },
      take: 3
    })

    // Add booking activities
    recentBookings.forEach(booking => {
      activities.push({
        id: `booking-${booking.id}`,
        type: 'booking',
        description: `Booked session with ${booking.expert.name}`,
        createdAt: booking.bookingDate.toISOString()
      })
    })

    // Add payment activities
    recentPayments.forEach(payment => {
      activities.push({
        id: `payment-${payment.id}`,
        type: 'payment',
        description: `Payment to ${payment.booking.expert.name}`,
        amount: `${payment.amount} SOL`,
        createdAt: payment.booking.bookingDate.toISOString()
      })
    })

    // Sort by date and limit to 6 most recent
    const sortedActivities = activities
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6)

    return NextResponse.json(sortedActivities)
  } catch (error) {
    console.error("Dashboard activity error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
