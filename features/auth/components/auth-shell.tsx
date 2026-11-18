import { Logo } from "@/components/common/logo";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { cn, type SlotClassNames } from "@/lib/utils";
import type { ReactNode } from "react";

export type AuthShellSlot = "root" | "header" | "logo" | "title" | "description" | "content" | "footer";

export interface AuthShellProps {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  /** Content under the form (links to other auth pages, legal notice…). */
  footer?: ReactNode;
  /** Replace the default text logo (image, SVG component…). */
  logo?: ReactNode;
  /** `card` frames the form, `plain` lets it sit on the page background. */
  variant?: "card" | "plain";
  className?: string;
  classNames?: SlotClassNames<AuthShellSlot>;
}

/** Shared frame of every auth page: logo, title, description, form, footer. */
export function AuthShell({
  title,
  description,
  children,
  footer,
  logo,
  variant = "card",
  className,
  classNames,
}: AuthShellProps) {
  const plain = variant === "plain";

  return (
    <Card
      data-variant={variant}
      className={cn(
        "w-full max-w-md",
        plain && "bg-transparent shadow-none ring-0",
        classNames?.root,
        className,
      )}
    >
      <CardHeader className={cn("items-center gap-3 text-center", classNames?.header)}>
        <div className={cn("mb-2 flex justify-center", classNames?.logo)}>{logo ?? <Logo />}</div>
        <h1 data-slot="card-title" className={cn("text-h3", classNames?.title)}>
          {title}
        </h1>
        {description && (
          <CardDescription className={cn("text-balance", classNames?.description)}>
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className={classNames?.content}>{children}</CardContent>
      {footer && (
        <CardFooter
          className={cn(
            "flex-col gap-4 border-t-0 bg-transparent text-small text-muted-foreground",
            classNames?.footer,
          )}
        >
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
