export type ThemeMode = "light" | "dark";

export type ThemeColor =
  | "zinc"
  | "blue"
  | "red"
  | "green"
  | "purple"
  | "orange"
  | "teal"
  | "pink"
  | "indigo"
  | "custom";

export type PresetThemeColor = Exclude<ThemeColor, "custom">;

type ColorModeValues = {
  primary: string;
  primaryForeground: string;
  ring: string;
};

export type SiteThemePalette = {
  primary: `#${string}`;
  secondary: `#${string}`;
  accent: `#${string}`;
  gradientFrom: `#${string}`;
  gradientTo: `#${string}`;
};

export type ColorPreset = {
  label: string;
  swatch: string;
  light: ColorModeValues;
  dark: ColorModeValues;
};

export const THEME_STORAGE_KEYS = {
  mode: "theme",
  color: "themeColor",
  customColor: "customThemeColor",
} as const;

export const DEFAULT_THEME_MODE: ThemeMode = "light";
export const DEFAULT_THEME_COLOR: ThemeColor = "blue";
export const DEFAULT_CUSTOM_THEME_COLOR = "#3b82f6";

export const THEME_COLOR_PRESETS: Record<PresetThemeColor, ColorPreset> = {
  zinc: {
    label: "Zinc",
    swatch: "#71717a",
    light: {
      primary: "oklch(0.205 0 0)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.708 0 0)",
    },
    dark: {
      primary: "oklch(0.985 0 0)",
      primaryForeground: "oklch(0.205 0 0)",
      ring: "oklch(0.439 0 0)",
    },
  },
  blue: {
    label: "Blue",
    swatch: "#3b82f6",
    light: {
      primary: "oklch(0.546 0.245 262.881)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.546 0.245 262.881)",
    },
    dark: {
      primary: "oklch(0.546 0.245 262.881)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.546 0.245 262.881)",
    },
  },
  red: {
    label: "Red",
    swatch: "#ef4444",
    light: {
      primary: "oklch(0.577 0.245 27.325)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.577 0.245 27.325)",
    },
    dark: {
      primary: "oklch(0.577 0.245 27.325)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.577 0.245 27.325)",
    },
  },
  green: {
    label: "Green",
    swatch: "#22c55e",
    light: {
      primary: "oklch(0.596 0.145 163.225)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.596 0.145 163.225)",
    },
    dark: {
      primary: "oklch(0.596 0.145 163.225)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.596 0.145 163.225)",
    },
  },
  purple: {
    label: "Purple",
    swatch: "#a855f7",
    light: {
      primary: "oklch(0.553 0.261 303.37)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.553 0.261 303.37)",
    },
    dark: {
      primary: "oklch(0.627 0.265 303.9)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.627 0.265 303.9)",
    },
  },
  orange: {
    label: "Orange",
    swatch: "#f97316",
    light: {
      primary: "oklch(0.705 0.213 47.604)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.705 0.213 47.604)",
    },
    dark: {
      primary: "oklch(0.705 0.213 47.604)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.705 0.213 47.604)",
    },
  },
  teal: {
    label: "Teal",
    swatch: "#14b8a6",
    light: {
      primary: "oklch(0.627 0.126 171.55)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.627 0.126 171.55)",
    },
    dark: {
      primary: "oklch(0.627 0.126 171.55)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.627 0.126 171.55)",
    },
  },
  pink: {
    label: "Pink",
    swatch: "#ec4899",
    light: {
      primary: "oklch(0.592 0.249 0.584)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.592 0.249 0.584)",
    },
    dark: {
      primary: "oklch(0.592 0.249 0.584)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.592 0.249 0.584)",
    },
  },
  indigo: {
    label: "Indigo",
    swatch: "#6366f1",
    light: {
      primary: "oklch(0.511 0.262 276.966)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.511 0.262 276.966)",
    },
    dark: {
      primary: "oklch(0.585 0.262 276.966)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.585 0.262 276.966)",
    },
  },
};

export function isThemeColor(value: string | null): value is ThemeColor {
  return value === "custom" || Boolean(value && value in THEME_COLOR_PRESETS);
}

export function resolveThemeMode(value: string | null): ThemeMode {
  return value === "dark" || value === "light" ? value : DEFAULT_THEME_MODE;
}

export function resolveThemeColor(value: string | null): ThemeColor {
  return isThemeColor(value) ? value : DEFAULT_THEME_COLOR;
}

function isHexColor(value: string | null): value is `#${string}` {
  return Boolean(value && /^#[0-9a-fA-F]{6}$/.test(value));
}

export function isHexThemeColor(value: string | null | undefined): value is `#${string}` {
  return Boolean(value && /^#[0-9a-fA-F]{6}$/.test(value));
}

export function resolveCustomThemeColor(value: string | null): `#${string}` {
  return isHexColor(value) ? value : DEFAULT_CUSTOM_THEME_COLOR;
}

function hexToRgb(value: `#${string}`) {
  const normalized = value.slice(1);
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }): `#${string}` {
  const toHex = (value: number) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}` as `#${string}`;
}

