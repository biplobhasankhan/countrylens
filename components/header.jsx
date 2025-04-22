"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuRef])

  // Close menu when window is resized to desktop size
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="logo">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          CountryLens
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {mobileMenuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        <nav className={`nav ${mobileMenuOpen ? "nav-mobile-open" : ""}`} ref={menuRef}>
          <Link href="/">
            <button className="btn btn-outline">Home</button>
          </Link>
          <Link href="/about">
            <button className="btn btn-outline">About</button>
          </Link>
          <Link href="/compare">
            <button className="btn btn-outline">Compare Countries</button>
          </Link>
          <Link href="/map">
            <button className="btn btn-outline">Map</button>
          </Link>

          {/* New Feature Links */}
          <div className="nav-dropdown">
            <button className="btn btn-outline nav-dropdown-trigger">
              Travel Tools
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="dropdown-icon"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="nav-dropdown-content">
              <Link href="/travel-info">
                <button className="dropdown-item">Visa & Advisory</button>
              </Link>
              <Link href="/currency">
                <button className="dropdown-item">Currency</button>
              </Link>
              <Link href="/time-zone">
                <button className="dropdown-item">Time Zones</button>
              </Link>
              <Link href="/language">
                <button className="dropdown-item">Language</button>
              </Link>
            </div>
          </div>

          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
            <div className="theme-toggle-track">
              <div className="theme-toggle-thumb"></div>
              {theme === "dark" ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="theme-icon moon-icon"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="theme-icon sun-icon"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              )}
            </div>
          </button>
        </nav>
      </div>
    </header>
  )
}