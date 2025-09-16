import { useEffect, useRef } from 'react';
import { useFreighter } from '../hooks/useFreighter';

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
  buttonText = "Conectar Carteira",
  className = ""
}: StellarWalletButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { createWalletButton } = useFreighter();

  useEffect(() => {
    if (containerRef.current) {
      createWalletButton(containerRef.current, {
        onConnect,
        onDisconnect,
        horizonUrl,
        buttonText,
      });
    }
  }, [createWalletButton, onConnect, onDisconnect, horizonUrl, buttonText]);

  return <div ref={containerRef} className={className} />;
}
