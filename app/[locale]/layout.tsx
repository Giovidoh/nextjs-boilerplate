import { Toaster } from "@/components/feedback/toaster";
import { APP_DESCRIPTION, APP_NAME } from "@/configs/app-config";
import { fontVariables } from "@/configs/fonts";
import { initLocale } from "@/i18n/locale";
import { routing } from "@/i18n/routing";
import { Providers } from "@/providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: { default: APP_NAME, template: `%s · ${APP_NAME}` },
  description: APP_DESCRIPTION,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const locale = await initLocale(params);

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <body className="antialiased">
        <NextIntlClientProvider>
          <Providers>
            {children}
            <Toaster richColors />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
