import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarRating } from "@/components/star-rating"
import { Quote } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      content:
        "My mathematics tutor transformed my understanding of calculus, raising my grade from a C to an A- in just two months. The personalized approach and exceptional teaching methods made all the difference in my academic journey.",
      author: {
        name: "Sarah Johnson",
        role: "Harvard University",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      rating: 5,
    },
    {
      id: 2,
      content:
        "Finding a Spanish tutor on TutorMatch was effortless. My mentor's patience, expertise, and engaging teaching style have transformed my language skills. I'm now confidently conversational after just three months of sessions.",
      author: {
        name: "Michael Chen",
        role: "Yale University",
        avatar:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      rating: 5,
    },
    {
      id: 3,
      content:
        "As a parent, I appreciate TutorMatch's rigorous verification of tutors' credentials. My daughter's science tutor has been exceptional, providing comprehensive preparation for her AP exams and fostering a genuine passion for the subject.",
      author: {
        name: "Lisa Rodriguez",
        role: "Parent of Princeton Student",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      rating: 5,
    },
  ]

  return (
    <section className="luxury-section bg-white">
      <div className="luxury-container">
        <div className="text-center mb-16">
          <h2 className="luxury-heading mb-3">
            Voices of <span className="teal-accent">Excellence</span>
          </h2>
          <p className="luxury-text text-lg max-w-2xl mx-auto">
            Discover how our distinguished tutors have transformed the academic journeys of our students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="luxury-card h-full">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="mb-6 text-primary">
                  <Quote className="h-10 w-10 opacity-80" />
                </div>
                <p className="flex-1 mb-8 italic text-foreground leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-primary/20">
                    <AvatarImage src={testimonial.author.avatar || "/placeholder.svg"} alt={testimonial.author.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.author.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.author.role}</p>
                  </div>
                  <div className="ml-auto">
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
