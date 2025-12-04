import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Import and merge all translation files by feature
  const [common, landing, auth, account] = await Promise.all([
    import(`../messages/${locale}/common.json`),
    import(`../messages/${locale}/landing.json`),
    import(`../messages/${locale}/auth.json`),
    import(`../messages/${locale}/account.json`),
  ]);

  return {
    locale,
    messages: {
      ...common.default,
      ...landing.default,
      ...auth.default,
      ...account.default,
    },
    // Set a default timeZone to avoid ENVIRONMENT_FALLBACK mismatches
    timeZone: "UTC",
  };
});
