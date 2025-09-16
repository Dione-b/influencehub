import { Buffer } from "buffer";
// import { Address } from '@stellar/stellar-sdk';
import type { AssembledTransaction, ClientOptions as ContractClientOptions, MethodOptions } from '@stellar/stellar-sdk/contract';
import { Client as ContractClient, Spec as ContractSpec } from '@stellar/stellar-sdk/contract';
import type {
  u32,
  u64,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
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
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
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