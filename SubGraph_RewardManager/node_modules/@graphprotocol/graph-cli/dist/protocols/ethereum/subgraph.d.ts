import immutable from 'immutable';
import { Subgraph, SubgraphOptions } from '../subgraph';
export default class EthereumSubgraph implements Subgraph {
    manifest: SubgraphOptions['manifest'];
    resolveFile: SubgraphOptions['resolveFile'];
    protocol: SubgraphOptions['protocol'];
    constructor(options: SubgraphOptions);
    validateManifest(): any;
    validateAbis(): any;
    validateDataSourceAbis(dataSource: any, path: string): immutable.Collection<unknown, unknown> | immutable.List<unknown>;
    validateEvents(): any;
    validateDataSourceEvents(dataSource: any, path: string): any;
    validateCallFunctions(): any;
    handlerTypes(): immutable.List<string>;
}
