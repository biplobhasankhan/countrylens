"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { getTravelAdvisory, getVisaRequirements } from "@/services/api-service"

export default function TravelInfo() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [citizenshipCountry, setCitizenshipCountry] = useState("")
  const [destinationCountry, setDestinationCountry] = useState("")
  const [visaInfo, setVisaInfo] = useState(null)
  const [loadingVisa, setLoadingVisa] = useState(false)

  const [selectedCountry, setSelectedCountry] = useState("")
  const [advisoryInfo, setAdvisoryInfo] = useState(null)
  const [loadingAdvisory, setLoadingAdvisory] = useState(false)

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

  const handleVisaCheck = async () => {
    if (!citizenshipCountry || !destinationCountry) return

    setLoadingVisa(true)
    const data = await getVisaRequirements(citizenshipCountry, destinationCountry)
    setVisaInfo(data)
    setLoadingVisa(false)
  }

  const handleAdvisoryCheck = async () => {
    if (!selectedCountry) return

    setLoadingAdvisory(true)
    const data = await getTravelAdvisory(selectedCountry)
    setAdvisoryInfo(data)
    setLoadingAdvisory(false)
  }

  const getRiskLevelClass = (level) => {
    switch (level) {
      case "Low":
        return "risk-low"
      case "Medium":
        return "risk-medium"
      case "High":
        return "risk-high"
      default:
        return ""
    }
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

            <h1 className="section-title">Travel Information</h1>
            <p className="section-description">Check visa requirements and travel advisories for your destination.</p>

            <div className="travel-info-grid">
              {/* Visa Requirements Section */}
              <div className="travel-card">
                <h2 className="travel-card-title">Visa Requirements Checker</h2>
                <p className="travel-card-description">
                  Select your citizenship and destination country to check visa requirements.
                </p>

                <div className="visa-form">
                  <div className="form-group">
                    <label htmlFor="citizenship">Your Citizenship</label>
                    {loading ? (
                      <div className="skeleton select-skeleton"></div>
                    ) : (
                      <select
                        id="citizenship"
                        className="input"
                        value={citizenshipCountry}
                        onChange={(e) => setCitizenshipCountry(e.target.value)}
                      >
                        <option value="">Select your citizenship</option>
                        {countries.map((country) => (
                          <option key={`citizenship-${country.cca3}`} value={country.cca3}>
                            {country.name.common}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="destination">Destination Country</label>
                    {loading ? (
                      <div className="skeleton select-skeleton"></div>
                    ) : (
                      <select
                        id="destination"
                        className="input"
                        value={destinationCountry}
                        onChange={(e) => setDestinationCountry(e.target.value)}
                      >
                        <option value="">Select destination country</option>
                        {countries.map((country) => (
                          <option key={`destination-${country.cca3}`} value={country.cca3}>
                            {country.name.common}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={handleVisaCheck}
                    disabled={!citizenshipCountry || !destinationCountry || loadingVisa}
                  >
                    {loadingVisa ? "Checking..." : "Check Visa Requirements"}
                  </button>
                </div>

                {visaInfo && (
                  <div className="visa-result">
                    <h3>Visa Information</h3>
                    <div className="visa-details">
                      <div className="visa-detail">
                        <span className="visa-label">Requirement:</span>
                        <span className="visa-value">{visaInfo.requirement}</span>
                      </div>
                      <div className="visa-detail">
                        <span className="visa-label">Stay Duration:</span>
                        <span className="visa-value">{visaInfo.stayDuration}</span>
                      </div>
                      <div className="visa-detail">
                        <span className="visa-label">Processing Time:</span>
                        <span className="visa-value">{visaInfo.processingTime}</span>
                      </div>
                      <div className="visa-detail">
                        <span className="visa-label">Fee:</span>
                        <span className="visa-value">{visaInfo.fee}</span>
                      </div>
                      <div className="visa-note">
                        <p>
                          <strong>Note:</strong> {visaInfo.notes}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Travel Advisory Section */}
              <div className="travel-card">
                <h2 className="travel-card-title">Travel Advisory</h2>
                <p className="travel-card-description">
                  Check current travel advisories and safety information for your destination.
                </p>

                <div className="advisory-form">
                  <div className="form-group">
                    <label htmlFor="advisory-country">Select Country</label>
                    {loading ? (
                      <div className="skeleton select-skeleton"></div>
                    ) : (
                      <select
                        id="advisory-country"
                        className="input"
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                      >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                          <option key={`advisory-${country.cca3}`} value={country.cca3}>
                            {country.name.common}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={handleAdvisoryCheck}
                    disabled={!selectedCountry || loadingAdvisory}
                  >
                    {loadingAdvisory ? "Loading..." : "Check Travel Advisory"}
                  </button>
                </div>

                {advisoryInfo && (
                  <div className="advisory-result">
                    <h3>Travel Advisory for {advisoryInfo.country}</h3>
                    <div className={`risk-level ${getRiskLevelClass(advisoryInfo.riskLevel)}`}>
                      Risk Level: {advisoryInfo.riskLevel}
                    </div>
                    <div className="advisory-details">
                      <p className="advisory-text">{advisoryInfo.advisoryText}</p>
                      <p className="advisory-updated">Last updated: {advisoryInfo.lastUpdated}</p>

                      {advisoryInfo.areas.avoid.length > 0 && (
                        <div className="advisory-areas">
                          <h4>Areas to Avoid</h4>
                          <ul>
                            {advisoryInfo.areas.avoid.map((area, index) => (
                              <li key={index}>{area}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {advisoryInfo.areas.caution.length > 0 && (
                        <div className="advisory-areas">
                          <h4>Exercise Caution In</h4>
                          <ul>
                            {advisoryInfo.areas.caution.map((area, index) => (
                              <li key={index}>{area}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
