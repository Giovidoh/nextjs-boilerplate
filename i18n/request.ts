import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { routing } from "./routing";

// One file per feature in messages/<locale>/; merged into a single catalog.
const namespaces = ["common", "landing", "auth", "account"] as const;

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const requested = await rootParams.locale();
    if (!hasLocale(routing.locales, requested)) notFound();
    locale = requested;
  }

  const catalogs = await Promise.all(
    namespaces.map((ns) => import(`../messages/${locale}/${ns}.json`)),
  );

  return {
    locale,
    messages: Object.assign({}, ...catalogs.map((c) => c.default)),
    timeZone: "UTC",
  };
});
