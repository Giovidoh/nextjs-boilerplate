import { Textarea as UiTextarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { forwardRef, type ComponentProps } from "react";

export type TextareaProps = ComponentProps<typeof UiTextarea>;

/** Themed textarea on top of the third-party textarea (components/ui/textarea). */
// forwardRef: React 18 — react-hook-form needs the ref to focus invalid fields.
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, ...props },
  ref,
) {
  return (
    <UiTextarea
      ref={ref}
      className={cn(
        "rounded-(--input-radius) bg-(--input-bg) dark:bg-(--input-bg) px-(--control-padding-x) md:text-(length:--control-font-size)",
        className,
      )}
      {...props}
    />
  );
});
