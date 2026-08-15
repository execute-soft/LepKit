use crate::components::ui::icons::link_icon;
use crate::config::constants::HEADER_LINKS;
use crate::hooks::use_click_outside::use_click_outside;
use leptos::prelude::*;
use leptos_router::hooks::{use_location, use_navigate};

#[component]
pub fn MobileNav(
    is_open: RwSignal<bool>,
    button_ref: NodeRef<leptos::html::Button>,
) -> impl IntoView {
    let nav_ref: NodeRef<leptos::html::Div> = NodeRef::new();
    let pathname = use_location().pathname;
    let navigate = use_navigate();

    use_click_outside(
        is_open,
        move |target| {
            nav_ref.get().is_some_and(|el| el.contains(target))
                || button_ref.get().is_some_and(|el| el.contains(target))
        },
        move || is_open.set(false),
    );

    view! {
        {move || {
            if is_open.get() {
                view! {
                    <div class="motion-popup md:hidden absolute top-full right-10 z-50 min-w-40 rounded-md bg-background/80 p-1 shadow-feature-card">
                        <div node_ref=nav_ref>
                            <ul class="flex flex-col">
                                {HEADER_LINKS
                                    .iter()
                                    .map(|(href, label, icon_key)| {
                                        let href = *href;
                                        let label = *label;
                                        let icon_key = *icon_key;
                                        let navigate = navigate.clone();
                                        let is_active = move || {
                                            if href == "/" {
                                                pathname.get() == "/"
                                            } else {
                                                pathname.get().starts_with(href)
                                            }
                                        };
                                        view! {
                                            <li>
                                                <a
                                                    href=href
                                                    on:click=move |ev| {
                                                        ev.prevent_default();
                                                        navigate(href, Default::default());
                                                        is_open.set(false);
                                                    }
                                                    class="relative flex w-full cursor-pointer items-center gap-3 rounded-sm px-2 py-1.5 text-xs transition-colors capitalize sm:gap-4 sm:text-sm"
                                                    class:text-primary=move || is_active()
                                                    class=(["bg-primary/10"], move || is_active())
                                                    class:text-foreground=move || !is_active()
                                                    class=(["hover:bg-foreground/30"], move || !is_active())
                                                >
                                                    {link_icon(icon_key, "size-3.5")}
                                                    <span>{label}</span>
                                                </a>
                                            </li>
                                        }
                                    })
                                    .collect_view()}
                            </ul>
                        </div>
                    </div>
                }
                    .into_any()
            } else {
                ().into_any()
            }
        }}
    }
}