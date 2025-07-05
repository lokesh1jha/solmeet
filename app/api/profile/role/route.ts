import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/options"
import prisma from "@/lib/prisma"

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { role } = await request.json()
    
    if (!role || !["user", "expert"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { role },
    })

    return NextResponse.json({ 
      message: "Role updated successfully", 
      role: updatedUser.role 
    })
  } catch (error) {
    console.error("Role update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
