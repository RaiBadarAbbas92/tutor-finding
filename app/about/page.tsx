import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About TutorMatch</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="lead text-xl text-muted-foreground mb-8">
            TutorMatch is dedicated to connecting students with qualified tutors to help them achieve academic success.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            At TutorMatch, our mission is to make quality education accessible to everyone. We believe that personalized 
            learning experiences can transform educational outcomes, and we're committed to creating a platform that 
            connects students with the perfect tutors for their unique needs.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
          <p>
            TutorMatch was founded in 2023 by a group of educators and technology enthusiasts who recognized the need 
            for a better way to connect students with qualified tutors. What started as a small project has grown into 
            a comprehensive platform serving thousands of students and tutors worldwide.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Excellence:</strong> We are committed to maintaining the highest standards in education.</li>
            <li><strong>Accessibility:</strong> We believe quality education should be available to everyone.</li>
            <li><strong>Innovation:</strong> We continuously improve our platform to enhance the learning experience.</li>
            <li><strong>Community:</strong> We foster a supportive environment for both students and tutors.</li>
            <li><strong>Integrity:</strong> We operate with honesty and transparency in all our interactions.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
          <p>
            Our diverse team brings together expertise in education, technology, and business. We're united by our 
            passion for improving educational outcomes and creating opportunities for both students and educators.
          </p>
          
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-4">Ready to find your perfect tutor?</h3>
            <Button asChild size="lg" className="mt-2">
              <Link href="/tutors">Find a Tutor</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
