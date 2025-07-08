import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

export default function HelpCenterPage() {
  // Mock FAQ data
  const faqs = {
    general: [
      {
        question: "What is TutorMatch?",
        answer: "TutorMatch is an online platform that connects students with qualified tutors across various subjects. Our matching algorithm helps students find tutors who best fit their learning style, academic needs, and schedule."
      },
      {
        question: "How do I sign up for TutorMatch?",
        answer: "To sign up for TutorMatch, click the 'Sign Up' button in the top right corner of the homepage. You can create an account using your email address or sign up with Google or Facebook."
      },
      {
        question: "Is TutorMatch free to use?",
        answer: "TutorMatch is free to join and browse tutors. However, tutoring sessions are paid services with rates set by individual tutors. TutorMatch charges a small service fee on each transaction to maintain the platform."
      },
      {
        question: "What subjects are available on TutorMatch?",
        answer: "TutorMatch offers tutoring in a wide range of subjects including mathematics, sciences, languages, humanities, test preparation, and more. You can browse our full list of subjects on the 'Find Tutors' page."
      },
      {
        question: "Can I use TutorMatch on my mobile device?",
        answer: "Yes, TutorMatch is fully responsive and works on all devices including smartphones and tablets. We also offer a mobile app for iOS and Android for an optimized mobile experience."
      }
    ],
    students: [
      {
        question: "How do I find a tutor on TutorMatch?",
        answer: "To find a tutor, go to the 'Find Tutors' page and use the filters to narrow down tutors by subject, price range, availability, and more. You can also use the search function to find tutors with specific expertise."
      },
      {
        question: "How do I schedule a session with a tutor?",
        answer: "Once you've found a tutor you'd like to work with, you can view their availability calendar and book a session directly. You'll receive a confirmation email with session details and instructions for connecting with your tutor."
      },
      {
        question: "What if I'm not satisfied with my tutor?",
        answer: "If you're not satisfied with your tutoring experience, you can provide feedback through our rating system. If there are significant issues, please contact our support team, and we'll work to resolve the situation or help you find a more suitable tutor."
      },
      {
        question: "How do payments work?",
        answer: "Payments are processed securely through our platform. You'll be charged after booking a session, and funds are held until the session is completed. This ensures protection for both students and tutors."
      },
      {
        question: "Can I cancel a scheduled session?",
        answer: "Yes, you can cancel a session through your dashboard. Our cancellation policy varies depending on how far in advance you cancel. Please refer to our Terms of Service for specific details on refunds for cancellations."
      }
    ],
    tutors: [
      {
        question: "How do I become a tutor on TutorMatch?",
        answer: "To become a tutor, click on 'Become a Tutor' and complete the application process. You'll need to provide information about your qualifications, teaching experience, and the subjects you can teach. Our team will review your application and get back to you."
      },
      {
        question: "How much can I earn as a tutor?",
        answer: "Tutors set their own rates on TutorMatch. Your earning potential depends on your qualifications, experience, and the demand for your subject area. Top tutors on our platform can earn a substantial income through regular sessions with multiple students."
      },
      {
        question: "How do I get paid?",
        answer: "Tutors receive payments through our secure payment system. After completing a session, the funds will be released to your account. You can then withdraw your earnings to your bank account or other payment methods we support."
      },
      {
        question: "Can I set my own schedule?",
        answer: "Yes, tutors have complete control over their availability. You can set your schedule through your tutor dashboard, indicating which days and times you're available for sessions."
      },
      {
        question: "What tools are available for online tutoring?",
        answer: "TutorMatch provides an integrated virtual classroom with video conferencing, interactive whiteboard, screen sharing, and document sharing capabilities. These tools are designed to create an effective online learning environment."
      }
    ]
  }

  // Mock help categories
  const helpCategories = [
    {
      title: "Getting Started",
      description: "Learn the basics of using TutorMatch",
      icon: "🚀",
    },
    {
      title: "Account Management",
      description: "Manage your profile and settings",
      icon: "👤",
    },
    {
      title: "Finding Tutors",
      description: "Search and connect with tutors",
      icon: "🔍",
    },
    {
      title: "Scheduling Sessions",
      description: "Book and manage tutoring sessions",
      icon: "📅",
    },
    {
      title: "Payments & Billing",
      description: "Understand payment processes",
      icon: "💳",
    },
    {
      title: "Technical Support",
      description: "Resolve technical issues",
      icon: "🔧",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Help Center</h1>
        
        <div className="relative mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search for help..." 
            className="pl-10 py-6 text-lg"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {helpCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <div className="text-3xl mb-2">{category.icon}</div>
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{category.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          
          <Tabs defaultValue="general">
            <TabsList className="mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="students">For Students</TabsTrigger>
              <TabsTrigger value="tutors">For Tutors</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Accordion type="single" collapsible className="w-full">
                {faqs.general.map((faq, index) => (
                  <AccordionItem key={index} value={`general-${index}`}>
                    <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="students">
              <Accordion type="single" collapsible className="w-full">
                {faqs.students.map((faq, index) => (
                  <AccordionItem key={index} value={`students-${index}`}>
                    <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="tutors">
              <Accordion type="single" collapsible className="w-full">
                {faqs.tutors.map((faq, index) => (
                  <AccordionItem key={index} value={`tutors-${index}`}>
                    <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="bg-primary/5 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
          <p className="mb-6">
            Our support team is here to assist you with any questions or issues you may have.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button>Contact Support</Button>
            <Button variant="outline">Submit a Ticket</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
