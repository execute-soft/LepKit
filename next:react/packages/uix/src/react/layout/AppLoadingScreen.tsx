type AppLoadingScreenProps = {
  label?: string;
  brandLabel?: string;
  helperText?: string;
};

export function AppLoadingScreen({
  label = "Loading workspace",
  brandLabel = "StockEye",
  helperText = "Preparing the dashboard shell and account context.",
}: Readonly<AppLoadingScreenProps>) {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground"
      role="status"
      aria-label={label}
    >
      <section className="w-full max-w-[420px] rounded-[1.25rem] border border-border bg-card px-6 py-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-4">
          <div className="relative flex size-11 items-center justify-center rounded-full border border-border bg-muted/35">
            <div className="size-5 animate-spin rounded-full border-2 border-muted-foreground/25 border-t-foreground" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {brandLabel}
            </p>
            <h1 className="mt-1 text-lg font-semibold leading-tight text-foreground">
              {label}
            </h1>
            {helperText ? (
              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                {helperText}
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

