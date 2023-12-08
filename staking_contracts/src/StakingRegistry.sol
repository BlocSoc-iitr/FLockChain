// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./Interfaces/IStakingRegistry.sol";

/// @title StakingRegistry for managing staking and unstaking of clients
/// @notice This contract is used to stake, unregister and withdraw client stakes

contract StakingRegistry {
    error IncorrectStakingAmount();
    error ClientAlreadyStaked();
    error ClientHasntStaked();
    error TimelockHasntExpired();
    error ClientHasntUnRegistered();
    error NotSlashingManager();
    error ClientHasBeenSlashed();

    mapping(address => uint256) public clientStakes;
    mapping(address => bool) public isStaked;
    mapping(address => bool) public isSlashed;
    mapping(address => uint256) public withdrawlTimelock;

    uint256 public immutable STAKE_AMOUNT;
    uint256 public immutable STAKING_PERIOD;
    address public immutable SLASHING_MANAGER;
    address public immutable SLASH_TREASURY_ADDRESS;

    /// @notice Constructor for StakingRegistry
    /// @param _stakeAmount Amount of stake required to be staked by client
    /// @param _stakingPeriod Period for which client stake is locked
    /// @param _slashingManager Address of slashing manager
    /// @param _slashTreasuryAddress Address of slash treasury
    constructor(
        uint256 _stakeAmount,
        uint256 _stakingPeriod,
        address _slashingManager,
        address _slashTreasuryAddress
    ) {
        STAKE_AMOUNT = _stakeAmount;
        STAKING_PERIOD = _stakingPeriod;
        SLASHING_MANAGER = _slashingManager;
        SLASH_TREASURY_ADDRESS = _slashTreasuryAddress;
    }

    /// @notice Function to stake for client
    /// @dev This function is used to stake for client
    function stake() external payable {
        if (msg.value == STAKE_AMOUNT) {
            revert IncorrectStakingAmount();
        }
        if (isStaked[msg.sender]) {
            revert ClientAlreadyStaked();
        }
        if (withdrawlTimelock[msg.sender] > block.timestamp) {
            revert TimelockHasntExpired();
        }
        if (isSlashed[msg.sender]) {
            revert ClientHasBeenSlashed();
        }
        isStaked[msg.sender] = true;
        clientStakes[msg.sender] += STAKE_AMOUNT;
        require(
            clientStakes[msg.sender] == STAKE_AMOUNT,
            "Incorrect staking amount"
        );
    }

    /// @notice Function to unregister client
    /// @dev This function is used to unregister client
    function unRegister() external {
        if (!isStaked[msg.sender]) {
            revert ClientHasntStaked();
        }
        require(isStaked[msg.sender], "Not staked");
        withdrawlTimelock[msg.sender] = block.timestamp + STAKING_PERIOD;
        isStaked[msg.sender] = false;
    }

    /// @notice Function to withdraw client stake
    /// @dev This function is used to withdraw client stake
    function withdrawStake() external {
        if (isStaked[msg.sender]) {
            revert ClientHasntUnRegistered();
        }
        if (withdrawlTimelock[msg.sender] < block.timestamp) {
            revert TimelockHasntExpired();
        }
        uint256 _stake = clientStakes[msg.sender];
        clientStakes[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: _stake}("");
        require(success, "Transfer failed.");
        require(clientStakes[msg.sender] == 0, "Incorrect stake amount");
    }

    /// @notice Function to slash client stake
    /// @dev This function is used to slash client stake
    /// @param _clientAddress Address of client to be slashed
    function slashStake(address _clientAddress) external {
        if (msg.sender != SLASHING_MANAGER) {
            revert NotSlashingManager();
        }
        if (
            !isStaked[_clientAddress] &&
            withdrawlTimelock[_clientAddress] < block.timestamp
        ) {
            revert ClientHasntStaked();
        }
        uint256 _stake = clientStakes[_clientAddress];

        clientStakes[_clientAddress] = 0;
        isStaked[_clientAddress] = false;
        isSlashed[_clientAddress] = true;
        (bool success, ) = SLASH_TREASURY_ADDRESS.call{value: _stake}("");
        require(success, "Transfer failed.");
    }
}
