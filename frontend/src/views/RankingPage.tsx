import { MOCK_USERS } from '../state/mockData'
import { Trophy, ArrowLeft, Crown, Medal, Award } from 'lucide-react'
import { useTranslation } from '../i18n/hooks/useTranslation'
import { Link } from 'react-router-dom'

export function RankingPage() {
  const { t } = useTranslation()
  
  const ranking = [...MOCK_USERS]
    .filter((u) => u.role === 'INFLUENCER')
    .sort((a, b) => b.totalPoints - a.totalPoints)

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">{t('common.back')}</span>
          </Link>
          <div className="flex items-center gap-3">
            <Trophy className="text-yellow-400" size={32} />
            <div>
              <h1 className="text-3xl font-extrabold">{t('ranking.title')}</h1>
              <p className="text-zinc-400">{t('ranking.description')}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-zinc-400">{t('ranking.totalInfluencers')}</div>
          <div className="text-2xl font-bold text-yellow-400">{ranking.length}</div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-8">{t('ranking.top3')}</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* 2nd Place */}
          <div className="order-2 md:order-1">
            <div className="card text-center relative p-8">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center">
                  <Medal className="text-zinc-300 w-6 h-6" />
                </div>
              </div>
              <div className="pt-8">
                <div className="text-2xl font-bold text-zinc-300">2º</div>
                <div className="font-semibold mt-2">{ranking[1]?.name || t('ranking.noData')}</div>
                <div className="text-yellow-400 text-2xl font-extrabold mt-1">{ranking[1]?.totalPoints || 0}</div>
                <div className="text-xs text-zinc-400">{t('ranking.points')}</div>
              </div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="order-1 md:order-2">
            <div className="card top-1 text-center relative border-2 border-yellow-400 p-10">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center">
                  <Crown className="text-black w-8 h-8" />
                </div>
              </div>
              <div className="pt-10">
                <div className="text-3xl font-bold text-yellow-400">1º</div>
                <div className="font-semibold mt-2 text-lg">{ranking[0]?.name || t('ranking.noData')}</div>
                <div className="text-yellow-400 text-4xl font-extrabold mt-1">{ranking[0]?.totalPoints || 0}</div>
                <div className="text-xs text-zinc-400">{t('ranking.points')}</div>
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="order-3">
            <div className="card text-center relative p-8">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center">
                  <Award className="text-white w-6 h-6" />
                </div>
              </div>
              <div className="pt-8">
                <div className="text-2xl font-bold text-orange-400">3º</div>
                <div className="font-semibold mt-2">{ranking[2]?.name || t('ranking.noData')}</div>
                <div className="text-yellow-400 text-2xl font-extrabold mt-1">{ranking[2]?.totalPoints || 0}</div>
                <div className="text-xs text-zinc-400">{t('ranking.points')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Ranking Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold">{t('ranking.fullRanking')}</h3>
          <div className="text-sm text-zinc-400">
            {t('ranking.showing')} {ranking.length} {t('ranking.influencers')}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-4 px-6 text-zinc-400 font-medium">{t('ranking.position')}</th>
                <th className="text-left py-4 px-6 text-zinc-400 font-medium">{t('ranking.name')}</th>
                <th className="text-left py-4 px-6 text-zinc-400 font-medium">{t('ranking.level')}</th>
                <th className="text-right py-4 px-6 text-zinc-400 font-medium">{t('ranking.points')}</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((u, idx) => (
                <tr key={u.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-zinc-300">#{idx + 1}</span>
                      {idx < 3 && (
                        <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
                          <Trophy className="w-3 h-3 text-black" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="font-semibold">{u.name}</div>
                    <div className="text-sm text-zinc-400">{u.email}</div>
                  </td>
                  <td className="py-5 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300">
                      {t('ranking.influencer')}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <div className="text-yellow-400 font-bold text-lg">{u.totalPoints}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold mb-6">{t('ranking.joinUs')}</h3>
        <p className="text-zinc-400 mb-8">{t('ranking.joinUsDesc')}</p>
        <div className="flex justify-center gap-4">
          <Link to="/cadastrar" className="btn btn-primary">
            {t('common.register')}
          </Link>
          <Link to="/login" className="btn bg-zinc-900">
            {t('common.login')}
          </Link>
        </div>
      </div>
    </div>
  )
}
