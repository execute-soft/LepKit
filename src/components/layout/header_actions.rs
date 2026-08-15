use crate::components::ui::icons::{
    icon_moon, icon_palette, icon_plus, icon_refresh_cw, icon_sun, icon_x,
};
use crate::config::themes::THEMES;
use crate::core::theme::ThemeState;
use crate::hooks::use_click_outside::use_click_outside;
use leptos::prelude::*;

#[component]
pub fn HeaderActions() -> impl IntoView {
    let theme = ThemeState::use_theme().expect("ThemeState not provided at app root");
    let (is_open, set_is_open) = signal(false);
    let (show_custom, set_show_custom) = signal(false);
    let color_ref: NodeRef<leptos::html::Div> = NodeRef::new();

    use_click_outside(
        is_open,
        move |target| color_ref.get().is_some_and(|el| el.contains(target)),
        move || {
            set_is_open.set(false);
            set_show_custom.set(false);
        },
    );

    let close_panel = move |_| {
        set_is_open.set(false);
        set_show_custom.set(false);
    };

    let apply_custom = move |_| {
        theme.apply_custom();
        set_show_custom.set(false);
        set_is_open.set(false);
    };

    let reset_all = move |_| {
        theme.reset();
        set_show_custom.set(false);
        set_is_open.set(false);
    };

    view! {
        <div class="flex items-center gap-1.5 sm:gap-2">
            <button
                on:click=move |_| theme.toggle_mode()
                class="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Toggle theme mode"
            >
                {move || {
                    if theme.mode.get() == "light" {
                        icon_moon("size-4").into_any()
                    } else {
                        icon_sun("size-4").into_any()
                    }
                }}
            </button>

            <div class="relative" node_ref=color_ref>
                <button
                    on:click=move |_| set_is_open.update(|v| *v = !*v)
                    class="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    aria-label="Change primary color"
                    aria-expanded=is_open
                >
                    {icon_palette("size-4")}
                </button>

                {move || {
                    if is_open.get() {
                        view! {
                            <div class="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-border bg-background p-3 shadow-lg">
                                <div class="mb-3 flex items-center justify-between">
                                    <span class="text-sm font-medium text-foreground">
                                        "Primary Color"
                                    </span>
                                    <button
                                        on:click=close_panel
                                        class="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                                        aria-label="Close color picker"
                                    >
                                        {icon_x("size-4")}
                                    </button>
                                </div>

                                <div class="grid grid-cols-6 gap-2">
                                    {THEMES
                                        .iter()
                                        .map(|theme_def| {
                                            let theme_name = theme_def.name;
                                            let swatch_bg = move || {
                                                theme.swatch_for(theme_def.light, theme_def.dark)
                                            };
                                            let is_selected = move || theme.color_theme.get() == theme_name;
                                            view! {
                                                <button
                                                    on:click=move |_| {
                                                        theme.select_theme(theme_name);
                                                        set_is_open.set(false);
                                                    }
                                                    class="size-6 cursor-pointer rounded-full border-2 transition-all flex items-center justify-center"
                                                    class:border-primary=move || is_selected()
                                                    class:ring-2=move || is_selected()
                                                    class=(["ring-primary/50"], move || is_selected())
                                                    class:scale-110=move || is_selected()
                                                    class:border-border=move || !is_selected()
                                                    class=(["hover:border-primary/50"], move || !is_selected())
                                                    class:hover:scale-110=move || !is_selected()
                                                    style={move || format!("background-color: {}", swatch_bg())}
                                                    title=theme_name
                                                    aria-label=format!("Use {} theme", theme_name)
                                                >
                                                    {move || {
                                                        if is_selected() {
                                                            view! {
                                                                <div class="size-2.5 rounded-full bg-white shadow"></div>
                                                            }
                                                                .into_any()
                                                        } else {
                                                            ().into_any()
                                                        }
                                                    }}
                                                </button>
                                            }
                                        })
                                        .collect_view()}
                                </div>

                                <div class="mt-3 border-t border-border pt-3">
                                    {move || {
                                        if !show_custom.get() {
                                            view! {
                                                <button
                                                    on:click=move |_| set_show_custom.set(true)
                                                    class="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                                >
                                                    {icon_plus("size-4")}
                                                    "Custom Color"
                                                </button>
                                            }
                                                .into_any()
                                        } else {
                                            view! {
                                                <div class="flex items-center gap-2">
                                                    <input
                                                        type="color"
                                                        value=theme.custom_color
                                                        on:input=move |ev| {
                                                            let value = event_target_value(&ev);
                                                            theme.set_custom_color(&value);
                                                        }
                                                        class="size-8 cursor-pointer rounded-md border border-border bg-transparent"
                                                        aria-label="Pick a custom color"
                                                    />
                                                    <button
                                                        on:click=apply_custom
                                                        class="flex-1 cursor-pointer rounded-md bg-primary px-2 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                                                    >
                                                        "Apply"
                                                    </button>
                                                    <button
                                                        on:click=move |_| set_show_custom.set(false)
                                                        class="cursor-pointer rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
                                                        aria-label="Cancel custom color"
                                                    >
                                                        {icon_x("size-4")}
                                                    </button>
                                                </div>
                                            }
                                                .into_any()
                                        }
                                    }}
                                </div>

                                <div class="mt-3 border-t border-border pt-3">
                                    <button
                                        on:click=reset_all
                                        class="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                    >
                                        {icon_refresh_cw("size-4")}
                                        "Reset to Default"
                                    </button>
                                </div>
                            </div>
                        }
                            .into_any()
                    } else {
                        ().into_any()
                    }
                }}
            </div>
        </div>
    }
}