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
    const now = new Date()

    // Get upcoming meetings for the user
    const upcomingMeetings = await prisma.booking.findMany({
      where: {
        userId,
        bookingDate: {
          gte: now // Only future meetings
        },
        status: {
          in: ["pending", "confirmed"]
        }
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
        bookingDate: "asc"
      },
      take: 5 // Limit to 5 upcoming meetings
    })

    // Transform the data to match the frontend interface
    const formattedMeetings = upcomingMeetings.map(meeting => ({
      id: meeting.id,
      expert: {
        name: meeting.expert.name,
        image: meeting.expert.image
      },
      bookingDate: meeting.bookingDate.toISOString(),
      bookingDuration: meeting.bookingDuration,
      durationUnit: meeting.durationUnit,
      status: meeting.status
    }))

    return NextResponse.json(formattedMeetings)
  } catch (error) {
    console.error("Dashboard meetings error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
