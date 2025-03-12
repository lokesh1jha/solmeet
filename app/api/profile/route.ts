import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/options"
import prisma from "@/lib/prisma"


export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        username: true,
        email: true,
        walletAddress: true,
        createdAt: true,
        expertise: true
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    console.log("backend data ", user)
    return NextResponse.json(user)
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { name, bio, walletAddress, expertise } = (await request.json()).data

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        walletAddress,
        bio,
      },
    })

    // Check if an ExpertProfile exists
    const existingExpertProfile = await prisma.expertProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (existingExpertProfile) {
      // Update existing ExpertProfile
      await prisma.expertProfile.update({
        where: { userId: session.user.id },
        data: {
          tags: expertise.tags,
          availableWeekDays: expertise.availableWeekDays,
          startTimeSlot: expertise.startTimeSlot,
          endTimeSlot: expertise.endTimeSlot,
          hourlyRate: expertise.hourlyRate,
        },
      });
    } else {
      // Create new ExpertProfile
      await prisma.expertProfile.create({
        data: {
          userId: session.user.id,
          tags: expertise.tags,
          availableWeekDays: expertise.availableWeekDays,
          startTimeSlot: expertise.startTimeSlot,
          endTimeSlot: expertise.endTimeSlot,
          hourlyRate: expertise.hourlyRate,
        },
      });
    }

    console.log("backed post call", updatedUser)
    return NextResponse.json({ message: "Profile updated successfully" })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

