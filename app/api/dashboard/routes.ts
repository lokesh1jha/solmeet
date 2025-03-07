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
                id: true,
                name: true,
                email: true,
                walletAddress: true,
                bookings: {
                    select: {
                        id: true,
                        bookingDate: true,
                        bookingDuration: true,
                        payment: {
                            select: {
                                amount: true,
                            },
                        },
                    },
                },
                reviewsReceived: {
                    select: {
                        rating: true,
                    },
                },
            },
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        let totalReviews = 0
        let avgRating = 0
        if (user && user.reviewsReceived) {
            totalReviews = user.reviewsReceived.length
            avgRating = totalReviews > 0
                ? user.reviewsReceived.reduce((sum, review) => sum + review.rating, 0) / totalReviews
                : 0
        }

        let totalEarnings = 0
        if (user && user.bookings && user.bookings.length > 0) {
            totalEarnings = user.bookings.reduce((sum, booking) => sum + (booking.payment ? booking.payment.amount : 0), 0)
        }

        const dashboardData = {
            ...user,
            totalReviews,
            avgRating,
            totalEarnings,
        }


        return NextResponse.json(dashboardData)
    } catch (error) {
        console.error("Dashboard fetch error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
