import { type ReactNode, useEffect, useCallback, useRef } from "react";
import { XIcon } from "lucide-react";
import { cn } from "../utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ModalFrameSize = "sm" | "md" | "lg" | "xl" | "full";

export type ModalFrameProps = {
  /** Controls whether the modal is visible */
  open: boolean;
  /** Called when the modal should close (backdrop click, Escape, X button) */
  onClose: () => void;
  children: ReactNode;
  /** Max-width preset for the modal panel */
  size?: ModalFrameSize;
  /** Extra classes for the modal panel */
  className?: string;
  /** Show / hide the X close button (default: true) */
  showCloseButton?: boolean;
  /** Prevent closing via backdrop click or Escape (default: false) */
  preventClose?: boolean;
};

// ─── Size map ────────────────────────────────────────────────────────────────

const sizeClasses: Record<ModalFrameSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-[calc(100%-2rem)]",
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function ModalFrame({
  open,
  onClose,
  children,
  size = "md",
  className,
  showCloseButton = true,
  preventClose = false,
}: Readonly<ModalFrameProps>) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && !preventClose) {
        onClose();
      }
    },
    [onClose, preventClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Handle backdrop click
  const handleBackdropClick = () => {
    if (!preventClose) onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop: dark + blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200"
        onClick={handleBackdropClick}
      />

      {/* Modal panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 w-full rounded-xl border border-border bg-background p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]",
          "animate-in fade-in-0 zoom-in-95 duration-200",
          "mx-4",
          sizeClasses[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 inline-flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none cursor-pointer"
            aria-label="Close"
          >
            <XIcon className="size-4" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
