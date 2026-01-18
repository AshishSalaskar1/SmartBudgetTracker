export type ThemeMode = "dark" | "light";

export const themeTokens = {
  dark: {
    background: "#0F1115",
    surface: "#12141A",
    text: "#E6E6E6",
  },
  light: {
    background: "#F7F7FB",
    surface: "#FFFFFF",
    text: "#111827",
  },
};

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  root.style.setProperty("--bg", themeTokens[mode].background);
  root.style.setProperty("--surface", themeTokens[mode].surface);
  root.style.setProperty("--text", themeTokens[mode].text);
}
