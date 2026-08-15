use crate::app::providers::Providers;
use crate::app::routes::AppRoutes;
use crate::components::layout::footer::Footer;
use crate::components::layout::header::Header;
use crate::components::ui::decorative_blob::{DecorativeBlobBottom, DecorativeBlobTop};
use leptos::prelude::*;
use leptos_router::components::Router;

#[component]
pub fn App() -> impl IntoView {
    view! {
        <Providers>
            <Router>
                <div class="relative flex min-h-screen flex-col bg-background text-foreground">
                    <Header />

                    <DecorativeBlobTop />

                    <main class="relative z-10 flex-1">
                        <AppRoutes />
                    </main>

                    <DecorativeBlobBottom class="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0" />

                    <Footer />
                </div>
            </Router>
        </Providers>
    }
}