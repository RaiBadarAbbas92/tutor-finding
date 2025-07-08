"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, Smile, MoreVertical, Phone, Video } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useChatStore } from "@/lib/stores/chat-store"
import * as userMapping from '@/lib/utils/user-mapping'
import * as usersApi from '@/lib/api/users'
import Link from "next/link"

export default function ChatPage() {
  const params = useParams()
  const chatId = parseInt(params.id as string)
  const [message, setMessage] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [cachedUserInfo, setCachedUserInfo] = useState<{userId: number, username: string, email: string} | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const user = useAuthStore(state => state.user)
  const { conversations, getConversation, sendMessage, markMessageAsRead } = useChatStore()
  const conversation = conversations[chatId]

  // Load cached user information from localStorage
  useEffect(() => {
    if (!user) return;

    try {
      // Try to get cached user info from localStorage based on role and chat ID
      const storageKey = user.role === 'student'
        ? `chat_teacher_${chatId}`
        : `chat_student_${chatId}`;

      const storedData = localStorage.getItem(storageKey);

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log(`Found cached user info for ${storageKey}:`, parsedData);
        setCachedUserInfo(parsedData);
      } else {
        console.log(`No cached user info found for ${storageKey}`);
      }
    } catch (error) {
      console.error('Error loading cached user info:', error);
    }
  }, [user, chatId]);

  // Load conversation data
  useEffect(() => {
    const loadConversation = async () => {
      try {
        setError(null);

        // Initialize user mappings first
        await userMapping.initializeUserMappings();

        if (chatId) {
          await getConversation(chatId);
        }
      } catch (error) {
        console.error('Error loading conversation:', error);
        setError('Failed to load conversation. Please try again later.');
      }
    };

    loadConversation();

    // Set up polling to fetch new messages every 3 seconds
    const interval = setInterval(async () => {
      if (chatId) {
        try {
          await getConversation(chatId);
        } catch (error) {
          console.error('Error polling for new messages:', error);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [chatId, getConversation]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    // Mark unread messages as read
    if (conversation?.messages) {
      conversation.messages.forEach(msg => {
        if (msg.recipient_id === user?.id && !msg.is_read) {
          markMessageAsRead(msg.id);
        }
      });
    }
  }, [conversation?.messages, user?.id, markMessageAsRead]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    const messageText = message.trim();
    setMessage(""); // Clear input immediately for better UX

    try {
      // Optimistically add the message to the UI
      const optimisticMessage = {
        id: Date.now(), // Temporary ID
        sender_id: user.id,
        recipient_id: chatId,
        content: messageText,
        sent_at: new Date().toISOString(),
        is_read: false,
        sender: { id: user.id, username: user.username, email: user.email, role: user.role },
        recipient: { id: chatId, username: '', email: '', role: '' }
      };

      // Update the conversation immediately
      const updatedConversation = {
        ...conversation,
        messages: [...(conversation?.messages || []), optimisticMessage],
        lastMessage: optimisticMessage,
        unreadCount: conversation?.unreadCount || 0
      };

      // Force a re-render by updating the store
      const { conversations } = useChatStore.getState();
      useChatStore.setState({
        conversations: {
          ...conversations,
          [chatId]: updatedConversation
        }
      });

      // Send the actual message
      await sendMessage(chatId, messageText);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
      // Optionally revert the optimistic update on error
    }
  };

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

  // Get user information from conversation or cached data
  const otherUser = conversation?.messages[0]?.sender_id === user.id
    ? conversation?.messages[0]?.recipient
    : conversation?.messages[0]?.sender;

  // Use cached user info if available, otherwise fall back to conversation data
  const displayName = cachedUserInfo?.username || otherUser?.username || (user.role === 'student' ? `Teacher ${chatId}` : `Student ${chatId}`);
  const displayEmail = cachedUserInfo?.email || otherUser?.email || (user.role === 'student' ? 'Teacher' : 'Student');
  const displayInitial = displayName[0]?.toUpperCase() || (user.role === 'student' ? `T` : `S`);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="h-[calc(100vh-8rem)] shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                    {displayInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">{displayName}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {user.role === 'student' ? 'Teacher' : 'Student'}
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
        </CardHeader>
        <CardContent className="p-0 flex flex-col h-[calc(100%-5rem)]">
          {error ? (
            <div className="flex-1 flex items-center justify-center text-destructive">
              <p>{error}</p>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-background to-muted/10">
                  {conversation?.messages.map((msg) => {
                    const isOwnMessage = msg.sender_id === user.id;

                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} group`}
                      >
                        {!isOwnMessage && (
                          <Avatar className="h-8 w-8 mr-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`} />
                            <AvatarFallback className="text-xs bg-muted">
                              {displayInitial}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm transition-all duration-200 ${
                            isOwnMessage
                              ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-primary/25"
                              : "bg-card border border-border/50 shadow-sm hover:shadow-md"
                          }`}
                        >
                          <p className="leading-relaxed">{msg.content}</p>
                          <div className="flex items-center justify-between gap-2 mt-2">
                            <p className={`text-xs ${isOwnMessage ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                              {new Date(msg.sent_at).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                            {!isOwnMessage && !msg.is_read && (
                              <Badge variant="secondary" className="text-xs bg-blue-500 text-white">
                                New
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-6 border-t bg-gradient-to-r from-background to-muted/10">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="pr-12 rounded-full border-2 focus:border-primary/50 transition-colors"
                    />
                    <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-primary/10">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!message.trim()}
                    className="rounded-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
