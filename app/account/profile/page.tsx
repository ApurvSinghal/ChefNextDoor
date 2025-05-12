"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Loader2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

type UserProfile = {
  username: string
  created_at: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabase = createClientComponentClient()

        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (error) {
          console.error("Auth error:", error)
          toast({
            title: "Authentication error",
            description: "Please try logging in again.",
            variant: "destructive",
          })
          router.push("/auth/login")
          return
        }

        if (!user) {
          router.push("/auth/login")
          return
        }

        setProfile({
          username: user.user_metadata?.username || "User",
          created_at: new Date(user.created_at).toLocaleDateString(),
        })
      } catch (error) {
        console.error("Error fetching profile:", error)
        toast({
          title: "Error",
          description: "Failed to load profile information.",
          variant: "destructive",
        })
        router.push("/auth/login")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router, toast])

  const handleLogout = async () => {
    try {
      const supabase = createClientComponentClient()
      await supabase.auth.signOut()

      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Error",
        description: "There was a problem logging out.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#E25822]" />
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <Card className="mx-auto max-w-md w-full border border-[#F0E6D9]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-[#E25822]">Your Profile</CardTitle>
          <CardDescription>View and manage your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-[#FFF8F0] border border-[#F0E6D9] flex items-center justify-center">
              <User className="h-12 w-12 text-[#E25822]" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Username</p>
              <p className="font-medium text-lg">{profile?.username}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="font-medium">{profile?.created_at}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            asChild
            className="w-full bg-[#E25822] hover:bg-[#D14812]"
            onClick={() => router.push("/account/orders")}
          >
            View My Orders
          </Button>
          <Button
            variant="outline"
            className="w-full border-[#F0E6D9] hover:bg-[#FFF8F0] text-[#E25822]"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
