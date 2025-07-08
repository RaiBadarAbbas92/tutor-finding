"use client"

import { useState, useRef } from "react"
import { useTeacherOnboardingStore } from "@/lib/stores/teacher-onboarding-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Upload } from "lucide-react"

export function BasicInfoStep() {
  const { 
    profile_picture, 
    short_description, 
    long_description,
    setProfilePicture,
    setShortDescription,
    setLongDescription
  } = useTeacherOnboardingStore()
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    profile_picture ? URL.createObjectURL(profile_picture) : null
  )
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfilePicture(file)
      
      // Create a preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }
  
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">Basic Information</h2>
        <p className="text-muted-foreground mb-6">
          Let's start with some basic information about you that students will see first.
        </p>
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <Label className="text-center mb-4">Profile Picture</Label>
        <div className="relative group cursor-pointer" onClick={triggerFileInput}>
          <Avatar className="h-32 w-32 border-2 border-primary/20">
            {previewUrl ? (
              <AvatarImage src={previewUrl} alt="Profile preview" />
            ) : (
              <AvatarFallback className="bg-primary/5 text-primary">
                <Camera className="h-8 w-8" />
              </AvatarFallback>
            )}
          </Avatar>
          <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <Upload className="h-8 w-8 text-white" />
          </div>
        </div>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2"
          onClick={triggerFileInput}
        >
          Upload Photo
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="short_description">
            Short Description <span className="text-destructive">*</span>
          </Label>
          <p className="text-sm text-muted-foreground mb-2">
            A brief headline about yourself (50-100 characters)
          </p>
          <Input
            id="short_description"
            value={short_description}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="e.g., Experienced Math Tutor with 5+ years teaching algebra and calculus"
            maxLength={100}
            required
          />
          <div className="text-xs text-muted-foreground mt-1 text-right">
            {short_description.length}/100
          </div>
        </div>
        
        <div>
          <Label htmlFor="long_description">
            Detailed Description <span className="text-destructive">*</span>
          </Label>
          <p className="text-sm text-muted-foreground mb-2">
            Tell students about yourself, your background, and your teaching approach
          </p>
          <Textarea
            id="long_description"
            value={long_description}
            onChange={(e) => setLongDescription(e.target.value)}
            placeholder="Describe your background, experience, and teaching style in detail..."
            className="min-h-[200px]"
            required
          />
          <div className="text-xs text-muted-foreground mt-1 text-right">
            {long_description.length}/1000 (Recommended: at least 200 characters)
          </div>
        </div>
      </div>
    </div>
  )
}
