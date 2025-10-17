import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Wallet } from 'lucide-react';

interface PaymentStepProps {
  paymentMethod: 'card' | 'paypal';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  onPaymentMethodChange: (method: 'card' | 'paypal') => void;
  onFieldChange: (field: string, value: string) => void;
}

export default function PaymentStep({
  paymentMethod,
  cardNumber,
  expiryDate,
  cvv,
  onPaymentMethodChange,
  onFieldChange
}: PaymentStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
        <p className="text-muted-foreground">Choose how you'd like to pay for your booking</p>
      </div>

      {/* Payment Method Selection */}
      <RadioGroup value={paymentMethod} onValueChange={(value: 'card' | 'paypal') => onPaymentMethodChange(value)}>
        <div className="grid gap-4">
          <div
            className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-all ${
              paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
            }`}
            onClick={() => onPaymentMethodChange('card')}
          >
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold">Credit/Debit Card</div>
                <div className="text-sm text-muted-foreground">Pay with Visa, Mastercard, or Amex</div>
              </div>
            </Label>
          </div>

          <div
            className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-all ${
              paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
            }`}
            onClick={() => onPaymentMethodChange('paypal')}
          >
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="flex items-center gap-3 cursor-pointer flex-1">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold">PayPal</div>
                <div className="text-sm text-muted-foreground">Pay securely with PayPal</div>
              </div>
            </Label>
          </div>
        </div>
      </RadioGroup>

      {/* Card Details Form */}
      {paymentMethod === 'card' && (
        <div className="space-y-4 pt-4 border-t">
          <div>
            <Label htmlFor="cardNumber" className="mb-2 block">Card Number</Label>
            <Input
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => onFieldChange('cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate" className="mb-2 block">Expiry Date</Label>
              <Input
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => onFieldChange('expiryDate', e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>

            <div>
              <Label htmlFor="cvv" className="mb-2 block">CVV</Label>
              <Input
                id="cvv"
                value={cvv}
                onChange={(e) => onFieldChange('cvv', e.target.value)}
                placeholder="123"
                maxLength={4}
                type="password"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
            <CreditCard className="h-4 w-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>
        </div>
      )}

      {/* PayPal Notice */}
      {paymentMethod === 'paypal' && (
        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            You'll be redirected to PayPal to complete your payment securely.
          </p>
        </div>
      )}
    </div>
  );
}
