# next16-v1.0.0 — Foundation (Next.js 16.4)

Next.js **16.4.6** · React **19.3** · Tailwind CSS 4 · shadcn/ui on Base UI · next-intl 4 · Node.js ≥ 20.9

```bash
npx create-next-app@latest my-app -e https://github.com/Giovidoh/nextjs-boilerplate
```

## Highlights
- **Customizable by design**: every visual value lives in `styles/theme.css` (colors, fluid typography, radius, control and card sizes, dark mode, extra brand themes). Components read tokens, never hardcoded values.
- **Four customization levels**: tokens → variants → per-slot `classNames` → composition with `render`.
- **Ready-made components**: `FormField`, `PasswordInput` with strength meter, `OtpInput`, `SubmitButton`, `LanguageSwitcher`, `ThemeToggle`, `Logo`, plus the shadcn/ui primitives on Base UI.
- **Auth screens** (login, register, OTP, forgot / reset password) with react-hook-form, Zod, translated errors and TanStack Query. Connect your backend in `features/auth/api.ts`.
- **Landing** header (mobile sheet), hero and footer.
- **i18n** `fr` / `en`, statically rendered per locale through `next/root-params`.
- **Dev UI kit** at `/fr/ui` to compare every component with the design file.

## Next.js 16 specifics
- `proxy.ts` (replaces `middleware.ts`), Turbopack for dev and build, SVG imports as React components through `turbopack.rules`.
- `next typegen` types (`PageProps`, `LayoutProps`).

## Not included yet
Real auth backend, API client module, SEO kit, dashboard layout. They will ship as minor releases on every line.

See [CHANGELOG.md](../../CHANGELOG.md).
