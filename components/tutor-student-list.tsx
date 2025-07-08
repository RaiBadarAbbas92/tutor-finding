import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TutorStudentListProps {
  tutorId: string
}

export function TutorStudentList({ tutorId }: TutorStudentListProps) {
  // Mock student data
  const students = [
    {
      id: "student-1",
      name: "Alex Thompson",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      subject: "Calculus II",
      sessionsCompleted: 8,
      nextSession: "2023-05-15",
      status: "active",
    },
    {
      id: "student-2",
      name: "Jamie Lee",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      subject: "Statistics",
      sessionsCompleted: 5,
      nextSession: "2023-05-16",
      status: "active",
    },
    {
      id: "student-3",
      name: "Chris Martinez",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      subject: "Physics",
      sessionsCompleted: 3,
      nextSession: "2023-05-17",
      status: "active",
    },
    {
      id: "student-4",
      name: "Taylor Wong",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      subject: "Algebra",
      sessionsCompleted: 2,
      nextSession: "2023-05-18",
      status: "active",
    },
    {
      id: "student-5",
      name: "Jordan Smith",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      subject: "Trigonometry",
      sessionsCompleted: 12,
      nextSession: null,
      status: "inactive",
    },
  ]

  if (students.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No students yet</h3>
        <p className="text-muted-foreground mb-6">
          You don't have any students yet. Complete your profile to attract students.
        </p>
        <Button asChild>
          <Link href="/tutor-dashboard/profile">Complete Profile</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {students.map((student) => (
        <Card key={student.id}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                  <AvatarFallback>
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">{student.subject}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 md:ml-auto">
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-muted-foreground">Sessions:</span>
                  <span>{student.sessionsCompleted}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-muted-foreground">Next Session:</span>
                  <span>
                    {student.nextSession ? new Date(student.nextSession).toLocaleDateString() : "Not scheduled"}
                  </span>
                </div>
                <Badge
                  variant={student.status === "active" ? "outline" : "secondary"}
                  className={student.status === "active" ? "border-green-500 text-green-600" : ""}
                >
                  {student.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="flex gap-2 md:ml-auto">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/tutor-dashboard/students/${student.id}`}>View Profile</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={`/tutor-dashboard/messages?student=${student.id}`}>Message</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
