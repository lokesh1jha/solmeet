import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/options"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || session.user.id

    // Get payments for the user
    const payments = await prisma.payment.findMany({
      where: {
        booking: {
          userId: userId
        }
      },
      include: {
        booking: {
          include: {
            expert: {
              select: {
                name: true,
                image: true
              }
            }
          }
        }
      },
      orderBy: {
        id: "desc"
      }
    })

    // Get bookings for sessions data
    const bookings = await prisma.booking.findMany({
      where: {
        userId: userId,
        status: "confirmed"
      },
      include: {
        expert: {
          select: {
            name: true,
            image: true
          }
        },
        payment: true
      },
      orderBy: {
        bookingDate: "desc"
      }
    })

    // Calculate summary stats
    const totalSpent = payments.reduce((sum, payment) => sum + payment.amount, 0)
    const totalSessions = bookings.length
    const totalHours = bookings.reduce((sum, booking) => {
      if (booking.durationUnit === 'hours') {
        return sum + booking.bookingDuration
      }
      return sum + (booking.bookingDuration / 60)
    }, 0)

    // Format payment history
    const formattedPayments = payments.map(payment => ({
      id: payment.id,
      bookingId: payment.bookingId,
      transactionId: payment.transactionId,
      amount: payment.amount,
      currency: payment.currency,
      paymentStatus: payment.paymentStatus,
      description: `Payment to ${payment.booking.expert.name}`,
      date: payment.booking.bookingDate.toISOString(),
      expert: {
        name: payment.booking.expert.name,
        image: payment.booking.expert.image
      }
    }))

    // Format session history
    const formattedSessions = bookings.map(booking => ({
      id: booking.id,
      expertName: booking.expert.name,
      expertImage: booking.expert.image,
      date: booking.bookingDate.toISOString(),
      duration: booking.bookingDuration,
      durationUnit: booking.durationUnit,
      status: booking.status,
      amount: booking.payment?.amount || booking.priceAtBooking
    }))

    return NextResponse.json({
      summary: {
        totalSpent: Math.round(totalSpent * 100) / 100,
        totalSessions,
        totalHours: Math.round(totalHours * 10) / 10
      },
      payments: formattedPayments,
      sessions: formattedSessions
    })
  } catch (error) {
    console.error("Payments fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
