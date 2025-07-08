"use client"

import { useState } from "react"
import { useTeacherOnboardingStore } from "@/lib/stores/teacher-onboarding-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Plus, Trash2, DollarSign } from "lucide-react"

interface Subject {
  name: string
  description: string
  hourly_rate: number
}

export function SubjectsStep() {
  const { 
    subjects,
    addSubject,
    removeSubject
  } = useTeacherOnboardingStore()
  
  const [newSubject, setNewSubject] = useState<Subject>({
    name: "",
    description: "",
    hourly_rate: 0
  })
  
  const handleAddSubject = () => {
    if (
      newSubject.name.trim() && 
      newSubject.description.trim() && 
      newSubject.hourly_rate > 0
    ) {
      addSubject({...newSubject})
      setNewSubject({
        name: "",
        description: "",
        hourly_rate: 0
      })
    }
  }
  
  const isFormValid = () => {
    return (
      newSubject.name.trim() && 
      newSubject.description.trim() && 
      newSubject.hourly_rate > 0
    )
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">Subjects & Rates</h2>
        <p className="text-muted-foreground mb-6">
          Add the subjects you teach and your hourly rates for each subject.
        </p>
      </div>
      
      <Card className="border-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            Add Subject
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-4">
            <div>
              <Label htmlFor="name">Subject Name</Label>
              <Input
                id="name"
                value={newSubject.name}
                onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                placeholder="e.g., Algebra, Chemistry, English Literature"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Subject Description</Label>
              <Textarea
                id="description"
                value={newSubject.description}
                onChange={(e) => setNewSubject({...newSubject, description: e.target.value})}
                placeholder="e.g., Comprehensive algebra tutoring covering equations, functions, and graphing. Suitable for high school students."
                className="min-h-[100px]"
              />
            </div>
            
            <div>
              <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="hourly_rate"
                  type="number"
                  min={1}
                  step={0.01}
                  value={newSubject.hourly_rate || ""}
                  onChange={(e) => setNewSubject({...newSubject, hourly_rate: parseFloat(e.target.value) || 0})}
                  placeholder="e.g., 35.00"
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          
          <Button 
            type="button" 
            onClick={handleAddSubject}
            disabled={!isFormValid()}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Subject
          </Button>
        </CardContent>
      </Card>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Your Subjects</h3>
        
        {subjects.length > 0 ? (
          <div className="space-y-3">
            {subjects.map((subject, index) => (
              <Card key={index} className="bg-primary/5 border-primary/10">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{subject.name}</h4>
                        <span className="text-primary font-bold">${subject.hourly_rate.toFixed(2)}/hr</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {subject.description}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeSubject(index)}
                      className="h-8 w-8 p-0 ml-2"
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
            No subjects added yet. Add the subjects you teach above.
          </p>
        )}
      </div>
      
      <div className="bg-secondary/50 p-4 rounded-lg border border-border/50 mt-6">
        <h4 className="font-medium mb-2">Tips for Setting Your Rates:</h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
          <li>Research the average rates for your subject and experience level in your area</li>
          <li>Consider your qualifications, expertise, and years of experience</li>
          <li>You can charge different rates for different subjects based on demand and your expertise</li>
          <li>Be competitive but value your time and knowledge appropriately</li>
          <li>You can always adjust your rates later based on demand</li>
        </ul>
      </div>
    </div>
  )
}
