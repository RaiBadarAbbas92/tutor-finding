import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SafetyPage() {
  // Safety resources
  const safetyResources = [
    {
      title: "Identity Verification",
      description: "Learn about our verification process for tutors and students.",
      icon: "🔐",
      link: "#identity-verification",
    },
    {
      title: "Safe Communication",
      description: "Best practices for communicating on our platform.",
      icon: "💬",
      link: "#safe-communication",
    },
    {
      title: "Privacy Protection",
      description: "How we protect your personal information.",
      icon: "🛡️",
      link: "#privacy-protection",
    },
    {
      title: "Payment Security",
      description: "Understanding our secure payment system.",
      icon: "💳",
      link: "#payment-security",
    },
    {
      title: "Reporting Issues",
      description: "How to report safety concerns or inappropriate behavior.",
      icon: "🚨",
      link: "#reporting-issues",
    },
    {
      title: "Safety for Minors",
      description: "Special protections for users under 18.",
      icon: "👪",
      link: "#safety-for-minors",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Safety Center</h1>
        
        <p className="text-xl text-muted-foreground mb-12">
          At TutorMatch, your safety is our top priority. We've implemented comprehensive measures 
          to ensure a secure environment for all users.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {safetyResources.map((resource, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="text-3xl mb-2">{resource.icon}</div>
                <CardTitle>{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{resource.description}</CardDescription>
                <Button variant="link" className="p-0" asChild>
                  <Link href={resource.link}>Learn more</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="space-y-12 mb-12">
          <section id="identity-verification">
            <h2 className="text-2xl font-semibold mb-4">Identity Verification</h2>
            <div className="prose max-w-none">
              <p>
                To create a trustworthy environment, we verify the identity of all tutors on our platform. 
                Our verification process includes:
              </p>
              <ul>
                <li>Government ID verification</li>
                <li>Educational credential verification</li>
                <li>Professional background checks</li>
                <li>Profile review by our team</li>
              </ul>
              <p>
                Students can see verification badges on tutor profiles, indicating which verification steps 
                have been completed.
              </p>
            </div>
          </section>
          
          <section id="safe-communication">
            <h2 className="text-2xl font-semibold mb-4">Safe Communication</h2>
            <div className="prose max-w-none">
              <p>
                Our platform includes a secure messaging system that allows students and tutors to communicate 
                without sharing personal contact information until they're comfortable doing so.
              </p>
              <p>
                All messages are monitored for inappropriate content using advanced AI systems, and users can 
                easily report concerning communications.
              </p>
              <p>
                We recommend keeping all initial communications within our platform to ensure your safety and 
                provide a record of interactions.
              </p>
            </div>
          </section>
          
          <section id="privacy-protection">
            <h2 className="text-2xl font-semibold mb-4">Privacy Protection</h2>
            <div className="prose max-w-none">
              <p>
                We take data privacy seriously and implement industry-leading security measures to protect your 
                personal information.
              </p>
              <p>
                Our platform allows you to control what information is visible to other users. You can customize 
                your privacy settings in your account dashboard.
              </p>
              <p>
                For more details on how we collect, use, and protect your data, please review our 
                <Link href="/privacy" className="font-medium"> Privacy Policy</Link>.
              </p>
            </div>
          </section>
          
          <section id="payment-security">
            <h2 className="text-2xl font-semibold mb-4">Payment Security</h2>
            <div className="prose max-w-none">
              <p>
                All financial transactions on TutorMatch are processed through secure, encrypted payment systems. 
                We never store your complete credit card information on our servers.
              </p>
              <p>
                Our payment protection system holds funds in escrow until services are delivered, protecting both 
                students and tutors from fraud.
              </p>
              <p>
                If you ever encounter suspicious payment requests or activities, please report them immediately 
                to our support team.
              </p>
            </div>
          </section>
          
          <section id="reporting-issues">
            <h2 className="text-2xl font-semibold mb-4">Reporting Issues</h2>
            <div className="prose max-w-none">
              <p>
                If you encounter any safety concerns, inappropriate behavior, or suspicious activity, we encourage 
                you to report it immediately.
              </p>
              <p>
                You can report issues through:
              </p>
              <ul>
                <li>The "Report" button available on all profiles and messages</li>
                <li>Our dedicated safety email: safety@tutormatch.com</li>
                <li>The help center in your account dashboard</li>
              </ul>
              <p>
                All reports are reviewed by our Trust & Safety team and handled with strict confidentiality.
              </p>
            </div>
          </section>
          
          <section id="safety-for-minors">
            <h2 className="text-2xl font-semibold mb-4">Safety for Minors</h2>
            <div className="prose max-w-none">
              <p>
                We implement additional safeguards for users under 18 years of age:
              </p>
              <ul>
                <li>Parental consent requirements for account creation</li>
                <li>Enhanced privacy settings by default</li>
                <li>Restricted communication features</li>
                <li>Additional verification for tutors working with minors</li>
              </ul>
              <p>
                Parents can monitor their child's activity through a linked parent account and receive notifications 
                about new tutoring sessions or messages.
              </p>
            </div>
          </section>
        </div>
        
        <div className="bg-primary/5 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Safety Concerns?</h2>
          <p className="mb-6">
            If you have any safety concerns or questions, our dedicated Trust & Safety team is here to help.
          </p>
          <Button>Contact Safety Team</Button>
        </div>
      </div>
    </div>
  )
}
