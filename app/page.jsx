"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function Home() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"]

  useEffect(() => {
    // Check for dark mode preference
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(prefersDark)
    }

    const fetchCountries = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://restcountries.com/v3.1/all")
        if (!response.ok) {
          throw new Error("Failed to fetch countries")
        }
        const data = await response.json()
        setCountries(data)
        setFilteredCountries(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  useEffect(() => {
    let result = countries

    if (searchTerm) {
      result = result.filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (selectedRegion) {
      result = result.filter((country) => country.region === selectedRegion)
    }

    setFilteredCountries(result)
  }, [searchTerm, selectedRegion, countries])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleRegionSelect = (region) => {
    setSelectedRegion(region === selectedRegion ? "" : region)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const formatPopulation = (population) => {
    return new Intl.NumberFormat().format(population)
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
    searchContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      marginBottom: "30px",
    },
    searchInput: {
      padding: "10px 15px",
      borderRadius: "6px",
      border: `1px solid ${isDarkMode ? "#4b5563" : "#d1d5db"}`,
      backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
      width: "100%",
      maxWidth: "400px",
      fontSize: "14px",
    },
    regionFilters: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },
    regionButton: {
      padding: "6px 12px",
      borderRadius: "6px",
      border: `1px solid ${isDarkMode ? "#4b5563" : "#d1d5db"}`,
      backgroundColor: "transparent",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
      cursor: "pointer",
      fontSize: "14px",
    },
    activeRegionButton: {
      backgroundColor: "#10b981",
      color: "white",
      border: "none",
    },
    countryGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
    },
    countryCard: {
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: `0 4px 6px -1px ${isDarkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"}`,
      backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
      transition: "transform 0.3s ease",
      cursor: "pointer",
    },
    countryCardHover: {
      transform: "translateY(-5px)",
    },
    flagContainer: {
      height: "160px",
      overflow: "hidden",
    },
    flag: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    cardContent: {
      padding: "15px",
    },
    countryName: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
    },
    countryInfo: {
      fontSize: "14px",
      color: isDarkMode ? "#9ca3af" : "#6b7280",
      marginBottom: "6px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    loadingGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
    },
    skeleton: {
      backgroundColor: isDarkMode ? "#374151" : "#e5e7eb",
      borderRadius: "4px",
      animation: "pulse 1.5s infinite",
    },
    skeletonCard: {
      borderRadius: "8px",
      overflow: "hidden",
      backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
      boxShadow: `0 4px 6px -1px ${isDarkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"}`,
    },
    themeToggle: {
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
      fontSize: "14px",
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

  if (error) {
    return (
      <div style={styles.container}>
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <h2 style={{ fontSize: "24px", color: "#ef4444", marginBottom: "20px" }}>Error</h2>
          <p style={{ marginBottom: "20px" }}>{error}</p>
          <button onClick={() => window.location.reload()} style={{ ...styles.button, ...styles.primaryButton }}>
            Try Again
          </button>
        </div>
      </div>
    )
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
          <Link href="/about">
            <button style={styles.button}>About</button>
          </Link>
          <Link href="/compare">
            <button style={styles.button}>Compare Countries</button>
          </Link>
          <button onClick={toggleDarkMode} style={styles.themeToggle}>
            {isDarkMode ? (
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
                width="20"
                height="20"
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
            <span>Toggle theme</span>
          </button>
        </div>
      </header>

      <div style={styles.searchContainer}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: "relative", left: "30px", color: "#9ca3af" }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ ...styles.searchInput, paddingLeft: "40px" }}
          />
        </div>
        <div style={styles.regionFilters}>
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => handleRegionSelect(region)}
              style={{
                ...styles.regionButton,
                ...(selectedRegion === region ? styles.activeRegionButton : {}),
              }}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600" }}>{filteredCountries.length} Countries Found</h2>
        <Link href="/map">
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
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            View on Map
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </Link>
      </div>

      {loading ? (
        <div style={styles.loadingGrid}>
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div key={index} style={styles.skeletonCard}>
                <div style={{ ...styles.skeleton, height: "160px" }}></div>
                <div style={{ padding: "15px" }}>
                  <div style={{ ...styles.skeleton, height: "24px", width: "75%", marginBottom: "10px" }}></div>
                  <div style={{ ...styles.skeleton, height: "16px", width: "50%", marginBottom: "8px" }}></div>
                  <div style={{ ...styles.skeleton, height: "16px", width: "60%", marginBottom: "8px" }}></div>
                  <div style={{ ...styles.skeleton, height: "16px", width: "40%" }}></div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div style={styles.countryGrid}>
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <Link href={`/country/${country.cca3}`} key={country.cca3} style={{ textDecoration: "none" }}>
                <div
                  style={styles.countryCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  <div style={styles.flagContainer}>
                    <img
                      src={country.flags.svg || country.flags.png}
                      alt={`Flag of ${country.name.common}`}
                      style={styles.flag}
                    />
                  </div>
                  <div style={styles.cardContent}>
                    <h3 style={styles.countryName}>{country.name.common}</h3>
                    <div style={styles.countryInfo}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: "#10b981" }}
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{country.region}</span>
                    </div>
                    <div style={styles.countryInfo}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: "#10b981" }}
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <span>{formatPopulation(country.population)}</span>
                    </div>
                    <div style={styles.countryInfo}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: "#10b981" }}
                      >
                        <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                        <path d="M7 3.34V5a3 3 0 0 0 3 3h0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2h2" />
                        <path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      <span>{country.capital?.[0] || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "50px 0" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "10px" }}>No countries found</h3>
              <p style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}

      <footer style={styles.footer}>
        <p>Made with ❤️ by Biplob Hasan Khan</p>
        <p style={{ marginTop: "5px" }}>© {new Date().getFullYear()} CountryLens. All rights reserved.</p>
      </footer>
    </div>
  )
}
