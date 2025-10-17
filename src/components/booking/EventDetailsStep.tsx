import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { formatDateRange } from '@/lib/formatters';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventDetailsStepProps {
  startDate: Date | null;
  endDate: Date | null;
  eventType: string;
  guestCount: number;
  specialRequirements: string;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  onEventTypeChange: (type: string) => void;
  onGuestCountChange: (count: number) => void;
  onSpecialRequirementsChange: (requirements: string) => void;
}

const eventTypes = [
  'Wedding',
  'Birthday Party',
  'Corporate Event',
  'Engagement',
  'Baby Shower',
  'Anniversary',
  'Conference',
  'Fundraiser',
  'Other'
];

export default function EventDetailsStep({
  startDate,
  endDate,
  eventType,
  guestCount,
  specialRequirements,
  onStartDateChange,
  onEndDateChange,
  onEventTypeChange,
  onGuestCountChange,
  onSpecialRequirementsChange
}: EventDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Event Details</h2>
        <p className="text-muted-foreground">Tell us about your event</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Start Date */}
        <div>
          <Label className="mb-2 block">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !startDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? formatDateRange(startDate, startDate) : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate || undefined}
                onSelect={onStartDateChange}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date */}
        <div>
          <Label className="mb-2 block">End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !endDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? formatDateRange(endDate, endDate) : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate || undefined}
                onSelect={onEndDateChange}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Event Type */}
      <div>
        <Label className="mb-2 block">Event Type</Label>
        <Select value={eventType} onValueChange={onEventTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select event type" />
          </SelectTrigger>
          <SelectContent>
            {eventTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Guest Count */}
      <div>
        <Label htmlFor="guestCount" className="mb-2 block">Number of Guests</Label>
        <Input
          id="guestCount"
          type="number"
          value={guestCount || ''}
          onChange={(e) => onGuestCountChange(parseInt(e.target.value) || 0)}
          min="1"
          placeholder="Enter number of guests"
        />
      </div>

      {/* Special Requirements */}
      <div>
        <Label htmlFor="specialRequirements" className="mb-2 block">
          Special Requirements (Optional)
        </Label>
        <Textarea
          id="specialRequirements"
          value={specialRequirements}
          onChange={(e) => onSpecialRequirementsChange(e.target.value)}
          placeholder="Any special requests or requirements for your event..."
          rows={4}
        />
      </div>
    </div>
  );
}
