import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = new URL(request.url)
  console.log('middleware', pathname, token)

  if (token) {
    if (pathname.startsWith('/register') || pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  } else {
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/booking')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

// Matching paths for middleware
export const config = {
  matcher: ['/dashboard/:path*', '/booking/:path*', '/register', '/login'],
}