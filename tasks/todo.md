# TODO

## In Progress
- [~] Fondation Next 16 + design system personnalisable — branche `feat/next-16-foundation`

## To Do

### 1. Mise à niveau Next 16.4.6
- [x] next 16.4.6 / react 19.3.1 / eslint-config-next 16.4.6 / next-intl 4.15 (ESLint 9 : plusieurs plugins ne supportent pas encore ESLint 10)
- [x] `middleware.ts` → `proxy.ts`, suppression du code mort
- [x] SVGR via `turbopack.rules` (plus de config webpack)
- [x] `pnpm-workspace.yaml` valide, `packageManager` + `engines` + script `typecheck`
- [x] ESLint flat config fonctionnel (`pnpm lint` : 0 erreur)
- [x] Retirer pg, @types/pg, react-phone-number-input
- [x] i18n via `next/root-params` + `generateStaticParams` → pages SSG par locale
- [x] QueryClient par requête côté serveur (fuite de cache entre utilisateurs corrigée)
- [x] Pages OTP / reset : `searchParams` lus côté serveur (plus de `useSearchParams` sans Suspense)
- [ ] Activer `cacheComponents` + `partialPrefetching` (défaut create-next-app 16.4) — après la migration des pages

### 2. Tokens de design
- [ ] `styles/theme.css` : couleurs, typo fluide, rayons, ombres, tokens composant
- [ ] `styles/globals.css` : `@theme inline` qui expose les tokens à Tailwind
- [ ] Mode sombre (`.dark`) + support multi-thèmes (`[data-theme]`)
- [ ] ThemeProvider (next-themes) + polices via `next/font`

### 3. Primitives ui (shadcn, Base UI)
- [ ] Réinstaller les primitives avec Base UI, sans aucune valeur en dur
- [ ] Variantes (`cva`) alimentées par les tokens : button, input, select, checkbox, switch…

### 4. Composants composés (slots + classNames)
- [ ] Field (Label / Control / Description / Error) branché sur react-hook-form
- [ ] PasswordInput (toggle + jauge de force, i18n)
- [ ] OtpInput contrôlé
- [ ] LanguageSwitcher locale-aware

### 5. Migration
- [ ] Pages auth + landing sur les nouveaux composants, liens via `@/i18n/navigation`
- [ ] Supprimer `components/*/Base*`
- [ ] Page `/ui` (dev uniquement) qui montre chaque composant et ses variantes

### 6. Vérification
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm build` verts
- [ ] Rendu vérifié dans le navigateur (clair / sombre, fr / en)

## Done
- [x] Audit du boilerplate et de la doc Next 13 → 16.4 (2026-11-18)

## Blocked
- [!] Releases Next 13 / 14 — EOL avec failles critiques non corrigées, en attente de décision
- [!] Stratégie d'auth (backend externe vs Better Auth) — en attente de décision
