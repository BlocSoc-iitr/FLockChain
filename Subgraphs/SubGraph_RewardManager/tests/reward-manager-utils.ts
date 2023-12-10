import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import {
  CollectTrainingFees,
  NewUserInstance
} from "../generated/RewardManager/RewardManager"

export function createCollectTrainingFeesEvent(
  instanceId: BigInt,
  numberOfEpochs: BigInt
): CollectTrainingFees {
  let collectTrainingFeesEvent = changetype<CollectTrainingFees>(newMockEvent())

  collectTrainingFeesEvent.parameters = new Array()

  collectTrainingFeesEvent.parameters.push(
    new ethereum.EventParam(
      "instanceId",
      ethereum.Value.fromUnsignedBigInt(instanceId)
    )
  )
  collectTrainingFeesEvent.parameters.push(
    new ethereum.EventParam(
      "numberOfEpochs",
      ethereum.Value.fromUnsignedBigInt(numberOfEpochs)
    )
  )

  return collectTrainingFeesEvent
}

export function createNewUserInstanceEvent(
  instanceId: BigInt,
  numberOfEpochs: BigInt
): NewUserInstance {
  let newUserInstanceEvent = changetype<NewUserInstance>(newMockEvent())

  newUserInstanceEvent.parameters = new Array()

  newUserInstanceEvent.parameters.push(
    new ethereum.EventParam(
      "instanceId",
      ethereum.Value.fromUnsignedBigInt(instanceId)
    )
  )
  newUserInstanceEvent.parameters.push(
    new ethereum.EventParam(
      "numberOfEpochs",
      ethereum.Value.fromUnsignedBigInt(numberOfEpochs)
    )
  )

  return newUserInstanceEvent
}
