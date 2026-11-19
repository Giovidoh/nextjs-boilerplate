import { Button as UiButton, buttonVariants as uiButtonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

/**
 * Token layer on top of the third-party button (components/ui/button):
 * height, padding, radius, font size and weight come from `styles/theme.css`.
 * Colors come from the ui variants, which already use semantic tokens.
 * tailwind-merge drops the conflicting shadcn classes (e.g. `h-8`).
 */
const buttonTokens = cva(
  "rounded-(--button-radius) text-(length:--control-font-size) font-(number:--button-font-weight)",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "h-(--control-height-sm) px-[calc(var(--control-padding-x)*0.8)] text-[0.8rem]",
        default:
          "h-(--control-height) px-(--control-padding-x) has-data-[icon=inline-end]:pr-[calc(var(--control-padding-x)*0.75)] has-data-[icon=inline-start]:pl-[calc(var(--control-padding-x)*0.75)]",
        lg: "h-(--control-height-lg) gap-2 px-[calc(var(--control-padding-x)*1.25)] has-data-[icon=inline-end]:pr-(--control-padding-x) has-data-[icon=inline-start]:pl-(--control-padding-x)",
        icon: "size-(--control-height)",
        "icon-xs": "",
        "icon-sm": "size-(--control-height-sm)",
        "icon-lg": "size-(--control-height-lg)",
      },
    },
    defaultVariants: { size: "default" },
  },
);

type ButtonVariantProps = VariantProps<typeof uiButtonVariants>;

/** Class names of a themed button, for elements that can't use <Button> (e.g. a styled <label>). */
export function buttonVariants({
  variant,
  size,
  className,
}: ButtonVariantProps & { className?: string } = {}) {
  return cn(uiButtonVariants({ variant, size }), buttonTokens({ size }), className);
}

export type ButtonProps = ComponentProps<typeof UiButton>;

export function Button({ className, size = "default", ...props }: ButtonProps) {
  return <UiButton size={size} className={cn(buttonTokens({ size }), className)} {...props} />;
}
