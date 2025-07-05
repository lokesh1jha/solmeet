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
        
        // Validate required fields
        if (!userId || !expertId || !status || !bookingDate || !bookingDuration || !priceAtBooking) {
            return NextResponse.json({ error: "Missing required booking fields" }, { status: 400 })
        }
        
        // Validate booking date is in the future
        const bookingDateTime = new Date(bookingDate)
        if (bookingDateTime <= new Date()) {
            return NextResponse.json({ error: "Booking date must be in the future" }, { status: 400 })
        }
        
        console.log("userId", userId, "expertId", expertId, "status", status, "bookingDate", bookingDate, "bookingDuration", bookingDuration, "durationUnit", durationUnit, "priceAtBooking", priceAtBooking)
        
        const userExists = await prisma.user.findUnique({ where: { id: userId } });
        const expertExists = await prisma.user.findUnique({ 
            where: { id: expertId },
            include: { expertProfile: true }
        });

        if (!userExists || !expertExists || !expertExists.expertProfile) {
            return NextResponse.json({ error: "User or Expert not found" }, { status: 404 });
        }
        
        // Check for conflicting bookings
        const conflictingBooking = await prisma.booking.findFirst({
            where: {
                expertId,
                bookingDate: bookingDateTime,
                status: { in: ["pending", "confirmed"] }
            }
        })
        
        if (conflictingBooking) {
            return NextResponse.json({ error: "This time slot is already booked" }, { status: 409 })
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

        return NextResponse.json({ 
            message: "Booking created successfully", 
            data: response,
            bookingId: response.id 
        })
    } catch (error) {
        console.error("Profile update error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

