"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, DollarSign, Users, MessageSquare, Star } from "lucide-react"
import { TutorStudentList } from "@/components/tutor-student-list"
import { TutorSchedule } from "@/components/tutor-schedule"
import { TutorEarnings } from "@/components/tutor-earnings"
import { DashboardChatPreview } from "@/components/dashboard-chat-preview"
import { AuthGuard } from "@/components/auth-guard"
import { useAuthStore } from "@/lib/stores/auth-store"
import { getCurrentTeacherProfile, TeacherProfile } from "@/lib/api/teachers"
import { getTeacherMeetings } from "@/lib/api/meetings"

export default function TutorDashboardPage() {
  const user = useAuthStore((state) => state.user)
  const router = useRouter()

  const [tutorData, setTutorData] = useState<TeacherProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [upcomingSessions, setUpcomingSessions] = useState<number>(0)

  useEffect(() => {
    if (user && user.role === "teacher") {
      getCurrentTeacherProfile()
        .then(setTutorData)
        .catch(() => setError("Failed to load profile"))
        .finally(() => setLoading(false))
      getTeacherMeetings({ status: "pending" })
        .then(meetings => setUpcomingSessions(meetings.length))
        .catch(() => setUpcomingSessions(0))
    } else {
      setLoading(false)
    }
  }, [user])

  // Redirect if user is not a teacher
  useEffect(() => {
    if (user && user.role !== "teacher") {
      router.replace("/dashboard")
    }
  }, [user, router])

  if (!user) {
    return null // AuthGuard will handle the loading state
  }

  if (user.role !== "teacher") {
    return null // Will be redirected by useEffect
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>
  }

  if (error || !tutorData) {
    return <div className="container mx-auto px-4 py-16 text-center">{error || "No data found"}</div>
  }

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
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
              <Badge variant="outline" className="ml-2">Tutor</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/tutor-dashboard/profile">Edit Profile</Link>
          </Button>
          <Button asChild>
            <Link href="/tutor-dashboard/settings">Settings</Link>
          </Button>
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
              <Button variant="ghost" size="sm" asChild>
                <Link href="/tutor-dashboard/schedule">View</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </AuthGuard>
  )
}
