import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { Providers } from "@/providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { APP_NAME, APP_DESCRIPTION } from "@/configs/app-config";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="font-itc-avant-garde-gothic-pro antialiased">
        <Providers locale={locale} messages={messages} timeZone="UTC">
          {children}
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
