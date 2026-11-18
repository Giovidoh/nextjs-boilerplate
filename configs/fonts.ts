import { Geist, Geist_Mono } from "next/font/google";

/**
 * Project fonts. Swap them here, then point `--font-body`, `--font-display`
 * and `--font-code` in `styles/theme.css` at the new variables.
 *
 * For a licensed font shipped with the design, use `next/font/local`:
 *   import localFont from "next/font/local";
 *   export const fontDisplay = localFont({
 *     src: "../public/fonts/AvantGarde-Demi.woff2",
 *     variable: "--font-avant-garde",
 *   });
 */
export const fontSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
export const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

/** Class names that expose every font variable; set on <html>. */
export const fontVariables = [fontSans.variable, fontMono.variable].join(" ");
