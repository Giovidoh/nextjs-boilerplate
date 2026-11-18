"use client";

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { cn, type SlotClassNames } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useId, type ReactNode } from "react";
import {
  Controller,
  type Control,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

export type FormFieldSlot = "root" | "row" | "label" | "description" | "error";

export type FormFieldControlProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
> = ControllerRenderProps<TValues, TName> & {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
};

export interface FormFieldProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- accepts any useForm() context / transformed values
  control: Control<TValues, any, any>;
  name: TName;
  label?: ReactNode;
  description?: ReactNode;
  /** `horizontal` puts label and control on one row (error and description stay below). */
  orientation?: "vertical" | "horizontal";
  /** `after` puts the label behind the control (checkboxes, switches, radios). */
  labelPlacement?: "before" | "after";
  className?: string;
  classNames?: SlotClassNames<FormFieldSlot>;
  /** Render the control and spread the props on it: `{(field) => <Input {...field} />}`. */
  children: (field: FormFieldControlProps<TValues, TName>) => ReactNode;
}

/**
 * react-hook-form field wired to the shadcn Field primitives: label, control,
 * description and translated error, with ids and aria attributes handled.
 *
 * Zod messages are i18n keys under `validation` (e.g. "required");
 * any other string is displayed as-is.
 */
export function FormField<TValues extends FieldValues, TName extends FieldPath<TValues>>({
  control,
  name,
  label,
  description,
  orientation,
  labelPlacement = "before",
  className,
  classNames,
  children,
}: FormFieldProps<TValues, TName>) {
  const id = useId();
  const t = useTranslations("validation");
  const translate = (message?: string) => (message && t.has(message) ? t(message) : message);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const descriptionId = description ? `${id}-description` : undefined;
        const errorId = fieldState.error ? `${id}-error` : undefined;
        const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
        const labelNode = label && (
          <FieldLabel htmlFor={id} className={classNames?.label}>
            {label}
          </FieldLabel>
        );

        const control = (
          <>
            {labelPlacement === "before" && labelNode}
            {children({
              ...field,
              id,
              "aria-invalid": fieldState.invalid,
              "aria-describedby": describedBy,
            })}
            {labelPlacement === "after" && labelNode}
          </>
        );

        return (
          <Field data-invalid={fieldState.invalid} className={cn(classNames?.root, className)}>
            {/* Horizontal: label and control share a row, description/error stay below it. */}
            {orientation === "horizontal" ? (
              <Field orientation="horizontal" className={classNames?.row}>
                {control}
              </Field>
            ) : (
              control
            )}
            {description && (
              <FieldDescription id={descriptionId} className={classNames?.description}>
                {description}
              </FieldDescription>
            )}
            <FieldError
              id={errorId}
              className={classNames?.error}
              errors={[{ message: translate(fieldState.error?.message) }]}
            />
          </Field>
        );
      }}
    />
  );
}
