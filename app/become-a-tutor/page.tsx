"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Stepper, Step } from "@/components/stepper"

const personalInfoSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
})

const qualificationsSchema = z.object({
  education: z.string().min(1, { message: "Please select your highest education level" }),
  degree: z.string().min(2, { message: "Please enter your degree" }),
  institution: z.string().min(2, { message: "Please enter your institution" }),
  yearsExperience: z.string().min(1, { message: "Please select your years of experience" }),
  bio: z
    .string()
    .min(50, { message: "Bio must be at least 50 characters" })
    .max(500, { message: "Bio cannot exceed 500 characters" }),
})

const teachingInfoSchema = z.object({
  subjects: z.string().min(1, { message: "Please select at least one subject" }),
  hourlyRate: z.string().min(1, { message: "Please enter your hourly rate" }),
  availability: z.array(z.string()).min(1, { message: "Please select at least one availability option" }),
  teachingStyle: z
    .string()
    .min(50, { message: "Teaching style must be at least 50 characters" })
    .max(500, { message: "Teaching style cannot exceed 500 characters" }),
})

const termsSchema = z.object({
  terms: z.boolean().refine((val) => val === true, { message: "You must agree to the terms and conditions" }),
  backgroundCheck: z.boolean().refine((val) => val === true, { message: "You must agree to the background check" }),
})

const availabilityOptions = [
  { id: "weekdays", label: "Weekdays" },
  { id: "weekends", label: "Weekends" },
  { id: "evenings", label: "Evenings" },
  { id: "mornings", label: "Mornings" },
  { id: "afternoons", label: "Afternoons" },
]

