#![allow(dead_code)]

use serde::de::DeserializeOwned;
use serde::Serialize;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum StorageKind {
    Local,
    Session,
}

/// Thin, reusable wrapper over the browser `localStorage` / `sessionStorage`.
///
/// `Storage` is `Copy`, so it can be freely moved into closures and effects.
/// Prefer the convenience helpers in [`crate::core::storage::local_storage`]
/// and [`crate::core::storage::session_storage`] for one-off calls, or use
/// the reactive [`crate::core::storage::signal`] helpers when you want the
/// value to stay in sync with a Leptos signal.
#[derive(Clone, Copy, Debug)]
pub struct Storage(pub StorageKind);

impl Storage {
    pub const LOCAL: Storage = Storage(StorageKind::Local);
    pub const SESSION: Storage = Storage(StorageKind::Session);

    fn web_storage(self) -> Option<web_sys::Storage> {
        let window = web_sys::window()?;
        match self.0 {
            StorageKind::Local => window.local_storage().ok().flatten(),
            StorageKind::Session => window.session_storage().ok().flatten(),
        }
    }

    pub fn get(self, key: &str) -> Option<String> {
        self.web_storage()?.get_item(key).ok().flatten()
    }

    pub fn get_or(self, key: &str, default: &str) -> String {
        self.get(key)
            .filter(|value| !value.is_empty())
            .unwrap_or_else(|| default.to_string())
    }

    pub fn set(self, key: &str, value: &str) {
        if let Some(storage) = self.web_storage() {
            let _ = storage.set_item(key, value);
        }
    }

    pub fn remove(self, key: &str) {
        if let Some(storage) = self.web_storage() {
            let _ = storage.remove_item(key);
        }
    }

    pub fn clear(self) {
        if let Some(storage) = self.web_storage() {
            let _ = storage.clear();
        }
    }

    pub fn get_bool(self, key: &str) -> Option<bool> {
        self.get(key).and_then(|value| match value.as_str() {
            "true" | "1" => Some(true),
            "false" | "0" => Some(false),
            _ => None,
        })
    }

    pub fn get_bool_or(self, key: &str, default: bool) -> bool {
        self.get_bool(key).unwrap_or(default)
    }

    pub fn set_bool(self, key: &str, value: bool) {
        self.set(key, if value { "true" } else { "false" });
    }

    pub fn get_number(self, key: &str) -> Option<f64> {
        self.get(key).and_then(|value| value.parse().ok())
    }

    pub fn set_number(self, key: &str, value: f64) {
        self.set(key, &value.to_string());
    }

    pub fn get_json<T: DeserializeOwned>(self, key: &str) -> Option<T> {
        self.get(key).and_then(|value| serde_json::from_str(&value).ok())
    }

    pub fn set_json<T: Serialize>(self, key: &str, value: &T) {
        if let Ok(json) = serde_json::to_string(value) {
            self.set(key, &json);
        }
    }
}