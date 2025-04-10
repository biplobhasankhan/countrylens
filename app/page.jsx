"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CountryCard from "@/components/country-card"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"]

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
            <section className="filter-section">
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
              <div className="region-filters">
                {regions.map((region) => (
                  <button
                    key={region}
                    className={`region-btn ${selectedRegion === region ? "active" : ""}`}
                    onClick={() => handleRegionSelect(region)}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </section>

            <section className="results-section">
              <div className="results-header">
                <h2 className="results-count">{filteredCountries.length} Countries Found</h2>
                <Link href="/map">
                  <button className="view-map-btn">
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
                <div className="loading-container">
                  <div className="loading-spinner">
                    <div className="loading-spinner-inner"></div>
                  </div>
                  <p className="loading-text">Loading countries...</p>
                  <div className="grid">
                    {Array(8)
                      .fill(0)
                      .map((_, index) => (
                        <div key={index} className="country-card-skeleton">
                          <div className="skeleton flag-skeleton"></div>
                          <div className="card-content-skeleton">
                            <div className="skeleton title-skeleton"></div>
                            <div className="skeleton info-skeleton"></div>
                            <div className="skeleton info-skeleton"></div>
                            <div className="skeleton info-skeleton"></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="grid">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country, index) => (
                      <CountryCard key={country.cca3} country={country} index={index} />
                    ))
                  ) : (
                    <div className="no-results">
                      <h3 className="no-results-title">No countries found</h3>
                      <p className="no-results-message">Try adjusting your search or filters</p>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
