import "./globals.css"
import "./styles/footer.css"
import "./styles/filter.css"
import "./styles/features.css"
import "./styles/header.css"
import { Inter } from "next/font/google"

// Initialize the Inter font with the subsets and weights we need
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata = {
  title: "CountryLens - Explore Countries Around the World",
  description: "A modern dashboard to explore and learn about countries worldwide",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
