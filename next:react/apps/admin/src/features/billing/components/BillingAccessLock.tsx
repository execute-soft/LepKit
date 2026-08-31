import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AlertTriangle, Mail, MessageCircle } from "lucide-react";
import {
  fetchBillingLockBalance,
  fetchBillingLockSiteConfig,
  type BillingBalance,
} from "@/features/billing/api";
import {
  allDashboardFeaturesDisabled,
  allDashboardFeaturesEnabled,
  blockedDashboardFeatureForPath,
  buildDashboardFeatureAccessState,
  dashboardFeatureForPath,
  type DashboardFeatureAccessState,
} from "@/features/billing/lib/feature-access";
import { Button } from "@repo/uix/react/primitives";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/uix/react/primitives";

type BillingLockState =
  | { status: "loading" }
  | { status: "unlocked"; policy: PaymentLockPolicy }
  | { status: "locked"; balance: BillingBalance; policy: PaymentLockPolicy }
  | { status: "error"; message: string };

type PaymentLockPolicy = {
  enabled: boolean;
  sections: string[];
  featureAccess: DashboardFeatureAccessState;
};

const SUPPORT_EMAIL =
  (import.meta.env.VITE_SUPPORT_EMAIL as string | undefined)?.trim() ||
  "support@execute.dev";
const SUPPORT_WHATSAPP =
  (import.meta.env.VITE_SUPPORT_WHATSAPP as string | undefined)?.trim() ||
  "+8801700000000";
const isDevelopmentMode = import.meta.env.DEV;

const unlockedPaths = [
  "/dashboard",
  "/dashboard/payments",
  "/dashboard/payments/transactions",
  "/dashboard/support",
];
const defaultLockedSections = [
  "orders",
  "products",
  "catalog",
  "customers",
  "analytics",
  "reports",
  "marketing",
  "automation",
  "settings",
  "stores",
  "merchants",
  "themes",
  "marketplace",
  "payment_settings",
  "settlements",
  "taxes",
  "subscriptions",
  "pos",
  "localization",
  "pricing",
  "stock_alerts",
  "vendors",
  "returns",
  "shipping",
  "growth",
  "messaging",
  "loyalty_referrals",
  "discounts",
  "warehousing",
  "resellers",
  "affiliates",
  "integrations",
  "fraud_risk",
  "compliance",
];
const routeSectionMap: Array<[RegExp, string]> = [
  [/^\/dashboard\/orders(?:\/|$)/, "orders"],
  [/^\/dashboard\/products(?:\/|$)/, "products"],
  [/^\/dashboard\/catalog(?:\/|$)/, "catalog"],
  [/^\/dashboard\/customers(?:\/|$)/, "customers"],
  [/^\/dashboard\/analytics(?:\/|$)/, "analytics"],
  [/^\/dashboard\/reports(?:\/|$)/, "reports"],
  [/^\/dashboard\/marketing(?:\/|$)/, "marketing"],
  [/^\/dashboard\/automation(?:\/|$)/, "automation"],
  [/^\/dashboard\/settings(?:\/|$)/, "settings"],
  [/^\/dashboard\/stores(?:\/|$)/, "stores"],
  [/^\/dashboard\/merchants(?:\/|$)/, "merchants"],
  [/^\/dashboard\/themes(?:\/|$)/, "themes"],
  [/^\/dashboard\/marketplace(?:\/|$)/, "marketplace"],
  [/^\/dashboard\/payments\/(?:attempts|payouts|methods)(?:\/|$)/, "payment_settings"],
  [/^\/dashboard\/settlements(?:\/|$)/, "settlements"],
  [/^\/dashboard\/taxes(?:\/|$)/, "taxes"],
  [/^\/dashboard\/subscriptions(?:\/|$)/, "subscriptions"],
  [/^\/dashboard\/pos(?:\/|$)/, "pos"],
  [/^\/dashboard\/localization(?:\/|$)/, "localization"],
  [/^\/dashboard\/pricing(?:\/|$)/, "pricing"],
  [/^\/dashboard\/stock-alerts(?:\/|$)/, "stock_alerts"],
  [/^\/dashboard\/vendors(?:\/|$)/, "vendors"],
  [/^\/dashboard\/returns(?:\/|$)/, "returns"],
  [/^\/dashboard\/shipping(?:\/|$)/, "shipping"],
  [/^\/dashboard\/growth(?:\/|$)/, "growth"],
  [/^\/dashboard\/messaging(?:\/|$)/, "messaging"],
  [/^\/dashboard\/loyalty-referrals(?:\/|$)/, "loyalty_referrals"],
  [/^\/dashboard\/discounts(?:\/|$)/, "discounts"],
  [/^\/dashboard\/warehousing(?:\/|$)/, "warehousing"],
  [/^\/dashboard\/resellers(?:\/|$)/, "resellers"],
  [/^\/dashboard\/affiliates(?:\/|$)/, "affiliates"],
  [/^\/dashboard\/integrations(?:\/|$)/, "integrations"],
  [/^\/dashboard\/fraud-risk(?:\/|$)/, "fraud_risk"],
  [/^\/dashboard\/compliance(?:\/|$)/, "compliance"],
];

