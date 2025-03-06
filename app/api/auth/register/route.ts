import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { name, password, email } = await request.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // generate unique username
    const username = name.toLowerCase().replace(/\s/g, "-")
    
    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        password: hashedPassword,
        email,
      },
    })

    return NextResponse.json({ message: "User registered successfully", userId: newUser.id }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

