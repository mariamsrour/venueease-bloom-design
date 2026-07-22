import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Search, CalendarCheck, CreditCard, PartyPopper, ShieldCheck, MessagesSquare, Sparkles, HeartHandshake } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover Venues",
    description: "Browse thousands of curated venues by location, capacity, date and style. Filter to find your perfect match.",
  },
  {
    icon: CalendarCheck,
    title: "Check Availability",
    description: "View real-time availability calendars and pricing. Compare venues side-by-side with ease.",
  },
  {
    icon: CreditCard,
    title: "Book Instantly",
    description: "Secure your date with our seamless booking flow. Multiple payment options and instant confirmation.",
  },
  {
    icon: PartyPopper,
    title: "Celebrate",
    description: "Enjoy your event stress-free. Our support team is available 24/7 to help you every step of the way.",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Venues",
    description: "Every venue on our platform is verified for quality, authenticity and safety standards.",
  },
  {
    icon: MessagesSquare,
    title: "Direct Communication",
    description: "Chat directly with venue owners to discuss custom requirements and get quick answers.",
  },
  {
    icon: Sparkles,
    title: "Premium Support",
    description: "Our dedicated concierge team helps you plan every detail from booking to your big day.",
  },
  {
    icon: HeartHandshake,
    title: "Best Price Guarantee",
    description: "Find a lower price elsewhere? We'll match it and give you an extra discount on your booking.",
  },
];

const faqs = [
  {
    q: "How do I book a venue?",
    a: "Simply browse venues, select your preferred date, review the details, and complete the booking flow. You'll receive instant confirmation via email.",
  },
  {
    q: "Can I cancel or modify my booking?",
    a: "Yes. Cancellation policies vary by venue and are clearly displayed on each listing. Most venues allow free cancellation up to 30 days before the event.",
  },
  {
    q: "Are there additional fees?",
    a: "All fees including cleaning, service, and taxes are transparently displayed in the price breakdown before you confirm your booking.",
  },
  {
    q: "How do I list my venue?",
    a: "Click 'List Your Venue' at the top of the page. Our onboarding takes less than 15 minutes and your listing goes live within 24 hours.",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container-responsive text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full border border-primary-foreground/30">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Simple. Transparent. Effortless.</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground">
            How VenueEase Works
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Booking your perfect event venue is just four easy steps away.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 flex-1">
        <div className="container-responsive">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative bg-card rounded-2xl p-6 md:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-primary-foreground font-bold text-lg">{index + 1}</span>
                  </div>
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container-responsive">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Choose <span className="gradient-text">VenueEase</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're committed to making your event planning journey smooth and delightful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex gap-4 bg-card p-6 rounded-2xl shadow-card">
                  <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-responsive max-w-3xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know before booking.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-card border border-border rounded-2xl p-6 hover:shadow-card transition-all">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground list-none">
                  {faq.q}
                  <span className="w-8 h-8 bg-muted rounded-full flex items-center justify-center group-open:rotate-45 transition-transform text-xl">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-hero">
        <div className="container-responsive text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
            Ready to Book Your Venue?
          </h2>
          <p className="text-lg text-primary-foreground/90">
            Join thousands of happy hosts who have found their perfect venue with VenueEase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/venues">
              <Button variant="secondary" size="xl">Browse Venues</Button>
            </Link>
            <Link to="/categories">
              <Button
                variant="outline"
                size="xl"
                className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Explore Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
