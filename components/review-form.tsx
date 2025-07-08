"use client"

import { useState } from "react"
import { useAuthStore } from "@/lib/stores/auth-store"
import { createReview } from "@/lib/api/reviews"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { toast } from "sonner"

interface ReviewFormProps {
  teacherId: number
  onReviewSubmitted?: () => void
}

export function ReviewForm({ teacherId, onReviewSubmitted }: ReviewFormProps) {
  const { user, isAuthenticated } = useAuthStore()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Check if user is logged in and is a student
  const canReview = isAuthenticated && user?.role === "student"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!canReview) {
      toast.error("Only students can leave reviews")
      return
    }

    if (rating === 0) {
      toast.error("Please select a rating")
      return
    }

    if (!comment.trim()) {
      toast.error("Please enter a comment")
      return
    }

    try {
      setIsSubmitting(true)

      const reviewData = {
        teacher_id: teacherId,
        rating,
        comment
      }

      await createReview(reviewData)
      
      toast.success("Review submitted successfully!")
      
      // Reset form
      setRating(0)
      setComment("")
      
      // Notify parent component
      if (onReviewSubmitted) {
        onReviewSubmitted()
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      toast.error("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!canReview) {
    return null
  }

  return (
    <Card className="border-primary/10 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b border-primary/10">
        <CardTitle className="text-xl">Write a Review</CardTitle>
        <CardDescription>Share your experience with this tutor</CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-sm font-medium mb-1">Your Rating</div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    className={`h-8 w-8 transition-all duration-150 ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400 scale-110"
                        : "text-gray-300 hover:scale-105"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {rating > 0 ? (
                <span>
                  You selected {rating} star{rating !== 1 ? "s" : ""}
                </span>
              ) : (
                <span>Click to rate</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">
              Your Review
            </label>
            <Textarea
              id="comment"
              placeholder="Share details about your experience with this tutor..."
              className="min-h-[120px] resize-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end border-t border-primary/10 p-6">
          <Button
            type="submit"
            className="luxury-button"
            disabled={isSubmitting || rating === 0 || !comment.trim()}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner className="mr-2 h-4 w-4" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
