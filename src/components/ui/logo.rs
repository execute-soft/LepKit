use crate::utils::class::merge_classes;
use leptos::prelude::*;

#[component]
pub fn Logo(
    #[prop(default = 30)] size: i32,
    #[prop(optional)] class: &'static str,
) -> impl IntoView {
    view! {
        <div
            class=merge_classes(&[
                "grid shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground font-bold",
                class,
            ])
            style={format!("width: {}px; height: {}px; font-size: {}px", size, size, size / 2)}
        >
            "S"
        </div>
    }
}