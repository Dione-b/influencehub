import { useTranslation } from '../i18n/hooks/useTranslation'
import type { Language } from '../i18n/types'
import { Globe } from 'lucide-react'

export function LanguageSelector() {
  const { currentLanguage, changeLanguage } = useTranslation()

  const languages = [
    { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
    { code: 'en-US', name: 'English', flag: '🇺🇸' }
  ]

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors rounded-md hover:bg-zinc-800">
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">
          {languages.find(lang => lang.code === currentLanguage)?.flag}
        </span>
      </button>
      
      <div className="absolute right-0 top-full mt-1 w-48 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code as Language)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-zinc-800 transition-colors ${
                currentLanguage === language.code ? 'text-yellow-400 bg-zinc-800' : 'text-zinc-300'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
