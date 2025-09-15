import { useMemo } from 'react'
import { useAuth } from '../state/AuthContext'
import { useData } from '../state/DataContext'
import { Trophy, Target, CalendarCheck2 } from 'lucide-react'
import { PageHeader, StatCard, Badge, EmptyState } from '../ui/Primitives'

export function AmbassadorDashboard() {
  const { user } = useAuth()
  const { submissions, missions } = useData()

  const myApproved = useMemo(() => submissions.filter((s) => s.userId === user?.id && s.status === 'approved'), [submissions, user])
  const available = useMemo(() => missions.filter((m) => m.status === 'ativa'), [missions])

  return (
    <div className="space-y-6 page-root relative z-10">
      <PageHeader title={`Olá${user?.name ? `, ${user.name}` : ''}!`} subtitle="Bem-vindo ao seu painel de embaixador." />
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard icon={<Trophy />} label="Pontos Totais" value={user?.totalPoints ?? 0} accent />
        <StatCard icon={<Target />} label="Missões Completas" value={myApproved.length} />
        <StatCard icon={<CalendarCheck2 />} label="Eventos Participados" value={1} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="font-semibold mb-2">Missões Concluídas Recentemente</h2>
          {myApproved.length === 0 ? (
            <EmptyState title="Sem missões concluídas" description="Complete missões para aparecer aqui." />
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
          <h2 className="font-semibold mb-2">Missões Disponíveis</h2>
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
