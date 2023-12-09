import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { SlashStake } from "../generated/schema"
import { SlashStake as SlashStakeEvent } from "../generated/StakingRegistry/StakingRegistry"
import { handleSlashStake } from "../src/staking-registry"
import { createSlashStakeEvent } from "./staking-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let client = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newSlashStakeEvent = createSlashStakeEvent(client)
    handleSlashStake(newSlashStakeEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("SlashStake created and stored", () => {
    assert.entityCount("SlashStake", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "SlashStake",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "client",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
