"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function CountryDetail({ params }) {
  const { id } = params
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [borderCountries, setBorderCountries] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  useEffect(() => {
    // Check for dark mode preference
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(prefersDark)
    }

    const fetchCountry = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch country")
        }
        const data = await response.json()
        setCountry(data[0])

        // Fetch border countries if they exist
        if (data[0].borders && data[0].borders.length > 0) {
          const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${data[0].borders.join(",")}`)
          if (borderResponse.ok) {
            const borderData = await borderResponse.json()
            setBorderCountries(borderData)
          }
        }

        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchCountry()
  }, [id])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const formatPopulation = (population) => {
    return new Intl.NumberFormat().format(population)
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num)
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
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "40px",
      marginBottom: "40px",
    },
    flagContainer: {
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: `0 4px 6px -1px ${isDarkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"}`,
    },
    flag: {
      width: "100%",
      height: "auto",
      display: "block",
    },
    countryName: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
    },
    countryOfficialName: {
      fontSize: "18px",
      color: isDarkMode ? "#9ca3af" : "#6b7280",
      marginBottom: "30px",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginBottom: "30px",
    },
    infoItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
    },
    infoLabel: {
      fontSize: "14px",
      color: isDarkMode ? "#9ca3af" : "#6b7280",
    },
    infoValue: {
      fontSize: "16px",
      fontWeight: "500",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
    },
    tabs: {
      display: "flex",
      borderBottom: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
      marginBottom: "30px",
    },
    tab: {
      padding: "12px 20px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
      color: isDarkMode ? "#9ca3af" : "#6b7280",
      borderBottom: "2px solid transparent",
    },
    activeTab: {
      color: "#10b981",
      borderBottom: "2px solid #10b981",
    },
    tabContent: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "20px",
    },
    card: {
      backgroundColor: isDarkMode ? "#1f2937" : "#f9fafb",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: `0 4px 6px -1px ${isDarkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"}`,
    },
    cardTitle: {
      fontSize: "14px",
      color: isDarkMode ? "#9ca3af" : "#6b7280",
      marginBottom: "5px",
    },
    cardValue: {
      fontSize: "18px",
      fontWeight: "600",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
    },
    mapContainer: {
      height: "400px",
      borderRadius: "8px",
      overflow: "hidden",
      marginTop: "30px",
    },
    borderCountries: {
      marginTop: "30px",
    },
    borderCountriesTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "15px",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
    },
    borderCountriesGrid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },
    borderCountryButton: {
      padding: "8px 16px",
      borderRadius: "6px",
      border: `1px solid ${isDarkMode ? "#4b5563" : "#d1d5db"}`,
      backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
      color: isDarkMode ? "#e5e7eb" : "#1f2937",
      cursor: "pointer",
      fontSize: "14px",
      textDecoration: "none",
      display: "inline-block",
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

      {loading ? (
        <div>
          <div style={styles.grid}>
            <div style={{ ...styles.skeleton, height: "400px" }}></div>
            <div>
              <div style={{ ...styles.skeleton, height: "40px", width: "70%", marginBottom: "10px" }}></div>
              <div style={{ ...styles.skeleton, height: "24px", width: "50%", marginBottom: "30px" }}></div>
              <div style={styles.infoGrid}>
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} style={{ ...styles.skeleton, height: "24px" }}></div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : country ? (
        <div>
          <div style={styles.grid}>
            <div style={styles.flagContainer}>
              <img
                src={country.flags.svg || country.flags.png}
                alt={`Flag of ${country.name.common}`}
                style={styles.flag}
              />
            </div>

            <div>
              <h1 style={styles.countryName}>{country.name.common}</h1>
              <p style={styles.countryOfficialName}>{country.name.official}</p>

              <div style={styles.infoGrid}>
                <InfoItem
                  icon={
                    <svg
                      width="20"
                      height="20"
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
                  }
                  label="Region"
                  value={country.region}
                  styles={styles}
                />
                <InfoItem
                  icon={
                    <svg
                      width="20"
                      height="20"
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
                  }
                  label="Subregion"
                  value={country.subregion || "N/A"}
                  styles={styles}
                />
                <InfoItem
                  icon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "#10b981" }}
                    >
                      <path d="M6 22V2a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v20" />
                      <path d="M18 11h.01" />
                      <path d="M18 6h.01" />
                      <path d="M18 16h.01" />
                      <path d="M6 16h12" />
                      <path d="M2 22h20" />
                    </svg>
                  }
                  label="Capital"
                  value={country.capital?.[0] || "N/A"}
                  styles={styles}
                />
                <InfoItem
                  icon={
                    <svg
                      width="20"
                      height="20"
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
                  }
                  label="Population"
                  value={formatPopulation(country.population)}
                  styles={styles}
                />
                <InfoItem
                  icon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "#10b981" }}
                    >
                      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                      <line x1="9" x2="9" y1="3" y2="18" />
                      <line x1="15" x2="15" y1="6" y2="21" />
                    </svg>
                  }
                  label="Area"
                  value={`${formatNumber(country.area)} km²`}
                  styles={styles}
                />
                <InfoItem
                  icon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "#10b981" }}
                    >
                      <path d="m5 8 6 6" />
                      <path d="m4 14 6-6 2-3" />
                      <path d="M2 5h12" />
                      <path d="M7 2h1" />
                      <path d="m22 22-5-10-5 10" />
                      <path d="M14 18h6" />
                    </svg>
                  }
                  label="Languages"
                  value={country.languages ? Object.values(country.languages).join(", ") : "N/A"}
                  styles={styles}
                />
              </div>
            </div>
          </div>

          <div>
            <div style={styles.tabs}>
              <div
                style={{
                  ...styles.tab,
                  ...(activeTab === "details" ? styles.activeTab : {}),
                }}
                onClick={() => setActiveTab("details")}
              >
                Details
              </div>
              <div
                style={{
                  ...styles.tab,
                  ...(activeTab === "geography" ? styles.activeTab : {}),
                }}
                onClick={() => setActiveTab("geography")}
              >
                Geography
              </div>
              <div
                style={{
                  ...styles.tab,
                  ...(activeTab === "economy" ? styles.activeTab : {}),
                }}
                onClick={() => setActiveTab("economy")}
              >
                Economy
              </div>
            </div>

            {activeTab === "details" && (
              <div>
                <div style={styles.tabContent}>
                  <div style={styles.card}>
                    <div style={styles.cardTitle}>Top Level Domain</div>
                    <div style={styles.cardValue}>{country.tld?.[0] || "N/A"}</div>
                  </div>
                  <div style={styles.card}>
                    <div style={styles.cardTitle}>Calling Code</div>
                    <div style={styles.cardValue}>
                      {country.idd?.root ? `${country.idd.root}${country.idd.suffixes?.[0] || ""}` : "N/A"}
                    </div>
                  </div>
                  <div style={styles.card}>
                    <div style={styles.cardTitle}>Timezones</div>
                    <div style={styles.cardValue} title={country.timezones?.join(", ")}>
                      {country.timezones?.[0] || "N/A"}
                    </div>
                  </div>
                </div>

                {borderCountries.length > 0 && (
                  <div style={styles.borderCountries}>
                    <h3 style={styles.borderCountriesTitle}>Border Countries</h3>
                    <div style={styles.borderCountriesGrid}>
                      {borderCountries.map((border) => (
                        <Link key={border.cca3} href={`/country/${border.cca3}`}>
                          <div style={styles.borderCountryButton}>{border.name.common}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "geography" && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
                  <div style={styles.card}>
                    <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>Location</h3>
                    <p style={{ marginBottom: "10px" }}>
                      <span style={{ fontWeight: "500" }}>Latitude/Longitude:</span> {country.latlng?.[0].toFixed(2)}°,{" "}
                      {country.latlng?.[1].toFixed(2)}°
                    </p>
                    <p style={{ marginBottom: "10px" }}>
                      <span style={{ fontWeight: "500" }}>Region:</span> {country.region}
                    </p>
                    <p>
                      <span style={{ fontWeight: "500" }}>Subregion:</span> {country.subregion || "N/A"}
                    </p>
                  </div>

                  <div style={styles.card}>
                    <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>Geography</h3>
                    <p style={{ marginBottom: "10px" }}>
                      <span style={{ fontWeight: "500" }}>Area:</span> {formatNumber(country.area)} km²
                    </p>
                    <p style={{ marginBottom: "10px" }}>
                      <span style={{ fontWeight: "500" }}>Land Borders:</span>{" "}
                      {country.borders ? `${country.borders.length} countries` : "None (Island)"}
                    </p>
                    <p>
                      <span style={{ fontWeight: "500" }}>Landlocked:</span> {country.landlocked ? "Yes" : "No"}
                    </p>
                  </div>
                </div>

                <div style={styles.mapContainer}>
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${country.name.common}`}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {activeTab === "economy" && (
              <div style={styles.tabContent}>
                <div style={styles.card}>
                  <div style={styles.cardTitle}>Currencies</div>
                  <div style={styles.cardValue}>
                    {country.currencies
                      ? Object.values(country.currencies)
                          .map((currency) => `${currency.name} (${currency.symbol || ""})`)
                          .join(", ")
                      : "N/A"}
                  </div>
                </div>
                <div style={styles.card}>
                  <div style={styles.cardTitle}>Driving Side</div>
                  <div style={styles.cardValue}>
                    {country.car?.side ? country.car.side.charAt(0).toUpperCase() + country.car.side.slice(1) : "N/A"}
                  </div>
                </div>
                <div style={styles.card}>
                  <div style={styles.cardTitle}>UN Member</div>
                  <div style={styles.cardValue}>{country.unMember ? "Yes" : "No"}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Country not found</h2>
          <p style={{ marginBottom: "20px" }}>We couldn't find the country you're looking for.</p>
          <Link href="/">
            <button style={{ ...styles.button, ...styles.primaryButton }}>Return to Home</button>
          </Link>
        </div>
      )}

      <footer style={styles.footer}>
        <p>Made with ❤️ by Biplob Hasan Khan</p>
        <p style={{ marginTop: "5px" }}>© {new Date().getFullYear()} CountryLens. All rights reserved.</p>
      </footer>
    </div>
  )
}

function InfoItem({ icon, label, value, styles }) {
  return (
    <div style={styles.infoItem}>
      <div>{icon}</div>
      <div>
        <p style={styles.infoLabel}>{label}</p>
        <p style={styles.infoValue}>{value}</p>
      </div>
    </div>
  )
}
