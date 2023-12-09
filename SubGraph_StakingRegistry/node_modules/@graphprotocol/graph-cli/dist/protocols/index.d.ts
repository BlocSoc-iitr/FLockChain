import immutable from 'immutable';
import Subgraph from '../subgraph';
import { ContractCtor } from './contract';
import { SubgraphOptions } from './subgraph';
export default class Protocol {
    static fromDataSources(dataSourcesAndTemplates: any): Protocol;
    name: ProtocolName;
    config: ProtocolConfig;
    constructor(name: ProtocolName);
    static availableProtocols(): immutable.Collection<ProtocolName, string[]>;
    static availableNetworks(): immutable.Map<"ethereum" | "arweave" | "near" | "cosmos" | "substreams", immutable.List<string>>;
    static normalizeName(name: ProtocolName): ProtocolName;
    displayName(): string;
    isValidKindName(kind: string): boolean;
    hasABIs(): boolean;
    hasContract(): boolean;
    hasEvents(): boolean;
    hasTemplates(): boolean;
    hasDataSourceMappingFile(): boolean;
    getTypeGenerator(options: any): any;
    getTemplateCodeGen(template: any): any;
    getABI(): any;
    getSubgraph(options: SubgraphOptions): Subgraph;
    getContract(): ContractCtor | undefined;
    getManifestScaffold(): any;
    getMappingScaffold(): any;
}
export type ProtocolName = 'arweave' | 'ethereum' | 'near' | 'cosmos' | 'substreams';
export interface ProtocolConfig {
    displayName: string;
    abi?: any;
    contract?: ContractCtor;
    getTemplateCodeGen?: (template: any) => any;
    getTypeGenerator?: (options: any) => any;
    getSubgraph(options: SubgraphOptions): Subgraph;
    manifestScaffold: any;
    mappingScaffold: any;
}
