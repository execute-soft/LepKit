import * as React from "react";

import { StatusPill, type StatusPillProps, type StatusTone } from "../../data-display";

const orderStatusTones: Record<string, StatusTone> = {
  pending: "pending",
  paid: "paid",
  unpaid: "unpaid",
  shipped: "shipped",
  delivered: "delivered",
  cancelled: "cancelled",
  failed: "danger",
};

export type CommerceStatusBadgeProps = Omit<StatusPillProps, "tone"> & {
  status: string;
  tone?: StatusTone;
};

function statusLabel(status: string) {
  return status
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function CommerceStatusBadge({ status, tone, children, ...props }: CommerceStatusBadgeProps) {
  return (
    <StatusPill tone={tone ?? orderStatusTones[status.toLowerCase()] ?? "neutral"} {...props}>
      {children ?? statusLabel(status)}
    </StatusPill>
  );
}

export function OrderStatusBadge(props: CommerceStatusBadgeProps) {
  return <CommerceStatusBadge {...props} />;
}

export function PaymentMethodBadge(props: CommerceStatusBadgeProps) {
  return <CommerceStatusBadge {...props} />;
}

export function ShippingStatusBadge(props: CommerceStatusBadgeProps) {
  return <CommerceStatusBadge {...props} />;
}

