import type { FormEvent } from 'react'
import { useAuth } from '../state/AuthContext'
import { useData } from '../state/DataContext'
import { useToast } from '../ui/ToastContext'

export function EventsPage() {
  const { user } = useAuth()
  const { events, addEvent, updateEvent, removeEvent } = useData()
  const { toast } = useToast()

  if (user?.role !== 'ADMIN') return <div>Somente administradores.</div>

  function onCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement & {
      name: { value: string }
      date: { value: string }
      location: { value: string }
      checkinCode: { value: string }
    }
    addEvent({ name: form.name.value, date: form.date.value, location: form.location.value, checkinCode: form.checkinCode.value })
    e.currentTarget.reset()
    toast('Evento criado', 'success')
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-yellow-400">Eventos</h1>
      <div className="card p-4">
        <h2 className="font-semibold mb-2">Criar evento</h2>
        <form onSubmit={onCreate} className="grid md:grid-cols-4 gap-3 items-end">
          <input name="name" className="input md:col-span-2 text-sm py-2" placeholder="Nome" required />
          <input name="date" className="input text-sm py-2" placeholder="Data" type="date" required />
          <input name="location" className="input text-sm py-2" placeholder="Local" required />
          <input name="checkinCode" className="input text-sm py-2 md:col-span-2" placeholder="Código de check-in" required />
          <button className="btn btn-primary text-sm py-2" type="submit">Adicionar</button>
        </form>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {events.map((e) => (
          <div key={e.id} className="card space-y-1 p-4">
            <h3 className="font-semibold text-base">{e.name}</h3>
            <div className="text-sm text-zinc-300 leading-5">
              <p>Data: {e.date}</p>
              <p>Local: {e.location}</p>
              <p>Código: <span className="text-yellow-400">{e.checkinCode}</span></p>
            </div>
            <div className="flex gap-2">
              <button className="btn bg-zinc-800 text-xs py-2" onClick={() => { updateEvent(e.id, { name: e.name + ' *' }); toast('Evento atualizado', 'info') }}>Editar</button>
              <button className="btn bg-red-600 text-xs py-2" onClick={() => { removeEvent(e.id); toast('Evento excluído', 'error') }}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
