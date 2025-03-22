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
        const { userId, expertId, status, bookingDate, bookingDuration, durationUnit, priceAtBooking } = (await request.json()).data
        console.log("userId", userId, "expertId", expertId, "status", status, "bookingDate", bookingDate, "bookingDuration", bookingDuration, "durationUnit", durationUnit, "priceAtBooking", priceAtBooking)
        
        const userExists = await prisma.user.findUnique({ where: { id: userId } });
        const expertExists = await prisma.user.findUnique({ where: { id: expertId } });

        if (!userExists || !expertExists) {
            return NextResponse.json({ error: "User or Expert not found" }, { status: 404 });
        }

        const response = await prisma.booking.create({
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


        return NextResponse.json({ message: "Booking created successfully", data: response })
    } catch (error) {
        console.error("Profile update error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

