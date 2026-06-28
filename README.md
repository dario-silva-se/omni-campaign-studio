# Campaign Studio

Campaign Studio is a B2B marketing orchestration front-end designed for LinkedIn, YouTube, and Telegram campaigns. It implements the "Cinematic Precision" dark design system, ported from Stitch screens, and covers the full campaign lifecycle: audience segmentation, content creation, post scheduling, approval governance, automation logic, and real-time data flow monitoring.

The project is front-end only. All services resolve from typed in-memory fixtures until a real MongoDB Atlas-backed REST API is wired in.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Bundler | Vite 8 |
| UI library | React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 |
| Routing | react-router-dom 7 |
| Data fetching | TanStack Query 5 + axios |
| i18n | i18next + react-i18next (pt-BR default, en) |
| Testing | Vitest 4 + Testing Library |

---

## Scripts

```bash
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run build        # Type-check + production build (output: dist/)
npm run preview      # Serve the production build locally
npm run lint         # ESLint (0-error policy)
npm run test         # Vitest single-run (all 164 tests)
npm run test:watch   # Vitest watch mode
npm run coverage     # Vitest with v8 coverage report
```

---

## Folder Structure

```
src/
  app/
    router.tsx          # All route definitions (AppRoutes)
    providers.tsx       # QueryClient, I18nextProvider, RouterProvider wrappers
  components/
    ui/                 # Primitive components: Icon, Button, GlassCard, StatusChip,
    |                   #   Input, Select, Textarea, Toggle, ProgressBar, Tabs,
    |                   #   Modal, DataTable
    layout/             # AppLayout, AppHeader, Sidebar (collapsible + mobile drawer)
  features/
    <feature>/
      pages/            # Route-level page components
      components/       # Feature-scoped sub-components
      hooks/            # useQuery / useMutation wrappers for the feature
  services/             # createCrudService<T> factory + per-domain service instances
  types/                # Domain TypeScript interfaces (Campaign, Post, Audience, …)
  mocks/
    fixtures/           # Typed seed data arrays (used in mock mode)
  i18n/
    index.ts            # i18next initialisation + resource map
    locales/
      pt-BR/            # Default locale JSON files (one file per namespace)
      en/               # English locale JSON files (mirror structure)
  lib/
    cn.ts               # clsx + tailwind-merge utility
    formatters.ts       # Currency, compact number, percentage, date formatters
  test/
    setup.ts            # Vitest global setup (jsdom + Testing Library matchers)
```

---

## i18n

- **Default locale:** `pt-BR`. Falls back to `pt-BR` when a key is missing in any other locale.
- **Supported:** `pt-BR`, `en`. Language is detected from `localStorage` then `navigator.language`.
- **Namespaces:** `common`, `dashboard`, `analytics`, `audiences`, `templates`, `creativeLab`, `contentGeneration`, `campaigns`, `posts`, `approvals`, `alerts`, `automations`, `connections`, `settings`, `reports`.
- **All visible UI strings must go through `t()`.**  Never render a hard-coded label, heading, button text, or status string directly in JSX.

### Adding a namespace

1. Create `src/i18n/locales/pt-BR/<name>.json` and `src/i18n/locales/en/<name>.json` with identical leaf-key sets.
2. Import both files in `src/i18n/index.ts` and add them to the `resources` map under both locales.
3. Use `useTranslation('<name>')` in your component.

---

## Service Layer / Data

The service layer is built on a generic CRUD factory:

```ts
// src/services/crudService.ts
createCrudService<T>(fixtures, axiosInstance)
```

When `VITE_USE_MOCKS=true` (the default in `.env.development`), every service call is satisfied by the in-memory fixture arrays with simulated async delay. No network traffic is generated.

To point at a real API, set `VITE_USE_MOCKS=false` and `VITE_API_URL` to the API
base URL **including the `/api` prefix** (the backend mounts every route under
`/api`):

```env
# Production (.env.production or your host's build env vars)
VITE_USE_MOCKS=false
VITE_API_URL=https://omni-campaign-studio-api.vercel.app/api
```

Local development against a locally-running API
([`omni-campaign-studio-api`](https://github.com/dario-silva-se/omni-campaign-studio-api),
`npm run dev` on port 3000) — put this in an untracked `.env.development.local`:

```env
VITE_USE_MOCKS=false
VITE_API_URL=http://localhost:3000/api
```

The backend is the MongoDB Atlas-backed REST service in `omni-campaign-studio-api`.
Document IDs are string `_id` fields (not numeric). Each domain service
(`campaignService`, `postService`, `audienceService`, …) is built from
`createCrudService<T>`, which speaks plain REST (`GET/POST/PATCH/DELETE {path}`)
when mocks are off. CORS on the API must allow the frontend's origin (configured
via its `ALLOWED_ORIGINS` env var; `http://localhost:5173` is allowed by default).

