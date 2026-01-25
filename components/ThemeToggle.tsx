"use client";

import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "6px 12px",
        borderRadius: 6,
        border: "1px solid #ddd",
        cursor: "pointer",
      }}
    >
      Theme: {theme === "light" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}
