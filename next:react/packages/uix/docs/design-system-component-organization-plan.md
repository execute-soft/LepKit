# UI Design System And Reusable Component Organization Plan

## Goal

Create one production-grade UI design system inside `web/packages/uix` that can be reused by all frontend surfaces:

- Hack/System dashboard
- Store admin dashboard
- Warehouse admin/staff/customer dashboards
- Payment Hub
- Controller runtime shell
- Store themes such as Bila, Orin, Zimos, Gimos, Panda, Learnify, and future themes
- Docs/onboarding/public apps where shared UI is useful

The package should reduce duplicate component code, keep UI behavior consistent, and still allow each app or theme to own its brand styling through tokens and composition.

## Current Starting Point

`@repo/uix` already exists and exports a small set of shared components:

- Modals and confirmation dialogs
- Error and loader components
- Page header
- Search input
- Tab switcher
- Textarea
- Data table helpers
- Carousel components
- Formik field wrappers
- Payment utility exports
- Storefront style helpers

The repo also has many app-local component folders under `web/apps/*`, so the migration should be incremental. Do not move everything at once.

## Architecture Principles

- `@repo/uix` owns reusable UI primitives, layout shells, data display components, form controls, feedback states, and shared interaction patterns.
- Apps own feature workflows, data fetching, route-level containers, and business-specific copy.
- Themes own storefront composition, brand imagery, and commerce-specific page layout, but should use shared primitives where possible.
- Shared components must be accessible, typed, responsive, and stable.
- Shared components must not call app-specific APIs directly.
- Shared components must not import from `web/apps/*`.
- GraphQL/API logic stays in app services or `@repo/graphql`, not in generic UI components.
- Components should support controlled and uncontrolled usage where useful.
- Tailwind utility classes can be used, but tokens and variants must be centralized.
- Avoid one-off styling props that create inconsistent design variants.

## Target Package Structure

```text
web/packages/uix/
  src/
    index.ts
    tokens/
      colors.ts
      spacing.ts
      radius.ts
      typography.ts
      shadows.ts
      motion.ts
      zIndex.ts
      semantic.ts
    styles/
      classNames.ts
      variants.ts
      storefront.ts
      dashboard.ts
    primitives/
      Button.tsx
      IconButton.tsx
      Input.tsx
      Textarea.tsx
      Select.tsx
      Checkbox.tsx
      Radio.tsx
      Switch.tsx
      Badge.tsx
      Avatar.tsx
      Tooltip.tsx
      Popover.tsx
      Dialog.tsx
      Drawer.tsx
      Tabs.tsx
      Separator.tsx
      Skeleton.tsx
      Spinner.tsx
    forms/
      Field.tsx
      FieldError.tsx
      FieldLabel.tsx
      FormSection.tsx
      FormActions.tsx
      SearchInput.tsx
      DateInput.tsx
      NumberInput.tsx
      MoneyInput.tsx
      RichTextField.tsx
      MediaUploadField.tsx
      Formik/
    layout/
      AppShell.tsx
      DashboardShell.tsx
      DashboardSidebar.tsx
      DashboardTopbar.tsx
      PageShell.tsx
      PageHeader.tsx
      SectionHeader.tsx
      EmptyState.tsx
      ErrorState.tsx
      LoadingState.tsx
      MaxWidthContainer.tsx
      Toolbar.tsx
    data-display/
      DataTable.tsx
      Pagination.tsx
      StatCard.tsx
      MetricGrid.tsx
      DescriptionList.tsx
      Timeline.tsx
      ActivityFeed.tsx
      StatusPill.tsx
      KeyValueCard.tsx
    commerce/
      ProductCard.tsx
      ProductImage.tsx
      Price.tsx
      QuantityStepper.tsx
      CartLineItem.tsx
      CheckoutSummary.tsx
      OrderStatusBadge.tsx
      PaymentMethodBadge.tsx
      ShippingStatusBadge.tsx
    feedback/
      ToastProvider.tsx
      ConfirmDialog.tsx
      Alert.tsx
      Banner.tsx
      InlineNotice.tsx
      Progress.tsx
    navigation/
      Breadcrumbs.tsx
      NavList.tsx
      SideNav.tsx
      MobileNav.tsx
      CommandMenu.tsx
    charts/
      ChartFrame.tsx
      Legend.tsx
      EmptyChartState.tsx
    hooks/
      useDisclosure.ts
      useControllableState.ts
      useMediaQuery.ts
      useDebouncedValue.ts
    utils/
      formatCurrency.ts
      formatDate.ts
      ids.ts
      a11y.ts
    testing/
      renderWithProviders.tsx
      fixtures.ts
    docs/
      design-system-component-organization-plan.md
      component-api-guidelines.md
      dashboard-admin-cleanup-todo.md
      migration-checklist.md
```

