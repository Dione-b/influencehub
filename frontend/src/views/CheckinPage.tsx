import type { FormEvent } from 'react'
import { useState } from 'react'
import { useAuth } from '../state/AuthContext'
import { useData } from '../state/DataContext'
import { CalendarCheck2, QrCode } from 'lucide-react'
import { useTranslation } from '../i18n/hooks/useTranslation'

export function CheckinPage() {
  const { user } = useAuth()
  const { checkin } = useData()
  const [result, setResult] = useState<string | null>(null)
  const { t } = useTranslation()

  if (!user) return <div>{t('checkin.loginToCheckin')}</div>

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!user) return
    const form = e.currentTarget as HTMLFormElement & { code: { value: string } }
    const { ok, event } = checkin(user.id, form.code.value)
    setResult(ok ? t('checkin.success', { event: event?.name }) : t('checkin.invalidCode'))
    e.currentTarget.reset()
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 page-root relative z-10">
      <div className="flex items-center gap-3">
        <CalendarCheck2 className="text-yellow-400" />
        <h1 className="text-3xl font-extrabold">{t('checkin.title')}</h1>
      </div>
      <p className="text-sm text-zinc-400">{t('checkin.description')}</p>

      <div className="card">
        <div className="flex items-center gap-3 mb-3">
          <QrCode className="text-yellow-400" />
          <h2 className="font-semibold">{t('checkin.withCode')}</h2>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          <input name="code" className="input" placeholder={t('checkin.codePlaceholder')} required />
          <button className="btn btn-primary w-full" type="submit">{t('checkin.doCheckin')}</button>
        </form>
        {result && <div className="mt-3 text-sm text-zinc-300">{result}</div>}
      </div>

      <div className="card">
        <h2 className="font-semibold mb-2">{t('events.available')}</h2>
        <div className="text-sm text-zinc-400">{t('events.noneNow')}</div>
      </div>
    </div>
  )
}
