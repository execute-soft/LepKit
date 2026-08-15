#![allow(dead_code)]

use leptos::prelude::*;
use wasm_bindgen::closure::Closure;
use wasm_bindgen::JsCast;

fn initial_transform(direction: &str, distance: u32) -> String {
    match direction {
        "top" => format!("translateY(-{distance}px)"),
        "left" => format!("translateX(-{distance}px)"),
        "right" => format!("translateX({distance}px)"),
        _ => format!("translateY({distance}px)"),
    }
}

#[component]
pub fn Section(
    id: &'static str,
    children: Children,
    #[prop(optional)] animate: bool,
    #[prop(default = "px-6 py-16 max-w-280")] class_name: &'static str,
    #[prop(default = "bottom")] direction: &'static str,
    #[prop(default = 20)] distance: u32,
    #[prop(default = 0.5)] duration: f64,
    #[prop(default = 0.0)] delay: f64,
) -> impl IntoView {
    let node_ref: NodeRef<leptos::html::Section> = NodeRef::new();
    let (revealed, set_revealed) = signal(!animate);
    let observer = StoredValue::new(None::<web_sys::IntersectionObserver>);

    if animate {
        Effect::new(move |_| {
            let Some(el) = node_ref.get() else {
                return;
            };
            let obs_handle = observer;
            let callback = Closure::wrap(Box::new(
                move |entries: js_sys::Array, _: web_sys::IntersectionObserver| {
                    for entry in entries.iter() {
                        if let Ok(entry) = entry
                            .clone()
                            .dyn_into::<web_sys::IntersectionObserverEntry>()
                        {
                            if entry.is_intersecting() {
                                set_revealed.set(true);
                                if let Some(Some(obs)) = obs_handle.try_get_value() {
                                    obs.disconnect();
                                }
                                break;
                            }
                        }
                    }
                },
            ) as Box<dyn FnMut(js_sys::Array, web_sys::IntersectionObserver)>);
            if let Ok(obs) = web_sys::IntersectionObserver::new(
                callback.as_ref().unchecked_ref::<js_sys::Function>(),
            ) {
                let _ = obs.observe(&el);
                observer.set_value(Some(obs));
                callback.forget();
            }
        });
    }

    let transform = initial_transform(direction, distance);
    let transition =
        format!("opacity {duration}s ease {delay}s, transform {duration}s ease {delay}s");
    let style = move || {
        if revealed.get() {
            format!("opacity: 1; transform: translate(0, 0); transition: {transition};")
        } else {
            format!("opacity: 0; transform: {transform}; transition: {transition};")
        }
    };

    view! {
        <section
            id=id
            node_ref=node_ref
            class=format!("{class_name} mx-auto relative overflow-hidden sm:overflow-visible")
            style=style
        >
            {children()}
        </section>
    }
}