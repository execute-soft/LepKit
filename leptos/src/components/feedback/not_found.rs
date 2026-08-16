use crate::components::ui::icons::icon_arrow_left;
use crate::components::ui::link::NavLink;
use leptos::prelude::*;

/// The 404 "not found" page, used as the router fallback. Matches the app's
/// visual language and links back to the home page.
#[component]
pub fn NotFound() -> impl IntoView {
    view! {
        <div class="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
            <p class="bg-linear-to-r from-primary via-violet-600 to-amber-500 bg-clip-text text-7xl font-black tracking-tight text-transparent md:text-9xl">
                "404"
            </p>

            <h1 class="mt-4 text-2xl font-bold text-foreground md:text-3xl">"Page not found"</h1>

            <p class="mt-3 max-w-md text-muted-foreground">
                "The page you're looking for doesn't exist or may have been moved. Check the
                address or head back home."
            </p>

            <div class="mt-8">
                <NavLink
                    href="/"
                    active=Signal::stored(false)
                    class="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-lg transition-all hover:bg-foreground/90"
                >
                    {icon_arrow_left("size-4")}
                    "Back to home"
                </NavLink>
            </div>
        </div>
    }
}