import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarRating } from "@/components/star-rating"
import { getTutorReviews } from "@/lib/data"

interface ReviewListProps {
  tutorId: string
}

export function ReviewList({ tutorId }: ReviewListProps) {
  const reviews = getTutorReviews(tutorId)

  if (reviews.length === 0) {
    return <p className="text-muted-foreground">No reviews yet.</p>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Student Reviews ({reviews.length})</h2>

      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-6 last:border-0">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src={review.student.avatar || "/placeholder.svg"} alt={review.student.name} />
              <AvatarFallback>{review.student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <h3 className="font-medium">{review.student.name}</h3>
                <div className="flex items-center">
                  <StarRating rating={review.rating} />
                  <span className="ml-2 text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Subject: {review.subject}</p>
              <p className="mt-2">{review.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
