import { useState, type FormEvent } from 'react'
import { useAuth } from '../state/AuthContext'
import { useData } from '../state/DataContext'
import { useToast } from '../ui/ToastContext'

export function MissionSubmissionsPage() {
  const { user } = useAuth()
  const { missions, submitMission } = useData()
  const { toast } = useToast()
  const [error, setError] = useState<string>('')

  if (!user) return <div>Faça login para submeter missões.</div>

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!user) return
    
    const form = e.currentTarget as HTMLFormElement & {
      missionId: { value: string }
      proofType: { value: 'link' | 'text' | 'image' }
      proofValue: { value: string }
    }
    
    try {
      submitMission({ userId: user.id, missionId: form.missionId.value, proofType: form.proofType.value, proofValue: form.proofValue.value })
      
      e.currentTarget.reset()
      toast('Submissão enviada para a aprovação', 'success')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao submeter missão'
      setError(errorMessage)
      toast(errorMessage, 'error')
    }
  }

  const available = missions.filter((m) => m.status === 'ativa')

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-yellow-400 mb-4">Submeter missão</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <select name="missionId" className="input" required>
          <option value="">Selecione uma missão</option>
          {available.map((m) => (
            <option key={m.id} value={m.id}>{m.title} ({m.points} pts)</option>
          ))}
        </select>
        <select name="proofType" className="input">
          <option value="link">link</option>
          <option value="text">texto</option>
          <option value="image">imagem</option>
        </select>
        <input name="proofValue" className="input" placeholder="Cole o link, escreva o texto ou nome do arquivo" required />
        <button className={`btn w-full ${error ? 'btn-has-error' : 'btn-primary'}`} type="submit">
          Enviar
        </button>
      </form>
    </div>
  )
}
