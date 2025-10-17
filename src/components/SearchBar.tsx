import { MapPin, Calendar, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="w-full bg-background rounded-2xl shadow-xl p-2 md:p-3">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3">
        {/* Location */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
          <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Location
            </label>
            <Input
              type="text"
              placeholder="Where?"
              className="border-0 bg-transparent p-0 h-6 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
          <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Event Date
            </label>
            <Input
              type="date"
              className="border-0 bg-transparent p-0 h-6 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Capacity */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
          <Users className="w-5 h-5 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Guests
            </label>
            <Input
              type="number"
              placeholder="How many?"
              min="1"
              className="border-0 bg-transparent p-0 h-6 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Search Button */}
        <Button
          variant="hero"
          size="lg"
          className="w-full h-full min-h-[60px]"
        >
          <Search className="w-5 h-5 mr-2" />
          Search Venues
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
