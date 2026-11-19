# next14-v1.1.0 — Component architecture (Next.js 14.2)

Next.js **14.2.35** · React **18.3** · Tailwind CSS 4 · shadcn/ui on Base UI · next-intl 4 · Node.js ≥ 20.9

```bash
npx create-next-app@latest my-app -e https://github.com/Giovidoh/nextjs-boilerplate/tree/next-14
```

> [!WARNING]
> **Next.js 14 is end-of-life.** Vercel no longer publishes security fixes for it, and 14.2.35 has known vulnerabilities (including critical ones) that will never be patched. Use this line only for projects that cannot move off Next.js 14, and plan the upgrade. New projects should use the Next.js 16 line (`main`).

## What's new
Same release as `next16-v1.1.0`: components are organized in **three layers**.

```
features/<feature>/   →   components/<category>/   →   components/ui/
feature-specific          design system (ours)          third-party (shadcn / Base UI)
```

- **`components/ui` is third-party code**: shadcn CLI output, with one exception on this line (below).
- **New design-system layer** in `components/actions`, `forms`, `feedback`, `overlays`, `display`, `common`: themed wrappers (`Button`, `Input`, `Textarea`, `InputGroup`, `SelectTrigger`, `Card`, `Progress`), entry points for the other third-party components, and the composites (`FormField`, `PasswordInput`, `OtpInput`, `SubmitButton`…).
- **Features use the design system only**, enforced by ESLint `no-restricted-imports` on `@/components/ui/*` (`.eslintrc.json`).
- Feature files use kebab-case; `toast` is exposed from `@/components/feedback/toaster`.

The rendered UI is unchanged.

## React 18 exception
The shadcn CLI only generates React 19 components. On React 18 a ref can't cross a function component, so:
- `components/ui` keeps **one patch only**, `forwardRef`, on `Button`, `Input`, `Textarea`, `InputGroupInput`, `InputGroupButton`, `InputOTP` (listed in `components/ui/README.md`; re-apply it after `shadcn add --overwrite` on these files);
- the design-system wrappers that receive refs (`Button`, `Input`, `Textarea`, `InputGroupInput`, `PasswordInput`, `OtpInput`) use `forwardRef` too.

## Upgrading from next14-v1.0.0
Import paths changed. See the migration table in [CHANGELOG.md](../../CHANGELOG.md#migration-from-100).

## Verified
Lint (0 errors), typecheck, production build, HTTP smoke test; in dev: no ref warnings, translated form errors, focus on the first invalid field (including through `PasswordInput`).
