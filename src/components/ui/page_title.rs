#![allow(dead_code)]

use crate::components::ui::heading::Heading;
use leptos::prelude::*;

/// A centered page title with a subtitle, for top-level pages.
#[component]
pub fn PageTitle(
    title: &'static str,
    subtitle: &'static str,
) -> impl IntoView {
    view! {
        <div class="mb-8 text-center sm:mb-12">
            <Heading text=title.to_string() size="md" />
            <p class="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
                {subtitle}
            </p>
        </div>
    }
}