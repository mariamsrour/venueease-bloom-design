import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Share2, Heart, Users, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/venue/ImageGallery';
import AmenitiesGrid from '@/components/venue/AmenitiesGrid';
import BookingWidget from '@/components/venue/BookingWidget';
import ReviewsSection from '@/components/venue/ReviewsSection';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { mockVenues } from '@/lib/mockData';
import { formatCapacity } from '@/lib/formatters';
import { useState } from 'react';

export default function VenueDetails() {
  const { id } = useParams();
  const venue = mockVenues.find(v => v.id === id);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!venue) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Venue not found</h1>
            <Link to="/search">
              <Button>Browse Venues</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-background">
        <div className="container-responsive py-6">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/search">Search</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{venue.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Image Gallery */}
          <ImageGallery images={venue.images} venueName={venue.name} />

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{venue.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-semibold text-foreground">{venue.rating}</span>
                  <span>({venue.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{venue.location.address}, {venue.location.city}, {venue.location.state}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-primary text-primary' : ''}`} />
                Save
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">About this venue</h2>
                <p className="text-muted-foreground leading-relaxed">{venue.description}</p>
              </section>

              <Separator />

              {/* Capacity */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Capacity Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{formatCapacity(venue.capacity)}</div>
                      <div className="text-sm text-muted-foreground">Total capacity</div>
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Amenities */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                <AmenitiesGrid amenities={venue.amenities} />
              </section>

              <Separator />

              {/* Rules */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Venue Rules & Policies</h2>
                <ul className="space-y-2">
                  {venue.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{rule}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <Separator />

              {/* Reviews */}
              <section>
                <ReviewsSection
                  rating={venue.rating}
                  reviewCount={venue.reviewCount}
                  reviews={venue.reviews}
                />
              </section>
            </div>

            {/* Right Column - Booking Widget */}
            <div className="lg:col-span-1">
              <BookingWidget
                venueId={venue.id}
                basePrice={venue.pricing.basePrice}
                cleaningFee={venue.pricing.cleaningFee}
                serviceFee={venue.pricing.serviceFee}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
