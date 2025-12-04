import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

const NextIntlProvider = ({
  children,
  locale,
  messages,
  timeZone,
}: {
  children: ReactNode;
  locale: string;
  messages: Record<string, string>;
  timeZone?: string;
}) => {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  );
};

export default NextIntlProvider;
