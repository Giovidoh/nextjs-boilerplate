"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { forwardRef, useId, useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import BaseInput from "@/components/inputs/BaseInput";

export interface PasswordRequirement {
  regex: RegExp;
  text: string;
}

interface PasswordInputProps
  extends Omit<ComponentProps<typeof Input>, "type"> {
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  toggleButtonClassName?: string;
  showPasswordText?: string;
  hidePasswordText?: string;
  startIcon?: ReactNode;
  iconClassName?: string;
  iconSize?: number;
  helperText?: string;
  // Strength indicator props
  showStrengthIndicator?: boolean;
  requirements?: PasswordRequirement[];
  strengthBarClassName?: string;
  requirementsClassName?: string;
  strengthTextClassName?: string;
  onStrengthChange?: (score: number, maxScore: number) => void;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      containerClassName,
      labelClassName,
      inputClassName,
      toggleButtonClassName,
      showPasswordText = "Show password",
      hidePasswordText = "Hide password",
      startIcon,
      iconClassName,
      iconSize = 16,
      className,
      id: providedId,
      showStrengthIndicator = false,
      requirements,
      strengthBarClassName,
      requirementsClassName,
      strengthTextClassName,
      onStrengthChange,
      value,
      onChange,
      helperText,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const t = useTranslations("auth.register.step2.form");
    const handleToggleVisibility = () =>
      setIsVisible((prevState) => !prevState);

    // Default password requirements
    const defaultRequirements: PasswordRequirement[] = [
      { regex: /.{8,}/, text: "Au moins 8 caractères" },
      { regex: /[0-9]/, text: "Au moins 1 chiffre" },
      { regex: /[a-zA-Z]/, text: "Au moins 1 lettre minuscule ou majuscule" },
      {
        regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        text: "Au moins 1 symbole",
      },
    ];

    const activeRequirements = requirements || defaultRequirements;

    const passwordValue = (value as string) || "";
    const strength = useMemo(
      () =>
        activeRequirements.map((req: PasswordRequirement) => ({
          met: req.regex.test(passwordValue),
          text: req.text,
        })),
      [passwordValue, activeRequirements]
    );

    const strengthScore = useMemo(() => {
      return strength.filter((req) => req.met).length;
    }, [strength]);

    // Notify parent of strength changes
    useMemo(() => {
      if (showStrengthIndicator && onStrengthChange) {
        onStrengthChange(strengthScore, activeRequirements.length);
      }
    }, [
      strengthScore,
      showStrengthIndicator,
      onStrengthChange,
      activeRequirements.length,
    ]);

    const getStrengthColor = (score: number) => {
      if (score === 0) return "bg-border";
      if (score <= 1) return "bg-red-500";
      if (score <= 2) return "bg-orange-500";
      if (score === 3) return "bg-amber-500";
      return "bg-emerald-500";
    };

    const getStrengthText = (score: number) => {
      if (score === 0) return "Saisissez un mot de passe";
      if (score <= 2) return "Mot de passe faible";
      if (score === 3) return "Mot de passe moyen";
      return "Mot de passe fort";
    };

    return (
      <div className={cn("*:not-first:mt-2", containerClassName)}>
        {label && (
          <Label htmlFor={id} className={labelClassName}>
            {label}
          </Label>
        )}
        <div className="relative">
          <BaseInput
            ref={ref}
            id={id}
            className={cn(
              "pe-9",
              startIcon && "ps-10",
              inputClassName,
              className
            )}
            placeholder={props.placeholder || "Entrez votre mot de passe"}
            type={isVisible ? "text" : "password"}
            value={value}
            onChange={onChange}
            aria-describedby={
              showStrengthIndicator ? `${id}-strength` : undefined
            }
            {...props}
          />
          {startIcon && (
            <div
              className={cn(
                "text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50",
                iconClassName
              )}
            >
              {typeof startIcon === "string" ? (
                <span className="text-sm font-medium" aria-hidden="true">
                  {startIcon}
                </span>
              ) : (
                <div style={{ fontSize: iconSize }} aria-hidden="true">
                  {startIcon}
                </div>
              )}
            </div>
          )}
          <button
            className={cn(
              "text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
              toggleButtonClassName
            )}
            type="button"
            onClick={handleToggleVisibility}
            aria-label={isVisible ? hidePasswordText : showPasswordText}
            aria-pressed={isVisible}
            aria-controls={id}
          >
            {isVisible ? (
              <EyeOffIcon size={16} aria-hidden="true" />
            ) : (
              <EyeIcon size={16} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Password strength indicator */}
        {showStrengthIndicator && (
          <div id={`${id}-strength`} className="mt-4">
            {/* Multiple strength bars */}
            <div
              className={cn("mb-2 flex w-1/2 gap-2", strengthBarClassName)}
              role="progressbar"
              aria-valuenow={strengthScore}
              aria-valuemin={0}
              aria-valuemax={activeRequirements.length}
              aria-label="Force du mot de passe"
            >
              {Array.from({ length: activeRequirements.length }).map(
                (_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-all duration-300 ease-out",
                      index < strengthScore
                        ? getStrengthColor(index + 1)
                        : "bg-border"
                    )}
                  />
                )
              )}
            </div>

            {/* Helper text */}
            {helperText && (
              <p
                className={cn(
                  "text-muted-foreground text-xs",
                  strengthTextClassName
                )}
              >
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
