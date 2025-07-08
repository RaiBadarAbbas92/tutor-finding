"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuthStore } from "@/lib/stores/auth-store"
import { getTeacherById, TeacherProfile } from "@/lib/api/teachers"
import { createMeeting } from "@/lib/api/meetings"
import { use } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, addHours, setHours, setMinutes } from "date-fns"
import { CalendarIcon, Clock, MapPin, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { toast } from "sonner"

export default function BookMeetingPage({ params }: { params: { teacherId: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const user = useAuthStore((state) => state.user)
  const [teacher, setTeacher] = useState<TeacherProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Unwrap params using React.use()
  const unwrappedParams = use(params)
  const teacherId = unwrappedParams.teacherId

  // Get subject ID from URL if available
  const subjectIdFromUrl = searchParams.get('subject')

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState<string>("09:00")
  const [duration, setDuration] = useState<number>(60)
  const [meetingType, setMeetingType] = useState<"online" | "in-person">("online")
  const [location, setLocation] = useState("")
  const [meetingLink, setMeetingLink] = useState("")
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjectIdFromUrl || "")

  // Time slots for selection
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i < 10 ? `0${i}` : `${i}`
    return [`${hour}:00`, `${hour}:30`]
  }).flat()

  // Duration options
  const durationOptions = [
    { value: 30, label: "30 minutes" },
    { value: 60, label: "1 hour" },
    { value: 90, label: "1.5 hours" },
    { value: 120, label: "2 hours" }
  ]

  useEffect(() => {
    // Check if user is logged in and is a student
    if (!user) {
      toast.error("Please log in to book a meeting")
      router.push("/login")
      return
    }

    if (user.role !== "student") {
      toast.error("Only students can book meetings with teachers")
      router.push("/dashboard")
      return
    }

    // Fetch teacher details
    const fetchTeacher = async () => {
      try {
        setIsLoading(true)
        const teacherIdNum = parseInt(teacherId)
        const teacherData = await getTeacherById(teacherIdNum)
        setTeacher(teacherData)

        // Set subject ID from URL or default to first subject
        if (subjectIdFromUrl && teacherData.subjects) {
          // Verify the subject ID exists for this teacher
          const subjectExists = teacherData.subjects.some(
            subject => subject.id.toString() === subjectIdFromUrl
          );

          if (subjectExists) {
            setSelectedSubjectId(subjectIdFromUrl);

            // Also set a default title based on the subject
            const selectedSubject = teacherData.subjects.find(
              subject => subject.id.toString() === subjectIdFromUrl
            );
            if (selectedSubject) {
              setTitle(`${selectedSubject.name} Session`);
            }
          } else if (teacherData.subjects.length > 0) {
            // If subject ID from URL is invalid, use the first subject
            setSelectedSubjectId(teacherData.subjects[0].id.toString());
          }
        } else if (teacherData.subjects && teacherData.subjects.length > 0) {
          // No subject ID in URL, use the first subject
          setSelectedSubjectId(teacherData.subjects[0].id.toString());
        }
      } catch (err) {
        console.error("Error fetching teacher:", err)
        setError("Failed to load teacher information. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeacher()
  }, [teacherId, router, user, subjectIdFromUrl])

  // Calculate end time based on start time and duration
  const calculateEndTime = () => {
    if (!date || !startTime) return null

    const [hours, minutes] = startTime.split(":").map(Number)
    const startDateTime = new Date(date)
    startDateTime.setHours(hours, minutes, 0, 0)

    const endDateTime = new Date(startDateTime)
    endDateTime.setMinutes(endDateTime.getMinutes() + duration)

    return endDateTime
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !startTime || !selectedSubjectId) {
      toast.error("Please fill in all required fields")
      return
    }

    const startDateTime = new Date(date)
    const [startHours, startMinutes] = startTime.split(":").map(Number)
    startDateTime.setHours(startHours, startMinutes, 0, 0)

    const endDateTime = calculateEndTime()

    if (!endDateTime) {
      toast.error("Invalid meeting time")
      return
    }

    try {
      setIsSubmitting(true)

      const meetingData = {
        title,
        description,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        meeting_link: meetingType === "online" ? meetingLink : "",
        location: meetingType === "in-person" ? location : "",
        teacher_id: parseInt(teacherId),
        subject_id: parseInt(selectedSubjectId)
      }

      const response = await createMeeting(meetingData)

      toast.success("Meeting booked successfully!")
      router.push("/dashboard")
    } catch (err) {
      console.error("Error booking meeting:", err)
      toast.error("Failed to book meeting. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <LoadingSpinner />
        <p className="mt-4 text-muted-foreground">Loading teacher information...</p>
      </div>
    )
  }

  if (error || !teacher) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">Error</h1>
        <p className="text-muted-foreground mb-6">{error || "Teacher not found"}</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Book a Session</h1>
          <p className="text-muted-foreground">
            Schedule a meeting with {teacher.user_id ? `Dr. ${teacher.user_id}` : "your tutor"}
          </p>
        </div>

        <Card className="border-primary/10 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b border-primary/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Meeting Details</CardTitle>
                <CardDescription>Fill in the details to book your session</CardDescription>
              </div>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Meeting Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Math Tutoring Session"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    value={selectedSubjectId}
                    onValueChange={setSelectedSubjectId}
                    required
                  >
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacher.subjects?.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id.toString()}>
                          {subject.name} (${subject.hourly_rate}/hr)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you'd like to cover in this session"
                  className="min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Start Time</Label>
                  <Select value={startTime} onValueChange={setStartTime}>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select
                    value={duration.toString()}
                    onValueChange={(value) => setDuration(parseInt(value))}
                  >
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value.toString()}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Meeting Type</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={meetingType === "online" ? "default" : "outline"}
                    className={cn(
                      "h-auto py-4 justify-start",
                      meetingType === "online" && "border-primary/20 bg-primary/10 text-primary hover:bg-primary/20"
                    )}
                    onClick={() => setMeetingType("online")}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 p-2 rounded-full bg-primary/10">
                        <Video className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Online Meeting</div>
                        <div className="text-xs text-muted-foreground">Meet virtually via video call</div>
                      </div>
                    </div>
                  </Button>

                  <Button
                    type="button"
                    variant={meetingType === "in-person" ? "default" : "outline"}
                    className={cn(
                      "h-auto py-4 justify-start",
                      meetingType === "in-person" && "border-primary/20 bg-primary/10 text-primary hover:bg-primary/20"
                    )}
                    onClick={() => setMeetingType("in-person")}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 p-2 rounded-full bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">In-Person Meeting</div>
                        <div className="text-xs text-muted-foreground">Meet at a physical location</div>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>

              {meetingType === "online" && (
                <div className="space-y-2">
                  <Label htmlFor="meeting-link">Meeting Link (Optional)</Label>
                  <Input
                    id="meeting-link"
                    placeholder="e.g., https://zoom.us/j/123456789"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    You can add a meeting link now or later. The teacher may also provide their own link.
                  </p>
                </div>
              )}

              {meetingType === "in-person" && (
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Library, Coffee Shop, etc."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required={meetingType === "in-person"}
                  />
                </div>
              )}

              <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                <h3 className="font-medium text-primary mb-2">Meeting Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Date:</p>
                    <p className="font-medium">{date ? format(date, "PPP") : "Not selected"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Time:</p>
                    <p className="font-medium">
                      {startTime} - {calculateEndTime() ? format(calculateEndTime()!, "HH:mm") : ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Duration:</p>
                    <p className="font-medium">{duration} minutes</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Type:</p>
                    <p className="font-medium">{meetingType === "online" ? "Online" : "In-Person"}</p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t border-primary/10 p-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="luxury-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner className="mr-2 h-4 w-4" />
                    Booking...
                  </>
                ) : (
                  "Book Meeting"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
