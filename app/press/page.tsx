import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function PressPage() {
  // Mock press releases
  const pressReleases = [
    {
      id: 1,
      title: "TutorMatch Raises $5M in Seed Funding to Expand Educational Platform",
      date: "June 15, 2023",
      excerpt: "Funding will be used to enhance the platform's matching algorithm and expand into new markets.",
    },
    {
      id: 2,
      title: "TutorMatch Launches New Mobile App for On-the-Go Learning",
      date: "May 3, 2023",
      excerpt: "The new app allows students to connect with tutors, schedule sessions, and access learning resources from anywhere.",
    },
    {
      id: 3,
      title: "TutorMatch Partners with National Education Association to Support Teacher Development",
      date: "April 12, 2023",
      excerpt: "Partnership aims to provide professional development opportunities for educators across the country.",
    },
  ]

  // Mock media coverage
  const mediaCoverage = [
    {
      id: 1,
      title: "How TutorMatch is Revolutionizing Online Education",
      publication: "EdTech Today",
      date: "May 28, 2023",
      link: "#",
      logo: "https://placehold.co/100x40/png",
    },
    {
      id: 2,
      title: "The Future of Personalized Learning: An Interview with TutorMatch CEO",
      publication: "Education Weekly",
      date: "April 20, 2023",
      link: "#",
      logo: "https://placehold.co/100x40/png",
    },
    {
      id: 3,
      title: "TutorMatch Named in 'Top 10 EdTech Startups to Watch'",
      publication: "Tech Innovators",
      date: "March 15, 2023",
      link: "#",
      logo: "https://placehold.co/100x40/png",
    },
    {
      id: 4,
      title: "How AI is Helping Students Find the Perfect Tutor",
      publication: "AI Business",
      date: "February 8, 2023",
      link: "#",
      logo: "https://placehold.co/100x40/png",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Press & Media</h1>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Press Contact</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium">Media Inquiries</h3>
                  <p className="text-muted-foreground">For press inquiries, please contact our media relations team.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm">press@tutormatch.com</span>
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <Button variant="outline">Download Press Kit</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Press Releases</h2>
          <div className="space-y-6">
            {pressReleases.map((release) => (
              <Card key={release.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">{release.date}</span>
                  </div>
                  <CardTitle className="text-xl">{release.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">{release.excerpt}</CardDescription>
                  <Button variant="outline" size="sm">Read Full Release</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Media Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediaCoverage.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <img src={item.logo} alt={item.publication} className="h-8" />
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.publication}</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={item.link}>Read Article</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="bg-primary/5 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Brand Assets</h2>
          <p className="mb-6">
            Download our logo, brand guidelines, and other assets for media use.
          </p>
          <Button>Download Brand Assets</Button>
        </div>
      </div>
    </div>
  )
}
