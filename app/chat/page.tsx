"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MessageSquare, Plus, Filter, Clock, ArrowRight, Users, Sparkles } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useChatStore } from "@/lib/stores/chat-store"
import * as userMapping from '@/lib/utils/user-mapping'

export default function ChatsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const user = useAuthStore(state => state.user)
  const { conversations, loadConversations } = useChatStore()

  useEffect(() => {
    // Initialize user mappings first, then load conversations
    const init = async () => {
      await userMapping.initializeUserMappings();
      loadConversations();
    };

    init();
  }, [loadConversations]);

  // Convert conversations object to array for filtering
  const conversationsList = Object.entries(conversations).map(([teacherId, conversation]) => ({
    id: parseInt(teacherId),
    ...conversation
  }));

  // Filter conversations based on search term (will need to integrate with user search)
  const filteredConversations = conversationsList;

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Please log in to view your messages</p>
        <Button asChild className="mt-4">
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Messages
          </h1>
          <p className="text-muted-foreground mt-2">
            Stay connected with your {user.role === 'student' ? 'tutors' : 'students'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button asChild className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg">
            <Link href="/chat/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Message
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Chats List */}
        <div className="md:col-span-1">
          <Card className="h-full shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-primary/10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Conversations
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  {filteredConversations.length} chats
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search conversations..."
                  className="pl-10 rounded-full border-2 focus:border-primary/50 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-3 max-h-[calc(100vh-20rem)] overflow-auto">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => {
                    const lastMessage = conversation.lastMessage;
                    const displayName = conversation.lastMessage ?
                      (user.role === 'student' ?
                        conversation.lastMessage.sender.id === user.id ?
                          conversation.lastMessage.recipient.username :
                          conversation.lastMessage.sender.username
                        :
                        conversation.lastMessage.sender.id === user.id ?
                          conversation.lastMessage.recipient.username :
                          conversation.lastMessage.sender.username
                      )
                      :
                      (user.role === 'student' ? `Tutor ${conversation.id}` : `Student ${conversation.id}`);

                    const displayInitial = displayName?.[0]?.toUpperCase() || (user.role === 'student' ? 'T' : 'S');

                    return (
                      <Link key={conversation.id} href={`/chat/${conversation.id}`} className="block">
                        <div
                          className={`p-4 rounded-xl cursor-pointer hover:bg-muted/30 transition-all duration-200 ${
                            conversation.unreadCount > 0 
                              ? "bg-gradient-to-r from-primary/10 to-primary/5 border-l-4 border-primary shadow-sm" 
                              : "hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                                <AvatarImage 
                                  src={`/api/dicebear/7.x/initials/svg?seed=${displayName}`} 
                                  alt={displayName} 
                                />
                                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                                  {displayInitial}
                                </AvatarFallback>
                              </Avatar>
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold truncate">{displayName}</h3>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {lastMessage ? new Date(lastMessage.sent_at).toLocaleDateString() : "No messages"}
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-sm text-muted-foreground truncate">
                                  {lastMessage ? lastMessage.content : "Start a conversation"}
                                </p>
                                {conversation.unreadCount > 0 && (
                                  <Badge className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg">
                                    {conversation.unreadCount}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {user.role === 'student' ? 'Tutor' : 'Student'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {searchTerm ? "No conversations match your search" : "No conversations yet"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {searchTerm ? "Try adjusting your search terms" : "Start connecting with your tutors and students"}
                    </p>
                    {!searchTerm && (
                      <Button asChild className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg">
                        <Link href="/chat/new" className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Start a Conversation
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Empty State or Selected Chat Preview */}
        <div className="md:col-span-2">
          <Card className="h-full shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Welcome to Messages
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Choose a conversation from the list to start messaging with your {user.role === 'student' ? 'tutors' : 'students'}. 
                  You can also start a new conversation to connect with someone new.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg">
                    <Link href="/chat/new" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      New Message
                    </Link>
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Users className="h-4 w-4" />
                    Browse {user.role === 'student' ? 'Tutors' : 'Students'}
                  </Button>
                </div>
                <div className="mt-8 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Quick Tips</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1 text-left">
                    <li>• Use the search to find specific conversations</li>
                    <li>• Click on any conversation to start messaging</li>
                    <li>• Unread messages are highlighted with badges</li>
                    <li>• You can filter conversations by status</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
