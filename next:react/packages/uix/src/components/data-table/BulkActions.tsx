import { Button } from "../../react/primitives";
import toast from "react-hot-toast";

export interface BulkAction {
  label: string;
  variant?:
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
  onClick: (selectedIds: string[]) => Promise<void>;
  className?: string;
}

interface BulkActionsProps {
  selectedIds: string[];
  actions: BulkAction[];
  onActionComplete?: () => void;
}

export function BulkActions({
  selectedIds,
  actions,
  onActionComplete,
}: Readonly<BulkActionsProps>) {
  if (selectedIds.length === 0) return null;

  const handleAction = async (action: BulkAction) => {
    try {
      await action.onClick(selectedIds);
      onActionComplete?.();
    } catch (error) {
      toast.error("Action failed");
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-start gap-2">
      {actions.map((action, index) => (
        <Button
          key={index}
          type="button"
          variant={action.variant || "default"}
          size="sm"
          onClick={() => handleAction(action)}
          className={action.className}
        >
          {action.label} ({selectedIds.length})
        </Button>
      ))}
    </div>
  );
}
