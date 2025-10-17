import { Wifi, Car, UtensilsCrossed, Music, Wind, GlassWater, TreePine, Check } from 'lucide-react';

interface AmenitiesGridProps {
  amenities: string[];
}

const amenityIcons: { [key: string]: any } = {
  'WiFi': Wifi,
  'Parking': Car,
  'Catering Kitchen': UtensilsCrossed,
  'Stage': Music,
  'Sound System': Music,
  'Air Conditioning': Wind,
  'Bar Area': GlassWater,
  'Outdoor Space': TreePine,
  'Garden': TreePine,
};

export default function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {amenities.map((amenity) => {
        const Icon = amenityIcons[amenity] || Check;
        return (
          <div key={amenity} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium">{amenity}</span>
          </div>
        );
      })}
    </div>
  );
}
