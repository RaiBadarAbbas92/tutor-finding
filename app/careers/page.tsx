import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CareersPage() {
  // Mock job listings
  const jobListings = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
    },
    {
      id: 2,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
    },
    {
      id: 3,
      title: "Customer Success Manager",
      department: "Customer Support",
      location: "Remote",
      type: "Full-time",
    },
    {
      id: 4,
      title: "Education Content Specialist",
      department: "Content",
      location: "Remote",
      type: "Contract",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Careers at TutorMatch</h1>
        
        <p className="text-xl text-muted-foreground mb-12">
          Join our team and help transform education through technology. We're looking for passionate 
          individuals who share our mission of making quality education accessible to everyone.
        </p>
        
        <div className="bg-primary/5 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-semibold mb-4">Why Work With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Mission-Driven Company</h3>
              <p>Make a real impact on students' educational journeys and help shape the future of learning.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Remote-First Culture</h3>
              <p>Work from anywhere with flexible hours that accommodate your lifestyle and preferences.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Competitive Benefits</h3>
              <p>Enjoy comprehensive health coverage, retirement plans, and generous paid time off.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Growth Opportunities</h3>
              <p>Develop your skills with continuous learning resources and clear career advancement paths.</p>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
        
        <div className="space-y-4 mb-12">
          {jobListings.map((job) => (
            <Card key={job.id}>
              <CardHeader className="pb-2">
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>{job.department}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <span className="text-sm">{job.location}</span>
                    <span className="text-sm">{job.type}</span>
                  </div>
                  <Button>Apply Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-primary/5 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Don't See a Perfect Fit?</h2>
          <p className="mb-6">
            We're always looking for talented individuals to join our team. Send us your resume and tell us 
            how you can contribute to our mission.
          </p>
          <Button variant="outline">Send General Application</Button>
        </div>
      </div>
    </div>
  )
}
