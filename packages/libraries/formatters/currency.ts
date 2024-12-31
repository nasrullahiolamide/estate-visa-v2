/**
 * Formats a number to a currency string using the specified locale and currency code.
 *
 * @param {number} amount - The number to be formatted.
 * @param {string} currency - The currency code (e.g., "USD", "NGN", "EUR").
 * @param {string} [locale="en-US"] - The locale for formatting (e.g., "en-US", "en-NG").
 * @param {Intl.NumberFormatOptions} [options={}] - Additional formatting options.
 * @returns {string} - The formatted currency string.
 */

export function formatCurrency(
  amount: number,
  currency: string,
  locale: string = "en-NG",
  options: Intl.NumberFormatOptions = {}
): string {
  if (amount === 0) {
    return "";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    ...options,
  })
    .format(amount)
    .replace(/([^\d])/, "$1 ");
}
