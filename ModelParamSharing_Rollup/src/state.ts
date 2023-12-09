import { RollupState, STF } from "@stackr/stackr-js/execution";
import { ethers } from "ethers";
import * as math from "mathjs";
import { MathNumericType, MathType } from "mathjs";

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

  calculateRoot(): ethers.BytesLike {
    //return hash for the array of state
    return ethers.keccak256(ethers.toUtf8Bytes("Your Mom Gay"));
  }
}

function calculateCorrelation(baseModel: Number[][], updatedModel: Number[][]): Number {
  const model1: MathNumericType[] = flattenWeights(baseModel) as MathNumericType[];
  const model2: MathNumericType[] = flattenWeights(updatedModel) as MathNumericType[];
  const correlation = math.corr(
    math.transpose(model1), 
    math.transpose(model2)
  );
  const index: MathType = 0 as MathType;
  const result: Number = correlation as Number;
  return result;
}

function flattenWeights(model: Number[][]): Number[] {
  let flatArray: Number[] = [];
    for (let i = 0; i < model.length; i++) {
        for (let j = 0; j < model[i].length; j++) {
            flatArray.push(model[i][j]);
        }
    }
    return flatArray;
}

function calculateScore(updatedParams: Number[][][], index: any) : Number {
  let baseTensor: Number[][] = updatedParams[index];
  let score: any = 0;
  for (let i = 0; i < updatedParams.length; i++) {
    score += calculateDistance(baseTensor, updatedParams[i]);
  }
  let result: Number = score as Number;
  return result;
}

function calculateDistance(baseModel: Number[][], updatedModel: Number[][]): Number {
  let distance: any = 0;
  for (let i = 0; i < baseModel.length; i++) {
    for (let j = 0; j < baseModel[i].length; j++) {
      let baseModelValue: any = baseModel[i][j];
      let updatedModelValue: any = updatedModel[i][j];
      distance += (baseModelValue - updatedModelValue) ** 2;
    }
  }
  const result: Number = distance as Number;
  return result;
}

function evaluateScore(scores: Number[]) : Boolean[] {
  let isSlashed: Boolean[] = [];
  let scoreSum: any = 0;
  for (let i = 0; i < scores.length; i++) {
    scoreSum += scores[i];
  }
  let meanScore: any = scoreSum / scores.length;
  let bracket1: any = 0;
  let bracket2: any = 0;
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] > meanScore && scores[i] < (2 * meanScore as any)) {
      bracket1++;
    } else if (scores[i] < meanScore && scores[i] > (0.5 * meanScore as any)) {
      bracket2++;
    }
  }
  if(bracket1 > bracket2) {
    return isSlashed;
  }
  else {
    for (let i = 0; i < scores.length; i++) {
      if(scores[i] > (2 * meanScore as any)) {
        isSlashed[i] = true;
      }
    }
    return isSlashed;
  }
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
    let isSlashed: Boolean[] = evaluateScore(score);
    for (let i = 0; i < oldState.length; i++) {
      oldState[i].isSlashed = false;
      oldState[i].modelParams = newParams[i];
    }
    state.transport.currentEpoch = oldState;
  },
};
