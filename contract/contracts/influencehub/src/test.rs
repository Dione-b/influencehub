#![cfg(test)]

use crate::{InfluenceHub, InfluenceHubClient};
use soroban_sdk::{
    testutils::{Address as _, MockAuth, MockAuthInvoke},
    Address, Env, String, IntoVal
};

// Função helper para criar e inicializar o token
fn create_token<'a>(env: &Env, owner: &Address) -> InfluenceHubClient<'a> {
    // Registra o contrato COM argumentos do constructor
    let contract_id = env.register(InfluenceHub, (owner,));
    
    // Cria o client
    InfluenceHubClient::new(env, &contract_id)
}

#[test]
fn test_initialization() {
    let env = Env::default();
    env.mock_all_auths();
    
    let owner = Address::generate(&env);
    let token = create_token(&env, &owner);
    
    // Test token metadata
    assert_eq!(token.decimals(), 18);
    assert_eq!(token.name(), String::from_str(&env, "InfluenceHub"));
    assert_eq!(token.symbol(), String::from_str(&env, "INFLU"));
    
    // Test total supply starts at 0
    assert_eq!(token.total_supply(), 0);
}

#[test]
fn test_mint_by_owner() {
    let env = Env::default();
    env.mock_all_auths();
    
    let owner = Address::generate(&env);
    let user = Address::generate(&env);
    let token = create_token(&env, &owner);
    
    // Owner should be able to mint tokens
    token.mint(&user, &1000);
    
    // Check balance and total supply
    assert_eq!(token.balance(&user), 1000);
    assert_eq!(token.total_supply(), 1000);
}

#[test]
#[should_panic]
fn test_mint_by_non_owner_fails() {
    let env = Env::default();
    
    let owner = Address::generate(&env);
    let non_owner = Address::generate(&env);
    let user = Address::generate(&env);
    let token = create_token(&env, &owner);
    
    // Try to mint with non-owner (should fail)
    env.mock_auths(&[MockAuth {
        address: &non_owner,
        invoke: &MockAuthInvoke {
            contract: &token.address,
            fn_name: "mint",
            args: (&user, 1000_i128,).into_val(&env),
            sub_invokes: &[],
        },
    }]);
    
    token.mint(&user, &1000);
}

#[test]
fn test_transfer_functionality() {
    let env = Env::default();
    env.mock_all_auths();
    
    let owner = Address::generate(&env);
    let user1 = Address::generate(&env);
    let user2 = Address::generate(&env);
    let token = create_token(&env, &owner);
    
    // Mint tokens to user1
    token.mint(&user1, &1000);
    
    // Transfer from user1 to user2
    token.transfer(&user1, &user2, &300);
    
    // Check balances after transfer
    assert_eq!(token.balance(&user1), 700);
    assert_eq!(token.balance(&user2), 300);
    assert_eq!(token.total_supply(), 1000);
}

#[test]
fn test_approve_and_transfer_from() {
    let env = Env::default();
    env.mock_all_auths();
    
    let owner = Address::generate(&env);
    let user1 = Address::generate(&env);
    let user2 = Address::generate(&env);
    let spender = Address::generate(&env);
    let token = create_token(&env, &owner);
    
    // Mint tokens to user1
    token.mint(&user1, &1000);
    
    // User1 approves spender to spend 500 tokens
    token.approve(&user1, &spender, &500, &200);
    
    // Check allowance
    assert_eq!(token.allowance(&user1, &spender), 500);
    
    // Spender transfers from user1 to user2
    token.transfer_from(&spender, &user1, &user2, &300);
    
    // Check balances and remaining allowance
    assert_eq!(token.balance(&user1), 700);
    assert_eq!(token.balance(&user2), 300);
    assert_eq!(token.allowance(&user1, &spender), 200);
}

#[test]
fn test_multiple_mints() {
    let env = Env::default();
    env.mock_all_auths();
    
    let owner = Address::generate(&env);
    let user1 = Address::generate(&env);
    let user2 = Address::generate(&env);
    let token = create_token(&env, &owner);
    
    // Multiple mint operations
    token.mint(&user1, &500);
    token.mint(&user2, &300);
    token.mint(&user1, &200);
    
    // Check final balances
    assert_eq!(token.balance(&user1), 700);
    assert_eq!(token.balance(&user2), 300);
    assert_eq!(token.total_supply(), 1000);
}

#[test]
fn test_zero_amount_operations() {
    let env = Env::default();
    env.mock_all_auths();
    
    let owner = Address::generate(&env);
    let user1 = Address::generate(&env);
    let user2 = Address::generate(&env);
    let token = create_token(&env, &owner);
    
    // Test mint zero
    token.mint(&user1, &0);
    assert_eq!(token.balance(&user1), 0);
    
    // Mint some tokens first
    token.mint(&user1, &1000);
    
    // Test transfer zero
    token.transfer(&user1, &user2, &0);
    assert_eq!(token.balance(&user1), 1000);
    assert_eq!(token.balance(&user2), 0);
}

#[test]
fn test_owner_can_mint_to_self() {
    let env = Env::default();
    env.mock_all_auths();
    
    let owner = Address::generate(&env);
    let token = create_token(&env, &owner);
    
    // Owner mints to themselves
    token.mint(&owner, &5000);
    
    assert_eq!(token.balance(&owner), 5000);
    assert_eq!(token.total_supply(), 5000);
}

#[test]
fn test_large_amounts() {
    let env = Env::default();
    env.mock_all_auths();
    
    let owner = Address::generate(&env);
    let user = Address::generate(&env);
    let token = create_token(&env, &owner);
    
    let large_amount = 1_000_000_000_000_000i128; // 1 quadrillion
    
    token.mint(&user, &large_amount);
    
    assert_eq!(token.balance(&user), large_amount);
    assert_eq!(token.total_supply(), large_amount);
}

#[test]
fn test_complete_token_lifecycle() {
    let env = Env::default();
    env.mock_all_auths();
    
    let owner = Address::generate(&env);
    let alice = Address::generate(&env);
    let bob = Address::generate(&env);
    let charlie = Address::generate(&env);
    let token = create_token(&env, &owner);
    
    // 1. Initial state
    assert_eq!(token.total_supply(), 0);
    
    // 2. Owner mints tokens to Alice
    token.mint(&alice, &1000);
    assert_eq!(token.balance(&alice), 1000);
    assert_eq!(token.total_supply(), 1000);
    
    // 3. Alice transfers to Bob
    token.transfer(&alice, &bob, &300);
    assert_eq!(token.balance(&alice), 700);
    assert_eq!(token.balance(&bob), 300);
    
    // 4. Alice approves Charlie to spend her tokens
    token.approve(&alice, &charlie, &200, &1000);
    assert_eq!(token.allowance(&alice, &charlie), 200);
    
    // 5. Charlie transfers from Alice to himself
    token.transfer_from(&charlie, &alice, &charlie, &150);
    assert_eq!(token.balance(&alice), 550);
    assert_eq!(token.balance(&charlie), 150);
    assert_eq!(token.allowance(&alice, &charlie), 50);
    
    // 6. Owner mints more tokens
    token.mint(&bob, &500);
    assert_eq!(token.balance(&bob), 800);
    assert_eq!(token.total_supply(), 1500);
    
    // 7. Verify final state
    assert_eq!(token.balance(&alice), 550);
    assert_eq!(token.balance(&bob), 800);
    assert_eq!(token.balance(&charlie), 150);
    assert_eq!(token.total_supply(), 1500);
}
