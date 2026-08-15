use crate::components::feedback::coming_soon::ComingSoon;
use crate::components::feedback::not_found::NotFound;
use crate::features::home::pages::home::Home;
use leptos::prelude::*;
use leptos_router::components::{Route, Routes};
use leptos_router::path;

#[component]
pub fn AppRoutes() -> impl IntoView {
    view! {
        <Routes fallback=|| view! { <NotFound /> }>
            <Route path=path!("/") view=Home />
            <Route path=path!("/dashboard") view=ComingSoon />
            <Route path=path!("/organizations") view=ComingSoon />
            <Route path=path!("/users") view=ComingSoon />
        </Routes>
    }
}