### Behind the gateway

To route through [`omni-campaign-studio-gateway`](https://github.com/dario-silva-se/omni-campaign-studio-gateway) (access control, rate limiting, cost control, telemetry), point `VITE_API_URL` at the gateway's `/api` surface and provide an issued API key:

```env
VITE_USE_MOCKS=false
VITE_API_URL=https://your-gateway.example.com/api
VITE_API_KEY=gw_...
```

`apiClient` attaches the key as `Authorization: Bearer <key>` on every request. The gateway authenticates, throttles and meters the call, then forwards it to the upstream API.

---

## Route Map

| Route | Page Component | Feature |
|---|---|---|
| `/` | `DashboardPage` | Dashboard |
| `/analytics` | `AnalyticsPage` | Analytics |
| `/analytics/campaign-health` | `CampaignHealthPage` | Analytics |
| `/analytics/lead-lifecycle` | `LeadLifecyclePage` | Analytics |
| `/settings` | `UserSettingsPage` | Settings |
| `/audiences` | `AudiencesPage` | Audiences |
| `/audiences/new` | `NewAudiencePage` | Audiences |
| `/audiences/:id/edit` | `EditSegmentPage` | Audiences |
| `/templates` | `TemplateLibraryPage` | Templates |
| `/templates/:id` | `TemplateDetailPage` | Templates |
| `/creative-lab` | `CreativeLabPage` | Creative Lab |
| `/content-generation` | `ContentGenerationPage` | Content Generation |
| `/campaigns` | `CampaignsPage` | Campaigns |
| `/campaigns/new/step-1` … `step-5` | `NewCampaignWizard` | Campaigns (wizard steps 1-5) |
| `/campaigns/launching` | `LaunchProgressPage` | Campaigns |
| `/campaigns/launched` | `LaunchSuccessPage` | Campaigns |
| `/posts` | `PostsOverviewPage` | Posts |
| `/posts/new` | `NewPostPage` | Posts |
| `/posts/schedule/:channel` | `SchedulePostPage` | Posts |
| `/posts/:id` | `PostDetailPage` | Posts |
| `/approvals` | `ApprovalsPage` | Approvals |
| `/approvals/history` | `GovernanceHistoryPage` | Approvals |
| `/approvals/:id` | `ApprovalDetailPage` | Approvals |
| `/alerts` | `AlertsPage` | Alerts |
| `/alerts/:id` | `AlertDetailPage` | Alerts |
| `/automations` | `LogicBuilderPage` | Automations |
| `/automations/monitor` | `AutomationMonitorPage` | Automations |
| `/system/data-flow` | `DataFlowPage` | Automations / Data Flow |
| `/settings/connections` | `ConnectionsPage` | Connections |
| `/settings/connections/:channel` | `ConnectionDetailPage` | Connections |
| `/settings/notifications` | `NotificationSettingsPage` | Settings |
| `/reports/export` | `ExportReportPage` | Reports |

---

## Layout & Navigation

- **`AppLayout`** wraps every route. It mounts a single global **`AppHeader`** (route-derived title + menu toggle + theme/notifications) above the page `<Outlet/>`, plus the **`Sidebar`**.
- **`AppHeader`** derives the page title from the active route via `navItems` (longest-prefix match). Pages must **not** render their own top `<header>` bar — page-specific actions live inside the page content (e.g. Analytics' period selector / Dashboard's sync button / Template detail toolbar).
- **`Sidebar`** is one component for both breakpoints: a **collapsible icon rail** on desktop (state persisted in `localStorage` under `sidebar-collapsed`) and an **off-canvas drawer** on mobile (backdrop + `Escape` to close + closes on navigation). It lists **all** destinations on every breakpoint.
- Menu state lives in **`LayoutContext`** (`useLayout`): `mobileOpen`, `collapsed`, `toggleMobile`, `closeMobile`, `toggleCollapsed`.

---

## Notes

- **Backend is out of scope.** This is a front-end-only repository. All services resolve from typed fixtures until the real API is wired in.
- **Design system:** "Cinematic Precision" — deep dark surfaces, `backdrop-blur`, primary accent `#adc6ff`, typography via Material Symbols icon font. Tailwind tokens are defined in `tailwind.config.js`.
- **Test coverage:** 45 test files, 164 tests. Run `npm run coverage` for a detailed report.
