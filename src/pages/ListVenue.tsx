import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  Users,
  DollarSign,
  Camera,
  Sparkles,
  Check,
  ChevronLeft,
  ChevronRight,
  Upload,
  PartyPopper,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type VenueData = {
  name: string;
  type: string;
  description: string;
  address: string;
  city: string;
  country: string;
  capacity: string;
  minCapacity: string;
  pricePerHour: string;
  pricePerDay: string;
  amenities: string[];
  photos: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
};

const STEPS = [
  { id: 1, title: "Venue Basics", icon: Building2 },
  { id: 2, title: "Location", icon: MapPin },
  { id: 3, title: "Capacity & Pricing", icon: DollarSign },
  { id: 4, title: "Amenities", icon: Sparkles },
  { id: 5, title: "Photos", icon: Camera },
  { id: 6, title: "Contact", icon: Users },
];

const AMENITY_OPTIONS = [
  "WiFi", "Parking", "Catering", "Sound System", "Stage", "Lighting",
  "Air Conditioning", "Bridal Suite", "Outdoor Area", "Dance Floor",
  "Bar Service", "Valet", "Wheelchair Access", "Kitchen",
];

const VENUE_TYPES = [
  "Wedding Hall", "Banquet Hall", "Garden", "Rooftop",
  "Beach Venue", "Hotel Ballroom", "Restaurant", "Conference Hall", "Other",
];

