"use client";

import { ReactNode } from "react";
import NextIntlProvider from "./NextIntlProvider";
import TanstackProvider from "./TanstackProvider";

export const Providers = ({
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
    <TanstackProvider>
      <NextIntlProvider locale={locale} messages={messages} timeZone={timeZone}>
        {children}
      </NextIntlProvider>
    </TanstackProvider>
  );
};
