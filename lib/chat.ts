// Mock chat data and functions

interface Attachment {
  type: string
  url: string
  name: string
}

interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
  isRead: boolean
  attachments?: Attachment[]
}

interface Participant {
  id: string
  name: string
  avatar?: string
  role: "student" | "tutor"
  subject?: string
  status?: "online" | "offline"
}

interface Chat {
  id: string
  participants: Participant[]
  messages: Message[]
  lastActivity: string
}

// Mock chats data
const chats: Chat[] = [
  {
    id: "chat-1",
    participants: [
      {
        id: "user-1",
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        role: "student",
      },
      {
        id: "tutor-1",
        name: "Dr. Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        role: "tutor",
        subject: "Mathematics",
        status: "online",
      },
    ],
    messages: [
      {
        id: "msg-1-1",
        senderId: "user-1",
        text: "Hi Dr. Johnson, I'm having trouble with the calculus homework, especially problem #3.",
        timestamp: "2023-05-14T10:30:00",
        isRead: true,
      },
      {
        id: "msg-1-2",
        senderId: "tutor-1",
        text: "Hello John! I'd be happy to help. Could you send me a picture of the problem so I can see exactly what you're working with?",
        timestamp: "2023-05-14T10:35:00",
        isRead: true,
      },
      {
        id: "msg-1-3",
        senderId: "user-1",
        text: "Sure, here it is. I'm not sure how to approach this integration problem.",
        timestamp: "2023-05-14T10:40:00",
        isRead: true,
        attachments: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            name: "calculus_problem.jpg",
          },
        ],
      },
      {
        id: "msg-1-4",
        senderId: "tutor-1",
        text: "I see the issue. This is a tricky integration by parts problem. Let me walk you through it step by step...",
        timestamp: "2023-05-14T10:50:00",
        isRead: true,
      },
      {
        id: "msg-1-5",
        senderId: "tutor-1",
        text: "First, you'll want to identify u and dv. In this case, let u = ln(x) and dv = x dx.",
        timestamp: "2023-05-14T10:52:00",
        isRead: true,
      },
      {
        id: "msg-1-6",
        senderId: "user-1",
        text: "Okay, so then du = 1/x dx and v = x²/2, right?",
        timestamp: "2023-05-14T11:00:00",
        isRead: true,
      },
      {
        id: "msg-1-7",
        senderId: "tutor-1",
        text: "Exactly! Now you can apply the integration by parts formula: ∫u dv = uv - ∫v du",
        timestamp: "2023-05-14T11:05:00",
        isRead: true,
      },
      {
        id: "msg-1-13",
        senderId: "tutor-1",
        text: "I've sent you the practice problems we discussed. Let me know if you have any questions!",
        timestamp: "2023-05-14T14:30:00",
        isRead: false,
        attachments: [
          {
            type: "pdf",
            url: "#",
            name: "integration_practice_problems.pdf",
          },
        ],
      },
    ],
    lastActivity: "2023-05-14T14:30:00",
  },
  {
    id: "chat-2",
    participants: [
      {
        id: "user-1",
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        role: "student",
      },
      {
        id: "tutor-2",
        name: "Prof. Michael Chen",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        role: "tutor",
        subject: "Computer Science",
        status: "offline",
      },
    ],
    messages: [
      {
        id: "msg-2-1",
        senderId: "user-1",
        text: "Hello Prof. Chen, I've completed the programming assignment. Could you take a look when you have time?",
        timestamp: "2023-05-12T09:30:00",
        isRead: true,
      },
      {
        id: "msg-2-2",
        senderId: "tutor-2",
        text: "Hi John, I'd be happy to review it. Please send me the code.",
        timestamp: "2023-05-12T09:45:00",
        isRead: true,
      },
      {
        id: "msg-2-3",
        senderId: "user-1",
        text: "Here's my solution to the sorting algorithm problem.",
        timestamp: "2023-05-12T10:00:00",
        isRead: true,
        attachments: [
          {
            type: "code",
            url: "#",
            name: "sorting_algorithm.py",
          },
        ],
      },
      {
        id: "msg-2-4",
        senderId: "tutor-2",
        text: "Great job on your last assignment! Your code was very well structured.",
        timestamp: "2023-05-13T10:15:00",
        isRead: true,
      },
    ],
    lastActivity: "2023-05-13T10:15:00",
  },
  {
    id: "chat-3",
    participants: [
      {
        id: "user-1",
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        role: "student",
      },
      {
        id: "tutor-3",
        name: "Emma Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        role: "tutor",
        subject: "English Literature",
        status: "online",
      },
    ],
    messages: [
      {
        id: "msg-3-1",
        senderId: "user-1",
        text: "Hi Ms. Rodriguez, I've attached my essay on 'The Great Gatsby' for your review.",
        timestamp: "2023-05-11T14:30:00",
        isRead: true,
        attachments: [
          {
            type: "document",
            url: "#",
            name: "great_gatsby_essay.docx",
          },
        ],
      },
      {
        id: "msg-3-2",
        senderId: "tutor-3",
        text: "Thanks for sending this, John. I'll review it and get back to you with feedback.",
        timestamp: "2023-05-11T15:00:00",
        isRead: true,
      },
      {
        id: "msg-3-3",
        senderId: "tutor-3",
        text: "I've reviewed your essay and left some comments. Overall, it's looking good!",
        timestamp: "2023-05-12T16:45:00",
        isRead: false,
        attachments: [
          {
            type: "document",
            url: "#",
            name: "great_gatsby_essay_feedback.docx",
          },
        ],
      },
    ],
    lastActivity: "2023-05-12T16:45:00",
  },
]

