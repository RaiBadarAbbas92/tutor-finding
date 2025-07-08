"use client"

import { useState } from "react"
import { useTeacherOnboardingStore } from "@/lib/stores/teacher-onboarding-store"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
]

const TIME_SLOTS = [
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
  "8:00 PM", "9:00 PM", "10:00 PM"
]

interface TimeRange {
  day: string
  start: string
  end: string
}

export function AvailabilityStep() {
  const { 
    availability,
    setAvailability
  } = useTeacherOnboardingStore()
  
  const [selectedDays, setSelectedDays] = useState<string[]>(
    availability.length > 0 
      ? [...new Set(availability.map(slot => slot.split(" ")[0]))]
      : []
  )
  
  const [timeRanges, setTimeRanges] = useState<TimeRange[]>(
    availability.length > 0
      ? availability.map(slot => {
          const [day, time] = slot.split(" (")
          const [start, end] = time.replace(")", "").split(" - ")
          return { day, start, end }
        })
      : []
  )
  
  const [newTimeRange, setNewTimeRange] = useState<TimeRange>({
    day: "",
    start: "",
    end: ""
  })
  
  const handleDayToggle = (day: string) => {
    setSelectedDays(prev => {
      if (prev.includes(day)) {
        // Remove day and all associated time ranges
        setTimeRanges(prev => prev.filter(range => range.day !== day))
        return prev.filter(d => d !== day)
      } else {
        return [...prev, day]
      }
    })
  }
  
  const handleAddTimeRange = () => {
    if (newTimeRange.day && newTimeRange.start && newTimeRange.end) {
      // Validate that end time is after start time
      const startIndex = TIME_SLOTS.indexOf(newTimeRange.start)
      const endIndex = TIME_SLOTS.indexOf(newTimeRange.end)
      
      if (startIndex >= endIndex) {
        alert("End time must be after start time")
        return
      }
      
      setTimeRanges(prev => [...prev, {...newTimeRange}])
      
      // Update the availability in the store
      const formattedRanges = [...timeRanges, newTimeRange].map(
        range => `${range.day} (${range.start} - ${range.end})`
      )
      setAvailability(formattedRanges)
      
      // Reset form
      setNewTimeRange({
        day: "",
        start: "",
        end: ""
      })
    }
  }
  
  const handleRemoveTimeRange = (index: number) => {
    const updatedRanges = [...timeRanges]
    updatedRanges.splice(index, 1)
    setTimeRanges(updatedRanges)
    
    // Update the availability in the store
    const formattedRanges = updatedRanges.map(
      range => `${range.day} (${range.start} - ${range.end})`
    )
    setAvailability(formattedRanges)
  }
  
  const isFormValid = () => {
    return newTimeRange.day && newTimeRange.start && newTimeRange.end
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">Your Availability</h2>
        <p className="text-muted-foreground mb-6">
          Set your weekly availability to let students know when you can schedule sessions.
        </p>
      </div>
      
      <div>
        <Label className="text-lg font-medium mb-3">Available Days</Label>
        <p className="text-sm text-muted-foreground mb-4">
          Select the days of the week when you're available to teach
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 mb-6">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className={`
                border rounded-lg p-3 text-center cursor-pointer transition-colors
                ${selectedDays.includes(day) 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'bg-background border-border hover:bg-primary/5'}
              `}
              onClick={() => handleDayToggle(day)}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <Label className="text-lg font-medium mb-3">Time Slots</Label>
        <p className="text-sm text-muted-foreground mb-4">
          Add specific time ranges when you're available on your selected days
        </p>
        
        <Card className="border-primary/10 mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="day">Day</Label>
                <Select
                  value={newTimeRange.day}
                  onValueChange={(value) => setNewTimeRange({...newTimeRange, day: value})}
                >
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedDays.map((day) => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="start">Start Time</Label>
                <Select
                  value={newTimeRange.start}
                  onValueChange={(value) => setNewTimeRange({...newTimeRange, start: value})}
                >
                  <SelectTrigger id="start">
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="end">End Time</Label>
                <Select
                  value={newTimeRange.end}
                  onValueChange={(value) => setNewTimeRange({...newTimeRange, end: value})}
                >
                  <SelectTrigger id="end">
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              type="button" 
              onClick={handleAddTimeRange}
              disabled={!isFormValid() || selectedDays.length === 0}
              className="w-full"
            >
              <Clock className="h-4 w-4 mr-1" />
              Add Time Slot
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Your Schedule</h3>
        
        {timeRanges.length > 0 ? (
          <div className="space-y-2">
            {DAYS_OF_WEEK.filter(day => selectedDays.includes(day)).map((day) => {
              const dayRanges = timeRanges.filter(range => range.day === day)
              
              if (dayRanges.length === 0) return null
              
              return (
                <Card key={day} className="bg-primary/5 border-primary/10">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">{day}</h4>
                    <div className="space-y-2">
                      {dayRanges.map((range, index) => {
                        const rangeIndex = timeRanges.findIndex(r => 
                          r.day === range.day && r.start === range.start && r.end === range.end
                        )
                        
                        return (
                          <div key={index} className="flex justify-between items-center bg-white p-2 rounded-md border border-border/50">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-primary mr-2" />
                              <span>{range.start} - {range.end}</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveTimeRange(rangeIndex)}
                              className="h-8 w-8 p-0"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-destructive">
                                <path d="M18 6L6 18"></path>
                                <path d="M6 6l12 12"></path>
                              </svg>
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            No time slots added yet. Select days and add time slots above.
          </p>
        )}
      </div>
    </div>
  )
}
