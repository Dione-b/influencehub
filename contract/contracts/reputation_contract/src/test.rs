#![cfg(test)]
use soroban_sdk::{
    contract, contractimpl, Address, Env,
};
use soroban_sdk::testutils::Address as AddressTestutils;
use crate::{ReputationContract, DataKey};

#[contract]
pub struct MockToken;

#[contractimpl]
impl MockToken {
    pub fn mint(_env: Env, _to: Address, _amount: u64) {}
}

fn setup_env() -> Env {
    let env = Env::default();
    env.mock_all_auths();
    env
}

fn generate_address(env: &Env, _seed: u8) -> Address {
    Address::generate(env)
}


#[test]
fn test_initialize_and_get_admin() {
    let env = setup_env();
    let admin = generate_address(&env, 1);
    let contract_id = env.register(ReputationContract, ());

    env.as_contract(&contract_id, || {
        ReputationContract::initialize(env.clone(), admin.clone());
    });

    let stored: Address = env
        .as_contract(&contract_id, || {
            env.storage().persistent().get(&DataKey::Admin).unwrap()
        });
    assert_eq!(stored, admin);
}

#[test]
#[should_panic(expected = "Not initialized")]
fn test_reward_not_initialized() {
    let env = setup_env();
    let user = generate_address(&env, 2);
    let token_contract = generate_address(&env, 3);
    let contract_id = env.register(ReputationContract, ());

    env.as_contract(&contract_id, || {
        ReputationContract::reward_with_tokens(env.clone(), user, 10, token_contract);
    });
}

#[test]
#[should_panic(expected = "XP gained exceeds maximum")]
fn test_xp_cap_enforced() {
    let env = setup_env();
    let admin = generate_address(&env, 1);
    let user = generate_address(&env, 2);
    let token_contract = generate_address(&env, 3);
    let contract_id = env.register(ReputationContract, ());

    env.as_contract(&contract_id, || {
        ReputationContract::initialize(env.clone(), admin);
    });
    
    env.as_contract(&contract_id, || {
        ReputationContract::reward_with_tokens(env.clone(), user, 1_000_001, token_contract);
    });
}

#[test]
#[should_panic(expected = "XP overflow")]
fn test_xp_overflow() {
    let env = setup_env();
    let admin = generate_address(&env, 1);
    let user = generate_address(&env, 2);
    let token_contract = generate_address(&env, 3);
    let contract_id = env.register(ReputationContract, ());

    env.as_contract(&contract_id, || {
        ReputationContract::initialize(env.clone(), admin);
    });
    
    let max_minus_one = u64::MAX - 5;
    env.as_contract(&contract_id, || {
        env.storage().persistent().set(&DataKey::XP(user.clone()), &max_minus_one);
    });

    env.as_contract(&contract_id, || {
        ReputationContract::reward_with_tokens(env.clone(), user, 10, token_contract);
    });
}


#[test]
fn test_get_level_mapping() {
    let env = setup_env();
    let admin = generate_address(&env, 1);
    let user = generate_address(&env, 2);
    let contract_id = env.register(ReputationContract, ());

    env.as_contract(&contract_id, || {
        ReputationContract::initialize(env.clone(), admin);
    });

    // Test boundaries
    let levels = [
        (0, 1),
        (100, 1),
        (101, 2),
        (500, 2),
        (501, 3),
        (1000, 3),
        (1001, 4),
        (10_000, 4),
    ];
    for (xp, expected) in levels {
        env.as_contract(&contract_id, || {
            env.storage().persistent().set(&DataKey::XP(user.clone()), &(xp as u64));
        });
        let lvl = env.as_contract(&contract_id, || {
            ReputationContract::get_level(env.clone(), user.clone())
        });
        assert_eq!(lvl, expected, "XP {} should map to level {}", xp, expected);
    }
}
