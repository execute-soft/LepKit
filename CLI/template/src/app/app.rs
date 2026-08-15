use crate::app::providers::Providers;
use crate::app::routes::AppRoutes;
use crate::components::feedback::error_state::ErrorState;
use crate::components::layout::footer::Footer;
use crate::components::layout::header::Header;
use crate::components::ui::loading_bar::GlobalLoadingBar;
use crate::components::ui::page_background::PageBackground;
use leptos::prelude::*;
use leptos_router::components::Router;

#[component]
pub fn App() -> impl IntoView {
    view! {
        <Providers>
            <Router>
                <div class="relative flex min-h-screen flex-col bg-background text-foreground">
                    <GlobalLoadingBar />
                    <PageBackground />

                    <Header />

                    <main class="relative z-10 flex-1">
                        <ErrorBoundary
                            fallback=|errors| {
                                let message = errors.with(|errors| {
                                    errors.iter().next().map(|(_, error)| error.to_string())
                                });
                                let retry = Callback::new(move |_| {
                                    let keys: Vec<_> = errors.with(|errors| {
                                        errors.iter().map(|(id, _)| id.clone()).collect()
                                    });
                                    for key in keys {
                                        errors.update(|errors| {
                                            errors.remove(&key);
                                        });
                                    }
                                });
                                view! {
                                    <ErrorState
                                        title="Something went wrong"
                                        message=message.unwrap_or_default()
                                        on_retry=retry
                                    />
                                }
                            }
                        >
                            <AppRoutes />
                        </ErrorBoundary>
                    </main>

                    <Footer />
                </div>
            </Router>
        </Providers>
    }
}