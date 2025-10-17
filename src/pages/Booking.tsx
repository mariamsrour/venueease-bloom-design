import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingProgress from '@/components/booking/BookingProgress';
import BookingSummary from '@/components/booking/BookingSummary';
import EventDetailsStep from '@/components/booking/EventDetailsStep';
import AddonsStep from '@/components/booking/AddonsStep';
import ContactStep from '@/components/booking/ContactStep';
import PaymentStep from '@/components/booking/PaymentStep';
import ConfirmationStep from '@/components/booking/ConfirmationStep';
import { Button } from '@/components/ui/button';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { mockVenues, mockAddons } from '@/lib/mockData';

const steps = ['Event Details', 'Add-ons', 'Contact', 'Payment', 'Confirmation'];

export default function Booking() {
  const { venueId } = useParams();
  const venue = mockVenues.find(v => v.id === venueId);
  
  const { booking, updateEventDetails, toggleAddon, updateContact, updatePayment, nextStep, prevStep, setAddons, initializeBooking, calculateTotal } = useBookingFlow(
    venue?.pricing.basePrice || 0,
    venue?.pricing.cleaningFee || 0,
    venue?.pricing.serviceFee || 0
  );

  useEffect(() => {
    if (venue) {
      initializeBooking(venue.id, venue.name, venue.images[0]);
      setAddons(mockAddons);
    }
  }, [venue]);

  useEffect(() => {
    calculateTotal();
  }, [booking.addons]);

  if (!venue) return null;

  const handleNext = () => {
    if (booking.step === 4) {
      // Simulate payment processing
      nextStep();
    } else {
      nextStep();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-background">
        <div className="container-responsive py-8">
          <BookingProgress currentStep={booking.step} steps={steps} />

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              {booking.step === 1 && (
                <EventDetailsStep
                  startDate={booking.eventDetails.startDate}
                  endDate={booking.eventDetails.endDate}
                  eventType={booking.eventDetails.eventType}
                  guestCount={booking.eventDetails.guestCount}
                  specialRequirements={booking.eventDetails.specialRequirements}
                  onStartDateChange={(date) => updateEventDetails({ startDate: date || null })}
                  onEndDateChange={(date) => updateEventDetails({ endDate: date || null })}
                  onEventTypeChange={(type) => updateEventDetails({ eventType: type })}
                  onGuestCountChange={(count) => updateEventDetails({ guestCount: count })}
                  onSpecialRequirementsChange={(req) => updateEventDetails({ specialRequirements: req })}
                />
              )}

              {booking.step === 2 && (
                <AddonsStep addons={booking.addons} onToggleAddon={toggleAddon} />
              )}

              {booking.step === 3 && (
                <ContactStep
                  {...booking.contact}
                  termsAccepted={booking.termsAccepted}
                  privacyAccepted={booking.privacyAccepted}
                  onFieldChange={(field, value) => updateContact({ [field]: value })}
                  onTermsChange={(accepted) => updateEventDetails({ ...booking.eventDetails })}
                  onPrivacyChange={(accepted) => updateEventDetails({ ...booking.eventDetails })}
                />
              )}

              {booking.step === 4 && (
                <PaymentStep
                  paymentMethod={booking.payment.method}
                  cardNumber={booking.payment.cardNumber}
                  expiryDate={booking.payment.expiryDate}
                  cvv={booking.payment.cvv}
                  onPaymentMethodChange={(method) => updatePayment({ method })}
                  onFieldChange={(field, value) => updatePayment({ [field]: value })}
                />
              )}

              {booking.step === 5 && (
                <ConfirmationStep
                  bookingReference={`VE${Math.random().toString(36).substr(2, 9).toUpperCase()}`}
                  venueName={venue.name}
                  startDate={booking.eventDetails.startDate}
                  endDate={booking.eventDetails.endDate}
                  guestCount={booking.eventDetails.guestCount}
                  total={booking.pricing.total}
                />
              )}

              {booking.step < 5 && (
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button variant="outline" onClick={prevStep} disabled={booking.step === 1}>
                    Back
                  </Button>
                  <Button onClick={handleNext}>
                    {booking.step === 4 ? 'Complete Booking' : 'Continue'}
                  </Button>
                </div>
              )}
            </div>

            {booking.step < 5 && (
              <div className="lg:col-span-1">
                <BookingSummary booking={booking} />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
