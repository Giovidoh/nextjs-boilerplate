"use client";

import { Progress as UiProgress } from "@/components/ui/progress";
import { useLocale } from "next-intl";
import type { ComponentProps } from "react";

export { ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@/components/ui/progress";

/**
 * Progress formatted with the app locale. The third-party component defaults
 * to the runtime locale, so server ("60%") and browser ("60 %") disagree and
 * hydration fails.
 */
export function Progress({ locale, ...props }: ComponentProps<typeof UiProgress>) {
  const appLocale = useLocale();
  return <UiProgress locale={locale ?? appLocale} {...props} />;
}
