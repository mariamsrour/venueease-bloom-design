import { Heart, MapPin, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Venue } from "@/types/venue";
import { formatPrice } from "@/lib/formatters";

type VenueCardProps = Venue;

const VenueCard = ({
  id,
  name,
  images,
  location,
  capacity,
  pricing,
  rating,
  reviewCount,
  featured,
  categories,
}: VenueCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex gap-2 flex-wrap">
            {featured && (
              <Badge className="bg-secondary text-secondary-foreground shadow-md">
                Featured
              </Badge>
            )}
            {categories[0] && (
              <Badge variant="outline" className="bg-background/90 backdrop-blur-sm shadow-md">
                {categories[0]}
              </Badge>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className={`bg-background/90 backdrop-blur-sm hover:bg-background shadow-md ${
              isFavorite ? "text-destructive" : ""
            }`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
          <Star className="w-4 h-4 fill-secondary text-secondary" />
          <span className="font-semibold text-sm">{rating}</span>
          <span className="text-muted-foreground text-xs">({reviewCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <Link to={`/venue/${id}`}>
            <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{location.city}, {location.state}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-sm">Up to {capacity.max} guests</span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">
              {formatPrice(pricing.basePrice)}
            </p>
            <p className="text-xs text-muted-foreground">per day</p>
          </div>
        </div>

        <Link to={`/venue/${id}`}>
          <Button className="w-full" variant="default">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VenueCard;
