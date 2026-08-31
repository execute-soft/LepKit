export const uixRecipes = {
  control:
    "border-input bg-transparent text-sm shadow-none outline-none focus-visible:border-ring focus-visible:ring-ring/45 focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50",
  floatingLabel:
    "pointer-events-none absolute -top-2 left-3 z-10 max-w-[calc(100%-1.5rem)] truncate rounded-sm bg-background px-1.5 text-xs font-medium leading-none text-muted-foreground transition-colors peer-focus:text-foreground peer-aria-invalid:text-destructive dark:bg-input",
  menuSurface:
    "bg-popover text-popover-foreground z-50 overflow-hidden rounded-md border shadow-md",
  tableSurface:
    "relative w-full max-w-full overflow-x-auto rounded-lg border border-border/80 bg-background shadow-none",
  modalSurface:
    "bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg outline-none sm:max-w-lg",
} as const;

