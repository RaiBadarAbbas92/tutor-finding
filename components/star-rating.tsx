import { Star, StarHalf } from "lucide-react"

interface StarRatingProps {
  rating: number
  max?: number
  size?: "sm" | "md"
}

export function StarRating({ rating, max = 5, size = "sm" }: StarRatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  const starSize = size === "sm" ? "h-4 w-4" : "h-5 w-5"

  return (
    <div className="flex">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`star-${i}`} className={`${starSize} fill-primary text-primary`} />
      ))}

      {hasHalfStar && <StarHalf className={`${starSize} fill-primary text-primary`} />}

      {Array.from({ length: max - fullStars - (hasHalfStar ? 1 : 0) }).map((_, i) => (
        <Star key={`empty-star-${i}`} className={`${starSize} text-primary/20`} />
      ))}
    </div>
  )
}
