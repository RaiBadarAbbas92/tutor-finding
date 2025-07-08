import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Calculator, Code, Globe, Music, Palette, TestTube, BookText } from "lucide-react"

const subjects = [
  {
    name: "Mathematics",
    icon: Calculator,
    color: "bg-teal-50 text-primary",
    href: "/tutors?subject=mathematics",
    description: "Algebra, Calculus, Statistics, and more",
  },
  {
    name: "Science",
    icon: TestTube,
    color: "bg-teal-50 text-primary",
    href: "/tutors?subject=science",
    description: "Physics, Chemistry, Biology, and more",
  },
  {
    name: "Languages",
    icon: Globe,
    color: "bg-teal-50 text-primary",
    href: "/tutors?subject=languages",
    description: "English, Spanish, French, and more",
  },
  {
    name: "Programming",
    icon: Code,
    color: "bg-teal-50 text-primary",
    href: "/tutors?subject=programming",
    description: "Python, JavaScript, Java, and more",
  },
  {
    name: "Humanities",
    icon: BookText,
    color: "bg-teal-50 text-primary",
    href: "/tutors?subject=humanities",
    description: "History, Literature, Philosophy, and more",
  },
  {
    name: "Arts",
    icon: Palette,
    color: "bg-teal-50 text-primary",
    href: "/tutors?subject=arts",
    description: "Drawing, Painting, Design, and more",
  },
  {
    name: "Music",
    icon: Music,
    color: "bg-teal-50 text-primary",
    href: "/tutors?subject=music",
    description: "Piano, Guitar, Voice, and more",
  },
  {
    name: "Test Prep",
    icon: BookOpen,
    color: "bg-teal-50 text-primary",
    href: "/tutors?subject=test-prep",
    description: "SAT, ACT, GRE, and more",
  },
]

export function SubjectCategories() {
  return (
    <section className="luxury-section bg-white">
      <div className="luxury-container">
        <div className="text-center mb-12">
          <h2 className="luxury-heading mb-3">Explore Academic Excellence</h2>
          <p className="luxury-text text-lg max-w-2xl mx-auto">
            Discover our curated selection of subjects taught by distinguished educators
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <Link key={subject.name} href={subject.href}>
              <Card className="luxury-card h-full group">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div
                    className={`p-4 rounded-full ${subject.color} mb-5 group-hover:bg-primary/10 transition-colors duration-300`}
                  >
                    <subject.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{subject.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
