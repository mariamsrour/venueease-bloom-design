import { useState } from 'react';
import { BookingState, BookingAddon } from '@/types/booking';

const initialBookingState: BookingState = {
  venueId: '',
  venueName: '',
  venueImage: '',
  step: 1,
  eventDetails: {
    startDate: null,
    endDate: null,
    eventType: '',
    guestCount: 0,
    specialRequirements: ''
  },
  addons: [],
  contact: {
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: ''
  },
  payment: {
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  },
  pricing: {
    basePrice: 0,
    addonsTotal: 0,
    cleaningFee: 0,
    serviceFee: 0,
    tax: 0,
    total: 0
  },
  termsAccepted: false,
  privacyAccepted: false
};

export function useBookingFlow(basePrice: number, cleaningFee: number, serviceFee: number) {
  const [booking, setBooking] = useState<BookingState>(initialBookingState);

  const updateEventDetails = (details: Partial<BookingState['eventDetails']>) => {
    setBooking(prev => ({
      ...prev,
      eventDetails: { ...prev.eventDetails, ...details }
    }));
  };

  const toggleAddon = (addonId: string) => {
    setBooking(prev => ({
      ...prev,
      addons: prev.addons.map(addon =>
        addon.id === addonId ? { ...addon, selected: !addon.selected } : addon
      )
    }));
    calculateTotal();
  };

  const updateContact = (contact: Partial<BookingState['contact']>) => {
    setBooking(prev => ({
      ...prev,
      contact: { ...prev.contact, ...contact }
    }));
  };

  const updatePayment = (payment: Partial<BookingState['payment']>) => {
    setBooking(prev => ({
      ...prev,
      payment: { ...prev.payment, ...payment }
    }));
  };

  const calculateTotal = () => {
    const addonsTotal = booking.addons
      .filter(addon => addon.selected)
      .reduce((sum, addon) => sum + addon.price, 0);

    const subtotal = basePrice + addonsTotal + cleaningFee + serviceFee;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    setBooking(prev => ({
      ...prev,
      pricing: {
        basePrice,
        addonsTotal,
        cleaningFee,
        serviceFee,
        tax,
        total
      }
    }));
  };

  const nextStep = () => {
    setBooking(prev => ({ ...prev, step: Math.min(prev.step + 1, 5) }));
  };

  const prevStep = () => {
    setBooking(prev => ({ ...prev, step: Math.max(prev.step - 1, 1) }));
  };

  const setAddons = (addons: BookingAddon[]) => {
    setBooking(prev => ({ ...prev, addons }));
  };

  const initializeBooking = (venueId: string, venueName: string, venueImage: string) => {
    setBooking(prev => ({
      ...prev,
      venueId,
      venueName,
      venueImage,
      pricing: {
        ...prev.pricing,
        basePrice,
        cleaningFee,
        serviceFee
      }
    }));
    calculateTotal();
  };

  return {
    booking,
    updateEventDetails,
    toggleAddon,
    updateContact,
    updatePayment,
    nextStep,
    prevStep,
    setAddons,
    initializeBooking,
    calculateTotal
  };
}
