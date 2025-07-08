"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getTutorAvailability } from "@/lib/data"

interface BookingCalendarProps {
  tutorId: string
}

export function BookingCalendar({ tutorId }: BookingCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const availability = getTutorAvailability(tutorId, date)

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
  ]

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        disabled={(date) => {
          // Disable dates in the past
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          return date < today
        }}
        components={{
          IconLeft: () => <ChevronLeft className="h-4 w-4" />,
          IconRight: () => <ChevronRight className="h-4 w-4" />,
        }}
      />

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Available Times</h3>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((time) => {
            const isAvailable = availability.includes(time)
            return (
              <Button
                key={time}
                variant="outline"
                size="sm"
                className={cn(
                  "h-9",
                  selectedTime === time && "border-primary",
                  !isAvailable && "opacity-50 cursor-not-allowed",
                )}
                disabled={!isAvailable}
                onClick={() => setSelectedTime(isAvailable ? time : null)}
              >
                {time}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
