"use client";

import { Button } from "@/components/ui/button";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      className="size-10 rounded-full bg-background/80 shadow-sm backdrop-blur-sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <FiSun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <FiMoon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
