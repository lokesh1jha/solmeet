import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../auth/[...nextauth]/options"
import prisma from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const userId = session.user.id

    // Get all meetings for the user (both upcoming and past)
    const allMeetings = await prisma.booking.findMany({
      where: {
        userId
      },
      include: {
        expert: {
          select: {
            name: true,
            image: true
          }
        }
      },
      orderBy: {
        bookingDate: "desc" // Most recent first
      }
    })

    // Transform the data to match the frontend interface
    const formattedMeetings = allMeetings.map(meeting => ({
      id: meeting.id,
      expert: {
        name: meeting.expert.name,
        image: meeting.expert.image
      },
      bookingDate: meeting.bookingDate.toISOString(),
      bookingDuration: meeting.bookingDuration,
      durationUnit: meeting.durationUnit,
      status: meeting.status,
      priceAtBooking: meeting.priceAtBooking
    }))

    return NextResponse.json(formattedMeetings)
  } catch (error) {
    console.error("All meetings fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
