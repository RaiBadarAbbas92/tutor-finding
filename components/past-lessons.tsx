import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Star } from "lucide-react"
import { getUserPastLessons } from "@/lib/data"

interface PastLessonsProps {
  userId: string
}

export function PastLessons({ userId }: PastLessonsProps) {
  const lessons = getUserPastLessons(userId)

  if (lessons.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No past lessons</h3>
        <p className="text-muted-foreground">You haven't completed any lessons yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {lessons.map((lesson) => (
        <Card key={lesson.id}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={lesson.tutor.avatar || "/placeholder.svg"} alt={lesson.tutor.name} />
                  <AvatarFallback>
                    {lesson.tutor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{lesson.tutor.name}</h3>
                  <p className="text-sm text-muted-foreground">{lesson.subject}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 md:ml-auto">
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(lesson.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{lesson.duration} minutes</span>
                </div>
                {lesson.reviewed ? (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span>Reviewed</span>
                  </Badge>
                ) : null}
              </div>

              <div className="flex gap-2 md:ml-auto">
                {!lesson.reviewed ? (
                  <Button asChild size="sm">
                    <Link href={`/lessons/${lesson.id}/review`}>Leave Review</Link>
                  </Button>
                ) : (
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/lessons/${lesson.id}`}>View Details</Link>
                  </Button>
                )}
                <Button asChild variant="outline" size="sm">
                  <Link href={`/tutors/${lesson.tutor.id}`}>Book Again</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
