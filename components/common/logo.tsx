import { APP_NAME } from "@/configs/app-config";
import { Link } from "@/i18n/navigation";
import { cn, type SlotClassNames } from "@/lib/utils";
import Image, { type StaticImageData } from "next/image";
import type { ComponentProps, ReactNode } from "react";

export type LogoSlot = "root" | "image" | "text";

export interface LogoProps extends Omit<ComponentProps<typeof Link>, "href" | "children"> {
  href?: ComponentProps<typeof Link>["href"];
  /** Image or SVG asset. When omitted, the app name is rendered as text. */
  src?: string | StaticImageData;
  alt?: string;
  width?: number;
  height?: number;
  /** Custom content (e.g. an SVGR component) — takes precedence over `src`. */
  children?: ReactNode;
  classNames?: SlotClassNames<LogoSlot>;
}

export function Logo({
  href = "/",
  src,
  alt = APP_NAME,
  width = 120,
  height = 32,
  children,
  className,
  classNames,
  ...props
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={APP_NAME}
      className={cn("inline-flex w-fit items-center gap-2", classNames?.root, className)}
      {...props}
    >
      {children ??
        (src ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn("h-8 w-auto", classNames?.image)}
          />
        ) : (
          <span className={cn("font-heading text-h4 font-bold", classNames?.text)}>{APP_NAME}</span>
        ))}
    </Link>
  );
}
