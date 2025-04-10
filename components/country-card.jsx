import Link from "next/link"

export default function CountryCard({ country, index }) {
  const formatPopulation = (population) => {
    return new Intl.NumberFormat().format(population)
  }

  return (
    <Link href={`/country/${country.cca3}`}>
      <div className="country-card">
        <div className="flag-container">
          <img src={country.flags.svg || country.flags.png} alt={`Flag of ${country.name.common}`} loading="lazy" />
        </div>
        <div className="card-content">
          <h3 className="country-name">{country.name.common}</h3>
          <div className="country-info">
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
            <span>{country.region}</span>
          </div>
          <div className="country-info">
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>{formatPopulation(country.population)}</span>
          </div>
          <div className="country-info">
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
              <path d="M6 22V2a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v20" />
              <path d="M18 11h.01" />
              <path d="M18 6h.01" />
              <path d="M18 16h.01" />
              <path d="M6 16h12" />
              <path d="M2 22h20" />
            </svg>
            <span>{country.capital?.[0] || "N/A"}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
