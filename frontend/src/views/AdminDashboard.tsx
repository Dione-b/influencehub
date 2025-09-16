import { useAuth } from '../state/AuthContext'
import { useData } from '../state/DataContext'
import { LayoutDashboard, CalendarDays, CheckCircle2 } from 'lucide-react'
import { PageHeader, StatCard, EmptyState } from '../ui/Primitives'
import { useTranslation } from '../i18n/hooks/useTranslation'

export function AdminDashboard() {
  const { user } = useAuth()
  const { submissions, events } = useData()
  const { t } = useTranslation()

  if (user?.role !== 'ADMIN') return <div>{t('approvals.onlyAdmins')}</div>

  const pending = submissions.filter((s) => s.status === 'pending')

  return (
    <div className="space-y-6 page-root relative z-10">
      <PageHeader icon={<LayoutDashboard />} title={t('admin.dashboard')} />
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard icon={<CheckCircle2 />} label={t('missions.pending')} value={pending.length} accent={pending.length > 0} />
        <div className="card md:col-span-2">
          <div className="flex items-center gap-3 mb-2">
            <CalendarDays className="text-yellow-400" />
            <h2 className="font-semibold">{t('events.title')}</h2>
          </div>
          {events.length === 0 ? (
            <EmptyState title={t('events.noEvents')} />
          ) : (
            <ul className="text-sm text-zinc-300 space-y-2">
              {events.map((e) => (
                <li key={e.id} className="flex items-center justify-between bg-zinc-800/50 rounded px-3 py-2">
                  <span>{e.name} - {e.location}</span>
                  <span className="text-xs text-zinc-400">{e.date}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
