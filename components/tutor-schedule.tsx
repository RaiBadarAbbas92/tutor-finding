import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video } from "lucide-react"

interface TutorScheduleProps {
  tutorId: string
}

export function TutorSchedule({ tutorId }: TutorScheduleProps) {
  // Mock upcoming sessions
  const upcomingSessions = [
    {
      id: "session-1",
      student: {
        id: "student-1",
        name: "Alex Thompson",
        avatar:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      subject: "Calculus II",
      date: "2023-05-15",
      time: "4:00 PM - 5:00 PM",
      type: "Online",
      status: "confirmed",
    },
    {
      id: "session-2",
      student: {
        id: "student-2",
        name: "Jamie Lee",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      subject: "Statistics",
      date: "2023-05-16",
      time: "2:30 PM - 3:30 PM",
      type: "Online",
      status: "confirmed",
    },
    {
      id: "session-3",
      student: {
        id: "student-3",
        name: "Chris Martinez",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      subject: "Physics",
      date: "2023-05-17",
      time: "5:30 PM - 6:30 PM",
      type: "Online",
      status: "pending",
    },
    {
      id: "session-4",
      student: {
        id: "student-4",
        name: "Taylor Wong",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      subject: "Algebra",
      date: "2023-05-18",
      time: "3:00 PM - 4:00 PM",
      type: "Online",
      status: "confirmed",
    },
  ]

  if (upcomingSessions.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No upcoming sessions</h3>
        <p className="text-muted-foreground mb-6">
          You don't have any scheduled lessons. Update your availability to attract more students.
        </p>
        <Button asChild>
          <Link href="/tutor-dashboard/availability">Update Availability</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {upcomingSessions.map((session) => (
        <Card key={session.id}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={session.student.avatar || "/placeholder.svg"} alt={session.student.name} />
                  <AvatarFallback>
                    {session.student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{session.student.name}</h3>
                  <p className="text-sm text-muted-foreground">{session.subject}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 md:ml-auto">
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(session.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{session.time}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Video className="h-4 w-4 text-muted-foreground" />
                  <span>{session.type}</span>
                </div>
                <Badge
                  variant={session.status === "confirmed" ? "outline" : "secondary"}
                  className={session.status === "confirmed" ? "border-green-500 text-green-600" : ""}
                >
                  {session.status === "confirmed" ? "Confirmed" : "Pending"}
                </Badge>
              </div>

              <div className="flex gap-2 md:ml-auto">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/tutor-dashboard/sessions/${session.id}`}>Details</Link>
                </Button>
                {session.status === "confirmed" && (
                  <Button asChild size="sm">
                    <Link href={`/tutor-dashboard/sessions/${session.id}/join`}>Join Session</Link>
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
