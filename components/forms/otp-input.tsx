"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn, type SlotClassNames } from "@/lib/utils";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { forwardRef, Fragment, type ComponentProps } from "react";

export type OtpInputSlot = "root" | "group" | "slot" | "separator";

/** Control tokens applied on top of the third-party slots (components/ui/input-otp). */
const slotTokens =
  "size-(--otp-slot-size) bg-(--input-bg) dark:bg-(--input-bg) text-base first:rounded-l-(--input-radius) last:rounded-r-(--input-radius)";

type BaseProps = Omit<
  ComponentProps<typeof InputOTP>,
  "children" | "render" | "maxLength" | "value" | "onChange"
>;

export interface OtpInputProps extends BaseProps {
  value?: string;
  onChange?: (value: string) => void;
  /** Number of characters. */
  length?: number;
  /** Visual grouping, e.g. [3, 3] renders "123-456". Defaults to a single group. */
  groups?: number[];
  classNames?: SlotClassNames<OtpInputSlot>;
}

/** Controlled one-time-code input (digits only by default). */
// forwardRef: on React 18, `ref` is not a prop (react-hook-form needs it to focus errors).
export const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>(function OtpInput(
  {
    length = 6,
    groups,
    pattern = REGEXP_ONLY_DIGITS,
    value,
    onChange,
    className,
    classNames,
    ...props
  },
  ref,
) {
  const layout = groups ?? [length];
  const starts = layout.map((_, i) => layout.slice(0, i).reduce((sum, n) => sum + n, 0));

  return (
    <InputOTP
      ref={ref}
      maxLength={length}
      pattern={pattern}
      value={value ?? ""}
      onChange={(next: string) => onChange?.(next)}
      inputMode="numeric"
      autoComplete="one-time-code"
      containerClassName={cn(classNames?.root, className)}
      {...props}
    >
      {layout.map((size, groupIndex) => (
        <Fragment key={groupIndex}>
          {groupIndex > 0 && <InputOTPSeparator className={classNames?.separator} />}
          <InputOTPGroup className={cn("rounded-(--input-radius)", classNames?.group)}>
            {Array.from({ length: size }, (_, i) => (
              <InputOTPSlot
                key={starts[groupIndex] + i}
                index={starts[groupIndex] + i}
                className={cn(slotTokens, classNames?.slot)}
              />
            ))}
          </InputOTPGroup>
        </Fragment>
      ))}
    </InputOTP>
  );
});
