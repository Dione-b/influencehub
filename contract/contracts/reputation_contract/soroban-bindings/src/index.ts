// @ts-nocheck
import { Buffer } from "buffer";
import * as Stellar from '@stellar/stellar-sdk';
// import { Address } from '@stellar/stellar-sdk';
// Generic, minimal types to avoid 'any' and keep CI builds stable
type u32 = number;
type u64 = bigint | string | number;
interface AssembledTransaction<T = unknown> {
  result?: T;
  signAndSend: (...args: unknown[]) => Promise<{ hash?: string; result?: unknown }>;
  xdr?: string;
}
interface ContractClientOptions {
  contractId: string;
  networkPassphrase: string;
  rpcUrl: string;
}
interface MethodOptions {
  fee?: number;
  timeoutInSeconds?: number;
  simulate?: boolean;
}
// Keep runtime imports; typing is relaxed above
// Import directly from built path to avoid subpath resolution issues in CI
const contractNS: any = (Stellar as any).contract;
const ContractClient = contractNS?.Client;
const ContractSpec = contractNS?.Spec;
// (types provided above)
export * from '@stellar/stellar-sdk'
// Removed re-export of contract subpath to prevent bundler resolution errors
// Avoid importing rpc in the frontend build path to prevent subpath resolution issues

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDOLWY7CVGFCT66A2TSXYKBEVFD4GAWWU2IC26YTE5QWFFSP2LGVUB37",
  }
} as const

export type DataKey = {tag: "Admin", values: void} | {tag: "XP", values: readonly [string]};

export const ReputationError = {
  1: {message:"NotInitialized"},
  2: {message:"XpCapExceeded"},
  3: {message:"XpOverflow"}
}

export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: ({admin}: {admin: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a reward_with_price_check transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  reward_with_price_check: ({user, amount, token, oracle_id}: {user: string, amount: u64, token: string, oracle_id: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a reward_with_tokens transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  reward_with_tokens: ({user, amount, _token}: {user: string, amount: u64, _token: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a get_level transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_level: ({user}: {user: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u32>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAAAgAAAAAAAAAAAAAABUFkbWluAAAAAAAAAQAAAAAAAAACWFAAAAAAAAEAAAAT",
        "AAAABAAAAAAAAAAAAAAAD1JlcHV0YXRpb25FcnJvcgAAAAADAAAAAAAAAA5Ob3RJbml0aWFsaXplZAAAAAAAAQAAAAAAAAANWHBDYXBFeGNlZWRlZAAAAAAAAAIAAAAAAAAAClhwT3ZlcmZsb3cAAAAAAAM=",
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAA==",
        "AAAAAAAAAAAAAAAXcmV3YXJkX3dpdGhfcHJpY2VfY2hlY2sAAAAABAAAAAAAAAAEdXNlcgAAABMAAAAAAAAABmFtb3VudAAAAAAABgAAAAAAAAAFdG9rZW4AAAAAAAATAAAAAAAAAAlvcmFjbGVfaWQAAAAAAAATAAAAAA==",
        "AAAAAAAAAAAAAAAScmV3YXJkX3dpdGhfdG9rZW5zAAAAAAADAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAGYW1vdW50AAAAAAAGAAAAAAAAAAZfdG9rZW4AAAAAABMAAAAA",
        "AAAAAAAAAAAAAAAJZ2V0X2xldmVsAAAAAAAAAQAAAAAAAAAEdXNlcgAAABMAAAABAAAABA==" ]),
      options
    )
  }
}