"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

export default function CountryDetail({ params }) {
  const { id } = params
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [borderCountries, setBorderCountries] = useState([])
  const [activeTab, setActiveTab] = useState("details")

  useEffect(() => {
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
          <div className="container detail-container">
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

            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner">
                  <div className="loading-spinner-inner"></div>
                </div>
                <p className="loading-text">Loading country details...</p>
                <div className="country-detail-skeleton">
                  <div className="skeleton flag-detail-skeleton"></div>
                  <div className="detail-info-skeleton">
                    <div className="skeleton title-detail-skeleton"></div>
                    <div className="skeleton subtitle-detail-skeleton"></div>
                    <div className="info-grid-skeleton">
                      {Array(6)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="skeleton info-item-skeleton"></div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : country ? (
              <div className="country-detail-wrapper">
                <div className="country-detail-grid">
                  <div className="country-detail-flag">
                    <img
                      src={country.flags.svg || country.flags.png}
                      alt={`Flag of ${country.name.common}`}
                      loading="lazy"
                    />
                  </div>

                  <div className="country-detail-info">
                    <h1>{country.name.common}</h1>
                    <p>{country.name.official}</p>

                    <div className="info-grid">
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
                            className="info-item-icon"
                          >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                        }
                        label="Region"
                        value={country.region}
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
                            className="info-item-icon"
                          >
                            <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                            <path d="M7 3.34V5a3 3 0 0 0 3 3h0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2h2" />
                            <path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                        }
                        label="Subregion"
                        value={country.subregion || "N/A"}
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
                            className="info-item-icon"
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
                            className="info-item-icon"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        }
                        label="Population"
                        value={formatPopulation(country.population)}
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
                            className="info-item-icon"
                          >
                            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                            <line x1="9" x2="9" y1="3" y2="18" />
                            <line x1="15" x2="15" y1="6" y2="21" />
                          </svg>
                        }
                        label="Area"
                        value={`${formatNumber(country.area)} km²`}
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
                            className="info-item-icon"
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
                      />
                    </div>
                  </div>
                </div>

                <div className="tabs-container">
                  <div className="tabs">
                    <div
                      className={`tab ${activeTab === "details" ? "active" : ""}`}
                      onClick={() => setActiveTab("details")}
                    >
                      Details
                    </div>
                    <div
                      className={`tab ${activeTab === "geography" ? "active" : ""}`}
                      onClick={() => setActiveTab("geography")}
                    >
                      Geography
                    </div>
                    <div
                      className={`tab ${activeTab === "economy" ? "active" : ""}`}
                      onClick={() => setActiveTab("economy")}
                    >
                      Economy
                    </div>
                  </div>

                  <div className={`tab-content ${activeTab === "details" ? "active" : ""}`}>
                    <div className="stat-cards">
                      <div className="stat-card">
                        <div className="stat-card-title">Top Level Domain</div>
                        <div className="stat-card-value">{country.tld?.[0] || "N/A"}</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-card-title">Calling Code</div>
                        <div className="stat-card-value">
                          {country.idd?.root ? `${country.idd.root}${country.idd.suffixes?.[0] || ""}` : "N/A"}
                        </div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-card-title">Timezones</div>
                        <div className="stat-card-value" title={country.timezones?.join(", ")}>
                          {country.timezones?.[0] || "N/A"}
                        </div>
                      </div>
                    </div>

                    {borderCountries.length > 0 && (
                      <div className="border-countries">
                        <h3>Border Countries</h3>
                        <div className="border-countries-grid">
                          {borderCountries.map((border) => (
                            <Link key={border.cca3} href={`/country/${border.cca3}`}>
                              <button className="btn btn-outline">{border.name.common}</button>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={`tab-content ${activeTab === "geography" ? "active" : ""}`}>
                    <div className="geography-grid">
                      <div className="stat-card">
                        <h3 className="geography-title">Location</h3>
                        <p className="geography-info">
                          <span className="geography-label">Latitude/Longitude:</span> {country.latlng?.[0].toFixed(2)}
                          °, {country.latlng?.[1].toFixed(2)}°
                        </p>
                        <p className="geography-info">
                          <span className="geography-label">Region:</span> {country.region}
                        </p>
                        <p className="geography-info">
                          <span className="geography-label">Subregion:</span> {country.subregion || "N/A"}
                        </p>
                      </div>

                      <div className="stat-card">
                        <h3 className="geography-title">Geography</h3>
                        <p className="geography-info">
                          <span className="geography-label">Area:</span> {formatNumber(country.area)} km²
                        </p>
                        <p className="geography-info">
                          <span className="geography-label">Land Borders:</span>{" "}
                          {country.borders ? `${country.borders.length} countries` : "None (Island)"}
                        </p>
                        <p className="geography-info">
                          <span className="geography-label">Landlocked:</span> {country.landlocked ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>

                    <div className="map-container">
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${country.name.common}`}
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>

                  <div className={`tab-content ${activeTab === "economy" ? "active" : ""}`}>
                    <div className="stat-cards">
                      <div className="stat-card">
                        <div className="stat-card-title">Currencies</div>
                        <div className="stat-card-value">
                          {country.currencies
                            ? Object.values(country.currencies)
                                .map((currency) => `${currency.name} (${currency.symbol || ""})`)
                                .join(", ")
                            : "N/A"}
                        </div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-card-title">Driving Side</div>
                        <div className="stat-card-value">
                          {country.car?.side
                            ? country.car.side.charAt(0).toUpperCase() + country.car.side.slice(1)
                            : "N/A"}
                        </div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-card-title">UN Member</div>
                        <div className="stat-card-value">{country.unMember ? "Yes" : "No"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="not-found-container">
                <h2 className="not-found-title">Country not found</h2>
                <p className="not-found-message">We couldn't find the country you're looking for.</p>
                <Link href="/">
                  <button className="btn btn-primary">Return to Home</button>
                </Link>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="info-item">
      <div>{icon}</div>
      <div className="info-item-content">
        <span className="info-item-label">{label}</span>
        <span className="info-item-value">{value}</span>
      </div>
    </div>
  )
}
