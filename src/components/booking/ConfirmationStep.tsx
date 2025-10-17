import { CheckCircle, Download, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice, formatDateRange } from '@/lib/formatters';
import { Link } from 'react-router-dom';

interface ConfirmationStepProps {
  bookingReference: string;
  venueName: string;
  startDate: Date | null;
  endDate: Date | null;
  guestCount: number;
  total: number;
}

export default function ConfirmationStep({
  bookingReference,
  venueName,
  startDate,
  endDate,
  guestCount,
  total
}: ConfirmationStepProps) {
  return (
    <div className="text-center space-y-8 py-8">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center animate-scale-in">
          <CheckCircle className="h-12 w-12 text-primary" />
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground">Your event space has been successfully reserved</p>
      </div>

      <div className="bg-card border rounded-lg p-6 max-w-md mx-auto">
        <div className="text-sm text-muted-foreground mb-2">Booking Reference</div>
        <div className="text-2xl font-bold text-primary mb-6">{bookingReference}</div>

        <div className="space-y-3 text-left">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Venue</span>
            <span className="font-semibold">{venueName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date</span>
            <span className="font-semibold">{formatDateRange(startDate, endDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Guests</span>
            <span className="font-semibold">{guestCount}</span>
          </div>
          <div className="flex justify-between pt-3 border-t">
            <span className="font-semibold">Total Paid</span>
            <span className="font-bold text-primary">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download Receipt
        </Button>
        <Button variant="outline">
          <Mail className="h-4 w-4 mr-2" />
          Email Confirmation
        </Button>
      </div>

      <div className="bg-muted/50 rounded-lg p-6 max-w-md mx-auto">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          What's Next?
        </h3>
        <ol className="text-left space-y-2 text-sm">
          <li className="flex gap-2">
            <span className="text-primary font-bold">1.</span>
            <span>Check your email for booking confirmation and receipt</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">2.</span>
            <span>Venue owner will contact you within 24 hours</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">3.</span>
            <span>Finalize event details and arrangements</span>
          </li>
        </ol>
      </div>

      <Link to="/">
        <Button size="lg">Return to Home</Button>
      </Link>
    </div>
  );
}
