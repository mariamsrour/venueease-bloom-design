import { Venue } from '@/types/venue';
import { BookingAddon } from '@/types/booking';
import venueBallroom from '@/assets/venue-ballroom.jpg';
import venueGarden from '@/assets/venue-garden.jpg';
import venueRooftop from '@/assets/venue-rooftop.jpg';
import heroVenue from '@/assets/hero-venue.jpg';


export const mockVenues: Venue[] = [
  {
    id: '1',
    name: 'Grand Ballroom at The Plaza',
    images: [venueBallroom, heroVenue, venueGarden, venueRooftop],
    location: {
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    pricing: {
      basePrice: 5000,
      cleaningFee: 200,
      serviceFee: 300
    },
    capacity: {
      min: 50,
      max: 300,
      seated: 200,
      standing: 300
    },
    amenities: ['WiFi', 'Parking', 'Catering Kitchen', 'Stage', 'Sound System', 'Air Conditioning', 'Dressing Rooms', 'Bar Area'],
    description: 'Elegant grand ballroom with crystal chandeliers and high ceilings, perfect for weddings, galas, and corporate events. Features state-of-the-art lighting and sound systems.',
    rules: ['No smoking indoors', 'Music must end by 11 PM', 'Maximum capacity must be respected', 'Professional cleanup required'],
    rating: 4.8,
    reviewCount: 124,
    reviews: [
      {
        id: 'r1',
        userName: 'Sarah Johnson',
        userAvatar: '',
        rating: 5,
        date: '2025-09-15',
        comment: 'Absolutely stunning venue! The staff was incredibly helpful and the space exceeded our expectations. Perfect for our wedding.',
        helpful: 24
      },
      {
        id: 'r2',
        userName: 'Michael Chen',
        userAvatar: '',
        rating: 4,
        date: '2025-08-22',
        comment: 'Great location and beautiful decor. Only minor issue was parking during peak hours, but otherwise excellent.',
        helpful: 12
      }
    ],
    availability: [],
    featured: true,
    categories: ['Wedding Halls', 'Corporate Events'],
    owner: {
      name: 'Plaza Venues LLC',
      avatar: '',
      responseTime: 'within 1 hour',
      rating: 4.9
    }
  },
  {
    id: '2',
    name: 'Sunset Garden Terrace',
    images: [venueGarden, venueRooftop, heroVenue, venueBallroom],
    location: {
      address: '456 Garden Lane',
      city: 'Los Angeles',
      state: 'CA',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    pricing: {
      basePrice: 3500,
      cleaningFee: 150,
      serviceFee: 250
    },
    capacity: {
      min: 30,
      max: 150,
      seated: 100,
      standing: 150
    },
    amenities: ['Outdoor Space', 'Garden', 'WiFi', 'Parking', 'Catering Kitchen', 'Gazebo', 'String Lights'],
    description: 'Beautiful outdoor garden venue with lush landscaping and romantic lighting. Perfect for intimate weddings, baby showers, and garden parties.',
    rules: ['Weather contingency plan required', 'No open flames', 'Music ends at 10 PM', 'Respect neighboring properties'],
    rating: 4.9,
    reviewCount: 89,
    reviews: [
      {
        id: 'r3',
        userName: 'Emily Rodriguez',
        userAvatar: '',
        rating: 5,
        date: '2025-09-01',
        comment: 'The most beautiful garden venue! Perfect for our engagement party. The sunset views were incredible.',
        helpful: 18
      }
    ],
    availability: [],
    featured: true,
    categories: ['Gardens', 'Outdoor Venues'],
    owner: {
      name: 'Garden Events Co',
      avatar: '',
      responseTime: 'within 2 hours',
      rating: 4.8
    }
  },
  {
    id: '3',
    name: 'Skyline Rooftop Lounge',
    images: [venueRooftop, heroVenue, venueBallroom, venueGarden],
    location: {
      address: '789 High Street',
      city: 'Chicago',
      state: 'IL',
      coordinates: { lat: 41.8781, lng: -87.6298 }
    },
    pricing: {
      basePrice: 4500,
      cleaningFee: 175,
      serviceFee: 275
    },
    capacity: {
      min: 40,
      max: 200,
      seated: 120,
      standing: 200
    },
    amenities: ['Rooftop', 'City Views', 'WiFi', 'Bar', 'Lounge Furniture', 'Fire Pits', 'Heating Lamps', 'Sound System'],
    description: 'Modern rooftop venue with panoramic city views. Features contemporary design, full bar service, and climate control for year-round events.',
    rules: ['Indoor backup space available', 'Minimum spend required for bar service', 'Event must end by midnight'],
    rating: 4.7,
    reviewCount: 156,
    reviews: [],
    availability: [],
    featured: false,
    categories: ['Rooftops', 'Corporate Events'],
    owner: {
      name: 'Skyline Events',
      avatar: '',
      responseTime: 'within 3 hours',
      rating: 4.7
    }
  }
];

export const mockAddons: BookingAddon[] = [
  {
    id: 'a1',
    name: 'Premium Catering Package',
    description: 'Full-service catering with appetizers, entrees, and desserts',
    price: 2500,
    image: '',
    selected: false,
    category: 'catering'
  },
  {
    id: 'a2',
    name: 'Floral Decorations',
    description: 'Professional floral arrangements and centerpieces',
    price: 800,
    image: '',
    selected: false,
    category: 'decor'
  },
  {
    id: 'a3',
    name: 'Photography Package',
    description: '6 hours of professional photography with editing',
    price: 1200,
    image: '',
    selected: false,
    category: 'photography'
  },
  {
    id: 'a4',
    name: 'Sound & Lighting Equipment',
    description: 'Professional audio system with DJ booth and stage lighting',
    price: 600,
    image: '',
    selected: false,
    category: 'equipment'
  },
  {
    id: 'a5',
    name: 'Videography Service',
    description: 'Full-day video coverage with highlight reel',
    price: 1500,
    image: '',
    selected: false,
    category: 'photography'
  },
  {
    id: 'a6',
    name: 'Event Coordinator',
    description: 'Professional day-of event coordination',
    price: 900,
    image: '',
    selected: false,
    category: 'equipment'
  }
];
