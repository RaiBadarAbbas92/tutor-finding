import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search, Calendar, MessageSquare, GraduationCap } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Select Your Mentor",
      description: "Browse our elite network of tutors, filtering by expertise, credentials, and availability.",
      color: "bg-teal-50 text-primary border-primary",
    },
    {
      icon: Calendar,
      title: "Schedule Your Session",
      description: "Book a personalized session at your convenience, with flexible online or in-person options.",
      color: "bg-teal-50 text-primary border-primary",
    },
    {
      icon: MessageSquare,
      title: "Engage & Learn",
      description: "Connect with your tutor through our premium platform for a tailored educational experience.",
      color: "bg-teal-50 text-primary border-primary",
    },
    {
      icon: GraduationCap,
      title: "Excel & Achieve",
      description: "Track your progress, receive personalized feedback, and reach your academic aspirations.",
      color: "bg-teal-50 text-primary border-primary",
    },
  ]

  return (
    <section className="luxury-section bg-luxury-gradient">
      <div className="luxury-container">
        <div className="text-center mb-16">
          <h2 className="luxury-heading mb-3">
            The <span className="teal-accent">TutorMatch</span> Experience
          </h2>
          <p className="luxury-text text-lg max-w-2xl mx-auto">
            Our refined process ensures a seamless journey from selecting your ideal mentor to achieving academic
            excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div
                  className={`flex items-center justify-center w-20 h-20 rounded-full ${step.color} border-2 border-primary shadow-md`}
                >
                  <step.icon className="h-8 w-8" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-primary/30 -translate-y-1/2">
                    <div className="absolute right-0 w-2 h-2 rounded-full bg-primary -translate-y-1/2"></div>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">
                <span className="teal-accent">Step {index + 1}:</span> {step.title}
              </h3>
              <p className="luxury-text">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" className="luxury-button h-12 px-8 text-base">
            <Link href="/tutors">Begin Your Journey</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
