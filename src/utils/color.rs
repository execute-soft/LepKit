/// Converts a hex color (e.g. `#14B8A6`) to a CSS `r,g,b` string.
pub fn hex_to_rgb(hex: &str) -> String {
    let hex = hex.trim_start_matches('#');
    if hex.len() < 6 {
        return "0,0,0".to_string();
    }
    let r = u8::from_str_radix(&hex[0..2], 16).unwrap_or(0);
    let g = u8::from_str_radix(&hex[2..4], 16).unwrap_or(0);
    let b = u8::from_str_radix(&hex[4..6], 16).unwrap_or(0);
    format!("{r},{g},{b}")
}

/// Returns the `(r, g, b)` channels of a hex color as `u8`s.
pub fn hex_to_rgb_tuple(hex: &str) -> (u8, u8, u8) {
    let hex = hex.trim_start_matches('#');
    if hex.len() < 6 {
        return (0, 0, 0);
    }
    (
        u8::from_str_radix(&hex[0..2], 16).unwrap_or(0),
        u8::from_str_radix(&hex[2..4], 16).unwrap_or(0),
        u8::from_str_radix(&hex[4..6], 16).unwrap_or(0),
    )
}

/// Lightens (`factor > 1`) or darkens (`factor < 1`) a hex color.
pub fn adjust_lightness(hex: &str, factor: f64) -> String {
    let hex = hex.trim_start_matches('#');
    if hex.len() < 6 {
        return format!("#{hex}");
    }
    let (r, g, b) = hex_to_rgb_tuple(&format!("#{hex}"));
    let rf = ((r as f64 / 255.0) * factor).clamp(0.0, 1.0) * 255.0;
    let gf = ((g as f64 / 255.0) * factor).clamp(0.0, 1.0) * 255.0;
    let bf = ((b as f64 / 255.0) * factor).clamp(0.0, 1.0) * 255.0;
    format!("#{:02x}{:02x}{:02x}", rf as u8, gf as u8, bf as u8)
}