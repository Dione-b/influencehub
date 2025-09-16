import { useEffect, useRef } from 'react';
import { useFreighter } from '../hooks/useFreighter';
import { useTranslation } from '../i18n/hooks/useTranslation';
import { useStellarWalletContext } from '../state/StellarWalletContext';

interface StellarWalletButtonProps {
  onConnect?: (response: { address: string }) => void;
  onDisconnect?: () => void;
  horizonUrl?: string;
  buttonText?: string;
  className?: string;
}

export function StellarWalletButton({ 
  onConnect, 
  onDisconnect, 
  horizonUrl,
  buttonText,
  className = ""
}: StellarWalletButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const createdRef = useRef<boolean>(false);
  const { createWalletButton } = useFreighter();
  const { t } = useTranslation();
  const resolvedText = buttonText ?? t('profile.connectWallet');

  useEffect(() => {
    if (!containerRef.current) return;
    if (createdRef.current) return;
    createdRef.current = true;
    createWalletButton(containerRef.current, {
      onConnect,
      onDisconnect,
      horizonUrl,
      buttonText: resolvedText,
    }).catch((e) => {
      // Swallow duplicate-create errors; context already handles relocation.
      if (!(e?.message?.includes('already created'))) {
        // eslint-disable-next-line no-console
        console.error('createWalletButton failed', e);
      }
    });
    // Intentionally no cleanup: the kit manages a singleton button element.
  // Run once to avoid React Strict Mode double effect
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className={className} />;
}

// React-first button that uses the Kit modal instead of DOM injection
export function KitModalConnectButton({ 
  className = "",
  onConnect,
  onDisconnect,
}: { className?: string; onConnect?: (response: { address: string }) => void; onDisconnect?: () => void }) {
  const { t } = useTranslation();
  const { showWalletModal, address, disconnect } = useStellarWalletContext();

  const handleClick = async () => {
    const addr = await showWalletModal();
    if (addr && onConnect) onConnect({ address: addr });
  };

  const handleDisconnect = () => {
    disconnect();
    if (onDisconnect) onDisconnect();
  };

  if (address) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-2 px-3 py-2 bg-green-900/20 border border-green-500/30 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-green-400">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <button onClick={handleDisconnect} className="px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors">
          {t('wallet.disconnect') || 'Desconectar'}
        </button>
      </div>
    );
  }

  return (
    <button onClick={handleClick} className={`btn btn-primary ${className}`}>
      {t('profile.connectWallet')}
    </button>
  );
}
