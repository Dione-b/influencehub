// Global type declarations for polyfills
declare global {
  var global: typeof globalThis;
  var Buffer: typeof import('buffer').Buffer;
  var process: typeof import('process');
}

export {};

// Ambient declarations to satisfy TS in CI when compiling external bindings
// Generic, minimal, but typed (avoid 'any')
declare module '@stellar/stellar-sdk/contract' {
  // Soroban often returns numeric primitives as numbers or strings depending on codec
  export type u32 = number;
  export type u64 = bigint | string | number;

  export interface AssembledTransaction<T = unknown> {
    // simulation result (view methods) or undefined for state changes
    result?: T;
    // sign and send to the network when relevant
    signAndSend: (...args: unknown[]) => Promise<{ hash?: string; result?: unknown }>;
    // raw XDR or extras (leave optional for flexibility)
    xdr?: string;
  }

  export interface ClientOptions {
    contractId: string;
    networkPassphrase: string;
    rpcUrl: string;
  }

  export interface MethodOptions {
    fee?: number;
    timeoutInSeconds?: number;
    simulate?: boolean;
  }

  export class Spec {
    constructor(spec: string[]);
  }

  export class Client {
    constructor(spec: Spec, options: ClientOptions);
    // typical helper used by generated bindings
    protected txFromJSON<T = unknown>(...args: unknown[]): AssembledTransaction<T>;
    // some generators expose a static deploy returning an assembled tx
    static deploy<T = unknown>(wasmHash: unknown, options: MethodOptions & Partial<ClientOptions>): Promise<AssembledTransaction<T>>;
  }
}

declare module '@stellar/stellar-sdk/rpc' {
  const mod: unknown;
  export = mod;
}
