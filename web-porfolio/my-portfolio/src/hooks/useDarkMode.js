import { useEffect, useState } from "react";

const THEME_EVENT = "theme-change";

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply to DOM + persist + broadcast to other hook instances
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: isDark }));
  }, [isDark]);

  // Listen for changes from other hook instances (e.g. toggle in MainLayout → Header)
  useEffect(() => {
    const handler = (e) => {
      if (e.detail !== isDark) setIsDark(e.detail);
    };
    window.addEventListener(THEME_EVENT, handler);
    return () => window.removeEventListener(THEME_EVENT, handler);
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return { isDark, toggle };
};
