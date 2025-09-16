import { createContext, useContext, useMemo, useState } from 'react'
import { MOCK_USERS } from './mockData'
import type { UserProfile } from './types'

interface AuthContextValue {
  user: UserProfile | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)

  async function login(email: string, password: string) {
    const found = MOCK_USERS.find((u) => u.email === email && u.password === password)
    if (found) {
      setUser(found)
      return true
    }
    return false
  }

  async function register(name: string, email: string, password: string) {
    // Apenas mock: adiciona localmente sem persistência
    const exists = MOCK_USERS.find((u) => u.email === email)
    if (exists) return false
    const newUser: UserProfile = {
      id: 'u' + (MOCK_USERS.length + 1),
      name,
      email,
      password,
      role: 'INFLUENCER',
      totalPoints: 0,
    }
    MOCK_USERS.push(newUser)
    setUser(newUser)
    return true
  }

  function logout() {
    setUser(null)
  }

  const value = useMemo(() => ({ user, login, register, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
