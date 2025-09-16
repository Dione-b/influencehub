#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, contracterror, contractimport,
    Address, Env,
};

// Import Reflector oracle WASM client
contractimport!(
    file = "/home/dione/Documentos/reflector/target/wasm32-unknown-unknown/release/reflector_oracle.wasm"
);

#[contract]
pub struct ReputationContract;

#[contracttype]
pub enum DataKey {
    Admin,
    XP(Address),
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
pub enum ReputationError {
    NotInitialized = 1,
    XpCapExceeded = 2,
    XpOverflow = 3,
}

const MAX_XP_PER_TX: u64 = 1_000_000;

#[contractimpl]
impl ReputationContract {
    pub fn initialize(env: Env, admin: Address) {
        let storage = env.storage().persistent();
        if storage.has(&DataKey::Admin) {
            return;
        }
        storage.set(&DataKey::Admin, &admin);
    }

    pub fn reward_with_price_check(
        env: Env,
        user: Address,
        amount: u64,
        token: Address,
        oracle_id: Address,
    ) {
        let storage = env.storage().persistent();
        // Ensure initialized
        let _admin: Address = storage
            .get::<_, Address>(&DataKey::Admin)
            .unwrap_or_else(|| panic!("Not initialized"));

        if amount > MAX_XP_PER_TX {
            panic!("XP gained exceeds maximum");
        }

        // Oracle client
        let oracle = Client::new(&env, &oracle_id);
        // Create asset for oracle lookup
        let asset = Asset::Stellar(token);
        // Fetch price
        let price = oracle
            .lastprice(&asset)
            .unwrap_or_else(|| panic!("Oracle error"));
        if price.price <= 0 {
            panic!("Oracle returned non-positive price");
        }

        // Update XP
        let current: u64 = storage
            .get::<_, u64>(&DataKey::XP(user.clone()))
            .unwrap_or(0u64);
        let new = current
            .checked_add(amount)
            .unwrap_or_else(|| panic!("XP overflow"));
        storage.set(&DataKey::XP(user), &new);
    }

    pub fn reward_with_tokens(
        env: Env,
        user: Address,
        amount: u64,
        _token: Address,
    ) {
        let storage = env.storage().persistent();
        let _admin: Address = storage
            .get::<_, Address>(&DataKey::Admin)
            .unwrap_or_else(|| panic!("Not initialized"));
        if amount > MAX_XP_PER_TX {
            panic!("XP gained exceeds maximum");
        }
        let current: u64 = storage
            .get::<_, u64>(&DataKey::XP(user.clone()))
            .unwrap_or(0u64);
        let new = current
            .checked_add(amount)
            .unwrap_or_else(|| panic!("XP overflow"));
        storage.set(&DataKey::XP(user), &new);
    }

    pub fn get_level(env: Env, user: Address) -> u32 {
        let storage = env.storage().persistent();
        let xp: u64 = storage
            .get::<_, u64>(&DataKey::XP(user))
            .unwrap_or(0u64);
        match xp {
            0..=100 => 1,
            101..=500 => 2,
            501..=1_000 => 3,
            1_001..=10_000 => 4,
            _ => {
                let extra = ((xp - 1) / 10_000) as u32;
                4 + extra
            }
        }
    }
}

#[cfg(test)]
mod test;
