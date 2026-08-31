# UIX Migration Checklist

Use this checklist before moving app-local UI into `@repo/uix`.

- Component has no app-specific API calls, route assumptions, permissions, or domain copy.
- Props and events are typed, stable, and framework-appropriate.
- Loading, empty, disabled, and error states are supported where relevant.
- Keyboard and accessible-label behavior is covered by the component contract.
- Styling uses shared tokens, recipes, variants, and composition slots.
- React and Solid exports stay separate.
- The component is exported from the correct public barrel.
- At least one app consumes the public export successfully.
- Duplicate app-local implementations are removed only after imports are migrated.
- Type-check, targeted build, and visual smoke notes are recorded.

