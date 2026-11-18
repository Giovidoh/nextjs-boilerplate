import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

/**
 * Project fonts. Swap them here, then point `--font-body`, `--font-display`
 * and `--font-code` in `styles/theme.css` at the new variables.
 *
 * Next.js 14's `next/font/google` does not list Geist, so it comes from the
 * `geist` package (same CSS variables as the other release lines).
 *
 * For any other font: `next/font/google`, or `next/font/local` for a licensed
 * font shipped with the design:
 *   import localFont from "next/font/local";
 *   export const fontDisplay = localFont({
 *     src: "../public/fonts/AvantGarde-Demi.woff2",
 *     variable: "--font-avant-garde",
 *   });
 */
export const fontSans = GeistSans; // --font-geist-sans
export const fontMono = GeistMono; // --font-geist-mono

/** Class names that expose every font variable; set on <html>. */
export const fontVariables = [fontSans.variable, fontMono.variable].join(" ");
