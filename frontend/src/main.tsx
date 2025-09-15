import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n' // Inicializar i18n
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AuthProvider } from './state/AuthContext'
import { DataProvider } from './state/DataContext'
import { Layout } from './ui/Layout'
import { PublicLayout } from './ui/PublicLayout'
import { RequireAuth } from './ui/RequireAuth'
import { LoginPage } from './views/LoginPage'
import { RegisterPage } from './views/RegisterPage'
import { AmbassadorDashboard } from './views/AmbassadorDashboard'
import { AdminDashboard } from './views/AdminDashboard'
import { ProfilePage } from './views/ProfilePage'
import { MissionsPage } from './views/MissionsPage'
import { MissionSubmissionsPage } from './views/MissionSubmissionsPage'
import { ApprovalsPage } from './views/ApprovalsPage'
import { EventsPage } from './views/EventsPage'
import { CheckinPage } from './views/CheckinPage'
import { RankingPage } from './views/RankingPage'
import { LandingPage } from './views/LandingPage'
import { ToastProvider } from './ui/ToastContext'

const router = createBrowserRouter([
  // Rotas públicas (fora do Layout/Sidebar)
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/cadastrar', element: <RegisterPage /> },
  
  // Rotas públicas com layout (header + footer)
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { path: 'ranking', element: <RankingPage /> },
    ],
  },

  // Rotas da aplicação (com Layout e sidebar)
  {
    path: '/app',
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <AmbassadorDashboard /> },
      { path: 'admin', element: <AdminDashboard /> },
      { path: 'perfil', element: <ProfilePage /> },
      { path: 'missoes', element: <MissionsPage /> },
      { path: 'submissoes', element: <MissionSubmissionsPage /> },
      { path: 'aprovacoes', element: <ApprovalsPage /> },
      { path: 'eventos', element: <EventsPage /> },
      { path: 'checkin', element: <CheckinPage /> },
      { path: 'ranking', element: <RankingPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <DataProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </DataProvider>
    </AuthProvider>
  </StrictMode>,
)
