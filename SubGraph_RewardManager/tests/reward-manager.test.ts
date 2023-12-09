import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { CollectTrainingFees } from "../generated/schema"
import { CollectTrainingFees as CollectTrainingFeesEvent } from "../generated/RewardManager/RewardManager"
import { handleCollectTrainingFees } from "../src/reward-manager"
import { createCollectTrainingFeesEvent } from "./reward-manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let instanceId = BigInt.fromI32(234)
    let numberOfEpochs = BigInt.fromI32(234)
    let newCollectTrainingFeesEvent = createCollectTrainingFeesEvent(
      instanceId,
      numberOfEpochs
    )
    handleCollectTrainingFees(newCollectTrainingFeesEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CollectTrainingFees created and stored", () => {
    assert.entityCount("CollectTrainingFees", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CollectTrainingFees",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "instanceId",
      "234"
    )
    assert.fieldEquals(
      "CollectTrainingFees",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "numberOfEpochs",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
