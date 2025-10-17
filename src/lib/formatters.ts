import { format } from 'date-fns';

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM d, yyyy');
}

export function formatDateRange(startDate: Date | null, endDate: Date | null): string {
  if (!startDate || !endDate) return 'Select dates';
  return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatCapacity(capacity: { min: number; max: number; seated?: number; standing?: number }): string {
  if (capacity.seated && capacity.standing) {
    return `${formatNumber(capacity.seated)} seated, ${formatNumber(capacity.standing)} standing`;
  }
  return `${formatNumber(capacity.min)} - ${formatNumber(capacity.max)} guests`;
}
