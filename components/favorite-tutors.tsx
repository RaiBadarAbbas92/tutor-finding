import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { Heart } from "lucide-react"
import { getUserFavoriteTutors } from "@/lib/data"

interface FavoriteTutorsProps {
  userId: string
}

export function FavoriteTutors({ userId }: FavoriteTutorsProps) {
  const tutors = getUserFavoriteTutors(userId)

  if (tutors.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No favorite tutors</h3>
        <p className="text-muted-foreground mb-6">
          You haven't added any tutors to your favorites yet. Browse tutors and click the heart icon to add them.
        </p>
        <Button asChild>
          <Link href="/tutors">Browse Tutors</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tutors.map((tutor) => (
        <Card key={tutor.id}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={tutor.avatar || "/placeholder.svg"} alt={tutor.name} />
                <AvatarFallback>
                  {tutor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{tutor.name}</h3>
                    <p className="text-sm text-muted-foreground">{tutor.title}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={tutor.rating} />
                  <span className="text-sm text-muted-foreground">({tutor.reviewCount})</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {tutor.subjects.slice(0, 3).map((subject) => (
                    <Badge key={subject} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-medium">${tutor.hourlyRate}/hour</span>
                  <Button asChild size="sm">
                    <Link href={`/tutors/${tutor.id}`}>View Profile</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
