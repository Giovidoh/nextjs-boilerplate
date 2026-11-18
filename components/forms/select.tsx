import { SelectTrigger as UiSelectTrigger } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/**
 * Themed select on top of components/ui/select: the trigger takes the control
 * tokens so it lines up with inputs; the rest is re-exported as is.
 */
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectValue,
} from "@/components/ui/select";

export function SelectTrigger({ className, ...props }: ComponentProps<typeof UiSelectTrigger>) {
  return (
    <UiSelectTrigger
      className={cn(
        "rounded-(--input-radius) bg-(--input-bg) dark:bg-(--input-bg) pl-(--control-padding-x) text-(length:--control-font-size) data-[size=default]:h-(--control-height) data-[size=sm]:h-(--control-height-sm) data-[size=sm]:rounded-(--input-radius)",
        className,
      )}
      {...props}
    />
  );
}
