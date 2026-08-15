#![allow(dead_code)]

use leptos::prelude::*;
use std::time::Duration;

/// Returns a signal that mirrors `source` but only updates `delay_ms` after
/// the last change, cancelling any pending timer in between.
pub fn use_debounce<T>(source: RwSignal<T>, delay_ms: u32) -> RwSignal<T>
where
    T: Clone + PartialEq + Send + Sync + 'static,
{
    let debounced = RwSignal::new(source.get_untracked());
    let timer = StoredValue::new(None::<TimeoutHandle>);

    Effect::new(move |_| {
        let latest = source.get();
        if latest != debounced.get_untracked() {
            timer.update_value(|slot| {
                if let Some(handle) = slot.take() {
                    handle.clear();
                }
            });
            let value_for_timer = latest.clone();
            let _ = set_timeout_with_handle(
                move || debounced.set(value_for_timer),
                Duration::from_millis(delay_ms as u64),
            );
        }
    });

    debounced
}