use crate::app::providers::Providers;
use crate::app::routes::AppRoutes;
use leptos::prelude::*;

#[component]
pub fn App() -> impl IntoView {
    view! {
        <Providers>
            <AppRoutes/>
        </Providers>
    }
}