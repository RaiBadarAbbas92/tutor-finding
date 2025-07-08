"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import * as authApi from '../api/auth'
import * as teachersApi from '../api/teachers'
import * as studentsApi from '../api/students'

export interface User {
  id: number
  username: string
  email: string
  role: 'student' | 'teacher'
  created_at: string
  is_active: boolean
  // Additional frontend-specific fields
  upcomingSessions?: number
  completedSessions?: number
  favoriteTutors?: number[]
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (username: string, password: string) => Promise<void>
  register: (email: string, username: string, password: string, role: 'student' | 'teacher') => Promise<void>
  logout: () => void
  updateUser: (user: Partial<User>) => void
  fetchUserProfile: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null })

        try {
          // Call the login API
          const authResponse = await authApi.login({ username, password })

          // Store the token
          set({ token: authResponse.access_token })

          // Fetch the user profile
          await get().fetchUserProfile()

          set({ isAuthenticated: true, isLoading: false })
        } catch (error) {
          console.error('Login error:', error)
          set({
            error: error instanceof Error ? error.message : 'Failed to login',
            isLoading: false
          })
          throw error
        }
      },

      register: async (email: string, username: string, password: string, role: 'student' | 'teacher') => {
        set({ isLoading: true, error: null })

        try {
          // Call the register API
          const userResponse = await authApi.register({ email, username, password, role })

          // After registration, login the user
          await get().login(username, password)

          set({ isLoading: false })
        } catch (error) {
          console.error('Registration error:', error)
          set({
            error: error instanceof Error ? error.message : 'Failed to register',
            isLoading: false
          })
          throw error
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },

      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      fetchUserProfile: async () => {
        try {
          // Get the current user from the API
          const userResponse = await authApi.getCurrentUser()

          // Create a user object with the API response
          const user: User = {
            id: userResponse.id,
            username: userResponse.username,
            email: userResponse.email,
            role: userResponse.role,
            created_at: userResponse.created_at,
            is_active: userResponse.is_active,
            upcomingSessions: 0,
            completedSessions: 0,
            favoriteTutors: [],
          }

          // If the user is a student or teacher, fetch additional profile info
          if (userResponse.role === 'student') {
            try {
              const studentProfile = await studentsApi.getCurrentStudentProfile()
              // You could add more student-specific data here
            } catch (error) {
              console.error('Error fetching student profile:', error)
            }
          } else if (userResponse.role === 'teacher') {
            try {
              const teacherProfile = await teachersApi.getCurrentTeacherProfile()
              // You could add more teacher-specific data here
            } catch (error) {
              console.error('Error fetching teacher profile:', error)
            }
          }

          set({ user })
        } catch (error) {
          console.error('Error fetching user profile:', error)
          throw error
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      }),
    },
  ),
)
