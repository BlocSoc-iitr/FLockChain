// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IStakingRegistry {
    function stake() external payable;

    function unRegister() external;

    function withdrawStake() external;

    function slashStake(address _clientAddress) external;
}
