import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { ComponentProps } from "react";

export interface SubmitButtonProps extends Omit<ComponentProps<typeof Button>, "type"> {
  /** Shows a spinner and disables the button while the form is submitting. */
  pending?: boolean;
}

/** Form submit button with a built-in loading state. */
export function SubmitButton({ pending = false, disabled, children, ...props }: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={pending || disabled} aria-busy={pending} {...props}>
      {pending && <Spinner data-icon="inline-start" />}
      {children}
    </Button>
  );
}
