use leptos::prelude::*;
use std::sync::atomic::{AtomicU64, Ordering};

fn unique_grain_id() -> String {
    static COUNTER: AtomicU64 = AtomicU64::new(0);
    format!("aura-grain-{}", COUNTER.fetch_add(1, Ordering::Relaxed))
}

#[component]
pub fn AuraBackground(children: Children) -> impl IntoView {
    let grain_id = unique_grain_id();
    let grain_url = format!("url(#{grain_id})");

    view! {
        <div class="aura-bg">
            <div class="aura-layer-1" aria-hidden="true"></div>
            <div class="aura-layer-2" aria-hidden="true"></div>
            <div class="aura-layer-3" aria-hidden="true"></div>
            <div class="aura-grain" aria-hidden="true">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <filter id=grain_id>
                        <feTurbulence
                            type="fractalNoise"
                            base-frequency="0.7"
                            num-octaves="4"
                            stitch-tiles="stitch"
                        ></feTurbulence>
                        <feColorMatrix
                            type="matrix"
                            values="0.181 0.608 0.061 0 0.075 0.181 0.608 0.061 0 0.075 0.181 0.608 0.061 0 0.075 0 0 0 1 0"
                        ></feColorMatrix>
                    </filter>
                    <rect width="100%" height="100%" filter=grain_url></rect>
                </svg>
            </div>
            <div class="relative z-10">
                {children()}
            </div>
        </div>
    }
}