import { BookingAddon } from '@/types/booking';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { formatPrice } from '@/lib/formatters';
import { UtensilsCrossed, Camera, Music, Sparkles } from 'lucide-react';

interface AddonsStepProps {
  addons: BookingAddon[];
  onToggleAddon: (addonId: string) => void;
}

const addonIcons: { [key: string]: any } = {
  catering: UtensilsCrossed,
  photography: Camera,
  equipment: Music,
  decor: Sparkles,
};

export default function AddonsStep({ addons, onToggleAddon }: AddonsStepProps) {
  const selectedAddons = addons.filter(addon => addon.selected);
  const total = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Add-ons & Extras</h2>
        <p className="text-muted-foreground">Enhance your event with additional services</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {addons.map((addon) => {
          const Icon = addonIcons[addon.category] || Sparkles;
          return (
            <div
              key={addon.id}
              className={`border rounded-lg p-4 transition-all cursor-pointer ${
                addon.selected ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
              }`}
              onClick={() => onToggleAddon(addon.id)}
            >
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={addon.selected}
                  onCheckedChange={() => onToggleAddon(addon.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <Label className="font-semibold cursor-pointer">{addon.name}</Label>
                      <p className="text-sm text-muted-foreground mt-1">{addon.description}</p>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-primary mt-2">
                    {formatPrice(addon.price)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedAddons.length > 0 && (
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Add-ons Total:</span>
            <span className="text-xl font-bold text-primary">{formatPrice(total)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
