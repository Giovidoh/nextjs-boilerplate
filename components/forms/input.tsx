import { Input as UiInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { forwardRef, type ComponentProps } from "react";

/** Control tokens shared by text-like fields (height, radius, padding, background, font size). */
export const inputTokens =
  "h-(--control-height) rounded-(--input-radius) bg-(--input-bg) dark:bg-(--input-bg) px-(--control-padding-x) md:text-(length:--control-font-size)";

export type InputProps = ComponentProps<typeof UiInput>;

/** Themed text input on top of the third-party input (components/ui/input). */
// forwardRef: React 18 — react-hook-form needs the ref to focus invalid fields.
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return <UiInput ref={ref} className={cn(inputTokens, className)} {...props} />;
});
