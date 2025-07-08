"use client"

import { useTeacherOnboardingStore } from "@/lib/stores/teacher-onboarding-store"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen } from "lucide-react"

export function TeachingDetailsStep() {
  const { 
    teaching_philosophy,
    setTeachingPhilosophy
  } = useTeacherOnboardingStore()
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">Teaching Philosophy</h2>
        <p className="text-muted-foreground mb-6">
          Share your approach to teaching and what makes your teaching style unique.
        </p>
      </div>
      
      <div className="bg-primary/5 p-6 rounded-lg border border-primary/10 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Why This Matters</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Your teaching philosophy helps students understand your approach and values as an educator. 
          It gives them insight into what they can expect from your sessions and how you might help them 
          achieve their learning goals. A well-articulated teaching philosophy can set you apart from 
          other tutors and attract students who resonate with your approach.
        </p>
      </div>
      
      <div>
        <Label htmlFor="teaching_philosophy">
          Your Teaching Philosophy <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground mb-2">
          Describe your approach to teaching, your values as an educator, and how you help students succeed
        </p>
        <Textarea
          id="teaching_philosophy"
          value={teaching_philosophy}
          onChange={(e) => setTeachingPhilosophy(e.target.value)}
          placeholder="e.g., I believe in creating a supportive learning environment where students feel comfortable asking questions. My approach focuses on building a strong foundation of fundamentals before moving to more complex concepts..."
          className="min-h-[250px]"
          required
        />
        <div className="text-xs text-muted-foreground mt-1 text-right">
          {teaching_philosophy.length}/1000 (Recommended: at least 200 characters)
        </div>
      </div>
      
      <div className="bg-secondary/50 p-4 rounded-lg border border-border/50 mt-6">
        <h4 className="font-medium mb-2">Tips for Writing Your Teaching Philosophy:</h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
          <li>Explain your beliefs about how people learn best</li>
          <li>Describe specific teaching methods you use and why they're effective</li>
          <li>Share how you adapt your teaching to different learning styles</li>
          <li>Include examples of how you've helped students overcome challenges</li>
          <li>Mention how you measure success and track student progress</li>
          <li>Be authentic and let your personality shine through</li>
        </ul>
      </div>
    </div>
  )
}
