import React, { useEffect, useState } from "react";

import { applyTheme, ThemeMode } from "../theme/theme";

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as ThemeMode) || "dark";
    setMode(saved);
    applyTheme(saved);
  }, []);

  const toggle = () => {
    const next: ThemeMode = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  return (
    <button className="button ghost" onClick={toggle}>
      {mode === "dark" ? "Light" : "Dark"} Mode
    </button>
  );
}
