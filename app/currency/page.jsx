"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { getExchangeRates } from "@/services/api-service"

export default function CurrencyConverter() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [exchangeRates, setExchangeRates] = useState(null)
  const [loadingRates, setLoadingRates] = useState(false)

  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [convertedAmount, setConvertedAmount] = useState(null)

  const [selectedCountry, setSelectedCountry] = useState("")
  const [costOfLiving, setCostOfLiving] = useState(null)

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
    fetchExchangeRates()
  }, [])

  const fetchExchangeRates = async () => {
    setLoadingRates(true)
    const rates = await getExchangeRates()
    setExchangeRates(rates)
    setLoadingRates(false)
  }

  useEffect(() => {
    if (exchangeRates && fromCurrency && toCurrency) {
      const fromRate = exchangeRates.rates[fromCurrency] || 1
      const toRate = exchangeRates.rates[toCurrency] || 1
      const result = (amount / fromRate) * toRate
      setConvertedAmount(result.toFixed(2))
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates])

  const handleCountrySelect = async (countryCode) => {
    setSelectedCountry(countryCode)

    if (!countryCode) {
      setCostOfLiving(null)
      return
    }

    // Find the country
    const country = countries.find((c) => c.cca3 === countryCode)
    if (!country) return

    // Get the currency code
    const currencyCodes = country.currencies ? Object.keys(country.currencies) : []
    const currencyCode = currencyCodes.length > 0 ? currencyCodes[0] : "USD"

    // Mock cost of living data
    const mockCostOfLiving = {
      country: country.name.common,
      currency: currencyCode,
      costs: {
        coffee: (Math.random() * 5 + 1).toFixed(2),
        meal: (Math.random() * 20 + 5).toFixed(2),
        transport: (Math.random() * 3 + 1).toFixed(2),
        hotel: (Math.random() * 150 + 50).toFixed(2),
      },
      index: Math.floor(Math.random() * 100 + 50),
    }

    setCostOfLiving(mockCostOfLiving)
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

            <h1 className="section-title">Currency Converter</h1>
            <p className="section-description">Convert between currencies and check cost of living information.</p>

            <div className="currency-grid">
              {/* Currency Converter Section */}
              <div className="currency-card">
                <h2 className="currency-card-title">Currency Converter</h2>
                <div className="converter-form">
                  <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                      type="number"
                      id="amount"
                      className="input"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="0"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="from-currency">From</label>
                      <select
                        id="from-currency"
                        className="input"
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        disabled={loadingRates}
                      >
                        {exchangeRates &&
                          Object.keys(exchangeRates.rates).map((currency) => (
                            <option key={`from-${currency}`} value={currency}>
                              {currency}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="currency-swap">
                      <button
                        className="btn btn-outline btn-icon"
                        onClick={() => {
                          const temp = fromCurrency
                          setFromCurrency(toCurrency)
                          setToCurrency(temp)
                        }}
                        aria-label="Swap currencies"
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
                          <path d="m17 10-5-6-5 6" />
                          <path d="m17 14-5 6-5-6" />
                        </svg>
                      </button>
                    </div>

                    <div className="form-group">
                      <label htmlFor="to-currency">To</label>
                      <select
                        id="to-currency"
                        className="input"
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        disabled={loadingRates}
                      >
                        {exchangeRates &&
                          Object.keys(exchangeRates.rates).map((currency) => (
                            <option key={`to-${currency}`} value={currency}>
                              {currency}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="conversion-result">
                    <div className="result-amount">
                      {loadingRates ? (
                        <div className="skeleton result-skeleton"></div>
                      ) : (
                        <>
                          <span className="amount-value">{amount}</span>
                          <span className="amount-currency">{fromCurrency}</span>
                          <span className="amount-equals">=</span>
                          <span className="amount-value">{convertedAmount}</span>
                          <span className="amount-currency">{toCurrency}</span>
                        </>
                      )}
                    </div>

                    <div className="exchange-rate-info">
                      {exchangeRates && <p>Exchange rate as of {exchangeRates.date}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost of Living Section */}
              <div className="currency-card">
                <h2 className="currency-card-title">Cost of Living</h2>
                <p className="currency-card-description">
                  Check typical costs for common items in different countries.
                </p>

                <div className="cost-form">
                  <div className="form-group">
                    <label htmlFor="cost-country">Select Country</label>
                    {loading ? (
                      <div className="skeleton select-skeleton"></div>
                    ) : (
                      <select
                        id="cost-country"
                        className="input"
                        value={selectedCountry}
                        onChange={(e) => handleCountrySelect(e.target.value)}
                      >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                          <option key={`cost-${country.cca3}`} value={country.cca3}>
                            {country.name.common}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                {costOfLiving && (
                  <div className="cost-of-living-result">
                    <h3>Cost of Living in {costOfLiving.country}</h3>
                    <div className="cost-index">
                      <div className="cost-index-bar">
                        <div className="cost-index-fill" style={{ width: `${costOfLiving.index}%` }}></div>
                      </div>
                      <div className="cost-index-value">Cost of Living Index: {costOfLiving.index}</div>
                    </div>

                    <div className="typical-costs">
                      <h4>Typical Costs ({costOfLiving.currency})</h4>
                      <div className="cost-item">
                        <span className="cost-item-name">Coffee</span>
                        <span className="cost-item-value">{costOfLiving.costs.coffee}</span>
                      </div>
                      <div className="cost-item">
                        <span className="cost-item-name">Meal (Inexpensive Restaurant)</span>
                        <span className="cost-item-value">{costOfLiving.costs.meal}</span>
                      </div>
                      <div className="cost-item">
                        <span className="cost-item-name">One-way Transport Ticket</span>
                        <span className="cost-item-value">{costOfLiving.costs.transport}</span>
                      </div>
                      <div className="cost-item">
                        <span className="cost-item-name">Hotel (Average per night)</span>
                        <span className="cost-item-value">{costOfLiving.costs.hotel}</span>
                      </div>
                    </div>

                    <div className="cost-note">
                      <p>
                        <strong>Note:</strong> These are estimated average costs and may vary by location and season.
                      </p>
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
