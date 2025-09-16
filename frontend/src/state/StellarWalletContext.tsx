/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  FREIGHTER_ID,
  type ISupportedWallet,
} from "@creit.tech/stellar-wallets-kit";

export type StellarWalletState = {
  isInstalled: boolean | null;
  isAllowed: boolean | null;
  address: string | null;
  network: string | null;
  networkPassphrase: string | null;
  loading: boolean;
  error: string | null;
  selectedWalletId: string | null;
  availableWallets: ISupportedWallet[];
};

export type StellarWalletContextValue = StellarWalletState & {
  kit: StellarWalletsKit;
  refreshStatus: () => Promise<void>;
  getAddress: () => Promise<string | null>;
  getNetwork: () => Promise<
    { network: string; networkPassphrase: string } | null
  >;
  signTransaction: (
    xdr: string,
    opts?: { networkPassphrase?: string }
  ) => Promise<string | null>;
  signBlob: (blob: string) => Promise<string | null>;
  signAuthEntry: (
    xdr: string,
    opts?: { networkPassphrase?: string }
  ) => Promise<string | null>;
  connect: () => Promise<string | null>;
  connectWithWallet: (walletId: string) => Promise<string | null>;
  showWalletModal: () => Promise<string | null>;
  disconnect: () => void;
  setWallet: (walletId: string) => Promise<void>;
  createWalletButton: (container: HTMLElement, options?: {
    onConnect?: (response: { address: string }) => void;
    onDisconnect?: () => void;
    horizonUrl?: string;
    buttonText?: string;
  }) => Promise<void>;
};

export const StellarWalletContext = createContext<
  StellarWalletContextValue | undefined
>(undefined);

