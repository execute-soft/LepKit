#![allow(dead_code)]

use leptos::prelude::*;

/// An empty-state placeholder with an optional icon, title, subtitle and
/// description, plus a "content coming soon" status pill.
#[component]
pub fn EmptyState(
    title: &'static str,
    #[prop(optional)] subtitle: &'static str,
    #[prop(optional)] description: &'static str,
    #[prop(optional)] icon: Option<AnyView>,
) -> impl IntoView {
    view! {
        <div class="flex flex-col items-center justify-center px-4 py-16 text-center sm:py-24">
            {icon.map(|icon| {
                view! {
                    <div class="mb-8 grid size-16 place-items-center rounded-2xl border border-border/50 bg-muted/50 p-4 text-muted-foreground">
                        {icon}
                    </div>
                }
            })}
            <h3 class="mb-2 text-2xl font-bold text-foreground sm:text-3xl">{title}</h3>
            {(!subtitle.is_empty()).then(|| {
                view! {
                    <p class="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                        {subtitle}
                    </p>
                }
            })}
            {(!description.is_empty()).then(|| {
                view! {
                    <p class="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {description}
                    </p>
                }
            })}
            <div class="mt-10 flex items-center gap-3 rounded-full border border-border/50 bg-muted/30 px-4 py-2">
                <div class="flex gap-1">
                    <div class="size-2 animate-pulse rounded-full bg-primary/60"></div>
                    <div
                        class="size-2 animate-pulse rounded-full bg-primary/40"
                        style="animation-delay: 0.2s"
                    ></div>
                    <div
                        class="size-2 animate-pulse rounded-full bg-primary/20"
                        style="animation-delay: 0.4s"
                    ></div>
                </div>
                <span class="text-sm font-medium text-muted-foreground">"Content coming soon"</span>
            </div>
        </div>
    }
}