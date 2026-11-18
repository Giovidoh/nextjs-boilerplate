import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "./routing";

export type Locale = (typeof routing.locales)[number];

type LocaleParams = { locale: string } | Promise<{ locale: string }>;

/**
 * Validates the `[locale]` segment and enables static rendering with next-intl.
 * Call it at the top of every layout, page and `generateMetadata` under `[locale]`.
 * (Next.js 16 reads the locale through `next/root-params` instead.)
 */
export async function initLocale(params: LocaleParams): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return locale;
}
