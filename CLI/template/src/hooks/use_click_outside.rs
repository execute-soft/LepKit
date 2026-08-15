use leptos::ev;
use leptos::prelude::*;
use wasm_bindgen::JsCast;

/// Registers a window `mousedown` listener that calls `on_close` whenever a
/// click lands outside the element(s) matched by `is_inside`.
///
/// The listener only acts while `is_open` is `true`. Each call site supplies
/// its own containment check (which node refs count as "inside"), so the hook
/// works with any element type — a single dropdown container, or a nav panel
/// plus its toggle button.
///
/// ```rust
/// let panel = NodeRef::<leptos::html::Div>::new();
/// use_click_outside(
///     is_open,
///     move |target| panel.get().is_some_and(|el| el.contains(target)),
///     move || is_open.set(false),
/// );
/// ```
pub fn use_click_outside<S, F, G>(is_open: S, is_inside: F, on_close: G)
where
    S: GetUntracked<Value = bool> + 'static,
    F: Fn(Option<&web_sys::Node>) -> bool + 'static,
    G: Fn() + 'static,
{
    window_event_listener(ev::mousedown, move |ev| {
        if !is_open.get_untracked() {
            return;
        }
        let target = ev.target().and_then(|t| t.dyn_into::<web_sys::Node>().ok());
        if !is_inside(target.as_ref()) {
            on_close();
        }
    });
}