import { useState, useMemo } from 'react';
import { VenueFilters, Venue } from '@/types/venue';

export function useVenueFilters(venues: Venue[]) {
  const [filters, setFilters] = useState<VenueFilters>({
    priceRange: [0, 10000],
    capacity: null,
    location: '',
    amenities: [],
    minRating: 0,
    featured: false,
    categories: []
  });

  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'featured'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredVenues = useMemo(() => {
    let result = venues.filter(venue => {
      // Price filter
      if (venue.pricing.basePrice < filters.priceRange[0] || venue.pricing.basePrice > filters.priceRange[1]) {
        return false;
      }

      // Capacity filter
      if (filters.capacity && venue.capacity.max < filters.capacity) {
        return false;
      }

      // Location filter
      if (filters.location && !venue.location.city.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity =>
          venue.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      // Rating filter
      if (venue.rating < filters.minRating) {
        return false;
      }

      // Featured filter
      if (filters.featured && !venue.featured) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0) {
        const hasCategory = filters.categories.some(cat =>
          venue.categories.includes(cat)
        );
        if (!hasCategory) return false;
      }

      return true;
    });

    // Sort results
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.pricing.basePrice - b.pricing.basePrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.pricing.basePrice - a.pricing.basePrice);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [venues, filters, sortBy]);

  const updateFilter = (key: keyof VenueFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 10000],
      capacity: null,
      location: '',
      amenities: [],
      minRating: 0,
      featured: false,
      categories: []
    });
  };

  return {
    filters,
    updateFilter,
    clearFilters,
    filteredVenues,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode
  };
}
