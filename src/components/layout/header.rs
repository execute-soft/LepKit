use crate::components::layout::header_actions::HeaderActions;
use crate::components::layout::mobile_nav::MobileNav;
use crate::components::ui::icons::{icon_menu, icon_x};
use crate::components::ui::logo::Logo;
use crate::config::constants::HEADER_LINKS;
use leptos::ev;
use leptos::prelude::*;
use leptos_router::hooks::{use_location, use_navigate};

#[component]
pub fn Header() -> impl IntoView {
    let is_menu_open = RwSignal::new(false);
    let (is_visible, set_is_visible) = signal(true);
    let last_scroll_y = StoredValue::new_local(0.0);
    let button_ref: NodeRef<leptos::html::Button> = NodeRef::new();

    let pathname = use_location().pathname;
    let navigate = use_navigate();

    let go_home = {
        let navigate = navigate.clone();
        move |ev: ev::MouseEvent| {
            ev.prevent_default();
            navigate("/", Default::default());
        }
    };

    window_event_listener(ev::scroll, move |_| {
        let current = window().scroll_y().unwrap_or(0.0);
        if current > last_scroll_y.get_value() && current > 50.0 && !is_menu_open.get_untracked() {
            set_is_visible.set(false);
        } else {
            set_is_visible.set(true);
        }
        last_scroll_y.set_value(current);
    });

    let is_active = move |href: &'static str| {
        if href == "/" {
            pathname.get() == "/"
        } else {
            pathname.get().starts_with(href)
        }
    };

    view! {
        <div class="motion-top">
            <header
                class={move || {
                    let visible = if is_visible.get() {
                        "translate-y-0 opacity-100"
                    } else {
                        "-translate-y-full opacity-0 pointer-events-none"
                    };
                    format!("fixed inset-x-0 top-4 z-40 mx-auto flex h-15 max-w-5xl items-center justify-between rounded-2xl bg-background/10 px-4 sm:px-8 shadow-xs saturate-100 backdrop-blur-[10px] transition-all duration-300 ease-in-out {visible}")
                }}
            >
                <a
                    href="/"
                    on:click={go_home}
                    class="flex items-center justify-center gap-1 text-foreground font-medium"
                    aria-label="Home"
                >
                    <Logo size=30 />
                </a>

                <div class="flex items-center gap-2">
                    <nav class="hidden md:block">
                        <ul class="flex gap-1">
                            {HEADER_LINKS
                                .iter()
                                .map(|(href, label, _)| {
                                    let href = *href;
                                    let label = *label;
                                    let navigate = navigate.clone();
                                    view! {
                                        <li class="relative flex items-center justify-center">
                                            <a
                                                href=href
                                                on:click=move |ev| {
                                                    ev.prevent_default();
                                                    navigate(href, Default::default());
                                                }
                                                class={move || {
                                                    format!(
                                                        "rounded-sm px-3 py-2 text-sm font-medium transition-colors capitalize {}",
                                                        if is_active(href) {
                                                            "text-foreground"
                                                        } else {
                                                            "text-muted-foreground hover:text-foreground"
                                                        },
                                                    )
                                                }}
                                            >
                                                {label}
                                            </a>
                                        </li>
                                    }
                                })
                                .collect_view()}
                        </ul>
                    </nav>

                    <HeaderActions />

                    <button
                        node_ref=button_ref
                        on:click=move |_| is_menu_open.update(|v| *v = !*v)
                        class="text-foreground cursor-pointer shrink-0 gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 has-[>svg]:px-3 flex size-9 items-center justify-center p-0 md:hidden"
                        aria-label="Toggle menu"
                        aria-expanded=is_menu_open
                    >
                        {move || {
                            if is_menu_open.get() {
                                icon_x("size-4").into_any()
                            } else {
                                icon_menu("size-4").into_any()
                            }
                        }}
                    </button>
                </div>

                <MobileNav is_open=is_menu_open button_ref=button_ref />
            </header>

            <div class="pt-20" id="skip-nav"></div>
        </div>
    }
}