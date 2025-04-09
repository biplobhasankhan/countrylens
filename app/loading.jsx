import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ThemeToggle from "@/components/theme-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CountryLens - Explore Countries Around the World",
  description: "A modern dashboard to explore and learn about countries worldwide",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
