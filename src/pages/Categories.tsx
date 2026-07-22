import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PartyPopper, Building2, TreeDeciduous, Building, Sparkles, Users, ArrowRight, Utensils } from "lucide-react";
import venueBallroom from "@/assets/venue-ballroom.jpg";
import venueGarden from "@/assets/venue-garden.jpg";
import venueRooftop from "@/assets/venue-rooftop.jpg";
import heroVenue from "@/assets/hero-venue.jpg";

const categories = [
  {
    icon: PartyPopper,
    name: "Wedding Halls",
    slug: "Wedding Halls",
    count: 342,
    image: venueBallroom,
    description: "Elegant halls with timeless charm for your dream wedding celebration.",
  },
  {
    icon: TreeDeciduous,
    name: "Garden Venues",
    slug: "Gardens",
    count: 198,
    image: venueGarden,
    description: "Lush outdoor gardens perfect for romantic and intimate gatherings.",
  },
  {
    icon: Building2,
    name: "Rooftop Spaces",
    slug: "Rooftops",
    count: 156,
    image: venueRooftop,
    description: "Stunning skyline views for modern celebrations and cocktail parties.",
  },
  {
    icon: Building,
    name: "Ballrooms",
    slug: "Ballrooms",
    count: 287,
    image: heroVenue,
    description: "Grand ballrooms with sophisticated interiors for large events.",
  },
  {
    icon: Sparkles,
    name: "Corporate Events",
    slug: "Corporate Events",
    count: 214,
    image: venueRooftop,
    description: "Professional venues equipped for conferences, launches and meetings.",
  },
  {
    icon: Users,
    name: "Outdoor Venues",
    slug: "Outdoor Venues",
    count: 176,
    image: venueGarden,
    description: "Open-air spaces perfect for baby showers, engagements and festivals.",
  },
];

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container-responsive text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full border border-primary-foreground/30">
            <Utensils className="w-4 h-4" />
            <span className="text-sm font-medium">Explore Venue Categories</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground">
            Find Your <span className="block md:inline">Perfect Space</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Browse handpicked venue types tailored to every occasion and every style.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 flex-1">
        <div className="container-responsive">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.slug}
                  to={`/venues?category=${encodeURIComponent(category.slug)}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                    <div className="absolute top-4 left-4 w-12 h-12 bg-background/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-primary-foreground mb-1">
                        {category.name}
                      </h3>
                      <p className="text-primary-foreground/90 text-sm">
                        {category.count} venues available
                      </p>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <p className="text-muted-foreground">{category.description}</p>
                    <div className="flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all">
                      Browse {category.name}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container-responsive text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Can't find what you're looking for?
          </h2>
          <p className="text-muted-foreground text-lg">
            Browse our full catalog of venues or connect with our team for personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/venues">
              <Button size="lg">Browse All Venues</Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline" size="lg">How It Works</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Categories;
