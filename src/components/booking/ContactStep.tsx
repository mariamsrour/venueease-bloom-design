import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface ContactStepProps {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  billingAddress: string;
  city: string;
  state: string;
  zipCode: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  onFieldChange: (field: string, value: string) => void;
  onTermsChange: (accepted: boolean) => void;
  onPrivacyChange: (accepted: boolean) => void;
}

export default function ContactStep({
  fullName,
  email,
  phone,
  organization,
  billingAddress,
  city,
  state,
  zipCode,
  termsAccepted,
  privacyAccepted,
  onFieldChange,
  onTermsChange,
  onPrivacyChange
}: ContactStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Contact & Billing Information</h2>
        <p className="text-muted-foreground">We'll use this information to contact you about your booking</p>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Contact Information</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName" className="mb-2 block">Full Name *</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => onFieldChange('fullName', e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="mb-2 block">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => onFieldChange('email', e.target.value)}
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone" className="mb-2 block">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => onFieldChange('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>

          <div>
            <Label htmlFor="organization" className="mb-2 block">Organization (Optional)</Label>
            <Input
              id="organization"
              value={organization}
              onChange={(e) => onFieldChange('organization', e.target.value)}
              placeholder="Company name"
            />
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Billing Address</h3>

        <div>
          <Label htmlFor="billingAddress" className="mb-2 block">Street Address *</Label>
          <Input
            id="billingAddress"
            value={billingAddress}
            onChange={(e) => onFieldChange('billingAddress', e.target.value)}
            placeholder="123 Main Street"
            required
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city" className="mb-2 block">City *</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => onFieldChange('city', e.target.value)}
              placeholder="New York"
              required
            />
          </div>

          <div>
            <Label htmlFor="state" className="mb-2 block">State *</Label>
            <Input
              id="state"
              value={state}
              onChange={(e) => onFieldChange('state', e.target.value)}
              placeholder="NY"
              required
            />
          </div>

          <div>
            <Label htmlFor="zipCode" className="mb-2 block">ZIP Code *</Label>
            <Input
              id="zipCode"
              value={zipCode}
              onChange={(e) => onFieldChange('zipCode', e.target.value)}
              placeholder="10001"
              required
            />
          </div>
        </div>
      </div>

      {/* Terms and Privacy */}
      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={onTermsChange}
          />
          <Label htmlFor="terms" className="text-sm font-normal leading-relaxed cursor-pointer">
            I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a>
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="privacy"
            checked={privacyAccepted}
            onCheckedChange={onPrivacyChange}
          />
          <Label htmlFor="privacy" className="text-sm font-normal leading-relaxed cursor-pointer">
            I agree to the <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </Label>
        </div>
      </div>
    </div>
  );
}
