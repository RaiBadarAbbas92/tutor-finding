"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTeacherOnboardingStore } from "@/lib/stores/teacher-onboarding-store"
import { TeacherOnboardingLayout } from "@/components/teacher-onboarding-layout"
import { BasicInfoStep } from "./steps/basic-info"
import { ExperienceStep } from "./steps/experience"
import { EducationStep } from "./steps/education"
import { CertificationsStep } from "./steps/certifications"
import { TeachingDetailsStep } from "./steps/teaching-details"
import { SubjectsStep } from "./steps/subjects"
import { AvailabilityStep } from "./steps/availability"
import { ReviewStep } from "./steps/review"
import { updateTeacherProfile } from "@/lib/api/teachers"
import { useToast } from "@/components/ui/use-toast"
import { useAuthStore } from "@/lib/stores/auth-store"

export default function TeacherOnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const user = useAuthStore((state) => state.user)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    currentStep,
    nextStep,
    previousStep,
    getProfileData,
    profile_picture,
    reset
  } = useTeacherOnboardingStore()

  // Redirect if not logged in or not a teacher
  useEffect(() => {
    const checkUser = async () => {
      if (!user) {
        router.push('/login')
        return
      }

      if (user.role !== 'teacher') {
        router.push('/dashboard')
        return
      }

      try {
        // Check if teacher has already completed their profile
        const teacherProfile = await import('@/lib/api/teachers').then(module => module.getCurrentTeacherProfile())

        // If the teacher already has subjects and teaching philosophy, they've completed onboarding
        if (teacherProfile.subjects &&
            teacherProfile.subjects.length > 0 &&
            teacherProfile.teaching_philosophy &&
            currentStep === 1) { // Only redirect if they're on step 1 (just started)

          toast({
            title: "Profile Already Complete",
            description: "You've already completed your teacher profile. You can edit it here or go to your dashboard.",
          })
        }
      } catch (error) {
        console.error('Error checking teacher profile:', error)
        // If there's an error, we'll let them continue with onboarding
      }
    }

    checkUser()
  }, [user, router, currentStep, toast])

  const TOTAL_STEPS = 8

  const handleNext = () => {
    if (currentStep === TOTAL_STEPS) {
      handleSubmit()
    } else {
      nextStep()
    }
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      // Get profile data
      const profileData = getProfileData()

      // Extract subjects from profile data to handle separately
      const { subjects, ...teacherProfileData } = profileData

      // Set bio to match long_description if not provided
      if (!teacherProfileData.bio && teacherProfileData.long_description) {
        teacherProfileData.bio = teacherProfileData.long_description
      }

      // Submit profile data to API
      await updateTeacherProfile(teacherProfileData, profile_picture)

      // Add subjects one by one
      if (subjects && subjects.length > 0) {
        const addSubjectPromises = subjects.map(subject =>
          import('@/lib/api/teachers').then(module => module.addSubject(subject))
        )

        try {
          await Promise.all(addSubjectPromises)
        } catch (subjectError) {
          console.error('Error adding subjects:', subjectError)
          // Continue even if some subjects fail to add
        }
      }

      // Show success message
      toast({
        title: "Profile Updated",
        description: "Your teacher profile has been successfully updated.",
        variant: "default",
      })

      // Reset form
      reset()

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: "Error",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep />
      case 2:
        return <ExperienceStep />
      case 3:
        return <EducationStep />
      case 4:
        return <CertificationsStep />
      case 5:
        return <TeachingDetailsStep />
      case 6:
        return <SubjectsStep />
      case 7:
        return <AvailabilityStep />
      case 8:
        return <ReviewStep />
      default:
        return <BasicInfoStep />
    }
  }

  // Determine if the next button should be disabled
  const isNextDisabled = () => {
    // Add validation logic here if needed
    return isSubmitting
  }

  return (
    <TeacherOnboardingLayout
      currentStep={currentStep}
      totalSteps={TOTAL_STEPS}
      onNext={handleNext}
      onPrevious={previousStep}
      isNextDisabled={isNextDisabled()}
      isComplete={currentStep === TOTAL_STEPS}
    >
      {renderStep()}
    </TeacherOnboardingLayout>
  )
}
