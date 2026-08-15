use crate::components::ui::badge::Badge;
use crate::components::ui::icons::{
    icon_activity, icon_arrow_right, icon_box, icon_check_circle, icon_clock, icon_download,
    icon_rocket, icon_shield_check, icon_target, icon_terminal,
};
use leptos::prelude::*;
use leptos_router::hooks::use_navigate;

#[component]
fn HeroButtons() -> impl IntoView {
    let navigate = use_navigate();
    let go_dashboard = {
        let navigate = navigate.clone();
        move |ev: leptos::ev::MouseEvent| {
            ev.prevent_default();
            navigate("/dashboard", Default::default());
        }
    };
    let go_dashboard_alt = go_dashboard.clone();

    view! {
        <div class="flex flex-col items-center gap-4">
            <div class="flex flex-col items-center gap-3 sm:flex-row">
                <a
                    href="/dashboard"
                    on:click=go_dashboard
                    class="group inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-lg transition-all hover:bg-foreground/90 hover:shadow-primary/20"
                >
                    "Get Started"
                    <span class="transition-transform group-hover:translate-x-0.5">
                        {icon_arrow_right("size-4")}
                    </span>
                </a>
                <a
                    href="/dashboard"
                    on:click=go_dashboard_alt
                    class="inline-flex items-center gap-2 rounded-lg border border-border bg-background/60 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-primary/50"
                >
                    {icon_box("size-4")}
                    "View Dashboard"
                </a>
            </div>
        </div>
    }
}

#[component]
fn HeroCards() -> impl IntoView {
    let cards: Vec<(&str, &str, AnyView)> = vec![
        (
            "Device management",
            "Provision, configure and organize every device in your fleet.",
            icon_box("size-5").into_any(),
        ),
        (
            "Real-time telemetry",
            "Live metrics, sensor data and health status from your devices.",
            icon_activity("size-5").into_any(),
        ),
        (
            "Remote commands",
            "Send commands and push configuration updates instantly.",
            icon_terminal("size-5").into_any(),
        ),
        (
            "Smart alerts",
            "Automatic notifications the moment something needs attention.",
            icon_target("size-5").into_any(),
        ),
    ];

    view! {
        <div class="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards
                .into_iter()
                .map(|(title, desc, icon)| {
                    view! {
                        <div class="flex flex-col items-start gap-3 rounded-xl border border-border bg-background/60 p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                            <div class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                {icon}
                            </div>
                            <div>
                                <h3 class="font-semibold text-foreground">{title}</h3>
                                <p class="mt-1 text-sm text-muted-foreground">{desc}</p>
                            </div>
                        </div>
                    }
                })
                .collect_view()}
        </div>
    }
}

#[component]
fn TrustItems() -> impl IntoView {
    let items: Vec<(&str, AnyView)> = vec![
        ("Secure by design", icon_shield_check("size-4").into_any()),
        ("Real-time monitoring", icon_clock("size-4").into_any()),
        ("Scale with ease", icon_rocket("size-4").into_any()),
        ("Instant alerts", icon_download("size-4").into_any()),
        ("API-first", icon_check_circle("size-4").into_any()),
    ];

    view! {
        <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            {items
                .into_iter()
                .map(|(label, icon)| {
                    view! {
                        <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span class="text-primary">{icon}</span>
                            <span>{label}</span>
                        </div>
                    }
                })
                .collect_view()}
        </div>
    }
}

#[component]
pub fn Home() -> impl IntoView {
    view! {
        <main class="relative flex-1">
            <div class="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 md:py-24 lg:px-8">
                <Badge text="Manage your entire device fleet from one place" />

                <h1 class="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                    "Control every device with "
                    <span class="bg-linear-to-r from-primary via-violet-600 to-amber-500 bg-clip-text text-transparent">
                        "precision and confidence"
                    </span> <br /> "— no matter how big the fleet."
                </h1>

                <p class="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
                    "Set up devices, watch live telemetry, run remote commands and stay on top of
                    alerts — all from a single, beautiful control panel."
                </p>

                <div class="mt-8">
                    <HeroButtons />
                </div>

                <HeroCards />
                <TrustItems />
            </div>
        </main>
    }
}
