#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::{Address as _, Ledger}, vec, Address, Env};

// For testing, we'll create a simple mock token contract
#[contract]
struct TestToken;

#[contractimpl]
impl TestToken {
    pub fn mint(env: Env, to: Address, amount: i128) {
        env.storage().persistent().set(&to, &amount);
    }

    pub fn balance(env: Env, account: Address) -> i128 {
        env.storage().persistent().get(&account).unwrap_or(0)
    }

    pub fn transfer(env: Env, from: Address, to: Address, amount: i128) {
        let from_balance = Self::balance(env.clone(), from.clone());
        let to_balance = Self::balance(env.clone(), to.clone());

        env.storage().persistent().set(&from, &(from_balance - amount));
        env.storage().persistent().set(&to, &(to_balance + amount));
    }
}


fn create_test_token(env: &Env) -> (Address, TestTokenClient) {
    let contract_id = env.register(TestToken, ());
    (contract_id.clone(), TestTokenClient::new(env, &contract_id))
}

#[test]
fn test_initialize() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(GroupPaymentContract, ());
    let client = GroupPaymentContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let delegator = Address::generate(&env);
    let member1 = Address::generate(&env);
    let member2 = Address::generate(&env);

    let (token_address, _token_client) = create_test_token(&env);

    let group_members = vec![
        &env,
        GroupMember {
            address: member1.clone(),
            amount: 100,
        },
        GroupMember {
            address: member2.clone(),
            amount: 200,
        },
    ];

    client.initialize(
        &group_members,
        &admin,
        &delegator,
        &(env.ledger().timestamp() + 3600), // 1 hour from now
        &token_address,
    );

    assert_eq!(client.get_admin(), admin);
    assert_eq!(client.get_delegator(), delegator);
    assert_eq!(client.get_token_address(), token_address);
    assert_eq!(client.get_total_amount(), 300);
    assert_eq!(client.get_paid_amount(), 0);
    assert_eq!(client.get_status(), Status::Active);
    assert_eq!(client.get_member_amount(&member1), Some(100));
    assert_eq!(client.get_member_amount(&member2), Some(200));
    assert_eq!(client.is_member_paid(&member1), false);
    assert_eq!(client.is_member_paid(&member2), false);
}

#[test]
fn test_deposit() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(GroupPaymentContract, ());
    let client = GroupPaymentContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let delegator = Address::generate(&env);
    let member1 = Address::generate(&env);
    let member2 = Address::generate(&env);

    let (token_address, token_client) = create_test_token(&env);

    // Give tokens to members
    token_client.mint(&member1, &1000);
    token_client.mint(&member2, &1000);

    let group_members = vec![
        &env,
        GroupMember {
            address: member1.clone(),
            amount: 100,
        },
        GroupMember {
            address: member2.clone(),
            amount: 200,
        },
    ];

    client.initialize(
        &group_members,
        &admin,
        &delegator,
        &(env.ledger().timestamp() + 3600),
        &token_address,
    );

    // Member1 deposits
    client.deposit(&member1, &100);
    assert_eq!(client.is_member_paid(&member1), true);
    assert_eq!(client.get_paid_amount(), 100);

    // Member2 deposits
    client.deposit(&member2, &200);
    assert_eq!(client.is_member_paid(&member2), true);
    assert_eq!(client.get_paid_amount(), 300);

    // Check token balances
    assert_eq!(token_client.balance(&member1), 900);
    assert_eq!(token_client.balance(&member2), 800);
    assert_eq!(token_client.balance(&contract_id), 300);
}

#[test]
fn test_release() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(GroupPaymentContract, ());
    let client = GroupPaymentContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let delegator = Address::generate(&env);
    let member1 = Address::generate(&env);
    let member2 = Address::generate(&env);
    let recipient = Address::generate(&env);

    let (token_address, token_client) = create_test_token(&env);

    // Give tokens to members
    token_client.mint(&member1, &1000);
    token_client.mint(&member2, &1000);

    let group_members = vec![
        &env,
        GroupMember {
            address: member1.clone(),
            amount: 100,
        },
        GroupMember {
            address: member2.clone(),
            amount: 200,
        },
    ];

    client.initialize(
        &group_members,
        &admin,
        &delegator,
        &(env.ledger().timestamp() + 3600),
        &token_address,
    );

    // Both members deposit
    client.deposit(&member1, &100);
    client.deposit(&member2, &200);

    // Delegator releases funds
    client.release(&recipient);

    // Check recipient received all funds
    assert_eq!(token_client.balance(&recipient), 300);
    assert_eq!(token_client.balance(&contract_id), 0);
    assert_eq!(client.get_paid_amount(), 0);
}

#[test]
fn test_return_funds() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(GroupPaymentContract, ());
    let client = GroupPaymentContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let delegator = Address::generate(&env);
    let member1 = Address::generate(&env);
    let member2 = Address::generate(&env);

    let (token_address, token_client) = create_test_token(&env);

    // Give tokens to members
    token_client.mint(&member1, &1000);
    token_client.mint(&member2, &1000);

    let group_members = vec![
        &env,
        GroupMember {
            address: member1.clone(),
            amount: 100,
        },
        GroupMember {
            address: member2.clone(),
            amount: 200,
        },
    ];

    let current_time = env.ledger().timestamp();
    client.initialize(
        &group_members,
        &admin,
        &delegator,
        &(current_time + 3600),
        &token_address,
    );

    // Only member1 deposits
    client.deposit(&member1, &100);

    // Move time past deadline
    env.ledger().set_timestamp(current_time + 3601);

    // Admin returns funds
    client.return_funds();

    // Check status is unfulfilled
    assert_eq!(client.get_status(), Status::Unfulfilled);

    // Check member1 got their money back, member2 unchanged
    assert_eq!(token_client.balance(&member1), 1000); // Got back the 100
    assert_eq!(token_client.balance(&member2), 1000); // Never deposited
    assert_eq!(token_client.balance(&contract_id), 0);

    // Check payment status reset
    assert_eq!(client.is_member_paid(&member1), false);
    assert_eq!(client.get_paid_amount(), 0);
}

#[test]
#[should_panic(expected = "Error(Contract, #2)")]
fn test_deposit_after_deadline() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(GroupPaymentContract, ());
    let client = GroupPaymentContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let delegator = Address::generate(&env);
    let member1 = Address::generate(&env);

    let (token_address, token_client) = create_test_token(&env);
    token_client.mint(&member1, &1000);

    let group_members = vec![
        &env,
        GroupMember {
            address: member1.clone(),
            amount: 100,
        },
    ];

    let current_time = env.ledger().timestamp();
    client.initialize(
        &group_members,
        &admin,
        &delegator,
        &(current_time + 100),
        &token_address,
    );

    // Move time past deadline
    env.ledger().set_timestamp(current_time + 200);

    // This should fail with DeadlinePassed error
    client.deposit(&member1, &100);
}

#[test]
#[should_panic(expected = "Error(Contract, #3)")]
fn test_double_deposit() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(GroupPaymentContract, ());
    let client = GroupPaymentContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let delegator = Address::generate(&env);
    let member1 = Address::generate(&env);

    let (token_address, token_client) = create_test_token(&env);
    token_client.mint(&member1, &1000);

    let group_members = vec![
        &env,
        GroupMember {
            address: member1.clone(),
            amount: 100,
        },
    ];

    client.initialize(
        &group_members,
        &admin,
        &delegator,
        &(env.ledger().timestamp() + 3600),
        &token_address,
    );

    client.deposit(&member1, &100);
    // This should fail with AlreadyPaid error
    client.deposit(&member1, &100);
}
