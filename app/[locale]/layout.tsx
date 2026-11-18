import { Toaster } from "@/components/ui/sonner";
import { APP_DESCRIPTION, APP_NAME } from "@/configs/app-config";
import { routing } from "@/i18n/routing";
import { Providers } from "@/providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import * as rootParams from "next/root-params";

export const metadata: Metadata = {
  title: { default: APP_NAME, template: `%s · ${APP_NAME}` },
  description: APP_DESCRIPTION,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await rootParams.locale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
          <Toaster richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