## Export Strategy

Use stable public exports and avoid deep imports into internal files.

The implemented migration now exposes grouped public entry points:

```text
@repo/uix/react
@repo/uix/react/primitives
@repo/uix/react/layout
@repo/uix/react/feedback
@repo/uix/react/data-table
@repo/uix/react/forms
@repo/uix/react/storefront
@repo/uix/solid
@repo/uix/solid/storefront
@repo/uix/commerce
@repo/uix/tokens
@repo/uix/styles
```

Legacy `@repo/uix/components/*` paths remain as compatibility exports during migration.

```ts
export * from "./primitives";
export * from "./forms";
export * from "./layout";
export * from "./data-display";
export * from "./commerce";
export * from "./feedback";
export * from "./navigation";
export * from "./tokens";
export * from "./styles";
```

Recommended package exports:

```json
{
  ".": "./src/index.ts",
  "./tokens": "./src/tokens/index.ts",
  "./styles": "./src/styles/index.ts",
  "./primitives": "./src/primitives/index.ts",
  "./forms": "./src/forms/index.ts",
  "./layout": "./src/layout/index.ts",
  "./data-display": "./src/data-display/index.ts",
  "./commerce": "./src/commerce/index.ts",
  "./feedback": "./src/feedback/index.ts",
  "./navigation": "./src/navigation/index.ts",
  "./testing": "./src/testing/index.ts"
}
```

Keep compatibility exports for old paths during migration, then remove them after all apps are moved.

## Component Grouping Rules

### Primitives

Small generic building blocks with no business meaning:

- Button
- IconButton
- Input
- Textarea
- Select
- Checkbox
- Radio
- Switch
- Badge
- Tooltip
- Dialog
- Drawer
- Tabs
- Skeleton
- Spinner

### Layout

Reusable page and dashboard structure:

- AppShell
- DashboardShell
- Sidebar
- Topbar
- PageShell
- PageHeader
- Toolbar
- SectionHeader
- EmptyState
- ErrorState
- LoadingState

### Forms

Reusable form field patterns:

- Field
- FieldLabel
- FieldError
- FormSection
- FormActions
- SearchInput
- MoneyInput
- DateInput
- MediaUploadField
- RichTextField
- Formik wrappers

### Data Display

Reusable operational dashboard display:

- DataTable
- Pagination
- RowActions
- BulkActions
- StatCard
- MetricGrid
- DescriptionList
- Timeline
- StatusPill

### Commerce

Reusable ecommerce UI that can appear in themes and dashboards:

- ProductCard
- ProductImage
- Price
- QuantityStepper
- CartLineItem
- CheckoutSummary
- OrderStatusBadge
- PaymentMethodBadge
- ShippingStatusBadge

### Feedback

Reusable user feedback patterns:

- ToastProvider
- ConfirmDialog
- Alert
- Banner
- InlineNotice
- Progress

### Navigation

Reusable navigation patterns:

- Breadcrumbs
- NavList
- SideNav
- MobileNav
- CommandMenu

