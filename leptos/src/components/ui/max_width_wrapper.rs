#![allow(dead_code)]

use crate::utils::class::merge_classes;
use leptos::prelude::*;

/// A full-width wrapper that centers content on a `max-w-7xl` container with
/// consistent horizontal padding.
#[component]
pub fn MaxWidthWrapper(
    children: Children,
    #[prop(optional)] class: &'static str,
) -> impl IntoView {
    view! {
        <div class=merge_classes(&["mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", class])>
            {children()}
        </div>
    }
}