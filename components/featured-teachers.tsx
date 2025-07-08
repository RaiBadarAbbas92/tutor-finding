"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarRating } from "@/components/star-rating"
import { Badge } from "@/components/ui/badge"
import { Loader2, ChevronRight } from "lucide-react"
import * as teachersApi from "@/lib/api/teachers"
import { TeacherProfile } from "@/lib/api/teachers"
import { getTutors } from "@/lib/data" // Import mock data as fallback

export function FeaturedTeachers() {
  const [teachers, setTeachers] = useState<TeacherProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeachers = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Fetch up to 10 teachers to ensure we get enough
        const params = {
          limit: 10,
          sort_by: "rating",
          sort_order: "desc"
        }

        const response = await teachersApi.getAllTeachers(params)
        console.log("API Response - Number of teachers:", response.length)

        if (response.length >= 5) {
          // If we have at least 5 teachers from the API, use them
          setTeachers(response.slice(0, 5))
        } else {
          // If we don't have enough teachers from the API, supplement with mock data
          console.log("Not enough teachers from API, adding mock data")
          const mockTutors = getTutors()

          // Convert mock tutors to the TeacherProfile format
          const mockTeachers = mockTutors.map((tutor, index) => ({
            id: index + 1000, // Use high IDs to avoid conflicts
            user_id: parseInt(tutor.id.replace('tutor-', '')),
            profile_picture: tutor.avatar,
            short_description: tutor.shortBio,
            average_rating: tutor.rating,
            total_reviews: tutor.reviewCount,
            subjects: tutor.subjects.map((subject, idx) => ({
              id: idx,
              teacher_id: index + 1000,
              name: subject,
              description: `${subject} lessons`,
              hourly_rate: tutor.hourlyRate
            }))
          }))

          // Combine API teachers with mock teachers to get at least 5
          const combined = [...response, ...mockTeachers]
          setTeachers(combined.slice(0, 5))
        }
      } catch (err) {
        console.error("Error fetching teachers:", err)
        setError("Failed to load teachers. Using mock data instead.")

        // Fallback to mock data
        const mockTutors = getTutors()
        const mockTeachers = mockTutors.map((tutor, index) => ({
          id: index + 1000,
          user_id: parseInt(tutor.id.replace('tutor-', '')),
          profile_picture: tutor.avatar,
          short_description: tutor.shortBio,
          average_rating: tutor.rating,
          total_reviews: tutor.reviewCount,
          subjects: tutor.subjects.map((subject, idx) => ({
            id: idx,
            teacher_id: index + 1000,
            name: subject,
            description: `${subject} lessons`,
            hourly_rate: tutor.hourlyRate
          }))
        }))

        setTeachers(mockTeachers.slice(0, 5))
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeachers()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  if (teachers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No featured teachers available at the moment.</p>
      </div>
    )
  }

  return (
    <section className="container px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Featured Tutors</h2>
          <p className="text-muted-foreground mt-2">
            Discover our top-rated tutors with proven track records of student success
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/tutors">View All Tutors</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <Avatar className="h-20 w-20 mb-3">
                    {teacher.profile_picture ? (
                      <AvatarImage src={teacher.profile_picture} alt={`${teacher.user_id}'s profile`} />
                    ) : (
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">
                        {teacher.user_id?.toString().substring(0, 2) || "T"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <h3 className="font-semibold text-lg">Teacher {teacher.user_id}</h3>
                  <div className="flex items-center mt-1">
                    <StarRating rating={teacher.average_rating || 0} />
                    <span className="text-sm text-muted-foreground ml-2">
                      ({teacher.total_reviews || 0} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm line-clamp-2">
                    {teacher.short_description || "Experienced tutor ready to help you succeed."}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {teacher.subjects?.slice(0, 3).map((subject, index) => (
                      <Badge key={index} variant="secondary" className="font-normal">
                        {subject.name}
                      </Badge>
                    ))}
                    {teacher.subjects && teacher.subjects.length > 3 && (
                      <Badge variant="outline" className="font-normal">
                        +{teacher.subjects.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t p-4">
                <Link href={`/tutors/${teacher.id}`} passHref>
                  <Button className="w-full" variant="outline">
                    View Profile
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
