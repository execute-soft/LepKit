export function productPath(slugOrId: string | number | null | undefined) {
  const value = String(slugOrId ?? "").trim();
  return value ? `/products/${encodeURIComponent(value)}` : "/products";
}

export function collectionPath(slugOrId: string | number | null | undefined) {
  const value = String(slugOrId ?? "").trim();
  return value ? `/collections/${encodeURIComponent(value)}` : "/collections";
}

export function categoryPath(slugOrId: string | number | null | undefined) {
  const value = String(slugOrId ?? "").trim();
  return value ? `/categories/${encodeURIComponent(value)}` : "/categories";
}

