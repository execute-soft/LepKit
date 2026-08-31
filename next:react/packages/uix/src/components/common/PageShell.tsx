import { type ReactNode } from "react";
import MaxwidthContainer from "./MaxWidthContainer";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export default function PageShell({ children, className }: Readonly<PageShellProps>) {
  const classes = ["min-h-screen", className].filter(Boolean).join(" ");

  return (
    <MaxwidthContainer>
      <div className={classes}>{children}</div>
    </MaxwidthContainer>
  );
}
