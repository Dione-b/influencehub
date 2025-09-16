import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'
import { LayoutDashboard, User2, Target, CalendarDays, Trophy, LogOut, Send } from 'lucide-react'
import { useTranslation } from '../i18n/hooks/useTranslation'
import { LanguageSelector } from './LanguageSelector'

export function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] bg-black text-white relative app-bg">
      <aside className="bg-black/80 backdrop-blur border-r border-zinc-900 flex flex-col">
        <div className="px-6 py-6">
          <Link to="/" className="block">
            <div className="text-2xl leading-tight font-extrabold text-yellow-400">InfluenceHub<br/></div>
          </Link>
          {user && (
            <div className="mt-4 text-sm">
              <div className="font-semibold">{user.name}</div>
              <div className="text-zinc-400">{user.role === 'ADMIN' ? t('admin.title') : t('common.influencer')}</div>
            </div>
          )}
        </div>
        <nav className="flex-1 px-2 space-y-1">
          <SidebarLink to="/app" end icon={<LayoutDashboard size={18} />} label={t('common.dashboard')} />
          <SidebarLink to="/app/perfil" icon={<User2 size={18} />} label={t('common.profile')} />
          <SidebarLink to="/app/missoes" icon={<Target size={18} />} label={t('common.missions')} />
          <SidebarLink to="/app/submissoes" icon={<Send size={18} />} label={t('common.submissions')} />
          <SidebarLink to="/app/emblemas" icon={<Target size={18} />} label={t('common.badges')} />
          <SidebarLink to="/app/checkin" icon={<CalendarDays size={18} />} label={t('common.events')} />
          <SidebarLink to="/app/ranking" icon={<Trophy size={18} />} label={t('common.ranking')} />
          {user?.role === 'ADMIN' && (
            <div className="pt-2 mt-2 border-t border-zinc-900">
              <SidebarLink to="/app/admin" icon={<LayoutDashboard size={18} />} label={t('admin.title')} />
              <SidebarLink to="/app/aprovacoes" icon={<Trophy size={18} />} label={t('common.approvals')} />
              <SidebarLink to="/app/eventos" icon={<CalendarDays size={18} />} label={t('common.events')} />
            </div>
          )}
          {!user && (
            <div className="pt-2 mt-2 border-t border-zinc-900">
              <SidebarLink to="/login" icon={<User2 size={18} />} label={t('common.login')} />
              <SidebarLink to="/cadastrar" icon={<User2 size={18} />} label={t('common.register')} />
            </div>
          )}
        </nav>
        {user && (
          <div className="m-4 space-y-2">
            <LanguageSelector />
            <button onClick={handleLogout} className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 text-sm">
              <LogOut size={16} /> {t('common.logout')}
            </button>
          </div>
        )}
      </aside>
      <main className="p-8 relative z-10">
        <Outlet />
      </main>
    </div>
  )
}

function SidebarLink({ to, icon, label, end }: { to: string; icon: React.ReactNode; label: string; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `group flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-colors border-l-2 ${
          isActive
            ? 'bg-zinc-900 text-white font-semibold border-yellow-400'
            : 'text-zinc-300 hover:text-white hover:bg-zinc-900 border-transparent'
        }`
      }
    >
      <span className="shrink-0">{icon}</span>
      <span>{label}</span>
    </NavLink>
  )
}
