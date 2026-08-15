use crate::components::ui::icons::{icon_arrow_right, icon_box};
use leptos::prelude::*;
use leptos_router::hooks::use_navigate;

#[component]
pub fn HeroButtons() -> impl IntoView {
    let navigate = use_navigate();
    let go_dashboard = {
        let navigate = navigate.clone();
        move |ev: leptos::ev::MouseEvent| {
            ev.prevent_default();
            navigate("/dashboard", Default::default());
        }
    };
    let go_dashboard_alt = go_dashboard.clone();

    view! {
        <div class="flex flex-col items-center gap-4">
            <div class="flex flex-col items-center gap-3 sm:flex-row">
                <a
                    href="/dashboard"
                    on:click=go_dashboard
                    class="group inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-lg transition-all hover:bg-foreground/90 hover:shadow-primary/20"
                >
                    "Get Started"
                    <span class="transition-transform group-hover:translate-x-0.5">
                        {icon_arrow_right("size-4")}
                    </span>
                </a>
                <a
                    href="/dashboard"
                    on:click=go_dashboard_alt
                    class="inline-flex items-center gap-2 rounded-lg border border-border bg-background/60 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-primary/50"
                >
                    {icon_box("size-4")}
                    "View Dashboard"
                </a>
            </div>
        </div>
    }
}