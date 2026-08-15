use crate::utils::color::{adjust_lightness, hex_to_rgb};
use js_sys::Array;
use wasm_bindgen::JsCast;
use wasm_bindgen::JsValue;

/// Applies the current theme to the `<html>` element:
/// toggles the `dark` class, sets `data-theme`, and (for the `custom` theme)
/// injects the derived CSS custom properties.
pub fn apply_theme(mode: &str, color_theme: &str, custom_color: &str) {
    let Some(window) = web_sys::window() else {
        return;
    };
    let Some(doc) = window.document() else {
        return;
    };
    let Some(el) = doc.document_element() else {
        return;
    };

    let tokens = Array::new();
    tokens.push(&JsValue::from_str("dark"));
    let class_list = el.class_list();
    if mode == "dark" {
        let _ = class_list.add(&tokens);
    } else {
        let _ = class_list.remove(&tokens);
    }

    let style = el
        .clone()
        .unchecked_into::<web_sys::HtmlElement>()
        .style();
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