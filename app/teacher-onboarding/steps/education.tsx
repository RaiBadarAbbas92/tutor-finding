"use client"

import { useState } from "react"
import { useTeacherOnboardingStore, Education } from "@/lib/stores/teacher-onboarding-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Plus, Trash2, School } from "lucide-react"

export function EducationStep() {
  const { 
    education,
    addEducation,
    removeEducation
  } = useTeacherOnboardingStore()
  
  const [newEducation, setNewEducation] = useState<Education>({
    institution: "",
    degree: "",
    field: "",
    year: ""
  })
  
  const handleAddEducation = () => {
    if (
      newEducation.institution.trim() && 
      newEducation.degree.trim() && 
      newEducation.field.trim() && 
      newEducation.year.trim()
    ) {
      addEducation({...newEducation})
      setNewEducation({
        institution: "",
        degree: "",
        field: "",
        year: ""
      })
    }
  }
  
  const isFormValid = () => {
    return (
      newEducation.institution.trim() && 
      newEducation.degree.trim() && 
      newEducation.field.trim() && 
      newEducation.year.trim()
    )
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">Education</h2>
        <p className="text-muted-foreground mb-6">
          Add your educational background to showcase your qualifications.
        </p>
      </div>
      
      <Card className="border-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <GraduationCap className="mr-2 h-5 w-5" />
            Add Education
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                value={newEducation.institution}
                onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                placeholder="e.g., Harvard University"
              />
            </div>
            
            <div>
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                value={newEducation.degree}
                onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                placeholder="e.g., Bachelor's, Master's, Ph.D."
              />
            </div>
            
            <div>
              <Label htmlFor="field">Field of Study</Label>
              <Input
                id="field"
                value={newEducation.field}
                onChange={(e) => setNewEducation({...newEducation, field: e.target.value})}
                placeholder="e.g., Mathematics, Computer Science"
              />
            </div>
            
            <div>
              <Label htmlFor="year">Year Completed</Label>
              <Input
                id="year"
                value={newEducation.year}
                onChange={(e) => setNewEducation({...newEducation, year: e.target.value})}
                placeholder="e.g., 2018"
              />
            </div>
          </div>
          
          <Button 
            type="button" 
            onClick={handleAddEducation}
            disabled={!isFormValid()}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Education
          </Button>
        </CardContent>
      </Card>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Your Education</h3>
        
        {education.length > 0 ? (
          <div className="space-y-3">
            {education.map((edu, index) => (
              <Card key={index} className="bg-primary/5 border-primary/10">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div className="flex items-start gap-3">
                      <School className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium">{edu.degree} in {edu.field}</h4>
                        <p className="text-sm text-muted-foreground">
                          {edu.institution}, {edu.year}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeEducation(index)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            No education added yet. Add your educational background above.
          </p>
        )}
      </div>
    </div>
  )
}
