mod app;
mod components;
mod config;
mod core;
mod features;
mod hooks;
mod services;
mod types;
mod utils;

use app::app::App;
use leptos::prelude::*;

fn main() {
    _ = console_log::init_with_level(log::Level::Debug);
    console_error_panic_hook::set_once();

    leptos::mount::mount_to_body(|| view! { <App/> });
}