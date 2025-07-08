"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Send, Paperclip, Smile, MoreVertical, Phone, Video, Filter } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("conversation-1")
  const [messageText, setMessageText] = useState("")

  // Mock user data
  const user = getCurrentUser() || {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@example.com",
  }

  // Mock conversations data
  const conversations = [
    {
      id: "conversation-1",
      participant: {
        id: "tutor-1",
        name: "Dr. Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        role: "tutor",
        subject: "Mathematics",
      },
      lastMessage: {
        text: "I've sent you the practice problems we discussed. Let me know if you have any questions!",
        timestamp: "2023-05-14T14:30:00",
        isRead: false,
      },
      unreadCount: 1,
    },
    {
      id: "conversation-2",
      participant: {
        id: "tutor-2",
        name: "Prof. Michael Chen",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        role: "tutor",
        subject: "Computer Science",
      },
      lastMessage: {
        text: "Great job on your last assignment! Your code was very well structured.",
        timestamp: "2023-05-13T10:15:00",
        isRead: true,
      },
      unreadCount: 0,
    },
    {
      id: "conversation-3",
      participant: {
        id: "tutor-3",
        name: "Emma Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        role: "tutor",
        subject: "English Literature",
      },
      lastMessage: {
        text: "I've reviewed your essay and left some comments. Overall, it's looking good!",
        timestamp: "2023-05-12T16:45:00",
        isRead: true,
      },
      unreadCount: 0,
    },
  ]

  // Mock messages data
  const messages = {
    "conversation-1": [
      {
        id: "msg-1-1",
        senderId: "user-1",
        text: "Hi Dr. Johnson, I'm having trouble with the calculus homework, especially problem #3.",
        timestamp: "2023-05-14T10:30:00",
      },
      {
        id: "msg-1-2",
        senderId: "tutor-1",
        text: "Hello John! I'd be happy to help. Could you send me a picture of the problem so I can see exactly what you're working with?",
        timestamp: "2023-05-14T10:35:00",
      },
      {
        id: "msg-1-3",
        senderId: "user-1",
        text: "Sure, here it is. I'm not sure how to approach this integration problem.",
        timestamp: "2023-05-14T10:40:00",
        attachment: {
          type: "image",
          url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
          name: "calculus_problem.jpg",
        },
      },
      {
        id: "msg-1-4",
        senderId: "tutor-1",
        text: "I see the issue. This is a tricky integration by parts problem. Let me walk you through it step by step...",
        timestamp: "2023-05-14T10:50:00",
      },
      {
        id: "msg-1-5",
        senderId: "tutor-1",
        text: "First, you'll want to identify u and dv. In this case, let u = ln(x) and dv = x dx.",
        timestamp: "2023-05-14T10:52:00",
      },
      {
        id: "msg-1-6",
        senderId: "user-1",
        text: "Okay, so then du = 1/x dx and v = x²/2, right?",
        timestamp: "2023-05-14T11:00:00",
      },
      {
        id: "msg-1-7",
        senderId: "tutor-1",
        text: "Exactly! Now you can apply the integration by parts formula: ∫u dv = uv - ∫v du",
        timestamp: "2023-05-14T11:05:00",
      },
      {
        id: "msg-1-8",
        senderId: "user-1",
        text: "That makes sense. So I'll get ln(x) * x²/2 - ∫(x²/2) * (1/x) dx",
        timestamp: "2023-05-14T11:10:00",
      },
      {
        id: "msg-1-9",
        senderId: "tutor-1",
        text: "Perfect! And then you can simplify the second integral to ∫(x/2) dx, which is x²/4 + C",
        timestamp: "2023-05-14T11:15:00",
      },
      {
        id: "msg-1-10",
        senderId: "user-1",
        text: "So the final answer is ln(x) * x²/2 - x²/4 + C?",
        timestamp: "2023-05-14T11:20:00",
      },
      {
        id: "msg-1-11",
        senderId: "tutor-1",
        text: "That's correct! Well done. Would you like me to send you some similar practice problems?",
        timestamp: "2023-05-14T11:25:00",
      },
      {
        id: "msg-1-12",
        senderId: "user-1",
        text: "Yes, that would be really helpful. Thank you!",
        timestamp: "2023-05-14T11:30:00",
      },
      {
        id: "msg-1-13",
        senderId: "tutor-1",
        text: "I've sent you the practice problems we discussed. Let me know if you have any questions!",
        timestamp: "2023-05-14T14:30:00",
        attachment: {
          type: "pdf",
          url: "#",
          name: "integration_practice_problems.pdf",
        },
      },
    ],
    "conversation-2": [
      {
        id: "msg-2-1",
        senderId: "user-1",
        text: "Hello Prof. Chen, I've completed the programming assignment. Could you take a look when you have time?",
        timestamp: "2023-05-12T09:30:00",
      },
      {
        id: "msg-2-2",
        senderId: "tutor-2",
        text: "Hi John, I'd be happy to review it. Please send me the code.",
        timestamp: "2023-05-12T09:45:00",
      },
      {
        id: "msg-2-3",
        senderId: "user-1",
        text: "Here's my solution to the sorting algorithm problem.",
        timestamp: "2023-05-12T10:00:00",
        attachment: {
          type: "code",
          url: "#",
          name: "sorting_algorithm.py",
        },
      },
      {
        id: "msg-2-4",
        senderId: "tutor-2",
        text: "Great job on your last assignment! Your code was very well structured.",
        timestamp: "2023-05-13T10:15:00",
      },
    ],
    "conversation-3": [
      {
        id: "msg-3-1",
        senderId: "user-1",
        text: "Hi Ms. Rodriguez, I've attached my essay on 'The Great Gatsby' for your review.",
        timestamp: "2023-05-11T14:30:00",
        attachment: {
          type: "document",
          url: "#",
          name: "great_gatsby_essay.docx",
        },
      },
      {
        id: "msg-3-2",
        senderId: "tutor-3",
        text: "Thanks for sending this, John. I'll review it and get back to you with feedback.",
        timestamp: "2023-05-11T15:00:00",
      },
      {
        id: "msg-3-3",
        senderId: "tutor-3",
        text: "I've reviewed your essay and left some comments. Overall, it's looking good!",
        timestamp: "2023-05-12T16:45:00",
        attachment: {
          type: "document",
          url: "#",
          name: "great_gatsby_essay_feedback.docx",
        },
      },
    ],
  }

  const selectedMessages = selectedConversation ? messages[selectedConversation as keyof typeof messages] : []
  const selectedConversationData = conversations.find((conv) => conv.id === selectedConversation)

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return

    // In a real app, this would send the message to the server
    console.log("Sending message:", messageText, "to conversation:", selectedConversation)

    // Clear the input
    setMessageText("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Messages
          </h1>
          <p className="text-muted-foreground mt-1">Stay connected with your tutors and students</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Conversations List */}
        <Card className="md:col-span-1 overflow-hidden flex flex-col shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
          <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search conversations..." 
                className="pl-10 rounded-full border-2 focus:border-primary/50 transition-colors" 
              />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b cursor-pointer hover:bg-muted/30 transition-colors ${
                  selectedConversation === conversation.id ? "bg-gradient-to-r from-primary/10 to-primary/5 border-l-4 border-primary" : ""
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                      <AvatarImage
                        src={conversation.participant.avatar || `/api/dicebear/7.x/initials/svg?seed=${conversation.participant.name}`}
                        alt={conversation.participant.name}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                        {conversation.participant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold truncate">{conversation.participant.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {new Date(conversation.lastMessage.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage.text}</p>
                      {conversation.unreadCount > 0 && (
                        <Badge className="ml-2 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {conversation.participant.subject}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Messages */}
        <Card className="md:col-span-2 overflow-hidden flex flex-col shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
          {selectedConversation ? (
            <>
              <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                        <AvatarImage
                          src={selectedConversationData?.participant.avatar || `/api/dicebear/7.x/initials/svg?seed=${selectedConversationData?.participant.name}`}
                          alt={selectedConversationData?.participant.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                          {selectedConversationData?.participant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{selectedConversationData?.participant.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {selectedConversationData?.participant.subject}
                        </Badge>
                        <span className="text-sm text-muted-foreground">Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-6 space-y-4 bg-gradient-to-b from-background to-muted/10">
                {selectedMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === user.id ? "justify-end" : "justify-start"} group`}
                  >
                    {!message.senderId === user.id && (
                      <Avatar className="h-8 w-8 mr-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <AvatarImage src={`/api/dicebear/7.x/initials/svg?seed=${selectedConversationData?.participant.name}`} />
                        <AvatarFallback className="text-xs bg-muted">
                          {selectedConversationData?.participant.name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm transition-all duration-200 ${
                        message.senderId === user.id 
                          ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-primary/25" 
                          : "bg-card border border-border/50 shadow-sm hover:shadow-md"
                      }`}
                    >
                      <p className="leading-relaxed">{message.text}</p>
                      {message.attachment && (
                        <div className="mt-3">
                          {message.attachment.type === "image" ? (
                            <div className="rounded-lg overflow-hidden">
                              <img
                                src={message.attachment.url || "/placeholder.svg"}
                                alt="Attachment"
                                className="max-w-full rounded-lg"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg border">
                              <Paperclip className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">{message.attachment.name}</span>
                            </div>
                          )}
                        </div>
                      )}
                      <div
                        className={`text-xs mt-2 ${
                          message.senderId === user.id ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t bg-gradient-to-r from-background to-muted/10">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      className="pr-12 rounded-full border-2 focus:border-primary/50 transition-colors"
                    />
                    <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-primary/10">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    size="icon" 
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="rounded-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Select a conversation</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Choose a conversation from the list to start messaging with your tutors or students
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
