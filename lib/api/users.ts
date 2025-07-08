import api from './api';
import { UserResponse } from './auth';

export interface UserUpdateData {
  email?: string;
  username?: string;
  password?: string;
  is_active?: boolean;
}

export interface UserCountResponse {
  total: number;
}

export interface User {
  email: string;
  username: string;
  role: 'student' | 'teacher';
  id: number;
  created_at: string;
  is_active: boolean;
}

/**
 * Get all users
 */
export const getUsers = async (skip: number = 0, limit: number = 100): Promise<User[]> => {
  const response = await api.get<User[]>(`/api/users/users/?skip=${skip}&limit=${limit}`);
  return response.data;
};

/**
 * Get a user by ID
 */
export const getUserById = async (userId: number): Promise<UserResponse> => {
  const response = await api.get<UserResponse>(`/api/users/${userId}`);
  return response.data;
};

/**
 * Update a user
 */
export const updateUser = async (
  userId: number,
  data: UserUpdateData
): Promise<UserResponse> => {
  const response = await api.patch<UserResponse>(`/api/users/${userId}`, data);
  return response.data;
};

/**
 * Delete a user
 */
export const deleteUser = async (userId: number): Promise<void> => {
  await api.delete(`/api/users/${userId}`);
};

/**
 * Get user count
 */
export const getUserCount = async (
  params?: {
    role?: 'student' | 'teacher';
  }
): Promise<UserCountResponse> => {
  const response = await api.get<UserCountResponse>('/api/users/count', { params });
  return response.data;
};
