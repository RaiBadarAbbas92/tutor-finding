"use client"

import { useEffect } from "react"
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

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user)
  const router = useRouter()
  const { toast } = useToast()

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
                      <span className="text-2xl font-bold">{user?.upcomingSessions || 5}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Students</CardTitle>
                  <CardDescription>Active students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-muted-foreground mr-2" />
                      <span className="text-2xl font-bold">12</span>
                      <span className="text-sm text-muted-foreground ml-2">/ 28 total</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
                  <CardDescription>Current month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
                      <span className="text-2xl font-bold">$1,250</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Messages</CardTitle>
                  <CardDescription>Unread messages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 text-muted-foreground mr-2" />
                      <span className="text-2xl font-bold">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <Tabs defaultValue="schedule" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="earnings">Earnings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="schedule" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold">Upcoming Schedule</h2>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-muted-foreground">Your upcoming teaching schedule will appear here.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="students" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold">Your Students</h2>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-muted-foreground">Your student list will appear here.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="earnings" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold">Earnings Overview</h2>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-muted-foreground">Your earnings data will appear here.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="md:col-span-1">
                <DashboardChatPreview />
              </div>
            </div>
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
