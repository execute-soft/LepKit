export type FeatureAccessAddon = Readonly<{
  key?: string | null;
  title?: string | null;
  enabled?: boolean | null;
  status?: string | null;
}>;

export type DashboardFeatureKey =
  | "abandoned_cart"
  | "affiliate"
  | "api"
  | "blog"
  | "fraud"
  | "merchant"
  | "partner"
  | "payment"
  | "pos"
  | "reporting"
  | "reseller"
  | "staff"
  | "supplier"
  | "webhooks"
  | "wholesale";

export type DashboardFeatureAccessState = Record<DashboardFeatureKey, boolean>;

type DashboardFeatureRule = Readonly<{
  key: DashboardFeatureKey;
  label: string;
  aliases?: readonly string[];
  patterns: readonly RegExp[];
}>;

const DISABLED_STATUSES = new Set(["disabled", "inactive", "blocked"]);

export const DASHBOARD_FEATURE_RULES: readonly DashboardFeatureRule[] = [
  {
    key: "payment",
    label: "Payment",
    aliases: ["payments", "payment_settings"],
    patterns: [/^\/dashboard\/payments(?:\/|$)/],
  },
  {
    key: "pos",
    label: "POS",
    patterns: [/^\/dashboard\/pos(?:\/|$)/],
  },
  {
    key: "blog",
    label: "Blog",
    patterns: [/^\/dashboard\/page(?:\/|$)/],
  },
  {
    key: "reporting",
    label: "Reporting",
    aliases: ["reports", "analytics"],
    patterns: [
      /^\/dashboard\/analytics(?:\/|$)/,
      /^\/dashboard\/reports(?:\/|$)/,
    ],
  },
  {
    key: "merchant",
    label: "Merchant",
    aliases: ["merchants"],
    patterns: [/^\/dashboard\/merchants(?:\/|$)/],
  },
  {
    key: "supplier",
    label: "Supplier",
    aliases: ["vendors"],
    patterns: [/^\/dashboard\/vendors(?:\/|$)/],
  },
  {
    key: "partner",
    label: "Partner",
    aliases: ["partners"],
    patterns: [/^\/dashboard\/integrations(?:\/|$)/],
  },
  {
    key: "affiliate",
    label: "Affiliate",
    aliases: ["affiliates"],
    patterns: [/^\/dashboard\/affiliates(?:\/|$)/],
  },
  {
    key: "reseller",
    label: "Reseller",
    aliases: ["resellers"],
    patterns: [/^\/dashboard\/resellers(?:\/|$)/],
  },
  {
    key: "wholesale",
    label: "Wholesale",
    patterns: [/^\/dashboard\/pricing(?:\/|$)/],
  },
  {
    key: "fraud",
    label: "Fraud",
    aliases: ["fraud_risk"],
    patterns: [/^\/dashboard\/fraud-risk(?:\/|$)/],
  },
  {
    key: "abandoned_cart",
    label: "Abandoned cart",
    aliases: ["abandoned-carts"],
    patterns: [/^\/dashboard\/orders\/abandoned(?:\/|$)/],
  },
  {
    key: "api",
    label: "API",
    aliases: ["api_keys"],
    patterns: [/^\/dashboard\/settings\/api-keys(?:\/|$)/],
  },
  {
    key: "webhooks",
    label: "Webhooks",
    patterns: [/^\/dashboard\/automation\/webhooks(?:\/|$)/],
  },
  {
    key: "staff",
    label: "Staff",
    aliases: ["team"],
    patterns: [/^\/dashboard\/settings\/team(?:\/|$)/],
  },
];

const FEATURE_KEYS = DASHBOARD_FEATURE_RULES.map((rule) => rule.key);
const FEATURE_KEY_BY_ALIAS = new Map<string, DashboardFeatureKey>(
  DASHBOARD_FEATURE_RULES.flatMap((rule) => [
    [rule.key, rule.key] as const,
    ...(rule.aliases ?? []).map((alias) => [alias, rule.key] as const),
  ]),
);

export const allDashboardFeaturesEnabled: DashboardFeatureAccessState =
  Object.fromEntries(FEATURE_KEYS.map((key) => [key, true])) as DashboardFeatureAccessState;

export const allDashboardFeaturesDisabled: DashboardFeatureAccessState =
  Object.fromEntries(FEATURE_KEYS.map((key) => [key, false])) as DashboardFeatureAccessState;

export function normalizeFeatureAccessKey(
  key: string | null | undefined,
): DashboardFeatureKey | null {
  const normalized = key?.trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (!normalized) {
    return null;
  }

  return FEATURE_KEY_BY_ALIAS.get(normalized) ?? null;
}

export function buildDashboardFeatureAccessState(
  addons: ReadonlyArray<FeatureAccessAddon> | null | undefined,
  fallback: DashboardFeatureAccessState = allDashboardFeaturesDisabled,
): DashboardFeatureAccessState {
  const state = { ...fallback };
  for (const addon of addons ?? []) {
    const key = normalizeFeatureAccessKey(addon.key);
    if (!key) {
      continue;
    }

    const status = addon.status?.trim().toLowerCase() ?? "";
    state[key] = addon.enabled === true && !DISABLED_STATUSES.has(status);
  }

  return state;
}

export function isDashboardFeatureEnabled(
  addons: ReadonlyArray<FeatureAccessAddon> | null | undefined,
  featureKey: DashboardFeatureKey,
) {
  return buildDashboardFeatureAccessState(addons)[featureKey];
}

export function dashboardFeatureForPath(pathname: string) {
  return (
    DASHBOARD_FEATURE_RULES.find((rule) =>
      rule.patterns.some((pattern) => pattern.test(pathname)),
    ) ?? null
  );
}

export function blockedDashboardFeatureForPath(
  pathname: string,
  state: DashboardFeatureAccessState,
) {
  const feature = dashboardFeatureForPath(pathname);
  if (!feature || state[feature.key]) {
    return null;
  }

  return feature;
}

export function isPaymentFeatureEnabled(
  addons: ReadonlyArray<FeatureAccessAddon> | null | undefined,
) {
  return isDashboardFeatureEnabled(addons, "payment");
}

export function isPaymentsDashboardPath(pathname: string) {
  return dashboardFeatureForPath(pathname)?.key === "payment";
}
