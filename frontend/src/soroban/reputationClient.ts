import { Networks } from '@stellar/stellar-sdk';

// Import the generated Soroban bindings for the reputation contract
// Note: We import directly from the contracts workspace. If you move the bindings,
// update this path accordingly.
import { Client as ReputationClient } from '../../../contract/contracts/reputation_contract/soroban-bindings/src';

// Centralized configuration for the contract client
const DEFAULT_RPC = 'https://soroban-testnet.stellar.org';
const DEFAULT_NETWORK = Networks.TESTNET;
const DEFAULT_CONTRACT_ID = 'CDOLWY7CVGFCT66A2TSXYKBEVFD4GAWWU2IC26YTE5QWFFSP2LGVUB37';

export const reputationClient = new ReputationClient({
  contractId: DEFAULT_CONTRACT_ID,
  networkPassphrase: DEFAULT_NETWORK,
  rpcUrl: DEFAULT_RPC,
});

export async function getReputationLevel(userPublicKey: string) {
  const tx = await reputationClient.get_level({ user: userPublicKey });
  // Generated bindings return an AssembledTransaction with a `result` for read methods
  // Return the raw value when available, falling back to the object itself
  return (tx as any)?.result ?? tx;
}

export async function rewardWithPriceCheck(params: {
  user: string;
  amount: bigint;
  token: string; // token contract id
  oracleId: string; // maps to oracle_id in contract
}) {
  const { user, amount, token, oracleId } = params;
  return await reputationClient.reward_with_price_check({
    user,
    amount,
    token,
    oracle_id: oracleId,
  });
}

export type ReputationClientType = typeof reputationClient;