const unlockedPolicy: PaymentLockPolicy = {
  enabled: false,
  sections: [],
  featureAccess: allDashboardFeaturesEnabled,
};

function isUnlockedPath(pathname: string) {
  return unlockedPaths.includes(pathname);
}

function sectionForPath(pathname: string) {
  return routeSectionMap.find(([pattern]) => pattern.test(pathname))?.[1] ?? null;
}

function shouldLockPath(pathname: string, policy: PaymentLockPolicy) {
  if (!policy.enabled || isUnlockedPath(pathname)) {
    return false;
  }

  const section = sectionForPath(pathname);
  if (!section) {
    return false;
  }

  return policy.sections.includes(section);
}

async function loadPaymentLockPolicy(): Promise<PaymentLockPolicy> {
  const siteConfig = await fetchBillingLockSiteConfig();
  const providerManaged = siteConfig?.providerManaged;
  return {
    enabled: providerManaged?.paymentLockEnabled ?? true,
    sections:
      providerManaged?.paymentLockedSections?.filter((section) =>
        defaultLockedSections.includes(section),
      ) ?? defaultLockedSections,
    featureAccess: buildDashboardFeatureAccessState(
      providerManaged?.addons,
      allDashboardFeaturesDisabled,
    ),
  };
}

function formatMoney(amountMinor: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency || "BDT",
    maximumFractionDigits: 2,
  }).format(amountMinor / 100);
}

function buildWhatsAppHref() {
  const phone = SUPPORT_WHATSAPP.replace(/[^\d]/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(
    "My Bponi Plus payment balance is zero. Please help me reactivate my system dashboard.",
  )}`;
}

export default function BillingAccessLock({
  children,
}: Readonly<{ children: ReactNode }>) {
  const location = useLocation();
  const [lockState, setLockState] = useState<BillingLockState>({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const policy = await loadPaymentLockPolicy();
        if (cancelled) {
          return;
        }

        if (isDevelopmentMode) {
          setLockState({ status: "unlocked", policy });
          return;
        }

        const balance = await fetchBillingLockBalance();
        if (cancelled) {
          return;
        }

        if (balance && balance.totalRemainingMinor <= 0) {
          setLockState({ status: "locked", balance, policy });
          return;
        }

        setLockState({ status: "unlocked", policy });
      } catch (error) {
        if (!cancelled) {
          if (isDevelopmentMode) {
            setLockState({ status: "unlocked", policy: unlockedPolicy });
            return;
          }

          setLockState({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "Billing balance could not be checked.",
          });
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  const featureBlocked =
    (lockState.status === "locked" || lockState.status === "unlocked") &&
    blockedDashboardFeatureForPath(location.pathname, lockState.policy.featureAccess);
  const governedFeature = dashboardFeatureForPath(location.pathname);
  const paymentLocked =
    lockState.status === "locked" && shouldLockPath(location.pathname, lockState.policy);
  const locked = Boolean(featureBlocked) || paymentLocked;
  const contactEmailHref = useMemo(
    () =>
      `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
        "Bponi Plus dashboard payment lock",
      )}`,
    [],
  );

  if (
    lockState.status === "loading" &&
    governedFeature
  ) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-500 shadow-sm dark:border-border dark:bg-card dark:text-gray-400">
        Checking feature access...
      </div>
    );
  }

  return (
    <>
      <div className={locked ? "pointer-events-none select-none blur-[1.5px]" : undefined}>
        {featureBlocked ? null : children}
      </div>

      {lockState.status === "error" ? (
        <div className="fixed bottom-4 right-4 z-40 max-w-sm rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 shadow-lg dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
          {lockState.message}
        </div>
      ) : null}

      <Dialog open={locked}>
        <DialogContent showCloseButton={false} className="rounded-3xl sm:max-w-xl">
          <DialogHeader className="text-left">
            <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
              <AlertTriangle className="size-6" />
            </div>
            <DialogTitle>
              {featureBlocked
                ? `${featureBlocked.label} feature unavailable`
                : "Dashboard locked"}
            </DialogTitle>
            <DialogDescription>
              {featureBlocked
                ? `${featureBlocked.label} pages are not enabled for this tenant. Ask the platform team to enable ${featureBlocked.label} Feature Access from Hack tenant governance.`
                : "Your payment balance is zero. Please top up or contact support to unlock system console pages and actions."}
            </DialogDescription>
          </DialogHeader>

          {!featureBlocked && lockState.status === "locked" ? (
            <div className="rounded-2xl bg-gray-50 p-4 text-sm dark:bg-gray-900">
              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-500 dark:text-gray-400">Current balance</span>
                <span className="font-bold text-gray-950 dark:text-gray-100">
                  {formatMoney(
                    lockState.balance.totalRemainingMinor,
                    lockState.balance.currency,
                  )}
                </span>
              </div>
            </div>
          ) : null}

          <DialogFooter className="gap-2 sm:justify-start">
            {featureBlocked ? (
              <Button asChild>
                <Link to="/dashboard">Back to dashboard</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to="/dashboard/payments">Top up now</Link>
              </Button>
            )}
            <Button asChild variant="outline">
              <a href={buildWhatsAppHref()} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={contactEmailHref}>
                <Mail className="size-4" />
                Email support
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
