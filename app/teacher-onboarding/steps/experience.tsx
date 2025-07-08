"use client"

import { useState } from "react"
import { useTeacherOnboardingStore } from "@/lib/stores/teacher-onboarding-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

export function ExperienceStep() {
  const { 
    years_of_experience, 
    teaching_experience,
    achievements,
    setYearsOfExperience,
    setTeachingExperience,
    setAchievements
  } = useTeacherOnboardingStore()
  
  const [newExperience, setNewExperience] = useState("")
  
  const handleAddExperience = () => {
    if (newExperience.trim()) {
      setTeachingExperience([...teaching_experience, newExperience.trim()])
      setNewExperience("")
    }
  }
  
  const handleRemoveExperience = (index: number) => {
    const updated = [...teaching_experience]
    updated.splice(index, 1)
    setTeachingExperience(updated)
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">Teaching Experience</h2>
        <p className="text-muted-foreground mb-6">
          Share your teaching experience to help students understand your background.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="years_of_experience">
            Years of Teaching Experience <span className="text-destructive">*</span>
          </Label>
          <Input
            id="years_of_experience"
            type="number"
            min={0}
            max={50}
            value={years_of_experience}
            onChange={(e) => setYearsOfExperience(parseInt(e.target.value) || 0)}
            className="max-w-[200px]"
            required
          />
        </div>
        
        <div>
          <Label>Teaching Experience</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Add your teaching positions, roles, or relevant experience
          </p>
          
          <div className="flex gap-2 mb-2">
            <Input
              value={newExperience}
              onChange={(e) => setNewExperience(e.target.value)}
              placeholder="e.g., Math Teacher at Lincoln High School (2018-2022)"
              className="flex-1"
            />
            <Button 
              type="button" 
              onClick={handleAddExperience}
              disabled={!newExperience.trim()}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          
          {teaching_experience.length > 0 ? (
            <div className="space-y-2 mt-4">
              {teaching_experience.map((exp, index) => (
                <Card key={index} className="bg-primary/5 border-primary/10">
                  <CardContent className="p-3 flex justify-between items-center">
                    <span>{exp}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveExperience(index)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic mt-2">
              No teaching experience added yet.
            </p>
          )}
        </div>
        
        <div className="mt-6">
          <Label htmlFor="achievements">Notable Achievements</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Share any awards, recognition, or notable results with your students
          </p>
          <Textarea
            id="achievements"
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
            placeholder="e.g., Teacher of the Year 2021, 95% of my students improved their grades by at least one letter grade..."
            className="min-h-[150px]"
          />
        </div>
      </div>
    </div>
  )
}
