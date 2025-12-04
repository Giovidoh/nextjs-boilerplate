import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { cn } from '@/lib/utils';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { ComponentPropsWithoutRef, FC } from 'react';

interface BaseInputOTPProps {
  inputOtpClassName?: string;
  inputOTPGroupClassName?: string;
  inputOTPSlotClassName?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

const BaseInputOTP: FC<BaseInputOTPProps> = ({
  inputOtpClassName,
  inputOTPGroupClassName = 'justify-center w-full gap-[clamp(10px,_2vw,_20px)]',
  inputOTPSlotClassName = 'text-lg border border-[#BCBABA] w-[clamp(40px,_5vw,_50px)] h-[clamp(40px,_5vw,_50px)] rounded-md',
  onChange,
  disabled = false,
}) => {
  return (
    <InputOTP className={cn('', inputOtpClassName)} maxLength={6} pattern={REGEXP_ONLY_DIGITS} disabled={disabled} onChange={(value) => {
      onChange?.(value);
  }} >
      <InputOTPGroup className={cn('', inputOTPGroupClassName)}>
        <InputOTPSlot className={cn('', inputOTPSlotClassName)} index={0} />
        <InputOTPSlot className={cn('', inputOTPSlotClassName)} index={1} />
        <InputOTPSlot className={cn('', inputOTPSlotClassName)} index={2} />
        <InputOTPSlot className={cn('', inputOTPSlotClassName)} index={3} />
        <InputOTPSlot className={cn('', inputOTPSlotClassName)} index={4} />
        <InputOTPSlot className={cn('', inputOTPSlotClassName)} index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
};

export default BaseInputOTP;
