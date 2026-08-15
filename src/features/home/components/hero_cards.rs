use crate::components::ui::icons::{icon_activity, icon_box, icon_target, icon_terminal};
use leptos::prelude::*;

#[component]
pub fn HeroCards() -> impl IntoView {
    let cards: Vec<(&str, &str, AnyView)> = vec![
        (
            "Device management",
            "Provision, configure and organize every device in your fleet.",
            icon_box("size-5").into_any(),
        ),
        (
            "Real-time telemetry",
            "Live metrics, sensor data and health status from your devices.",
            icon_activity("size-5").into_any(),
        ),
        (
            "Remote commands",
            "Send commands and push configuration updates instantly.",
            icon_terminal("size-5").into_any(),
        ),
        (
            "Smart alerts",
            "Automatic notifications the moment something needs attention.",
            icon_target("size-5").into_any(),
        ),
    ];

    view! {
        <div class="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards
                .into_iter()
                .map(|(title, desc, icon)| {
                    view! {
                        <div class="flex flex-col items-start gap-3 rounded-xl border border-border bg-background/60 p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                            <div class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                {icon}
                            </div>
                            <div>
                                <h3 class="font-semibold text-foreground">{title}</h3>
                                <p class="mt-1 text-sm text-muted-foreground">{desc}</p>
                            </div>
                        </div>
                    }
                })
                .collect_view()}
        </div>
    }
}