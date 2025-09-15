import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { useAuth } from '../state/AuthContext'
import { useData } from '../state/DataContext'
import type { Mission, MissionStatus, MissionType } from '../state/types'
import { Target } from 'lucide-react'
import { PageHeader, Badge, EmptyState } from '../ui/Primitives'

export function MissionsPage() {
  const { user } = useAuth()
  const { missions, addMission, updateMission, removeMission } = useData()
  const [filter, setFilter] = useState<'ativas' | 'todas'>('ativas')

  const visible = useMemo(() => missions.filter((m) => (filter === 'ativas' ? m.status === 'ativa' : true)), [missions, filter])

  const isAdmin = user?.role === 'ADMIN'

  function onCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement & {
      title: { value: string }
      description: { value: string }
      type: { value: MissionType }
      points: { value: string }
      status: { value: MissionStatus }
    }
    const mission: Omit<Mission, 'id'> = {
      title: form.title.value,
      description: form.description.value,
      type: form.type.value,
      points: Number(form.points.value || 0),
      status: form.status.value,
    }
    addMission(mission)
    e.currentTarget.reset()
  }

  return (
    <div className="space-y-6 page-root relative z-10">
      <div className="flex items-center justify-between">
        <PageHeader icon={<Target />} title="Missões Disponíveis" />
        <div className="flex gap-2 text-sm">
          <button className={`btn ${filter === 'ativas' ? 'btn-primary' : 'bg-zinc-900'}`} onClick={() => setFilter('ativas')}>Ativas</button>
          <button className={`btn ${filter === 'todas' ? 'btn-primary' : 'bg-zinc-900'}`} onClick={() => setFilter('todas')}>Todas</button>
        </div>
      </div>

      {isAdmin && (
        <div className="card p-4">
          <h2 className="font-semibold mb-2">Criar missão</h2>
          <form className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end" onSubmit={onCreate}>
            <input name="title" className="input md:col-span-2 text-sm py-2" placeholder="Título" required />
            <input name="points" className="input text-sm py-2" placeholder="Pontuação" type="number" min={0} required />
            <input name="description" className="input md:col-span-3 text-sm py-2" placeholder="Descrição" required />
            <select name="type" className="input text-sm py-2">
              <option value="social">social</option>
              <option value="evento">evento</option>
            </select>
            <select name="status" className="input text-sm py-2">
              <option value="ativa">ativa</option>
              <option value="encerrada">encerrada</option>
            </select>
            <button className="btn btn-primary text-sm py-2 md:col-span-2" type="submit">Adicionar</button>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {visible.length === 0 ? (
          <EmptyState title="Nenhuma missão nessa categoria" />
        ) : visible.map((m) => (
          <div key={m.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">{m.title}</h3>
              <Badge color="yellow">{m.points} pts</Badge>
            </div>
            <p className="text-sm text-zinc-300 leading-5">{m.description}</p>
            <div className="flex items-center gap-2 text-[11px]">
              <Badge color={m.type === 'evento' ? 'green' : 'blue'}>{m.type}</Badge>
              <Badge>{m.status}</Badge>
            </div>
            {isAdmin && (
              <div className="flex gap-2 mt-2">
                <button className="btn bg-zinc-800 text-xs py-2" onClick={() => updateMission(m.id, { status: m.status === 'ativa' ? 'encerrada' : 'ativa' })}>
                  {m.status === 'ativa' ? 'Encerrar' : 'Reabrir'}
                </button>
                <button className="btn bg-red-600 text-xs py-2" onClick={() => removeMission(m.id)}>Excluir</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
