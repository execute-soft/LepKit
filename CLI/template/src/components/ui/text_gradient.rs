#![allow(dead_code)]

use crate::utils::class::merge_classes;
use leptos::prelude::*;

/// A paragraph whose text runs through a subtle horizontal foreground gradient.
#[component]
pub fn TextGradient(
    #[prop(into)] text: String,
    #[prop(optional)] class: &'static str,
) -> impl IntoView {
    view! {
        <p
            class=merge_classes(&[
                "bg-linear-to-r from-foreground/35 via-foreground/90 to-foreground/35 bg-clip-text text-transparent",
                class,
            ])
        >
            {text}
        </p>
    }
}