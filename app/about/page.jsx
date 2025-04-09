"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function About() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check for dark mode preference
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(prefersDark)
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Inline styles
  const styles = {
    container: {
      fontFamily: "Inter, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: isDarkMode ? "#111827" : "#ffffff",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
      padding: "10px 0",
      borderBottom: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
    },
    logo: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#10b981",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
    },
    nav: {
      display: "flex",
      gap: "15px",
    },
    button: {
      padding: "8px 16px",
      borderRadius: "6px",
      border: `1px solid ${isDarkMode ? "#4b5563" : "#d1d5db"}`,
      backgroundColor: "transparent",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
      cursor: "pointer",
      fontSize: "14px",
      transition: "all 0.2s",
    },
    primaryButton: {
      backgroundColor: "#10b981",
      color: "white",
      border: "none",
    },
    backButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "30px",
    },
    title: {
      fontSize: "36px",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
      color: "#10b981",
    },
    subtitle: {
      fontSize: "18px",
      textAlign: "center",
      marginBottom: "40px",
      color: isDarkMode ? "#9ca3af" : "#6b7280",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "30px",
      marginBottom: "40px",
    },
    card: {
      backgroundColor: isDarkMode ? "#1f2937" : "#f9fafb",
      borderRadius: "8px",
      padding: "30px",
      boxShadow: `0 4px 6px -1px ${isDarkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"}`,
    },
    cardTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
    },
    cardText: {
      color: isDarkMode ? "#9ca3af" : "#6b7280",
      lineHeight: "1.6",
    },
    featureList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    featureItem: {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "10px",
      color: isDarkMode ? "#9ca3af" : "#6b7280",
    },
    featureBullet: {
      color: "#10b981",
      marginRight: "10px",
      fontWeight: "bold",
    },
    techGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "20px",
      marginBottom: "40px",
    },
    techCard: {
      backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: `0 4px 6px -1px ${isDarkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"}`,
      border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
    },
    techTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "5px",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
    },
    techDescription: {
      fontSize: "14px",
      color: isDarkMode ? "#9ca3af" : "#6b7280",
    },
    connectSection: {
      textAlign: "center",
      marginBottom: "40px",
    },
    connectTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      flexWrap: "wrap",
    },
    footer: {
      marginTop: "50px",
      padding: "20px 0",
      borderTop: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
      textAlign: "center",
      color: isDarkMode ? "#9ca3af" : "#6b7280",
      fontSize: "14px",
    },
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <a href="/" style={styles.logo}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "10px", color: "#10b981" }}
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          CountryLens
        </a>
        <div style={styles.nav}>
          <Link href="/">
            <button style={styles.button}>Home</button>
          </Link>
          <Link href="/compare">
            <button style={styles.button}>Compare Countries</button>
          </Link>
          <button
            onClick={toggleDarkMode}
            style={{ ...styles.button, display: "flex", alignItems: "center", gap: "5px" }}
          >
            {isDarkMode ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
            Toggle theme
          </button>
        </div>
      </header>

      <Link href="/">
        <button style={{ ...styles.button, ...styles.backButton }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to Countries
        </button>
      </Link>

      <h1 style={styles.title}>About CountryLens</h1>
      <p style={styles.subtitle}>A modern dashboard to explore and learn about countries around the world</p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Project Overview</h2>
          <p style={styles.cardText}>
            CountryLens is a comprehensive dashboard that provides detailed information about countries around the
            world. The application is designed to be intuitive, informative, and visually appealing.
          </p>
          <p style={{ ...styles.cardText, marginTop: "15px" }}>
            Whether you're a student, traveler, or just curious about the world, CountryLens offers a wealth of
            information about countries, their geography, demographics, and more.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Features</h2>
          <ul style={styles.featureList}>
            <li style={styles.featureItem}>
              <span style={styles.featureBullet}>•</span>
              Search and filter countries by name, region, and more
            </li>
            <li style={styles.featureItem}>
              <span style={styles.featureBullet}>•</span>
              Detailed country profiles with comprehensive information
            </li>
            <li style={styles.featureItem}>
              <span style={styles.featureBullet}>•</span>
              Compare statistics between countries
            </li>
            <li style={styles.featureItem}>
              <span style={styles.featureBullet}>•</span>
              Interactive world map for geographical exploration
            </li>
            <li style={styles.featureItem}>
              <span style={styles.featureBullet}>•</span>
              Responsive design for all devices
            </li>
          </ul>
        </div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Technologies Used</h2>
        <div style={styles.techGrid}>
          <div style={styles.techCard}>
            <h3 style={styles.techTitle}>React</h3>
            <p style={styles.techDescription}>Frontend library for building user interfaces</p>
          </div>
          <div style={styles.techCard}>
            <h3 style={styles.techTitle}>Next.js</h3>
            <p style={styles.techDescription}>React framework for production</p>
          </div>
          <div style={styles.techCard}>
            <h3 style={styles.techTitle}>REST Countries API</h3>
            <p style={styles.techDescription}>Data source for country information</p>
          </div>
          <div style={styles.techCard}>
            <h3 style={styles.techTitle}>Google Maps</h3>
            <p style={styles.techDescription}>Interactive maps integration</p>
          </div>
          <div style={styles.techCard}>
            <h3 style={styles.techTitle}>Custom SVG Icons</h3>
            <p style={styles.techDescription}>Beautiful & consistent icons</p>
          </div>
          <div style={styles.techCard}>
            <h3 style={styles.techTitle}>CSS-in-JS</h3>
            <p style={styles.techDescription}>Inline styling for components</p>
          </div>
        </div>
      </div>

      <div style={styles.connectSection}>
        <h2 style={styles.connectTitle}>Connect & Contribute</h2>
        <div style={styles.buttonGroup}>
          <a href="https://github.com/biplobhasankhan" target="_blank" rel="noopener noreferrer">
            <button style={{ ...styles.button, display: "flex", alignItems: "center", gap: "5px" }}>
              <svg
                width="16"
                height="16"
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
              GitHub Profile
            </button>
          </a>
          <a href="https://github.com/biplobhasankhan/CountryLens" target="_blank" rel="noopener noreferrer">
            <button style={{ ...styles.button, display: "flex", alignItems: "center", gap: "5px" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Source Code
            </button>
          </a>
          <a href="https://restcountries.com/" target="_blank" rel="noopener noreferrer">
            <button style={{ ...styles.button, display: "flex", alignItems: "center", gap: "5px" }}>
              <svg
                width="16"
                height="16"
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
              REST Countries API
            </button>
          </a>
        </div>
        <p style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          Made with
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#ef4444"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ margin: "0 5px" }}
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          by Biplob Hasan Khan
        </p>
      </div>

      <footer style={styles.footer}>
        <p>Made with ❤️ by Biplob Hasan Khan</p>
        <p style={{ marginTop: "5px" }}>© {new Date().getFullYear()} CountryLens. All rights reserved.</p>
      </footer>
    </div>
  )
}
