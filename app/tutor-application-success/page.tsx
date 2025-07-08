import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function TutorApplicationSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl">Application Submitted!</CardTitle>
          <CardDescription>Thank you for applying to become a tutor on TutorMatch</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">We've received your application and our team will review it within 2-3 business days.</p>
          <p className="mb-4">
            You'll receive an email notification once your application has been reviewed. If approved, you'll be able to
            set up your profile and start accepting students.
          </p>
          <p className="text-sm text-muted-foreground">
            Application ID: <span className="font-mono">TM-{Math.floor(Math.random() * 10000)}</span>
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button asChild className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
          <div className="text-sm text-center">
            Have questions?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact Support
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
