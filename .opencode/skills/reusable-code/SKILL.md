---
name: reusable-code
description: Always reuse existing code and extract reusable abstractions. Use when writing or editing Rust/Leptos code in this repo, when adding a new hook, component, utility, or service, or when reviewing code for duplication. This project requires that all code be reusable and that existing shared code is reused instead of duplicated.
---

# Reusable Code

This project has a hard rule: **always reuse existing code, and make any
non-trivial logic reusable so it can be shared across the app.** Before
writing anything new, search the codebase for an existing hook, component,
utility, service, or type that already does the job.

## Where shared code lives

| Concern                    | Location                          | Examples                                      |
| -------------------------- | --------------------------------- | --------------------------------------------- |
| Leptos hooks (`use_*`)     | `src/hooks/`                      | `use_click_outside`, `use_debounce`, `use_auth`, `use_pagination`, `use_permissions` |
| Business logic / state     | `src/core/`                       | `theme` (`state`, `apply`), `storage` (`storage`, `signal`, `local_storage`, `session_storage`), `api`, `auth`, `error`, `router` |
| Reusable UI components     | `src/components/ui/`              | `button`, `input`, `modal`, `select`, `badge`, `table`, `spinner`, `pagination`, `logo`, `icons`, `section`, `page_background` |
| Layout components          | `src/components/layout/`          | `header`, `footer`, `header_actions`, `mobile_nav` |
| Pure utilities             | `src/utils/`                      | `color` (`hex_to_rgb`, `hex_to_rgb_tuple`, `adjust_lightness`) |
| API / network layer        | `src/services/`                   | `websocket`, `notifications`, `telemetry_stream` |
| App-wide constants         | `src/config/`                     | `constants`, `themes` |
| Shared types               | `src/types/`                      | domain types used across features |

## Rules

1. **Search before you write.** Use grep/glob for an existing hook, component,
   utility, or service that matches the need. Reuse it, don't re-implement it.
2. **Extract on second use.** When the same logic or UI appears in two places
   (or you know it will be used again), extract it into the appropriate shared
   module and reuse it from both call sites.
3. **Place things where they belong.** Hooks in `src/hooks/`, reusable UI in
   `src/components/ui/`, business state in `src/core/`, pure functions in
   `src/utils/`, I/O in `src/services/`. Register new modules in the parent
   `mod.rs`.
4. **Make new components/hooks generic.** Components take props instead of
   hardcoding copy; hooks accept signals/closures so they work for any caller.
   Prefer `RwSignal`/`ReadSignal` generics (`GetUntracked<Value = bool>`) over
   a single concrete signal type.
5. **Follow existing conventions.** Match the style of the closest existing
   file: `#[component]` fn for components, `use_` prefix for hooks, tuple-form
   `class=(["bg-primary/10"], move || cond)` for Tailwind classes containing
   `/`, `#![allow(dead_code)]` on modules with intentionally-unused exports.
6. **No duplicated inline logic.** Never copy-paste a handler, a storage
   access, a color computation, or a DOM effect into a second file.
7. **Keep shared code coherent.** When you change a shared piece, update all
   call sites; when you add a capability, prefer extending the shared piece
   over forking it.

## Workflow when adding something new

1. Search `src/hooks`, `src/components/ui`, `src/core`, `src/utils`,
   `src/services` for an existing equivalent.
2. If found: use it (extend it only if the new need is a natural fit).
3. If not found: create it in the correct module with a doc comment, register
   it in `mod.rs`, and use it from the current call site.
4. If it might be needed again soon (e.g. a second dropdown, another
   theme-dependent effect), build it as a reusable abstraction from the start.

## Example: click-outside behavior

The `use_click_outside` hook (`src/hooks/use_click_outside.rs`) already handles
outside-click dismissal for any dropdown. New dropdowns MUST use it instead of
writing their own `window_event_listener` block:

```rust
let panel = NodeRef::<leptos::html::Div>::new();
use_click_outside(
    is_open,
    move |target| panel.get().is_some_and(|el| el.contains(target)),
    move || is_open.set(false),
);
```

## Verification

- After adding a reusable piece, `cargo check --target wasm32-unknown-unknown`
  must pass without warnings.
- Grep the new code's responsibility: if another feature could use it, it
  should be in a shared module, not a feature-local file.