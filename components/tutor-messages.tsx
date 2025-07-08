import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TutorMessagesProps {
  tutorId: string
}

export function TutorMessages({ tutorId }: TutorMessagesProps) {
  // Mock message data
  const messages = [
    {
      id: "msg-1",
      student: {
        id: "student-1",
        name: "Alex Thompson",
        avatar:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      subject: "Question about homework",
      preview:
        "Hi Dr. Johnson, I'm having trouble with problem #3 from yesterday's homework. Could you help me understand...",
      date: "2023-05-14T14:30:00",
      unread: true,
    },
    {
      id: "msg-2",
      student: {
        id: "student-2",
        name: "Jamie Lee",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      subject: "Rescheduling request",
      preview:
        "Hello, I need to reschedule our session tomorrow due to a doctor's appointment. Would it be possible to...",
      date: "2023-05-14T10:15:00",
      unread: true,
    },
    {
      id: "msg-3",
      student: {
        id: "student-3",
        name: "Chris Martinez",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      subject: "Additional materials",
      preview:
        "Thank you for the session today! Could you send me those additional practice problems you mentioned during...",
      date: "2023-05-13T16:45:00",
      unread: true,
    },
    {
      id: "msg-4",
      student: {
        id: "student-4",
        name: "Taylor Wong",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      subject: "Session confirmation",
      preview: "Just confirming our session for tomorrow at 3 PM. Looking forward to it!",
      date: "2023-05-13T09:20:00",
      unread: false,
    },
  ]

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No messages</h3>
        <p className="text-muted-foreground">You don't have any messages yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Card key={message.id} className={message.unread ? "border-primary/50" : ""}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={message.student.avatar || "/placeholder.svg"} alt={message.student.name} />
                  <AvatarFallback>
                    {message.student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{message.student.name}</h3>
                    {message.unread && <Badge className="bg-primary text-primary-foreground">New</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(message.date).toLocaleDateString()} at{" "}
                    {new Date(message.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>

              <div className="flex-1">
                <h4 className="font-medium">{message.subject}</h4>
                <p className="text-sm text-muted-foreground line-clamp-1">{message.preview}</p>
              </div>

              <div className="flex gap-2 md:ml-auto">
                <Button asChild size="sm">
                  <Link href={`/tutor-dashboard/messages/${message.id}`}>Read & Reply</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
