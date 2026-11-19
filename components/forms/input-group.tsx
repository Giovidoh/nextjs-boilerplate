import {
  InputGroup as UiInputGroup,
  InputGroupInput as UiInputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { forwardRef, type ComponentProps } from "react";

/**
 * Themed input group (input + icons / buttons) on top of components/ui/input-group.
 * The group frame takes the control tokens; addons, buttons and text are re-exported as is.
 */
export { InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";

export function InputGroup({ className, ...props }: ComponentProps<typeof UiInputGroup>) {
  return (
    <UiInputGroup
      className={cn(
        "h-(--control-height) rounded-(--input-radius) bg-(--input-bg) dark:bg-(--input-bg)",
        className,
      )}
      {...props}
    />
  );
}

// forwardRef: React 18 — PasswordInput forwards react-hook-form's ref here.
export const InputGroupInput = forwardRef<
  HTMLInputElement,
  ComponentProps<typeof UiInputGroupInput>
>(function InputGroupInput({ className, ...props }, ref) {
  return (
    <UiInputGroupInput
      ref={ref}
      className={cn("h-full md:text-(length:--control-font-size)", className)}
      {...props}
    />
  );
});
