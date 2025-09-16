#!/usr/bin/env bash
#
# test_influencehub.sh
# Script para testar todas as funções do contrato InfluenceHub na Testnet
#

set -euo pipefail

: "${CONTRACT_ID:=CC5IAPYRAUVNOYM2X7ZYG3VLNI3BN5QBYMAMXILWS2XOELRLL7AJINEF}"
NETWORK="testnet"
OWNER_ALIAS="dione"
BOB_ALIAS="bob"
ADMIN_ALIAS="admin"

ALICE="GCRH44V24M2SHIVG3HTDJNKCLKZHRGUIIUUHG4JD7KZITCLHEGVIDE3L"
BOB="GDEVMQAQ224UXMWY2CTZ73XD6Q6MJUV3B6WZM5ZQ37O5IOLGJ3KXBXUF"
ADMIN="GD5R55L7AQ2N46PE7OV32HB7NG3RHCOU5XZ2TX4G6FUGEVWS4EGLMR3Y"

# 1. Metadados
echo "=== Metadados ==="
stellar contract invoke \
  --id "$CONTRACT_ID" \
  --source-account "$OWNER_ALIAS" \
  --network "$NETWORK" \
  -- name

stellar contract invoke \
  --id "$CONTRACT_ID" \
  --source-account "$OWNER_ALIAS" \
  --network "$NETWORK" \
  -- symbol

stellar contract invoke \
  --id "$CONTRACT_ID" \
  --source-account "$OWNER_ALIAS" \
  --network "$NETWORK" \
  -- decimals

echo

# 2. Total supply inicial
echo "=== Total Supply Inicial ==="
stellar contract invoke \
  --id "$CONTRACT_ID" \
  --source-account "$OWNER_ALIAS" \
  --network "$NETWORK" \
  -- total_supply

echo

# 3. Mint 500 para Bob (owner)
echo "=== Mint 500 para Bob ==="
stellar contract invoke \
  --id "$CONTRACT_ID" \
  --source-account "$OWNER_ALIAS" \
  --network "$NETWORK" \
  -- mint \
  --account "$BOB" \
  --amount 5

echo

# 4. Saldo Bob
echo "=== Saldo Bob ==="
stellar contract invoke \
  --id "$CONTRACT_ID" \
  --source-account "$OWNER_ALIAS" \
  --network "$NETWORK" \
  -- balance \
  --account "$BOB"

echo

# 5. Transfer 2 de Bob para Admin (assinatura Bob)
echo "=== Bob transfere 2 para Admin ==="
stellar contract invoke \
  --id "$CONTRACT_ID" \
  --source-account "$BOB_ALIAS" \
  --network "$NETWORK" \
  --sign-with-key "$BOB_ALIAS" \
  -- \
  transfer \
  --from "$BOB" \
  --to "$ADMIN" \
  --amount 2

echo

# 6. Saldos após transferência
echo "=== Saldos após transferência ==="
stellar contract invoke \
  --id "$CONTRACT_ID" \
  --source-account "$OWNER_ALIAS" \
  --network "$NETWORK" \
  -- balance \
  --account "$BOB"

stellar contract invoke \
  --id "$CONTRACT_ID" \
  --source-account "$OWNER_ALIAS" \
  --network "$NETWORK" \
  -- balance \
  --account "$ADMIN"

echo

# 7. Admin aprova Bob gastar 150 (assinatura Admin)
echo "=== Admin aprova Bob para gastar 150 ==="
stellar contract invoke \
  --id "$CONTRACT_ID" \
  --source-account "$ADMIN_ALIAS" \
  --network "$NETWORK" \
  --sign-with-key "$ADMIN_ALIAS" \
  -- \
  approve \
  --from "$ADMIN" \
  --spender "$BOB" \
  --amount 150 \
  --expiration_ledger 1000

echo

# 8. Allowance de Bob
echo "=== Allowance de Bob ==="
stellar contract invoke \
  --id "$CONTRACT_ID" \
  --source-account "$OWNER_ALIAS" \
  --network "$NETWORK" \
  -- allowance \
  --from "$ADMIN" \
  --spender "$BOB"

echo

# 9. Bob transfere 100 de Admin para si mesmo (assinatura Bob)
echo "=== Bob transfere 100 de Admin para si mesmo ==="
stellar contract invoke \
  --id "$CONTRACT_ID" \
  --source-account "$BOB_ALIAS" \
  --network "$NETWORK" \
  --sign-with-key "$BOB_ALIAS" \
  -- \
  transfer_from \
  --spender "$BOB" \
  --from "$ADMIN" \
  --to "$BOB" \
  --amount 1

echo

# 10. Saldos finais e total supply
echo "=== Saldos Finais e Total Supply ==="
stellar contract invoke \
  --id "$CONTRACT_ID" \
  --source-account "$OWNER_ALIAS" \
  --network "$NETWORK" \
  -- balance \
  --account "$BOB"

stellar contract invoke \
  --id "$CONTRACT_ID" \
  --source-account "$OWNER_ALIAS" \
  --network "$NETWORK" \
  -- balance \
  --account "$ADMIN"

stellar contract invoke \
  --id "$CONTRACT_ID" \
  --source-account "$OWNER_ALIAS" \
  --network "$NETWORK" \
  -- total_supply

echo
echo "Todos os testes concluídos."
