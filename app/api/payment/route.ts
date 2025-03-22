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
    const { signature, name, walletAddress, bio, expertProfile } = (await request.json()).data
//     bookingId String @unique
//   amount    Float
//   currency  String @default("SOL") // Default to Solana
//   fromWalletAddress String
//   toWalletAddress String
//   transactionId String @unique
//   paymentStatus String @default("pending") // pending, completed, failed

    return NextResponse.json({ message: "Profile updated successfully" })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

