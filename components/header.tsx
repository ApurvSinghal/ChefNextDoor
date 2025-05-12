"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Menu, ShoppingCart, User, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/components/cart-provider"
import { ModeToggle } from "@/components/mode-toggle"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [authEnabled, setAuthEnabled] = useState(false)
  const pathname = usePathname()
  const { items } = useCart()

  useEffect(() => {
    // Check if Supabase environment variables are available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase environment variables are missing. Authentication features will be disabled.")
      setAuthEnabled(false)
      return
    }

    setAuthEnabled(true)

    const checkUser = async () => {
      try {
        const supabase = createClientComponentClient()
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (error) {
          console.error("Supabase auth error:", error)
          setAuthEnabled(false)
          return
        }

        if (user) {
          setIsLoggedIn(true)
          setUsername(user.user_metadata?.username || "User")
        } else {
          setIsLoggedIn(false)
          setUsername("")
        }
      } catch (error) {
        console.error("Failed to check user:", error)
        setAuthEnabled(false)
      }
    }

    if (authEnabled) {
      checkUser()
    }
  }, [])

  const routes = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/location", label: "Location" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#F0E6D9] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden border-[#F0E6D9]">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px] border-r border-[#F0E6D9]">
              <nav className="flex flex-col gap-4 mt-8">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`text-lg font-medium transition-colors hover:text-[#E25822] ${
                      pathname === route.href ? "text-[#E25822]" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
                {authEnabled && (
                  <Link
                    href={isLoggedIn ? "/account/profile" : "/auth/login"}
                    className="text-lg font-medium transition-colors hover:text-[#E25822] text-muted-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    {isLoggedIn ? "My Profile" : "Login"}
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl md:text-2xl text-[#E25822]">HomeFeast</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors hover:text-[#E25822] ${
                pathname === route.href ? "text-[#E25822]" : "text-muted-foreground"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link href="/cart">
            <Button
              variant="outline"
              size="icon"
              className="relative border-[#F0E6D9] hover:text-[#E25822] hover:border-[#E25822]"
            >
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#E25822] text-xs text-white flex items-center justify-center">
                  {items.length}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          {authEnabled && (
            <Link href={isLoggedIn ? "/account/profile" : "/auth/login"}>
              <Button
                variant="outline"
                size="icon"
                className="border-[#F0E6D9] hover:text-[#E25822] hover:border-[#E25822]"
                title={isLoggedIn ? `Profile: ${username}` : "Login"}
              >
                {isLoggedIn ? <User className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
                <span className="sr-only">{isLoggedIn ? "Profile" : "Login"}</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
