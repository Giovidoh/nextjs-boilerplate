import { Card as UiCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/**
 * Themed card on top of components/ui/card: padding and radius come from
 * `--card-padding` / `--card-radius`. Sub-parts are re-exported as is.
 */
export {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Card({ className, ...props }: ComponentProps<typeof UiCard>) {
  return (
    <UiCard
      className={cn(
        "rounded-(--card-radius) [--card-spacing:var(--card-padding)] data-[size=sm]:[--card-spacing:calc(var(--card-padding)*0.75)]",
        className,
      )}
      {...props}
    />
  );
}
