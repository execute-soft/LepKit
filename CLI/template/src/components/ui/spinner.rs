#![allow(dead_code)]

use leptos::prelude::*;

/// A small animated spinner used for loading indicators.
#[component]
pub fn Spinner(
    #[prop(default = 24)] size: i32,
    #[prop(optional)] class: &'static str,
) -> impl IntoView {
    view! {
        <svg
            class=format!("animate-spin {class}")
            style=format!("width:{}px;height:{}px", size, size)
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
                class="opacity-20"
            ></circle>
            <path
                fill="currentColor"
                class="opacity-90"
                d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    }
}