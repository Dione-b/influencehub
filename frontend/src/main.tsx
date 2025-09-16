import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n' // Inicializar i18n

// Polyfills for Node.js globals
import { Buffer } from 'buffer'
import process from 'process'

// Make Node.js globals available in browser
if (typeof global === 'undefined') {
  (globalThis as any).global = globalThis
}

if (typeof globalThis.Buffer === 'undefined') {
  (globalThis as any).Buffer = Buffer
}

if (typeof globalThis.process === 'undefined') {
  (globalThis as any).process = process
}

// Inject global styles to remove scroll from Stellar Wallets Kit modal
const injectModalStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* Aggressive scroll removal for Stellar Wallets Kit modal */
    [data-stellar-wallets-kit-modal],
    .stellar-wallets-modal,
    .stellar-wallets-kit-modal,
    .wallet-modal,
    .wallet-connection-modal,
    [class*="wallet"][class*="modal"],
    [class*="stellar"][class*="modal"],
    div[style*="position: fixed"],
    div[style*="z-index"],
    div[role="dialog"],
    div[aria-modal="true"] {
      overflow: hidden !important;
      max-height: 100vh !important;
    }
    
    [data-stellar-wallets-kit-modal] *,
    .stellar-wallets-modal *,
    .stellar-wallets-kit-modal *,
    .wallet-modal *,
    .wallet-connection-modal *,
    [class*="wallet"][class*="modal"] *,
    [class*="stellar"][class*="modal"] *,
    div[style*="position: fixed"] *,
    div[style*="z-index"] *,
    div[role="dialog"] *,
    div[aria-modal="true"] * {
      overflow: visible !important;
      max-height: none !important;
      overflow-y: visible !important;
      overflow-x: visible !important;
    }
    
    /* Target any element with inline scroll styles */
    *[style*="overflow"],
    *[style*="max-height"],
    *[style*="height"] {
      overflow: visible !important;
      max-height: none !important;
      overflow-y: visible !important;
      overflow-x: visible !important;
    }
    
    /* Specific modal elements */
    .modal-content,
    .modal-body,
    .modal-dialog,
    .modal-container,
    .wallet-list,
    .wallet-options,
    .wallet-grid,
    .wallet-item,
    .wallet-button,
    .wallet-option {
      overflow: visible !important;
      max-height: none !important;
      overflow-y: visible !important;
      overflow-x: visible !important;
    }
  `;
  document.head.appendChild(style);
};

// Inject styles immediately
injectModalStyles();

// Watch for modal creation and apply styles aggressively
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        
        // Check for any modal-like elements
        const modalSelectors = [
          '[data-stellar-wallets-kit-modal]',
          '.stellar-wallets-modal',
          '.wallet-modal',
          '[class*="wallet"][class*="modal"]',
          '[class*="stellar"][class*="modal"]',
          'div[style*="position: fixed"]',
          'div[role="dialog"]',
          'div[aria-modal="true"]'
        ];
        
        let modal: HTMLElement | null = null;
        
        // Check if the element itself is a modal
        for (const selector of modalSelectors) {
          if (element.matches(selector)) {
            modal = element as HTMLElement;
            break;
          }
        }
        
        // If not, check if it contains a modal
        if (!modal) {
          for (const selector of modalSelectors) {
            const found = element.querySelector(selector) as HTMLElement;
            if (found) {
              modal = found;
              break;
            }
          }
        }
        
        if (modal) {
          // Apply aggressive scroll removal
          modal.style.overflow = 'hidden';
          modal.style.maxHeight = '100vh';
          
          // Apply to all children
          const allChildren = modal.querySelectorAll('*');
          allChildren.forEach((child) => {
            const childElement = child as HTMLElement;
            childElement.style.overflow = 'visible';
            childElement.style.maxHeight = 'none';
            childElement.style.overflowY = 'visible';
            childElement.style.overflowX = 'visible';
          });
          
          // Also check for any elements with inline overflow styles
          const elementsWithOverflow = document.querySelectorAll('*[style*="overflow"], *[style*="max-height"]');
          elementsWithOverflow.forEach((el) => {
            const element = el as HTMLElement;
            element.style.overflow = 'visible';
            element.style.maxHeight = 'none';
            element.style.overflowY = 'visible';
            element.style.overflowX = 'visible';
          });
        }
      }
    });
  });
});

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Nuclear option - continuously remove scrollbars
const removeScrollbars = () => {
  // Remove scrollbars from all elements
  const allElements = document.querySelectorAll('*');
  allElements.forEach((element) => {
    const el = element as HTMLElement;
    if (el.style.overflow === 'auto' || el.style.overflow === 'scroll' || 
        el.style.overflowY === 'auto' || el.style.overflowY === 'scroll' ||
        el.style.overflowX === 'auto' || el.style.overflowX === 'scroll') {
      el.style.overflow = 'visible';
      el.style.overflowY = 'visible';
      el.style.overflowX = 'visible';
    }
  });
  
  // Hide scrollbars globally
  const style = document.createElement('style');
  style.textContent = `
    * {
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }
    *::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }
  `;
  if (!document.head.querySelector('style[data-scrollbar-removal]')) {
    style.setAttribute('data-scrollbar-removal', 'true');
    document.head.appendChild(style);
  }
};

// Run immediately and then every 100ms
removeScrollbars();
setInterval(removeScrollbars, 100);
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AuthProvider } from './state/AuthContext'
import { DataProvider } from './state/DataContext'
import { Layout } from './ui/Layout'
import { PublicLayout } from './ui/PublicLayout'
import { RequireAuth } from './ui/RequireAuth'
import { LoginPage } from './views/LoginPage'
import { RegisterPage } from './views/RegisterPage'
import { InfluencerDashboard } from './views/InfluencerDashboard'
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
import { BadgesPage } from './views/BadgesPage'
import { StellarWalletProvider } from './state/StellarWalletContext'

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
      { index: true, element: <InfluencerDashboard /> },
      { path: 'admin', element: <AdminDashboard /> },
      { path: 'perfil', element: <ProfilePage /> },
      { path: 'missoes', element: <MissionsPage /> },
      { path: 'emblemas', element: <BadgesPage /> },
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
      <StellarWalletProvider>
        <DataProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </DataProvider>
      </StellarWalletProvider>
    </AuthProvider>
  </StrictMode>,
)
