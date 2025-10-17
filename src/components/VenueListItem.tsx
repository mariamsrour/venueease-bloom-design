import { MapPin, Users, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Venue } from '@/types/venue';
import { formatPrice, formatCapacity } from '@/lib/formatters';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface VenueListItemProps {
  venue: Venue;
}

export default function VenueListItem({ venue }: VenueListItemProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative md:w-72 h-48 md:h-auto flex-shrink-0">
          <img
            src={venue.images[0]}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          {venue.featured && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-3 right-3 p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background transition-colors"
            aria-label="Add to favorites"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <Link to={`/venue/${venue.id}`}>
                    <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                      {venue.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{venue.location.city}, {venue.location.state}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{formatCapacity(venue.capacity)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {formatPrice(venue.pricing.basePrice)}
                  </div>
                  <div className="text-xs text-muted-foreground">per day</div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {venue.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {venue.amenities.slice(0, 5).map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {venue.amenities.length > 5 && (
                  <Badge variant="secondary" className="text-xs">
                    +{venue.amenities.length - 5} more
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-semibold">{venue.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({venue.reviewCount} reviews)
                </span>
              </div>
              <Link to={`/venue/${venue.id}`}>
                <Button>View Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
