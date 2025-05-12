import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden bg-[#FFF8F0]">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#E25822]">
                Homemade Goodness Delivered to Your Door
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Delicious tiffin boxes, snacks, and more made with love and care. Fresh, healthy, and tasty food for
                your everyday needs.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-[#E25822] hover:bg-[#D14812]">
                <Link href="/products">Explore Our Menu</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-[#E25822] text-[#E25822]">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[400px] w-full md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1567337710282-00832b415979?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Delicious Indian thali with variety of dishes"
                fill
                className="object-cover rounded-xl food-image-hover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#E25822]/80 to-transparent rounded-xl flex items-center">
                <div className="text-white p-6 md:p-10 max-w-md">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Special Offer</h2>
                  <p className="text-lg md:text-xl mb-6">Get 15% off on your first order!</p>
                  <Button asChild variant="secondary" size="lg" className="bg-white text-[#E25822] hover:bg-gray-100">
                    <Link href="/products">Order Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
