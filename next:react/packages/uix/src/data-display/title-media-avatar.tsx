import type * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../react/primitives";
import { cn } from "../utils";

type TitleMediaAvatarProps = {
  src?: string | null;
  title: string;
  fallback?: string;
  className?: string;
  imageClassName?: string;
  imageLoading?: React.ComponentProps<typeof AvatarImage>["loading"];
  imageDecoding?: React.ComponentProps<typeof AvatarImage>["decoding"];
  fallbackClassName?: string;
};

function getTitleAvatarFallback(
  title: string | null | undefined,
  fallback = "NA",
) {
  const characters = Array.from((title ?? "").trim()).filter((character) =>
    /\S/u.test(character),
  );
  const value = characters.slice(0, 2).join("").toUpperCase();

  return value || fallback;
}

export function TitleMediaAvatar({
  src,
  title,
  fallback,
  className,
  imageClassName,
  imageLoading,
  imageDecoding,
  fallbackClassName,
}: Readonly<TitleMediaAvatarProps>) {
  const normalizedSrc = src?.trim() || undefined;

  return (
    <Avatar className={cn("rounded-md border border-border/60", className)}>
      <AvatarImage
        src={normalizedSrc}
        alt={title}
        className={cn("object-cover", imageClassName)}
        loading={imageLoading}
        decoding={imageDecoding}
      />
      <AvatarFallback
        className={cn("rounded-md text-xs font-semibold", fallbackClassName)}
      >
        {getTitleAvatarFallback(title, fallback)}
      </AvatarFallback>
    </Avatar>
  );
}

export { getTitleAvatarFallback };
