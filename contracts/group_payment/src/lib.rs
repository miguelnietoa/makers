#![no_std]
use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, panic_with_error, token,
    Address, Env, Vec,
};

// Data structures
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum Asset {
    Native,
    Contract(Address),
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum Status {
    Active,
    Unfulfilled,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct GroupMember {
    pub address: Address,
    pub amount: u64,
}

// Storage keys
#[contracttype]
pub enum DataKey {
    Admin,
    Delegator,
    Deadline,
    Asset,
    Status,
    PaidAmount,
    TotalAmount,
    GroupMembers,
    Amount(Address),
    IsPaid(Address),
}

// Contract errors
#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum GroupPaymentError {
    Unauthorized = 1,
    DeadlinePassed = 2,
    AlreadyPaid = 3,
    InsufficientFunds = 4,
    InvalidAmount = 5,
    ContractNotActive = 6,
    MemberNotFound = 7,
}

#[contract]
pub struct GroupPaymentContract;

#[contractimpl]
impl GroupPaymentContract {
    /// Initialize the group payment contract
    pub fn initialize(
        env: Env,
        group_members_addresses: Vec<Address>,
        group_members_amounts: Vec<u64>,
        admin: Address,
        delegator: Address,
        deadline: u64,
        asset: Asset,
    ) {
        // Ensure contract is not already initialized
        if env.storage().instance().has(&DataKey::Admin) {
            panic_with_error!(&env, GroupPaymentError::Unauthorized);
        }

        // Require admin authorization
        admin.require_auth();

        // Validate that addresses and amounts have same length
        if group_members_addresses.len() != group_members_amounts.len() {
            panic_with_error!(&env, GroupPaymentError::InvalidAmount);
        }

        // Calculate total amount and create group members vec
        let mut total_amount: u64 = 0;
        let mut group_members: Vec<GroupMember> = Vec::new(&env);

        for i in 0..group_members_addresses.len() {
            let address = group_members_addresses.get(i).unwrap();
            let amount = group_members_amounts.get(i).unwrap();

            total_amount += amount;
            group_members.push_back(GroupMember { address: address.clone(), amount });

            // Store individual member amounts and payment status
            env.storage().persistent().set(&DataKey::Amount(address.clone()), &amount);
            env.storage().persistent().set(&DataKey::IsPaid(address.clone()), &false);
        }

        // Store initialization data
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::Delegator, &delegator);
        env.storage().instance().set(&DataKey::Deadline, &deadline);
        env.storage().instance().set(&DataKey::Asset, &asset);
        env.storage().instance().set(&DataKey::Status, &Status::Active);
        env.storage().instance().set(&DataKey::PaidAmount, &0u64);
        env.storage().instance().set(&DataKey::TotalAmount, &total_amount);
        env.storage().instance().set(&DataKey::GroupMembers, &group_members);
    }

    /// Member deposits their portion
    pub fn deposit(env: Env, from: Address, amount: u64) {
        from.require_auth();

        // Check if contract is active
        let status: Status = env.storage().instance().get(&DataKey::Status).unwrap();
        if status != Status::Active {
            panic_with_error!(&env, GroupPaymentError::ContractNotActive);
        }

        // Check deadline
        let deadline: u64 = env.storage().instance().get(&DataKey::Deadline).unwrap();
        if env.ledger().timestamp() > deadline.into() {
            panic_with_error!(&env, GroupPaymentError::DeadlinePassed);
        }

        // Check if member exists and hasn't paid
        let required_amount: u64 = env.storage().persistent()
            .get(&DataKey::Amount(from.clone()))
            .unwrap_or_else(|| panic_with_error!(&env, GroupPaymentError::MemberNotFound));

        let is_paid: bool = env.storage().persistent()
            .get(&DataKey::IsPaid(from.clone()))
            .unwrap_or(false);

        if is_paid {
            panic_with_error!(&env, GroupPaymentError::AlreadyPaid);
        }

        if amount != required_amount {
            panic_with_error!(&env, GroupPaymentError::InvalidAmount);
        }

        // Transfer tokens to contract
        let asset: Asset = env.storage().instance().get(&DataKey::Asset).unwrap();
        let contract_address = env.current_contract_address();

        match asset {
            Asset::Native => {
                // For native token (XLM), we would need to handle differently
                // This is a simplified version
                panic_with_error!(&env, GroupPaymentError::InvalidAmount);
            }
            Asset::Contract(token_address) => {
                let token_client = token::Client::new(&env, &token_address);
                token_client.transfer(&from, &contract_address, &(amount as i128));
            }
        }

        // Update payment status
        env.storage().persistent().set(&DataKey::IsPaid(from.clone()), &true);

        // Update total paid amount
        let current_paid: u64 = env.storage().instance().get(&DataKey::PaidAmount).unwrap();
        env.storage().instance().set(&DataKey::PaidAmount, &(current_paid + amount));
    }

    /// Release funds (only callable by delegator)
    pub fn release(env: Env, to: Address) {
        let delegator: Address = env.storage().instance().get(&DataKey::Delegator).unwrap();
        delegator.require_auth();

        // Check if contract is active
        let status: Status = env.storage().instance().get(&DataKey::Status).unwrap();
        if status != Status::Active {
            panic_with_error!(&env, GroupPaymentError::ContractNotActive);
        }

        // Check if all members have paid
        let total_amount: u64 = env.storage().instance().get(&DataKey::TotalAmount).unwrap();
        let paid_amount: u64 = env.storage().instance().get(&DataKey::PaidAmount).unwrap();

        if paid_amount != total_amount {
            panic_with_error!(&env, GroupPaymentError::InsufficientFunds);
        }

        // Transfer all funds to the specified address
        let asset: Asset = env.storage().instance().get(&DataKey::Asset).unwrap();
        let contract_address = env.current_contract_address();

        match asset {
            Asset::Native => {
                // For native token (XLM), we would need to handle differently
                panic_with_error!(&env, GroupPaymentError::InvalidAmount);
            }
            Asset::Contract(token_address) => {
                let token_client = token::Client::new(&env, &token_address);
                token_client.transfer(&contract_address, &to, &(total_amount as i128));
            }
        }

        // Mark contract as completed by setting paid amount to 0
        env.storage().instance().set(&DataKey::PaidAmount, &0u64);
    }

    /// Return funds back to members (only callable by admin after deadline)
    pub fn return_funds(env: Env) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        // Check if deadline has passed
        let deadline: u64 = env.storage().instance().get(&DataKey::Deadline).unwrap();
        if env.ledger().timestamp() <= deadline.into() {
            panic_with_error!(&env, GroupPaymentError::Unauthorized);
        }




        // Mark as unfulfilled
        env.storage().instance().set(&DataKey::Status, &Status::Unfulfilled);

        // Return funds to all members who paid
        let group_members: Vec<GroupMember> = env.storage().instance().get(&DataKey::GroupMembers).unwrap();
        let asset: Asset = env.storage().instance().get(&DataKey::Asset).unwrap();
        let contract_address = env.current_contract_address();

        for member in group_members.iter() {
            let is_paid: bool = env.storage().persistent()
                .get(&DataKey::IsPaid(member.address.clone()))
                .unwrap_or(false);

            if is_paid {
                match &asset {
                    Asset::Native => {
                        // Handle native token return
                        panic_with_error!(&env, GroupPaymentError::InvalidAmount);
                    }
                    Asset::Contract(token_address) => {
                        let token_client = token::Client::new(&env, token_address);
                        token_client.transfer(&contract_address, &member.address, &(member.amount as i128));
                    }
                }

                // Mark as unpaid after return
                env.storage().persistent().set(&DataKey::IsPaid(member.address.clone()), &false);
            }
        }

        // Reset paid amount
        env.storage().instance().set(&DataKey::PaidAmount, &0u64);
    }

    // View functions
    pub fn get_status(env: Env) -> Status {
        env.storage().instance().get(&DataKey::Status).unwrap()
    }

    pub fn get_paid_amount(env: Env) -> u64 {
        env.storage().instance().get(&DataKey::PaidAmount).unwrap()
    }

    pub fn get_total_amount(env: Env) -> u64 {
        env.storage().instance().get(&DataKey::TotalAmount).unwrap()
    }

    pub fn get_deadline(env: Env) -> u64 {
        env.storage().instance().get(&DataKey::Deadline).unwrap()
    }

    pub fn is_member_paid(env: Env, member: Address) -> bool {
        env.storage().persistent().get(&DataKey::IsPaid(member)).unwrap_or(false)
    }

    pub fn get_member_amount(env: Env, member: Address) -> Option<u64> {
        env.storage().persistent().get(&DataKey::Amount(member))
    }

    pub fn get_admin(env: Env) -> Address {
        env.storage().instance().get(&DataKey::Admin).unwrap()
    }

    pub fn get_delegator(env: Env) -> Address {
        env.storage().instance().get(&DataKey::Delegator).unwrap()
    }

    pub fn get_asset(env: Env) -> Asset {
        env.storage().instance().get(&DataKey::Asset).unwrap()
    }

    pub fn get_group_members(env: Env) -> Vec<GroupMember> {
        env.storage().instance().get(&DataKey::GroupMembers).unwrap()
    }
}

mod test;
