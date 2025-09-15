import { useAuth } from '../state/AuthContext'
import { useData } from '../state/DataContext'
import { LayoutDashboard, CalendarDays, CheckCircle2 } from 'lucide-react'
import { PageHeader, StatCard, EmptyState } from '../ui/Primitives'

export function AdminDashboard() {
  const { user } = useAuth()
  const { submissions, events } = useData()

  if (user?.role !== 'ADMIN') return <div>Somente administradores.</div>

  const pending = submissions.filter((s) => s.status === 'pending')

  return (
    <div className="space-y-6 page-root relative z-10">
      <PageHeader icon={<LayoutDashboard />} title="Dashboard Administrativo" />
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard icon={<CheckCircle2 />} label="Missões pendentes" value={pending.length} accent={pending.length > 0} />
        <div className="card md:col-span-2">
          <div className="flex items-center gap-3 mb-2">
            <CalendarDays className="text-yellow-400" />
            <h2 className="font-semibold">Eventos cadastrados</h2>
          </div>
          {events.length === 0 ? (
            <EmptyState title="Nenhum evento cadastrado" />
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
