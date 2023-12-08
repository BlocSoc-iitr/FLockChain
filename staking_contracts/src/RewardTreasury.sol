// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract RewardTreasury {
    error NotAdmin();
    error NotEnoughBalance();

    address public immutable ADMIN_ADDRESS;

    /// @notice Constructor for RewardTreasury
    /// @param _adminAddress Address of admin
    constructor(address _adminAddress) {
        ADMIN_ADDRESS = _adminAddress;
    }

    /// @notice Function to withdraw from treasury
    /// @dev This function is used to withdraw from treasury
    function withdraw(uint256 _amount) external {
        if (msg.sender != ADMIN_ADDRESS) {
            revert NotAdmin();
        }
        if (address(this).balance < _amount) {
            revert NotEnoughBalance();
        }
        (bool success, ) = ADMIN_ADDRESS.call{value: _amount}("");
        require(success, "Transfer failed.");
    }

    receive() external payable {}
}
