import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from '../i18n/hooks/useTranslation'
import { LanguageSelector } from './LanguageSelector'

export function LandingHeader() {
  const { t } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="text-2xl font-extrabold text-yellow-400">InfluenceHub</div>
          </Link>
          
          {/* Language Selector */}
          <div className="flex items-center gap-4 mr-16">
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/ranking" className="text-zinc-300 hover:text-white transition-colors">
                {t('common.ranking')}
              </Link>
              <Link to="/login" className="text-zinc-300 hover:text-white transition-colors">
                {t('common.login')}
              </Link>
              <Link to="/cadastrar" className="btn btn-primary text-sm">
                {t('common.register')}
              </Link>
            </nav>

            <LanguageSelector />
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-zinc-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800 bg-black/95 backdrop-blur">
            <nav className="px-6 py-4 space-y-3">
              <Link 
                to="/ranking" 
                className="block text-zinc-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('common.ranking')}
              </Link>
              <Link 
                to="/login" 
                className="block text-zinc-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('common.login')}
              </Link>
              <Link 
                to="/cadastrar" 
                className="block btn btn-primary text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('common.register')}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
