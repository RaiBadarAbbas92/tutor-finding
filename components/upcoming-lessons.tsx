import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Video } from "lucide-react"
import { getUserUpcomingLessons } from "@/lib/data"

interface UpcomingLessonsProps {
  userId: string
}

export function UpcomingLessons({ userId }: UpcomingLessonsProps) {
  const lessons = getUserUpcomingLessons(userId)

  if (lessons.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No upcoming lessons</h3>
        <p className="text-muted-foreground mb-6">
          You don't have any scheduled lessons. Find a tutor to book your first session!
        </p>
        <Button asChild>
          <Link href="/tutors">Find a Tutor</Link>
        </Button>
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
                  <span>{lesson.time}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Video className="h-4 w-4 text-muted-foreground" />
                  <span>{lesson.type}</span>
                </div>
              </div>

              <div className="flex gap-2 md:ml-auto">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/lessons/${lesson.id}`}>Details</Link>
                </Button>
                {lesson.canJoin && (
                  <Button asChild size="sm">
                    <Link href={`/lessons/${lesson.id}/join`}>Join Session</Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
