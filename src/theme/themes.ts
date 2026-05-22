

export const theme = {
  colors: {
    bg: "#0A0D14",
    surface: "#12161F",
    surfaceAlt: "#1A1F2E",
    surfaceHover: "#1E2535",
    border: "#252C3D",
    borderLight: "#2E3650",
    primary: "#1E6FFF",
    primaryDark: "#1557D4",
    primaryGlow: "rgba(30,111,255,0.18)",
    success: "#00C97A",
    successBg: "rgba(0,201,122,0.12)",
    warning: "#FFBF00",
    warningBg: "rgba(255,191,0,0.12)",
    danger: "#FF4455",
    dangerBg: "rgba(255,68,85,0.12)",
    text: "#F0F4FF",
    textSub: "#8892AA",
    textMuted: "#4D5A73",
    white: "#FFFFFF",
  },
  font: {
    display: "'Barlow Condensed', sans-serif",
    body: "'DM Sans', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 18,
    xl: 24,
    full: 999,
  },
  shadow: {
    card: "0 2px 16px rgba(0,0,0,0.4)",
    float: "0 8px 32px rgba(0,0,0,0.5)",
    glow: "0 0 24px rgba(30,111,255,0.25)",
  },
} as const;

// Tipo inferido automaticamente do objeto acima
export type Theme = typeof theme;

// Tipos auxiliares úteis para props de componentes
export type ThemeColors = keyof Theme["colors"];
export type ThemeFonts = keyof Theme["font"];
export type ThemeRadius = keyof Theme["radius"];
export type ThemeShadows = keyof Theme["shadow"];