const ListVenue = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<VenueData>({
    name: "",
    type: "",
    description: "",
    address: "",
    city: "",
    country: "",
    capacity: "",
    minCapacity: "",
    pricePerHour: "",
    pricePerDay: "",
    amenities: [],
    photos: [],
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const update = <K extends keyof VenueData>(key: K, value: VenueData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const toggleAmenity = (a: string) => {
    update(
      "amenities",
      data.amenities.includes(a)
        ? data.amenities.filter((x) => x !== a)
        : [...data.amenities, a]
    );
  };

  const handlePhotoUpload = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).slice(0, 8 - data.photos.length).map((f) => URL.createObjectURL(f));
    update("photos", [...data.photos, ...urls]);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!data.name && !!data.type && !!data.description;
      case 2: return !!data.address && !!data.city && !!data.country;
      case 3: return !!data.capacity && !!data.pricePerHour;
      case 4: return data.amenities.length > 0;
      case 5: return data.photos.length >= 1;
      case 6: return !!data.contactName && !!data.contactEmail;
      default: return true;
    }
  };

  const handleNext = () => {
    if (!canProceed()) {
      toast.error("Please complete the required fields");
      return;
    }
    if (step < STEPS.length) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    toast.success("🎉 Venue submitted! Our team will review it within 24 hours.");
    setTimeout(() => navigate("/"), 1200);
  };

  const progress = (step / STEPS.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-hero py-10 md:py-14 border-b border-border">
        <div className="container-responsive text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <PartyPopper className="w-4 h-4" />
            Earn with your space
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            List Your Venue on <span className="gradient-text">VenueEase</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Reach thousands of event planners looking for the perfect space. Setup takes about 10 minutes.
          </p>
        </div>
      </section>

      <main className="flex-1 py-8 md:py-12">
        <div className="container-responsive max-w-4xl">
          {/* Stepper */}
          <div className="mb-8">
            <div className="hidden md:flex items-center justify-between mb-4">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const done = step > s.id;
                const active = step === s.id;
                return (
                  <div key={s.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={cn(
                          "w-11 h-11 rounded-full flex items-center justify-center transition-all",
                          done && "bg-primary text-primary-foreground",
                          active && "bg-gradient-primary text-primary-foreground shadow-lg scale-110",
                          !done && !active && "bg-muted text-muted-foreground"
                        )}
                      >
                        {done ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <span className={cn(
                        "text-xs mt-2 font-medium text-center",
                        active ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {s.title}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={cn(
                        "h-0.5 flex-1 mx-1 mb-6 transition-colors",
                        step > s.id ? "bg-primary" : "bg-border"
                      )} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile progress */}
            <div className="md:hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">
                  Step {step} of {STEPS.length}
                </span>
                <span className="text-sm text-muted-foreground">{STEPS[step - 1].title}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="bg-card rounded-2xl border border-border shadow-lg p-6 md:p-8 animate-fade-in">
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Tell us about your venue</h2>
                  <p className="text-muted-foreground text-sm">Basic details that guests will see first.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Venue Name *</Label>
                  <Input id="name" placeholder="e.g. The Grand Ballroom" value={data.name}
                    onChange={(e) => update("name", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Venue Type *</Label>
                  <Select value={data.type} onValueChange={(v) => update("type", v)}>
                    <SelectTrigger><SelectValue placeholder="Select venue type" /></SelectTrigger>
                    <SelectContent>
                      {VENUE_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea id="description" rows={5}
                    placeholder="Describe what makes your venue special..."
                    value={data.description}
                    onChange={(e) => update("description", e.target.value)} />
                  <p className="text-xs text-muted-foreground">{data.description.length}/500 characters</p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Where is it located?</h2>
                  <p className="text-muted-foreground text-sm">Help guests find you.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input id="address" placeholder="123 Main Street" value={data.address}
                    onChange={(e) => update("address", e.target.value)} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" placeholder="Dubai" value={data.city}
                      onChange={(e) => update("city", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input id="country" placeholder="United Arab Emirates" value={data.country}
                      onChange={(e) => update("country", e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Capacity & Pricing</h2>
                  <p className="text-muted-foreground text-sm">How many guests, and at what price?</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minCapacity">Minimum Guests</Label>
                    <Input id="minCapacity" type="number" placeholder="20" value={data.minCapacity}
                      onChange={(e) => update("minCapacity", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Maximum Guests *</Label>
                    <Input id="capacity" type="number" placeholder="200" value={data.capacity}
                      onChange={(e) => update("capacity", e.target.value)} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pricePerHour">Price / Hour ($) *</Label>
                    <Input id="pricePerHour" type="number" placeholder="150" value={data.pricePerHour}
                      onChange={(e) => update("pricePerHour", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricePerDay">Price / Day ($)</Label>
                    <Input id="pricePerDay" type="number" placeholder="1200" value={data.pricePerDay}
                      onChange={(e) => update("pricePerDay", e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-bold mb-1">What does your venue offer?</h2>
                  <p className="text-muted-foreground text-sm">Select all amenities available to guests.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {AMENITY_OPTIONS.map((a) => {
                    const active = data.amenities.includes(a);
                    return (
                      <button
                        key={a}
                        type="button"
                        onClick={() => toggleAmenity(a)}
                        className={cn(
                          "flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all text-left",
                          active
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/40 hover:bg-muted"
                        )}
                      >
                        <Checkbox checked={active} className="pointer-events-none" />
                        {a}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Show off your space</h2>
                  <p className="text-muted-foreground text-sm">Upload at least 1 photo (up to 8). Higher quality = more bookings.</p>
                </div>
                <label className="block border-2 border-dashed border-border rounded-2xl p-8 text-center cursor-pointer hover:border-primary hover:bg-muted/40 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handlePhotoUpload(e.target.files)}
                  />
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="font-semibold mb-1">Click to upload photos</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB each</p>
                </label>

                {data.photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {data.photos.map((src, i) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border group">
                        <img src={src} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => update("photos", data.photos.filter((_, idx) => idx !== i))}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-background/90 text-foreground text-xs opacity-0 group-hover:opacity-100 transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === 6 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-bold mb-1">How can we reach you?</h2>
                  <p className="text-muted-foreground text-sm">We'll use this to notify you about bookings.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Full Name *</Label>
                  <Input id="contactName" placeholder="Jane Doe" value={data.contactName}
                    onChange={(e) => update("contactName", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email *</Label>
                  <Input id="contactEmail" type="email" placeholder="you@example.com" value={data.contactEmail}
                    onChange={(e) => update("contactEmail", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone</Label>
                  <Input id="contactPhone" type="tel" placeholder="+1 555 000 0000" value={data.contactPhone}
                    onChange={(e) => update("contactPhone", e.target.value)} />
                </div>

                {/* Review summary */}
                <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" /> Review your listing
                  </h3>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div><dt className="text-muted-foreground">Name</dt><dd className="font-medium">{data.name || "—"}</dd></div>
                    <div><dt className="text-muted-foreground">Type</dt><dd className="font-medium">{data.type || "—"}</dd></div>
                    <div><dt className="text-muted-foreground">Location</dt><dd className="font-medium">{data.city || "—"}, {data.country || "—"}</dd></div>
                    <div><dt className="text-muted-foreground">Capacity</dt><dd className="font-medium">Up to {data.capacity || "—"} guests</dd></div>
                    <div><dt className="text-muted-foreground">Price/hour</dt><dd className="font-medium">${data.pricePerHour || "—"}</dd></div>
                    <div><dt className="text-muted-foreground">Amenities</dt><dd className="font-medium">{data.amenities.length} selected</dd></div>
                    <div><dt className="text-muted-foreground">Photos</dt><dd className="font-medium">{data.photos.length} uploaded</dd></div>
                  </dl>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button variant={step === STEPS.length ? "hero" : "default"} onClick={handleNext}>
                {step === STEPS.length ? "Submit Listing" : "Continue"}
                {step !== STEPS.length && <ChevronRight className="w-4 h-4 ml-1" />}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ListVenue;
