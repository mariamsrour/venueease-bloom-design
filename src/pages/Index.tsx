import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import VenueCard from "@/components/VenueCard";
import { Button } from "@/components/ui/button";
import { PartyPopper, Building2, TreeDeciduous, Building, Star, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-venue.jpg";
import venueGarden from "@/assets/venue-garden.jpg";
import venueRooftop from "@/assets/venue-rooftop.jpg";
import venueBallroom from "@/assets/venue-ballroom.jpg";

const Index = () => {
  const featuredVenues = [
    {
      id: "1",
      name: "The Grand Garden Estate",
      image: venueGarden,
      location: "Napa Valley, CA",
      capacity: 250,
      pricePerDay: 5500,
      rating: 4.9,
      reviewCount: 127,
      featured: true,
      categories: ["Garden", "Wedding"],
    },
    {
      id: "2",
      name: "Skyline Rooftop Lounge",
      image: venueRooftop,
      location: "Manhattan, NY",
      capacity: 150,
      pricePerDay: 8200,
      rating: 4.8,
      reviewCount: 89,
      featured: true,
      categories: ["Rooftop", "Corporate"],
    },
    {
      id: "3",
      name: "Crystal Ballroom Palace",
      image: venueBallroom,
      location: "Beverly Hills, CA",
      capacity: 400,
      pricePerDay: 12000,
      rating: 5.0,
      reviewCount: 203,
      featured: true,
      categories: ["Ballroom", "Luxury"],
    },
  ];

  const categories = [
    { icon: PartyPopper, name: "Wedding Halls", count: 342 },
    { icon: TreeDeciduous, name: "Garden Venues", count: 198 },
    { icon: Building2, name: "Rooftop Spaces", count: 156 },
    { icon: Building, name: "Ballrooms", count: 287 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Beautiful event venue"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-responsive pt-20 pb-32 md:pt-28 md:pb-40">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm text-secondary-foreground px-4 py-2 rounded-full border border-secondary/30 shadow-md">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span className="text-sm font-medium">Trusted by 10,000+ happy clients</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Find Your Perfect
              <span className="block gradient-text mt-2">Event Venue</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover and book stunning venues for weddings, celebrations, and special events. 
              Simple booking, memorable moments.
            </p>

            {/* Search Bar */}
            <div className="pt-4 animate-slide-up">
              <SearchBar />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold gradient-text">1,200+</p>
                <p className="text-sm text-muted-foreground mt-1">Venues</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold gradient-text">50+</p>
                <p className="text-sm text-muted-foreground mt-1">Cities</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold gradient-text">10K+</p>
                <p className="text-sm text-muted-foreground mt-1">Happy Events</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container-responsive">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Browse by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find the perfect venue type for your special occasion
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <button
                  key={index}
                  className="group bg-card p-6 md:p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                    {category.name}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {category.count} venues
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Venues Section */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold">
                Featured <span className="gradient-text">Venues</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Hand-picked premium venues for unforgettable events
              </p>
            </div>
            <Button variant="outline" size="lg">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredVenues.map((venue) => (
              <VenueCard key={venue.id} {...venue} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10" />
        
        <div className="container-responsive relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
              List Your Venue & Reach Thousands
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
              Join our platform and connect with clients looking for the perfect event space. 
              Easy management, guaranteed bookings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="secondary" size="xl">
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
