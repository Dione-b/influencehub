import { useMemo } from 'react'
import { useAuth } from '../state/AuthContext'
import { useData } from '../state/DataContext'
import { Trophy, Target, CalendarCheck2 } from 'lucide-react'
import { PageHeader, StatCard, Badge, EmptyState } from '../ui/Primitives'
import { useTranslation } from '../i18n/hooks/useTranslation'

export function InfluencerDashboard() {
  const { user } = useAuth()
  const { submissions, missions } = useData()
  const { t } = useTranslation()

  const myApproved = useMemo(() => submissions.filter((s) => s.userId === user?.id && s.status === 'approved'), [submissions, user])
  const available = useMemo(() => missions.filter((m) => m.status === 'ativa'), [missions])

  return (
    <div className="space-y-6 page-root relative z-10">
      <PageHeader title={t('dashboard.welcome') + (user?.name ? `, ${user.name}` : '!')} subtitle={t('dashboard.subtitle')} />
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard icon={<Trophy />} label={t('dashboard.totalPoints')} value={user?.totalPoints ?? 0} accent />
        <StatCard icon={<Target />} label={t('dashboard.missionsCompleted')} value={myApproved.length} />
        <StatCard icon={<CalendarCheck2 />} label={t('dashboard.eventsAttended')} value={1} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="font-semibold mb-2">{t('dashboard.recentCompleted')}</h2>
          {myApproved.length === 0 ? (
            <EmptyState title={t('dashboard.noCompleted')} description={t('dashboard.completeMissionsHint')} />
          ) : (
            <ul className="text-sm text-zinc-300 space-y-2">
              {myApproved.map((s) => {
                const m = missions.find((mm) => mm.id === s.missionId)
                return (
                  <li key={s.id} className="flex items-center justify-between bg-zinc-800/50 rounded px-3 py-2">
                    <span>{m?.title}</span>
                    <Badge color="yellow">+{m?.points} pts</Badge>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <div className="card">
          <h2 className="font-semibold mb-2">{t('missions.available')}</h2>
          <div className="space-y-3">
            {available.map((m) => (
              <div key={m.id} className="flex items-center justify-between bg-zinc-800/50 rounded px-3 py-2">
                <div>
                  <div className="font-semibold">{m.title}</div>
                  <div className="text-xs text-zinc-400">{m.description}</div>
                </div>
                <Badge color="yellow">{m.points} pts</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
