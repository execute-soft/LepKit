export const uixMotion = {
  interactive: "transition-[background-color,border-color,color,box-shadow]",
  overlayOpen: "data-[state=open]:animate-in data-[state=open]:fade-in-0",
  overlayClosed: "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
} as const;

