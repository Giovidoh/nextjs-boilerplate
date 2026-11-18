import { initLocale } from "@/i18n/locale";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Showcase } from "./_components/showcase";

export const metadata: Metadata = {
  title: "UI kit",
  robots: { index: false, follow: false },
};

/**
 * Living style guide: every component and its variants, rendered with the
 * current theme tokens. Compare it side by side with the design file.
 * Development only — returns 404 in production builds.
 */
export default async function UiKitPage({ params }: PageProps<"/[locale]/ui">) {
  if (process.env.NODE_ENV === "production") notFound();
  await initLocale(params);
  return <Showcase />;
}
