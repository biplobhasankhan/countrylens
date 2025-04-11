"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { getTimeZoneInfo } from "@/services/api-service"

export default function TimeZoneTool() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedCountry, setSelectedCountry] = useState("")
  const [timeZoneInfo, setTimeZoneInfo] = useState(null)
  const [loadingTimeZone, setLoadingTimeZone] = useState(false)

  const [userTimeZone, setUserTimeZone] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const [timeDifference, setTimeDifference] = useState(null)

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

    // Get user's timezone
    const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone
    setUserTimeZone(userTz)

    // Update current time every second
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleCountrySelect = async (countryCode) => {
    if (!countryCode) {
      setTimeZoneInfo(null)
      setTimeDifference(null)
      return
    }

    setLoadingTimeZone(true)
    const data = await getTimeZoneInfo(countryCode)
    setTimeZoneInfo(data)

    // Calculate time difference
    if (data && data.currentTimes && data.currentTimes.length > 0) {
      const userDate = new Date()
      const countryDate = new Date(data.currentTimes[0].date + " " + data.currentTimes[0].time)

      // Calculate difference in hours
      const diffMs = countryDate - userDate
      const diffHrs = Math.round(diffMs / (1000 * 60 * 60))

      setTimeDifference(diffHrs)
    }

    setLoadingTimeZone(false)
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

            <h1 className="section-title">Time Zone Tool</h1>
            <p className="section-description">
              Check current time in different countries and calculate time differences.
            </p>

            <div className="timezone-grid">
              {/* User's Time Zone Section */}
              <div className="timezone-card user-timezone">
                <h2 className="timezone-card-title">Your Local Time</h2>
                <div className="current-time">
                  <div className="time-display">{currentTime}</div>
                  <div className="timezone-name">{userTimeZone}</div>
                </div>
              </div>

              {/* Country Time Zone Section */}
              <div className="timezone-card country-timezone">
                <h2 className="timezone-card-title">Country Time</h2>
                <div className="timezone-form">
                  <div className="form-group">
                    <label htmlFor="timezone-country">Select Country</label>
                    {loading ? (
                      <div className="skeleton select-skeleton"></div>
                    ) : (
                      <select
                        id="timezone-country"
                        className="input"
                        value={selectedCountry}
                        onChange={(e) => handleCountrySelect(e.target.value)}
                      >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                          <option key={`timezone-${country.cca3}`} value={country.cca3}>
                            {country.name.common}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                {loadingTimeZone ? (
                  <div className="loading-container">
                    <div className="loading-spinner">
                      <div className="loading-spinner-inner"></div>
                    </div>
                    <p className="loading-text">Loading time zone information...</p>
                  </div>
                ) : timeZoneInfo ? (
                  <div className="timezone-result">
                    <h3>{timeZoneInfo.country} Time</h3>

                    {timeZoneInfo.currentTimes.length > 0 ? (
                      <div className="timezone-times">
                        {timeZoneInfo.currentTimes.map((tz, index) => (
                          <div key={index} className="timezone-time-item">
                            <div className="time-display">{tz.time}</div>
                            <div className="timezone-name">{tz.timezone}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No time zone information available</p>
                    )}

                    {timeDifference !== null && (
                      <div className="time-difference">
                        <h4>Time Difference</h4>
                        <p>
                          {Math.abs(timeDifference)} hour{Math.abs(timeDifference) !== 1 ? "s" : ""}{" "}
                          {timeDifference >= 0 ? "ahead of" : "behind"} your local time
                        </p>
                      </div>
                    )}

                    <div className="timezone-info">
                      <h4>Time Zones</h4>
                      <div className="timezone-list">
                        {timeZoneInfo.timezones.map((timezone, index) => (
                          <div key={index} className="timezone-item">
                            {timezone}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="daylight-saving">
                      <h4>Daylight Saving Time</h4>
                      <p>{timeZoneInfo.daylightSaving}</p>
                    </div>
                  </div>
                ) : (
                  <div className="timezone-placeholder">
                    <p>Select a country to see current time information</p>
                  </div>
                )}
              </div>
            </div>

            {/* Time Zone Converter */}
            <div className="timezone-converter-card">
              <h2 className="timezone-card-title">Meeting Planner</h2>
              <p className="timezone-card-description">
                Find the best time for international meetings across different time zones.
              </p>

              <div className="meeting-planner">
                <div className="meeting-time-inputs">
                  <div className="form-group">
                    <label>Your Time</label>
                    <input type="time" className="input" defaultValue="09:00" />
                  </div>

                  <div className="meeting-equals">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </div>

                  <div className="form-group">
                    <label>{timeZoneInfo ? timeZoneInfo.country : "Destination"} Time</label>
                    <input
                      type="time"
                      className="input"
                      value={timeZoneInfo ? "09:00" : ""}
                      readOnly
                      placeholder="Select a country first"
                    />
                  </div>
                </div>

                <div className="meeting-suggestion">
                  <h4>Suggested Meeting Times</h4>
                  <div className="meeting-times">
                    <div className="meeting-time-slot">
                      <div className="meeting-time-local">9:00 AM</div>
                      <div className="meeting-time-arrow">→</div>
                      <div className="meeting-time-destination">
                        {timeZoneInfo
                          ? `${timeDifference >= 0 ? (9 + timeDifference) % 24 : (9 + 24 + timeDifference) % 24}:00 ${(9 + timeDifference) % 24 >= 12 ? "PM" : "AM"}`
                          : "--:--"}
                      </div>
                    </div>
                    <div className="meeting-time-slot">
                      <div className="meeting-time-local">3:00 PM</div>
                      <div className="meeting-time-arrow">→</div>
                      <div className="meeting-time-destination">
                        {timeZoneInfo
                          ? `${timeDifference >= 0 ? (15 + timeDifference) % 24 : (15 + 24 + timeDifference) % 24}:00 ${(15 + timeDifference) % 24 >= 12 ? "PM" : "AM"}`
                          : "--:--"}
                      </div>
                    </div>
                    <div className="meeting-time-slot">
                      <div className="meeting-time-local">7:00 PM</div>
                      <div className="meeting-time-arrow">→</div>
                      <div className="meeting-time-destination">
                        {timeZoneInfo
                          ? `${timeDifference >= 0 ? (19 + timeDifference) % 24 : (19 + 24 + timeDifference) % 24}:00 ${(19 + timeDifference) % 24 >= 12 ? "PM" : "AM"}`
                          : "--:--"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
