import {
  CollectTrainingFees as CollectTrainingFeesEvent,
  NewUserInstance as NewUserInstanceEvent
} from "../generated/RewardManager/RewardManager"
import { CollectTrainingFees, NewUserInstance } from "../generated/schema"

export function handleCollectTrainingFees(
  event: CollectTrainingFeesEvent
): void {
  let entity = new CollectTrainingFees(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.instanceId = event.params.instanceId
  entity.numberOfEpochs = event.params.numberOfEpochs

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewUserInstance(event: NewUserInstanceEvent): void {
  let entity = new NewUserInstance(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.instanceId = event.params.instanceId
  entity.numberOfEpochs = event.params.numberOfEpochs

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