export const StellarWalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StellarWalletState>({
    isInstalled: null,
    isAllowed: null,
    address: null,
    network: null,
    networkPassphrase: null,
    loading: false,
    error: null,
    selectedWalletId: null,
    availableWallets: [],
  });

  // Initialize the Stellar Wallets Kit
  const kit = useMemo(() => {
    return new StellarWalletsKit({
      network: WalletNetwork.TESTNET, // You can change this to WalletNetwork.PUBLIC for mainnet
      selectedWalletId: FREIGHTER_ID, // Default to Freighter
      modules: allowAllModules(), // Use all available modules
    });
  }, []);

  const refreshStatus = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const availableWallets = await kit.getSupportedWallets();
      setState((s) => ({ 
        ...s, 
        availableWallets,
        isInstalled: availableWallets.length > 0,
        loading: false 
      }));
    } catch (e: any) {
      console.error("Stellar Wallet refreshStatus error", e);
      setState((s) => ({
        ...s,
        loading: false,
        error: e?.message ?? "Failed to refresh wallet status",
      }));
    }
  }, [kit]);

  const getAddress = useCallback(async () => {
    try {
      const { address } = await kit.getAddress();
      setState((s) => ({ ...s, address }));
      return address;
    } catch (e: any) {
      console.error("Stellar Wallet getAddress error", e);
      setState((s) => ({
        ...s,
        error: e?.message ?? "Failed to get address",
      }));
      return null;
    }
  }, [kit]);

  const getNetwork = useCallback(async () => {
    try {
      // Use the configured network from the kit initialization
      const network = "testnet"; // Default to testnet as configured
      const networkPassphrase = "Test SDF Network ; September 2015";
      
      setState((s) => ({ ...s, network, networkPassphrase }));
      return { network, networkPassphrase };
    } catch (e: any) {
      console.error("Stellar Wallet getNetwork error", e);
      setState((s) => ({
        ...s,
        error: e?.message ?? "Failed to get network",
      }));
      return null;
    }
  }, []);

  const signTransaction = useCallback(
    async (xdr: string, opts?: { networkPassphrase?: string }) => {
      try {
        const { signedTxXdr } = await kit.signTransaction(xdr, {
          networkPassphrase: opts?.networkPassphrase || "Test SDF Network ; September 2015",
        });
        return signedTxXdr;
      } catch (e: any) {
        console.error("Stellar Wallet signTransaction error", e);
        setState((s) => ({
          ...s,
          error: e?.message ?? "Failed to sign transaction",
        }));
        return null;
      }
    },
    [kit]
  );

  const signBlob = useCallback(async (blob: string) => {
    try {
      // Note: signBlob might not be available in all wallets through the kit
      // This is a fallback implementation
      const { signedTxXdr } = await kit.signTransaction(blob, {
        networkPassphrase: "Test SDF Network ; September 2015",
      });
      return signedTxXdr;
    } catch (e: any) {
      console.error("Stellar Wallet signBlob error", e);
      setState((s) => ({ 
        ...s, 
        error: e?.message ?? "Failed to sign blob" 
      }));
      return null;
    }
  }, [kit]);

  const signAuthEntry = useCallback(
    async (xdr: string, opts?: { networkPassphrase?: string }) => {
      try {
        const { signedTxXdr } = await kit.signTransaction(xdr, {
          networkPassphrase: opts?.networkPassphrase || "Test SDF Network ; September 2015",
        });
        return signedTxXdr;
      } catch (e: any) {
        console.error("Stellar Wallet signAuthEntry error", e);
        setState((s) => ({
          ...s,
          error: e?.message ?? "Failed to sign auth entry",
        }));
        return null;
      }
    },
    [kit]
  );

  const setWallet = useCallback(async (walletId: string) => {
    try {
      await kit.setWallet(walletId);
      setState((s) => ({ ...s, selectedWalletId: walletId }));
    } catch (e: any) {
      console.error("Stellar Wallet setWallet error", e);
      setState((s) => ({
        ...s,
        error: e?.message ?? "Failed to set wallet",
      }));
    }
  }, [kit]);

  const connectWithWallet = useCallback(async (walletId: string) => {
    try {
      await setWallet(walletId);
      const address = await getAddress();
      if (address) {
        setState((s) => ({ 
          ...s, 
          isAllowed: true,
          address,
          error: null 
        }));
        console.log(`Connected with ${walletId}. Address:`, address);
      }
      return address;
    } catch (e: any) {
      console.error("Stellar Wallet connectWithWallet error", e);
      setState((s) => ({
        ...s,
        error: e?.message ?? "Failed to connect with wallet",
      }));
      return null;
    }
  }, [setWallet, getAddress]);

  const showWalletModal = useCallback(async () => {
    try {
      return new Promise<string | null>((resolve) => {
        kit.openModal({
          onWalletSelected: async (option: ISupportedWallet) => {
            try {
              await kit.setWallet(option.id);
              const { address } = await kit.getAddress();
              setState((s) => ({ 
                ...s, 
                selectedWalletId: option.id,
                address,
                isAllowed: true,
                error: null 
              }));
              resolve(address);
            } catch (e: any) {
              console.error("Error connecting wallet:", e);
              setState((s) => ({ ...s, error: e?.message ?? "Failed to connect wallet" }));
              resolve(null);
            }
          },
          onClosed: (err: Error) => {
            if (err) {
              console.error("Wallet modal closed with error:", err);
              setState((s) => ({ ...s, error: err.message }));
            }
            resolve(null);
          },
          modalTitle: "Conectar Carteira Stellar",
          notAvailableText: "Nenhuma carteira disponível",
        });

        // Add aggressive custom styling to remove scroll after modal is created
        const applyScrollRemoval = () => {
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
          
          for (const selector of modalSelectors) {
            modal = document.querySelector(selector) as HTMLElement;
            if (modal) break;
          }
          
          if (modal) {
            // Apply to modal container
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
            
            // Target any elements with inline overflow styles
            const elementsWithOverflow = document.querySelectorAll('*[style*="overflow"], *[style*="max-height"]');
            elementsWithOverflow.forEach((el) => {
              const element = el as HTMLElement;
              element.style.overflow = 'visible';
              element.style.maxHeight = 'none';
              element.style.overflowY = 'visible';
              element.style.overflowX = 'visible';
            });
          }
        };
        
        // Apply immediately and with delays to catch different rendering phases
        applyScrollRemoval();
        setTimeout(applyScrollRemoval, 50);
        setTimeout(applyScrollRemoval, 100);
        setTimeout(applyScrollRemoval, 200);
        setTimeout(applyScrollRemoval, 500);
      });
    } catch (e: any) {
      console.error("Stellar Wallet showWalletModal error", e);
      setState((s) => ({
        ...s,
        error: e?.message ?? "Failed to show wallet modal",
      }));
      return null;
    }
  }, [kit]);

  const connect = useCallback(async () => {
    // Default behavior: show modal to let user choose wallet
    return await showWalletModal();
  }, [showWalletModal]);

  const disconnect = useCallback(() => {
    setState((s) => ({
      ...s,
      address: null,
      isAllowed: false,
      selectedWalletId: null,
      error: null,
    }));
  }, []);

  const createWalletButton = useCallback(async (
    container: HTMLElement, 
    options?: {
      onConnect?: (response: { address: string }) => void;
      onDisconnect?: () => void;
      horizonUrl?: string;
      buttonText?: string;
    }
  ) => {
    try {
      // Check if button already exists
      const existingButton = container.querySelector('[data-stellar-wallets-kit-button]');
      if (existingButton) {
        console.log('Wallet button already exists, skipping creation');
        return;
      }

      await kit.createButton({
        container,
        onConnect: (response) => {
          setState((s) => ({ 
            ...s, 
            address: response.address,
            isAllowed: true,
            error: null 
          }));
          if (options?.onConnect) {
            options.onConnect(response);
          }
        },
        onDisconnect: () => {
          setState((s) => ({
            ...s,
            address: null,
            isAllowed: false,
            selectedWalletId: null,
            error: null,
          }));
          if (options?.onDisconnect) {
            options.onDisconnect();
          }
        },
        horizonUrl: options?.horizonUrl,
        buttonText: options?.buttonText || "Conectar Carteira",
      });
    } catch (e: any) {
      if (e.message?.includes('already created')) {
        console.log('Wallet button already exists, using existing one');
        return;
      }
      console.error("Error creating wallet button:", e);
      setState((s) => ({
        ...s,
        error: e?.message ?? "Failed to create wallet button",
      }));
    }
  }, [kit]);

  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  const value: StellarWalletContextValue = useMemo(
    () => ({
      ...state,
      kit,
      refreshStatus,
      getAddress,
      getNetwork,
      signTransaction,
      signBlob,
      signAuthEntry,
      connect,
      connectWithWallet,
      showWalletModal,
      disconnect,
      setWallet,
      createWalletButton,
    }),
    [
      state,
      kit,
      refreshStatus,
      getAddress,
      getNetwork,
      signTransaction,
      signBlob,
      signAuthEntry,
      connect,
      connectWithWallet,
      showWalletModal,
      disconnect,
      setWallet,
      createWalletButton,
    ]
  );

  return (
    <StellarWalletContext.Provider value={value}>
      {children}
    </StellarWalletContext.Provider>
  );
};

// ✅ Hook para usar no app - mantém compatibilidade com o nome anterior
export const useStellarWalletContext = () => {
  const context = useContext(StellarWalletContext);
  if (!context) {
    throw new Error(
      "useStellarWalletContext must be used within a StellarWalletProvider"
    );
  }
  return context;
};

// ✅ Hook de compatibilidade para manter a API existente
export const useFreighterContext = useStellarWalletContext;
