"use client"

import { useEffect } from "react"
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

export default function TutorDashboardPage() {
  const user = useAuthStore((state) => state.user)
  const router = useRouter()

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

  // Mock tutor data
  const tutorData = {
    id: "tutor-1",
    name: "Dr. Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviewCount: 124,
    upcomingSessions: 5,
    totalStudents: 28,
    activeStudents: 12,
    totalEarnings: 4850,
    monthlyEarnings: 1250,
    unreadMessages: 3,
    subjects: ["Mathematics", "Physics", "Calculus"],
    completedSessions: 142,
  }

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={tutorData.avatar || "/placeholder.svg"} alt={tutorData.name} />
            <AvatarFallback>{tutorData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{tutorData.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="ml-1 text-sm">{tutorData.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({tutorData.reviewCount} reviews)</span>
              <Badge variant="outline" className="ml-2">
                Tutor
              </Badge>
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
                <span className="text-2xl font-bold">{tutorData.upcomingSessions}</span>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/tutor-dashboard/schedule">View</Link>
              </Button>
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
                <span className="text-2xl font-bold">{tutorData.activeStudents}</span>
                <span className="text-sm text-muted-foreground ml-2">/ {tutorData.totalStudents} total</span>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/tutor-dashboard/students">View</Link>
              </Button>
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
                <span className="text-2xl font-bold">${tutorData.monthlyEarnings}</span>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/tutor-dashboard/earnings">View</Link>
              </Button>
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
                <span className="text-2xl font-bold">{tutorData.unreadMessages}</span>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/chat">View</Link>
              </Button>
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
                <Button asChild>
                  <Link href="/tutor-dashboard/schedule">View Full Schedule</Link>
                </Button>
              </div>
              <TutorSchedule tutorId={tutorData.id} />
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Your Students</h2>
                <Button asChild>
                  <Link href="/tutor-dashboard/students">View All Students</Link>
                </Button>
              </div>
              <TutorStudentList tutorId={tutorData.id} />
            </TabsContent>

            <TabsContent value="earnings" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Earnings Overview</h2>
                <Button asChild>
                  <Link href="/tutor-dashboard/earnings">View Detailed Report</Link>
                </Button>
              </div>
              <TutorEarnings tutorId={tutorData.id} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1">
          <DashboardChatPreview />
        </div>
      </div>
    </div>
    </AuthGuard>
  )
}
