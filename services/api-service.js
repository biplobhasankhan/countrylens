// API service for external data sources

// Travel Advisory API
export async function getTravelAdvisory(countryCode) {
    try {
      // Note: In a production app, you would use a real travel advisory API
      // This is a mock implementation for demonstration
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      if (!response.ok) throw new Error("Failed to fetch country data")
      const countryData = await response.json()
  
      // Generate mock travel advisory data
      return {
        country: countryData[0].name.common,
        riskLevel: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
        lastUpdated: new Date().toISOString().split("T")[0],
        advisoryText: `Exercise normal security precautions in ${countryData[0].name.common}.`,
        areas: {
          avoid: [],
          caution: [],
        },
      }
    } catch (error) {
      console.error("Error fetching travel advisory:", error)
      return null
    }
  }
  
  // Visa Requirements API
  export async function getVisaRequirements(citizenshipCountry, destinationCountry) {
    try {
      // Mock visa data - in a real app, you would use a visa requirements API
      const visaTypes = ["Visa required", "Visa on arrival", "E-visa available", "No visa required"]
      const randomIndex = Math.floor(Math.random() * visaTypes.length)
  
      return {
        citizenshipCountry,
        destinationCountry,
        requirement: visaTypes[randomIndex],
        stayDuration: randomIndex === 3 ? "90 days" : "30 days",
        processingTime: randomIndex === 0 ? "5-10 business days" : "N/A",
        fee: randomIndex === 0 ? "$50-100" : randomIndex === 1 ? "$25-50" : "Free",
        notes: "This is mock data for demonstration purposes.",
      }
    } catch (error) {
      console.error("Error fetching visa requirements:", error)
      return null
    }
  }
  
  // Currency Converter API
  export async function getExchangeRates(baseCurrency = "USD") {
    try {
      // In a production app, you would use a real currency API like Open Exchange Rates
      // This is a mock implementation
      const mockRates = {
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 150.23,
        AUD: 1.52,
        CAD: 1.36,
        CHF: 0.89,
        CNY: 7.24,
        INR: 83.12,
        BRL: 5.05,
      }
  
      return {
        base: baseCurrency,
        date: new Date().toISOString().split("T")[0],
        rates: mockRates,
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error)
      return null
    }
  }
  
  // Time Zone API
  export async function getTimeZoneInfo(countryCode) {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      if (!response.ok) throw new Error("Failed to fetch country data")
      const countryData = await response.json()
  
      const timezones = countryData[0].timezones || []
      const currentTimes = timezones.map((timezone) => {
        // Parse timezone string to get offset
        const match = timezone.match(/UTC([+-])(\d{2}):?(\d{2})?/)
        if (!match) return { timezone, time: new Date().toLocaleTimeString() }
  
        const sign = match[1] === "+" ? 1 : -1
        const hours = Number.parseInt(match[2]) * sign
        const minutes = match[3] ? Number.parseInt(match[3]) * sign : 0
  
        const date = new Date()
        date.setUTCHours(date.getUTCHours() + hours)
        date.setUTCMinutes(date.getUTCMinutes() + minutes)
  
        return {
          timezone,
          time: date.toLocaleTimeString(),
          date: date.toLocaleDateString(),
        }
      })
  
      return {
        country: countryData[0].name.common,
        timezones,
        currentTimes,
        daylightSaving: "Information not available", // Would come from a real API
      }
    } catch (error) {
      console.error("Error fetching timezone info:", error)
      return null
    }
  }
  
  // Language Phrases API
  export async function getLanguagePhrases(languageCode) {
    try {
      // Mock language phrases - in a real app, you would use a translation API
      const commonPhrases = {
        en: {
          greeting: "Hello",
          goodbye: "Goodbye",
          please: "Please",
          thankYou: "Thank you",
          yes: "Yes",
          no: "No",
          help: "Help",
          excuse: "Excuse me",
        },
        es: {
          greeting: "Hola",
          goodbye: "Adiós",
          please: "Por favor",
          thankYou: "Gracias",
          yes: "Sí",
          no: "No",
          help: "Ayuda",
          excuse: "Disculpe",
        },
        fr: {
          greeting: "Bonjour",
          goodbye: "Au revoir",
          please: "S'il vous plaît",
          thankYou: "Merci",
          yes: "Oui",
          no: "Non",
          help: "Aide",
          excuse: "Excusez-moi",
        },
        de: {
          greeting: "Hallo",
          goodbye: "Auf Wiedersehen",
          please: "Bitte",
          thankYou: "Danke",
          yes: "Ja",
          no: "Nein",
          help: "Hilfe",
          excuse: "Entschuldigung",
        },
        it: {
          greeting: "Ciao",
          goodbye: "Arrivederci",
          please: "Per favore",
          thankYou: "Grazie",
          yes: "Sì",
          no: "No",
          help: "Aiuto",
          excuse: "Scusi",
        },
        ja: {
          greeting: "こんにちは (Konnichiwa)",
          goodbye: "さようなら (Sayōnara)",
          please: "お願いします (Onegaishimasu)",
          thankYou: "ありがとう (Arigatō)",
          yes: "はい (Hai)",
          no: "いいえ (Iie)",
          help: "助けて (Tasukete)",
          excuse: "すみません (Sumimasen)",
        },
        zh: {
          greeting: "你好 (Nǐ hǎo)",
          goodbye: "再见 (Zàijiàn)",
          please: "请 (Qǐng)",
          thankYou: "谢谢 (Xièxiè)",
          yes: "是 (Shì)",
          no: "不 (Bù)",
          help: "帮助 (Bāngzhù)",
          excuse: "对不起 (Duìbùqǐ)",
        },
        ar: {
          greeting: "مرحبا (Marhaba)",
          goodbye: "مع السلامة (Ma'a as-salāma)",
          please: "من فضلك (Min fadlak)",
          thankYou: "شكرا (Shukran)",
          yes: "نعم (Na'am)",
          no: "لا (La)",
          help: "مساعدة (Musā'ada)",
          excuse: "عفوا (Afwan)",
        },
        ru: {
          greeting: "Здравствуйте (Zdravstvuyte)",
          goodbye: "До свидания (Do svidaniya)",
          please: "Пожалуйста (Pozhaluysta)",
          thankYou: "Спасибо (Spasibo)",
          yes: "Да (Da)",
          no: "Нет (Nyet)",
          help: "Помогите (Pomogite)",
          excuse: "Извините (Izvinite)",
        },
        pt: {
          greeting: "Olá",
          goodbye: "Adeus",
          please: "Por favor",
          thankYou: "Obrigado/a",
          yes: "Sim",
          no: "Não",
          help: "Ajuda",
          excuse: "Com licença",
        },
      }
  
      return commonPhrases[languageCode] || commonPhrases.en
    } catch (error) {
      console.error("Error fetching language phrases:", error)
      return null
    }
  }
  
  // Get country language data
  export async function getCountryLanguageData(countryCode) {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      if (!response.ok) throw new Error("Failed to fetch country data")
      const countryData = await response.json()
  
      const languages = countryData[0].languages || {}
      const languageCodes = Object.keys(languages)
      const languageNames = Object.values(languages)
  
      // Mock data for language percentages and English proficiency
      const languagePercentages = {}
      let remainingPercentage = 100
  
      languageCodes.forEach((code, index) => {
        if (index === languageCodes.length - 1) {
          languagePercentages[code] = remainingPercentage
        } else {
          const percentage = Math.floor(remainingPercentage / (languageCodes.length - index))
          languagePercentages[code] = percentage
          remainingPercentage -= percentage
        }
      })
  
      const englishProficiency = languageCodes.includes("eng")
        ? "High"
        : ["Low", "Medium", "High"][Math.floor(Math.random() * 3)]
  
      return {
        country: countryData[0].name.common,
        languages: languageNames,
        languageCodes,
        languagePercentages,
        englishProficiency,
        officialLanguages: languageCodes.slice(0, 1), // Assume first language is official
      }
    } catch (error) {
      console.error("Error fetching country language data:", error)
      return null
    }
  }
  