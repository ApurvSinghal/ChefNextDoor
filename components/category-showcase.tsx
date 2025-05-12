"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type Category = {
  id: string
  name: string
  description: string
  image: string
  slug: string
}

export function CategoryShowcase() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from your API
    const fetchCategories = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setCategories([
        {
          id: "1",
          name: "Tiffin Boxes",
          description: "Complete meals packed with nutrition and flavor",
          image:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          slug: "tiffin-boxes",
        },
        {
          id: "2",
          name: "Snacks",
          description: "Delicious treats for any time of day",
          image:
            "https://images.unsplash.com/photo-1601050690117-94f5f7a16db3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          slug: "snacks",
        },
        {
          id: "3",
          name: "Sweets",
          description: "Traditional and modern desserts to satisfy your cravings",
          image:
            "https://images.unsplash.com/photo-1605197161470-5d2a9af0c3a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          slug: "sweets",
        },
        {
          id: "4",
          name: "Beverages",
          description: "Refreshing drinks to complement your meal",
          image:
            "https://images.unsplash.com/photo-1544252890-c3e4f4790666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          slug: "beverages",
        },
      ])
      setLoading(false)
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {categories.map((category) => (
        <Link key={category.id} href={`/products/category/${category.slug}`}>
          <Card className="overflow-hidden transition-all hover:shadow-lg border border-[#F0E6D9]">
            <div className="aspect-square relative">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover food-image-hover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-xl font-bold">{category.name}</h3>
                </div>
              </div>
            </div>
            <CardContent className="p-4 bg-white">
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
