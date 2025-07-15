"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UpcomingLessons } from "@/components/upcoming-lessons"
import { PastLessons } from "@/components/past-lessons"
import { FavoriteTutors } from "@/components/favorite-tutors"
import { DashboardChatPreview } from "@/components/dashboard-chat-preview"
import { AuthGuard } from "@/components/auth-guard"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, DollarSign, Users, MessageSquare } from "lucide-react"
import { getCurrentTeacherProfile, TeacherProfile } from "@/lib/api/teachers"
import { getTeacherMeetings } from "@/lib/api/meetings"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user)
  const router = useRouter()
  const { toast } = useToast()

  const [tutorData, setTutorData] = useState<TeacherProfile | null>(null)
  const [upcomingSessions, setUpcomingSessions] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [meetings, setMeetings] = useState([])

  useEffect(() => {
    if (!user) return;
    if (user.role === "teacher") {
      getCurrentTeacherProfile()
        .then(setTutorData)
        .catch(() => setError("Failed to load profile"))
      getTeacherMeetings({ status: "pending" })
        .then(meetings => {
          setUpcomingSessions(meetings.length)
          setMeetings(meetings)
        })
        .catch(() => {
          setUpcomingSessions(0)
          setMeetings([])
        })
      setLoading(false)
    }
  }, [user])

  // Check if teacher has completed their profile
  useEffect(() => {
    if (!user) return;

    if (user.role === "teacher") {
      const checkTeacherProfile = async () => {
        try {
          // Check if teacher has completed their profile
          const teacherProfile = await import('@/lib/api/teachers').then(module => module.getCurrentTeacherProfile())

          // If the teacher has no subjects or no teaching philosophy, they need to complete onboarding
          if (!teacherProfile.subjects || teacherProfile.subjects.length === 0 ||
              !teacherProfile.teaching_philosophy) {
            toast({
              title: "Complete Your Profile",
              description: "Please complete your teacher profile to start tutoring.",
            })
            router.push("/teacher-onboarding")
          }
          // If profile is complete, stay on dashboard (will show teacher content)
        } catch (error) {
          console.error('Error checking teacher profile:', error)
          // If there's an error fetching the profile, redirect to onboarding
          router.push("/teacher-onboarding")
        }
      }

      checkTeacherProfile()
    }
  }, [user, router, toast])

  // Show loading state while user data is being fetched
  if (!user) {
    return (
      <AuthGuard>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        {user.role === "teacher" ? (
          // Teacher Dashboard Content
          <>
            <h1 className="text-3xl font-bold mb-8">Teacher Dashboard</h1>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : tutorData && (
              <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={tutorData.profile_picture || "/placeholder.svg"} alt={tutorData.username || "Tutor"} />
                      <AvatarFallback>{(tutorData.username || "T").charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-3xl font-bold">{tutorData.username || "Tutor"}</h1>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="ml-1 text-sm">{tutorData.average_rating?.toFixed(1) || "-"}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({tutorData.total_reviews || 0} reviews)</span>
                        <span className="ml-2 px-2 py-1 border rounded text-xs">Tutor</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                      <CardDescription>Scheduled lessons</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                          <span className="text-2xl font-bold">{upcomingSessions}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {/* Chat Now Card for Teacher Dashboard */}
                  <div className="col-span-1">
                    <DashboardChatPreview />
                  </div>
                </div>

                {/* Teacher Profile Details Section */}
                <div className="bg-white rounded-xl shadow p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-primary">Profile Details</h2>
                  <div className="mb-2 text-lg font-semibold">{tutorData.short_description}</div>
                  <div className="mb-4 text-muted-foreground whitespace-pre-line">{tutorData.long_description}</div>
                  <div className="mb-4"><span className="font-semibold">Years of Experience:</span> {tutorData.years_of_experience}</div>
                  <div className="mb-4"><span className="font-semibold">Teaching Philosophy:</span> {tutorData.teaching_philosophy}</div>
                  {tutorData.achievements && (
                    <div className="mb-4"><span className="font-semibold">Achievements:</span> {tutorData.achievements}</div>
                  )}
                  <div className="mb-4">
                    <span className="font-semibold">Education:</span>
                    <ul className="list-disc ml-6">
                      {Array.isArray(tutorData.education) && tutorData.education.map((edu, idx) => (
                        <li key={idx}>{edu.degree} in {edu.field}, {edu.institution} ({edu.year})</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <span className="font-semibold">Certifications:</span>
                    <ul className="list-disc ml-6">
                      {Array.isArray(tutorData.certifications) && tutorData.certifications.map((cert, idx) => (
                        <li key={idx}>{cert.name} - {cert.issuer} ({cert.year})</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <span className="font-semibold">Subjects & Rates:</span>
                    <ul className="list-disc ml-6">
                      {Array.isArray(tutorData.subjects) && tutorData.subjects.map((subj, idx) => (
                        <li key={idx}>{subj.name} - ${subj.hourly_rate}/hr <span className="text-muted-foreground">({subj.description})</span></li>
                      ))}
                    </ul>
                  </div>
                  {tutorData.reviews && tutorData.reviews.length > 0 && (
                    <div className="mb-4">
                      <span className="font-semibold">Reviews:</span>
                      <ul className="list-disc ml-6">
                        {tutorData.reviews.map((review, idx) => (
                          <li key={idx}><span className="font-semibold">Rating:</span> {review.rating} - {review.comment}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Teacher Sessions Section */}
                <div className="bg-white rounded-xl shadow p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-primary">Upcoming Sessions</h2>
                  {meetings.length === 0 ? (
                    <div className="text-muted-foreground">No upcoming sessions found.</div>
                  ) : (
                    <ul className="divide-y">
                      {meetings.map((meeting, idx) => (
                        <li key={meeting.id} className="py-4">
                          <div className="font-semibold text-lg mb-1">{meeting.title}</div>
                          <div className="mb-1 text-muted-foreground">{meeting.description}</div>
                          <div className="mb-1"><span className="font-semibold">Subject:</span> {meeting.subject?.name || '-'}</div>
                          <div className="mb-1"><span className="font-semibold">Start:</span> {new Date(meeting.start_time).toLocaleString()}</div>
                          <div className="mb-1"><span className="font-semibold">End:</span> {new Date(meeting.end_time).toLocaleString()}</div>
                          <div className="mb-1"><span className="font-semibold">Meeting Link:</span> {meeting.meeting_link || '-'}</div>
                          <div className="mb-1"><span className="font-semibold">Location:</span> {meeting.location || '-'}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          // Student Dashboard Content
          <>
            <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled lessons</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{user?.upcomingSessions || 0}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Completed Sessions</CardTitle>
                  <CardDescription>Total lessons taken</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{user?.completedSessions || 0}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Favorite Tutors</CardTitle>
                  <CardDescription>Tutors you've saved</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{user?.favoriteTutors?.length || 0}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <Tabs defaultValue="upcoming">
                  <TabsList className="mb-4">
                    <TabsTrigger value="upcoming">Upcoming Lessons</TabsTrigger>
                    <TabsTrigger value="past">Past Lessons</TabsTrigger>
                    <TabsTrigger value="favorites">Favorite Tutors</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming">
                    <UpcomingLessons userId={user?.id?.toString() || ''} />
                  </TabsContent>

                  <TabsContent value="past">
                    <PastLessons userId={user?.id?.toString() || ''} />
                  </TabsContent>

                  <TabsContent value="favorites">
                    <FavoriteTutors userId={user?.id?.toString() || ''} />
                  </TabsContent>
                </Tabs>
              </div>

              <div className="md:col-span-1">
                <DashboardChatPreview />
              </div>
            </div>
          </>
        )}
      </div>
    </AuthGuard>
  )
}
