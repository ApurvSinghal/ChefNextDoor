import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

export function Testimonials() {
  const testimonials = [
    {
      id: "1",
      name: "Priya Sharma",
      avatar: "https://randomuser.me/api/portraits/women/79.jpg",
      rating: 5,
      comment:
        "The tiffin service has been a lifesaver for me. The food is always fresh, tasty, and reminds me of home-cooked meals. Highly recommended!",
    },
    {
      id: "2",
      name: "Rahul Patel",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4,
      comment:
        "Great variety of snacks! My kids love the samosas and kachoris. The packaging is also very good, keeping the food fresh for longer.",
    },
    {
      id: "3",
      name: "Anita Desai",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      comment:
        "I've been ordering the weekly tiffin package for the past month, and I'm extremely satisfied. The menu changes regularly, and the quality is consistent.",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="overflow-hidden border border-[#F0E6D9] hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{testimonial.name}</h4>
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "fill-[#FFB800] text-[#FFB800]" : "text-muted"}`}
                      />
                    ))}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
