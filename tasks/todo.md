# TODO

## In Progress
- [~] Releases v1.0.0 « fondation » sur 3 lignes (plan : ~/.claude/plans/clever-frolicking-summit.md)
  - [~] Next 16 → `main`, tag `next16-v1.0.0`
  - [ ] Next 15 → branche `next-15`, tag `next15-v1.0.0`
  - [ ] Next 14 → branche `next-14`, tag `next14-v1.0.0` (EOL : avertissement sécurité)
  - [ ] Publication (push + GitHub Releases) — après accord explicite
- [~] Vérification visuelle au clic (menu mobile, sélecteur de langue, toggle de thème) — la fenêtre de preview était masquée pendant la session du 2026-11-18

## To Do
- [ ] Activer `cacheComponents` + `partialPrefetching` (défaut create-next-app 16.4) et adapter les pages
- [ ] Module API : client serveur typé (`server-only`), erreurs normalisées, route proxy réécrite (multipart, en-têtes, Set-Cookie, 204), validation des variables d'environnement
- [ ] Module auth (selon la stratégie choisie) : session httpOnly, garde dans `proxy.ts` + vérification serveur, rôles, OAuth réel
- [ ] Kit SEO : métadonnées traduites, Open Graph, sitemap, robots, manifest
- [ ] Pages `not-found`, `error`, `global-error`, `loading` traduites
- [ ] Composants composés supplémentaires : DataTable, DatePicker, FileUpload, PhoneInput, Combobox, ConfirmDialog, EmptyState
- [ ] Layout tableau de bord (sidebar, topbar, menu utilisateur, fil d'Ariane) + pages paramètres
- [ ] Sections landing supplémentaires : tarifs, FAQ, CTA, témoignages
- [ ] Outillage : Prettier (+ plugin Tailwind), Husky + lint-staged, Vitest, Playwright, CI GitHub Actions, Renovate
- [ ] Registre shadcn privé pour partager les composants entre projets / branches de version
- [ ] Nettoyer `public/assets/images/countries` (250 drapeaux, plus utilisés)

## Done
- [x] Audit du boilerplate et de la doc Next 13 → 16.4 (2026-11-18)
- [x] Mise à niveau Next 16.4.6 / React 19.3 / next-intl 4.15 (`proxy.ts`, SVGR via Turbopack, root params, pages SSG par locale) — commit 736c7cf
- [x] QueryClient par requête côté serveur (fuite de cache entre utilisateurs corrigée)
- [x] Tokens de design : `styles/theme.css` (couleurs, typo fluide, rayons, contrôles, cartes, layout, sombre, multi-thèmes) + câblage `globals.css`
- [x] Polices via `next/font` (`configs/fonts.ts`) + ThemeProvider (clair / sombre / système)
- [x] Primitives shadcn sur Base UI, tailles / rayons / fonds pilotés par les tokens (button, input, textarea, select, input-group, input-otp, card)
- [x] Composants composés avec `classNames` par slot : FormField, PasswordInput, OtpInput, SubmitButton, Logo, LanguageSwitcher, ThemeToggle, AuthShell, OAuthButtons
- [x] Messages Zod = clés i18n traduites par FormField ; règles mot de passe partagées schéma / jauge
- [x] Pages auth + landing migrées (liens locale-aware, TanStack `useMutation`, `authApi` qui échoue explicitement tant que l'auth n'est pas branchée)
- [x] Suppression des `Base*`, de gsap, des paquets Radix, des restes d'anciens projets
- [x] `API_URL` côté serveur uniquement + `.env.example`
- [x] Page `/ui` (dev uniquement, 404 en prod)
- [x] `pnpm lint` (0 erreur), `pnpm typecheck`, `pnpm build` verts ; pages vérifiées sans erreur console ; validation, toasts et tokens sombres vérifiés dans le navigateur

## Blocked
- [!] Stratégie d'auth (backend externe vs Better Auth) — en attente de décision
