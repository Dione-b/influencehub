import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'
import { UserPlus2 } from 'lucide-react'
import { useTranslation } from '../i18n/hooks/useTranslation'

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() as { state?: { from?: string } }
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const ok = await register(name, email, password)
    if (!ok) return setError(t('auth.emailAlreadyUsed'))
    const from = location.state?.from
    navigate(from && from.startsWith('/app') ? from : '/app', { replace: true })
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-black text-white">
      <div className="hidden md:flex items-center justify-center bg-zinc-950 border-r border-zinc-900">
        <div className="max-w-md p-10 text-center">
          <UserPlus2 size={48} className="text-yellow-400 mx-auto" />
          <h1 className="mt-4 text-4xl font-extrabold leading-tight">{t('auth.createAccount')}</h1>
          <p className="mt-3 text-zinc-400">{t('auth.joinProgram')}</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">{t('auth.register')}</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-zinc-300">{t('auth.name')}</label>
              <input className="input text-base" placeholder={t('auth.fullName')} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1 text-zinc-300">{t('auth.email')}</label>
              <input className="input text-base" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1 text-zinc-300">{t('auth.password')}</label>
              <input className="input text-base" placeholder="••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <button className="btn btn-primary w-full text-base py-3" type="submit">{t('auth.register')}</button>
            <p className="text-sm text-zinc-400">{t('auth.alreadyHaveAccount')} <Link className="text-yellow-400" to="/login">{t('auth.signIn')}</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}
