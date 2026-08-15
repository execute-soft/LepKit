use crate::app::providers::Providers;
use crate::app::routes::AppRoutes;
use crate::components::layout::footer::Footer;
use crate::components::layout::header::Header;
use crate::components::ui::page_background::PageBackground;
use leptos::prelude::*;
use leptos_router::components::Router;

#[component]
pub fn App() -> impl IntoView {
    view! {
        <Providers>
            <Router>
                <div class="relative flex min-h-screen flex-col bg-background text-foreground">
                    <PageBackground />

                    <Header />

                    <main class="relative z-10 flex-1">
                        <AppRoutes />
                    </main>

                    <Footer />
                </div>
            </Router>
        </Providers>
    }
}