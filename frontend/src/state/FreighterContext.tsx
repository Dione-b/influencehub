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
import freighterApi from "@stellar/freighter-api";

export type FreighterState = {
  isInstalled: boolean | null;
  isAllowed: boolean | null;
  address: string | null;
  network: string | null;
  networkPassphrase: string | null;
  loading: boolean;
  error: string | null;
};

export type FreighterContextValue = FreighterState & {
  freighter: typeof freighterApi;
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
  allow: () => Promise<boolean>;
};

export const FreighterContext = createContext<
  FreighterContextValue | undefined
>(undefined);

export const FreighterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<FreighterState>({
    isInstalled: null,
    isAllowed: null,
    address: null,
    network: null,
    networkPassphrase: null,
    loading: false,
    error: null,
  });

  const refreshStatus = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const [isConnResp, isAllowedResp] = await Promise.all([
        freighterApi.isConnected(),
        freighterApi.isAllowed(),
      ]);

      const isInstalled =
        typeof isConnResp === "boolean"
          ? isConnResp
          : !!(isConnResp as any)?.isConnected;
      const isAllowed =
        typeof isAllowedResp === "boolean"
          ? isAllowedResp
          : !!(isAllowedResp as any)?.isAllowed;

      setState((s) => ({ ...s, isInstalled, isAllowed, loading: false }));
    } catch (e: any) {
      console.error("Freighter refreshStatus error", e);
      setState((s) => ({
        ...s,
        loading: false,
        error: e?.message ?? "Failed to refresh Freighter status",
      }));
    }
  }, []);

  const getAddress = useCallback(async () => {
    try {
      const res: any = await freighterApi.getAddress();
      if (res?.error) throw new Error(res.error);
      const address = res?.address ?? null;
      setState((s) => ({ ...s, address }));
      return address;
    } catch (e: any) {
      console.error("Freighter getAddress error", e);
      setState((s) => ({
        ...s,
        error: e?.message ?? "Failed to get address",
      }));
      return null;
    }
  }, []);

  const getNetwork = useCallback(async () => {
    try {
      const res: any = await freighterApi.getNetwork();
      if (res?.error) throw new Error(res.error);
      const network = res?.network ?? null;
      const networkPassphrase = res?.networkPassphrase ?? null;
      setState((s) => ({ ...s, network, networkPassphrase }));
      if (network && networkPassphrase) return { network, networkPassphrase };
      return null;
    } catch (e: any) {
      console.error("Freighter getNetwork error", e);
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
        const signed: any = await freighterApi.signTransaction(
          xdr,
          opts ?? ({} as any)
        );
        if (signed?.error) throw new Error(signed.error);
        return signed?.signedXDR ?? null;
      } catch (e: any) {
        console.error("Freighter signTransaction error", e);
        setState((s) => ({
          ...s,
          error: e?.message ?? "Failed to sign transaction",
        }));
        return null;
      }
    },
    []
  );

  const signBlob = useCallback(async (blob: string) => {
    try {
      const res: any = await (freighterApi as any).signBlob(blob);
      if (res?.error) throw new Error(res.error);
      return res?.signature ?? null;
    } catch (e: any) {
      console.error("Freighter signBlob error", e);
      setState((s) => ({ ...s, error: e?.message ?? "Failed to sign blob" }));
      return null;
    }
  }, []);

  const signAuthEntry = useCallback(
    async (xdr: string, opts?: { networkPassphrase?: string }) => {
      try {
        const res: any = await (freighterApi as any).signAuthEntry(
          xdr,
          opts ?? {}
        );
        if (res?.error) throw new Error(res.error);
        return res?.signedXDR ?? null;
      } catch (e: any) {
        console.error("Freighter signAuthEntry error", e);
        setState((s) => ({
          ...s,
          error: e?.message ?? "Failed to sign auth entry",
        }));
        return null;
      }
    },
    []
  );

  const allow = useCallback(async () => {
    try {
      const resp: any = await (freighterApi as any).setAllowed();
      const isAllowed = typeof resp === "boolean" ? resp : !!resp?.isAllowed;
      setState((s) => ({ ...s, isAllowed }));
      if (isAllowed) {
        console.log("Successfully added the app to Freighter's Allow List");
      }
      return isAllowed;
    } catch (e: any) {
      console.error("Freighter setAllowed error", e);
      setState((s) => ({
        ...s,
        error: e?.message ?? "Failed to set allowed",
      }));
      return false;
    }
  }, []);

  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  const value: FreighterContextValue = useMemo(
    () => ({
      ...state,
      freighter: freighterApi,
      refreshStatus,
      getAddress,
      getNetwork,
      signTransaction,
      signBlob,
      signAuthEntry,
      connect: async () => {
        try {
          const [isConnResp, isAllowedResp] = await Promise.all([
            freighterApi.isConnected(),
            freighterApi.isAllowed(),
          ]);
          const installed =
            typeof isConnResp === "boolean"
              ? isConnResp
              : !!(isConnResp as any)?.isConnected;
          const allowed =
            typeof isAllowedResp === "boolean"
              ? isAllowedResp
              : !!(isAllowedResp as any)?.isAllowed;

          if (!installed) {
            alert(typeof window !== 'undefined' ? (window as any).i18next?.t?.('wallet.freighterNotInstalled') ?? 'Freighter not installed' : 'Freighter not installed');
            return null;
          }

          if (!allowed) {
            const ok = await allow();
            if (!ok) {
              alert("Permission denied in the Freighter extension.");
              return null;
            }
          }

          const pk = await getAddress();
          if (!pk) {
            let allowedNow: boolean | null = null;
            try {
              const resp = await freighterApi.isAllowed();
              allowedNow =
                typeof resp === "boolean"
                  ? resp
                  : !!(resp as any)?.isAllowed;
            } catch {
              allowedNow = allowed;
            }

            if (allowedNow === false)
              alert("Permission denied in the Freighter extension. 2222");
            else alert(typeof window !== 'undefined' ? (window as any).i18next?.t?.('wallet.cannotGetAddress') ?? 'Could not get wallet address' : 'Could not get wallet address');
            return null;
          }
          console.log("Freighter connected. Address:", pk);
          return pk;
        } catch (e) {
          console.error("Freighter connect error", e);
          return null;
        }
      },
      allow,
    }),
    [
      state,
      refreshStatus,
      getAddress,
      getNetwork,
      signTransaction,
      signBlob,
      signAuthEntry,
      allow,
    ]
  );

  return (
    <FreighterContext.Provider value={value}>
      {children}
    </FreighterContext.Provider>
  );
};

// ✅ Hook para usar no app
export const useFreighterContext = () => {
  const context = useContext(FreighterContext);
  if (!context) {
    throw new Error(
      "useFreighterContext must be used within a FreighterProvider"
    );
  }
  return context;
};