import { Star } from 'lucide-react';
import { Review } from '@/types/venue';
import ReviewCard from './ReviewCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

export default function ReviewsSection({ rating, reviewCount, reviews }: ReviewsSectionProps) {
  const ratingBreakdown = [
    { stars: 5, percentage: 75 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Overall Rating */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-card border rounded-lg p-6 text-center">
            <div className="text-5xl font-bold text-primary mb-2">{rating}</div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(rating) ? 'fill-primary text-primary' : 'text-muted'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{reviewCount} reviews</p>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="flex-1 space-y-3">
          {ratingBreakdown.map(({ stars, percentage }) => (
            <div key={stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-medium">{stars}</span>
                <Star className="h-4 w-4 fill-primary text-primary" />
              </div>
              <Progress value={percentage} className="flex-1" />
              <span className="text-sm text-muted-foreground w-12 text-right">{percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Reviews</h3>
          <Button variant="outline">Write a Review</Button>
        </div>

        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {reviews.length > 0 && (
          <Button variant="outline" className="w-full">
            Load More Reviews
          </Button>
        )}
      </div>
    </div>
  );
}
