#![allow(dead_code)]

use leptos::prelude::*;

/// Global loading state, provided at the app root and shared app-wide.
///
/// Long-running async work can drive the
/// [`GlobalLoadingBar`](crate::components::ui::loading_bar::GlobalLoadingBar)
/// by calling [`start`](Self::start) before the work begins and
/// [`done`](Self::done) when it finishes.
#[derive(Clone, Copy)]
pub struct GlobalLoading {
    is_loading: RwSignal<bool>,
}

impl GlobalLoading {
    /// Provides the loading state to the current owner tree.
    pub fn provide_loading() -> Self {
        let loading = Self {
            is_loading: RwSignal::new(false),
        };
        provide_context(loading);
        loading
    }

    /// Returns the loading state from the nearest owner, if provided.
    pub fn use_loading() -> Option<Self> {
        use_context::<GlobalLoading>()
    }

    /// Marks the app as loading (shows the global loading bar).
    pub fn start(&self) {
        self.is_loading.set(true);
    }

    /// Marks the app as no longer loading (hides the global loading bar).
    pub fn done(&self) {
        self.is_loading.set(false);
    }

    /// Returns the reactive loading signal, for consumers that need to react
    /// to changes (e.g. the global loading bar).
    pub fn is_loading(&self) -> RwSignal<bool> {
        self.is_loading
    }
}