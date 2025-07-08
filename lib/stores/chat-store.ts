"use client"

import { create } from "zustand"
import { useAuthStore } from './auth-store'
import * as messagesApi from '@/lib/api/messages'
import * as userMapping from '@/lib/utils/user-mapping'

// Define message interface
export interface Message {
  id: string | number;
  sender_id: string | number;
  recipient_id: string | number;
  content: string;
  sent_at: string;  // ISO string timestamp
  is_read: boolean;
  attachments?: Array<{
    type: string;
    url: string;
    name: string;
  }>;
}

interface ChatState {
  conversations: {
    [key: number]: {
      messages: messagesApi.Message[];
      lastMessage?: messagesApi.Message;
      unreadCount: number;
    };
  };
  loadConversations: () => Promise<void>;
  sendMessage: (recipientId: number, content: string) => Promise<messagesApi.Message>;
  getConversation: (userId: number) => Promise<messagesApi.Message[]>;
  markMessageAsRead: (messageId: number) => Promise<void>;
  getUnreadCount: () => Promise<number>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: {},

  loadConversations: async () => {
    try {
      // Initialize user mappings first
      await userMapping.initializeUserMappings();

      const [received, sent] = await Promise.all([
        messagesApi.getInboxMessages(),
        messagesApi.getSentMessages()
      ]);

      const user = useAuthStore.getState().user;
      if (!user) return;

      // Combine and organize messages by conversation
      const conversations: ChatState['conversations'] = {};

      // Process all messages
      for (const message of [...received, ...sent]) {
        // Get the other user's ID based on current user's role
        const otherUserId = message.sender_id === user.id ? message.recipient_id : message.sender_id;

        // Get the appropriate ID based on the other user's role
        let conversationId = otherUserId;

        // If current user is a teacher and the other user is a student, use student ID
        if (user.role === 'teacher' && message.sender.role === 'student' ||
            user.role === 'teacher' && message.recipient.role === 'student') {
          const studentId = await userMapping.getStudentIdFromUserId(otherUserId);
          if (studentId) conversationId = studentId;
        }

        // If current user is a student and the other user is a teacher, use teacher ID
        if (user.role === 'student' && message.sender.role === 'teacher' ||
            user.role === 'student' && message.recipient.role === 'teacher') {
          const teacherId = await userMapping.getTeacherIdFromUserId(otherUserId);
          if (teacherId) conversationId = teacherId;
        }

        if (!conversations[conversationId]) {
          conversations[conversationId] = {
            messages: [],
            unreadCount: 0
          };
        }
        conversations[conversationId].messages.push(message);
        conversations[conversationId].lastMessage = message;

        // Count unread messages
        if (message.recipient_id === user.id && !message.is_read) {
          conversations[conversationId].unreadCount++;
        }
      }

      // Sort messages in each conversation by timestamp
      Object.keys(conversations).forEach(id => {
        conversations[parseInt(id)].messages.sort((a, b) =>
          new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime()
        );
      });

      set({ conversations });
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  },

  sendMessage: async (recipientId: number, content: string) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('Not authenticated');

    try {
      // Determine recipient type based on user role
      const recipientType = user.role === 'student' ? 'teacher' : 'student';

      console.log(`Sending message to ${recipientType} ID: ${recipientId}`);

      // For teachers sending to students, we need to use the student ID directly
      // For students sending to teachers, we need to use the teacher ID directly
      // The backend expects the actual student/teacher ID, not the user ID

      // We'll pass the ID as is, since the backend expects the actual student/teacher ID
      // But we'll log what's happening for debugging
      if (user.role === 'teacher' && recipientType === 'student') {
        console.log(`Teacher sending message to student ID: ${recipientId}`);
        // No conversion needed - using student ID directly
      } else if (user.role === 'student' && recipientType === 'teacher') {
        console.log(`Student sending message to teacher ID: ${recipientId}`);
        // No conversion needed - using teacher ID directly
      }

      // Log what we're sending to the backend
      console.log('Sending message to backend:', {
        content,
        recipientId,
        recipientType
      });

      const message = await messagesApi.sendMessage(content, recipientId, recipientType);

      // Log the response from the backend
      console.log('Response from backend:', message);

      // Update local state
      const { conversations } = get();
      const conversationId = recipientId; // Keep using the original ID for the conversation

      set({
        conversations: {
          ...conversations,
          [conversationId]: {
            messages: [...(conversations[conversationId]?.messages || []), message],
            lastMessage: message,
            unreadCount: conversations[conversationId]?.unreadCount || 0
          }
        }
      });

      return message;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  getConversation: async (userId: number) => {
    try {
      const user = useAuthStore.getState().user;
      if (!user) throw new Error('Not authenticated');

      // Determine user type for the conversation partner
      const userType = user.role === 'student' ? 'teacher' : 'student';

      console.log(`Getting conversation with ${userType} ID: ${userId}`);

      // For teachers viewing student conversations, we need to use the student ID directly
      // For students viewing teacher conversations, we need to use the teacher ID directly
      // The backend expects the actual student/teacher ID, not the user ID

      // We'll pass the ID as is, since the backend expects the actual student/teacher ID
      // But we'll log what's happening for debugging
      if (user.role === 'teacher' && userType === 'student') {
        console.log(`Teacher viewing conversation with student ID: ${userId}`);
        // No conversion needed - using student ID directly
      } else if (user.role === 'student' && userType === 'teacher') {
        console.log(`Student viewing conversation with teacher ID: ${userId}`);
        // No conversion needed - using teacher ID directly
      }

      // Call the API with the ID as is - the backend expects the actual student/teacher ID
      const messages = await messagesApi.getConversation(userType, userId, true);

      // Update local state
      const { conversations } = get();
      set({
        conversations: {
          ...conversations,
          [userId]: { // Keep using the original ID for the conversation
            messages,
            lastMessage: messages.length > 0 ? messages[messages.length - 1] : undefined,
            unreadCount: messages.filter(m =>
              m.recipient_id === user.id && !m.is_read
            ).length
          }
        }
      });

      return messages;
    } catch (error) {
      console.error('Error getting conversation:', error);
      throw error;
    }
  },

  markMessageAsRead: async (messageId: number) => {
    try {
      await messagesApi.markMessageAsRead(messageId);

      // Update local state
      const { conversations } = get();
      const updatedConversations = { ...conversations };

      // Find and update the message in all conversations
      Object.keys(updatedConversations).forEach(id => {
        const conv = updatedConversations[parseInt(id)];
        const messageIndex = conv.messages.findIndex(m => m.id === messageId);
        if (messageIndex !== -1) {
          conv.messages[messageIndex].is_read = true;
          conv.unreadCount = Math.max(0, conv.unreadCount - 1);
        }
      });

      set({ conversations: updatedConversations });
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  },

  getUnreadCount: async () => {
    try {
      const response = await messagesApi.getUnreadMessageCount();
      return response.total;
    } catch (error) {
      console.error('Error getting unread count:', error);
      return 0;
    }
  }
}));