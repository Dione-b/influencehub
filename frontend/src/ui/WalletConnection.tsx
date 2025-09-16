import { useCallback, useState } from 'react';
import { Wallet, ChevronDown, AlertCircle } from 'lucide-react';
import { useFreighter } from '../hooks/useFreighter';
import { useTranslation } from '../i18n/hooks/useTranslation';

interface WalletConnectionProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
  className?: string;
  showWalletList?: boolean;
}

export function WalletConnection({ 
  onConnect, 
  onDisconnect, 
  className = "",
  showWalletList = false 
}: WalletConnectionProps) {
  const { 
    address, 
    connect, 
    connectWithWallet, 
    disconnect, 
    availableWallets, 
    loading, 
    error 
  } = useFreighter();
  const { t } = useTranslation();
  
  const [showDropdown, setShowDropdown] = useState(false);

  const handleConnect = useCallback(async () => {
    if (showWalletList && availableWallets.length > 1) {
      setShowDropdown(true);
    } else {
      const connectedAddress = await connect();
      if (connectedAddress && onConnect) {
        onConnect(connectedAddress);
      }
    }
  }, [connect, onConnect, showWalletList, availableWallets.length]);

  const handleConnectSpecific = useCallback(async (walletId: string) => {
    setShowDropdown(false);
    const connectedAddress = await connectWithWallet(walletId);
    if (connectedAddress && onConnect) {
      onConnect(connectedAddress);
    }
  }, [connectWithWallet, onConnect]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    if (onDisconnect) {
      onDisconnect();
    }
  }, [disconnect, onDisconnect]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getWalletName = (walletId: string) => {
    const walletNames: Record<string, string> = {
      'freighter': 'Freighter',
      'xbull': 'xBull',
      'albedo': 'Albedo',
      'rabet': 'Rabet',
      'lobstr': 'Lobstr',
      'hana': 'Hana',
      'hotwallet': 'Hot Wallet',
      'klever': 'Klever',
    };
    return walletNames[walletId.toLowerCase()] || walletId;
  };

  if (address) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-2 px-3 py-2 bg-green-900/20 border border-green-500/30 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-green-400">
            {formatAddress(address)}
          </span>
        </div>
        <button
          onClick={handleDisconnect}
          className="px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
        >
          Desconectar
        </button>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {error && (
        <div className="mb-2 flex items-center gap-2 text-sm text-red-400">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
      
      <div className="relative">
        <button
          onClick={handleConnect}
          disabled={loading}
          className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Wallet size={16} />
          {loading ? t('wallet.connecting') : t('profile.connectWallet')}
          {showWalletList && availableWallets.length > 1 && (
            <ChevronDown size={16} />
          )}
        </button>

        {showDropdown && showWalletList && availableWallets.length > 1 && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-50">
            <div className="p-2">
              <div className="text-xs text-zinc-400 mb-2 px-2">{t('wallet.chooseWallet')}</div>
              {availableWallets.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => handleConnectSpecific(wallet.id)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-zinc-700 rounded-lg flex items-center justify-center">
                    <Wallet size={16} />
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      {getWalletName(wallet.id)}
                    </div>
                    <div className="text-xs text-zinc-400">
                      {wallet.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}

// Componente simplificado para uso rápido
export function QuickWalletButton({ className = "" }: { className?: string }) {
  return (
    <WalletConnection 
      className={className}
      showWalletList={true}
    />
  );
}
