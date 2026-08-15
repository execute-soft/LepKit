use crate::components::ui::icons::{
    icon_check_circle, icon_clock, icon_download, icon_rocket, icon_shield_check,
};
use leptos::prelude::*;

#[component]
pub fn TrustItems() -> impl IntoView {
    let items: Vec<(&str, AnyView)> = vec![
        ("Secure by design", icon_shield_check("size-4").into_any()),
        ("Real-time monitoring", icon_clock("size-4").into_any()),
        ("Scale with ease", icon_rocket("size-4").into_any()),
        ("Instant alerts", icon_download("size-4").into_any()),
        ("API-first", icon_check_circle("size-4").into_any()),
    ];

    view! {
        <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            {items
                .into_iter()
                .map(|(label, icon)| {
                    view! {
                        <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span class="text-primary">{icon}</span>
                            <span>{label}</span>
                        </div>
                    }
                })
                .collect_view()}
        </div>
    }
}