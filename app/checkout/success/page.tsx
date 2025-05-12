import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutSuccessPage() {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <Card className="mx-auto max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto my-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <Check className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Order Successful!</CardTitle>
          <CardDescription>
            Thank you for your order. Your order has been placed and is being processed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">Order Number</p>
            <p className="font-medium text-lg">{orderNumber}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            We have sent an order confirmation email to your email address with all the details.
          </p>
          <p className="text-sm text-muted-foreground">
            You can track your order status in the "My Orders" section of your account.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/account/orders">View My Orders</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
