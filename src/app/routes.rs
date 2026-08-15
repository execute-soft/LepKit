use crate::features::home::pages::home::Home;
use leptos::prelude::*;
use leptos_router::components::{Route, Routes};
use leptos_router::path;

#[component]
fn Placeholder(label: &'static str) -> impl IntoView {
    view! {
        <div class="flex min-h-screen items-center justify-center">
            <div class="bg-card text-card-foreground border border-border p-8 rounded-xl shadow-lg">
                <h1 class="text-2xl font-bold capitalize">{label}</h1>
                <p class="mt-2 text-muted-foreground">"This page is under construction."</p>
            </div>
        </div>
    }
}

#[component]
pub fn AppRoutes() -> impl IntoView {
    view! {
        <Routes fallback=|| "Not found">
            <Route path=path!("/") view=Home />
            <Route path=path!("/dashboard") view=|| view! { <Placeholder label="dashboard" /> } />
            <Route
                path=path!("/organizations")
                view=|| view! { <Placeholder label="organizations" /> }
            />
            <Route path=path!("/users") view=|| view! { <Placeholder label="users" /> } />
        </Routes>
    }
}