use crate::components::ui::icons::{icon_arrow_up_right, icon_mail, icon_map_pin, social_icon};
use crate::components::ui::logo::Logo;
use crate::components::ui::section::Section;
use crate::config::constants::{
    ACCOUNT_LINKS, APP_LOCATION, APP_MAIL, APP_NAME, APP_TAGLINE, EXPLORE_LINKS, SOCIAL_LINKS,
};
use leptos::prelude::*;
use leptos_router::hooks::use_navigate;

#[component]
pub fn Footer() -> impl IntoView {
    let year = js_sys::Date::new_0().get_full_year() as i32;
    let navigate = use_navigate();

    view! {
        <Section id="footer" animate=true delay=0.2>
            <footer class="relative z-10 border-t border-border bg-card/10">
                <div class="grid gap-10 px-4 py-12 sm:px-6 lg:px-8 md:grid-cols-2 lg:grid-cols-4">
                    <div class="space-y-4">
                        <Logo size=40 class="justify-start" />
                        <p class="max-w-xs text-sm leading-relaxed text-muted-foreground">
                            "Device management and monitoring built for teams. Configure, simulate and
                            track your devices from one place."
                        </p>
                        <p class="text-xs text-muted-foreground/80">
                            "Remote commands, live telemetry and real-time alerts."
                        </p>
                        <div class="flex items-center gap-2">
                            {SOCIAL_LINKS
                                .iter()
                                .map(|(title, href, icon_key)| {
                                    let title = *title;
                                    let href = *href;
                                    let icon_key = *icon_key;
                                    view! {
                                        <a
                                            href=href
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label=title
                                            class="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                                        >
                                            {social_icon(icon_key, "size-4")}
                                        </a>
                                    }
                                })
                                .collect_view()}
                        </div>
                    </div>

                    <div>
                        <h3 class="mb-4 text-sm font-semibold text-foreground">"Explore"</h3>
                        <ul class="space-y-2.5">
                            {EXPLORE_LINKS
                                .iter()
                                .map(|(label, href)| {
                                    let label = *label;
                                    let href = *href;
                                    let navigate = navigate.clone();
                                    view! {
                                        <li>
                                            <a
                                                href=href
                                                on:click=move |ev| {
                                                    ev.prevent_default();
                                                    navigate(href, Default::default());
                                                }
                                                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                {label}
                                            </a>
                                        </li>
                                    }
                                })
                                .collect_view()}
                        </ul>
                    </div>

                    <div>
                        <h3 class="mb-4 text-sm font-semibold text-foreground">"Account"</h3>
                        <ul class="space-y-2.5">
                            {ACCOUNT_LINKS
                                .iter()
                                .map(|(label, href)| {
                                    let label = *label;
                                    let href = *href;
                                    let navigate = navigate.clone();
                                    view! {
                                        <li>
                                            <a
                                                href=href
                                                on:click=move |ev| {
                                                    ev.prevent_default();
                                                    navigate(href, Default::default());
                                                }
                                                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                {label}
                                            </a>
                                        </li>
                                    }
                                })
                                .collect_view()}
                        </ul>
                    </div>

                    <div class="space-y-4">
                        <h3 class="text-sm font-semibold text-foreground">"Get in touch"</h3>
                        <a
                            href=format!("mailto:{APP_MAIL}")
                            class="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {icon_mail("size-4 shrink-0")}
                            {APP_MAIL}
                        </a>
                        <p class="flex items-center gap-2 text-sm text-muted-foreground">
                            {icon_map_pin("size-4 shrink-0")}
                            {APP_LOCATION}
                        </p>
                        <p class="text-xs text-muted-foreground">
                            {APP_TAGLINE}
                        </p>
                    </div>
                </div>

                <div class="border-t border-border/50 px-4 py-5 sm:px-6 lg:px-8">
                    <div class="flex flex-col items-center justify-between gap-3 sm:flex-row">
                        <p class="text-xs text-muted-foreground">
                            "© " {year} " " {APP_NAME} ". All rights reserved."
                        </p>
                        <button
                            class="inline-flex cursor-pointer items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                            on:click=move |_| {
                                let _ = window().scroll_to_with_x_and_y(0.0, 0.0);
                            }
                        >
                            "Back to top"
                            {icon_arrow_up_right("size-3")}
                        </button>
                    </div>
                </div>
            </footer>
        </Section>
    }
}