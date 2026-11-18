"use client";

import { QueryClient, QueryClientProvider, isServer } from "@tanstack/react-query";
import type { ReactNode } from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      // Avoid refetching immediately on the client after SSR.
      queries: { staleTime: 60 * 1000 },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

/** New client per request on the server, a single shared one in the browser. */
export function getQueryClient() {
  if (isServer) return makeQueryClient();
  return (browserQueryClient ??= makeQueryClient());
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
