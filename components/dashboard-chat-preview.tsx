import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ArrowRight, Clock } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getAllChats } from "@/lib/chat"

export function DashboardChatPreview() {
  // Get the current user
  const user = getCurrentUser()
  if (!user) return null

  // Get all chats for the user
  const chats = getAllChats(user.id)

  // Get the 3 most recent chats
  const recentChats = chats.slice(0, 3)

  // Count total unread messages
  const unreadCount = chats.reduce((total, chat) => {
    const unreadMessages = chat.messages.filter((m) => m.senderId !== user.id && !m.isRead)
    return total + unreadMessages.length
  }, 0)

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
      <CardHeader className="flex flex-row items-center justify-between pb-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Recent Messages
        </CardTitle>
        <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10">
          <Link href="/chat" className="flex items-center gap-2">
            View All
            <ArrowRight className="h-4 w-4" />
            {unreadCount > 0 && (
              <Badge className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg">
                {unreadCount}
              </Badge>
            )}
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        {recentChats.length > 0 ? (
          <div className="space-y-4">
            {recentChats.map((chat) => {
              const participant = chat.participants.find((p) => p.id !== user.id)
              if (!participant) return null

              const lastMessage = chat.messages[chat.messages.length - 1]
              const unreadCount = chat.messages.filter((m) => m.senderId !== user.id && !m.isRead).length

              return (
                <Link key={chat.id} href={`/chat/${chat.id}`} className="block">
                  <div
                    className={`p-4 rounded-xl cursor-pointer hover:bg-muted/30 transition-all duration-200 ${
                      unreadCount > 0 
                        ? "bg-gradient-to-r from-primary/10 to-primary/5 border-l-4 border-primary shadow-sm" 
                        : "hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                          <AvatarImage 
                            src={participant.avatar || `/api/dicebear/7.x/initials/svg?seed=${participant.name}`} 
                            alt={participant.name} 
                          />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                            {participant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold truncate">{participant.name}</h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {new Date(lastMessage.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-muted-foreground truncate">{lastMessage.text}</p>
                          {unreadCount > 0 && (
                            <Badge className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg">
                              {unreadCount}
                            </Badge>
                          )}
                        </div>
                        {participant.role === 'tutor' && (
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {participant.subject}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No messages yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start a conversation with your tutors or students
            </p>
            <Button asChild className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg">
              <Link href="/chat/new">Start a Conversation</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
