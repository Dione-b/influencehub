import { Link } from 'react-router-dom'
import { MOCK_EVENTS, MOCK_USERS } from '../state/mockData'
import { CalendarDays, Target, Trophy, ShieldCheck, Users2, Zap } from 'lucide-react'
import { useTranslation } from '../i18n/hooks/useTranslation'
import { LandingHeader } from '../ui/LandingHeader'

export function LandingPage() {
  const { t } = useTranslation()
  
  const ranking = [...MOCK_USERS]
    .filter((u) => u.role === 'EMBASSADOR')
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 5)

  const events = MOCK_EVENTS.slice(0, 3)

  return (
    <div className="min-h-screen bg-black text-white relative page-root">
      <LandingHeader />
      
      {/* Hero */}
      <section className="relative z-10 px-6 pt-32 pb-16 md:pt-40 md:pb-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs text-black bg-yellow-400 font-semibold rounded-full px-3 py-1 mb-4">{t('landing.officialProgram')}</div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1]">
            {t('landing.heroTitle')}<br />
            <span className="text-yellow-400">{t('landing.heroSubtitle')}</span>
          </h1>
          <p className="mt-4 text-zinc-300 text-lg">
            {t('landing.heroDescription')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/login" className="btn btn-primary">{t('landing.loginButton')}</Link>
            <Link to="/cadastrar" className="btn bg-zinc-900">{t('landing.registerButton')}</Link>
          </div>
          <div className="mt-6 text-sm text-zinc-400">{t('landing.freeStart')}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <HeroCard icon={<Target className="text-yellow-400" />} title={t('landing.missions')} text={t('landing.missionsDesc')} />
          <HeroCard icon={<CalendarDays className="text-yellow-400" />} title={t('landing.events')} text={t('landing.eventsDesc')} />
          <HeroCard icon={<Trophy className="text-yellow-400" />} title={t('landing.ranking')} text={t('landing.rankingDesc')} />
          <HeroCard icon={<ShieldCheck className="text-yellow-400" />} title={t('landing.approval')} text={t('landing.approvalDesc')} />
        </div>
      </section>

      <div className="soft-divider" />

      {/* O que fazemos */}
      <section className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6">{t('landing.whatWeDo')}</h2>
        <div className="grid md:grid-cols-5 gap-4">
          <FeatureCard icon={<Users2 className="text-yellow-400" />} title={t('landing.workshops')} desc={t('landing.workshopsDesc')} />
          <FeatureCard icon={<Trophy className="text-yellow-400" />} title={t('landing.talks')} desc={t('landing.talksDesc')} />
          <FeatureCard icon={<CalendarDays className="text-yellow-400" />} title={t('landing.events')} desc={t('landing.eventsDesc2')} />
          <FeatureCard icon={<ShieldCheck className="text-yellow-400" />} title={t('landing.tutorials')} desc={t('landing.tutorialsDesc')} />
          <FeatureCard icon={<Users2 className="text-yellow-400" />} title={t('landing.studyGroup')} desc={t('landing.studyGroupDesc')} />
        </div>
      </section>

      {/* Benefícios */}
      <section className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 flex items-center gap-2"><Zap className="text-yellow-400" /> {t('landing.whyAmbassador')}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <FeatureCard icon={<Users2 className="text-yellow-400" />} title={t('landing.buildCommunity')} desc={t('landing.buildCommunityDesc')} />
          <FeatureCard icon={<Target className="text-yellow-400" />} title={t('landing.gamification')} desc={t('landing.gamificationDesc')} />
          <FeatureCard icon={<Trophy className="text-yellow-400" />} title={t('landing.recognition')} desc={t('landing.recognitionDesc')} />
        </div>
      </section>

      <div className="soft-divider" />

      {/* Ranking */}
      <section className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2"><Trophy className="text-yellow-400" /> {t('landing.topAmbassadors')}</h2>
          <Link to="/app/ranking" className="text-yellow-400 text-sm">{t('landing.viewFullRanking')}</Link>
        </div>
        <div className="grid md:grid-cols-5 gap-3">
          {ranking.map((u, idx) => (
            <div key={u.id} className="card text-center">
              <div className="text-xs text-zinc-400">{idx + 1}º</div>
              <div className="font-semibold mt-1">{u.name}</div>
              <div className="text-yellow-400 text-xl font-extrabold mt-1">{u.totalPoints}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="soft-divider" />

      {/* Eventos */}
      <section className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2"><CalendarDays className="text-yellow-400" /> {t('landing.upcomingEvents')}</h2>
          <Link to="/login" className="text-yellow-400 text-sm">{t('landing.doCheckin')}</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {events.map((e) => (
            <div key={e.id} className="card">
              <div className="font-semibold">{e.name}</div>
              <div className="text-sm text-zinc-400">{e.location}</div>
              <div className="text-xs text-zinc-500 mt-1">{e.date}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="soft-divider" />

      {/* CTA final */}
      <section className="relative z-10 px-6 py-16 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">{t('landing.readyToStart')}</h2>
        <p className="text-zinc-300 mt-2">{t('landing.readyToStartDesc')}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/cadastrar" className="btn btn-primary">{t('landing.registerButton')}</Link>
          <Link to="/login" className="btn bg-zinc-900">{t('landing.loginButton')}</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black/80 backdrop-blur mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-extrabold text-yellow-400 mb-4">Blockchain Ambassadors</div>
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
                <div>contato@blockchainambassadors.com</div>
                <div>Discord: blockchainambassadors</div>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-6 text-center text-sm text-zinc-500">
            © 2024 Blockchain Ambassadors. {t('common.allRightsReserved')}
          </div>
        </div>
      </footer>
    </div>
  )
}

function HeroCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="card min-h-[120px]">
      <div className="flex items-start gap-3">
        <div className="mt-1">{icon}</div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-zinc-400">{text}</div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="card">
      <div className="flex items-start gap-3">
        <div className="mt-1">{icon}</div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-zinc-400">{desc}</div>
        </div>
      </div>
    </div>
  )
}


