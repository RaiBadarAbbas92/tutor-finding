import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function CommunityGuidelinesPage() {
  // Core principles
  const corePrinciples = [
    {
      title: "Respect",
      description: "Treat all community members with dignity and courtesy.",
      icon: "🤝",
    },
    {
      title: "Integrity",
      description: "Be honest and transparent in all interactions.",
      icon: "⭐",
    },
    {
      title: "Safety",
      description: "Prioritize the well-being of yourself and others.",
      icon: "🛡️",
    },
    {
      title: "Quality",
      description: "Strive for excellence in teaching and learning.",
      icon: "🏆",
    },
    {
      title: "Inclusivity",
      description: "Welcome diversity and foster an inclusive environment.",
      icon: "🌈",
    },
    {
      title: "Responsibility",
      description: "Take ownership of your actions and commitments.",
      icon: "✅",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Community Guidelines</h1>
        
        <p className="text-xl text-muted-foreground mb-12">
          Our community guidelines establish the standards for behavior and interactions on TutorMatch. 
          By following these guidelines, you help create a positive, productive learning environment for everyone.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {corePrinciples.map((principle, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="text-3xl mb-2">{principle.icon}</div>
                <CardTitle>{principle.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{principle.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="space-y-12 mb-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">For All Users</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-medium mt-6 mb-3">Communication</h3>
              <ul>
                <li>Communicate clearly, respectfully, and professionally at all times.</li>
                <li>Avoid offensive language, harassment, or discriminatory remarks.</li>
                <li>Respect others' privacy and confidentiality.</li>
                <li>Respond to messages in a timely manner, especially regarding scheduling.</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Honesty & Accuracy</h3>
              <ul>
                <li>Provide accurate information in your profile and communications.</li>
                <li>Be transparent about qualifications, experience, and expectations.</li>
                <li>Give honest feedback and reviews based on actual experiences.</li>
                <li>Report any suspicious or fraudulent activity to our team.</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Respect for the Platform</h3>
              <ul>
                <li>Use TutorMatch for its intended purpose of educational tutoring.</li>
                <li>Do not attempt to circumvent our systems or policies.</li>
                <li>Report technical issues or bugs to help us improve the platform.</li>
                <li>Respect intellectual property rights and copyright laws.</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">For Students</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-medium mt-6 mb-3">Session Preparation</h3>
              <ul>
                <li>Be prepared for tutoring sessions with necessary materials and questions.</li>
                <li>Communicate specific learning goals and areas of difficulty to your tutor.</li>
                <li>Complete any pre-session work assigned by your tutor.</li>
                <li>Be on time for scheduled sessions or provide advance notice for cancellations.</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Academic Integrity</h3>
              <ul>
                <li>Use tutoring to enhance your understanding, not to cheat on assignments.</li>
                <li>Do not ask tutors to complete your homework or assignments for you.</li>
                <li>Be honest about your knowledge level and understanding.</li>
                <li>Apply what you learn in tutoring sessions to develop your own skills.</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Feedback & Growth</h3>
              <ul>
                <li>Provide constructive feedback to your tutor to improve the learning experience.</li>
                <li>Be open to guidance and willing to try new approaches to learning.</li>
                <li>Acknowledge your progress and celebrate achievements.</li>
                <li>Leave honest, fair reviews after completing sessions.</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">For Tutors</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-medium mt-6 mb-3">Professional Conduct</h3>
              <ul>
                <li>Maintain professional boundaries with students at all times.</li>
                <li>Be punctual and prepared for all scheduled sessions.</li>
                <li>Communicate clearly about your teaching methods and expectations.</li>
                <li>Respect student confidentiality and privacy.</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Quality Instruction</h3>
              <ul>
                <li>Provide high-quality, accurate instruction in your areas of expertise.</li>
                <li>Adapt your teaching approach to meet individual student needs.</li>
                <li>Stay current with subject matter and teaching methodologies.</li>
                <li>Focus on developing student understanding, not just completing assignments.</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Ethical Standards</h3>
              <ul>
                <li>Never complete assignments or exams for students.</li>
                <li>Promote academic integrity and independent learning.</li>
                <li>Set fair rates that reflect your qualifications and experience.</li>
                <li>Provide honest assessments of student progress and areas for improvement.</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Prohibited Activities</h2>
            <div className="prose max-w-none">
              <p>The following activities are strictly prohibited on TutorMatch:</p>
              <ul>
                <li>Harassment, bullying, or discrimination of any kind</li>
                <li>Sharing inappropriate or offensive content</li>
                <li>Soliciting or engaging in non-educational services</li>
                <li>Creating fake profiles or misrepresenting qualifications</li>
                <li>Attempting to circumvent the platform's payment system</li>
                <li>Sharing personal contact information in initial communications</li>
                <li>Violating intellectual property rights or copyright laws</li>
                <li>Engaging in any illegal activities or promoting harmful behavior</li>
              </ul>
              <p>
                Violations of these guidelines may result in warnings, temporary suspension, or permanent 
                removal from the TutorMatch platform, depending on the severity and frequency of the violation.
              </p>
            </div>
          </section>
        </div>
        
        <div className="bg-primary/5 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Reporting Violations</h2>
          <p className="mb-6">
            If you encounter behavior that violates our community guidelines, please report it immediately. 
            We take all reports seriously and will investigate each case thoroughly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button>Report a Violation</Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
