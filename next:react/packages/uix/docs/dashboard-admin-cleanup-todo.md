# Store Admin Dashboard UI Cleanup Todo

## Goal

Continue moving reusable `web/apps/store/dashboard/admin` UI into `web/packages/uix` and remove duplicate local files after each migration slice is verified.

`@repo/uix` remains the single source of truth for reusable UI primitives, layout states, feedback, data display, form controls, tokens, recipes, and common interaction behavior. Store-admin keeps route composition, data fetching, feature workflows, domain copy, and store-specific configuration panels local.

## Cleanup Rules

- Move the common component/API into `@repo/uix` first.
- Keep the store-admin API compatible before replacing imports.
- Update `web/apps/store/dashboard/admin/src/components/ui/index.ts` to re-export from `@repo/uix` where compatibility is still needed.
- Replace direct deep imports such as `@/components/ui/<name>` with public `@repo/uix` imports where practical.
- Delete the old local file only after `rg` confirms no local imports remain.
- Do not move app-specific navigation, sidebar state, API calls, GraphQL actions, route pages, product/order workflows, or domain-specific copy into `@repo/uix`.

## Already Cleaned Up

- [x] `AppLoadingScreen` moved to `@repo/uix/react/layout`; local wrapper removed.
- [x] `AdminStatePage` moved to `@repo/uix/react/layout`; local wrapper removed.
- [x] `dashboard/overview/StatCard` moved to `@repo/uix/react/layout`; unused local wrapper removed.
- [x] `badge` moved to `@repo/uix/react/primitives`; local file removed.
- [x] `switch` moved to `@repo/uix/react/primitives`; local file removed.
- [x] `status-badge` moved to `@repo/uix/data-display`; local file removed.
- [x] `skeleton` moved to `@repo/uix/react/primitives`; local file removed.
- [x] `spinner` moved to `@repo/uix/react/primitives`; local file removed.
- [x] `progress` moved to `@repo/uix/feedback`; local file removed.
- [x] `tabs` moved to `@repo/uix/react/primitives`; local file removed.
- [x] `tooltip` moved to `@repo/uix/react/primitives`; local file removed.

## Phase 1: Low-Risk Generic Primitives

- [x] Move `alert.tsx` into `@repo/uix/feedback` or `@repo/uix/react/primitives`.
- [x] Move `empty.tsx` into `@repo/uix/layout` or `@repo/uix/feedback`.
- [x] Move `card.tsx` into `@repo/uix/react/primitives`.
- [x] Move `aspect-ratio.tsx` into `@repo/uix/react/primitives`.
- [x] Move `avatar.tsx` into `@repo/uix/react/primitives`.
- [x] Move `breadcrumb.tsx` into `@repo/uix/navigation`.
- [x] Move `pagination.tsx` into `@repo/uix/data-display` or `@repo/uix/react/primitives`.
- [x] Replace store-admin barrel exports with `@repo/uix` exports.
- [x] Delete migrated local files after stale-import scans pass.

## Phase 2: Common Radix Interaction Primitives

- [x] Move `accordion.tsx` into `@repo/uix/react/primitives`.
- [x] Move `collapsible.tsx` into `@repo/uix/react/primitives`.
- [x] Move `hover-card.tsx` into `@repo/uix/react/primitives`.
- [x] Move `radio-group.tsx` into `@repo/uix/react/primitives`.
- [x] Move `slider.tsx` into `@repo/uix/react/primitives`.
- [x] Move `sheet.tsx` into `@repo/uix/react/primitives`.
- [x] Move `drawer.tsx` only if UIX can preserve the current drawer API exactly.
- [x] Move `alert-dialog.tsx` only after confirming it does not diverge from UIX `Dialog` semantics.
- [x] Delete migrated local files after stale-import scans pass.

## Phase 3: Form And Field Building Blocks

