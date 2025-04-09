"use client"
import { UsersIcon, MapPinIcon, Globe2Icon } from "@/components/icons"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function CountryCard({ country }) {
  const formatPopulation = (population) => {
    return new Intl.NumberFormat().format(population)
  }

  return (
    <Link href={`/country/${country.cca3}`}>
      <Card className="overflow-hidden h-full country-card border-emerald-100 hover:border-emerald-300 dark:border-gray-700 dark:hover:border-emerald-700 dark:bg-gray-800">
        <div className="flag-container">
          <img
            src={country.flags.svg || country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100 truncate">{country.name.common}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <MapPinIcon className="h-4 w-4 mr-2 text-emerald-600 dark:text-emerald-400" />
              <span>{country.region}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <UsersIcon className="h-4 w-4 mr-2 text-emerald-600 dark:text-emerald-400" />
              <span>{formatPopulation(country.population)}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Globe2Icon className="h-4 w-4 mr-2 text-emerald-600 dark:text-emerald-400" />
              <span>{country.capital?.[0] || "N/A"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
