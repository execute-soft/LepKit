#![allow(dead_code)]

use crate::utils::class::merge_classes;
use leptos::prelude::*;

/// A small pill badge with a pulsing status dot, used for hero callouts.
#[component]
pub fn Badge(
    text: &'static str,
    #[prop(optional)] class: &'static str,
) -> impl IntoView {
    view! {
        <div class=merge_classes(&["relative mx-auto mb-6 w-fit", class])>
            <div class="absolute inset-0 rounded-full bg-primary/20 blur-sm"></div>
            <div class="relative flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-xs text-muted-foreground sm:text-sm">
                <span class="relative flex size-2">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span class="relative inline-flex size-2 rounded-full bg-primary"></span>
                </span>
                {text}
            </div>
        </div>
    }
}