import type { FormEvent } from 'react'
//import { useMemo, useState } from 'react'
import { useAuth } from '../state/AuthContext'
import { useData } from '../state/DataContext'
import type { Badge, BadgeRarity } from '../state/types'
import { SquareStar } from 'lucide-react'
import { PageHeader, EmptyState } from '../ui/Primitives'
import BadgeCard from '../ui/BadgeCard'

export function BadgesPage() {
  const { user } = useAuth()
  const { badges, addBadge } = useData()

  const isAdmin = user?.role === 'ADMIN'

  function onCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement & {
      title: { value: string }
      subtitle: { value: string }
      progress: { value: number }
      daysLeft: { value: number }
      rarity: { value:  BadgeRarity}
    }
    const badge: Omit<Badge, 'id'> = {
      title: form.title.value,
      subtitle: form.subtitle.value,
      progress: form.progress.value,
      rarity: form.rarity.value,
      daysLeft: Number(form.daysLeft.value || undefined),
    }
    addBadge(badge)
    e.currentTarget.reset()
  }

  function defineBadgeColor(rarity: string) {
    if (rarity === 'epic') return 'blue';
    else if (rarity === 'legendary') return 'orange';
    else if (rarity === 'rare') return 'green';
    else return 'green'
  }

  return (
    <div className="space-y-6 page-root relative z-10">
      <div className="flex items-center justify-between">
        <PageHeader icon={<SquareStar />} title="Emblemas" />
      </div>

      {isAdmin && (
        <div className="card p-4">
          <h2 className="font-semibold mb-2">Criar emblema</h2>
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

      <div className='grid md:grid-cols-3 lg:grid-cols-5 gap-6'>
        {badges.length === 0 ? (
          <EmptyState title="Nenhum emblema nessa categoria" />
        ) : badges.map((badge) => (
          <BadgeCard color={defineBadgeColor(badge.rarity)} title={badge.title} subtitle={badge.subtitle} progress={badge.progress} daysLeft={badge.daysLeft}/>
        ))}
        <BadgeCard color={'green'} title={'Teste'} subtitle={'Subteste'} progress={50} daysLeft={2}/>
        <BadgeCard color={'red'} title={'Teste'} subtitle={'Subteste'} progress={50} daysLeft={2}/>
        <BadgeCard color={'red'} title={'Teste'} subtitle={'Subteste'} progress={50} daysLeft={2}/>
      </div>
      {/* <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {visible.length === 0 ? (
          <EmptyState title="Nenhuma emblema nessa categoria" />
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
      </div> */}
    </div>
  )
}
