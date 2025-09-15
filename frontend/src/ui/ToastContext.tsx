import { createContext, useCallback, useContext, useMemo, useState } from 'react'

type ToastVariant = 'success' | 'error' | 'info'

interface ToastItem {
  id: string
  message: string
  variant: ToastVariant
}

interface ToastContextValue {
  toasts: ToastItem[]
  toast: (message: string, variant?: ToastVariant) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback((message: string, variant: ToastVariant = 'info') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, variant }])
    setTimeout(() => dismiss(id), 3000)
  }, [dismiss])

  const value = useMemo(() => ({ toasts, toast, dismiss }), [toasts, toast, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[100] space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-md px-4 py-2 text-sm shadow-lg border ${
              t.variant === 'success'
                ? 'bg-green-600/20 border-green-700 text-green-200'
                : t.variant === 'error'
                ? 'bg-red-600/20 border-red-700 text-red-200'
                : 'bg-zinc-800/80 border-zinc-700 text-zinc-200'
            }`}
            role="status"
            aria-live="polite"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}


