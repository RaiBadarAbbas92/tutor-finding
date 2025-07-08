"use client"

import { useState, ReactNode } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

interface TeacherOnboardingLayoutProps {
  children: ReactNode
  currentStep: number
  totalSteps: number
  onNext: () => void
  onPrevious: () => void
  isNextDisabled?: boolean
  isComplete?: boolean
}

export function TeacherOnboardingLayout({
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isNextDisabled = false,
  isComplete = false,
}: TeacherOnboardingLayoutProps) {
  const progress = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Complete Your Teacher Profile</h1>
        <p className="text-muted-foreground">
          Help students find you by completing your profile information. This will increase your visibility and chances of getting students.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm font-medium">{progress}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="p-6 shadow-lg border-primary/10">
        {children}

        <div className="flex justify-between mt-8 pt-4 border-t border-border/30">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentStep === 1}
            className="luxury-button-outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={onNext}
            disabled={isNextDisabled}
            className="luxury-button"
          >
            {isComplete ? (
              <>
                Complete
                <Check className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  )
}