// Mock contacts data
const contacts: Participant[] = [
  {
    id: "tutor-1",
    name: "Dr. Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    role: "tutor",
    subject: "Mathematics",
    status: "online",
  },
  {
    id: "tutor-2",
    name: "Prof. Michael Chen",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    role: "tutor",
    subject: "Computer Science",
    status: "offline",
  },
  {
    id: "tutor-3",
    name: "Emma Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    role: "tutor",
    subject: "English Literature",
    status: "online",
  },
  {
    id: "tutor-4",
    name: "Dr. James Wilson",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    role: "tutor",
    subject: "Chemistry & Biology",
    status: "offline",
  },
  {
    id: "student-2",
    name: "Jamie Lee",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    role: "student",
    status: "online",
  },
  {
    id: "student-3",
    name: "Chris Martinez",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    role: "student",
    status: "offline",
  },
]

// Get all chats for a user
export function getAllChats(userId: string): Chat[] {
  return chats
    .filter((chat) => chat.participants.some((p) => p.id === userId))
    .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
}

// Get a specific chat by ID
export function getChatById(chatId: string): Chat | undefined {
  return chats.find((chat) => chat.id === chatId)
}

// Get the other participant in a chat
export function getChatParticipant(chatId: string, userId: string): Participant | undefined {
  const chat = getChatById(chatId)
  if (!chat) return undefined
  return chat.participants.find((p) => p.id !== userId)
}

// Get available contacts for a user based on their role
export function getAvailableContacts(userId: string, userRole: string): Participant[] {
  // If user is a student, show tutors
  // If user is a tutor, show students
  return contacts.filter((contact) => {
    // Don't show the user themselves
    if (contact.id === userId) return false

    // Show contacts of the opposite role
    return userRole === "student" ? contact.role === "tutor" : contact.role === "student"
  })
}

// Create a new chat or return an existing one
export async function createChat(userId1: string, userId2: string): Promise<string> {
  // Check if a chat already exists between these users
  const existingChat = chats.find(
    (chat) => chat.participants.some((p) => p.id === userId1) && chat.participants.some((p) => p.id === userId2),
  )

  if (existingChat) {
    return existingChat.id
  }

  // In a real app, this would create a new chat in the database
  // For now, we'll just return a mock ID
  return "new-chat-id"
}

// Send a message in a chat
export async function sendMessage(chatId: string, senderId: string, text: string, files?: File[]): Promise<void> {
  const chat = getChatById(chatId)
  if (!chat) throw new Error("Chat not found")

  // In a real app, this would send the message to the server
  // For now, we'll just add it to our mock data
  const newMessage: Message = {
    id: `msg-${Date.now()}`,
    senderId,
    text,
    timestamp: new Date().toISOString(),
    isRead: false,
  }

  if (files && files.length > 0) {
    newMessage.attachments = files.map((file) => {
      let type = "document"
      if (file.type.startsWith("image/")) {
        type = "image"
      } else if (file.type === "application/pdf") {
        type = "pdf"
      }

      return {
        type,
        url: URL.createObjectURL(file), // In a real app, this would be a server URL
        name: file.name,
      }
    })
  }

  chat.messages.push(newMessage)
  chat.lastActivity = newMessage.timestamp

  // Sort chats by last activity
  chats.sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
}
