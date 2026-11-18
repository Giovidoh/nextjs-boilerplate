# next14-v1.0.0 — Foundation (Next.js 14.2)

Next.js **14.2.35** · React **18.3** · Tailwind CSS 4 · shadcn/ui on Base UI · next-intl 4 · Node.js ≥ 20.9

```bash
npx create-next-app@latest my-app -e https://github.com/Giovidoh/nextjs-boilerplate/tree/next-14
```

> [!WARNING]
> **Next.js 14 is end-of-life.** Vercel no longer publishes security fixes for it, and 14.2.35 has known vulnerabilities (including critical ones) that will never be patched. Use this line only for projects that cannot move off Next.js 14 (hosting, dependencies, React 18), and plan the upgrade. New projects should use the Next.js 16 line (`main`).

## Highlights
Same app as `next16-v1.0.0` and `next15-v1.0.0`:
- Design tokens in `styles/theme.css` (colors, fluid typography, radius, control / card sizes, dark mode, extra brand themes).
- Four customization levels: tokens → variants → per-slot `classNames` → composition with `render`.
- `FormField`, `PasswordInput` with strength meter, `OtpInput`, `SubmitButton`, `LanguageSwitcher`, `ThemeToggle`, `Logo` + shadcn/ui primitives on Base UI.
- Auth screens (login, register, OTP, forgot / reset password) with react-hook-form, Zod, translated errors, TanStack Query. Connect your backend in `features/auth/api.ts`.
- Landing header (mobile sheet), hero, footer; i18n `fr` / `en`; dev UI kit at `/fr/ui`.

## Next.js 14 specifics
- React 18: components that receive refs use `forwardRef` (`Button`, `Input`, `Textarea`, `InputGroupInput`, `InputGroupButton`, `InputOTP`, `PasswordInput`, `OtpInput`).
- Synchronous `params` / `searchParams`, with local `PageProps` / `LayoutProps` types (`types/next.d.ts`).
- `middleware.ts`, static rendering per locale through `initLocale(params)`.
- `next.config.mjs` (webpack SVGR rule), ESLint 8 with `.eslintrc.json`, Geist from the `geist` package.

See [CHANGELOG.md](../../CHANGELOG.md).
