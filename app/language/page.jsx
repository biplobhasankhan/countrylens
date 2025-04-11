"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { getLanguagePhrases, getCountryLanguageData } from "@/services/api-service"

export default function LanguageAssistant() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedCountry, setSelectedCountry] = useState("")
  const [languageData, setLanguageData] = useState(null)
  const [loadingLanguage, setLoadingLanguage] = useState(false)

  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [phrases, setPhrases] = useState(null)
  const [loadingPhrases, setLoadingPhrases] = useState(false)

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

  const handleCountrySelect = async (countryCode) => {
    setSelectedCountry(countryCode)
    setSelectedLanguage("")
    setPhrases(null)

    if (!countryCode) {
      setLanguageData(null)
      return
    }

    setLoadingLanguage(true)
    const data = await getCountryLanguageData(countryCode)
    setLanguageData(data)

    // Auto-select first language
    if (data && data.languageCodes.length > 0) {
      setSelectedLanguage(data.languageCodes[0])
      fetchPhrases(data.languageCodes[0])
    }

    setLoadingLanguage(false)
  }

  const fetchPhrases = async (langCode) => {
    setLoadingPhrases(true)
    const data = await getLanguagePhrases(langCode)
    setPhrases(data)
    setLoadingPhrases(false)
  }

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode)
    fetchPhrases(langCode)
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

            <h1 className="section-title">Language Assistant</h1>
            <p className="section-description">
              Learn basic phrases and explore language information for different countries.
            </p>

            <div className="language-grid">
              {/* Country Language Information */}
              <div className="language-card">
                <h2 className="language-card-title">Country Language Information</h2>
                <div className="language-form">
                  <div className="form-group">
                    <label htmlFor="language-country">Select Country</label>
                    {loading ? (
                      <div className="skeleton select-skeleton"></div>
                    ) : (
                      <select
                        id="language-country"
                        className="input"
                        value={selectedCountry}
                        onChange={(e) => handleCountrySelect(e.target.value)}
                      >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                          <option key={`language-${country.cca3}`} value={country.cca3}>
                            {country.name.common}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                {loadingLanguage ? (
                  <div className="loading-container">
                    <div className="loading-spinner">
                      <div className="loading-spinner-inner"></div>
                    </div>
                    <p className="loading-text">Loading language information...</p>
                  </div>
                ) : languageData ? (
                  <div className="language-result">
                    <h3>Languages in {languageData.country}</h3>

                    <div className="language-info">
                      <h4>Official Languages</h4>
                      <div className="language-list">
                        {languageData.officialLanguages.map((code, index) => (
                          <div
                            key={index}
                            className={`language-item ${selectedLanguage === code ? "active" : ""}`}
                            onClick={() => handleLanguageSelect(code)}
                          >
                            {languageData.languages[index]}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="language-distribution">
                      <h4>Language Distribution</h4>
                      <div className="language-chart">
                        {Object.entries(languageData.languagePercentages).map(([code, percentage], index) => (
                          <div
                            key={index}
                            className="language-bar"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: `hsl(${index * 50}, 70%, 50%)`,
                            }}
                            title={`${languageData.languages[index]}: ${percentage}%`}
                          >
                            {percentage > 10 && (
                              <span className="language-bar-label">
                                {languageData.languages[index]} ({percentage}%)
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="english-proficiency">
                      <h4>English Proficiency</h4>
                      <div className={`proficiency-level ${languageData.englishProficiency.toLowerCase()}`}>
                        {languageData.englishProficiency}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="language-placeholder">
                    <p>Select a country to see language information</p>
                  </div>
                )}
              </div>

              {/* Common Phrases */}
              <div className="language-card">
                <h2 className="language-card-title">Common Phrases</h2>
                <p className="language-card-description">Learn basic phrases in the local language.</p>

                {loadingPhrases ? (
                  <div className="loading-container">
                    <div className="loading-spinner">
                      <div className="loading-spinner-inner"></div>
                    </div>
                    <p className="loading-text">Loading phrases...</p>
                  </div>
                ) : phrases ? (
                  <div className="phrases-container">
                    <div className="phrase-item">
                      <div className="phrase-label">Greeting</div>
                      <div className="phrase-text">{phrases.greeting}</div>
                      <button className="btn btn-outline btn-sm phrase-speak">
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
                          <path d="M12 6v12" />
                          <path d="M6 12h12" />
                        </svg>
                      </button>
                    </div>

                    <div className="phrase-item">
                      <div className="phrase-label">Goodbye</div>
                      <div className="phrase-text">{phrases.goodbye}</div>
                      <button className="btn btn-outline btn-sm phrase-speak">
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
                          <path d="M12 6v12" />
                          <path d="M6 12h12" />
                        </svg>
                      </button>
                    </div>

                    <div className="phrase-item">
                      <div className="phrase-label">Please</div>
                      <div className="phrase-text">{phrases.please}</div>
                      <button className="btn btn-outline btn-sm phrase-speak">
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
                          <path d="M12 6v12" />
                          <path d="M6 12h12" />
                        </svg>
                      </button>
                    </div>

                    <div className="phrase-item">
                      <div className="phrase-label">Thank You</div>
                      <div className="phrase-text">{phrases.thankYou}</div>
                      <button className="btn btn-outline btn-sm phrase-speak">
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
                          <path d="M12 6v12" />
                          <path d="M6 12h12" />
                        </svg>
                      </button>
                    </div>

                    <div className="phrase-item">
                      <div className="phrase-label">Yes</div>
                      <div className="phrase-text">{phrases.yes}</div>
                      <button className="btn btn-outline btn-sm phrase-speak">
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
                          <path d="M12 6v12" />
                          <path d="M6 12h12" />
                        </svg>
                      </button>
                    </div>

                    <div className="phrase-item">
                      <div className="phrase-label">No</div>
                      <div className="phrase-text">{phrases.no}</div>
                      <button className="btn btn-outline btn-sm phrase-speak">
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
                          <path d="M12 6v12" />
                          <path d="M6 12h12" />
                        </svg>
                      </button>
                    </div>

                    <div className="phrase-item">
                      <div className="phrase-label">Help</div>
                      <div className="phrase-text">{phrases.help}</div>
                      <button className="btn btn-outline btn-sm phrase-speak">
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
                          <path d="M12 6v12" />
                          <path d="M6 12h12" />
                        </svg>
                      </button>
                    </div>

                    <div className="phrase-item">
                      <div className="phrase-label">Excuse Me</div>
                      <div className="phrase-text">{phrases.excuse}</div>
                      <button className="btn btn-outline btn-sm phrase-speak">
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
                          <path d="M12 6v12" />
                          <path d="M6 12h12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="phrases-placeholder">
                    <p>{selectedCountry ? "Select a language to see common phrases" : "Select a country first"}</p>
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
