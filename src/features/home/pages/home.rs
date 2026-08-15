use crate::config::constants::APP_NAME;
use leptos::prelude::*;

#[component]
pub fn Home() -> impl IntoView {
    view! {
        <main class="relative flex-1">
            <div class="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
                <h1 class="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                    "Welcome to " {APP_NAME}
                </h1>
                <p class="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
                    "A modern control panel for your device fleet."
                </p>
            </div>
        </main>
    }
}