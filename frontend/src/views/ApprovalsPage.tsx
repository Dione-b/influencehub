import { useAuth } from '../state/AuthContext'
import { useData } from '../state/DataContext'
import { useToast } from '../ui/ToastContext'
import { useTranslation } from '../i18n/hooks/useTranslation'

export function ApprovalsPage() {
  const { user } = useAuth()
  const { submissions, missions, reviewSubmission } = useData()
  const { toast } = useToast()
  const { t } = useTranslation()

  if (user?.role !== 'ADMIN') return <div>{t('approvals.onlyAdmins')}</div>

  const pending = submissions.filter((s) => s.status === 'pending')

  function approve(id: string, missionId: string, userId: string) {
    const mission = missions.find((m) => m.id === missionId)
    const pts = mission?.points ?? 0
    reviewSubmission(id, 'approved', pts, userId)
    toast(t('approvals.approveSuccess'), 'success')
  }

  function reject(id: string, userId: string) {
    reviewSubmission(id, 'rejected', 0, userId)
    toast(t('approvals.rejectSuccess'), 'error')
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-yellow-400">{t('approvals.title')}</h1>
      {pending.length === 0 ? (
        <div className="text-sm text-zinc-400">{t('approvals.nonePending')}</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pending.map((s) => {
            const mission = missions.find((m) => m.id === s.missionId)
            return (
              <div key={s.id} className="card space-y-2">
                <h3 className="font-semibold">{mission?.title}</h3>
                <div className="text-sm text-zinc-300">
                  <p>{t('approvals.id')}: {s.id}</p>
                  <p>{t('approvals.userId')}: {s.userId} </p>
                  <p>{t('approvals.proof')}: ({s.proofType}):</p>
                  <div className="break-all">{s.proofValue}</div>
                  <p>{t('approvals.status')}: {s.status}</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn bg-green-600" onClick={() => approve(s.id, s.missionId, s.userId)}>{t('approvals.approveBtn')}</button>
                  <button className="btn bg-red-600" onClick={() => reject(s.id, s.userId)}>{t('approvals.rejectBtn')}</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
