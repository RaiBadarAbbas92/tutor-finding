"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarRating } from "@/components/star-rating"
import { Heart, Loader2 } from "lucide-react"
import * as teachersApi from "@/lib/api/teachers"
import * as usersApi from "@/lib/api/users"
import { TeacherProfile } from "@/lib/api/teachers"
import { User } from "@/lib/api/users"

interface TutorListProps {
  searchFilters?: {
    name?: string;
    subject?: string;
  };
}

export function TutorList({ searchFilters = {} }: TutorListProps) {
  const [sortBy, setSortBy] = useState("recommended")
  const [allTutors, setAllTutors] = useState<TeacherProfile[]>([]) // Store all tutors
  const [filteredTutors, setFilteredTutors] = useState<TeacherProfile[]>([]) // Store filtered tutors
  const [userMap, setUserMap] = useState<Record<number, User>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  // Fetch all tutors once
  useEffect(() => {
    const fetchAllTutors = async () => {
      setIsLoading(true)
      setError(null)

      try {
        console.log("Fetching all tutors...");
        
        // Fetch all teachers without any filters
        const teachersResponse = await teachersApi.getAllTeachers({
          limit: 100, // Get more tutors for frontend filtering
          skip: 0
        })

        console.log("Fetched tutors:", teachersResponse.length);
        
        // Store all tutors
        setAllTutors(teachersResponse)
        setTotalCount(teachersResponse.length)

        // Fetch user information for teachers that don't have a username
        try {
          // Get all unique user IDs from teachers
          const userIds = teachersResponse
            .filter(teacher => !teacher.username && teacher.user_id)
            .map(teacher => teacher.user_id);

          if (userIds.length > 0) {
            // Fetch all users
            const users = await usersApi.getUsers();

            // Create a map of user_id to user
            const userMapData: Record<number, User> = {};
            users.forEach(user => {
              userMapData[user.id] = user;
            });

            setUserMap(userMapData);
          }
        } catch (userErr) {
          console.error("Error fetching user information:", userErr);
          // Continue even if user fetch fails
        }
      } catch (err) {
        console.error("Error fetching tutors:", err)
        setError("Failed to load tutors.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllTutors()
  }, []) // Only fetch once on component mount

  // Filter tutors based on search criteria
  useEffect(() => {
    console.log("Filtering tutors with:", searchFilters);
    
    let filtered = [...allTutors];

    // Filter by name (case-insensitive, partial match)
    if (searchFilters.name && searchFilters.name.trim() !== '') {
      const searchTerm = searchFilters.name.trim().toLowerCase();
      filtered = filtered.filter(tutor => {
        const tutorName = (tutor.username || 
          (tutor.user_id && userMap[tutor.user_id]?.username) || 
          `Teacher ${tutor.id}`).toLowerCase();
        
        return tutorName.includes(searchTerm);
      });
      console.log("Filtered by name:", filtered.length);
    }

    // Filter by subject (case-insensitive, partial match)
    if (searchFilters.subject && searchFilters.subject.trim() !== '') {
      const searchTerm = searchFilters.subject.trim().toLowerCase();
      filtered = filtered.filter(tutor => {
        if (!tutor.subjects || tutor.subjects.length === 0) return false;
        
        return tutor.subjects.some(subject => 
          subject.name.toLowerCase().includes(searchTerm)
        );
      });
      console.log("Filtered by subject:", filtered.length);
    }

    // Apply sorting
    if (sortBy === "rating-high") {
      filtered.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
    } else if (sortBy === "price-low") {
      filtered.sort((a, b) => {
        const aRate = a.subjects && a.subjects[0] ? a.subjects[0].hourly_rate : 0;
        const bRate = b.subjects && b.subjects[0] ? b.subjects[0].hourly_rate : 0;
        return aRate - bRate;
      });
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => {
        const aRate = a.subjects && a.subjects[0] ? a.subjects[0].hourly_rate : 0;
        const bRate = b.subjects && b.subjects[0] ? b.subjects[0].hourly_rate : 0;
        return bRate - aRate;
      });
    } else if (sortBy === "experience") {
      filtered.sort((a, b) => (b.years_of_experience || 0) - (a.years_of_experience || 0));
    }

    setFilteredTutors(filtered);
    console.log("Final filtered tutors:", filtered.length);
  }, [allTutors, searchFilters, sortBy, userMap])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-muted-foreground">
            {isLoading ? "Loading tutors..." : `Showing ${filteredTutors.length} of ${totalCount} tutors`}
          </p>

          {/* Show active filters */}
          {(searchFilters.name || searchFilters.subject) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {searchFilters.name && (
                <Badge variant="outline" className="bg-primary/5 text-primary px-2 py-1">
                  Name: {searchFilters.name}
                </Badge>
              )}
              {searchFilters.subject && (
                <Badge variant="outline" className="bg-primary/5 text-primary px-2 py-1">
                  Subject: {searchFilters.subject}
                </Badge>
              )}
            </div>
          )}
        </div>

        <Select value={sortBy} onValueChange={setSortBy} disabled={isLoading}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="rating-high">Highest Rated</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="experience">Most Experienced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      ) : filteredTutors.length === 0 ? (
        <div className="text-center py-12 bg-primary/5 rounded-lg border border-primary/10">
          <p className="text-lg font-medium text-primary mb-2">No tutors found</p>
          <p className="text-muted-foreground mb-6">
            {searchFilters.name || searchFilters.subject ?
              "Try adjusting your search filters to find more tutors." :
              "There are no tutors available at the moment."}
          </p>
          {(searchFilters.name || searchFilters.subject) && (
            <Button
              variant="outline"
              onClick={() => window.location.href = '/tutors'}
              className="luxury-button-outline"
            >
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTutors.map((tutor) => (
          <Card key={tutor.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-48 h-48 md:h-auto bg-muted shrink-0">
                  <img
                    src={tutor.profile_picture || "/placeholder.svg"}
                    alt={tutor.username ||
                         (tutor.user_id && userMap[tutor.user_id]?.username) ||
                         `Teacher ${tutor.id}`}
                    className="object-cover w-full h-full"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 text-muted-foreground hover:text-primary"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-6 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">
                        {/* Display real username with fallbacks */}
                        {tutor.username ||
                         (tutor.user_id && userMap[tutor.user_id]?.username) ||
                         `Teacher ${tutor.id}`}
                      </h3>
                      <div className="flex items-center">
                        <StarRating rating={tutor.average_rating || 0} />
                        <span className="ml-1 text-sm">({tutor.total_reviews || 0})</span>
                      </div>
                    </div>
                    <span className="font-medium">
                      ${tutor.subjects && tutor.subjects[0] ? tutor.subjects[0].hourly_rate : 0}/hour
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{tutor.short_description || "Tutor"}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tutor.subjects && tutor.subjects.slice(0, 5).map((subject) => (
                      <Badge key={subject.id} variant="secondary" className="text-xs">
                        {subject.name}
                      </Badge>
                    ))}
                    {tutor.subjects && tutor.subjects.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{tutor.subjects.length - 5} more
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm mb-4 line-clamp-2">{tutor.long_description || tutor.short_description || "No description available"}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <span>{tutor.years_of_experience || 0} years experience</span>
                    <span>
                      {Array.isArray(tutor.education)
                        ? tutor.education.length > 0
                          ? `${tutor.education[0].degree} in ${tutor.education[0].field}`
                          : "Education not specified"
                        : typeof tutor.education === 'string'
                          ? tutor.education
                          : "Education not specified"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild>
                      <Link href={`/tutors/${tutor.id}`}>View Profile</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={`/book-meeting/${tutor.id}`}>Book Session</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          ))}
        </div>
      )}
    </div>
  )
}
