use crate::components::ui::icons::{icon_alert_circle, icon_refresh_cw};
use leptos::prelude::*;

/// A reusable error state, used both as the global [`ErrorBoundary`] fallback
/// and on individual pages. Renders an icon, a title, an optional message and
/// an optional retry action.
#[component]
pub fn ErrorState(
    #[prop(default = "Something went wrong")] title: &'static str,
    #[prop(optional)] message: Option<String>,
    #[prop(optional)] on_retry: Option<Callback<()>>,
) -> impl IntoView {
    view! {
        <div class="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
            <div class="grid size-16 place-items-center rounded-2xl border border-border bg-background/60 text-primary shadow-lg md:size-20">
                {icon_alert_circle("size-8 md:size-10")}
            </div>

            <h1 class="mt-6 text-xl font-bold text-foreground md:text-2xl">{title}</h1>

            {move || {
                message
                    .as_ref()
                    .filter(|message| !message.is_empty())
                    .map(|message| {
                        view! {
                            <p class="mt-3 max-w-md text-sm text-muted-foreground md:text-base">
                                {message.clone()}
                            </p>
                        }
                            .into_any()
                    })
            }}

            {move || {
                on_retry.map(|on_retry| {
                    view! {
                        <button
                            on:click=move |_| on_retry.run(())
                            class="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-lg transition-all hover:bg-foreground/90"
                        >
                            {icon_refresh_cw("size-4")}
                            "Try again"
                        </button>
                    }
                        .into_any()
                })
            }}
        </div>
    }
}