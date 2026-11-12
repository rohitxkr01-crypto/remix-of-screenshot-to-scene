/**
 * Nepal phone number validation.
 * Accepts mobiles (98/97/96 + 8 digits) and landlines (area code + number, 7–8 digits,
 * optional leading 0), with or without the +977 / 977 / 00977 country code.
 */
export function normalizeNepalPhone(input: string): string {
  let digits = input.replace(/[\s\-().]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  if (digits.startsWith("00977")) digits = digits.slice(5);
  else if (digits.startsWith("977") && digits.length > 10) digits = digits.slice(3);
  return digits;
}

export function isValidNepalPhone(input: string): boolean {
  const n = normalizeNepalPhone(input);
  if (!/^\d+$/.test(n)) return false;
  if (/^9[678]\d{8}$/.test(n)) return true; // mobile
  if (/^0?[1-9]\d{6,7}$/.test(n)) return true; // landline e.g. 041-591584
  return false;
}
