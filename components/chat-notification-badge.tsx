"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser } from "@/lib/auth"
import { getAllChats } from "@/lib/chat"

export function ChatNotificationBadge() {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Get the current user
    const user = getCurrentUser()
    if (!user) return

    // Get all chats for the user
    const chats = getAllChats(user.id)

    // Count unread messages
    const count = chats.reduce((total, chat) => {
      const unreadMessages = chat.messages.filter((m) => m.senderId !== user.id && !m.isRead)
      return total + unreadMessages.length
    }, 0)

    setUnreadCount(count)

    // In a real app, you would set up a subscription to update this in real-time
    const interval = setInterval(() => {
      const chats = getAllChats(user.id)
      const count = chats.reduce((total, chat) => {
        const unreadMessages = chat.messages.filter((m) => m.senderId !== user.id && !m.isRead)
        return total + unreadMessages.length
      }, 0)
      setUnreadCount(count)
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  if (unreadCount === 0) return null

  return <Badge className="ml-1 bg-secondary text-secondary-foreground">{unreadCount}</Badge>
}
