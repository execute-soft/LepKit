# Reusable Component Migration Todo

## Goal

Move reusable frontend UI into `web/packages/uix` and consume it from every frontend app where it is appropriate, without mixing app business logic into the shared package.

`web/packages/uix` must be the single source of truth for shared UI/UX design across frontend apps. Reusable design tokens, class recipes, primitives, layouts, form controls, feedback states, data display patterns, navigation patterns, commerce UI, and shared interaction behavior should be defined in `@repo/uix` first, then consumed by apps and themes.

## Current Findings

- `@repo/uix` already exists and is used by `hack`, `store-admin`, `bila`, `boisodai`, and `zimos`.
- `@repo/uix` currently contains shared modals, loaders, error views, page shell helpers, Formik inputs, data-table helpers, carousel exports, payment helpers, and storefront style helpers.
- `@repo/uix` now owns the primitive dependencies that were previously reached through app-local aliases such as `@/components/ui` and `@/lib/utils`.
- The largest reusable React dashboard source is duplicated between `web/apps/hack/src/components/ui` and `web/apps/store/dashboard/admin/src/components/ui`.
- Store themes include repeated storefront components such as product tiles, carts, hero banners, navigation, category menus, promo grids, brand sections, blog sections, quick views, and wishlist modals.
- The workspace mixes React apps and Solid apps. Shared migration must separate framework-neutral tokens/utilities from React-only and Solid-only components.

## Frontend Surfaces To Include

- `web/apps/hack`
- `web/apps/store/dashboard/admin`
- `web/apps/warehouse/dashboard/admin`
- `web/apps/warehouse/dashboard/staff`
- `web/apps/warehouse/dashboard/customer`
- `web/apps/docs`
- `web/apps/onboarding`
- `web/apps/store/themes/bila`
- `web/apps/store/themes/boisodai`
- `web/apps/store/themes/gimos`
- `web/apps/store/themes/learnify`
- `web/apps/store/themes/orin`
- `web/apps/store/themes/panda`
- `web/apps/store/themes/starter`
- `web/apps/store/themes/zimos`
- `web/apps/hajj/dashboard/admin`
- `web/apps/hajj/themes/hajj`
- `web/apps/suite/dashboard/admin`
- `web/apps/suite/themes/suite`
- `web/apps/warehouse/themes/hub`
- `web/apps/controller`
- `web/apps/payment-hub`

## Migration Rules

- Treat `web/packages/uix` as the single source of truth for reusable UI/UX design, shared component APIs, tokens, variants, spacing, radius, typography, color semantics, elevation, motion, and common interaction patterns.
- New reusable UI should be added to `@repo/uix` before being consumed by multiple apps.
- App-local UI is allowed only for app-specific workflow, domain copy, route composition, or one-off presentation that is not reusable.
- Apps and themes should customize shared UI through package-supported tokens, recipes, variants, and composition slots instead of forking components.
- Do not move route pages, API calls, GraphQL actions, app stores, feature-specific workflows, or domain copy into `@repo/uix`.
- Do not import from `web/apps/*` inside `@repo/uix`.
- Keep GraphQL usage in apps or `@repo/graphql`, not shared UI components.
- Keep Tailwind utility styling, but centralize repeated recipes and tokens in `@repo/uix`.
- Prefer package-owned imports such as `@repo/uix/react`, `@repo/uix/solid`, `@repo/uix/tokens`, and `@repo/uix/styles` over deep internal paths.
- Keep compatibility exports during migration, then remove old deep exports after all apps are updated.

## Todo Plan

### Phase 1: Package Hardening

- [x] Add package-owned `cn`/class merge utility under `web/packages/uix/src/utils`.
- [x] Define the canonical UI/UX token groups in `web/packages/uix/src/tokens`: colors, semantic colors, spacing, typography, radius, shadows, motion, and z-index.
- [x] Define canonical component recipes and variants in `web/packages/uix/src/styles` so apps do not duplicate button, input, card, table, modal, navigation, and status styles.
- [x] Add package-owned primitive exports for `Button`, `Dialog`, `Input`, `Textarea`, `Checkbox`, `Table`, `DropdownMenu`, and other dependencies currently expected from `@/components/ui`.
- [x] Replace `@/components/ui` imports inside `@repo/uix` with package-owned imports.
- [x] Replace `@/lib/utils` imports inside `@repo/uix` with package-owned utilities.
- [x] Decide public export groups: `react`, `solid`, `tokens`, `styles`, `data-table`, `forms`, `commerce`, and compatibility exports.
- [x] Update `web/packages/uix/package.json` exports for the selected groups.
- [x] Run `cd web/packages/uix && bun run check-types`.

### Phase 2: React Dashboard Primitives

