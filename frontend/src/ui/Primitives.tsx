export function PageHeader({ icon, title, subtitle }: { icon?: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
      <div className="flex items-center gap-3">
        {icon && <span className="text-yellow-400">{icon}</span>}
        <div>
          <h1 className="text-2xl font-extrabold leading-tight">{title}</h1>
          {subtitle && <p className="text-sm text-zinc-400">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}

export function StatCard({ icon, label, value, accent = false }: { icon?: React.ReactNode; label: string; value: string | number; accent?: boolean }) {
  return (
    <div className={`card flex items-center gap-3 ${accent ? 'border-yellow-400' : ''}`}>
      {icon && <div className="text-yellow-400">{icon}</div>}
      <div>
        <div className="text-xs text-zinc-400">{label}</div>
        <div className={`text-2xl font-extrabold ${accent ? 'text-yellow-400' : ''}`}>{value}</div>
      </div>
    </div>
  )
}

export function Badge({ children, color = 'zinc' }: { children: React.ReactNode; color?: 'zinc' | 'yellow' | 'green' | 'blue' | 'red' }) {
  const colors: Record<string, string> = {
    zinc: 'bg-zinc-700/40 text-zinc-300',
    yellow: 'bg-yellow-400 text-black',
    green: 'bg-green-600/20 text-green-300',
    blue: 'bg-blue-600/20 text-blue-300',
    red: 'bg-red-600/20 text-red-300',
  }
  return <span className={`px-2 py-0.5 rounded-full text-xs ${colors[color]}`}>{children}</span>
}

export function EmptyState({ icon, title, description, cta }: { icon?: React.ReactNode; title: string; description?: string; cta?: React.ReactNode }) {
  return (
    <div className="card text-center py-10">
      {icon && <div className="mx-auto mb-2 text-yellow-400">{icon}</div>}
      <div className="font-semibold">{title}</div>
      {description && <div className="text-sm text-zinc-400">{description}</div>}
      {cta && <div className="mt-3">{cta}</div>}
    </div>
  )
}


