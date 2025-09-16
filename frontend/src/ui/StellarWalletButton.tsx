import { useEffect, useRef } from 'react';
import { useFreighter } from '../hooks/useFreighter';
import { useTranslation } from '../i18n/hooks/useTranslation';

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
  const { createWalletButton } = useFreighter();
  const { t } = useTranslation();
  const resolvedText = buttonText ?? t('profile.connectWallet');

  useEffect(() => {
    if (containerRef.current) {
      createWalletButton(containerRef.current, {
        onConnect,
        onDisconnect,
        horizonUrl,
        buttonText: resolvedText,
      });
    }
  }, [createWalletButton, onConnect, onDisconnect, horizonUrl, resolvedText]);

  return <div ref={containerRef} className={className} />;
}
