use crate::components::ui::icons::{
    icon_moon, icon_palette, icon_plus, icon_refresh_cw, icon_sun, icon_x,
};
use crate::config::themes::{DEFAULT_HEX, DEFAULT_THEME, THEMES};
use leptos::prelude::*;
use wasm_bindgen::JsCast;
use wasm_bindgen::JsValue;

fn read_storage(key: &str, default: &str) -> String {
    window()
        .local_storage()
        .ok()
        .flatten()
        .and_then(|storage| storage.get_item(key).ok().flatten())
        .filter(|value| !value.is_empty())
        .unwrap_or_else(|| default.to_string())
}

fn write_storage(key: &str, value: &str) {
    if let Ok(Some(storage)) = window().local_storage() {
        let _ = storage.set_item(key, value);
    }
}

fn hex_to_rgb(hex: &str) -> String {
    let hex = hex.trim_start_matches('#');
    if hex.len() < 6 {
        return "0,0,0".to_string();
    }
    let r = u8::from_str_radix(&hex[0..2], 16).unwrap_or(0);
    let g = u8::from_str_radix(&hex[2..4], 16).unwrap_or(0);
    let b = u8::from_str_radix(&hex[4..6], 16).unwrap_or(0);
    format!("{r},{g},{b}")
}

fn adjust_lightness(hex: &str, factor: f64) -> String {
    let hex = hex.trim_start_matches('#');
    if hex.len() < 6 {
        return format!("#{hex}");
    }
    let r = u8::from_str_radix(&hex[0..2], 16).unwrap_or(0);
    let g = u8::from_str_radix(&hex[2..4], 16).unwrap_or(0);
    let b = u8::from_str_radix(&hex[4..6], 16).unwrap_or(0);
    let rf = ((r as f64 / 255.0) * factor).clamp(0.0, 1.0) * 255.0;
    let gf = ((g as f64 / 255.0) * factor).clamp(0.0, 1.0) * 255.0;
    let bf = ((b as f64 / 255.0) * factor).clamp(0.0, 1.0) * 255.0;
    format!("#{:02x}{:02x}{:02x}", rf as u8, gf as u8, bf as u8)
}

fn apply_theme(mode: &str, color_theme: &str, custom_color: &str) {
    let Some(window) = web_sys::window() else {
        return;
    };
    let Some(doc) = window.document() else {
        return;
    };
    let Some(el) = doc.document_element() else {
        return;
    };

    let tokens = js_sys::Array::new();
    tokens.push(&JsValue::from_str("dark"));
    let class_list = el.class_list();
    if mode == "dark" {
        let _ = class_list.add(&tokens);
    } else {
        let _ = class_list.remove(&tokens);
    }

    let style = el.clone().unchecked_into::<web_sys::HtmlElement>().style();
    if color_theme == "custom" {
        let _ = el.set_attribute("data-theme", "custom");
        let factor = if mode == "dark" { 1.3 } else { 1.0 };
        let primary = adjust_lightness(custom_color, factor);
        let _ = style.set_property("--primary", &primary);
        let _ = style.set_property("--primary-rgb", &hex_to_rgb(&primary));
        let _ = style.set_property("--blob1", &primary);
        let _ = style.set_property("--blob2", &adjust_lightness(custom_color, 0.7 * factor));
        let _ = style.set_property("--blob3", &adjust_lightness(custom_color, 1.2 * factor));
    } else {
        let _ = el.set_attribute("data-theme", color_theme);
        for prop in [
            "--primary",
            "--primary-rgb",
            "--blob1",
            "--blob2",
            "--blob3",
        ] {
            let _ = style.remove_property(prop);
        }
    }
}

#[component]
pub fn HeaderActions() -> impl IntoView {
    let (mode, set_mode) = signal(read_storage("mode", "dark"));
    let (color_theme, set_color_theme) = signal(read_storage("color-theme", DEFAULT_THEME));
    let (custom_color, set_custom_color) = signal(read_storage("custom-primary", DEFAULT_HEX));
    let (is_open, set_is_open) = signal(false);
    let (show_custom, set_show_custom) = signal(false);

    Effect::new(move |_| {
        apply_theme(&mode.get(), &color_theme.get(), &custom_color.get());
    });

    let toggle_mode = move |_| {
        let next = if mode.get_untracked() == "light" {
            "dark"
        } else {
            "light"
        };
        set_mode.set(next.to_string());
        write_storage("mode", next);
    };

    let apply_custom = move |_| {
        set_color_theme.set("custom".to_string());
        write_storage("color-theme", "custom");
        set_show_custom.set(false);
        set_is_open.set(false);
    };

    let reset_all = move |_| {
        set_mode.set("dark".to_string());
        set_color_theme.set(DEFAULT_THEME.to_string());
        set_custom_color.set(DEFAULT_HEX.to_string());
        write_storage("mode", "dark");
        write_storage("color-theme", DEFAULT_THEME);
        write_storage("custom-primary", DEFAULT_HEX);
        set_show_custom.set(false);
        set_is_open.set(false);
    };

    view! {
        <div class="flex items-center gap-1.5 sm:gap-2">
            <button
                on:click=toggle_mode
                class="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Toggle theme mode"
            >
                {move || {
                    if mode.get() == "light" {
                        icon_moon("size-4").into_any()
                    } else {
                        icon_sun("size-4").into_any()
                    }
                }}
            </button>

            <div class="relative">
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
                            <div
                                class="fixed inset-0 z-40"
                                on:click=move |_| {
                                    set_is_open.set(false);
                                    set_show_custom.set(false);
                                }
                            ></div>
                            <div class="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-border bg-background p-3 shadow-lg">
                                <div class="mb-3 flex items-center justify-between">
                                    <span class="text-sm font-medium text-foreground">"Primary Color"</span>
                                    <button
                                        on:click=move |_| {
                                            set_is_open.set(false);
                                            set_show_custom.set(false);
                                        }
                                        class="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                                        aria-label="Close color picker"
                                    >
                                        {icon_x("size-4")}
                                    </button>
                                </div>

                                <div class="grid grid-cols-6 gap-2">
                                    {THEMES
                                        .iter()
                                        .map(|theme| {
                                            let theme_name = theme.name;
                                            let swatch_bg =
                                                move || if mode.get() == "light" { theme.light } else { theme.dark };
                                            let is_selected = move || color_theme.get() == theme_name;
                                            view! {
                                                <button
                                                    on:click=move |_| {
                                                        set_color_theme.set(theme_name.to_string());
                                                        write_storage("color-theme", theme_name);
                                                        set_is_open.set(false);
                                                    }
                                                    class={move || {
                                                        format!(
                                                            "size-6 cursor-pointer rounded-full border-2 transition-all flex items-center justify-center {}",
                                                            if is_selected() {
                                                                "border-primary ring-2 ring-primary/50 scale-110"
                                                            } else {
                                                                "border-border hover:border-primary/50 hover:scale-110"
                                                            },
                                                        )
                                                    }}
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
                                                        value=custom_color
                                                        on:input=move |ev| {
                                                            let value = event_target_value(&ev);
                                                            set_custom_color.set(value.clone());
                                                            write_storage("custom-primary", &value);
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