function rgbToHsl({ r, g, b }: ReturnType<typeof hexToRgb>) {
  const normalizedR = r / 255;
  const normalizedG = g / 255;
  const normalizedB = b / 255;
  const max = Math.max(normalizedR, normalizedG, normalizedB);
  const min = Math.min(normalizedR, normalizedG, normalizedB);
  const delta = max - min;
  let h = 0;
  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  if (delta !== 0) {
    if (max === normalizedR) {
      h = 60 * (((normalizedG - normalizedB) / delta) % 6);
    } else if (max === normalizedG) {
      h = 60 * ((normalizedB - normalizedR) / delta + 2);
    } else {
      h = 60 * ((normalizedR - normalizedG) / delta + 4);
    }
  }

  return {
    h: h < 0 ? h + 360 : h,
    s: s * 100,
    l: l * 100,
  };
}

function hslToRgb({ h, s, l }: { h: number; s: number; l: number }) {
  const normalizedS = Math.max(0, Math.min(100, s)) / 100;
  const normalizedL = Math.max(0, Math.min(100, l)) / 100;
  const chroma = (1 - Math.abs(2 * normalizedL - 1)) * normalizedS;
  const huePrime = ((h % 360) + 360) % 360 / 60;
  const x = chroma * (1 - Math.abs((huePrime % 2) - 1));
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;

  if (huePrime >= 0 && huePrime < 1) {
    r1 = chroma;
    g1 = x;
  } else if (huePrime < 2) {
    r1 = x;
    g1 = chroma;
  } else if (huePrime < 3) {
    g1 = chroma;
    b1 = x;
  } else if (huePrime < 4) {
    g1 = x;
    b1 = chroma;
  } else if (huePrime < 5) {
    r1 = x;
    b1 = chroma;
  } else {
    r1 = chroma;
    b1 = x;
  }

  const m = normalizedL - chroma / 2;
  return {
    r: (r1 + m) * 255,
    g: (g1 + m) * 255,
    b: (b1 + m) * 255,
  };
}

function shiftHexColor(
  color: `#${string}`,
  adjustments: { hue?: number; saturation?: number; lightness?: number },
): `#${string}` {
  const hsl = rgbToHsl(hexToRgb(color));
  return rgbToHex(
    hslToRgb({
      h: hsl.h + (adjustments.hue ?? 0),
      s: hsl.s + (adjustments.saturation ?? 0),
      l: hsl.l + (adjustments.lightness ?? 0),
    }),
  );
}

function hashSeed(seed: string) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }
  return hash;
}

export function generateSiteThemePalette(primary: `#${string}`, seed: string): SiteThemePalette {
  const hash = hashSeed(seed);
  const secondaryHueShift = 22 + (hash % 36);
  const accentHueShift = 210 + (hash % 70);
  const gradientHueShift = 300 + (hash % 40);

  return {
    primary,
    secondary: shiftHexColor(primary, {
      hue: secondaryHueShift,
      saturation: -12,
      lightness: 16,
    }),
    accent: shiftHexColor(primary, {
      hue: accentHueShift,
      saturation: 8,
      lightness: -8,
    }),
    gradientFrom: shiftHexColor(primary, {
      hue: gradientHueShift,
      saturation: -4,
      lightness: 10,
    }),
    gradientTo: shiftHexColor(primary, {
      hue: secondaryHueShift + 42,
      saturation: 4,
      lightness: -4,
    }),
  };
}

function relativeLuminance({ r, g, b }: ReturnType<typeof hexToRgb>) {
  const channel = (input: number) => {
    const normalized = input / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function getCustomThemeColors(color: `#${string}`): ColorModeValues {
  const foreground = relativeLuminance(hexToRgb(color)) > 0.45 ? "#111111" : "#ffffff";

  return {
    primary: color,
    primaryForeground: foreground,
    ring: color,
  };
}

export function applyThemeColor(
  themeColor: ThemeColor,
  mode: ThemeMode,
  customColor: `#${string}` = DEFAULT_CUSTOM_THEME_COLOR,
) {
  const colors =
    themeColor === "custom"
      ? getCustomThemeColors(customColor)
      : mode === "dark"
        ? THEME_COLOR_PRESETS[themeColor].dark
        : THEME_COLOR_PRESETS[themeColor].light;
  const root = document.documentElement.style;

  root.setProperty("--primary", colors.primary);
  root.setProperty("--primary-foreground", colors.primaryForeground);
  root.setProperty("--ring", colors.ring);
  root.setProperty("--sidebar-primary", colors.primary);
  root.setProperty("--sidebar-primary-foreground", colors.primaryForeground);
}