- [x] Compare local `field.tsx` against `@repo/uix/forms` and `@repo/uix/react/primitives`.
- [x] Move reusable `Field`, `FieldLabel`, `FieldError`, description/group/set patterns into UIX.
- [x] Compare local `input-group.tsx`; migrate if it is generic enough for dashboards.
- [x] Compare local `input-otp.tsx`; migrate if no app-specific behavior exists.
- [x] Compare local `native-select.tsx`; migrate if API is generic.
- [x] Keep `form.tsx` local unless its `react-hook-form` coupling is desired in UIX.
- [x] Delete migrated local files after stale-import scans pass.

## Phase 4: Menus And Navigation Primitives

- [x] Move `context-menu.tsx` into `@repo/uix/react/primitives`.
- [x] Move `menubar.tsx` into `@repo/uix/react/primitives`.
- [x] Move `navigation-menu.tsx` into `@repo/uix/navigation`.
- [x] Keep `nav-main.tsx`, `nav-projects.tsx`, `nav-user.tsx`, and `team-switcher.tsx` local unless they become app-agnostic.
- [x] Keep `sidebar.tsx` local for now because it owns app shell behavior and sidebar cookie state.
- [x] Delete migrated local files after stale-import scans pass.

## Phase 5: Data Display And Media Helpers

- [x] Compare `item.tsx`; move generic item layout primitives into `@repo/uix/data-display`.
- [x] Compare `kbd.tsx`; move into `@repo/uix/react/primitives`.
- [x] Compare `title-media-avatar.tsx`; move if generic.
- [x] Compare `carousel.tsx`; consolidate with existing `@repo/uix/components/carousel`.
- [x] Compare `chart.tsx`; keep local until chart theme/API is shared across apps.
- [x] Delete migrated local files after stale-import scans pass.

## Phase 6: App-Specific Or Defer

- [x] Keep `BackgroundColorEffect.tsx` local unless multiple apps use the exact effect.
- [x] Keep `direction.tsx` local unless direction context is needed across apps.
- [x] Keep feature folders under `components/dashboard/*`, `components/product-form/*`, and `components/category-manager/*` local unless a component is clearly reusable.
- [x] Keep GraphQL/API helpers local.

## Remaining Store-Admin UI Audit

- App shell and navigation, kept local: `sidebar.tsx`, `nav-main.tsx`, `nav-projects.tsx`, `nav-user.tsx`, `team-switcher.tsx`.
- App-local interaction or provider behavior, kept local: `direction.tsx`, `BackgroundColorEffect.tsx`, `sonner.tsx`.
- Dashboard-specific visualization, kept local: `chart.tsx` until a shared Recharts theme/API contract exists.
- Migrated in the final hardening pass: `button-group.tsx`, `combobox.tsx`, `scroll-area.tsx`, `toggle-group.tsx`.
- Compatibility barrel, kept local: `index.ts` re-exports shared UIX components while existing app imports are gradually normalized.

## Verification Per Phase

- [x] Run `cd web/packages/uix && bun run check-types`.
- [x] Run `cd web/apps/store/dashboard/admin && bun run check-types`.
- [x] Run `cd web/apps/store/dashboard/admin && bun run build`.
- [x] Run stale import scans for deleted files.
- [x] Run `cd web && bun run check-types` after package exports or dependencies change.
- [x] For visible UI primitive changes, run a Vite preview screenshot smoke for store-admin.

## Stale Import Scan Template

```bash
rg -n "@/components/ui/(component-name)|from ['\"]\\./(component-name)['\"]" \
  web/apps/store/dashboard/admin/src \
  -g '*.ts' -g '*.tsx'
```

## Completion Criteria

- Reusable dashboard/admin UI lives in `@repo/uix`.
- Store-admin imports shared components from public `@repo/uix` exports or compatibility barrel exports backed by UIX.
- Deleted local files have no stale imports.
- Store-admin type-check and build pass.
- Full web type-check passes when package exports/dependencies change.
