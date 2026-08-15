/// Joins multiple class strings into a single class attribute, skipping
/// empty segments and de-duplicating repeated classes. The Leptos equivalent
/// of `clsx` + a light `tailwind-merge`.
pub fn merge_classes(parts: &[&str]) -> String {
    let mut seen: Vec<&str> = Vec::new();
    for part in parts {
        for class in part.split_whitespace() {
            if !class.is_empty() && !seen.contains(&class) {
                seen.push(class);
            }
        }
    }
    seen.join(" ")
}