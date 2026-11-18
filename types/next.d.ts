import type { ReactNode } from "react";

/*
 * Next.js 14 has no `next typegen`: these global helpers mirror the
 * `PageProps` / `LayoutProps` generated on Next.js 15.5+, so pages keep the
 * same code on every release line. On 14, params and searchParams are plain
 * objects (awaiting them is a no-op).
 */
type RouteParams = { locale: string } & Record<string, string>;
type SearchParams = Record<string, string | string[] | undefined>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- route kept for parity with typegen
  type PageProps<Route extends string = string> = {
    params: RouteParams;
    searchParams: SearchParams;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- route kept for parity with typegen
  type LayoutProps<Route extends string = string> = {
    children: ReactNode;
    params: RouteParams;
  };
}

export {};
