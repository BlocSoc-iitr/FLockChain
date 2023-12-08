// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./Interfaces/IStakingRegistry.sol";

contract SlashingManager {
    error NotSlasher();

    address public immutable SLASHER_ADDRESS;

    /// @notice Constructor for SlashingManager
    /// @param _slasherAddress Address of slasher
    constructor(address _slasherAddress) {
        SLASHER_ADDRESS = _slasherAddress;
    }

    /// @notice Function to slash client stake
    /// @dev This function is used to slash client stake
    /// @param _clientAddress Address of malicious client
    /// @param _stakingRegistry Address of staking registry
    function slash(
        address[] calldata _clientAddress,
        address _stakingRegistry
    ) external {
        if (msg.sender != SLASHER_ADDRESS) {
            revert NotSlasher();
        }
        IStakingRegistry stakingRegistry = IStakingRegistry(_stakingRegistry);
        for (uint256 i = 0; i < _clientAddress.length; i++) {
            stakingRegistry.slashStake(_clientAddress[i]);
        }
    }
}
