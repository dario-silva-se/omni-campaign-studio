---
name: omni-campaign-studio-architecture
description: Use when extending or refactoring the omni-campaign-studio React app — adding a page/route/nav item, working with the layout/header/sidebar, the i18n or service conventions, or the project's strategic extension points and gotchas.
---

# omni-campaign-studio — Strategic Points & Conventions

Front-end-only B2B marketing app (LinkedIn / YouTube / Telegram). "Cinematic Precision" dark+light design system. Follow these conventions when extending — they are enforced by lint, tests, and a clean-`git status`-per-commit discipline.

## Layout & navigation (single source of truth)

- **`src/components/layout/AppLayout.tsx`** wraps every route: `LayoutProvider` → `Sidebar` + `AppHeader` + `<main><Outlet/></main>`.
- **`AppHeader.tsx`** is the ONE global top bar. It derives the page title from the active route via `navItems` (longest-prefix match) and holds the menu toggle + theme + notifications.
  - ⚠️ **Do NOT add a per-page `<header>`/top bar.** Pages that need actions put them inside their content (see `AnalyticsPage` period selector, `DashboardPage` sync button, `TemplateDetailPage` toolbar). A page-level sticky header would double up with `AppHeader`.
- **`Sidebar.tsx`** serves both breakpoints: collapsible icon rail on desktop, off-canvas drawer on mobile. Lists **all** destinations — never build a reduced mobile nav.
- **`LayoutContext.tsx`** (`useLayout`) owns menu state: `mobileOpen`, `collapsed` (persisted in `localStorage: sidebar-collapsed`), `toggleMobile`, `closeMobile`, `toggleCollapsed`.
- **`navItems.ts`** is the menu config — three sections: `sectionMain`, `sectionGovernance`, `sectionSystem`. Adding a nav entry here is what makes `AppHeader` resolve its title and the sidebar render it.

## Adding a page (checklist)

1. Create `src/features/<feature>/pages/<Name>Page.tsx` (default export). Render content only — no top header bar.
2. Page shape: `if (isError) return <div role="alert" …>{t('common:errorState')}</div>`; `if (isLoading || !data) return …{t('common:loading')}`.
3. Add a `lazy(() => import(...))` + `<Route>` in `src/app/router.tsx`.
4. If it's a top-level destination, add an entry to `navItems.ts` (icon = Material Symbol name).
5. Add an i18n namespace: `src/i18n/locales/{pt-BR,en}/<feature>.json` with **identical leaf keys**, register both in `src/i18n/index.ts`.
6. Add a `*.test.tsx` using `renderWithProviders` from `@/test/renderWithProviders` (pt-BR loading text is exactly `"Carregando..."`).
7. Update the README route map.

## Data / services

- Domain types: `src/types/index.ts` (string `_id`, Mongo-ready). Commit types **with** their first use.
- Services: `createCrudService<T>(path, { fixtures })` in `src/services/`; fixtures in `src/mocks/fixtures/`.
- Mock mode via `VITE_USE_MOCKS=true` (default). Real API: `VITE_USE_MOCKS=false` + `VITE_API_URL`.

## i18n

- Every visible string via `t()`. One namespace per feature; pt-BR + en key parity required.
- Channel names via `t('common:channels.<channel>')` — never naive capitalization.

## UI primitives

- `src/components/ui/*` (Icon, Button, GlassCard, StatusChip, Input, Select, Textarea, Toggle, ProgressBar, Tabs, Modal, DataTable). All take `className` merged via `cn` (`@/lib/cn`).
- Theme via `ThemeContext` (`useTheme`) — dark/light, persisted in `localStorage: theme`.

## Gotchas (hard-won)

- **Never** round-trip locale JSON through PowerShell `Get-Content`/`Set-Content` — it corrupts UTF-8 accents. Use the Read/Edit/Write file tools.
- `react-hooks/purity` rejects `Date.now()` in render → use lazy `useState(() => Date.now())`.
- Context files that export a Provider **and** a `useX` hook need `// eslint-disable-next-line react-refresh/only-export-components` above the hook export (see `ThemeContext`, `LayoutContext`).

## Verification gate (before declaring done)

`npm run lint` (0 errors) · `npm run test` (all pass) · `npm run build` (clean). All three must be green.
