"use client"

import { useTeacherOnboardingStore } from "@/lib/stores/teacher-onboarding-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Clock, 
  Calendar,
  CheckCircle,
  AlertCircle
} from "lucide-react"

export function ReviewStep() {
  const {
    profile_picture,
    short_description,
    long_description,
    years_of_experience,
    teaching_experience,
    achievements,
    education,
    certifications,
    teaching_philosophy,
    subjects,
    availability,
  } = useTeacherOnboardingStore()
  
  // Create a preview URL for the profile picture
  const previewUrl = profile_picture ? URL.createObjectURL(profile_picture) : null
  
  // Check if required fields are filled
  const isBasicInfoComplete = short_description && long_description
  const isExperienceComplete = years_of_experience > 0
  const isEducationComplete = education.length > 0
  const isTeachingPhilosophyComplete = teaching_philosophy
  const isSubjectsComplete = subjects.length > 0
  const isAvailabilityComplete = availability.length > 0
  
  const isProfileComplete = 
    isBasicInfoComplete &&
    isExperienceComplete &&
    isEducationComplete &&
    isTeachingPhilosophyComplete &&
    isSubjectsComplete &&
    isAvailabilityComplete
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">Review Your Profile</h2>
        <p className="text-muted-foreground mb-6">
          Review your profile information before submitting. You can go back to any section to make changes.
        </p>
      </div>
      
      {!isProfileComplete && (
        <Card className="border-destructive/50 bg-destructive/5 mb-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <h3 className="font-medium text-destructive">Incomplete Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Your profile is incomplete. Please fill in all required fields before submitting.
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  {!isBasicInfoComplete && (
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-destructive"></span>
                      Basic information is incomplete
                    </li>
                  )}
                  {!isExperienceComplete && (
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-destructive"></span>
                      Experience information is incomplete
                    </li>
                  )}
                  {!isEducationComplete && (
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-destructive"></span>
                      Education information is incomplete
                    </li>
                  )}
                  {!isTeachingPhilosophyComplete && (
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-destructive"></span>
                      Teaching philosophy is incomplete
                    </li>
                  )}
                  {!isSubjectsComplete && (
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-destructive"></span>
                      Subjects information is incomplete
                    </li>
                  )}
                  {!isAvailabilityComplete && (
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-destructive"></span>
                      Availability information is incomplete
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <User className="mr-2 h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-4">
                <Avatar className="h-24 w-24 mb-2">
                  {previewUrl ? (
                    <AvatarImage src={previewUrl} alt="Profile preview" />
                  ) : (
                    <AvatarFallback className="bg-primary/5 text-primary">
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  )}
                </Avatar>
                {!profile_picture && (
                  <span className="text-xs text-muted-foreground">No profile picture uploaded</span>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium">Short Description</h3>
                  <p className="text-sm text-muted-foreground">
                    {short_description || "Not provided"}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium">Detailed Description</h3>
                  <p className="text-sm text-muted-foreground line-clamp-4">
                    {long_description || "Not provided"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <div className="space-y-6">
            <Card className="border-primary/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Experience & Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium">Years of Experience</h3>
                    <p className="text-sm text-muted-foreground">
                      {years_of_experience > 0 ? `${years_of_experience} years` : "Not provided"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium">Teaching Experience</h3>
                    {teaching_experience.length > 0 ? (
                      <ul className="text-sm text-muted-foreground list-disc pl-5">
                        {teaching_experience.map((exp, index) => (
                          <li key={index}>{exp}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">Not provided</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium">Achievements</h3>
                  <p className="text-sm text-muted-foreground">
                    {achievements || "Not provided"}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {education.length > 0 ? (
                    <ul className="space-y-2">
                      {education.map((edu, index) => (
                        <li key={index} className="text-sm">
                          <div className="font-medium">{edu.degree} in {edu.field}</div>
                          <div className="text-muted-foreground">{edu.institution}, {edu.year}</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No education added</p>
                  )}
                </CardContent>
              </Card>
              
              <Card className="border-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Award className="mr-2 h-5 w-5" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {certifications.length > 0 ? (
                    <ul className="space-y-2">
                      {certifications.map((cert, index) => (
                        <li key={index} className="text-sm">
                          <div className="font-medium">{cert.name}</div>
                          <div className="text-muted-foreground">{cert.issuer}, {cert.year}</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No certifications added</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Card className="border-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            Teaching Philosophy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {teaching_philosophy || "Not provided"}
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            Subjects & Rates
          </CardTitle>
        </CardHeader>
        <CardContent>
          {subjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjects.map((subject, index) => (
                <div key={index} className="border border-border/50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium">{subject.name}</h3>
                    <Badge variant="outline" className="bg-primary/5">
                      ${subject.hourly_rate}/hr
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {subject.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No subjects added</p>
          )}
        </CardContent>
      </Card>
      
      <Card className="border-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Availability
          </CardTitle>
        </CardHeader>
        <CardContent>
          {availability.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availability.map((slot, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{slot}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No availability added</p>
          )}
        </CardContent>
      </Card>
      
      {isProfileComplete && (
        <Card className="border-green-500/50 bg-green-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-600">Profile Complete</h3>
                <p className="text-sm text-muted-foreground">
                  Your profile is complete and ready to be submitted. Click "Complete" to finish the onboarding process.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
