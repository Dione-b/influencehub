import { Link, Outlet } from 'react-router-dom'
import { useTranslation } from '../i18n/hooks/useTranslation'
import { LandingHeader } from './LandingHeader'

export function PublicLayout() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-black text-white relative page-root">
      <LandingHeader />
      
      <main className="pt-20 pb-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-extrabold text-yellow-400 mb-4">InfluenceHub</div>
              <p className="text-zinc-400 text-sm">
                {t('landing.heroDescription')}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('common.quickLinks')}</h3>
              <div className="space-y-2 text-sm">
                <Link to="/ranking" className="block text-zinc-400 hover:text-white transition-colors">
                  {t('common.ranking')}
                </Link>
                <Link to="/login" className="block text-zinc-400 hover:text-white transition-colors">
                  {t('common.login')}
                </Link>
                <Link to="/cadastrar" className="block text-zinc-400 hover:text-white transition-colors">
                  {t('common.register')}
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('common.contact')}</h3>
              <div className="space-y-2 text-sm text-zinc-400">
                <div>contato@influencehub.life</div>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-6 text-center text-sm text-zinc-500">
            © 2025 InfluenceHub. {t('common.allRightsReserved')}
          </div>
        </div>
      </footer>
    </div>
  )
}
