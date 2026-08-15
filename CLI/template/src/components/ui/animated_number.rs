#![allow(dead_code)]

use leptos::prelude::*;

fn now_ms() -> f64 {
    js_sys::Date::now()
}

fn format_animated(value: f64) -> String {
    if value.fract() == 0.0 {
        format!("{:.0}", value)
    } else {
        format!("{:.1}", value)
    }
}

fn animate_step(
    target: f64,
    start: f64,
    started_at: f64,
    duration_ms: f64,
    set_display: WriteSignal<f64>,
    frame: StoredValue<Option<AnimationFrameRequestHandle>>,
) {
    if let Ok(handle) = request_animation_frame_with_handle(move || {
        let progress = ((now_ms() - started_at) / duration_ms).min(1.0);
        let eased = 1.0 - (1.0 - progress) * (1.0 - progress);
        set_display.set(start + (target - start) * eased);
        if progress < 1.0 {
            animate_step(target, start, started_at, duration_ms, set_display, frame);
        } else {
            frame.set_value(None);
        }
    }) {
        frame.set_value(Some(handle));
    }
}

/// Smoothly animates a number towards `value` (ease-out) whenever the value
/// changes. Pass a reactive signal to `value` to keep the count-up live.
#[component]
pub fn AnimatedNumber(
    #[prop(into)] value: Signal<f64>,
    #[prop(default = 600.0)] duration_ms: f64,
    #[prop(optional)] class: &'static str,
) -> impl IntoView {
    let (display, set_display) = signal(value.get_untracked());
    let frame = StoredValue::new(None::<AnimationFrameRequestHandle>);

    Effect::new(move |_| {
        let target = value.get();
        frame.update_value(|slot| {
            if let Some(handle) = slot.take() {
                handle.cancel();
            }
        });
        let start = display.get_untracked();
        if (start - target).abs() < 0.5 {
            set_display.set(target);
            return;
        }
        animate_step(target, start, now_ms(), duration_ms, set_display, frame);
    });

    view! { <span class=class>{move || format_animated(display.get())}</span> }
}