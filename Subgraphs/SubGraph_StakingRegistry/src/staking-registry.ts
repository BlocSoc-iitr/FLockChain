import {
  SlashStake as SlashStakeEvent,
  Stake as StakeEvent,
  Unregister as UnregisterEvent,
  WithdrawStake as WithdrawStakeEvent
} from "../generated/StakingRegistry/StakingRegistry"
import {
  SlashStake,
  Stake,
  Unregister,
  WithdrawStake
} from "../generated/schema"

export function handleSlashStake(event: SlashStakeEvent): void {
  let entity = new SlashStake(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.client = event.params.client

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStake(event: StakeEvent): void {
  let entity = new Stake(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.client = event.params.client

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnregister(event: UnregisterEvent): void {
  let entity = new Unregister(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.client = event.params.client

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawStake(event: WithdrawStakeEvent): void {
  let entity = new WithdrawStake(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.client = event.params.client

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
