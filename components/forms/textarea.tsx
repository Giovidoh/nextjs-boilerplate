import { Textarea as UiTextarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export type TextareaProps = ComponentProps<typeof UiTextarea>;

/** Themed textarea on top of the third-party textarea (components/ui/textarea). */
export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <UiTextarea
      className={cn(
        "rounded-(--input-radius) bg-(--input-bg) dark:bg-(--input-bg) px-(--control-padding-x) md:text-(length:--control-font-size)",
        className,
      )}
      {...props}
    />
  );
}
