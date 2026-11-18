"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn, type SlotClassNames } from "@/lib/utils";
import { PASSWORD_MIN_LENGTH, passwordRules } from "@/lib/validation/password";
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { forwardRef, useEffect, useState, type ComponentProps, type ReactNode } from "react";

export type PasswordInputSlot =
  | "root"
  | "group"
  | "input"
  | "toggle"
  | "meter"
  | "meterSegment"
  | "requirements"
  | "requirement";

export interface PasswordRequirement {
  id: string;
  label: ReactNode;
  test: (value: string) => boolean;
}

export interface PasswordInputProps extends Omit<ComponentProps<"input">, "type"> {
  /** Show the strength meter and the requirement checklist. */
  showStrength?: boolean;
  /** Override the default policy from `lib/validation/password.ts`. */
  requirements?: PasswordRequirement[];
  onStrengthChange?: (score: number, max: number) => void;
  /** Optional icon rendered before the input. */
  startIcon?: ReactNode;
  classNames?: SlotClassNames<PasswordInputSlot>;
}

const segmentTone = (score: number, max: number) => {
  const ratio = score / max;
  if (ratio <= 0.25) return "bg-destructive";
  if (ratio < 1) return "bg-warning";
  return "bg-success";
};

// forwardRef: on React 18, `ref` is not a prop (react-hook-form needs it to focus errors).
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  {
    showStrength = false,
    requirements,
    onStrengthChange,
    startIcon,
    className,
    classNames,
    value,
    defaultValue,
    onChange,
    disabled,
    ...props
  },
  ref,
) {
  const t = useTranslations("components.passwordInput");
  const tRules = useTranslations("validation.password");
  const [visible, setVisible] = useState(false);
  const [innerValue, setInnerValue] = useState(String(defaultValue ?? ""));
  const isControlled = value !== undefined;
  const current = isControlled ? String(value ?? "") : innerValue;

  const rules: PasswordRequirement[] =
    requirements ??
    passwordRules.map((rule) => ({
      id: rule.id,
      test: rule.test,
      label: tRules(rule.id, { count: PASSWORD_MIN_LENGTH }),
    }));

  const checks = rules.map((rule) => ({ ...rule, met: rule.test(current) }));
  const score = checks.filter((check) => check.met).length;

  useEffect(() => {
    if (showStrength) onStrengthChange?.(score, rules.length);
  }, [score, rules.length, showStrength, onStrengthChange]);

  return (
    <div data-slot="password-input" className={cn("flex flex-col gap-2", classNames?.root)}>
      <InputGroup className={classNames?.group}>
        {startIcon && <InputGroupAddon>{startIcon}</InputGroupAddon>}
        <InputGroupInput
          ref={ref}
          type={visible ? "text" : "password"}
          autoComplete={showStrength ? "new-password" : "current-password"}
          value={value}
          defaultValue={isControlled ? undefined : defaultValue}
          onChange={(event) => {
            if (!isControlled) setInnerValue(event.target.value);
            onChange?.(event);
          }}
          disabled={disabled}
          className={cn(classNames?.input, className)}
          {...props}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? t("hide") : t("show")}
            aria-pressed={visible}
            disabled={disabled}
            className={classNames?.toggle}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      {showStrength && (
        <>
          <div
            role="meter"
            aria-label={t("strength")}
            aria-valuemin={0}
            aria-valuemax={rules.length}
            aria-valuenow={score}
            className={cn("flex gap-1", classNames?.meter)}
          >
            {checks.map((check, index) => (
              <span
                key={check.id}
                className={cn(
                  "h-1 flex-1 rounded-full bg-border transition-colors",
                  index < score && segmentTone(score, rules.length),
                  classNames?.meterSegment,
                )}
              />
            ))}
          </div>
          <ul className={cn("grid gap-1 text-small sm:grid-cols-2", classNames?.requirements)}>
            {checks.map((check) => (
              <li
                key={check.id}
                data-met={check.met}
                className={cn(
                  "flex items-center gap-1.5 text-muted-foreground data-[met=true]:text-success",
                  classNames?.requirement,
                )}
              >
                {check.met ? <CheckIcon className="size-3.5" /> : <XIcon className="size-3.5" />}
                {check.label}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
});
