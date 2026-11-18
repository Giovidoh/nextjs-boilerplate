import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Locale detection and prefixing. Auth checks will plug in here as an
 * optimistic redirect layer; the real session check lives server-side.
 * (Next.js 16 renames this file to `proxy.ts`.)
 */
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except API routes, Next internals and files with an extension.
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
