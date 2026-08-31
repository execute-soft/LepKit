import { describe, expect, it } from "vitest";
import {
  blockedDashboardFeatureForPath,
  buildDashboardFeatureAccessState,
  dashboardFeatureForPath,
  isPaymentFeatureEnabled,
  isPaymentsDashboardPath,
} from "./payment-feature-access";

describe("payment feature access", () => {
  it("builds dashboard feature state from provider-managed addons", () => {
    const state = buildDashboardFeatureAccessState([
      { key: "payment", enabled: true, status: "active" },
      { key: "blog", enabled: true, status: "active" },
      { key: "fraud", enabled: false, status: "disabled" },
      { key: "api-keys", enabled: true, status: "active" },
    ]);

    expect(state.payment).toBe(true);
    expect(state.blog).toBe(true);
    expect(state.fraud).toBe(false);
    expect(state.api).toBe(true);
    expect(state.pos).toBe(false);
  });

  it("normalizes blog aliases from governed feature access", () => {
    expect(
      buildDashboardFeatureAccessState([
        { key: "blog", enabled: true, status: "active" },
      ]).blog,
    ).toBe(true);
    expect(
      buildDashboardFeatureAccessState([
        { key: "Blog", enabled: true, status: "active" },
      ]).blog,
    ).toBe(true);
    expect(
      buildDashboardFeatureAccessState([
        { key: "blog", enabled: true, status: "disabled" },
      ]).blog,
    ).toBe(false);
  });

  it("preserves the payment helper for payment-only callers", () => {
    expect(
      isPaymentFeatureEnabled([
        { key: "payment", enabled: true, status: "active" },
      ]),
    ).toBe(true);
    expect(
      isPaymentFeatureEnabled([
        { key: "payment", enabled: false, status: "disabled" },
      ]),
    ).toBe(false);
    expect(isPaymentFeatureEnabled([{ key: "pos", enabled: true }])).toBe(
      false,
    );
  });

  it("matches feature-governed dashboard routes", () => {
    expect(dashboardFeatureForPath("/dashboard/fraud-risk/rules")?.key).toBe(
      "fraud",
    );
    expect(dashboardFeatureForPath("/dashboard/settings/api-keys")?.key).toBe(
      "api",
    );
    expect(
      dashboardFeatureForPath("/dashboard/orders/abandoned")?.key,
    ).toBe("abandoned_cart");
    expect(dashboardFeatureForPath("/dashboard/page")?.key).toBe("blog");
    expect(dashboardFeatureForPath("/dashboard/page/create")?.key).toBe("blog");
    expect(dashboardFeatureForPath("/dashboard/products")).toBeNull();
  });

  it("returns blocked features for disabled governed routes", () => {
    const state = buildDashboardFeatureAccessState([
      { key: "payment", enabled: true, status: "active" },
      { key: "blog", enabled: false, status: "disabled" },
      { key: "fraud", enabled: false, status: "disabled" },
    ]);

    expect(blockedDashboardFeatureForPath("/dashboard/payments", state)).toBeNull();
    expect(blockedDashboardFeatureForPath("/dashboard/page", state)?.key).toBe(
      "blog",
    );
    expect(
      blockedDashboardFeatureForPath("/dashboard/fraud-risk", state)?.key,
    ).toBe("fraud");
  });

  it("keeps payment route helpers compatible", () => {
    expect(isPaymentsDashboardPath("/dashboard/payments")).toBe(true);
    expect(isPaymentsDashboardPath("/dashboard/payments/methods")).toBe(true);
    expect(isPaymentsDashboardPath("/dashboard/products")).toBe(false);
  });
});
