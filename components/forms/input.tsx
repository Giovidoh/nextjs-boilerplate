import { Input as UiInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/** Control tokens shared by text-like fields (height, radius, padding, background, font size). */
export const inputTokens =
  "h-(--control-height) rounded-(--input-radius) bg-(--input-bg) dark:bg-(--input-bg) px-(--control-padding-x) md:text-(length:--control-font-size)";

export type InputProps = ComponentProps<typeof UiInput>;

/** Themed text input on top of the third-party input (components/ui/input). */
export function Input({ className, ...props }: InputProps) {
  return <UiInput className={cn(inputTokens, className)} {...props} />;
}
