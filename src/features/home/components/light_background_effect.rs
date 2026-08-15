use leptos::prelude::*;

#[component]
pub fn LightBackgroundEffect() -> impl IntoView {
    view! {
        <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div
                class="absolute top-1/4 left-1/4 size-48 rounded-full bg-purple-500/20 blur-3xl animate-pulse md:size-72"
                style="animation-delay: 0s"
            ></div>
            <div
                class="absolute bottom-1/4 right-1/4 size-64 rounded-full bg-blue-500/20 blur-3xl animate-pulse md:size-96"
                style="animation-delay: 1s"
            ></div>
            <div
                class="absolute top-1/2 left-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/15 blur-2xl animate-pulse md:size-48"
                style="animation-delay: 0.5s"
            ></div>
        </div>
    }
}