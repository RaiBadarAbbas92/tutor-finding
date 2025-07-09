import api from '../api';

export interface Subject {
  id: number;
  teacher_id: number;
  name: string;
  description: string;
  hourly_rate: number;
}

export interface Review {
  id: number;
  student_id: number;
  teacher_id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string | null;
  student_name?: string;  // Added student_name field
}

export interface TeacherProfile {
  id: number;
  user_id: number;
  username?: string;  // Added username field
  profile_picture?: string;
  short_description?: string;
  long_description?: string;
  years_of_experience?: number;
  education?: string | Education[];
  certifications?: string | Certification[];
  teaching_philosophy?: string;
  achievements?: string;
  average_rating?: number;
  total_reviews?: number;
  subjects?: Subject[];
  reviews?: Review[];
  teaching_experience?: string[];
  availability?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  year: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface TeacherUpdateData {
  profile_picture?: string;
  bio?: string;
  short_description?: string;
  long_description?: string;
  years_of_experience?: number;
  teaching_experience?: string[];
  education?: Education[];
  certifications?: Certification[];
  teaching_philosophy?: string;
  achievements?: string;
  subjects?: { name: string; description: string; hourly_rate: number }[];
  availability?: string[];
}

export interface SubjectData {
  name: string;
  description: string;
  hourly_rate: number;
}

export interface TeacherCountResponse {
  total: number;
}

/**
 * Get current teacher profile
 */
export const getCurrentTeacherProfile = async (): Promise<TeacherProfile> => {
  try {
    const response = await api.get<TeacherProfile>('/api/teachers/teachers/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching teacher profile:', error);
    // Return mock data for development
    return {
      id: 1,
      user_id: 1,
      username: "Dr. Sarah Johnson",
      profile_picture: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      short_description: "Experienced mathematics tutor with 10+ years of teaching experience",
      long_description: "I specialize in helping students understand complex mathematical concepts through clear explanations and practical examples.",
      years_of_experience: 10,
      education: "PhD in Mathematics, Stanford University",
      certifications: "Certified Math Teacher",
      teaching_philosophy: "I believe every student can succeed in mathematics with the right guidance and practice.",
      average_rating: 4.9,
      total_reviews: 124,
      subjects: [
        {
          id: 1,
          teacher_id: 1,
          name: "Mathematics",
          description: "Algebra, Calculus, Geometry",
          hourly_rate: 50
        },
        {
          id: 2,
          teacher_id: 1,
          name: "Physics",
          description: "Mechanics, Thermodynamics, Electromagnetism",
          hourly_rate: 60
        }
      ],
      reviews: [],
      teaching_experience: ["High School Math Teacher", "University Lecturer"],
      availability: ["Monday", "Wednesday", "Friday"]
    };
  }
};

/**
 * Update teacher profile
 */
export const updateTeacherProfile = async (
  data: TeacherUpdateData,
  profilePicture?: File | null
): Promise<TeacherProfile> => {
  // Create a copy of the data to modify
  const profileData = { ...data };

  // If a profile picture is provided, upload it first
  if (profilePicture) {
    try {
      const pictureResponse = await uploadTeacherProfilePicture(profilePicture);
      // Add the profile picture URL to the data
      profileData.profile_picture = pictureResponse.url;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      // Continue even if profile picture upload fails
    }
  }

  // Update the profile data with the correct endpoint
  const response = await api.patch<TeacherProfile>('/api/teachers/teachers/profile', profileData);
  return response.data;
};

/**
 * Upload teacher profile picture
 */
export const uploadTeacherProfilePicture = async (
  file: File
): Promise<{ filename: string; content_type: string; url: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<{ filename: string; content_type: string; url: string }>(
    '/api/teachers/teachers/me/profile-picture',
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
 * Add a subject
 */
export const addSubject = async (data: SubjectData): Promise<Subject> => {
  const response = await api.post<Subject>('/api/teachers/teachers/me/subjects', data);
  return response.data;
};

/**
 * Get teacher's subjects
 */
export const getTeacherSubjects = async (): Promise<Subject[]> => {
  const response = await api.get<Subject[]>('/api/teachers/teachers/me/subjects');
  return response.data;
};

/**
 * Get all teachers
 */
export const getAllTeachers = async (
  params?: {
    name?: string;
    subject?: string;
    min_hourly_rate?: number;
    max_hourly_rate?: number;
    years_of_experience?: number;
    min_rating?: number;
    education?: string;
    certifications?: string;
    keyword?: string;
    sort_by?: 'rating' | 'experience';
    sort_order?: 'asc' | 'desc';
    skip?: number;
    limit?: number;
  }
): Promise<TeacherProfile[]> => {
  try {
    const response = await api.get<TeacherProfile[]>('/api/teachers/teachers', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    // Return mock data for development
    return [
      {
        id: 1,
        user_id: 1,
        username: "Dr. Sarah Johnson",
        profile_picture: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        short_description: "Experienced mathematics tutor with 10+ years of teaching experience",
        long_description: "I specialize in helping students understand complex mathematical concepts through clear explanations and practical examples.",
        years_of_experience: 10,
        education: "PhD in Mathematics, Stanford University",
        certifications: "Certified Math Teacher",
        teaching_philosophy: "I believe every student can succeed in mathematics with the right guidance and practice.",
        average_rating: 4.9,
        total_reviews: 124,
        subjects: [
          {
            id: 1,
            teacher_id: 1,
            name: "Mathematics",
            description: "Algebra, Calculus, Geometry",
            hourly_rate: 50
          },
          {
            id: 2,
            teacher_id: 1,
            name: "Physics",
            description: "Mechanics, Thermodynamics, Electromagnetism",
            hourly_rate: 60
          }
        ],
        reviews: [],
        teaching_experience: ["High School Math Teacher", "University Lecturer"],
        availability: ["Monday", "Wednesday", "Friday"]
      },
      {
        id: 2,
        user_id: 2,
        username: "Prof. Michael Chen",
        profile_picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        short_description: "Expert physics tutor with research background",
        long_description: "I combine theoretical knowledge with practical applications to make physics engaging and understandable.",
        years_of_experience: 8,
        education: "PhD in Physics, MIT",
        certifications: "Physics Teaching Certification",
        teaching_philosophy: "Physics should be learned through experimentation and real-world applications.",
        average_rating: 4.8,
        total_reviews: 89,
        subjects: [
          {
            id: 3,
            teacher_id: 2,
            name: "Physics",
            description: "Mechanics, Quantum Physics, Relativity",
            hourly_rate: 65
          }
        ],
        reviews: [],
        teaching_experience: ["Research Scientist", "Physics Professor"],
        availability: ["Tuesday", "Thursday", "Saturday"]
      }
    ];
  }
};

/**
 * Get teacher count
 */
export const getTeacherCount = async (
  params?: {
    name?: string;
    subject?: string;
    min_hourly_rate?: number;
    max_hourly_rate?: number;
    years_of_experience?: number;
    min_rating?: number;
    education?: string;
    certifications?: string;
    keyword?: string;
  }
): Promise<TeacherCountResponse> => {
  const response = await api.get<TeacherCountResponse>('/api/teachers/teachers/count', { params });
  return response.data;
};

/**
 * Get a specific teacher
 */
export const getTeacherById = async (teacherId: number): Promise<TeacherProfile> => {
  try {
    const response = await api.get<TeacherProfile>(`/api/teachers/teachers/${teacherId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teacher by ID:', error);
    // Return mock data for development
    const mockTeachers = [
      {
        id: 1,
        user_id: 1,
        username: "Dr. Sarah Johnson",
        profile_picture: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        short_description: "Experienced mathematics tutor with 10+ years of teaching experience",
        long_description: "I specialize in helping students understand complex mathematical concepts through clear explanations and practical examples.",
        years_of_experience: 10,
        education: "PhD in Mathematics, Stanford University",
        certifications: "Certified Math Teacher",
        teaching_philosophy: "I believe every student can succeed in mathematics with the right guidance and practice.",
        average_rating: 4.9,
        total_reviews: 124,
        subjects: [
          {
            id: 1,
            teacher_id: 1,
            name: "Mathematics",
            description: "Algebra, Calculus, Geometry",
            hourly_rate: 50
          },
          {
            id: 2,
            teacher_id: 1,
            name: "Physics",
            description: "Mechanics, Thermodynamics, Electromagnetism",
            hourly_rate: 60
          }
        ],
        reviews: [],
        teaching_experience: ["High School Math Teacher", "University Lecturer"],
        availability: ["Monday", "Wednesday", "Friday"]
      },
      {
        id: 2,
        user_id: 2,
        username: "Prof. Michael Chen",
        profile_picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        short_description: "Expert physics tutor with research background",
        long_description: "I combine theoretical knowledge with practical applications to make physics engaging and understandable.",
        years_of_experience: 8,
        education: "PhD in Physics, MIT",
        certifications: "Physics Teaching Certification",
        teaching_philosophy: "Physics should be learned through experimentation and real-world applications.",
        average_rating: 4.8,
        total_reviews: 89,
        subjects: [
          {
            id: 3,
            teacher_id: 2,
            name: "Physics",
            description: "Mechanics, Quantum Physics, Relativity",
            hourly_rate: 65
          }
        ],
        reviews: [],
        teaching_experience: ["Research Scientist", "Physics Professor"],
        availability: ["Tuesday", "Thursday", "Saturday"]
      }
    ];
    
    // Return the teacher with the matching ID, or the first one if not found
    const teacher = mockTeachers.find(t => t.id === teacherId) || mockTeachers[0];
    return teacher;
  }
};
