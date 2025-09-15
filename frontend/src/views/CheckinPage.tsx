import type { FormEvent } from 'react'
import { useState } from 'react'
import { useAuth } from '../state/AuthContext'
import { useData } from '../state/DataContext'
import { CalendarCheck2, QrCode } from 'lucide-react'

export function CheckinPage() {
  const { user } = useAuth()
  const { checkin } = useData()
  const [result, setResult] = useState<string | null>(null)

  if (!user) return <div>Faça login para registrar presença.</div>

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!user) return
    const form = e.currentTarget as HTMLFormElement & { code: { value: string } }
    const { ok, event } = checkin(user.id, form.code.value)
    setResult(ok ? `Check-in registrado no evento ${event?.name}` : 'Código inválido')
    e.currentTarget.reset()
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 page-root relative z-10">
      <div className="flex items-center gap-3">
        <CalendarCheck2 className="text-yellow-400" />
        <h1 className="text-3xl font-extrabold">Check-in em Eventos</h1>
      </div>
      <p className="text-sm text-zinc-400">Faça check-in nos eventos para ganhar pontos.</p>

      <div className="card">
        <div className="flex items-center gap-3 mb-3">
          <QrCode className="text-yellow-400" />
          <h2 className="font-semibold">Check-in com Código</h2>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          <input name="code" className="input" placeholder="Digite o código do evento" required />
          <button className="btn btn-primary w-full" type="submit">Fazer Check-in</button>
        </form>
        {result && <div className="mt-3 text-sm text-zinc-300">{result}</div>}
      </div>

      <div className="card">
        <h2 className="font-semibold mb-2">Eventos Disponíveis</h2>
        <div className="text-sm text-zinc-400">Nenhum evento disponível no momento.</div>
      </div>
    </div>
  )
}
