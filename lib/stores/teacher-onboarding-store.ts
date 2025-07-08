import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Education {
  institution: string
  degree: string
  field: string
  year: string
}

export interface Certification {
  name: string
  issuer: string
  year: string
}

export interface TeacherOnboardingState {
  // Basic Info
  profile_picture: File | null
  short_description: string
  long_description: string

  // Experience
  years_of_experience: number
  teaching_experience: string[]
  achievements: string

  // Education & Certifications
  education: Education[]
  certifications: Certification[]

  // Teaching Details
  teaching_philosophy: string
  subjects: { name: string; description: string; hourly_rate: number }[]

  // Availability
  availability: string[]

  // Current step
  currentStep: number

  // Actions
  setProfilePicture: (profile_picture: File | null) => void
  setShortDescription: (short_description: string) => void
  setLongDescription: (long_description: string) => void
  setYearsOfExperience: (years: number) => void
  setTeachingExperience: (experience: string[]) => void
  setAchievements: (achievements: string) => void
  setEducation: (education: Education[]) => void
  addEducation: (education: Education) => void
  removeEducation: (index: number) => void
  setCertifications: (certifications: Certification[]) => void
  addCertification: (certification: Certification) => void
  removeCertification: (index: number) => void
  setTeachingPhilosophy: (philosophy: string) => void
  setSubjects: (subjects: { name: string; description: string; hourly_rate: number }[]) => void
  addSubject: (subject: { name: string; description: string; hourly_rate: number }) => void
  removeSubject: (index: number) => void
  setAvailability: (availability: string[]) => void
  setCurrentStep: (step: number) => void
  nextStep: () => void
  previousStep: () => void
  reset: () => void

  // Form submission
  getFormData: () => FormData
  getProfileData: () => any
}

const initialState = {
  profile_picture: null,
  short_description: "",
  long_description: "",
  years_of_experience: 0,
  teaching_experience: [],
  achievements: "",
  education: [],
  certifications: [],
  teaching_philosophy: "",
  subjects: [],
  availability: [],
  currentStep: 1,
}

export const useTeacherOnboardingStore = create<TeacherOnboardingState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setProfilePicture: (profile_picture) => set({ profile_picture }),
      setShortDescription: (short_description) => set({ short_description }),
      setLongDescription: (long_description) => set({ long_description }),
      setYearsOfExperience: (years_of_experience) => set({ years_of_experience }),
      setTeachingExperience: (teaching_experience) => set({ teaching_experience }),
      setAchievements: (achievements) => set({ achievements }),

      setEducation: (education) => set({ education }),
      addEducation: (education) => set((state) => ({
        education: [...state.education, education]
      })),
      removeEducation: (index) => set((state) => ({
        education: state.education.filter((_, i) => i !== index)
      })),

      setCertifications: (certifications) => set({ certifications }),
      addCertification: (certification) => set((state) => ({
        certifications: [...state.certifications, certification]
      })),
      removeCertification: (index) => set((state) => ({
        certifications: state.certifications.filter((_, i) => i !== index)
      })),

      setTeachingPhilosophy: (teaching_philosophy) => set({ teaching_philosophy }),

      setSubjects: (subjects) => set({ subjects }),
      addSubject: (subject) => set((state) => ({
        subjects: [...state.subjects, subject]
      })),
      removeSubject: (index) => set((state) => ({
        subjects: state.subjects.filter((_, i) => i !== index)
      })),

      setAvailability: (availability) => set({ availability }),

      setCurrentStep: (currentStep) => set({ currentStep }),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      previousStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),

      reset: () => set(initialState),

      getFormData: () => {
        const state = get()
        const formData = new FormData()

        // Add profile picture as is
        if (state.profile_picture) {
          formData.append('profile_picture', state.profile_picture)
        }

        // Add other fields as JSON
        const profileData = {
          bio: state.long_description, // Use long_description as bio
          short_description: state.short_description,
          long_description: state.long_description,
          years_of_experience: state.years_of_experience,
          teaching_experience: state.teaching_experience,
          achievements: state.achievements,
          education: state.education,
          certifications: state.certifications,
          teaching_philosophy: state.teaching_philosophy,
          subjects: state.subjects,
          availability: state.availability,
        }

        formData.append('data', JSON.stringify(profileData))

        return formData
      },

      getProfileData: () => {
        const state = get()

        return {
          bio: state.long_description, // Use long_description as bio
          short_description: state.short_description,
          long_description: state.long_description,
          years_of_experience: state.years_of_experience,
          teaching_experience: state.teaching_experience,
          achievements: state.achievements,
          education: state.education,
          certifications: state.certifications,
          teaching_philosophy: state.teaching_philosophy,
          subjects: state.subjects,
          availability: state.availability,
        }
      }
    }),
    {
      name: "teacher-onboarding-storage",
      partialize: (state) => ({
        profile_picture: null, // Don't persist the file
        short_description: state.short_description,
        long_description: state.long_description,
        years_of_experience: state.years_of_experience,
        teaching_experience: state.teaching_experience,
        achievements: state.achievements,
        education: state.education,
        certifications: state.certifications,
        teaching_philosophy: state.teaching_philosophy,
        subjects: state.subjects,
        availability: state.availability,
        currentStep: state.currentStep,
      }),
    }
  )
)
