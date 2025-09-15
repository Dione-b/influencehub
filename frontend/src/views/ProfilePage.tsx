import { useMemo } from 'react'
import { useAuth } from '../state/AuthContext'
import { useData } from '../state/DataContext'
import { UserCircle2, Trophy, CalendarCheck2, Target } from 'lucide-react'
import { PageHeader, StatCard, EmptyState } from '../ui/Primitives'

export function ProfilePage() {
  const { user } = useAuth()
  const { submissions, attendance, missions, events } = useData()

  const history = useMemo(() => {
    if (!user) return { completed: [], attended: [] as string[] }
    const completed = submissions
      .filter((s) => s.userId === user.id && s.status === 'approved')
      .map((s) => {
        const m = missions.find((mm) => mm.id === s.missionId)
        return `${m?.title} - ${s.date}`
      })
    const attended = attendance
      .filter((a) => a.userId === user.id)
      .map((a) => {
        const ev = events.find((e) => e.id === a.eventId)
        return `${ev?.name} - ${a.date}`
      })
    return { completed, attended }
  }, [user, submissions, attendance, missions, events])

  if (!user) return <div>Faça login para ver seu perfil.</div>

  return (
    <div className="space-y-6 page-root relative z-10">
      <PageHeader icon={<UserCircle2 />} title="Perfil" />
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card">
          <div className="font-semibold">{user.name}</div>
          <div className="text-sm text-zinc-400">{user.email}</div>
          <div className="text-xs mt-2 inline-block px-2 py-0.5 rounded-full bg-zinc-800">{user.role === 'ADMIN' ? 'Administrador' : 'Embaixador'}</div>
        </div>
        <StatCard icon={<Trophy />} label="Pontos Totais" value={user.totalPoints} accent />
        <StatCard icon={<Target />} label="Missões Concluídas" value={history.completed.length} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <div className="flex items-center gap-2 mb-2"><Target className="text-yellow-400" size={18} /><h2 className="font-semibold">Histórico de Missões</h2></div>
          {history.completed.length === 0 ? (
            <EmptyState title="Sem histórico ainda" />
          ) : (
            <ul className="list-disc pl-5 text-sm text-zinc-300">
              {history.completed.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          )}
        </div>
        <div className="card">
          <div className="flex items-center gap-2 mb-2"><CalendarCheck2 className="text-yellow-400" size={18} /><h2 className="font-semibold">Histórico de Eventos</h2></div>
          {history.attended.length === 0 ? (
            <EmptyState title="Sem eventos registrados" />
          ) : (
            <ul className="list-disc pl-5 text-sm text-zinc-300">
              {history.attended.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
