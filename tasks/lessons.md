# LESSONS

| Date       | What went wrong                 | Rule to apply                          |
|------------|---------------------------------|----------------------------------------|
| 2026-11-18 | Configs were written for Next 16 (eslint flat import, tsconfig `.next/dev/types`, README) while `next` was pinned to 15.5.7 → `eslint` crashed and `next build` silently skipped linting | Keep `next`, `eslint-config-next` and configs on the same major; run `pnpm lint` on its own, never trust the build to lint |
| 2026-11-18 | Components hardcoded colors/sizes (`bg-white`, `#BCBABA`, `text-[clamp(...)]`) → every new design meant editing each component | Components only consume design tokens (CSS variables); brand values live in `styles/theme.css` only |
| 2026-11-18 | `QueryClient` instantiated at module scope in a client provider → cache shared across SSR requests | Create the QueryClient per request on the server and once per browser session (`getQueryClient` pattern) |
| 2026-11-18 | Making `[locale]` pages static (generateStaticParams) broke the build: client pages called `useSearchParams()` without a Suspense boundary | Read `searchParams` in the server page (`await props.searchParams`) and pass values down; reserve `useSearchParams` for client islands wrapped in `<Suspense>` |
| 2026-11-18 | Tried to stop a local server with `taskkill /IM node.exe` (would kill every Node process on the machine) | Run servers through the preview tool (`.claude/launch.json`) and stop them with `preview_stop` |