## App Adoption Rules

### Hack/System Dashboard

- Use shared dashboard shell, sidebar primitives, page headers, tables, status badges, forms, modals, and feedback states.
- Keep tenant-management, feature-access, billing, domains, and system-console workflows inside the Hack app.
- Shared package should not know Hack permissions or route names except through generic navigation item shapes.

### Store Admin Dashboard

- Use shared dashboard shell, data tables, filters, forms, modals, payment badges, shipping badges, and empty/error states.
- Keep store-specific data mapping and GraphQL calls inside Store admin.
- Store admin can contribute mature ecommerce UI back to `commerce/`.

### Warehouse Dashboards

- Use shared app shell, tables, filters, status badges, form controls, confirmation dialogs, and timeline/activity components.
- Keep warehouse-specific workflows and inventory domain logic inside warehouse apps.

### Store Themes

- Use shared commerce primitives only where they do not force a dashboard visual language.
- Product image, price, quantity stepper, cart line item, checkout summary, and status badges can be shared.
- Theme-specific hero sections, headers, footers, and merchandising layouts remain local unless a pattern repeats across multiple themes.

### Payment Hub

- Use shared form fields, error states, payment method badges, checkout summary, loading states, and security notices.
- Payment API logic remains in Payment Hub or generated GraphQL actions.

### Controller Runtime

- Use shared loading, error, empty, and runtime shell states.
- Keep tenant resolution and dynamic theme loading local to the controller app.

## Phase Plan

### Phase 0: Inventory And Boundaries

- [x] List all app-local components by app and feature area.
- [x] Mark each component as `shared`, `app-owned`, `theme-owned`, or `delete`.
- [x] Identify duplicate components across Hack, Store admin, Warehouse, and themes.
- [x] Identify components that mix UI with API/business logic and split them before migration.
- [x] Create a design-system ownership rule in docs.

### Phase 1: Package Foundation

- [x] Create stable folders under `web/packages/uix/src`.
- [x] Add barrel exports for each group.
- [x] Add `cn` or `classNames` helper.
- [x] Add shared variant helper for buttons, badges, inputs, alerts, and status pills.
- [x] Add package-level typecheck script.
- [x] Keep old exports working during migration.

### Phase 2: Tokens And Visual Language

- [x] Add semantic design tokens for color, radius, spacing, typography, shadow, motion, and z-index.
- [x] Create dashboard token presets.
- [x] Create storefront token presets.
- [x] Define status colors for success, warning, danger, info, neutral, paid, unpaid, shipped, delivered, cancelled, and pending.
- [x] Document when apps can override tokens.

### Phase 3: Core Primitives

- [x] Build Button.
- [x] Build IconButton with lucide icon support.
- [x] Build Input.
- [x] Build Textarea.
- [x] Build Select.
- [x] Build Checkbox.
- [x] Build Radio.
- [x] Build Switch.
- [x] Build Badge.
- [x] Build Tooltip.
- [x] Build Dialog.
- [x] Build Drawer.
- [x] Build Tabs.
- [x] Build Skeleton and Spinner.
- Future test suite: add unit tests for variants, disabled states, keyboard behavior, and accessibility labels.

### Phase 4: Layout And Feedback

- [x] Build PageShell.
- [x] Build DashboardShell.
- [x] Build PageHeader.
- [x] Build SectionHeader.
- [x] Build Toolbar.
- [x] Build EmptyState.
- [x] Build ErrorState.
- [x] Build LoadingState.
- [x] Build ConfirmDialog.
- [x] Build Alert and InlineNotice.
- [x] Add responsive tests or visual checks for narrow and desktop layouts.

### Phase 5: Forms

- [x] Normalize Field, FieldLabel, FieldError, FormSection, and FormActions.
- [x] Migrate existing Formik wrappers into `forms/Formik`.
- [x] Add MoneyInput for payments, orders, and product prices.
- [x] Add DateInput and DateRangeInput.
- [x] Add SearchInput with debounce support.
- [x] Add MediaUploadField shell without hardcoded app API.
- [x] Add validation and error-display examples.

