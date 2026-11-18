import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next.js 16 proxy (formerly `middleware`).
 * Handles locale detection and prefixing. Auth checks will plug in here
 * as an optimistic redirect layer; the real session check lives server-side.
 */
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except API routes, Next internals and files with an extension.
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
