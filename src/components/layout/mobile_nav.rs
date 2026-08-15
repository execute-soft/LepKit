use crate::components::ui::icons::link_icon;
use crate::components::ui::link::NavLink;
use crate::config::constants::HEADER_LINKS;
use crate::hooks::use_click_outside::use_click_outside;
use crate::utils::route::route_is_active;
use leptos::prelude::*;
use leptos_router::hooks::use_location;

#[component]
pub fn MobileNav(
    is_open: RwSignal<bool>,
    button_ref: NodeRef<leptos::html::Button>,
) -> impl IntoView {
    let nav_ref: NodeRef<leptos::html::Div> = NodeRef::new();
    let pathname = use_location().pathname;

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
                                        view! {
                                            <li>
                                                <NavLink
                                                    href=href
                                                    active=move || route_is_active(&pathname.get(), href)
                                                    on_click=Callback::new(move |_: ()| is_open.set(false))
                                                    class="relative flex w-full cursor-pointer items-center gap-3 rounded-sm px-2 py-1.5 text-xs transition-colors capitalize sm:gap-4 sm:text-sm"
                                                    active_class="text-primary bg-primary/10"
                                                    inactive_class="text-foreground hover:bg-foreground/30"
                                                >
                                                    {link_icon(icon_key, "size-3.5")}
                                                    <span>{label}</span>
                                                </NavLink>
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