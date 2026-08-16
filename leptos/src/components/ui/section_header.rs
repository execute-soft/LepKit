#![allow(dead_code)]

use crate::components::ui::heading::Heading;
use crate::utils::class::merge_classes;
use leptos::prelude::*;

/// A section header composed of an optional small tag, a gradient title and
/// an optional subtitle.
#[component]
pub fn SectionHeader(
    title: &'static str,
    #[prop(optional)] class: &'static str,
    #[prop(optional)] tag: &'static str,
    #[prop(optional)] subtitle: &'static str,
) -> impl IntoView {
    view! {
        <div class=merge_classes(&["mx-auto max-w-2xl text-center", class])>
            {(!tag.is_empty()).then(|| {
                view! {
                    <p class="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">{tag}</p>
                }
            })}
            <Heading text=title.to_string() size="md" />
            {(!subtitle.is_empty()).then(|| {
                view! {
                    <p class="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {subtitle}
                    </p>
                }
            })}
        </div>
    }
}