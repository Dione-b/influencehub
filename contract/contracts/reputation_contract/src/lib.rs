#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, contracterror,
    Address, Env,
};

#[contract]
pub struct ReputationContract;

#[contracttype]
pub enum DataKey {
    Admin,
    XP(Address),
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
pub enum Error {
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
            // already initialized; no-op or panic as you wish
            return;
        }
        storage.set(&DataKey::Admin, &admin);
    }

    pub fn reward_with_tokens(env: Env, user: Address, amount: u64, _token: Address) {
        // enforce per-tx cap
        if amount > MAX_XP_PER_TX {
            panic!("XP gained exceeds maximum");
        }
        // load admin to ensure initialized
        let storage = env.storage().persistent();
        let _admin: Address = storage
            .get(&DataKey::Admin)
            .unwrap_or_else(|| panic!("Not initialized"));
        // read current XP (default 0)
        let current = storage.get(&DataKey::XP(user.clone())).unwrap_or(0u64);
        // check overflow
        let new = current
            .checked_add(amount)
            .unwrap_or_else(|| panic!("XP overflow"));
        // persist new XP
        storage.set(&DataKey::XP(user), &new);
        // normally would transfer tokens, but omitted in mock
    }


    pub fn get_level(env: Env, user: Address) -> u32 {
        let storage = env.storage().persistent();
        let xp: u64 = storage.get(&DataKey::XP(user)).unwrap_or(0u64);
        match xp {
            0..=100 => 1,
            101..=500 => 2,
            501..=1_000 => 3,
            1_001..=10_000 => 4,
            _ => {
                // simple growth: one more level per 10k xp
                let extra = ((xp - 1) / 10_000) as u32;
                4 + extra
            }
        }
    }
}

#[cfg(test)]
mod test;