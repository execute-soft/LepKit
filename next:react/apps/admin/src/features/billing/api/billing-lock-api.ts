export type BillingBalance = {
  balance: number;
  currency: string;
};

export async function fetchBillingLockSiteConfig() {
  return null;
}

export async function fetchBillingLockBalance() {
  return { balance: 0, currency: "USD" } as const;
}

