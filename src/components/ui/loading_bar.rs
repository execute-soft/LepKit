use crate::core::loading::GlobalLoading;
use leptos::prelude::*;
use leptos_router::hooks::use_location;
use std::time::Duration;

/// A thin progress bar fixed to the top of the viewport that fades in and out
/// smoothly.
///
/// It pulses briefly on every route change and stays visible while the
/// [`GlobalLoading`] state is active (e.g. during async work), then fades out.
#[component]
pub fn GlobalLoadingBar() -> impl IntoView {
    let loading = GlobalLoading::use_loading().expect("GlobalLoading not provided at app root");
    let pathname = use_location().pathname;
    let (visible, set_visible) = signal(false);

    Effect::new(move |_| {
        let _ = pathname.get();
        set_visible.set(true);
        set_timeout(move || set_visible.set(false), Duration::from_millis(600));
    });

    Effect::new(move |_| {
        if loading.is_loading().get() {
            set_visible.set(true);
        } else {
            set_timeout(move || set_visible.set(false), Duration::from_millis(250));
        }
    });

    view! {
        <div
            class="pointer-events-none fixed inset-x-0 top-0 z-100 h-0.5 transition-opacity duration-300 ease-out"
            class:opacity-0=move || !visible.get()
            class:opacity-100=move || visible.get()
            aria-hidden="true"
        >
            <div class="h-full w-full bg-primary animate-pulse"></div>
        </div>
    }
}
