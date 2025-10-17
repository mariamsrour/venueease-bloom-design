export interface BookingState {
  venueId: string;
  venueName: string;
  venueImage: string;
  step: number;
  eventDetails: {
    startDate: Date | null;
    endDate: Date | null;
    eventType: string;
    guestCount: number;
    specialRequirements: string;
  };
  addons: BookingAddon[];
  contact: {
    fullName: string;
    email: string;
    phone: string;
    organization: string;
    billingAddress: string;
    city: string;
    state: string;
    zipCode: string;
  };
  payment: {
    method: 'card' | 'paypal';
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
  pricing: {
    basePrice: number;
    addonsTotal: number;
    cleaningFee: number;
    serviceFee: number;
    tax: number;
    total: number;
  };
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

export interface BookingAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  selected: boolean;
  category: 'catering' | 'decor' | 'photography' | 'equipment';
}

export interface BookingConfirmation {
  bookingReference: string;
  confirmationDate: string;
  venue: {
    name: string;
    image: string;
  };
  dates: {
    start: string;
    end: string;
  };
  guestCount: number;
  total: number;
}
