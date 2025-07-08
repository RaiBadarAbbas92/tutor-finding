"use client"

import { useState, useEffect } from "react"
import { getTeacherById, type TeacherProfile } from "@/lib/api/teachers"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, GraduationCap, Award, BookOpen, MessageSquare, Heart, Star, User, Briefcase } from "lucide-react"
import { ReviewForm } from "@/components/review-form"
import Link from "next/link"

interface TutorProfileContentProps {
  tutorId: number;
}

export function TutorProfileContent({ tutorId }: TutorProfileContentProps) {
  const [tutor, setTutor] = useState<TeacherProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const data = await getTeacherById(tutorId)
        setTutor(data)
      } catch (err) {
        setError('Failed to load tutor profile')
        console.error('Error fetching tutor:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTutor()
  }, [tutorId])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !tutor) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        {error || 'Tutor not found'}
      </div>
    )
  }

  // Format the tutor name or use a placeholder
  const tutorName = tutor.username || (tutor.user_id ? `Tutor ${tutor.user_id}` : "Experienced Tutor")

  return (
    <div className="bg-gradient-to-b from-primary/10 to-transparent">
      {/* Hero Section */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-72 md:h-96 w-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 z-10"></div>
          {tutor.profile_picture ? (
            <div className="absolute inset-0 bg-center bg-cover" style={{
              backgroundImage: `url(${tutor.profile_picture})`,
              filter: 'blur(4px) brightness(1.1)',
              transform: 'scale(1.05)'
            }} />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20"></div>
          )}

          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-30 z-0"
               style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        </div>

        {/* Profile Info Overlay */}
        <div className="container mx-auto px-4">
          <div className="relative -mt-32 bg-white rounded-t-3xl shadow-[0_0_25px_rgba(0,0,0,0.08)] p-8 md:p-10 border border-primary/10 transition-all duration-300 z-20">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              {/* Avatar */}
              <div className="flex flex-col items-center md:items-start">
                <div className="relative">
                  <div className="absolute -inset-1.5 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full blur-sm"></div>
                  <Avatar className="h-36 w-36 md:h-44 md:w-44 border-4 border-white shadow-xl relative">
                    <AvatarImage src={tutor.profile_picture} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                      {tutorName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex flex-col items-center md:items-start mt-6 space-y-3">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= Math.round(tutor.average_rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 font-medium text-lg">{tutor.average_rating?.toFixed(1) || "New"}</span>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">
                    {tutor.total_reviews} verified reviews
                  </span>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="luxury-heading mb-3 text-4xl md:text-5xl">{tutorName}</h1>
                <p className="luxury-text text-lg md:text-xl mb-6">{tutor.short_description}</p>

                <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
                  {tutor.subjects?.map((subject) => (
                    <Badge key={subject.id} variant="outline" className="tutor-profile-badge text-sm py-1.5 px-4">
                      {subject.name}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="flex flex-col items-center md:items-start group">
                    <div className="flex items-center gap-2 text-primary mb-1.5 group-hover:translate-x-0.5 transition-transform">
                      <Briefcase className="h-5 w-5" />
                      <span className="font-medium">Experience</span>
                    </div>
                    <span className="text-sm font-medium">{tutor.years_of_experience} years</span>
                  </div>

                  <div className="flex flex-col items-center md:items-start group">
                    <div className="flex items-center gap-2 text-primary mb-1.5 group-hover:translate-x-0.5 transition-transform">
                      <GraduationCap className="h-5 w-5" />
                      <span className="font-medium">Education</span>
                    </div>
                    <span className="text-sm font-medium">
                      {Array.isArray(tutor.education)
                        ? tutor.education.length > 0
                          ? `${tutor.education[0].degree} in ${tutor.education[0].field}`
                          : 'Not specified'
                        : typeof tutor.education === 'string'
                          ? tutor.education.length > 20
                            ? tutor.education.substring(0, 20) + '...'
                            : tutor.education
                          : 'Not specified'}
                    </span>
                  </div>

                  <div className="flex flex-col items-center md:items-start group">
                    <div className="flex items-center gap-2 text-primary mb-1.5 group-hover:translate-x-0.5 transition-transform">
                      <User className="h-5 w-5" />
                      <span className="font-medium">Students</span>
                    </div>
                    <span className="text-sm font-medium">50+ taught</span>
                  </div>

                  <div className="flex flex-col items-center md:items-start group">
                    <div className="flex items-center gap-2 text-primary mb-1.5 group-hover:translate-x-0.5 transition-transform">
                      <Clock className="h-5 w-5" />
                      <span className="font-medium">Response</span>
                    </div>
                    <span className="text-sm font-medium">Usually within 2 hours</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button className="luxury-button py-6 px-6 text-base">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Message Tutor
                  </Button>
                  <Button
                    variant="outline"
                    className="luxury-button-outline py-6 px-6 text-base"
                    asChild
                  >
                    <Link href={`/book-meeting/${tutor.id}`}>
                      <Calendar className="mr-2 h-5 w-5" />
                      Book a Session
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="absolute top-6 right-6 h-12 w-12 rounded-full hover:bg-primary/5 transition-colors">
                    <Heart className="h-6 w-6 hover:scale-110 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-b-3xl shadow-[0_5px_30px_rgba(0,0,0,0.05)] border border-t-0 border-primary/10 p-6 md:p-8 mb-8">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8 bg-primary/5 p-1 rounded-xl">
              <TabsTrigger value="about" className="tutor-profile-tab rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">About</TabsTrigger>
              <TabsTrigger value="subjects" className="tutor-profile-tab rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Subjects & Rates</TabsTrigger>
              <TabsTrigger value="reviews" className="tutor-profile-tab rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Reviews</TabsTrigger>
              <TabsTrigger value="availability" className="tutor-profile-tab rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Availability</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-8">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-primary mb-4">About {tutorName}</h2>
                <div className="text-muted-foreground whitespace-pre-line">
                  {tutor.long_description || "No detailed description available."}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="tutor-profile-card border-primary/10 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary/5 to-transparent px-6 py-4 border-b border-primary/5">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl">Education</CardTitle>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="text-muted-foreground">
                      {Array.isArray(tutor.education)
                        ? tutor.education.length > 0
                          ? (
                            <ul className="space-y-4">
                              {tutor.education.map((edu, index) => (
                                <li key={index} className="border-l-2 border-primary/10 pl-4 py-1 hover:border-primary/30 transition-colors">
                                  <div className="font-medium text-primary/90">{edu.degree} in {edu.field}</div>
                                  <div className="text-muted-foreground">{edu.institution}, {edu.year}</div>
                                </li>
                              ))}
                            </ul>
                          )
                          : "Education details not provided."
                        : typeof tutor.education === 'string'
                          ? tutor.education
                          : "Education details not provided."}
                    </div>
                  </CardContent>
                </Card>

                <Card className="tutor-profile-card border-primary/10 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary/5 to-transparent px-6 py-4 border-b border-primary/5">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl">Certifications</CardTitle>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="text-muted-foreground">
                      {Array.isArray(tutor.certifications)
                        ? tutor.certifications.length > 0
                          ? (
                            <ul className="space-y-4">
                              {tutor.certifications.map((cert, index) => (
                                <li key={index} className="border-l-2 border-primary/10 pl-4 py-1 hover:border-primary/30 transition-colors">
                                  <div className="font-medium text-primary/90">{cert.name}</div>
                                  <div className="text-muted-foreground">{cert.issuer}, {cert.year}</div>
                                </li>
                              ))}
                            </ul>
                          )
                          : "Certification details not provided."
                        : typeof tutor.certifications === 'string'
                          ? tutor.certifications
                          : "Certification details not provided."}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="tutor-profile-card border-primary/10 overflow-hidden">
                <div className="bg-gradient-to-r from-primary/5 to-transparent px-6 py-4 border-b border-primary/5">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">Teaching Philosophy</CardTitle>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    <span className="text-primary/80 text-lg font-serif italic">"</span>
                    {tutor.teaching_philosophy || "Teaching philosophy not provided."}
                    <span className="text-primary/80 text-lg font-serif italic">"</span>
                  </div>
                </CardContent>
              </Card>

              {tutor.achievements && (
                <Card className="tutor-profile-card border-primary/10 overflow-hidden mt-8">
                  <div className="bg-gradient-to-r from-primary/5 to-transparent px-6 py-4 border-b border-primary/5">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl">Achievements</CardTitle>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {tutor.achievements}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="subjects" className="space-y-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-primary mb-4">Subjects & Rates</h2>
                <p className="text-muted-foreground">
                  Browse the subjects taught by {tutorName} and their corresponding hourly rates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutor.subjects?.map((subject) => (
                  <Card key={subject.id} className="tutor-profile-card overflow-hidden group">
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-5 border-b border-primary/10 group-hover:from-primary/15 group-hover:to-primary/10 transition-colors">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-primary">{subject.name}</h3>
                        <div className="text-xl font-bold text-primary bg-white/50 px-3 py-1 rounded-full shadow-sm">
                          ${subject.hourly_rate}<span className="text-sm font-normal text-primary/70">/hr</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-6">{subject.description}</p>
                      <div className="flex justify-end">
                        <Button
                          className="luxury-button group-hover:scale-105 transition-transform"
                          asChild
                        >
                          <Link href={`/book-meeting/${tutor.id}?subject=${subject.id}`}>
                            <Calendar className="mr-2 h-4 w-4" />
                            Book a Session
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {(!tutor.subjects || tutor.subjects.length === 0) && (
                  <div className="col-span-2 text-center py-16 bg-primary/5 rounded-xl border border-primary/10">
                    <p className="text-muted-foreground">No subjects listed for this tutor.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-primary mb-4">Student Reviews</h2>
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl min-w-[140px] shadow-sm border border-primary/10">
                    <span className="text-5xl font-bold text-primary mb-1">{tutor.average_rating?.toFixed(1) || "N/A"}</span>
                    <div className="flex mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${star <= Math.round(tutor.average_rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-primary/70 mt-2">{tutor.total_reviews} verified reviews</span>
                  </div>

                  <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-primary/10">
                    <h4 className="text-lg font-medium text-primary mb-4">Rating Distribution</h4>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const reviewsWithRating = tutor.reviews?.filter(r => Math.round(r.rating) === rating) || [];
                        const percentage = tutor.reviews?.length
                          ? (reviewsWithRating.length / tutor.reviews.length) * 100
                          : 0;

                        return (
                          <div key={rating} className="flex items-center gap-3">
                            <div className="flex items-center min-w-[40px]">
                              <span className="font-medium">{rating}</span>
                              <Star className="h-4 w-4 ml-1 fill-yellow-400 text-yellow-400" />
                            </div>
                            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-primary/70 min-w-[40px]">
                              {reviewsWithRating.length}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Form - Only visible to logged in students */}
              <div className="mb-8">
                <ReviewForm
                  teacherId={tutor.id}
                  onReviewSubmitted={() => {
                    // Refresh tutor data to show the new review
                    const fetchTutor = async () => {
                      try {
                        const data = await getTeacherById(tutorId)
                        setTutor(data)
                      } catch (err) {
                        console.error('Error refreshing tutor data:', err)
                      }
                    }
                    fetchTutor()
                  }}
                />
              </div>

              {tutor.reviews && tutor.reviews.length > 0 ? (
                <div className="space-y-6">
                  {tutor.reviews.map((review) => (
                    <Card key={review.id} className="tutor-profile-card overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="border-b border-primary/5 bg-gradient-to-r from-primary/5 to-transparent px-6 py-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${star <= Math.round(review.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-200"}`}
                              />
                            ))}
                            <span className="ml-1 font-medium">{review.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-sm text-primary/70 font-medium">
                            {new Date(review.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12 border-2 border-primary/10">
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-medium">
                              {String.fromCharCode(65 + (review.student_id % 26))}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium text-primary">
                              {review.student_name || `Student ${review.student_id}`}
                            </h4>
                            <p className="mt-3 text-muted-foreground leading-relaxed">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-primary/5 rounded-lg">
                  <p className="text-muted-foreground">No reviews yet for this tutor.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="availability" className="space-y-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-primary mb-4">Availability</h2>
                <p className="text-muted-foreground mb-6">
                  View {tutorName}'s availability and book a session at a time that works for you.
                </p>
              </div>

              <Card className="tutor-profile-card overflow-hidden">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-5 border-b border-primary/10">
                  <CardTitle className="text-xl">Weekly Schedule</CardTitle>
                  <CardDescription className="mt-1">The tutor's regular availability throughout the week</CardDescription>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                      const isAvailable = Math.random() > 0.3;
                      return (
                        <div
                          key={day}
                          className={`p-4 border rounded-xl text-center transition-all duration-300 hover:shadow-md ${
                            isAvailable
                              ? 'border-primary/20 bg-primary/5 hover:border-primary/30'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <h4 className={`font-medium mb-2 ${isAvailable ? 'text-primary' : 'text-muted-foreground'}`}>
                            {day.substring(0, 3)}
                          </h4>
                          <div className={`text-sm ${isAvailable ? 'text-primary/80 font-medium' : 'text-muted-foreground'}`}>
                            {isAvailable ? '9:00 AM - 5:00 PM' : 'Not Available'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
                <div className="bg-gradient-to-r from-primary/5 to-transparent px-6 py-5 border-t border-primary/10 flex justify-center">
                  <Button
                    className="luxury-button py-6 px-6 text-base"
                    asChild
                  >
                    <Link href={`/book-meeting/${tutor.id}`}>
                      <Calendar className="mr-2 h-5 w-5" />
                      Book a Session
                    </Link>
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer section with call-to-action */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 text-center shadow-sm border border-primary/10">
          <h2 className="text-2xl font-bold text-primary mb-3">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Book a session with {tutorName} and take the first step towards achieving your learning goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="luxury-button py-6 px-8 text-base"
              asChild
            >
              <Link href={`/book-meeting/${tutor.id}`}>
                <Calendar className="mr-2 h-5 w-5" />
                Book a Session
              </Link>
            </Button>
            <Button variant="outline" className="luxury-button-outline py-6 px-8 text-base">
              <MessageSquare className="mr-2 h-5 w-5" />
              Message Tutor
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}