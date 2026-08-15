use crate::components::ui::decorative_blob::BlobSvg;
use leptos::prelude::*;

const BAND: &str =
    "absolute left-1/2 -translate-x-1/2 w-full max-w-[500px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px]";

/// Full-page background color effect.
///
/// Renders the learnsquads decorative blob bands (theme-aware `--blob1/2/3`
/// ellipses) down the whole page from top to bottom, including a band behind
/// the footer so the effect shows through its translucent background.
#[component]
pub fn PageBackground() -> impl IntoView {
    view! {
        <div
            class="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            aria-hidden="true"
        >
            <BlobSvg class=format!("{BAND} top-0") />
            <BlobSvg class=format!("{BAND} top-1/3 rotate-180") />
            <BlobSvg class=format!("{BAND} top-2/3") />
            <BlobSvg class=format!("{BAND} bottom-0 rotate-180") />
        </div>
    }
}