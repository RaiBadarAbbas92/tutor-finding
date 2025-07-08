import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { FeaturedTeachers } from "@/components/featured-teachers"
import { SubjectCategories } from "@/components/subject-categories"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-8">
      <HeroSection />
      <FeaturedTeachers />
      <SubjectCategories />
      <HowItWorks />
      <Testimonials />

      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to find your perfect tutor?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of students who have found academic success with TutorMatch.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/tutors">Find a Tutor</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/signup">Sign Up Free</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
