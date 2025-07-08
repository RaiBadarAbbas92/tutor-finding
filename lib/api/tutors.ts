import api from './api';

export interface TutorProfile {
  id: number;
  user_id: number;
  profile_picture?: string;
  bio?: string;
  subjects: string[];
  hourly_rate: number;
  education: {
    institution: string;
    degree: string;
    field: string;
    year: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    year: string;
  }[];
  teaching_experience?: string;
  availability?: string;
}

export interface TutorUpdateData {
  bio?: string;
  subjects?: string[];
  hourly_rate?: number;
  education?: {
    institution: string;
    degree: string;
    field: string;
    year: string;
  }[];
  certifications?: {
    name: string;
    issuer: string;
    year: string;
  }[];
  teaching_experience?: string;
  availability?: string;
}

/**
 * Get a specific tutor
 */
export const getTutorById = async (tutorId: number): Promise<TutorProfile> => {
  const response = await api.get<TutorProfile>(`/api/teachers/teachers/${tutorId}`);
  return response.data;
}; 