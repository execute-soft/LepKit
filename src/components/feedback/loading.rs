#![allow(dead_code)]

use crate::utils::class::merge_classes;
use leptos::prelude::*;

/// A branded loading indicator: a rotating ring with a fading checkmark and
/// an optional label. Set `full_screen` to fill the viewport.
#[component]
pub fn Loading(
    #[prop(default = "Loading")] label: &'static str,
    #[prop(default = false)] full_screen: bool,
    #[prop(optional)] class: &'static str,
) -> impl IntoView {
    let loader = view! {
        <div
            role="status"
            aria-live="polite"
            class=merge_classes(&["flex flex-col items-center justify-center gap-4 text-foreground", class])
        >
            <div class="relative size-16 sm:size-20">
                <svg
                    class="size-full animate-spin"
                    style="animation-duration: 1.1s"
                    viewBox="0 0 120 120"
                    fill="none"
                    aria-hidden="true"
                >
                    <circle
                        cx="60"
                        cy="60"
                        r="42"
                        stroke="currentColor"
                        stroke-width="8"
                        class="text-border"
                    ></circle>
                    <circle
                        cx="60"
                        cy="60"
                        r="42"
                        stroke="currentColor"
                        stroke-width="8"
                        stroke-linecap="round"
                        stroke-dasharray="88 176"
                        class="text-primary"
                    ></circle>
                </svg>
                <svg
                    class="absolute inset-0 size-full animate-pulse"
                    viewBox="0 0 120 120"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M43 62L55 74L79 46"
                        stroke="currentColor"
                        stroke-width="7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="text-foreground"
                    ></path>
                </svg>
            </div>
            <span class="text-sm font-medium tracking-wide text-muted-foreground">{label}</span>
        </div>
    };

    if full_screen {
        view! {
            <div class="flex min-h-svh items-center justify-center bg-background px-6">{loader}</div>
        }
        .into_any()
    } else {
        loader.into_any()
    }
}