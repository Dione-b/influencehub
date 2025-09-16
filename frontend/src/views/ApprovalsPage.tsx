import { useAuth } from '../state/AuthContext'
import { useData } from '../state/DataContext'
import { useToast } from '../ui/ToastContext'

export function ApprovalsPage() {
  const { user } = useAuth()
  const { submissions, missions, reviewSubmission } = useData()
  const { toast } = useToast()

  if (user?.role !== 'ADMIN') return <div>Somente administradores.</div>

  const pending = submissions.filter((s) => s.status === 'pending')

  function approve(id: string, missionId: string, userId: string) {
    const mission = missions.find((m) => m.id === missionId)
    const pts = mission?.points ?? 0
    reviewSubmission(id, 'approved', pts, userId)
    toast('Missão aprovada', 'success')
  }

  function reject(id: string, userId: string) {
    reviewSubmission(id, 'rejected', 0, userId)
    toast('Submissão rejeitada', 'error')
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-yellow-400">Aprovações de Missões</h1>
      {pending.length === 0 ? (
        <div className="text-sm text-zinc-400">Nenhuma submissão pendente.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pending.map((s) => {
            const mission = missions.find((m) => m.id === s.missionId)
            return (
              <div key={s.id} className="card space-y-2">
                <h3 className="font-semibold">{mission?.title}</h3>
                <div className="text-sm text-zinc-300">
                  <p>ID: {s.id}</p>
                  <p>UserID: {s.userId} </p>
                  <p>Comprovação: ({s.proofType}):</p>
                  <div className="break-all">{s.proofValue}</div>
                  <p>Status: {s.status}</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn bg-green-600" onClick={() => approve(s.id, s.missionId, s.userId)}>Aprovar</button>
                  <button className="btn bg-red-600" onClick={() => reject(s.id, s.userId)}>Rejeitar</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
