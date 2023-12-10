import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { SlashClients } from "../generated/schema"
import { SlashClients as SlashClientsEvent } from "../generated/SlashingManager/SlashingManager"
import { handleSlashClients } from "../src/slashing-manager"
import { createSlashClientsEvent } from "./slashing-manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let instanceId = BigInt.fromI32(234)
    let newSlashClientsEvent = createSlashClientsEvent(instanceId)
    handleSlashClients(newSlashClientsEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("SlashClients created and stored", () => {
    assert.entityCount("SlashClients", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "SlashClients",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "instanceId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
