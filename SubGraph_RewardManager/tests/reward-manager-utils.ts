import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  CollectTrainingFees,
  NewUserInstance
} from "../generated/RewardManager/RewardManager"

export function createCollectTrainingFeesEvent(
  instanceId: BigInt,
  clientAddress: Array<Address>,
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
      "clientAddress",
      ethereum.Value.fromAddressArray(clientAddress)
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
  clientAddress: Array<Address>,
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
      "clientAddress",
      ethereum.Value.fromAddressArray(clientAddress)
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
