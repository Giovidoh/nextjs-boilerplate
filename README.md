# Next.js Boilerplate

Starter for Next.js projects with **reusable and customizable** components: every visual value lives in design tokens, so a new design is mostly one file to edit.

## Versions

One release line per Next.js major. Same components and features, different framework layer.

| Next.js | Branch | Status | Start a project |
| --- | --- | --- | --- |
| **16.4** | `main` | Active LTS — recommended | `npx create-next-app@latest my-app -e https://github.com/Giovidoh/nextjs-boilerplate` |
| 15.5 | `next-15` | Maintenance LTS — security fixes until 2027-01-31 | `npx create-next-app@latest my-app -e https://github.com/Giovidoh/nextjs-boilerplate/tree/next-15` |
| 14.2 | `next-14` | **End of life — known unpatched vulnerabilities** | `npx create-next-app@latest my-app -e https://github.com/Giovidoh/nextjs-boilerplate/tree/next-14` |

See [CHANGELOG.md](CHANGELOG.md) for release notes.

## Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Turbopack), React 19.3, TypeScript 5 |
| UI | Tailwind CSS 4, shadcn/ui on **Base UI**, lucide-react, sonner |
| Forms | react-hook-form, Zod 4 |
| Data | TanStack Query 5 |
| i18n | next-intl 4 (`next/root-params`, locales `fr` / `en`) |
| Theme | next-themes (light / dark / system) |

Requirements: Node.js ≥ 20.9, pnpm.

## Getting started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

- App: http://localhost:3000
- **UI kit** (dev only): http://localhost:3000/fr/ui — every component and variant with the current theme.

| Script | |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` / `pnpm start` | Production build / server |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Route types + `tsc` |

## Customizing the design

Four levels, from global to local. Reach for the first one that does the job.

### 1. Tokens — `styles/theme.css`

The only file to edit when starting a new design. Copy values from the design file:

```css
:root {
  --primary: #0b44c0;                         /* colors */
  --font-size-h1: clamp(2rem, 1.5rem + 2vw, 3rem); /* fluid type scale */
  --radius: 0.625rem;                         /* whole radius scale */
  --control-height: 2.5rem;                   /* buttons, inputs, selects… */
  --button-radius: 999px;                     /* per-component override */
  --card-padding: 1.5rem;
}
.dark { /* dark values */ }
[data-theme="client-b"] { /* extra brand theme */ }
```

Fonts are declared in `configs/fonts.ts` (`next/font`) and mapped to `--font-body`, `--font-display`, `--font-code`.
Tokens cascade, so they can also be overridden on a subtree (`style={{ "--primary": "…" }}`).

`styles/globals.css` wires the tokens to Tailwind (`bg-primary`, `text-h1`, `font-heading`, `page-container`, `section-spacing`…). You normally don't touch it.

### 2. Variants — `components/ui/*`

Primitives come from shadcn/ui and are **owned code**. Add a variant once in the component's `cva` config, then use it everywhere:

```tsx
<Button variant="outline" size="lg" />
```

### 3. Slots — `className` + `classNames`

Multi-part components accept `className` for the root and `classNames` for each part:

```tsx
<PasswordInput showStrength classNames={{ group: "rounded-full", toggle: "text-primary" }} />
<FormField classNames={{ label: "sr-only", error: "text-caption" }} … />
```

Every part also carries a `data-slot` attribute for CSS targeting.

### 4. Composition

Change the rendered element with `render`, or assemble the primitives yourself:

```tsx
<Button nativeButton={false} render={<Link href="/login" />}>Sign in</Button>
```

## Project structure

```
app/[locale]/          Routes (auth, landing, dev UI kit), one static build per locale
components/ui/         shadcn primitives (Base UI), token-driven
components/forms/      FormField, PasswordInput, OtpInput, SubmitButton
components/common/     Logo, LanguageSwitcher, ThemeToggle
features/<feature>/    Feature modules (components, schemas, api, config)
configs/               App name, fonts, auth config
i18n/ + messages/      next-intl routing and catalogs (one file per feature)
lib/                   Utilities, shared validation rules
providers/             Client providers (theme, TanStack Query)
styles/                theme.css (tokens) + globals.css (wiring)
proxy.ts               Locale routing (Next 16 replacement for middleware)
```

## Forms

`FormField` wires react-hook-form to the Field primitives (label, ids, aria, description, error):

```tsx
<FormField control={form.control} name="email" label={t("email")}>
  {(field) => <Input type="email" {...field} />}
</FormField>
```

Zod messages are i18n keys under `validation` (`messages/<locale>/common.json`), translated at render time.
Password rules live in `lib/validation/password.ts` and feed both the schema and the strength meter.

## Adding shadcn components

```bash
pnpm dlx shadcn@latest add <component>
```

Don't auto-confirm prompts (no `-y`, no piping `yes`): the CLI may overwrite primitives you already customized. Check `git diff components/ui` afterwards and replace fixed sizes/colors with tokens.
