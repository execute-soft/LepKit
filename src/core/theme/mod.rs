#![allow(unused_imports)]

#![allow(dead_code)]

pub mod apply;
pub mod state;

pub use apply::apply_theme;
pub use state::{ThemeState, COLOR_THEME_KEY, CUSTOM_COLOR_KEY, MODE_KEY};