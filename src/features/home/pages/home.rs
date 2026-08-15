use crate::components::ui::badge::Badge;
use crate::features::home::components::hero_buttons::HeroButtons;
use crate::features::home::components::hero_cards::HeroCards;
use crate::features::home::components::trust_items::TrustItems;
use leptos::prelude::*;

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