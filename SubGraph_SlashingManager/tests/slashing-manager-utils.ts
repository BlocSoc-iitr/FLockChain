import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { SlashClients } from "../generated/SlashingManager/SlashingManager"

export function createSlashClientsEvent(
  clients: Array<Address>,
  instanceId: BigInt
): SlashClients {
  let slashClientsEvent = changetype<SlashClients>(newMockEvent())

  slashClientsEvent.parameters = new Array()

  slashClientsEvent.parameters.push(
    new ethereum.EventParam("clients", ethereum.Value.fromAddressArray(clients))
  )
  slashClientsEvent.parameters.push(
    new ethereum.EventParam(
      "instanceId",
      ethereum.Value.fromUnsignedBigInt(instanceId)
    )
  )

  return slashClientsEvent
}
