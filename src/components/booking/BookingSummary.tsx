import { BookingState } from '@/types/booking';
import { formatPrice, formatDateRange } from '@/lib/formatters';
import { Separator } from '@/components/ui/separator';
import { Calendar, Users } from 'lucide-react';

interface BookingSummaryProps {
  booking: BookingState;
}

export default function BookingSummary({ booking }: BookingSummaryProps) {
  return (
    <div className="bg-card border rounded-lg p-6 sticky top-24 h-fit">
      <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>

      {/* Venue Info */}
      {booking.venueImage && (
        <div className="mb-4">
          <img
            src={booking.venueImage}
            alt={booking.venueName}
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
          <h4 className="font-semibold">{booking.venueName}</h4>
        </div>
      )}

      <Separator className="my-4" />

      {/* Event Details */}
      <div className="space-y-3 mb-4">
        {booking.eventDetails.startDate && booking.eventDetails.endDate && (
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="text-sm">
              <div className="font-medium">Date</div>
              <div className="text-muted-foreground">
                {formatDateRange(booking.eventDetails.startDate, booking.eventDetails.endDate)}
              </div>
            </div>
          </div>
        )}

        {booking.eventDetails.guestCount > 0 && (
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="text-sm">
              <div className="font-medium">Guests</div>
              <div className="text-muted-foreground">{booking.eventDetails.guestCount} people</div>
            </div>
          </div>
        )}
      </div>

      <Separator className="my-4" />

      {/* Price Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Base price</span>
          <span>{formatPrice(booking.pricing.basePrice)}</span>
        </div>

        {booking.pricing.addonsTotal > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Add-ons</span>
            <span>{formatPrice(booking.pricing.addonsTotal)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Cleaning fee</span>
          <span>{formatPrice(booking.pricing.cleaningFee)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Service fee</span>
          <span>{formatPrice(booking.pricing.serviceFee)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span>{formatPrice(booking.pricing.tax)}</span>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span className="text-primary">{formatPrice(booking.pricing.total)}</span>
        </div>
      </div>
    </div>
  );
}
