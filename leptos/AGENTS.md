# Project Instructions

## Always use reusable code

- **Reuse existing code.** Before writing anything new, search `src/hooks/`,
  `src/components/ui/`, `src/core/`, `src/utils/`, `src/services/`,
  `src/config/`, and `src/types/` for an existing hook, component, utility, or
  service that already does the job.
- **Make code reusable.** Any non-trivial logic that may be used in more than
  one place must be extracted into the correct shared module and reused, never
  duplicated inline.
- **Follow the `reusable-code` skill** (`.opencode/skills/reusable-code/SKILL.md`)
  for the shared-code map, extraction rules, and conventions.
- When in doubt, run the `reusable-code` agent to audit for duplication.

## Verify

Run `cargo check --target wasm32-unknown-unknown` (no warnings) and `trunk build`
after changes.