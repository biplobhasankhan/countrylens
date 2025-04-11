"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

export default function CompareCountries() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Support up to 4 countries for comparison
  const [selectedCountries, setSelectedCountries] = useState(["", "", "", ""])
  const [countryData, setCountryData] = useState([null, null, null, null])
  const [loadingComparison, setLoadingComparison] = useState(false)
  const [activeCountries, setActiveCountries] = useState(2) // Default to 2 countries

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://restcountries.com/v3.1/all")
        if (!response.ok) {
          throw new Error("Failed to fetch countries")
        }
        const data = await response.json()
        // Sort countries by name
        const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        setCountries(sortedCountries)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  useEffect(() => {
    const fetchCountryData = async () => {
      // Only fetch if at least one country is selected
      if (!selectedCountries.some((country) => country)) return

      setLoadingComparison(true)

      const newCountryData = [...countryData]

      for (let i = 0; i < selectedCountries.length; i++) {
        const countryCode = selectedCountries[i]

        if (!countryCode) {
          newCountryData[i] = null
          continue
        }

        try {
          const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
          if (!response.ok) {
            throw new Error(`Failed to fetch country data for ${countryCode}`)
          }
          const data = await response.json()
          newCountryData[i] = data[0]
        } catch (err) {
          console.error(err)
          newCountryData[i] = null
        }
      }

      setCountryData(newCountryData)
      setLoadingComparison(false)
    }

    fetchCountryData()
  }, [selectedCountries])

  const handleCountrySelect = (index, value) => {
    const newSelectedCountries = [...selectedCountries]
    newSelectedCountries[index] = value
    setSelectedCountries(newSelectedCountries)
  }

  const handleAddCountry = () => {
    if (activeCountries < 4) {
      setActiveCountries(activeCountries + 1)
    }
  }

  const handleRemoveCountry = () => {
    if (activeCountries > 2) {
      setActiveCountries(activeCountries - 1)

      // Clear the last selected country
      const newSelectedCountries = [...selectedCountries]
      newSelectedCountries[activeCountries - 1] = ""
      setSelectedCountries(newSelectedCountries)
    }
  }

  const formatPopulation = (population) => {
    return new Intl.NumberFormat().format(population)
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num)
  }

  if (error) {
    return (
      <ThemeProvider>
        <div className="app-wrapper">
          <Header />
          <main className="main">
            <div className="container">
              <div className="error-container">
                <h2 className="error-title">Error</h2>
                <p className="error-message">{error}</p>
                <button onClick={() => window.location.reload()} className="btn btn-primary">
                  Try Again
                </button>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <div className="app-wrapper">
        <Header />
        <main className="main">
          <div className="container">
            <Link href="/">
              <button className="btn btn-outline back-button">
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

            <h1 className="section-title">Compare Countries</h1>
            <p className="section-description">Select up to four countries to compare their statistics side by side.</p>

            <div className="compare-controls">
              <div className="compare-count-controls">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={handleRemoveCountry}
                  disabled={activeCountries <= 2}
                >
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
                    <path d="M5 12h14" />
                  </svg>
                  Remove Country
                </button>
                <span className="compare-count">{activeCountries} Countries</span>
                <button className="btn btn-outline btn-sm" onClick={handleAddCountry} disabled={activeCountries >= 4}>
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
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                  </svg>
                  Add Country
                </button>
              </div>
            </div>

            <div className="multi-compare-selects">
              {Array.from({ length: activeCountries }).map((_, index) => (
                <div className="compare-select-card" key={`select-${index}`}>
                  <h2>Country {index + 1}</h2>
                  {loading ? (
                    <div className="skeleton select-skeleton"></div>
                  ) : (
                    <select
                      className="input"
                      value={selectedCountries[index]}
                      onChange={(e) => handleCountrySelect(index, e.target.value)}
                    >
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={`country-${index}-${country.cca3}`} value={country.cca3}>
                          {country.name.common}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>

            {loadingComparison ? (
              <div className="loading-container">
                <div className="loading-spinner">
                  <div className="loading-spinner-inner"></div>
                </div>
                <p className="loading-text">Loading comparison data...</p>
                <div className="comparison-skeleton">
                  {Array.from({ length: activeCountries }).map((_, index) => (
                    <div key={`skeleton-${index}`} className="skeleton comparison-card-skeleton"></div>
                  ))}
                </div>
              </div>
            ) : countryData.some((country) => country) ? (
              <div className="comparison-container">
                <div className="multi-compare-flags">
                  {Array.from({ length: activeCountries }).map((_, index) =>
                    countryData[index] ? (
                      <div className="compare-flag-wrapper" key={`flag-${index}`}>
                        <div className="compare-flag-container">
                          <img
                            src={countryData[index].flags.svg || countryData[index].flags.png}
                            alt={`Flag of ${countryData[index].name.common}`}
                            loading="lazy"
                          />
                        </div>
                        <h2 className="compare-country-name">{countryData[index].name.common}</h2>
                      </div>
                    ) : (
                      <div className="compare-flag-placeholder" key={`flag-placeholder-${index}`}>
                        <div className="compare-flag-container placeholder">
                          <svg
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.3"
                          >
                            <rect width="18" height="12" x="3" y="6" rx="2" />
                            <path d="M3 10h18" />
                          </svg>
                        </div>
                        <h2 className="compare-country-name">Select a country</h2>
                      </div>
                    ),
                  )}
                </div>

                <div className="multi-compare-rows">
                  <MultiComparisonRow
                    title="Region"
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
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    }
                    values={countryData.map((country) => country?.region || "")}
                    activeCount={activeCountries}
                  />

                  <MultiComparisonRow
                    title="Population"
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
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    }
                    values={countryData.map((country) => (country ? formatPopulation(country.population) : ""))}
                    activeCount={activeCountries}
                    highlight={true}
                  />

                  <MultiComparisonRow
                    title="Capital"
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
                      >
                        <path d="M6 22V2a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v20" />
                        <path d="M18 11h.01" />
                        <path d="M18 6h.01" />
                        <path d="M18 16h.01" />
                        <path d="M6 16h12" />
                        <path d="M2 22h20" />
                      </svg>
                    }
                    values={countryData.map((country) => country?.capital?.[0] || "N/A")}
                    activeCount={activeCountries}
                  />

                  <MultiComparisonRow
                    title="Area"
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
                      >
                        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                        <line x1="9" x2="9" y1="3" y2="18" />
                        <line x1="15" x2="15" y1="6" y2="21" />
                      </svg>
                    }
                    values={countryData.map((country) => (country ? `${formatNumber(country.area)} km²` : ""))}
                    activeCount={activeCountries}
                    highlight={true}
                  />

                  <MultiComparisonRow
                    title="Languages"
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
                      >
                        <path d="m5 8 6 6" />
                        <path d="m4 14 6-6 2-3" />
                        <path d="M2 5h12" />
                        <path d="M7 2h1" />
                        <path d="m22 22-5-10-5 10" />
                        <path d="M14 18h6" />
                      </svg>
                    }
                    values={countryData.map((country) =>
                      country?.languages ? Object.values(country.languages).join(", ") : "N/A",
                    )}
                    activeCount={activeCountries}
                  />

                  <MultiComparisonRow
                    title="Currencies"
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
                      >
                        <circle cx="8" cy="8" r="6" />
                        <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
                        <path d="M7 6h1v4" />
                        <path d="m16.71 13.88.7.71-2.82 2.82" />
                      </svg>
                    }
                    values={countryData.map((country) =>
                      country?.currencies
                        ? Object.values(country.currencies)
                            .map((currency) => `${currency.name} (${currency.symbol || ""})`)
                            .join(", ")
                        : "N/A",
                    )}
                    activeCount={activeCountries}
                  />

                  <MultiComparisonRow
                    title="Driving Side"
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
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4" />
                        <path d="M12 16h.01" />
                      </svg>
                    }
                    values={countryData.map((country) =>
                      country?.car?.side ? country.car.side.charAt(0).toUpperCase() + country.car.side.slice(1) : "N/A",
                    )}
                    activeCount={activeCountries}
                  />

                  <MultiComparisonRow
                    title="Time Zones"
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
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    }
                    values={countryData.map((country) =>
                      country?.timezones?.length > 0
                        ? country.timezones[0] +
                          (country.timezones.length > 1 ? ` (+${country.timezones.length - 1} more)` : "")
                        : "N/A",
                    )}
                    activeCount={activeCountries}
                  />
                </div>

                {/* Radar Chart Placeholder */}
                <div className="radar-chart-container">
                  <h3>Comparison Chart</h3>
                  <div className="radar-chart-placeholder">
                    <p>Radar chart visualization would be displayed here</p>
                    <p>This would show a visual comparison of multiple metrics</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="select-prompt-container">
                <h2 className="select-prompt-title">Select countries to compare</h2>
                <p className="select-prompt-message">
                  Choose countries from the dropdown menus above to see a detailed comparison.
                </p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

function MultiComparisonRow({ title, icon, values, activeCount, highlight = false }) {
  // Check if values are different for highlighting
  const allSame = values.slice(0, activeCount).every((val, i, arr) => val === arr[0])

  return (
    <div className="compare-row">
      <div className="compare-row-header">
        {icon}
        <h3>{title}</h3>
      </div>

      <div className="multi-compare-row-content">
        {values.slice(0, activeCount).map((value, index) => (
          <div key={index} className={`compare-value ${highlight && !allSame ? "highlight" : ""}`}>
            {value || "N/A"}
          </div>
        ))}
      </div>
    </div>
  )
}
