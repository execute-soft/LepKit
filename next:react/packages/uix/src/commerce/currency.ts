const currencySymbols: Record<string, string> = {
  AED: "د.إ",
  BDT: "৳",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  SAR: "﷼",
  USD: "$",
};

const symbolCurrencies: Record<string, string> = {
  "$": "USD",
  "৳": "BDT",
  "€": "EUR",
  "£": "GBP",
  "₹": "INR",
};

export function normalizeCurrency(
  value: string | null | undefined,
  fallback = "BDT",
) {
  const currency = value?.trim();

  if (!currency) {
    return fallback.trim().toUpperCase() || "BDT";
  }

  return symbolCurrencies[currency] ?? currency.toUpperCase();
}

export function currencySymbol(
  value: string | null | undefined,
  fallback = "BDT",
) {
  const currency = normalizeCurrency(value, fallback);
  return currencySymbols[currency.toUpperCase()] ?? currency;
}

export function formatCurrency(
  value: number,
  currency: string | null | undefined,
  options: {
    fallbackCurrency?: string;
    fixedDecimals?: boolean;
    locale?: string;
  } = {},
) {
  const amount = Number.isFinite(value) ? value : 0;
  const normalized = normalizeCurrency(currency, options.fallbackCurrency);
  const symbol = currencySymbol(normalized, options.fallbackCurrency);
  const decimals = options.fixedDecimals ?? true;
  const formatted = decimals
    ? amount.toFixed(2)
    : new Intl.NumberFormat(options.locale ?? "en-BD", {
        maximumFractionDigits: 0,
      }).format(amount);

  return currencySymbols[normalized.toUpperCase()]
    ? `${symbol}${formatted}`
    : `${symbol} ${formatted}`;
}

export function formatCurrencyIntl(
  value: number,
  currency: string | null | undefined,
  options: {
    fallbackCurrency?: string;
    locale?: string;
    maximumFractionDigits?: number;
  } = {},
) {
  const normalized = normalizeCurrency(currency, options.fallbackCurrency);

  return new Intl.NumberFormat(options.locale ?? "en-BD", {
    style: "currency",
    currency: normalized,
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export { currencySymbols, symbolCurrencies };

