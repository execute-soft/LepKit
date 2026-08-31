import type { ReactNode } from "react";
import { AlertTriangle, Info, Trash2, Edit, Plus } from "lucide-react";

import { Button } from "../react/primitives";
import ModalFrame, { type ModalFrameSize } from "./ModalFrame";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ConfirmModalType = "delete" | "edit" | "create" | "info" | "warning";

export type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  /** Pre-built type presets that set icon, colors, and default text */
  type?: ConfirmModalType;
  title?: string;
  description?: string | ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  /** Shortcut — auto-generates title/description like "Delete {itemName}?" */
  itemName?: string;
  size?: ModalFrameSize;
};

// ─── Presets ─────────────────────────────────────────────────────────────────

const presets: Record<
  ConfirmModalType,
  {
    icon: typeof Trash2;
    iconBg: string;
    iconColor: string;
    defaultTitle: string;
    defaultDescription: string;
    confirmVariant: "default" | "destructive" | "outline";
    defaultConfirmLabel: string;
  }
> = {
  delete: {
    icon: Trash2,
    iconBg: "bg-red-100 dark:bg-red-500/10",
    iconColor: "text-red-500",
    defaultTitle: "Delete Item",
    defaultDescription:
      "Are you sure you want to delete this item? This action cannot be undone.",
    confirmVariant: "destructive",
    defaultConfirmLabel: "Delete",
  },
  edit: {
    icon: Edit,
    iconBg: "bg-blue-100 dark:bg-blue-500/10",
    iconColor: "text-blue-500",
    defaultTitle: "Edit Item",
    defaultDescription: "Are you sure you want to save these changes?",
    confirmVariant: "default",
    defaultConfirmLabel: "Confirm",
  },
  create: {
    icon: Plus,
    iconBg: "bg-emerald-100 dark:bg-emerald-500/10",
    iconColor: "text-emerald-500",
    defaultTitle: "Create Item",
    defaultDescription: "Are you sure you want to create this item?",
    confirmVariant: "default",
    defaultConfirmLabel: "Create",
  },
  warning: {
    icon: AlertTriangle,
    iconBg: "bg-amber-100 dark:bg-amber-500/10",
    iconColor: "text-amber-500",
    defaultTitle: "Warning",
    defaultDescription: "Are you sure you want to proceed?",
    confirmVariant: "outline",
    defaultConfirmLabel: "Continue",
  },
  info: {
    icon: Info,
    iconBg: "bg-blue-100 dark:bg-blue-500/10",
    iconColor: "text-blue-500",
    defaultTitle: "Confirmation",
    defaultDescription: "Are you sure you want to proceed?",
    confirmVariant: "default",
    defaultConfirmLabel: "Confirm",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function resolveTitle(
  type: ConfirmModalType,
  title?: string,
  itemName?: string
): string {
  if (title) return title;
  if (itemName) {
    const verb =
      type === "delete"
        ? "Delete"
        : type === "edit"
          ? "Edit"
          : type === "create"
            ? "Create"
            : "";
    if (verb) return `${verb} ${itemName}`;
  }
  return presets[type].defaultTitle;
}

function resolveDescription(
  type: ConfirmModalType,
  description?: string | ReactNode,
  itemName?: string
): string | ReactNode {
  if (description) return description;
  if (itemName && type === "delete") {
    return `Are you sure you want to delete "${itemName}"? This action cannot be undone.`;
  }
  return presets[type].defaultDescription;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  type = "info",
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  isLoading = false,
  itemName,
  size = "md",
}: Readonly<ConfirmModalProps>) {
  const preset = presets[type];
  const Icon = preset.icon;

  const resolvedTitle = resolveTitle(type, title, itemName);
  const resolvedDescription = resolveDescription(type, description, itemName);
  const resolvedConfirmLabel = confirmLabel ?? preset.defaultConfirmLabel;

  return (
    <ModalFrame
      open={open}
      onClose={onClose}
      size={size}
      preventClose={isLoading}
    >
      {/* Icon + text */}
      <div className="flex gap-4">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-full ${preset.iconBg}`}
        >
          <Icon className={`size-5 ${preset.iconColor}`} />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold">{resolvedTitle}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {resolvedDescription}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
        >
          {cancelLabel}
        </Button>
        <Button
          type="button"
          variant={preset.confirmVariant}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Please wait…" : resolvedConfirmLabel}
        </Button>
      </div>
    </ModalFrame>
  );
}
