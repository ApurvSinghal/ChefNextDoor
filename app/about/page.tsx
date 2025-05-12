import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#E25822]">
            About HomeFeast
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            HomeFeast was born out of a passion for authentic, home-cooked food and a desire to share the joy of
            traditional recipes with a wider community.
          </p>
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-[#E25822]">Our Story</h2>
            <p className="text-muted-foreground">
              Founded in 2020, HomeFeast started as a small family business delivering homemade tiffin boxes to working
              professionals in the neighborhood. What began as a humble operation from our home kitchen quickly grew as
              word spread about our delicious, home-style cooking.
            </p>
            <p className="text-muted-foreground">
              Today, we've expanded our menu to include a variety of regional cuisines, snacks, sweets, and beverages,
              all made with the same care and attention to detail as our original tiffin service.
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-[#E25822]">Our Mission</h2>
            <p className="text-muted-foreground">
              At HomeFeast, our mission is to bring the authentic taste of home-cooked food to your doorstep. We believe
              that good food is not just about taste, but also about nutrition, quality ingredients, and the love that
              goes into making it.
            </p>
            <p className="text-muted-foreground">
              We are committed to using fresh, locally-sourced ingredients whenever possible, and to preparing our food
              in small batches to ensure quality and freshness.
            </p>
          </div>
        </div>
        <div className="space-y-8">
          <div className="overflow-hidden rounded-lg">
            <div className="h-[300px] w-full relative">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Our kitchen"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border border-[#F0E6D9]">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-[#E25822]">500+</div>
                <p className="text-sm text-muted-foreground">Daily Orders</p>
              </CardContent>
            </Card>
            <Card className="border border-[#F0E6D9]">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-[#E25822]">50+</div>
                <p className="text-sm text-muted-foreground">Menu Items</p>
              </CardContent>
            </Card>
            <Card className="border border-[#F0E6D9]">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-[#E25822]">20+</div>
                <p className="text-sm text-muted-foreground">Skilled Cooks</p>
              </CardContent>
            </Card>
            <Card className="border border-[#F0E6D9]">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-[#E25822]">3</div>
                <p className="text-sm text-muted-foreground">Locations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#E25822]">Meet Our Team</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="text-center">
            <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-[#F0E6D9]">
              <Image
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="Team member"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 text-xl font-bold">Anita Sharma</h3>
            <p className="text-muted-foreground">Founder & Head Chef</p>
          </div>
          <div className="text-center">
            <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-[#F0E6D9]">
              <Image
                src="https://randomuser.me/api/portraits/men/42.jpg"
                alt="Team member"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 text-xl font-bold">Rajesh Patel</h3>
            <p className="text-muted-foreground">Operations Manager</p>
          </div>
          <div className="text-center">
            <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-[#F0E6D9]">
              <Image
                src="https://randomuser.me/api/portraits/women/33.jpg"
                alt="Team member"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 text-xl font-bold">Priya Desai</h3>
            <p className="text-muted-foreground">Customer Relations</p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#E25822]">Join Our Community</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          We're more than just a food delivery service - we're a community of food lovers. Join us and be a part of our
          journey.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-[#E25822] hover:bg-[#D14812]">
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-[#E25822] text-[#E25822]">
            <Link href="/products">Explore Our Menu</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
