"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

export default function WorldMap() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
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

            <h1 className="section-title">World Map Explorer</h1>
            <p className="section-description">Explore countries on the map and discover detailed information.</p>

            <div className="search-container">
              <div className="input-icon">
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
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  className="input"
                  placeholder="Search for a country..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className="map-page-grid">
              <div className="map-container">
                {loading ? (
                  <div className="skeleton map-skeleton"></div>
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

              <div className="country-list">
                {loading ? (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading countries...</p>
                    {Array(10)
                      .fill(0)
                      .map((_, index) => (
                        <div key={index} className="skeleton country-list-skeleton"></div>
                      ))}
                  </div>
                ) : filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <div
                      key={country.cca3}
                      className={`country-list-item ${selectedCountry?.cca3 === country.cca3 ? "active" : ""}`}
                      onClick={() => handleCountryClick(country)}
                    >
                      <img
                        src={country.flags.svg || country.flags.png}
                        alt={`Flag of ${country.name.common}`}
                        className="country-list-flag"
                        loading="lazy"
                      />
                      <div className="country-list-info">
                        <h3>{country.name.common}</h3>
                        <p>{country.region}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    <p className="no-results-message">No countries found</p>
                  </div>
                )}
              </div>
            </div>

            {selectedCountry && (
              <div className="selected-country-card">
                <div className="selected-country-header">
                  <img
                    src={selectedCountry.flags.svg || selectedCountry.flags.png}
                    alt={`Flag of ${selectedCountry.name.common}`}
                    className="selected-country-flag"
                    loading="lazy"
                  />
                  <div className="selected-country-title">
                    <h2>{selectedCountry.name.common}</h2>
                    <p>{selectedCountry.name.official}</p>
                  </div>
                </div>

                <div className="stat-cards">
                  <div className="stat-card">
                    <div className="stat-card-title">Capital</div>
                    <div className="stat-card-value">{selectedCountry.capital?.[0] || "N/A"}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-card-title">Region</div>
                    <div className="stat-card-value">{selectedCountry.region}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-card-title">Population</div>
                    <div className="stat-card-value">{new Intl.NumberFormat().format(selectedCountry.population)}</div>
                  </div>
                </div>

                <div className="selected-country-footer">
                  <Link href={`/country/${selectedCountry.cca3}`}>
                    <button className="btn btn-primary">View Details</button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