export default function BecomeATutorPage() {
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  })

  const qualificationsForm = useForm<z.infer<typeof qualificationsSchema>>({
    resolver: zodResolver(qualificationsSchema),
    defaultValues: {
      education: "",
      degree: "",
      institution: "",
      yearsExperience: "",
      bio: "",
    },
  })

  const teachingInfoForm = useForm<z.infer<typeof teachingInfoSchema>>({
    resolver: zodResolver(teachingInfoSchema),
    defaultValues: {
      subjects: "",
      hourlyRate: "",
      availability: [],
      teachingStyle: "",
    },
  })

  const termsForm = useForm<z.infer<typeof termsSchema>>({
    resolver: zodResolver(termsSchema),
    defaultValues: {
      terms: false,
      backgroundCheck: false,
    },
  })

  const handleNext = async () => {
    switch (step) {
      case 0:
        const personalInfoValid = await personalInfoForm.trigger()
        if (personalInfoValid) setStep(1)
        break
      case 1:
        const qualificationsValid = await qualificationsForm.trigger()
        if (qualificationsValid) setStep(2)
        break
      case 2:
        const teachingInfoValid = await teachingInfoForm.trigger()
        if (teachingInfoValid) setStep(3)
        break
      default:
        break
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const onSubmit = async () => {
    const termsValid = await termsForm.trigger()
    if (!termsValid) return

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Application submitted",
        description: "We'll review your application and get back to you soon.",
      })

      router.push("/tutor-application-success")
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Become a Tutor</h1>
          <p className="text-muted-foreground mt-2">
            Join our community of expert tutors and help students achieve their academic goals
          </p>
        </div>

        <Stepper currentStep={step} className="mb-8">
          <Step title="Personal Info" />
          <Step title="Qualifications" />
          <Step title="Teaching Info" />
          <Step title="Review & Submit" />
        </Stepper>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 0 && "Personal Information"}
              {step === 1 && "Qualifications & Experience"}
              {step === 2 && "Teaching Information"}
              {step === 3 && "Review & Submit"}
            </CardTitle>
            <CardDescription>
              {step === 0 && "Tell us about yourself"}
              {step === 1 && "Share your educational background and experience"}
              {step === 2 && "Tell us about your teaching preferences"}
              {step === 3 && "Review your information and submit your application"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 0 && (
              <Form {...personalInfoForm}>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={personalInfoForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={personalInfoForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={personalInfoForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={personalInfoForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}

            {step === 1 && (
              <Form {...qualificationsForm}>
                <form className="space-y-4">
                  <FormField
                    control={qualificationsForm.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Highest Education Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your highest education level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="high_school">High School</SelectItem>
                            <SelectItem value="associates">Associate's Degree</SelectItem>
                            <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                            <SelectItem value="masters">Master's Degree</SelectItem>
                            <SelectItem value="doctorate">Doctorate</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={qualificationsForm.control}
                      name="degree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Degree/Major</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Computer Science" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={qualificationsForm.control}
                      name="institution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Stanford University" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={qualificationsForm.control}
                    name="yearsExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Teaching Experience</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select years of experience" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0-1">Less than 1 year</SelectItem>
                            <SelectItem value="1-3">1-3 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5-10">5-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={qualificationsForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your background, experience, and teaching philosophy..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This will be displayed on your public profile. Min 50 characters, max 500.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}

            {step === 2 && (
              <Form {...teachingInfoForm}>
                <form className="space-y-4">
                  <FormField
                    control={teachingInfoForm.control}
                    name="subjects"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your primary subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="history">History</SelectItem>
                            <SelectItem value="programming">Programming</SelectItem>
                            <SelectItem value="languages">Foreign Languages</SelectItem>
                            <SelectItem value="test_prep">Test Preparation</SelectItem>
                            <SelectItem value="music">Music</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>You can add more subjects after registration</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={teachingInfoForm.control}
                    name="hourlyRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hourly Rate (USD)</FormLabel>
                        <FormControl>
                          <Input type="number" min="10" placeholder="e.g., 35" {...field} />
                        </FormControl>
                        <FormDescription>
                          Set a competitive rate based on your experience and qualifications
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={teachingInfoForm.control}
                    name="availability"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Availability</FormLabel>
                          <FormDescription>Select all that apply</FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {availabilityOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={teachingInfoForm.control}
                              name="availability"
                              render={({ field }) => {
                                return (
                                  <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, option.id])
                                            : field.onChange(field.value?.filter((value) => value !== option.id))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{option.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={teachingInfoForm.control}
                    name="teachingStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teaching Style</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your teaching approach, methods, and how you engage students..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This helps students understand how you teach. Min 50 characters, max 500.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}

            {step === 3 && (
              <Form {...termsForm}>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Personal Information</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Name:</p>
                          <p>
                            {personalInfoForm.getValues().firstName} {personalInfoForm.getValues().lastName}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Email:</p>
                          <p>{personalInfoForm.getValues().email}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Phone:</p>
                          <p>{personalInfoForm.getValues().phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Qualifications</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Education:</p>
                          <p>
                            {qualificationsForm.getValues().education === "bachelors"
                              ? "Bachelor's Degree"
                              : qualificationsForm.getValues().education === "masters"
                                ? "Master's Degree"
                                : qualificationsForm.getValues().education === "doctorate"
                                  ? "Doctorate"
                                  : qualificationsForm.getValues().education === "associates"
                                    ? "Associate's Degree"
                                    : "High School"}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Degree:</p>
                          <p>{qualificationsForm.getValues().degree}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Institution:</p>
                          <p>{qualificationsForm.getValues().institution}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Experience:</p>
                          <p>
                            {qualificationsForm.getValues().yearsExperience === "0-1"
                              ? "Less than 1 year"
                              : qualificationsForm.getValues().yearsExperience === "1-3"
                                ? "1-3 years"
                                : qualificationsForm.getValues().yearsExperience === "3-5"
                                  ? "3-5 years"
                                  : qualificationsForm.getValues().yearsExperience === "5-10"
                                    ? "5-10 years"
                                    : "10+ years"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Teaching Information</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Primary Subject:</p>
                          <p>
                            {teachingInfoForm.getValues().subjects === "mathematics"
                              ? "Mathematics"
                              : teachingInfoForm.getValues().subjects === "science"
                                ? "Science"
                                : teachingInfoForm.getValues().subjects === "english"
                                  ? "English"
                                  : teachingInfoForm.getValues().subjects === "history"
                                    ? "History"
                                    : teachingInfoForm.getValues().subjects === "programming"
                                      ? "Programming"
                                      : teachingInfoForm.getValues().subjects === "languages"
                                        ? "Foreign Languages"
                                        : teachingInfoForm.getValues().subjects === "test_prep"
                                          ? "Test Preparation"
                                          : "Music"}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Hourly Rate:</p>
                          <p>${teachingInfoForm.getValues().hourlyRate}/hour</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Availability:</p>
                          <p>
                            {teachingInfoForm
                              .getValues()
                              .availability.map((a) => {
                                const option = availabilityOptions.find((o) => o.id === a)
                                return option ? option.label : a
                              })
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={termsForm.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the{" "}
                              <Link href="/terms" className="text-primary hover:underline">
                                terms and conditions
                              </Link>
                            </FormLabel>
                            <FormDescription>
                              By agreeing, you confirm that all information provided is accurate and complete.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={termsForm.control}
                      name="backgroundCheck"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>I consent to a background check</FormLabel>
                            <FormDescription>
                              For the safety of our students, all tutors must undergo a background check before being
                              approved.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={step === 0}>
              Back
            </Button>
            <div>
              {step < 3 ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button onClick={onSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
