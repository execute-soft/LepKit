export function parsePriceValue(price: string | number | null | undefined) {
  if (typeof price === "number") {
    return Number.isFinite(price) ? price : 0;
  }

  const value = Number((price ?? "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(value) ? value : 0;
}

export function discountPercent(
  comparePrice: string | number | null | undefined,
  salePrice: string | number | null | undefined,
) {
  const compare = parsePriceValue(comparePrice);
  const sale = parsePriceValue(salePrice);

  if (compare <= 0 || sale <= 0 || sale >= compare) {
    return 0;
  }

  return Math.round(((compare - sale) / compare) * 100);
}

export function discountLabel(
  comparePrice: string | number | null | undefined,
  salePrice: string | number | null | undefined,
  suffix = "OFF",
) {
  const discount = discountPercent(comparePrice, salePrice);
  return discount > 0 ? `${discount}% ${suffix}` : "";
}

export function lineItemTotal(price: number, quantity: number) {
  const safePrice = Number.isFinite(price) ? price : 0;
  const safeQuantity = Number.isFinite(quantity) ? quantity : 0;
  return Math.max(0, safePrice * safeQuantity);
}

export function cartSubtotal<T>(
  items: readonly T[],
  getPrice: (item: T) => number,
  getQuantity: (item: T) => number,
) {
  return items.reduce(
    (sum, item) => sum + lineItemTotal(getPrice(item), getQuantity(item)),
    0,
  );
}

export function clampQuantity(quantity: number, min = 1, max = 999) {
  if (!Number.isFinite(quantity)) return min;
  return Math.min(max, Math.max(min, Math.trunc(quantity)));
}