- [x] Compare duplicated `src/components/ui` files in `hack` and `store-admin`.
- [x] Move stable shared primitives into `web/packages/uix/src/react/primitives`.
- [x] Move shared overlay/feedback components into `web/packages/uix/src/react/feedback`.
- [x] Move shared table primitives into `web/packages/uix/src/react/primitives`.
- [x] Move shared pagination, row actions, and bulk actions into `web/packages/uix/src/react/data-table`.
- [x] Move shared form controls into `web/packages/uix/src/react/forms`.
- [x] Update `hack` primitive compatibility files to use `@repo/uix` public exports.
- [x] Update `store-admin` primitive compatibility files and barrel exports to use `@repo/uix` public exports.
- [x] Run type-check for `hack` and `store-admin` after the primitive migration slice.

### Phase 3: React Dashboard Layout Patterns

- [x] Identify reusable dashboard shell pieces: app loading screen, admin state page, language switcher, sidebar frame, settings modal frame, page headers, stat cards, summary tables, usage cards, and top-source cards.
- [x] Extract generic dashboard layout components into `web/packages/uix/src/react/layout`.
- [x] Keep app-specific nav items, permissions, copy, and feature routes inside apps.
- [x] Update `hack` and `store-admin` loading/state/stat/language components to consume `@repo/uix/react/layout`.
- [x] Update warehouse React dashboards incrementally.
- [x] Run affected app type-checks after each app migration.

### Phase 4: Commerce And Storefront Shared UI

- [x] Audit repeated storefront components across store themes: `ProductTile`, `ProductCartDrawer`, `HeroBanner`, `CategoryNav`, `DepartmentDropdown`, `DepartmentMegaMenu`, `DepartmentSidebar`, `StickyCategoryNav`, `PromoGrid`, `FeaturedDealsSection`, `BrandShowcaseSection`, `HotProductsSection`, `LatestBlogSection`, `ProductQuickView`, `ProductWishlistModal`, `ProductDetailsTabs`, and `ProductCustomerReviews`.
- [x] Split reusable commerce models and formatters into framework-neutral `web/packages/uix/src/commerce` or `src/utils`.
- [x] Create React storefront components only for React themes.
- [x] Create Solid storefront components only where Solid apps can consume them cleanly.
- [x] Keep brand imagery, page composition, and theme-specific styling in each theme app.
- [x] Migrate Solid theme commerce helpers in `zimos` and `gimos` as a proof of pattern.
- [x] Repeat commerce/helper migration across remaining themes when each app has `@repo/uix` wired.

### Phase 5: Solid App Strategy

- [x] Inventory shared Solid UI in `controller`, `payment-hub`, `hajj`, `suite`, `warehouse hub`, and Solid store themes.
- [x] Add a Solid-specific export group for framework-neutral shared UIX APIs.
- [x] Share tokens, class recipes, payment helpers, and data formatters immediately where useful.
- [x] Avoid importing React components into Solid apps.
- [x] Type-check Solid apps after import changes where the migration touched code.

### Phase 6: Documentation And Cleanup

- [x] Update `web/packages/uix/docs/design-system-component-organization-plan.md` if final structure differs from the existing proposal.
- [x] Add component API guidelines for new shared components.
- [x] Document the UI/UX single-source-of-truth rule in `web/packages/uix/docs` and `.codex/skills/bponix`.
- [x] Add migration examples showing before/after imports.
- [x] Remove app-local duplicate components only after all local imports are replaced.
- [x] Keep compatibility exports until no app depends on old paths.
- [x] Update package dependency lists for apps newly consuming moved shared components.
- [x] Add the store-admin cleanup backlog in `web/packages/uix/docs/dashboard-admin-cleanup-todo.md`.

### Phase 7: Verification

- [x] Run `cd web && bun run check-types`.
- [x] Run targeted builds for migrated apps.
- [x] For visible UI migrations, open affected apps locally and verify key screens in browser. Captured smoke screenshots for `hack` and `store-admin` previews at `/tmp/hack-uix-smoke.png` and `/tmp/store-admin-uix-smoke.png`.
- [x] Confirm no `@repo/uix` source file imports from `@/` or `web/apps/*`.
- [x] Confirm no frontend app imports migrated duplicate local components.

## First Migration Batch Recommendation

Start with React dashboard primitives and data-table components because they already have duplicate file names in `hack` and `store-admin`, and both apps already depend on `@repo/uix`.

Suggested first batch:

- `button`
- `dialog`
- `dropdown-menu`
- `input`
- `textarea`
- `checkbox`
- `table`
- `badge`
- `tooltip`
- `skeleton`
- `spinner`
- `DataTable`
- `Pagination`
- `BulkActions`
- `RowActions`
- `ConfirmModal`
- `ModalFrame`

## Definition Of Done

- Shared reusable components live in `web/packages/uix`.
- Shared UI/UX design decisions, tokens, variants, recipes, and component APIs are defined in `web/packages/uix` before app adoption.
- Apps import shared components through public `@repo/uix` exports.
- App-local components remain only when they contain app-specific workflow, data, routing, or copy.
- React and Solid shared surfaces are separated.
- Type-check passes for `@repo/uix` and every migrated app.
- Migration docs explain the final structure and import conventions.
