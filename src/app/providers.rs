use crate::core::loading::GlobalLoading;
use crate::core::theme::ThemeState;
use leptos::prelude::*;

#[component]
pub fn Providers(children: Children) -> impl IntoView {
    ThemeState::provide_theme();
    GlobalLoading::provide_loading();
    view! { {children()} }
}