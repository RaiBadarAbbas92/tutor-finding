import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        
        <p className="text-xl text-muted-foreground mb-12">
          We're here to help! Reach out to our team with any questions, feedback, or concerns.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Mail className="h-5 w-5 text-primary" />
                <CardTitle>Email Us</CardTitle>
              </div>
              <CardDescription>
                For general inquiries and support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium">support@tutormatch.com</p>
              <p className="text-sm text-muted-foreground mt-1">We typically respond within 24 hours</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Phone className="h-5 w-5 text-primary" />
                <CardTitle>Call Us</CardTitle>
              </div>
              <CardDescription>
                For urgent matters and direct assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium">+1 (555) 123-4567</p>
              <p className="text-sm text-muted-foreground mt-1">Monday-Friday, 9am-5pm EST</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-5 w-5 text-primary" />
                <CardTitle>Visit Us</CardTitle>
              </div>
              <CardDescription>
                Our headquarters location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium">123 Education Lane</p>
              <p className="text-sm text-muted-foreground">Suite 400</p>
              <p className="text-sm text-muted-foreground">Boston, MA 02110</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="support">Technical Support</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help you?" rows={6} />
              </div>
              
              <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">How quickly will I receive a response?</h3>
                <p className="text-muted-foreground">
                  We strive to respond to all inquiries within 24 hours during business days. For urgent matters, 
                  please call our support line.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">I'm having technical issues with the platform. What should I do?</h3>
                <p className="text-muted-foreground">
                  For technical support, please select "Technical Support" in the subject dropdown and provide details 
                  about the issue you're experiencing. Screenshots or error messages are helpful.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">How do I report a problem with a tutor or student?</h3>
                <p className="text-muted-foreground">
                  To report concerns about a user, please select "Support" in the subject dropdown and provide details 
                  about the situation. Our Trust & Safety team will investigate.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">I have a suggestion for improving TutorMatch. How can I share it?</h3>
                <p className="text-muted-foreground">
                  We love hearing from our users! Select "Feedback" in the subject dropdown and share your ideas. 
                  We review all suggestions for future platform improvements.
                </p>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="w-full">View All FAQs</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-primary/5 p-8 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Clock className="h-10 w-10 text-primary" />
              <div>
                <h3 className="text-lg font-medium">Business Hours</h3>
                <p className="text-muted-foreground">Monday-Friday: 9am-5pm EST</p>
                <p className="text-muted-foreground">Saturday: 10am-2pm EST</p>
                <p className="text-muted-foreground">Sunday: Closed</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Connect With Us</h3>
              <div className="flex gap-4">
                <Button variant="outline" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Button>
                <Button variant="outline" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Button>
                <Button variant="outline" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Button>
                <Button variant="outline" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
