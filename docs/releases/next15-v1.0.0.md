# next15-v1.0.0 — Foundation (Next.js 15.5)

Next.js **15.5.29** · React **19.3** · Tailwind CSS 4 · shadcn/ui on Base UI · next-intl 4 · Node.js ≥ 20.9

```bash
npx create-next-app@latest my-app -e https://github.com/Giovidoh/nextjs-boilerplate/tree/next-15
```

> Next.js 15 is in **Maintenance LTS**: security fixes until **2027-01-31**. Prefer the Next.js 16 line (`main`) for new projects unless a dependency or host requires 15.

## Highlights
Same app as `next16-v1.0.0`:
- Design tokens in `styles/theme.css` (colors, fluid typography, radius, control / card sizes, dark mode, extra brand themes).
- Four customization levels: tokens → variants → per-slot `classNames` → composition with `render`.
- `FormField`, `PasswordInput` with strength meter, `OtpInput`, `SubmitButton`, `LanguageSwitcher`, `ThemeToggle`, `Logo` + shadcn/ui primitives on Base UI.
- Auth screens (login, register, OTP, forgot / reset password) with react-hook-form, Zod, translated errors, TanStack Query. Connect your backend in `features/auth/api.ts`.
- Landing header (mobile sheet), hero, footer; i18n `fr` / `en`; dev UI kit at `/fr/ui`.

## Next.js 15 specifics
- `middleware.ts` (instead of `proxy.ts`).
- Static rendering per locale through `initLocale(params)` (`i18n/locale.ts`, next-intl `setRequestLocale`) instead of `next/root-params`.
- webpack bundler; SVG imports through the webpack SVGR rule in `next.config.ts`.
- ESLint 9 with `eslint-config-next` 15 loaded through `FlatCompat`.

See [CHANGELOG.md](../../CHANGELOG.md).
