"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function WorldMap() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

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
    if (searchTerm) {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredCountries(filtered)
    } else {
      setFilteredCountries(countries)
    }
  }, [searchTerm, countries])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCountryClick = (country) => {
    setSelectedCountry(country)
  }

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
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
    },
    subtitle: {
      fontSize: "16px",
      color: isDarkMode ? "#9ca3af" : "#6b7280",
      marginBottom: "30px",
    },
    searchContainer: {
      position: "relative",
      maxWidth: "400px",
      marginBottom: "30px",
    },
    searchInput: {
      padding: "10px 15px 10px 40px",
      borderRadius: "6px",
      border: `1px solid ${isDarkMode ? "#4b5563" : "#d1d5db"}`,
      backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
      width: "100%",
      fontSize: "14px",
    },
    searchIcon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: isDarkMode ? "#9ca3af" : "#6b7280",
    },
    mapGrid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "30px",
    },
    mapContainer: {
      height: "500px",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: `0 4px 6px -1px ${isDarkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"}`,
    },
    countryList: {
      height: "500px",
      overflowY: "auto",
      paddingRight: "10px",
    },
    countryCard: {
      display: "flex",
      alignItems: "center",
      padding: "10px",
      borderRadius: "6px",
      marginBottom: "8px",
      cursor: "pointer",
      backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
      border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
      transition: "all 0.2s",
    },
    selectedCountryCard: {
      borderColor: "#10b981",
      backgroundColor: isDarkMode ? "#0f766e20" : "#d1fae520",
    },
    countryFlag: {
      width: "40px",
      height: "24px",
      objectFit: "cover",
      borderRadius: "4px",
      marginRight: "12px",
    },
    countryName: {
      fontSize: "16px",
      fontWeight: "500",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
    },
    countryRegion: {
      fontSize: "12px",
      color: isDarkMode ? "#9ca3af" : "#6b7280",
    },
    selectedCountryDetails: {
      marginTop: "30px",
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
      border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
      boxShadow: `0 4px 6px -1px ${isDarkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"}`,
    },
    countryDetailsHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    countryDetailsFlag: {
      width: "60px",
      height: "36px",
      objectFit: "cover",
      borderRadius: "4px",
      marginRight: "15px",
    },
    countryDetailsName: {
      fontSize: "20px",
      fontWeight: "bold",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
    },
    countryDetailsOfficialName: {
      fontSize: "14px",
      color: isDarkMode ? "#9ca3af" : "#6b7280",
    },
    countryDetailsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "15px",
      marginBottom: "20px",
    },
    countryDetailItem: {
      backgroundColor: isDarkMode ? "#374151" : "#f9fafb",
      padding: "10px",
      borderRadius: "6px",
    },
    countryDetailLabel: {
      fontSize: "12px",
      color: isDarkMode ? "#9ca3af" : "#6b7280",
      marginBottom: "4px",
    },
    countryDetailValue: {
      fontSize: "16px",
      fontWeight: "500",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
    },
    viewDetailsButton: {
      display: "flex",
      justifyContent: "flex-end",
    },
    skeleton: {
      backgroundColor: isDarkMode ? "#374151" : "#e5e7eb",
      borderRadius: "4px",
      animation: "pulse 1.5s infinite",
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

      <h1 style={styles.title}>World Map Explorer</h1>
      <p style={styles.subtitle}>Explore countries on the map and discover detailed information.</p>

      <div style={styles.searchContainer}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={styles.searchIcon}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.mapGrid}>
        <div style={styles.mapContainer}>
          {loading ? (
            <div style={{ ...styles.skeleton, height: "100%" }}></div>
          ) : (
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              src={
                selectedCountry
                  ? `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${selectedCountry.name.common}`
                  : "https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=20,0&zoom=2"
              }
              allowFullScreen
            ></iframe>
          )}
        </div>

        <div style={styles.countryList}>
          {loading ? (
            Array(10)
              .fill(0)
              .map((_, index) => (
                <div key={index} style={{ ...styles.skeleton, height: "44px", marginBottom: "8px" }}></div>
              ))
          ) : filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div
                key={country.cca3}
                style={{
                  ...styles.countryCard,
                  ...(selectedCountry?.cca3 === country.cca3 ? styles.selectedCountryCard : {}),
                }}
                onClick={() => handleCountryClick(country)}
              >
                <img
                  src={country.flags.svg || country.flags.png}
                  alt={`Flag of ${country.name.common}`}
                  style={styles.countryFlag}
                />
                <div>
                  <div style={styles.countryName}>{country.name.common}</div>
                  <div style={styles.countryRegion}>{country.region}</div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <p>No countries found</p>
            </div>
          )}
        </div>
      </div>

      {selectedCountry && (
        <div style={styles.selectedCountryDetails}>
          <div style={styles.countryDetailsHeader}>
            <img
              src={selectedCountry.flags.svg || selectedCountry.flags.png}
              alt={`Flag of ${selectedCountry.name.common}`}
              style={styles.countryDetailsFlag}
            />
            <div>
              <div style={styles.countryDetailsName}>{selectedCountry.name.common}</div>
              <div style={styles.countryDetailsOfficialName}>{selectedCountry.name.official}</div>
            </div>
          </div>

          <div style={styles.countryDetailsGrid}>
            <div style={styles.countryDetailItem}>
              <div style={styles.countryDetailLabel}>Capital</div>
              <div style={styles.countryDetailValue}>{selectedCountry.capital?.[0] || "N/A"}</div>
            </div>
            <div style={styles.countryDetailItem}>
              <div style={styles.countryDetailLabel}>Region</div>
              <div style={styles.countryDetailValue}>{selectedCountry.region}</div>
            </div>
            <div style={styles.countryDetailItem}>
              <div style={styles.countryDetailLabel}>Population</div>
              <div style={styles.countryDetailValue}>{new Intl.NumberFormat().format(selectedCountry.population)}</div>
            </div>
          </div>

          <div style={styles.viewDetailsButton}>
            <Link href={`/country/${selectedCountry.cca3}`}>
              <button style={{ ...styles.button, ...styles.primaryButton }}>View Details</button>
            </Link>
          </div>
        </div>
      )}

      <footer style={styles.footer}>
        <p>Made with ❤️ by Biplob Hasan Khan</p>
        <p style={{ marginTop: "5px" }}>© {new Date().getFullYear()} CountryLens. All rights reserved.</p>
      </footer>
    </div>
  )
}
