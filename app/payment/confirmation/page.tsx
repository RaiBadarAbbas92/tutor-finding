import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function PaymentConfirmationPage() {
  // Mock session data
  const sessionData = {
    id: "session-123456",
    tutor: {
      id: "tutor-1",
      name: "Dr. Sarah Johnson",
      subject: "Mathematics",
    },
    date: "Saturday, May 20, 2023",
    time: "4:00 PM - 5:00 PM",
    total: 78.75,
  }

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>Your tutoring session has been booked</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Session ID:</span>
              <span className="font-mono">{sessionData.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tutor:</span>
              <span>{sessionData.tutor.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subject:</span>
              <span>{sessionData.tutor.subject}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span>{sessionData.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span>{sessionData.time}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total Paid:</span>
              <span>${sessionData.total.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-center text-sm">
            A confirmation email has been sent to your registered email address with all the session details.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button asChild className="w-full">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <div className="text-sm text-center">
            Need to make changes?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact Support
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
