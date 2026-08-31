# AGENTS.md

## Scope

These rules apply to everything inside this repository's `web/` directory.
The root `AGENTS.md` also applies.

## Styling Rules

1. Use Tailwind CSS utility classes for frontend styling by default.
2. Keep all frontend screens simple, clean, and focused. Remove duplicate
   explanatory sections, noisy status copy, and redundant summary chips when
   the same context is already visible elsewhere.
3. Reuse existing components from `packages/uix` before creating app-local UI
   primitives or one-off controls.
4. Do not create custom CSS selectors or component-specific CSS files when Tailwind utilities can express the layout, spacing, typography, color, responsive behavior, or state styling.
5. Keep `index.css` and global styles minimal. Prefer only Tailwind imports, source declarations, tokens, or truly global browser/base rules.
6. Use custom CSS only when strictly needed, such as unsupported browser primitives, third-party widget overrides, complex keyframes, or behavior that Tailwind cannot express cleanly.
7. When custom CSS is necessary, keep it small, scoped, documented by naming, and colocated with the app-level stylesheet or established styling location.
8. Prefer reusable component/class constants for repeated Tailwind utility groups instead of introducing CSS classes.
9. Use GSAP for deliberate theme/page animations. Keep animation timelines in component logic, preserve reduced-motion fallbacks, and avoid CSS keyframes unless GSAP is the wrong tool for the specific effect.
10. For themes and storefronts, define design-system tokens and component recipes in a central styling module before spreading utility classes through components. Size, color, spacing, radius, and common component patterns must be changeable from that design-system layer.

## Dummy Data Rules

Always follow these rules when creating or updating dummy, mock, seed, fixture, or preview data:

1. Store all dummy datasets in `src/data`.
2. Prefer `.json` files for static dummy datasets.
3. Do not keep large inline mock arrays inside page components, UI components, or `lib` files.
4. Keep `src/lib/*` files as adapters, transformers, helpers, or typed access layers over data files, not as the primary storage location for mock records.
5. If UI needs derived fields for presentation, keep the raw dataset in `src/data/*.json` and derive the extra fields in a small `src/lib/*` adapter.
6. Keep dummy data shapes close to API response shapes or database-backed domain shapes so real API integration is straightforward.
7. Use stable IDs in dummy data. Avoid random values in static datasets.
8. Use consistent field naming. If backend fields are snake_case, keep the dummy source in snake_case unless there is a clear frontend adapter layer converting it.
9. When a dataset is shared across multiple components, centralize it in one file under `src/data` instead of duplicating it.
10. Keep UI-only labels, badges, and computed display values out of the raw JSON data whenever possible.
11. If a dataset grows beyond trivial size, create a matching type in `src/lib` or nearby typed module and cast/transform the JSON through that type.
12. For products, brands, orders, customers, and similar catalog/dashboard entities, the preferred pattern is:
    - raw dummy rows in `src/data/*.json`
    - typed adapter and derived helpers in `src/lib/*.ts`
    - UI components consume the typed adapter output

## File Placement Examples

- Good:
  - `src/data/catalog-products.json`
  - `src/data/catalog-brands.json`
  - `src/lib/catalog-products.ts`
  - `src/lib/catalog-brands.ts`

- Bad:
  - large mock arrays inside `src/pages/...`
  - large mock arrays inside `src/components/...`
  - raw seed data hardcoded in `src/lib/...` when it can live in `src/data/*.json`

## Naming Rules

1. Use kebab-case file names for dummy data files.
2. Prefer domain-focused names such as `catalog-products.json`, `catalog-brands.json`, `orders.json`, `customers.json`.
3. Use `.json` for static raw datasets.
4. Use `.ts` only when the dataset requires runtime generation, computed values, or non-serializable values.
5. If a file contains raw seed records intended to be adapted by `src/lib`, prefer names like:
   - `catalog-products.json`
   - `catalog-brands.json`
   - `category-tree.json`
6. If a file is specifically a fixture for tests or stories, use a suffix that makes that intent clear, such as:
   - `products.fixture.json`
   - `brands.mock.json`
7. Do not mix unrelated domains into one dummy data file.

## Maintenance Rules

1. When moving existing inline mock data, preserve current behavior.
2. Keep adapters backward-compatible unless the consuming UI is updated in the same change.
3. After changing dummy data structure, run type-check for the affected app.
