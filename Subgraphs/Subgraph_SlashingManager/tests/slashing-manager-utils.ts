import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import { SlashClients } from "../generated/SlashingManager/SlashingManager"

export function createSlashClientsEvent(instanceId: BigInt): SlashClients {
  let slashClientsEvent = changetype<SlashClients>(newMockEvent())

  slashClientsEvent.parameters = new Array()

  slashClientsEvent.parameters.push(
    new ethereum.EventParam(
      "instanceId",
      ethereum.Value.fromUnsignedBigInt(instanceId)
    )
  )

  return slashClientsEvent
}
