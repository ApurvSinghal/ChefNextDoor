import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Check if Supabase environment variables are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If environment variables are missing, skip authentication check
  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase environment variables are missing. Skipping authentication check.")
    return res
  }

  try {
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Check if the user is trying to access protected routes
    const isProtectedRoute =
      req.nextUrl.pathname.startsWith("/account") &&
      !req.nextUrl.pathname.startsWith("/account/login") &&
      !req.nextUrl.pathname.startsWith("/account/register")

    // If accessing a protected route without being logged in, redirect to login
    if (isProtectedRoute && !session) {
      const redirectUrl = new URL("/auth/login", req.url)
      redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    return res
  } catch (error) {
    console.error("Middleware error:", error)
    // Continue without blocking the request in case of errors
    return res
  }
}

export const config = {
  matcher: ["/account/:path*"],
}
