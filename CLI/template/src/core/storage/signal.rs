#![allow(dead_code)]

use crate::core::storage::Storage;
use leptos::prelude::*;
use serde::de::DeserializeOwned;
use serde::Serialize;

/// Reactive [`RwSignal`] backed by web storage.
///
/// Initializes from the stored value (or `default`), and writes the current
/// value back to storage on every change. Serialized with JSON, so it works
/// with any `T: Serialize + DeserializeOwned` (structs, enums, collections…).
pub fn storage_rw_signal<T>(
    storage: Storage,
    key: &'static str,
    default: T,
) -> RwSignal<T>
where
    T: Clone + PartialEq + Send + Sync + 'static + Serialize + DeserializeOwned,
{
    let initial = storage.get_json::<T>(key).unwrap_or(default);
    let signal = RwSignal::new(initial);
    Effect::new(move |_| {
        storage.set_json(key, &signal.get());
    });
    signal
}

/// Same as [`storage_rw_signal`] but reads/writes plain strings (no JSON
/// quoting), keeping values like `"dark"` stored as-is.
pub fn storage_rw_signal_str(
    storage: Storage,
    key: &'static str,
    default: &str,
) -> RwSignal<String> {
    let initial = storage.get_or(key, default);
    let signal = RwSignal::new(initial);
    Effect::new(move |_| {
        storage.set(key, &signal.get());
    });
    signal
}

/// Split (`ReadSignal`, `WriteSignal`) variant of [`storage_rw_signal`].
pub fn storage_signal<T>(
    storage: Storage,
    key: &'static str,
    default: T,
) -> (ReadSignal<T>, WriteSignal<T>)
where
    T: Clone + PartialEq + Send + Sync + 'static + Serialize + DeserializeOwned,
{
    let signal = storage_rw_signal(storage, key, default);
    (signal.read_only(), signal.write_only())
}

/// Split (`ReadSignal`, `WriteSignal`) variant of [`storage_rw_signal_str`].
pub fn storage_signal_str(
    storage: Storage,
    key: &'static str,
    default: &str,
) -> (ReadSignal<String>, WriteSignal<String>) {
    let signal = storage_rw_signal_str(storage, key, default);
    (signal.read_only(), signal.write_only())
}