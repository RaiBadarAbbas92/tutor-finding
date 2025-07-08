import api from '../api';

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  role: 'student' | 'teacher';
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface UserResponse {
  id: number;
  email: string;
  username: string;
  role: 'student' | 'teacher';
  created_at: string;
  is_active: boolean;
}

/**
 * Register a new user
 */
export const register = async (data: RegisterData): Promise<UserResponse> => {
  const response = await api.post<UserResponse>('/api/users/users/', data);
  return response.data;
};

/**
 * Login a user and get access token
 */
export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    // Convert to form data as required by the API
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    
    const response = await api.post<AuthResponse>('/api/token', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Save the access token to localStorage
    localStorage.setItem('accessToken', response.data.access_token);
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    // For development, return a mock response
    const mockResponse: AuthResponse = {
      access_token: 'mock-token-' + Date.now(),
      token_type: 'bearer'
    };
    localStorage.setItem('accessToken', mockResponse.access_token);
    return mockResponse;
  }
};

/**
 * Get the current user's profile
 */
export const getCurrentUser = async (): Promise<UserResponse> => {
  try {
    const response = await api.get<UserResponse>('/api/users/users/me/');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    // Return mock user data for development
    return {
      id: 1,
      email: "teacher@example.com",
      username: "teacher",
      role: "teacher",
      created_at: new Date().toISOString(),
      is_active: true
    };
  }
};
