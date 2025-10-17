import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { VenueFilters as VenueFiltersType } from '@/types/venue';
import { formatPrice } from '@/lib/formatters';
import { X } from 'lucide-react';

interface VenueFiltersProps {
  filters: VenueFiltersType;
  updateFilter: (key: keyof VenueFiltersType, value: any) => void;
  clearFilters: () => void;
  onClose?: () => void;
}

const amenitiesList = ['WiFi', 'Parking', 'Catering Kitchen', 'Stage', 'Sound System', 'Air Conditioning', 'Bar Area', 'Outdoor Space', 'Garden'];
const categoriesList = ['Wedding Halls', 'Gardens', 'Rooftops', 'Corporate Events', 'Outdoor Venues'];

export default function VenueFilters({ filters, updateFilter, clearFilters, onClose }: VenueFiltersProps) {
  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    updateFilter('amenities', newAmenities);
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilter('categories', newCategories);
  };

  return (
    <div className="bg-card rounded-lg border p-6 h-fit sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <Accordion type="multiple" defaultValue={['price', 'capacity', 'amenities', 'rating']} className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                min={0}
                max={10000}
                step={100}
                value={filters.priceRange}
                onValueChange={(value) => updateFilter('priceRange', value)}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatPrice(filters.priceRange[0])}</span>
                <span>{formatPrice(filters.priceRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="capacity">
          <AccordionTrigger>Guest Capacity</AccordionTrigger>
          <AccordionContent>
            <div className="pt-2">
              <Input
                type="number"
                placeholder="Minimum guests"
                value={filters.capacity || ''}
                onChange={(e) => updateFilter('capacity', e.target.value ? parseInt(e.target.value) : null)}
                min="0"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {categoriesList.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label htmlFor={`cat-${category}`} className="text-sm font-normal cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="amenities">
          <AccordionTrigger>Amenities</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={filters.amenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <Label htmlFor={amenity} className="text-sm font-normal cursor-pointer">
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Minimum Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {[4, 4.5].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.minRating === rating}
                    onCheckedChange={(checked) => updateFilter('minRating', checked ? rating : 0)}
                  />
                  <Label htmlFor={`rating-${rating}`} className="text-sm font-normal cursor-pointer">
                    {rating}+ stars
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="featured">
          <AccordionTrigger>Featured Only</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="featured"
                checked={filters.featured}
                onCheckedChange={(checked) => updateFilter('featured', checked)}
              />
              <Label htmlFor="featured" className="text-sm font-normal cursor-pointer">
                Show featured venues only
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
