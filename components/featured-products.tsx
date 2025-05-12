"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"

type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    // In a real app, this would fetch from your API
    const fetchProducts = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setProducts([
        {
          id: "1",
          name: "North Indian Thali",
          description: "Complete meal with roti, rice, dal, sabzi, and more",
          price: 199,
          image:
            "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          category: "tiffin-boxes",
        },
        {
          id: "2",
          name: "South Indian Combo",
          description: "Idli, dosa, vada with sambar and chutney",
          price: 149,
          image:
            "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          category: "tiffin-boxes",
        },
        {
          id: "3",
          name: "Samosa (4 pcs)",
          description: "Crispy pastry filled with spiced potatoes and peas",
          price: 80,
          image:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          category: "snacks",
        },
        {
          id: "4",
          name: "Gulab Jamun (6 pcs)",
          description: "Soft milk-solid dumplings soaked in sugar syrup",
          price: 120,
          image:
            "https://images.unsplash.com/photo-1589249125609-c683117f3aea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          category: "sweets",
        },
      ])
      setLoading(false)
    }

    fetchProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    })
  }

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
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-5 w-1/4" />
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden border border-[#F0E6D9] hover:shadow-lg transition-all">
          <Link href={`/products/${product.id}`}>
            <div className="aspect-square relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover food-image-hover"
              />
              <div className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 text-sm font-semibold text-[#E25822]">
                ₹{product.price}
              </div>
            </div>
          </Link>
          <CardContent className="p-4">
            <Link href={`/products/${product.id}`}>
              <h3 className="text-lg font-semibold hover:text-[#E25822] transition-colors">{product.name}</h3>
            </Link>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button onClick={() => handleAddToCart(product)} className="w-full bg-[#E25822] hover:bg-[#D14812]">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
