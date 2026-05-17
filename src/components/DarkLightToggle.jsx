"use client";

import { Moon, Sun } from "@gravity-ui/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function DarkLightToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-default-100 transition-colors"
    >
      {isDark ? (
        <Sun className="size-5 text-default-600" />
      ) : (
        <Moon className="size-5 text-default-600" />
      )}
    </button>
  );
}