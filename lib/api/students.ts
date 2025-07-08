import api from '../api';

export interface StudentProfile {
  id: number;
  user_id: number;
  profile_picture?: string;
  grade_level?: string;
  interests?: string;
  bio?: string;
  school?: string;
  major?: string;
  learning_goals?: string;
  preferred_learning_style?: string;
  availability?: string;
}

export interface StudentUpdateData {
  grade_level?: string;
  interests?: string;
  bio?: string;
  school?: string;
  major?: string;
  learning_goals?: string;
  preferred_learning_style?: string;
  availability?: string;
}

export interface StudentCountResponse {
  total: number;
}

/**
 * Get current student profile
 */
export const getCurrentStudentProfile = async (): Promise<StudentProfile> => {
  try {
    const response = await api.get<StudentProfile>('/api/students/students/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching student profile:', error);
    throw new Error('Failed to fetch student profile. Please check if the backend server is running.');
  }
};

/**
 * Update student profile
 */
export const updateStudentProfile = async (
  data: StudentUpdateData
): Promise<StudentProfile> => {
  const response = await api.patch<StudentProfile>('/api/students/me', data);
  return response.data;
};

/**
 * Upload student profile picture
 */
export const uploadStudentProfilePicture = async (
  file: File
): Promise<{ filename: string; content_type: string; url: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<{ filename: string; content_type: string; url: string }>(
    '/api/students/students/me/profile-picture',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

/**
 * Get all students
 */
export const getAllStudents = async (
  params?: {
    skip?: number;
    limit?: number;
  }
): Promise<StudentProfile[]> => {
  try {
    const response = await api.get<StudentProfile[]>('/api/students/students', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw new Error('Failed to fetch students. Please check if the backend server is running.');
  }
};

/**
 * Get student count
 */
export const getStudentCount = async (): Promise<StudentCountResponse> => {
  const response = await api.get<StudentCountResponse>('/api/students/students/count');
  return response.data;
};

/**
 * Get a specific student
 */
export const getStudentById = async (studentId: number): Promise<StudentProfile> => {
  const response = await api.get<StudentProfile>(`/api/students/students/${studentId}`);
  return response.data;
};
