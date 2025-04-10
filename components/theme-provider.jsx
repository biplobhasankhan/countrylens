"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext({
  theme: "dark",
  setTheme: () => null,
  toggleTheme: () => null,
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark")
  const [mounted, setMounted] = useState(false)

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    if (mounted) {
      localStorage.setItem("theme", newTheme)
    }
  }

  useEffect(() => {
    setMounted(true)
    // Get theme from localStorage or use system preference
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

    setTheme(savedTheme)
  }, [])

  useEffect(() => {
    if (!mounted) return

    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
  }, [theme, mounted])

  const value = {
    theme,
    setTheme: (newTheme) => {
      setTheme(newTheme)
      if (mounted) {
        localStorage.setItem("theme", newTheme)
      }
    },
    toggleTheme,
  }

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
