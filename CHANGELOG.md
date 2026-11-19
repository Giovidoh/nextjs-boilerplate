# Changelog

Each Next.js major has its own release line (branch + tags). The app code is the same on every line; only the framework layer differs.

| Line | Branch | Tags |
| --- | --- | --- |
| Next.js 16 | `main` | `next16-vX.Y.Z` |
| Next.js 15 | `next-15` | `next15-vX.Y.Z` |
| Next.js 14 | `next-14` | `next14-vX.Y.Z` |

## 1.1.0 — 2026-11-19 — Component architecture

Components are now organized in three layers, each one only using the layer below:

```
features/<feature>/   →   components/<category>/   →   components/ui/
feature-specific          design system (ours)          third-party (shadcn / Base UI)
```

### Changed
- `components/ui` is back to the exact shadcn CLI output and is never edited: `shadcn add <component> --overwrite` updates it safely.
- Design tokens are applied in a new design-system layer (`components/actions`, `forms`, `feedback`, `overlays`, `display`, `common`):
  - themed wrappers: `Button` (+ `buttonVariants`), `Input`, `Textarea`, `InputGroup`, `SelectTrigger`, `Card`, `Progress`;
  - entry points re-exporting the other third-party components (`Badge`, `Dialog`, `Tabs`, `Checkbox`…), ready to be customized;
  - composites moved into their category (`SubmitButton` → `components/actions`).
- App and features import the design system only.
- Feature files use kebab-case: `features/landing/components/header.tsx`, `footer.tsx`, `sections/hero-section.tsx`, `features/auth/hooks/use-auth-guard.ts`.
- The rendered UI is unchanged (same tokens, same sizes).

### Added
- ESLint `no-restricted-imports`: importing `@/components/ui/*` outside `components/` is an error.
- `toast` is exposed with `Toaster` from `@/components/feedback/toaster`.
- `components/ui/README.md` (rules for third-party code) and an *Architecture* section in the README.

### Migration from 1.0.0
Only needed for projects started from 1.0.0 that want the new layout.

| 1.0.0 import | 1.1.0 import |
| --- | --- |
| `@/components/ui/button` | `@/components/actions/button` |
| `@/components/forms/submit-button` | `@/components/actions/submit-button` |
| `@/components/ui/{input,textarea,input-group,select,checkbox,switch,radio-group,label,field}` | `@/components/forms/…` (same file name) |
| `@/components/ui/{alert,badge,spinner,skeleton,progress}` | `@/components/feedback/…` |
| `@/components/ui/sonner` and `toast` from `sonner` | `@/components/feedback/toaster` |
| `@/components/ui/{dialog,sheet,dropdown-menu,tooltip,popover}` | `@/components/overlays/…` |
| `@/components/ui/{card,avatar,separator,tabs}` | `@/components/display/…` |
| `@/features/landing/components/layouts/Header` / `Footer` | `@/features/landing/components/header` / `footer` |
| `@/features/landing/components/sections/HeroSection` | `@/features/landing/components/sections/hero-section` |
| `@/features/auth/hooks/useAuthGuard` | `@/features/auth/hooks/use-auth-guard` |

Token classes that 1.0.0 had patched into `components/ui` now live in the design-system wrappers. Restore the ui files with `pnpm dlx shadcn@latest add <component> --overwrite`.

### Line-specific
- **Next.js 14 (React 18)**: `forwardRef` is the only patch kept in `components/ui` (`Button`, `Input`, `Textarea`, `InputGroupInput`, `InputGroupButton`, `InputOTP`), listed in `components/ui/README.md`; the themed wrappers that receive refs use `forwardRef` too.

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
