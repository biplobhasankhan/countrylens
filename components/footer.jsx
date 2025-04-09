import { GithubIcon, HeartIcon, MailIcon } from "@/components/icons"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">CountryLens</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A modern dashboard to explore and learn about countries around the world.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/biplobhasankhan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
              >
                <GithubIcon size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="mailto:biplobkhan.own@gmail.com"
                className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
              >
                <MailIcon size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Compare Countries
                </Link>
              </li>
              <li>
                <Link
                  href="/map"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Map Explorer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Data Sources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://restcountries.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  REST Countries API
                </a>
              </li>
              <li>
                <a
                  href="https://developers.google.com/maps/documentation/embed/get-started"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Google Maps Embed API
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center">
            Made with <HeartIcon className="h-4 w-4 mx-1 text-red-500" /> by Biplob Hasan Khan
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            &copy; {new Date().getFullYear()} CountryLens. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
