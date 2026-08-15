use crate::components::ui::heading::Heading;
use crate::components::ui::icons::icon_home;
use crate::components::ui::link::NavLink;
use leptos::prelude::*;

/// A full "Coming Soon..." page with a link back to the home page.
#[component]
pub fn ComingSoon() -> impl IntoView {
    view! {
        <div class="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
            <Heading text="Coming Soon...".to_string() size="md" />
            <h2 class="mb-4 mt-2 text-base font-semibold text-foreground">
                "We're working hard to bring something amazing!"
            </h2>
            <NavLink
                href="/"
                active=Signal::stored(false)
                class="mt-4 inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-lg transition-all hover:bg-foreground/90"
            >
                {icon_home("size-4")}
                "Go Back Home"
            </NavLink>
        </div>
    }
}