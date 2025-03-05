import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import nextAuthMiddleware from 'next-auth/middleware'
import { getToken } from "next-auth/jwt"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.SECRET })
  const url = request.url

  if (token && url.startsWith('/signup') || url.startsWith('/loginin')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard'],
}