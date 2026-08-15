use leptos::prelude::*;
use std::sync::atomic::{AtomicU64, Ordering};

fn unique_id() -> String {
    static COUNTER: AtomicU64 = AtomicU64::new(0);
    format!("blob-{}", COUNTER.fetch_add(1, Ordering::Relaxed))
}

#[component]
fn BlobGroup(id: String) -> impl IntoView {
    let blob1 = format!("blob1-{id}");
    let blob2 = format!("blob2-{id}");
    let blob3 = format!("blob3-{id}");

    view! {
        <g filter=format!("url(#{blob1})")>
            <ellipse
                cx="898.121"
                cy="7.207"
                rx="284.881"
                ry="69.058"
                fill="var(--blob1)"
                fill-opacity=".43"
            />
        </g>
        <g filter=format!("url(#{blob2})")>
            <ellipse
                cx="727.789"
                cy="48.819"
                rx="284.881"
                ry="131.671"
                fill="var(--blob2)"
                fill-opacity=".43"
            />
        </g>
        <g filter=format!("url(#{blob3})")>
            <ellipse
                cx="504.666"
                cy="27.364"
                rx="284.881"
                ry="89.316"
                fill="var(--blob3)"
                fill-opacity=".43"
            />
        </g>
        <defs>
            <filter
                id=blob1
                color-interpolation-filters="sRGB"
                filter-units="userSpaceOnUse"
                x="377.079"
                y="-298.012"
                width="1042.08"
                height="610.439"
            >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend r#in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="gradient-background-blur" std-deviation="118.081" />
            </filter>
            <filter
                id=blob2
                color-interpolation-filters="sRGB"
                filter-units="userSpaceOnUse"
                x="206.747"
                y="-319.013"
                width="1042.08"
                height="735.665"
            >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend r#in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="gradient-background-blur" std-deviation="118.081" />
            </filter>
            <filter
                id=blob3
                color-interpolation-filters="sRGB"
                filter-units="userSpaceOnUse"
                x="-16.376"
                y="-298.113"
                width="1042.08"
                height="650.953"
            >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend r#in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="gradient-background-blur" std-deviation="118.081" />
            </filter>
        </defs>
    }
}

#[component]
pub fn DecorativeBlobTop(#[prop(optional)] class: &'static str) -> impl IntoView {
    view! {
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 550"
            preserve-aspect-ratio="xMidYMid meet"
            class=format!(
                "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] {class}",
            )
            aria-hidden="true"
        >
            <BlobGroup id=unique_id() />
        </svg>
    }
}

#[component]
pub fn DecorativeBlobBottom(#[prop(optional)] class: &'static str) -> impl IntoView {
    view! {
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 550"
            preserve-aspect-ratio="xMidYMid meet"
            class=format!(
                "w-full max-w-125 sm:max-w-100 md:max-w-150 lg:max-w-200 xl:max-w-250 rotate-180 {class}",
            )
            aria-hidden="true"
        >
            <BlobGroup id=unique_id() />
        </svg>
    }
}
