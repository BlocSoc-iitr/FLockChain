import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  SlashStake,
  Stake,
  Unregister,
  WithdrawStake
} from "../generated/StakingRegistry/StakingRegistry"

export function createSlashStakeEvent(client: Address): SlashStake {
  let slashStakeEvent = changetype<SlashStake>(newMockEvent())

  slashStakeEvent.parameters = new Array()

  slashStakeEvent.parameters.push(
    new ethereum.EventParam("client", ethereum.Value.fromAddress(client))
  )

  return slashStakeEvent
}

export function createStakeEvent(client: Address): Stake {
  let stakeEvent = changetype<Stake>(newMockEvent())

  stakeEvent.parameters = new Array()

  stakeEvent.parameters.push(
    new ethereum.EventParam("client", ethereum.Value.fromAddress(client))
  )

  return stakeEvent
}

export function createUnregisterEvent(client: Address): Unregister {
  let unregisterEvent = changetype<Unregister>(newMockEvent())

  unregisterEvent.parameters = new Array()

  unregisterEvent.parameters.push(
    new ethereum.EventParam("client", ethereum.Value.fromAddress(client))
  )

  return unregisterEvent
}

export function createWithdrawStakeEvent(client: Address): WithdrawStake {
  let withdrawStakeEvent = changetype<WithdrawStake>(newMockEvent())

  withdrawStakeEvent.parameters = new Array()

  withdrawStakeEvent.parameters.push(
    new ethereum.EventParam("client", ethereum.Value.fromAddress(client))
  )

  return withdrawStakeEvent
}
