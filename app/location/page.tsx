import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Phone, Mail } from "lucide-react"

export default function LocationPage() {
  const locations = [
    {
      id: "1",
      name: "Main Kitchen & Outlet",
      address: "123 Main Street, City Center, Your City - 400001",
      phone: "+91 98765 43210",
      email: "main@homefeast.com",
      hours: "Mon-Sat: 8:00 AM - 9:00 PM\nSunday: 9:00 AM - 8:00 PM",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "2",
      name: "North City Branch",
      address: "45 North Avenue, Suburb Area, Your City - 400056",
      phone: "+91 98765 43211",
      email: "north@homefeast.com",
      hours: "Mon-Sat: 9:00 AM - 8:00 PM\nSunday: 10:00 AM - 7:00 PM",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "3",
      name: "South City Branch",
      address: "78 South Road, Downtown, Your City - 400036",
      phone: "+91 98765 43212",
      email: "south@homefeast.com",
      hours: "Mon-Sat: 9:00 AM - 8:00 PM\nSunday: 10:00 AM - 7:00 PM",
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-bold mb-6">Our Locations</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => (
          <Card key={location.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src={location.image || "/placeholder.svg"} alt={location.name} fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>{location.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <p>{location.address}</p>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <p className="whitespace-pre-line">{location.hours}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <p>{location.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <p>{location.email}</p>
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link
                  href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Map
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Delivery Areas</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Zones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Zone A (0-3 km)</span>
                  <span className="font-medium text-green-600">Free Delivery</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Zone B (3-7 km)</span>
                  <span className="font-medium">₹30 Delivery Fee</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Zone C (7-12 km)</span>
                  <span className="font-medium">₹50 Delivery Fee</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Beyond 12 km</span>
                  <span className="font-medium text-muted-foreground">Not Available</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                * Delivery fees may vary during peak hours or adverse weather conditions.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Delivery Timings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Breakfast Orders</span>
                  <span className="font-medium">7:00 AM - 10:30 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Lunch Orders</span>
                  <span className="font-medium">11:00 AM - 3:30 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Snacks Orders</span>
                  <span className="font-medium">4:00 PM - 6:30 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Dinner Orders</span>
                  <span className="font-medium">7:00 PM - 10:30 PM</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                * Pre-orders can be placed up to 24 hours in advance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          If you have any questions about our delivery areas or need assistance with your order, please don't hesitate
          to contact us.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}
