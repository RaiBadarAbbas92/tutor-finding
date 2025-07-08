"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, X } from "lucide-react"

interface TutorFiltersProps {
  onSearch: (filters: { name?: string; subject?: string }) => void;
}

export function TutorFilters({ onSearch }: TutorFiltersProps) {
  const [priceRange, setPriceRange] = useState([20, 100])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState<"name" | "subject">("name")
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  
  // Use ref to avoid dependency issues
  const onSearchRef = useRef(onSearch);
  onSearchRef.current = onSearch;

  const subjects = [
    { id: "math", label: "Mathematics" },
    { id: "science", label: "Science" },
    { id: "english", label: "English" },
    { id: "history", label: "History" },
    { id: "programming", label: "Programming" },
    { id: "languages", label: "Foreign Languages" },
    { id: "test-prep", label: "Test Preparation" },
    { id: "music", label: "Music" },
  ]

  const availability = [
    { id: "weekdays", label: "Weekdays" },
    { id: "weekends", label: "Weekends" },
    { id: "evenings", label: "Evenings" },
    { id: "mornings", label: "Mornings" },
  ]

  // Instant search effect for frontend filtering
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      if (searchType === "name") {
        onSearchRef.current({ name: searchTerm.trim(), subject: undefined });
      } else {
        onSearchRef.current({ name: undefined, subject: searchTerm.trim() });
      }
    } else {
      onSearchRef.current({});
    }
  }, [searchTerm, searchType]);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      if (searchType === "name") {
        onSearch({ name: searchTerm.trim(), subject: undefined });
      } else {
        onSearch({ name: undefined, subject: searchTerm.trim() });
      }
    } else {
      onSearch({});
    }
  }

  const handleSearchTypeChange = (type: "name" | "subject") => {
    setSearchType(type);
    // Clear the search term when switching types to avoid confusion
    setSearchTerm("");
    setSelectedSubject(null);
    onSearch({});
  }

  const handleSubjectClick = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (subject) {
      setSearchType("subject");
      setSearchTerm(subject.label);
      setSelectedSubject(subjectId);
      // The useEffect will handle the search automatically
    }
  }

  const resetFilters = () => {
    setPriceRange([20, 100])
    setSearchTerm("")
    setSelectedSubject(null)
    onSearch({});
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Filters</h2>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2 text-xs">
          <X className="mr-1 h-3 w-3" />
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Label htmlFor="search-type" className="text-sm">Search by:</Label>
            <div className="flex rounded-md overflow-hidden border">
              <Button
                type="button"
                variant={searchType === "name" ? "default" : "ghost"}
                className={`rounded-none h-8 px-3 text-xs ${searchType === "name" ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"}`}
                onClick={() => handleSearchTypeChange("name")}
              >
                Name
              </Button>
              <Button
                type="button"
                variant={searchType === "subject" ? "default" : "ghost"}
                className={`rounded-none h-8 px-3 text-xs ${searchType === "subject" ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"}`}
                onClick={() => handleSearchTypeChange("subject")}
              >
                Subject
              </Button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={searchType === "name" ? "Search tutors by name..." : "Search tutors by subject..."}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <Button
              type="button"
              size="sm"
              className="absolute right-1 top-1 h-7 px-2"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>

        <Accordion type="multiple" defaultValue={["subjects", "price", "availability"]}>
          <AccordionItem value="subjects">
            <AccordionTrigger>Subjects</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className={`flex items-center space-x-2 p-1.5 rounded-md cursor-pointer transition-colors ${
                      selectedSubject === subject.id ? 'bg-primary/10' : 'hover:bg-primary/5'
                    }`}
                    onClick={() => handleSubjectClick(subject.id)}
                  >
                    <Checkbox
                      id={`subject-${subject.id}`}
                      checked={selectedSubject === subject.id}
                      onCheckedChange={() => handleSubjectClick(subject.id)}
                    />
                    <Label
                      htmlFor={`subject-${subject.id}`}
                      className={`text-sm font-normal cursor-pointer ${
                        selectedSubject === subject.id ? 'text-primary font-medium' : ''
                      }`}
                    >
                      {subject.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider value={priceRange} min={10} max={200} step={5} onValueChange={setPriceRange} />
                <div className="flex items-center justify-between">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}+</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="availability">
            <AccordionTrigger>Availability</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {availability.map((time) => (
                  <div key={time.id} className="flex items-center space-x-2">
                    <Checkbox id={`time-${time.id}`} />
                    <Label htmlFor={`time-${time.id}`} className="text-sm font-normal">
                      {time.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ratings">
            <AccordionTrigger>Ratings</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox id={`rating-${rating}`} />
                    <Label htmlFor={`rating-${rating}`} className="text-sm font-normal">
                      {rating}+ stars
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button className="w-full luxury-button" onClick={handleSearch}>
          Apply Filters
        </Button>
      </div>
    </div>
  )
}
