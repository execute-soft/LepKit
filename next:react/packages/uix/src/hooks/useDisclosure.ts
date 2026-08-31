import * as React from "react";

export function useDisclosure(defaultOpen = false) {
  const [open, setOpen] = React.useState(defaultOpen);

  return {
    open,
    setOpen,
    onOpen: React.useCallback(() => setOpen(true), []),
    onClose: React.useCallback(() => setOpen(false), []),
    onToggle: React.useCallback(() => setOpen((value) => !value), []),
  };
}

