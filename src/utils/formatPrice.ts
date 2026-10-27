/**
 * Currency and Price Utility for British Pounds (GBP)
 */

export const gbpFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '£0';
  }
  return gbpFormatter.format(amount);
}

export function calculateKlarna3(amount: number): string {
  const installment = Math.ceil(amount / 3);
  return formatPrice(installment);
}

export function calculateKlarna12(amount: number, aprPercent: number = 0): string {
  const total = amount * (1 + aprPercent / 100);
  const monthly = Math.ceil(total / 12);
  return formatPrice(monthly);
}

export function calculateBundleSavings(originalTotal: number, discountPercent: number = 10): {
  original: number;
  discounted: number;
  savings: number;
} {
  const savings = Math.round(originalTotal * (discountPercent / 100));
  const discounted = originalTotal - savings;
  return {
    original: originalTotal,
    discounted,
    savings,
  };
}
