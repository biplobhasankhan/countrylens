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
  const [selectedCountry1, setSelectedCountry1] = useState("")
  const [selectedCountry2, setSelectedCountry2] = useState("")
  const [country1Data, setCountry1Data] = useState(null)
  const [country2Data, setCountry2Data] = useState(null)
  const [loadingComparison, setLoadingComparison] = useState(false)

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
    const fetchCountryData = async (countryCode, setCountryData) => {
      if (!countryCode) {
        setCountryData(null)
        return
      }

      try {
        setLoadingComparison(true)
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch country data for ${countryCode}`)
        }
        const data = await response.json()
        setCountryData(data[0])
        setLoadingComparison(false)
      } catch (err) {
        console.error(err)
        setLoadingComparison(false)
      }
    }

    if (selectedCountry1) {
      fetchCountryData(selectedCountry1, setCountry1Data)
    } else {
      setCountry1Data(null)
    }

    if (selectedCountry2) {
      fetchCountryData(selectedCountry2, setCountry2Data)
    } else {
      setCountry2Data(null)
    }
  }, [selectedCountry1, selectedCountry2])

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
            <p className="section-description">Select two countries to compare their statistics side by side.</p>

            <div className="compare-selects">
              <div className="compare-select-card">
                <h2>First Country</h2>
                {loading ? (
                  <div className="skeleton select-skeleton"></div>
                ) : (
                  <select
                    className="input"
                    value={selectedCountry1}
                    onChange={(e) => setSelectedCountry1(e.target.value)}
                  >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country.cca3} value={country.cca3}>
                        {country.name.common}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="compare-select-card">
                <h2>Second Country</h2>
                {loading ? (
                  <div className="skeleton select-skeleton"></div>
                ) : (
                  <select
                    className="input"
                    value={selectedCountry2}
                    onChange={(e) => setSelectedCountry2(e.target.value)}
                  >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country.cca3} value={country.cca3}>
                        {country.name.common}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {loadingComparison ? (
              <div className="loading-container">
                <div className="loading-spinner">
                  <div className="loading-spinner-inner"></div>
                </div>
                <p className="loading-text">Loading comparison data...</p>
                <div className="comparison-skeleton">
                  <div className="skeleton comparison-card-skeleton"></div>
                  <div className="skeleton comparison-card-skeleton"></div>
                </div>
              </div>
            ) : country1Data && country2Data ? (
              <div className="comparison-container">
                <div className="compare-flags">
                  <div className="compare-flag-wrapper">
                    <div className="compare-flag-container">
                      <img
                        src={country1Data.flags.svg || country1Data.flags.png}
                        alt={`Flag of ${country1Data.name.common}`}
                        loading="lazy"
                      />
                    </div>
                    <h2 className="compare-country-name">{country1Data.name.common}</h2>
                  </div>

                  <div className="compare-flag-wrapper">
                    <div className="compare-flag-container">
                      <img
                        src={country2Data.flags.svg || country2Data.flags.png}
                        alt={`Flag of ${country2Data.name.common}`}
                        loading="lazy"
                      />
                    </div>
                    <h2 className="compare-country-name">{country2Data.name.common}</h2>
                  </div>
                </div>

                <div className="compare-rows">
                  <ComparisonRow
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
                    value1={country1Data.region}
                    value2={country2Data.region}
                  />

                  <ComparisonRow
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
                    value1={formatPopulation(country1Data.population)}
                    value2={formatPopulation(country2Data.population)}
                    highlight={country1Data.population !== country2Data.population}
                  />

                  <ComparisonRow
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
                    value1={country1Data.capital?.[0] || "N/A"}
                    value2={country2Data.capital?.[0] || "N/A"}
                  />

                  <ComparisonRow
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
                    value1={`${formatNumber(country1Data.area)} km²`}
                    value2={`${formatNumber(country2Data.area)} km²`}
                    highlight={country1Data.area !== country2Data.area}
                  />

                  <ComparisonRow
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
                    value1={country1Data.languages ? Object.values(country1Data.languages).join(", ") : "N/A"}
                    value2={country2Data.languages ? Object.values(country2Data.languages).join(", ") : "N/A"}
                  />

                  <ComparisonRow
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
                    value1={
                      country1Data.currencies
                        ? Object.values(country1Data.currencies)
                            .map((currency) => `${currency.name} (${currency.symbol || ""})`)
                            .join(", ")
                        : "N/A"
                    }
                    value2={
                      country2Data.currencies
                        ? Object.values(country2Data.currencies)
                            .map((currency) => `${currency.name} (${currency.symbol || ""})`)
                            .join(", ")
                        : "N/A"
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="select-prompt-container">
                <h2 className="select-prompt-title">Select two countries to compare</h2>
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

function ComparisonRow({ title, icon, value1, value2, highlight = false }) {
  const isSame = value1 === value2

  return (
    <div className="compare-row">
      <div className="compare-row-header">
        {icon}
        <h3>{title}</h3>
      </div>

      <div className="compare-row-content">
        <div className={`compare-value ${highlight && !isSame ? "highlight" : ""}`}>{value1}</div>
        <div className={`compare-value ${highlight && !isSame ? "highlight" : ""}`}>{value2}</div>
      </div>
    </div>
  )
}
