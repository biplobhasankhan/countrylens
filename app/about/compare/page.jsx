"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeftIcon, UsersIcon, Globe2Icon, MapPinIcon, LanguagesIcon, CoinsIcon } from "@/components/icons"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import Footer from "@/components/footer"

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
      if (!countryCode) return

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
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
        <p className="text-gray-700 dark:text-gray-300">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link href="/">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-emerald-200 text-emerald-700 dark:border-gray-700 dark:text-emerald-400"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Countries
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Compare Countries</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Select two countries to compare their statistics side by side.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">First Country</h2>
              {loading ? (
                <Skeleton className="h-10 w-full dark:bg-gray-700" />
              ) : (
                <Select value={selectedCountry1} onValueChange={setSelectedCountry1}>
                  <SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    {countries.map((country) => (
                      <SelectItem key={country.cca3} value={country.cca3} className="dark:text-gray-200">
                        {country.name.common}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Second Country</h2>
              {loading ? (
                <Skeleton className="h-10 w-full dark:bg-gray-700" />
              ) : (
                <Select value={selectedCountry2} onValueChange={setSelectedCountry2}>
                  <SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    {countries.map((country) => (
                      <SelectItem key={country.cca3} value={country.cca3} className="dark:text-gray-200">
                        {country.name.common}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </CardContent>
          </Card>
        </div>

        {loadingComparison ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full rounded-lg dark:bg-gray-700" />
            <Skeleton className="h-96 w-full rounded-lg dark:bg-gray-700" />
          </div>
        ) : country1Data && country2Data ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={country1Data.flags.svg || country1Data.flags.png}
                    alt={`Flag of ${country1Data.name.common}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{country1Data.name.common}</h2>
              </div>

              <div className="space-y-6">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={country2Data.flags.svg || country2Data.flags.png}
                    alt={`Flag of ${country2Data.name.common}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{country2Data.name.common}</h2>
              </div>
            </div>

            <div className="space-y-6">
              <ComparisonRow
                title="Region"
                icon={<MapPinIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
                value1={country1Data.region}
                value2={country2Data.region}
              />

              <ComparisonRow
                title="Population"
                icon={<UsersIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
                value1={formatPopulation(country1Data.population)}
                value2={formatPopulation(country2Data.population)}
                highlight={country1Data.population !== country2Data.population}
              />

              <ComparisonRow
                title="Capital"
                icon={<Globe2Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
                value1={country1Data.capital?.[0] || "N/A"}
                value2={country2Data.capital?.[0] || "N/A"}
              />

              <ComparisonRow
                title="Area"
                icon={<MapPinIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
                value1={`${formatNumber(country1Data.area)} km²`}
                value2={`${formatNumber(country2Data.area)} km²`}
                highlight={country1Data.area !== country2Data.area}
              />

              <ComparisonRow
                title="Languages"
                icon={<LanguagesIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
                value1={country1Data.languages ? Object.values(country1Data.languages).join(", ") : "N/A"}
                value2={country2Data.languages ? Object.values(country2Data.languages).join(", ") : "N/A"}
              />

              <ComparisonRow
                title="Currencies"
                icon={<CoinsIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
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
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Select two countries to compare
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Choose countries from the dropdown menus above to see a detailed comparison.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

function ComparisonRow({ title, icon, value1, value2, highlight = false }) {
  const isSame = value1 === value2

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="mr-3">{icon}</div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-lg ${highlight && !isSame ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-gray-50 dark:bg-gray-700"}`}
          >
            <p className="font-medium text-gray-800 dark:text-gray-200">{value1}</p>
          </div>

          <div
            className={`p-4 rounded-lg ${highlight && !isSame ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-gray-50 dark:bg-gray-700"}`}
          >
            <p className="font-medium text-gray-800 dark:text-gray-200">{value2}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
