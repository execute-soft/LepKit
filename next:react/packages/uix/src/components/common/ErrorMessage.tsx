import { cn } from "../../utils";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export default function ErrorMessage({
  message,
  className,
}: Readonly<ErrorMessageProps>) {
  return <div className={cn("text-red-500", className)}>{message}</div>;
}
