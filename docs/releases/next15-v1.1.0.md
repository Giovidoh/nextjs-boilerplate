# next15-v1.1.0 — Component architecture (Next.js 15.5)

Next.js **15.5.29** · React **19.3** · Tailwind CSS 4 · shadcn/ui on Base UI · next-intl 4 · Node.js ≥ 20.9

```bash
npx create-next-app@latest my-app -e https://github.com/Giovidoh/nextjs-boilerplate/tree/next-15
```

> Next.js 15 is in **Maintenance LTS**: security fixes until **2027-01-31**. Prefer the Next.js 16 line (`main`) for new projects unless a dependency or host requires 15.

## What's new
Same release as `next16-v1.1.0`: components are organized in **three layers**.

```
features/<feature>/   →   components/<category>/   →   components/ui/
feature-specific          design system (ours)          third-party (shadcn / Base UI)
```

- **`components/ui` is third-party code, never edited** (exact shadcn CLI output, safe to update with `--overwrite`).
- **New design-system layer** in `components/actions`, `forms`, `feedback`, `overlays`, `display`, `common`: themed wrappers (`Button`, `Input`, `Textarea`, `InputGroup`, `SelectTrigger`, `Card`, `Progress`), entry points for the other third-party components, and the composites (`FormField`, `PasswordInput`, `OtpInput`, `SubmitButton`…).
- **Features use the design system only**, enforced by ESLint `no-restricted-imports` on `@/components/ui/*`.
- Feature files use kebab-case; `toast` is exposed from `@/components/feedback/toaster`.

The rendered UI is unchanged.

## Upgrading from next15-v1.0.0
Import paths changed. See the migration table in [CHANGELOG.md](../../CHANGELOG.md#migration-from-100).

## Verified
Lint (0 errors), typecheck, production build, HTTP smoke test; in dev: no console errors, translated form errors, focus on the first invalid field.
