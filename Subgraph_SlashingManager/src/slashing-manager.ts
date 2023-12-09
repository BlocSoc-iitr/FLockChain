import { SlashClients as SlashClientsEvent } from "../generated/SlashingManager/SlashingManager"
import { SlashClients } from "../generated/schema"

export function handleSlashClients(event: SlashClientsEvent): void {
  let entity = new SlashClients(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.instanceId = event.params.instanceId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
