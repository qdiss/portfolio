import { createContext, useContext, useState } from 'react'
import translations from '../i18n/translations.js'

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('lang')
      return saved && translations[saved] ? saved : 'en'
    } catch { return 'en' }
  })
  const [fading, setFading] = useState(false)

  const setLang = (l) => {
    if (l === lang) return
    setFading(true)
    setTimeout(() => {
      setLangState(l)
      try { localStorage.setItem('lang', l) } catch {}
      setTimeout(() => setFading(false), 50)
    }, 180)
  }

  const t = translations[lang]

  return (
    <LangContext.Provider value={{ lang, setLang, t, fading }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
