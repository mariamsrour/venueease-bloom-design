import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { formatPrice, formatDateRange } from '@/lib/formatters';
import { Calendar as CalendarIcon, Users, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingWidgetProps {
  venueId: string;
  basePrice: number;
  cleaningFee: number;
  serviceFee: number;
}

export default function BookingWidget({ venueId, basePrice, cleaningFee, serviceFee }: BookingWidgetProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [guests, setGuests] = useState(50);
  const navigate = useNavigate();

  const numberOfDays = startDate && endDate
    ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) || 1
    : 1;

  const subtotal = basePrice * numberOfDays;
  const total = subtotal + cleaningFee + serviceFee;

  const handleReserve = () => {
    navigate(`/booking/${venueId}`);
  };

  return (
    <div className="bg-card border rounded-lg p-6 shadow-lg sticky top-24">
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-primary">{formatPrice(basePrice)}</span>
          <span className="text-muted-foreground">/ day</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {/* Date Selection */}
        <div>
          <Label className="mb-2 block">Event Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !startDate && !endDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDateRange(startDate || null, endDate || null)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guest Count */}
        <div>
          <Label htmlFor="guests" className="mb-2 block">Number of Guests</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="guests"
              type="number"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 0)}
              min="1"
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <Button className="w-full mb-4" size="lg" onClick={handleReserve}>
        Reserve Now
      </Button>

      <Button variant="outline" className="w-full mb-6">
        <MessageCircle className="mr-2 h-4 w-4" />
        Contact Owner
      </Button>

      <Separator className="mb-4" />

      {/* Price Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {formatPrice(basePrice)} x {numberOfDays} {numberOfDays === 1 ? 'day' : 'days'}
          </span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Cleaning fee</span>
          <span>{formatPrice(cleaningFee)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Service fee</span>
          <span>{formatPrice(serviceFee)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-primary">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
