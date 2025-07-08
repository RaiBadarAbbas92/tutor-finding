"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AuthGuard } from "@/components/auth-guard"
import { useAuthStore } from "@/lib/stores/auth-store"
import { getCurrentStudentProfile, updateStudentProfile, type StudentProfile, type StudentUpdateData } from "@/lib/api/students"
import { getCurrentTeacherProfile, updateTeacherProfile, type TeacherProfile, type TeacherUpdateData } from "@/lib/api/teachers"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"

// Union type for profile data
type ProfileData = StudentProfile | TeacherProfile

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const user = useAuthStore((state) => state.user)
  const [isTeacher, setIsTeacher] = useState(false)

  // Use separate form states for student and teacher profiles
  const studentForm = useForm<StudentUpdateData>()
  const teacherForm = useForm<TeacherUpdateData>()

  useEffect(() => {
    // Set teacher flag based on user role
    if (user?.role === 'teacher') {
      setIsTeacher(true)
    }

    const fetchProfile = async () => {
      try {
        if (user?.role === 'teacher') {
          // Fetch teacher profile
          const data = await getCurrentTeacherProfile()
          setProfile(data)

          // Pre-fill teacher form with existing data
          if (data.short_description) teacherForm.setValue('short_description', data.short_description)
          if (data.long_description) teacherForm.setValue('long_description', data.long_description)
          if (data.years_of_experience) teacherForm.setValue('years_of_experience', data.years_of_experience)
          if (data.teaching_philosophy) teacherForm.setValue('teaching_philosophy', data.teaching_philosophy)
          if (data.achievements) teacherForm.setValue('achievements', data.achievements)
          if (data.education) teacherForm.setValue('education', data.education)
          if (data.certifications) teacherForm.setValue('certifications', data.certifications)
        } else {
          // Fetch student profile
          const data = await getCurrentStudentProfile()
          setProfile(data)

          // Pre-fill student form with existing data
          Object.entries(data).forEach(([key, value]) => {
            if (value && key in data) {
              studentForm.setValue(key as keyof StudentUpdateData, value)
            }
          })
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
        toast.error('Failed to load profile')
      }
    }

    if (user) {
      fetchProfile()
    }
  }, [user, studentForm.setValue, teacherForm.setValue])

  const onStudentSubmit = async (data: StudentUpdateData) => {
    setIsLoading(true)
    try {
      const updated = await updateStudentProfile(data)
      setProfile(updated)
      toast.success('Profile updated successfully')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  const onTeacherSubmit = async (data: TeacherUpdateData) => {
    setIsLoading(true)
    try {
      const updated = await updateTeacherProfile(data)
      setProfile(updated)
      toast.success('Profile updated successfully')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-lg">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Username</p>
                <p className="text-lg">{user?.username}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Role</p>
                <p className="text-lg capitalize">{user?.role}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Member Since</p>
                <p className="text-lg">{new Date(user?.created_at || '').toLocaleDateString()}</p>
              </div>

              {/* Teacher-specific information */}
              {isTeacher && profile && 'average_rating' in profile && (
                <>
                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm font-medium mb-2">Teacher Stats</p>

                    <div className="flex items-center mb-2">
                      <span className="text-sm mr-2">Rating:</span>
                      <StarRating rating={profile.average_rating || 0} />
                      <span className="text-sm ml-1">({profile.total_reviews || 0} reviews)</span>
                    </div>

                    <div className="mb-2">
                      <span className="text-sm">Experience: </span>
                      <span className="font-medium">{profile.years_of_experience || 0} years</span>
                    </div>

                    <div>
                      <p className="text-sm mb-1">Subjects:</p>
                      <div className="flex flex-wrap gap-1">
                        {profile.subjects?.map((subject) => (
                          <Badge key={subject.id} variant="secondary">
                            {subject.name} (${subject.hourly_rate}/hr)
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Edit Profile Form - Conditional rendering based on user role */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              {isTeacher ? (
                // Teacher Profile Form
                <form onSubmit={teacherForm.handleSubmit(onTeacherSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Short Description</label>
                      <Input
                        {...teacherForm.register('short_description')}
                        placeholder="Brief professional headline"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Years of Experience</label>
                      <Input
                        {...teacherForm.register('years_of_experience', {
                          valueAsNumber: true
                        })}
                        type="number"
                        placeholder="Years of teaching experience"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Long Description</label>
                    <Textarea
                      {...teacherForm.register('long_description')}
                      placeholder="Detailed professional background"
                      className="h-32"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Teaching Philosophy</label>
                    <Textarea
                      {...teacherForm.register('teaching_philosophy')}
                      placeholder="Your approach to teaching"
                      className="h-32"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Achievements</label>
                    <Textarea
                      {...teacherForm.register('achievements')}
                      placeholder="Notable accomplishments"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Education</label>
                    <Textarea
                      {...teacherForm.register('education')}
                      placeholder="Your educational background"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Certifications</label>
                    <Textarea
                      {...teacherForm.register('certifications')}
                      placeholder="Professional certifications"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </form>
              ) : (
                // Student Profile Form
                <form onSubmit={studentForm.handleSubmit(onStudentSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Grade Level</label>
                      <Select
                        onValueChange={(value) => studentForm.setValue('grade_level', value)}
                        defaultValue={(profile as StudentProfile)?.grade_level}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade level" />
                        </SelectTrigger>
                        <SelectContent>
                          {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'].map((grade) => (
                            <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">School</label>
                      <Input {...studentForm.register('school')} placeholder="Your school name" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Major</label>
                      <Input {...studentForm.register('major')} placeholder="Your major" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Interests</label>
                      <Input {...studentForm.register('interests')} placeholder="Your interests" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <Textarea {...studentForm.register('bio')} placeholder="Tell us about yourself" className="h-32" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Learning Goals</label>
                    <Textarea {...studentForm.register('learning_goals')} placeholder="What do you want to achieve?" className="h-32" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Preferred Learning Style</label>
                    <Select
                      onValueChange={(value) => studentForm.setValue('preferred_learning_style', value)}
                      defaultValue={(profile as StudentProfile)?.preferred_learning_style}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select learning style" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          'Visual',
                          'Auditory',
                          'Reading/Writing',
                          'Kinesthetic',
                          'Mixed'
                        ].map((style) => (
                          <SelectItem key={style} value={style}>{style}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Availability</label>
                    <Textarea
                      {...studentForm.register('availability')}
                      placeholder="When are you typically available for tutoring sessions?"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  )
}