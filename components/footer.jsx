"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear())
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className={`footer ${isVisible ? "footer-visible" : ""}`}>
      <div className="footer-waves">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      <div className="footer-content">
        <div className="footer-section brand-section">
          <div className="footer-logo">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="footer-logo-icon"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            <h2 className="footer-brand">CountryLens</h2>
          </div>
          <p className="footer-description">
            A modern dashboard to explore and learn about countries around the world.
          </p>
          <div className="footer-social">
            <a
              href="https://github.com/biplobhasankhan"
              className="footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a href="mailto:biplobhasankhan@gmail.com" className="footer-social-link" aria-label="Email">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              className="footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-section links-section">
          <h3 className="footer-title">Navigation</h3>
          <ul className="footer-links">
            <li>
              <Link href="/" className="footer-link">
                <span className="footer-link-icon">→</span>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="footer-link">
                <span className="footer-link-icon">→</span>
                About
              </Link>
            </li>
            <li>
              <Link href="/compare" className="footer-link">
                <span className="footer-link-icon">→</span>
                Compare Countries
              </Link>
            </li>
            <li>
              <Link href="/map" className="footer-link">
                <span className="footer-link-icon">→</span>
                Map Explorer
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section data-section">
          <h3 className="footer-title">Data Sources</h3>
          <ul className="footer-links">
            <li>
              <a href="https://restcountries.com/" className="footer-link" target="_blank" rel="noopener noreferrer">
                <span className="footer-link-icon">→</span>
                REST Countries API
              </a>
            </li>
            <li>
              <a
                href="https://developers.google.com/maps/documentation/embed/get-started"
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="footer-link-icon">→</span>
                Google Maps Embed API
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-credit">
          Made with
          <span className="footer-heart">❤️</span>
          by Biplob Hasan Khan
        </div>
        <div className="footer-copyright">© {year} CountryLens. All rights reserved.</div>
      </div>
    </footer>
  )
}
