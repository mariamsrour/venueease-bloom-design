export interface Venue {
  id: string;
  name: string;
  images: string[];
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: { lat: number; lng: number };
  };
  pricing: {
    basePrice: number;
    cleaningFee: number;
    serviceFee: number;
  };
  capacity: {
    min: number;
    max: number;
    seated: number;
    standing: number;
  };
  amenities: string[];
  description: string;
  rules: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  availability: Date[];
  featured: boolean;
  categories: string[];
  owner: {
    name: string;
    avatar: string;
    responseTime: string;
    rating: number;
  };
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

export interface VenueFilters {
  priceRange: [number, number];
  capacity: number | null;
  location: string;
  amenities: string[];
  minRating: number;
  featured: boolean;
  categories: string[];
}
