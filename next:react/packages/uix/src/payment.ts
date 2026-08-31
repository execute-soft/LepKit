export const checkoutPaymentMethodCodes = [
  "cod",
  "bkash",
  "stripe",
  "sslcommerz",
] as const;

export type CheckoutPaymentMethodCode = (typeof checkoutPaymentMethodCodes)[number];

const checkoutPaymentMethodOrder = new Map<CheckoutPaymentMethodCode, number>(
  checkoutPaymentMethodCodes.map((method, index) => [method, index]),
);

export function normalizeCheckoutPaymentMethod(
  value: unknown,
): CheckoutPaymentMethodCode | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim().toLowerCase().replace(/[_\s-]+/g, "");

  if (normalized === "cod" || normalized === "cashondelivery") return "cod";
  if (normalized === "bkash") return "bkash";
  if (normalized === "stripe" || normalized === "card" || normalized === "cardpayment") return "stripe";
  if (normalized === "sslcommerz" || normalized === "sslcommerce") return "sslcommerz";

  return undefined;
}

export function uniqueCheckoutPaymentMethods(
  values: unknown[],
): CheckoutPaymentMethodCode[] {
  return Array.from(
    new Set(
      values
        .map(normalizeCheckoutPaymentMethod)
        .filter((method): method is CheckoutPaymentMethodCode => Boolean(method)),
    ),
  );
}

export function orderCheckoutPaymentMethods(
  methods: CheckoutPaymentMethodCode[],
  defaultMethod?: CheckoutPaymentMethodCode,
) {
  return [...methods].sort((left, right) => {
    if (defaultMethod && left === defaultMethod) return -1;
    if (defaultMethod && right === defaultMethod) return 1;

    return (
      (checkoutPaymentMethodOrder.get(left) ?? Number.MAX_SAFE_INTEGER) -
      (checkoutPaymentMethodOrder.get(right) ?? Number.MAX_SAFE_INTEGER)
    );
  });
}
