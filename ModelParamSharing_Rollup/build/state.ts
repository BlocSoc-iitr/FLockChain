import {toUtf8Bytes} from "ethers";
import {keccak256} from "ethers";
import {BytesLike} from "ethers";

import { RollupState, STF } from "@stackr/stackr-js/execution";
import { ethers } from "ethers";

export type StateVariable = {
  address: string;
  isSlashed: boolean;
  modelParams: Number[][];
}[];

interface StateTransport {
  currentEpoch: StateVariable;
}

export interface MPSActionInput {
  updatedParams: String; 
}

export class MPSRollup extends RollupState<StateVariable, StateTransport> {
  constructor(param: StateVariable) {
    super(param);
  }

  createTransport(state: StateVariable): StateTransport {
    return { currentEpoch: state };
  }

  getState(): StateVariable {
    return this.transport.currentEpoch;
  }

  calculateRoot(): BytesLike {
    //return hash for the array of state
    return keccak256(toUtf8Bytes("Your Mom Gay"));
  }
}

function calculateScore(scores: Number[][][], index: any) : Number {
  return 0;
}

function evaluateScore(score: Number) : boolean {
  return true;
}

export const MPS_STF: STF<MPSRollup, MPSActionInput> = {
  identifier: "MPS_STF",

  apply(inputs: MPSActionInput, state: MPSRollup): void {
    let oldState = state.getState();
    let newParams = JSON.parse(inputs.updatedParams  as string);
    let score: Number[] = [];
    for (let i = 0; i < newParams.length; i++) {
      let modelScore = calculateScore(newParams, i);
      score[i] = modelScore;
    }
    for (let i = 0; i < newParams.length; i++) {
      if (evaluateScore(score[i])) {
        oldState[i].isSlashed = true;
      }
      oldState[i].modelParams = newParams[i];
    }
    state.transport.currentEpoch = oldState;
  },
};