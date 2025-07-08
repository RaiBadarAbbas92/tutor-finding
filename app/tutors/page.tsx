"use client"

import { useState, useCallback } from "react"
import { TutorFilters } from "@/components/tutor-filters"
import { TutorList } from "@/components/tutor-list"

export default function TutorsPage() {
  const [searchFilters, setSearchFilters] = useState<{ name?: string; subject?: string }>({})

  const handleSearch = useCallback((filters: { name?: string; subject?: string }) => {
    console.log("TutorsPage handleSearch called with filters:", filters);
    setSearchFilters(filters)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Your Perfect Tutor</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <TutorFilters onSearch={handleSearch} />
        </div>
        <div className="lg:col-span-3">
          <TutorList searchFilters={searchFilters} />
        </div>
      </div>
    </div>
  )
}
