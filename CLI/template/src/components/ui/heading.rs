use crate::utils::class::merge_classes;
use leptos::prelude::*;

/// A heading with size variants and a subtle foreground gradient.
///
/// Sizes: `sm`, `md`, `lg`, `xl`, `2xl`.
#[component]
pub fn Heading(
    #[prop(into)] text: String,
    #[prop(default = "lg")] size: &'static str,
    #[prop(optional)] class: &'static str,
) -> impl IntoView {
    let size_class = match size {
        "sm" => "text-lg sm:text-xl md:text-2xl",
        "md" => "text-xl sm:text-2xl md:text-3xl",
        "lg" => "text-2xl sm:text-3xl md:text-5xl",
        "xl" => "text-3xl sm:text-4xl md:text-6xl",
        "2xl" => "text-4xl sm:text-5xl md:text-7xl",
        _ => "text-2xl sm:text-3xl md:text-5xl",
    };

    view! {
        <h1
            class=merge_classes(&[
                "bg-linear-to-b from-foreground via-foreground/90 to-foreground/70 to-90% bg-clip-text text-transparent font-bold leading-tight md:leading-[64px]",
                size_class,
                class,
            ])
        >
            {text}
        </h1>
    }
}