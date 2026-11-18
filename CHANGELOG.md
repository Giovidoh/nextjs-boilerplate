# Changelog

Each Next.js major has its own release line (branch + tags). The app code is the same on every line; only the framework layer differs.

| Line | Branch | Tags |
| --- | --- | --- |
| Next.js 16 | `main` | `next16-vX.Y.Z` |
| Next.js 15 | `next-15` | `next15-vX.Y.Z` |
| Next.js 14 | `next-14` | `next14-vX.Y.Z` |

## 1.0.0 — 2026-11-18 — Foundation

### Added
- Design tokens in `styles/theme.css`: colors (light, dark, extra brand themes), fluid type scale, radius scale, control / card sizes, layout spacing.
- shadcn/ui primitives on Base UI, driven by the tokens.
- Composite components with per-slot `classNames`: `FormField`, `PasswordInput` (strength meter), `OtpInput`, `SubmitButton`, `Logo`, `LanguageSwitcher`, `ThemeToggle`, `AuthShell`, `OAuthButtons`.
- Auth screens: login, register, OTP verification, forgot / reset password. Forms use react-hook-form + Zod with translated messages and TanStack Query mutations. The auth API is a typed stub (`features/auth/api.ts`) to connect to your backend.
- Landing: sticky header with mobile sheet, hero, footer.
- i18n (`fr`, `en`) with next-intl, locale-aware links, statically rendered pages per locale.
- Light / dark / system theme, fonts through `next/font`.
- Dev-only UI kit at `/[locale]/ui`.

### Fixed (compared to the pre-1.0 boilerplate)
- TanStack `QueryClient` no longer shared between users during SSR.
- Backend URL is server-only (`API_URL`), no longer exposed to the browser.
- Locale is kept when navigating and switching language (query string included).
- ESLint configuration matches the installed Next.js major.
