let oldState = state.getState();
    let clientAddress: String[] = [];
    let isSlashed: Boolean[] = [];
    let updatedParams: Number[][][] = [];
    for (let i = 0; i < oldState.length; i++) {
      let oldParams = oldState[i].modelParams;
      let newParams = inputs.updatedState[i].updatedParams;
      const correlation = state.calculateCorrelation(oldParams, newParams);
      const correlationThreshold: Number = 0.1;
      if (correlation < correlationThreshold) {
        oldState[i].isSlashed = true;
      }
      clientAddress.push(oldState[i].address);
      isSlashed.push(oldState[i].isSlashed);
      updatedParams.push(newParams);
    }
    let score: Number[] = [];
    for (let i = 0; i < updatedParams.length; i++) {
      score[i] = state.calculateParamScore(updatedParams, i);
    }
    let isSlashed2: Boolean[] = state.evaluateSlashingConsition(score);
    for (let i = 0; i < isSlashed2.length; i++) {
      oldState[i].modelParams = updatedParams[i];
      if (isSlashed2[i] === true) {
        oldState[i].isSlashed = true;
      }
    }
    state.transport.currentEpoch = oldState;
4:15
calculateCorrelation(baseModel: Number[][], updatedModel: Number[][]): Number {
    const model1: MathNumericType[] = this.flattenWeights(baseModel) as MathNumericType[];
    const model2: MathNumericType[] = this.flattenWeights(updatedModel) as MathNumericType[];
    const correlation = math.corr(
      math.transpose(model1),
      math.transpose(model2)
    );
    const index: MathType = 0 as MathType;
    const result: Number = correlation as Number;
    return result;
  }
  flattenWeights(model: Number[][]): Number[] {
    let weights: Number[] = [];
    // model.layers.forEach((layer: Number[]) => {
    //   const layerWeights = layer.getWeights()[0].dataSync();
    //   weights.push(...Array.from(layerWeights));
    // });
    return weights;
  }
  calculateParamScore(updatedParams: Number[][][], tensorIndex: any): Number {
    let baseTensor: Number[][] = updatedParams[tensorIndex];
    let score: any = 0;
    for (let i = 0; i < updatedParams.length; i++) {
      score += this.calculateDistance(baseTensor, updatedParams[i]);
    }
    let result: Number = score as Number;
    return result;
  }
  calculateDistance(baseModel: Number[][], updatedModel: Number[][]): Number {
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
  evaluateSlashingConsition(scores: Number[]): Boolean[] {
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

address: string;
  isSlashed: boolean;
  modelParams: Number[][];
