# UIX Component API Guidelines

## Source Of Truth

`web/packages/uix` is the source of truth for reusable UI/UX design. Shared tokens, recipes, variants, primitive APIs, layouts, feedback states, forms, data display, storefront helpers, and shared interaction behavior belong here before they are used across apps.

## API Rules

- Prefer stable public imports such as `@repo/uix/react/primitives`, `@repo/uix/react/layout`, `@repo/uix/react/feedback`, `@repo/uix/react/data-table`, `@repo/uix/react/forms`, `@repo/uix/react/storefront`, `@repo/uix/solid`, and `@repo/uix/commerce`.
- Keep app APIs, GraphQL calls, route composition, permissions, and domain copy outside UIX.
- Use typed props with conservative defaults.
- Keep visual variants explicit and finite.
- Use composition slots or child content for app-specific copy and actions.
- Preserve accessibility attributes for interactive components.
- Keep React and Solid component surfaces separated.
- Put framework-neutral helpers in `commerce`, `styles`, `tokens`, or `utils`.

## Compatibility

Temporary app-local compatibility wrappers may re-export UIX components while imports are migrated. Remove those wrappers only after no app code imports them.

