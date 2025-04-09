"use client"

import { motion } from "framer-motion"
import { GlobeIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-40 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center">
              <GlobeIcon className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                CountryLens
              </h1>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Link href="/about">
              <Button variant="ghost" className="text-emerald-700 dark:text-emerald-400">
                About
              </Button>
            </Link>
            <Link href="/compare">
              <Button
                variant="outline"
                className="border-emerald-500 text-emerald-700 dark:text-emerald-400 dark:border-emerald-700"
              >
                Compare Countries
              </Button>
            </Link>
            <ThemeToggle />
          </motion.div>
        </div>
      </div>
    </header>
  )
}
