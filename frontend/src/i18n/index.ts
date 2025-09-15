import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Importar arquivos de tradução
import ptBR from './locales/pt-BR.json'
import enUS from './locales/en-US.json'

const resources = {
  'pt-BR': {
    translation: ptBR
  },
  'en-US': {
    translation: enUS
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt-BR', // idioma padrão
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false // React já escapa valores por padrão
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })

export default i18n
