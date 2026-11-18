"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";

/** Client-side providers. next-intl's provider is rendered by the server layout. */
export function Providers({ children }: { children: ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
