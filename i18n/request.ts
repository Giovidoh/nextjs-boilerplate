import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// One file per feature in messages/<locale>/; merged into a single catalog.
const namespaces = ["common", "landing", "auth", "account"] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  // Set by `setRequestLocale` (static rendering) or by the middleware.
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const catalogs = await Promise.all(
    namespaces.map((ns) => import(`../messages/${locale}/${ns}.json`)),
  );

  return {
    locale,
    messages: Object.assign({}, ...catalogs.map((c) => c.default)),
    timeZone: "UTC",
  };
});
