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
        expertProfile: true,
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
    const { name, walletAddress, bio, expertProfile } = (await request.json()).data



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
          tags: expertProfile.tags,
          availableWeekDays: expertProfile.availableWeekDays,
          startTimeSlot: expertProfile.startTimeSlot,
          endTimeSlot: expertProfile.endTimeSlot,
          hourlyRate: expertProfile.hourlyRate,
        },
      });
    } else {
      // Create new ExpertProfile
      await prisma.expertProfile.create({
        data: {
          userId: session.user.id,
          tags: expertProfile.tags,
          availableWeekDays: expertProfile.availableWeekDays,
          startTimeSlot: expertProfile.startTimeSlot,
          endTimeSlot: expertProfile.endTimeSlot,
          hourlyRate: expertProfile.hourlyRate,
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

