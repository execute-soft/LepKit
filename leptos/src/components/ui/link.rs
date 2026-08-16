use crate::utils::class::merge_classes;
use leptos::prelude::*;
use leptos_router::hooks::use_navigate;

/// A client-side navigation link rendered as an `<a>`.
///
/// Prevents the default full-page navigation and routes through the SPA
/// router instead. Applies `active_class` when `active` is `true` (reactive),
/// otherwise `inactive_class`; when `on_click` is provided it runs after the
/// navigation (e.g. to close a menu).
#[component]
pub fn NavLink(
    href: &'static str,
    children: Children,
    #[prop(into)] active: Signal<bool>,
    #[prop(optional)] class: &'static str,
    #[prop(optional)] active_class: &'static str,
    #[prop(optional)] inactive_class: &'static str,
    #[prop(optional)] on_click: Option<Callback<()>>,
) -> impl IntoView {
    let navigate = use_navigate();
    let class = move || {
        let state_class = if active.get() { active_class } else { inactive_class };
        merge_classes(&[class, state_class])
    };

    view! {
        <a
            href=href
            on:click=move |ev: leptos::ev::MouseEvent| {
                ev.prevent_default();
                navigate(href, Default::default());
                if let Some(on_click) = on_click {
                    on_click.run(());
                }
            }
            class=class
            aria-current=move || if active.get() { Some("page") } else { None }
        >
            {children()}
        </a>
    }
}