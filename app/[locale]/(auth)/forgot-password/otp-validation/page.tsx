'use client';

import LogoLink from '@/components/buttons/LogoLink';
import Main from '@/components/layouts/Main';
import OtpValidationForm from '@/features/auth/components/forms/OtpValidationForm';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export default function ForgotPasswordOtpValidationPage() {
  const t = useTranslations('auth.otpValidation');
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  if (!email) {
    return <div>Invalid request</div>;
  }

  return (
    <Main>
      <section className="flex h-full min-h-screen items-center justify-center px-5">
        <div className="border-primary z-10 flex h-full w-full max-w-4xl flex-col items-center justify-center gap-5 rounded-md border bg-white px-5 py-20 md:gap-7">
          <div className="flex flex-col items-center justify-center gap-5">
            <LogoLink />
            <div className="flex flex-col items-center text-center">
              <h1 className="text-[clamp(24px,3vw,28px)]">{t('title')}</h1>
              <p className="p2 max-w-md">{t('description')}</p>
            </div>
          </div>
          <div className="w-full max-w-md">
            <OtpValidationForm email={email} />
          </div>
        </div>
      </section>
    </Main>
  );
}
