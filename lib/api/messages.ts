import api from './api';

export interface User {
  id: number;
  email: string;
  username: string;
  role: string;
}

export interface Message {
  id: number;
  sender_id: number;
  recipient_id: number;
  content: string;
  sent_at: string;
  is_read: boolean;
  sender: User;
  recipient: User;
}

export interface UnreadCountResponse {
  total: number;
}

/**
 * Send a new message
 */
export const sendMessage = async (content: string, recipientId: number, recipientType: 'student' | 'teacher'): Promise<Message> => {
  // Create JSON payload instead of FormData
  const jsonData = {
    content,
    [`${recipientType}_id`]: recipientId
  };

  // Log the request details
  console.log('API Request Details:', {
    endpoint: '/api/messages/messages/send',
    method: 'POST',
    jsonData
  });

  try {
    const response = await api.post<Message>('/api/messages/messages/send', jsonData);

    // Log the raw response
    console.log('API Raw Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    });

    return response.data;
  } catch (error) {
    // Log any errors
    console.error('API Error:', error);

    // Rethrow the error to be handled by the caller
    throw error;
  }
};

/**
 * Get inbox messages
 */
export const getInboxMessages = async (): Promise<Message[]> => {
  // Log the request details
  console.log('API Request Details (Get Inbox Messages):', {
    endpoint: '/api/messages/messages/inbox',
    method: 'GET'
  });

  try {
    const response = await api.get<Message[]>('/api/messages/messages/inbox');

    // Log the raw response
    console.log('API Raw Response (Get Inbox Messages):', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    });

    return response.data;
  } catch (error: any) {
    // Log any errors
    console.error('API Error (Get Inbox Messages):', error);
    
    // Provide a helpful error message
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Unable to connect to the messages server. Please check if the backend server is running.');
    }
    
    // Rethrow the error to be handled by the caller
    throw error;
  }
};

/**
 * Get sent messages
 */
export const getSentMessages = async (): Promise<Message[]> => {
  // Log the request details
  console.log('API Request Details (Get Sent Messages):', {
    endpoint: '/api/messages/messages/sent',
    method: 'GET'
  });

  try {
    const response = await api.get<Message[]>('/api/messages/messages/sent');

    // Log the raw response
    console.log('API Raw Response (Get Sent Messages):', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    });

    return response.data;
  } catch (error: any) {
    // Log any errors
    console.error('API Error (Get Sent Messages):', error);
    
    // Provide a helpful error message
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Unable to connect to the messages server. Please check if the backend server is running.');
    }

    // Rethrow the error to be handled by the caller
    throw error;
  }
};

/**
 * Get conversation with a specific user
 */
export const getConversation = async (userType: 'student' | 'teacher', userId: number, isActualId: boolean = false): Promise<Message[]> => {
  // Log the request details
  console.log('API Request Details (Get Conversation):', {
    endpoint: `/api/messages/messages/conversation/${userType}/${userId}`,
    method: 'GET',
    params: {
      userType,
      userId,
      isActualId
    }
  });

  try {
    // Make sure we're using the correct endpoint format
    const response = await api.get<Message[]>(`/api/messages/messages/conversation/${userType}/${userId}`);

    // Log the raw response
    console.log('API Raw Response (Get Conversation):', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    });

    return response.data;
  } catch (error) {
    // Log any errors
    console.error('API Error (Get Conversation):', error);

    // Rethrow the error to be handled by the caller
    throw error;
  }
};

/**
 * Mark message as read
 */
export const markMessageAsRead = async (messageId: number): Promise<Message> => {
  // Log the request details
  console.log('API Request Details (Mark Message as Read):', {
    endpoint: `/api/messages/messages/${messageId}/read`,
    method: 'PATCH'
  });

  try {
    const response = await api.patch<Message>(`/api/messages/messages/${messageId}/read`, {});

    // Log the raw response
    console.log('API Raw Response (Mark Message as Read):', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    });

    return response.data;
  } catch (error) {
    // Log any errors
    console.error('API Error (Mark Message as Read):', error);

    // Rethrow the error to be handled by the caller
    throw error;
  }
};

/**
 * Get unread message count
 */
export const getUnreadMessageCount = async (): Promise<UnreadCountResponse> => {
  // Log the request details
  console.log('API Request Details (Get Unread Message Count):', {
    endpoint: '/api/messages/messages/unread/count',
    method: 'GET'
  });

  try {
    const response = await api.get<UnreadCountResponse>('/api/messages/messages/unread/count');

    // Log the raw response
    console.log('API Raw Response (Get Unread Message Count):', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    });

    return response.data;
  } catch (error) {
    // Log any errors
    console.error('API Error (Get Unread Message Count):', error);

    // Rethrow the error to be handled by the caller
    throw error;
  }
};

/**
 * Delete a message
 */
export const deleteMessage = async (messageId: number): Promise<void> => {
  // Log the request details
  console.log('API Request Details (Delete Message):', {
    endpoint: `/api/messages/messages/${messageId}`,
    method: 'DELETE'
  });

  try {
    const response = await api.delete(`/api/messages/messages/${messageId}`);

    // Log the raw response
    console.log('API Raw Response (Delete Message):', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  } catch (error) {
    // Log any errors
    console.error('API Error (Delete Message):', error);

    // Rethrow the error to be handled by the caller
    throw error;
  }
};