/// Returns whether the given route `href` is the active route for the current
/// `pathname`. The home route (`/`) only matches exactly; nested routes match
/// by prefix.
pub fn route_is_active(pathname: &str, href: &str) -> bool {
    if href == "/" {
        pathname == "/"
    } else {
        pathname.starts_with(href)
    }
}