import { Star, ThumbsUp } from 'lucide-react';
import { Review } from '@/types/venue';
import { formatDate } from '@/lib/formatters';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const initials = review.userName.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="border-b pb-6 last:border-0">
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-semibold">{review.userName}</h4>
              <p className="text-sm text-muted-foreground">{formatDate(review.date)}</p>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating ? 'fill-primary text-primary' : 'text-muted'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>

          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <ThumbsUp className="h-4 w-4 mr-2" />
            Helpful ({review.helpful})
          </Button>
        </div>
      </div>
    </div>
  );
}
