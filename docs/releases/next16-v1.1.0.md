# next16-v1.1.0 — Component architecture (Next.js 16.4)

Next.js **16.4.6** · React **19.3** · Tailwind CSS 4 · shadcn/ui on Base UI · next-intl 4 · Node.js ≥ 20.9

```bash
npx create-next-app@latest my-app -e https://github.com/Giovidoh/nextjs-boilerplate
```

## What's new
Components are organized in **three layers**, each one only using the layer below:

```
features/<feature>/   →   components/<category>/   →   components/ui/
feature-specific          design system (ours)          third-party (shadcn / Base UI)
```

- **`components/ui` is third-party code, never edited.** It matches the shadcn CLI output exactly, so `pnpm dlx shadcn@latest add <component> --overwrite` updates it without losing anything.
- **New design-system layer** in `components/actions`, `forms`, `feedback`, `overlays`, `display`, `common`:
  - themed wrappers apply the design tokens: `Button`, `Input`, `Textarea`, `InputGroup`, `SelectTrigger`, `Card`, `Progress`;
  - entry points re-export the other third-party components (`Badge`, `Dialog`, `Tabs`, `Checkbox`…), ready to be customized;
  - composites: `FormField`, `PasswordInput`, `OtpInput`, `SubmitButton`, `Logo`, `LanguageSwitcher`, `ThemeToggle`.
- **Features use the design system only.** A component goes in `features/<feature>/components/` only when it is specific to that feature (e.g. `LoginForm`, `AuthShell`).
- **Enforced by ESLint**: importing `@/components/ui/*` outside `components/` is an error.
- Feature files use kebab-case; `toast` is exposed with `Toaster` from `@/components/feedback/toaster`.

The rendered UI is unchanged: same tokens, same sizes.

## Upgrading from next16-v1.0.0
Import paths changed. See the migration table in [CHANGELOG.md](../../CHANGELOG.md#migration-from-100).

## Verified
Lint (0 errors), typecheck, production build, HTTP smoke test; in dev: no console errors, control sizes 32 / 40 / 48 px, translated form errors, focus on the first invalid field.
