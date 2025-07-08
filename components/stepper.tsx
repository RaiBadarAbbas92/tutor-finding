import React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface StepProps {
  title: string
  description?: string
  isCompleted?: boolean
  isActive?: boolean
}

export function Step({ title, description, isCompleted, isActive }: StepProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold",
          isCompleted
            ? "border-primary bg-primary text-primary-foreground"
            : isActive
              ? "border-primary text-primary"
              : "border-muted-foreground/30 text-muted-foreground",
        )}
      >
        {isCompleted ? <Check className="h-4 w-4" /> : null}
        {!isCompleted && <span>{title.charAt(0)}</span>}
      </div>
      <div className="mt-2 text-center">
        <div
          className={cn("text-sm font-medium", isCompleted || isActive ? "text-foreground" : "text-muted-foreground")}
        >
          {title}
        </div>
        {description && <div className="text-xs text-muted-foreground">{description}</div>}
      </div>
    </div>
  )
}

interface StepperProps {
  currentStep: number
  className?: string
  children: React.ReactNode
}

export function Stepper({ currentStep, className, children }: StepperProps) {
  const steps = React.Children.toArray(children)
  const totalSteps = steps.length

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-center">
        <div className="relative flex w-full max-w-3xl items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep
            const isActive = index === currentStep
            const isLastStep = index === totalSteps - 1

            return (
              <React.Fragment key={index}>
                {React.isValidElement(step) &&
                  React.cloneElement(step as React.ReactElement<StepProps>, {
                    isCompleted,
                    isActive,
                  })}
                {!isLastStep && (
                  <div
                    className={cn("h-[2px] flex-1", index < currentStep ? "bg-primary" : "bg-muted-foreground/30")}
                  />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
