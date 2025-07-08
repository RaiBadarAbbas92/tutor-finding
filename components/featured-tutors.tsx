import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { getFeaturedTutors } from "@/lib/data"

export function FeaturedTutors() {
  const tutors = getFeaturedTutors()

  return (
    <section className="container px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Featured Tutors</h2>
          <p className="text-muted-foreground mt-2">
            Discover our top-rated tutors with proven track records of student success
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/tutors">View All Tutors</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tutors.map((tutor) => (
          <Card key={tutor.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-48 bg-muted">
                <img
                  src={tutor.coverImage || "/placeholder.svg?height=192&width=384"}
                  alt=""
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <Avatar className="h-12 w-12 border-2 border-background">
                    <AvatarImage src={tutor.avatar || "/placeholder.svg"} alt={tutor.name} />
                    <AvatarFallback>
                      {tutor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center bg-background/80 rounded-full px-2 py-1">
                    <StarRating rating={tutor.rating} />
                    <span className="ml-1 text-sm">{tutor.rating}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold">{tutor.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{tutor.title}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {tutor.subjects.slice(0, 3).map((subject) => (
                    <Badge key={subject} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                  {tutor.subjects.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{tutor.subjects.length - 3} more
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">${tutor.hourlyRate}/hour</span>
                  <span className="text-muted-foreground">{tutor.lessonsCompleted}+ lessons</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button asChild className="w-full">
                <Link href={`/tutors/${tutor.id}`}>View Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
