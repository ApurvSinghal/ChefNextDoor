"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MinusCircle, PlusCircle, ShoppingCart, Heart, Share2 } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"

type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  details?: {
    ingredients?: string[]
    nutritionalInfo?: {
      calories?: number
      protein?: number
      carbs?: number
      fat?: number
    }
    allergens?: string[]
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`)
        const data = await response.json()
        setProduct(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching product:", error)
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleAddToCart = () => {
    if (!product) return

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    })

    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
      duration: 3000,
    })
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  if (loading) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-6">The product you are looking for does not exist or has been removed.</p>
        <Button asChild className="bg-[#E25822] hover:bg-[#D14812]">
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden rounded-lg border border-[#F0E6D9]">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-[#E25822]">{product.name}</h1>
            <p className="text-2xl font-semibold mt-2">₹{product.price}</p>
          </div>
          <p className="text-muted-foreground">{product.description}</p>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              className="border-[#F0E6D9] hover:bg-[#FFF8F0] hover:text-[#E25822]"
            >
              <MinusCircle className="h-4 w-4" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="text-xl font-medium w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={increaseQuantity}
              className="border-[#F0E6D9] hover:bg-[#FFF8F0] hover:text-[#E25822]"
            >
              <PlusCircle className="h-4 w-4" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1 bg-[#E25822] hover:bg-[#D14812]" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="flex-1 border-[#F0E6D9] text-[#E25822] hover:bg-[#FFF8F0]">
              <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
            </Button>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-[#F0E6D9]">
            <Button variant="ghost" size="sm" className="text-[#E25822] hover:bg-[#FFF8F0]">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full sm:w-auto bg-[#FFF8F0] border border-[#F0E6D9]">
            <TabsTrigger
              value="description"
              className="data-[state=active]:bg-[#E25822] data-[state=active]:text-white"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="ingredients"
              className="data-[state=active]:bg-[#E25822] data-[state=active]:text-white"
            >
              Ingredients
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="data-[state=active]:bg-[#E25822] data-[state=active]:text-white">
              Nutrition
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-[#E25822] data-[state=active]:text-white">
              Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <Card className="border border-[#F0E6D9]">
              <CardContent className="pt-6">
                <p>{product.description}</p>
                <p className="mt-4">
                  Our North Indian Thali is prepared fresh daily using authentic recipes and high-quality ingredients.
                  Each thali comes with a balanced selection of items to give you a complete meal experience.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ingredients" className="mt-4">
            <Card className="border border-[#F0E6D9]">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2 text-[#E25822]">Ingredients</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {product.details?.ingredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2 text-[#E25822]">Allergens</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.details?.allergens?.map((allergen, index) => (
                      <span key={index} className="px-3 py-1 bg-[#FFF8F0] border border-[#F0E6D9] rounded-full text-sm">
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="nutrition" className="mt-4">
            <Card className="border border-[#F0E6D9]">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4 text-[#E25822]">Nutritional Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 border border-[#F0E6D9] rounded-lg text-center bg-[#FFF8F0]">
                    <p className="text-muted-foreground text-sm">Calories</p>
                    <p className="text-2xl font-bold text-[#E25822]">{product.details?.nutritionalInfo?.calories}</p>
                    <p className="text-muted-foreground text-xs">kcal</p>
                  </div>
                  <div className="p-4 border border-[#F0E6D9] rounded-lg text-center bg-[#FFF8F0]">
                    <p className="text-muted-foreground text-sm">Protein</p>
                    <p className="text-2xl font-bold text-[#E25822]">{product.details?.nutritionalInfo?.protein}</p>
                    <p className="text-muted-foreground text-xs">g</p>
                  </div>
                  <div className="p-4 border border-[#F0E6D9] rounded-lg text-center bg-[#FFF8F0]">
                    <p className="text-muted-foreground text-sm">Carbs</p>
                    <p className="text-2xl font-bold text-[#E25822]">{product.details?.nutritionalInfo?.carbs}</p>
                    <p className="text-muted-foreground text-xs">g</p>
                  </div>
                  <div className="p-4 border border-[#F0E6D9] rounded-lg text-center bg-[#FFF8F0]">
                    <p className="text-muted-foreground text-sm">Fat</p>
                    <p className="text-2xl font-bold text-[#E25822]">{product.details?.nutritionalInfo?.fat}</p>
                    <p className="text-muted-foreground text-xs">g</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  * Nutritional values are approximate and may vary based on exact ingredients used.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <Card className="border border-[#F0E6D9]">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4 text-[#E25822]">Customer Reviews</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-[#F0E6D9] rounded-lg bg-[#FFF8F0]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="font-medium">Rahul S.</div>
                      <div className="text-muted-foreground text-sm">Verified Purchase</div>
                    </div>
                    <div className="flex mb-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className="h-4 w-4 fill-[#FFB800]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                    </div>
                    <p>
                      Absolutely delicious! The thali had a great variety and everything tasted fresh. Portion size was
                      perfect for one person.
                    </p>
                  </div>
                  <div className="p-4 border border-[#F0E6D9] rounded-lg bg-[#FFF8F0]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="font-medium">Priya M.</div>
                      <div className="text-muted-foreground text-sm">Verified Purchase</div>
                    </div>
                    <div className="flex mb-2">
                      {Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className="h-4 w-4 fill-[#FFB800]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      {Array(1)
                        .fill(0)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className="h-4 w-4 text-muted-foreground"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                    </div>
                    <p>
                      Good food and value for money. The dal was a bit too spicy for my taste, but everything else was
                      perfect.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
