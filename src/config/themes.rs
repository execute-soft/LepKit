pub struct ThemeDef {
    pub name: &'static str,
    pub light: &'static str,
    pub dark: &'static str,
}

pub const THEMES: &[ThemeDef] = &[
    ThemeDef { name: "violet", light: "#8B5CF6", dark: "#A78BFA" },
    ThemeDef { name: "teal", light: "#14B8A6", dark: "#5EEAD4" },
    ThemeDef { name: "orange", light: "#F97316", dark: "#FDBA74" },
    ThemeDef { name: "red", light: "#EF4444", dark: "#FCA5A5" },
    ThemeDef { name: "blue", light: "#3B82F6", dark: "#60A5FA" },
    ThemeDef { name: "black-white", light: "#000000", dark: "#FFFFFF" },
];

pub const DEFAULT_THEME: &str = "teal";
pub const DEFAULT_HEX: &str = "#14B8A6";