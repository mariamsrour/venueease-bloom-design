import { useState } from 'react';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import VenueCard from '@/components/VenueCard';
import VenueListItem from '@/components/VenueListItem';
import VenueFilters from '@/components/VenueFilters';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useVenueFilters } from '@/hooks/useVenueFilters';
import { mockVenues } from '@/lib/mockData';

export default function Search() {
  const { filters, updateFilter, clearFilters, filteredVenues, sortBy, setSortBy, viewMode, setViewMode } = useVenueFilters(mockVenues);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-background">
        {/* Search Bar Section */}
        <div className="bg-gradient-subtle border-b">
          <div className="container-responsive py-6">
            <SearchBar />
          </div>
        </div>

        {/* Results Section */}
        <div className="container-responsive py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <VenueFilters
                filters={filters}
                updateFilter={updateFilter}
                clearFilters={clearFilters}
              />
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold mb-1">
                    {filteredVenues.length} venues found
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Find the perfect space for your event
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Mobile Filter Button */}
                  <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full sm:w-96 overflow-y-auto">
                      <VenueFilters
                        filters={filters}
                        updateFilter={updateFilter}
                        clearFilters={clearFilters}
                        onClose={() => setIsFilterOpen(false)}
                      />
                    </SheetContent>
                  </Sheet>

                  {/* Sort Dropdown */}
                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Toggle */}
                  <div className="hidden sm:flex items-center gap-1 border rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode('grid')}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Venue Results */}
              {filteredVenues.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">No venues match your criteria</p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <>
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredVenues.map((venue) => (
                        <VenueCard key={venue.id} {...venue} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredVenues.map((venue) => (
                        <VenueListItem key={venue.id} venue={venue} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
