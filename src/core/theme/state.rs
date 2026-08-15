#![allow(dead_code)]

use crate::config::themes::{DEFAULT_HEX, DEFAULT_THEME};
use crate::core::storage::{storage_rw_signal_str, Storage};
use crate::core::theme::apply::apply_theme;
use leptos::prelude::*;

pub const MODE_KEY: &str = "mode";
pub const COLOR_THEME_KEY: &str = "color-theme";
pub const CUSTOM_COLOR_KEY: &str = "custom-primary";

const DEFAULT_MODE: &str = "dark";

/// Reactive, storage-persisted theme state. Every field is backed by a
/// [`RwSignal`] that writes through to `localStorage`, so any component can
/// read/update the theme and it stays in sync with the `<html>` element.
#[derive(Clone, Copy)]
pub struct ThemeState {
    pub mode: RwSignal<String>,
    pub color_theme: RwSignal<String>,
    pub custom_color: RwSignal<String>,
}

impl ThemeState {
    pub fn new() -> Self {
        let mode = storage_rw_signal_str(Storage::LOCAL, MODE_KEY, DEFAULT_MODE);
        let color_theme = storage_rw_signal_str(Storage::LOCAL, COLOR_THEME_KEY, DEFAULT_THEME);
        let custom_color = storage_rw_signal_str(Storage::LOCAL, CUSTOM_COLOR_KEY, DEFAULT_HEX);

        Effect::new(move |_| {
            apply_theme(&mode.get(), &color_theme.get(), &custom_color.get());
        });

        Self {
            mode,
            color_theme,
            custom_color,
        }
    }

    pub fn is_dark(self) -> bool {
        self.mode.get() == "dark"
    }

    pub fn is_custom(self) -> bool {
        self.color_theme.get() == "custom"
    }

    pub fn swatch_for(self, light: &str, dark: &str) -> String {
        if self.is_dark() {
            dark.to_string()
        } else {
            light.to_string()
        }
    }

    pub fn toggle_mode(self) {
        let next = if self.is_dark() { "light" } else { "dark" };
        self.mode.set(next.to_string());
    }

    pub fn select_theme(self, name: &str) {
        self.color_theme.set(name.to_string());
    }

    pub fn set_custom_color(self, hex: &str) {
        self.custom_color.set(hex.to_string());
    }

    pub fn apply_custom(self) {
        self.color_theme.set("custom".to_string());
    }

    pub fn reset(self) {
        self.mode.set(DEFAULT_MODE.to_string());
        self.color_theme.set(DEFAULT_THEME.to_string());
        self.custom_color.set(DEFAULT_HEX.to_string());
    }
}

impl Default for ThemeState {
    fn default() -> Self {
        Self::new()
    }
}