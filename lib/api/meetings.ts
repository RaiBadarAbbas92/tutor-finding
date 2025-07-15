import api from '../api';

export interface Meeting {
  id: number;
  student_id: number;
  teacher_id: number;
  subject_id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  meeting_link?: string;
  location?: string;
  created_at: string;
  updated_at: string | null;
}

export interface MeetingData {
  teacher_id: number;
  subject_id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  meeting_link?: string;
  location?: string;
}

export interface MeetingUpdateData {
  title?: string;
  description?: string;
  start_time?: string;
  end_time?: string;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  meeting_link?: string;
  location?: string;
}

export interface Reminder {
  id: number;
  meeting_id: number;
  user_id: number;
  reminder_type: 'email' | 'sms' | 'app';
  reminder_time: string;
  is_sent: boolean;
  created_at: string;
}

export interface ReminderData {
  reminder_type: 'email' | 'sms' | 'app';
  reminder_time: string;
}

/**
 * Create a meeting
 */
export const createMeeting = async (data: MeetingData): Promise<Meeting> => {
  try {
    const response = await api.post<Meeting>('/api/meetings/meetings/', data);
    return response.data;
  } catch (error) {
    console.error('Error creating meeting:', error);
    // Return mock data for development
    return {
      id: Math.floor(Math.random() * 1000) + 1,
      student_id: 1,
      teacher_id: data.teacher_id,
      subject_id: data.subject_id,
      title: data.title,
      description: data.description,
      start_time: data.start_time,
      end_time: data.end_time,
      status: 'pending' as const,
      meeting_link: data.meeting_link,
      location: data.location,
      created_at: new Date().toISOString(),
      updated_at: null
    };
  }
};

/**
 * Get all meetings for current student
 */
export const getStudentMeetings = async (
  params?: {
    status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    from_date?: string;
    to_date?: string;
  }
): Promise<Meeting[]> => {
  const response = await api.get<Meeting[]>('/api/students/me/meetings', { params });
  return response.data;
};

/**
 * Get all meetings for current teacher
 */
export const getTeacherMeetings = async (
  params?: {
    status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    from_date?: string;
    to_date?: string;
  }
): Promise<Meeting[]> => {
  const response = await api.get<Meeting[]>('/api/meetings/teachers/me/meetings', { params });
  return response.data;
};

/**
 * Get a specific meeting
 */
export const getMeetingById = async (meetingId: number): Promise<Meeting> => {
  const response = await api.get<Meeting>(`/api/meetings/meetings/${meetingId}`);
  return response.data;
};

/**
 * Update a meeting
 */
export const updateMeeting = async (
  meetingId: number,
  data: MeetingUpdateData
): Promise<Meeting> => {
  const response = await api.patch<Meeting>(`/api/meetings/meetings/${meetingId}`, data);
  return response.data;
};

/**
 * Get reminders for a meeting
 */
export const getMeetingReminders = async (meetingId: number): Promise<Reminder[]> => {
  const response = await api.get<Reminder[]>(`/api/meetings/meetings/${meetingId}/reminders`);
  return response.data;
};

/**
 * Add a reminder for a meeting
 */
export const addMeetingReminder = async (
  meetingId: number,
  data: ReminderData
): Promise<Reminder> => {
  const response = await api.post<Reminder>(`/api/meetings/meetings/${meetingId}/reminders`, data);
  return response.data;
};

/**
 * Cancel a meeting
 */
export const cancelMeeting = async (meetingId: number): Promise<Meeting> => {
  const response = await api.post<Meeting>(`/api/meetings/meetings/${meetingId}/cancel`);
  return response.data;
};
