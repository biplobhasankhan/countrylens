"use client"

import { useState, useEffect, useRef } from "react"
import { MoonIcon, SunIcon } from "@/components/icons"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  if (!mounted) {
    return null
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="icon"
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-gray-700 h-10 w-10 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {theme === "dark" ? (
          <MoonIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <SunIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className="flex w-full items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                setTheme("light")
                setIsOpen(false)
              }}
              role="menuitem"
            >
              <SunIcon className="mr-2 h-4 w-4" />
              <span>Light</span>
            </button>
            <button
              className="flex w-full items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                setTheme("dark")
                setIsOpen(false)
              }}
              role="menuitem"
            >
              <MoonIcon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </button>
            <button
              className="flex w-full items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                setTheme("system")
                setIsOpen(false)
              }}
              role="menuitem"
            >
              <span className="ml-6">System</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
