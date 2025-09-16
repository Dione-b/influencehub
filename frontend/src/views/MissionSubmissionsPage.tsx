import { useState, type FormEvent } from 'react'
import { useAuth } from '../state/AuthContext'
import { useData } from '../state/DataContext'
import { useToast } from '../ui/ToastContext'
import { useTranslation } from '../i18n/hooks/useTranslation'

export function MissionSubmissionsPage() {
  const { user } = useAuth()
  const { missions, submitMission } = useData()
  const { toast } = useToast()
  const [error, setError] = useState<string>('')
  const { t } = useTranslation()

  if (!user) return <div>{t('submissions.loginToSubmit')}</div>

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
      toast(t('submissions.sentForApproval'), 'success')
    } catch (err) {
      let errorMessage = err instanceof Error ? err.message : t('submissions.submitError')
      if (typeof errorMessage === 'string' && errorMessage.startsWith('submissions.')) {
        errorMessage = t(errorMessage as any)
      }
      setError(errorMessage)
      toast(errorMessage, 'error')
    }
  }

  const available = missions.filter((m) => m.status === 'ativa')

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-yellow-400 mb-4">{t('submissions.title')}</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <select name="missionId" className="input" required>
          <option value="">{t('submissions.selectMission')}</option>
          {available.map((m) => (
            <option key={m.id} value={m.id}>{m.title} ({m.points} pts)</option>
          ))}
        </select>
        <select name="proofType" className="input">
          <option value="link">{t('submissions.proof.link')}</option>
          <option value="text">{t('submissions.proof.text')}</option>
          <option value="image">{t('submissions.proof.image')}</option>
        </select>
        <input name="proofValue" className="input" placeholder={t('submissions.proof.placeholder')} required />
        <button className={`btn w-full ${error ? 'btn-has-error' : 'btn-primary'}`} type="submit">
          {t('common.submit')}
        </button>
      </form>
    </div>
  )
}
