use crate::components::ui::decorative_blob::BlobSvg;
use leptos::prelude::*;

const BAND: &str = "absolute left-1/2 -translate-x-1/2 w-full max-w-[500px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px]";

/// Full-page background color effect.
///
/// Renders a theme-aware color layer anchored to the whole page (top to
/// bottom of the document, scrolls with content):
/// - a primary-tinted gradient fading from `primary/6` at the top edge and at
///   the bottom edge (matching the home hero section), with blurred primary
///   glows at the top and bottom center;
/// - the learnsquads decorative blob bands (`--blob1/2/3` ellipses) spread
///   down the full page.
///
/// The layer sits at `z-0`, behind the header, main content (`z-10`) and the
/// footer (raised above the background), so the effect shows through the
/// footer's translucent background.
#[component]
pub fn PageBackground() -> impl IntoView {
    view! {
        <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
            <div class="absolute inset-x-0 top-0 h-80 bg-linear-to-b from-primary/6 to-transparent"></div>
            <div class="absolute inset-x-0 bottom-0 h-80 bg-linear-to-t from-primary/6 to-transparent"></div>
            <div class="pointer-events-none absolute inset-0 overflow-hidden">
                <div class="absolute -top-32 left-1/2 h-80 w-2xl -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"></div>
                <div class="absolute -bottom-32 left-1/2 h-80 w-2xl -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"></div>
            </div>
            <BlobSvg class=format!("{BAND} top-0") />
            <BlobSvg class=format!("{BAND} top-1/3 rotate-180") />
            <BlobSvg class=format!("{BAND} top-2/3") />
            <BlobSvg class=format!("{BAND} bottom-0 rotate-180") />
        </div>
    }
}