### Phase 6: Data Tables And Operational UI

- [x] Normalize DataTable.
- [x] Normalize Pagination.
- [x] Normalize BulkActions.
- [x] Normalize RowActions.
- [x] Add table loading, empty, error, and selection states.
- [x] Add column helper utilities.
- [x] Add StatusPill and MetricCard.
- [x] Migrate one Hack table and one Store admin table as proof.

### Phase 7: Commerce Components

- [x] Build ProductImage with no fake fallback data.
- [x] Build Price.
- [x] Build ProductCard.
- [x] Build QuantityStepper.
- [x] Build CartLineItem.
- [x] Build CheckoutSummary.
- [x] Build OrderStatusBadge.
- [x] Build PaymentMethodBadge.
- [x] Build ShippingStatusBadge.
- [x] Migrate one theme and one dashboard workflow to prove compatibility.

### Phase 8: App Migration

- [x] Migrate Hack/System shared UI first.
- [x] Migrate Store admin dashboard second.
- [x] Migrate Warehouse dashboards third.
- Future app rollout: migrate Payment Hub after the dashboard and storefront package surfaces settle.
- Future app rollout: migrate Controller runtime states after shared runtime-shell state requirements are confirmed.
- [x] Migrate storefront themes selectively.
- [x] Remove duplicate local components only after each app passes tests.

### Phase 9: Testing Strategy

- Future test suite: add unit tests for primitives.
- Future test suite: add interaction tests for dialogs, drawers, tabs, menus, and tables.
- Future test suite: add accessibility checks for keyboard navigation and ARIA.
- Future test suite: add type tests for public component APIs.
- Future test suite: add visual smoke pages or story routes for component QA.
- Future test suite: add E2E checks for at least one dashboard and one storefront using shared components.

### Phase 10: Documentation And Governance

- [x] Add component API guidelines.
- [x] Add migration checklist.
- [x] Add examples for dashboard pages, data tables, forms, commerce cards, and modals.
- [x] Add store-admin cleanup backlog.
- [x] Add contribution rules: when to add to `@repo/uix` and when to keep local.
- [x] Add deprecation policy for old component paths.
- [x] Add release checklist for breaking UI changes.

## Migration Checklist Per Component

- Component has no app-specific API calls.
- Component has clear props and typed events.
- Component supports loading, empty, disabled, and error states where relevant.
- Component supports keyboard usage.
- Component uses shared tokens and variants.
- Component does not import from apps.
- Component is exported from the correct barrel file.
- At least one app imports it successfully.
- Duplicate app-local version is removed after migration.
- Tests or manual QA notes are added.

## Suggested First Implementation Batch

Start with low-risk high-duplication components:

- `Button`
- `IconButton`
- `Badge`
- `Input`
- `Textarea`
- `Field`
- `PageHeader`
- `EmptyState`
- `ErrorState`
- `LoadingState`
- `ConfirmDialog`
- `StatusPill`

Then migrate shared table and commerce components.

## Success Criteria

- New dashboard pages can be built mostly from `@repo/uix`.
- Storefront themes can reuse commerce primitives without losing brand flexibility.
- Duplicate modal, loader, error, badge, table, and form code is removed from apps.
- UI behavior is consistent across Hack/System, Store admin, Warehouse, Payment Hub, and themes.
- Components are documented enough that a new developer can choose the right component without reading every app.
- Package typecheck passes.
- Migrated apps typecheck and key E2E flows still pass.

## Non Goals

- Do not redesign every app in one pass.
- Do not force all storefront themes to look identical.
- Do not move business workflows into `@repo/uix`.
- Do not couple shared UI to GraphQL operations.
- Do not delete local components until their replacements are adopted and verified.
