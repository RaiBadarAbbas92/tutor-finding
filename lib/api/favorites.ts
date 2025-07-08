import api from '../api';
import { TeacherProfile } from './teachers';

export interface Favorite {
  id: number;
  student_id: number;
  teacher_id: number;
  added_at: string;
  teacher: TeacherProfile;
}

export interface FavoriteData {
  teacher_id: number;
}

/**
 * Add a teacher to favorites
 */
export const addFavoriteTeacher = async (data: FavoriteData): Promise<Favorite> => {
  const response = await api.post<Favorite>('/api/favorites/', data);
  return response.data;
};

/**
 * Get all favorite teachers
 */
export const getFavoriteTeachers = async (): Promise<Favorite[]> => {
  const response = await api.get<Favorite[]>('/api/favorites/');
  return response.data;
};

/**
 * Remove a teacher from favorites
 */
export const removeFavoriteTeacher = async (teacherId: number): Promise<void> => {
  await api.delete(`/api/favorites/${teacherId}`);
};
