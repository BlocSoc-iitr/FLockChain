import immutable from 'immutable';
import Protocol from './protocols';
export interface TypeGeneratorOptions {
    sourceDir?: string;
    subgraphManifest: string;
    subgraph?: string;
    protocol: Protocol;
    outputDir: string;
    skipMigrations?: boolean;
    uncrashable: boolean;
    uncrashableConfig: string;
}
export default class TypeGenerator {
    private sourceDir;
    private options;
    private protocol;
    private protocolTypeGenerator;
    constructor(options: TypeGeneratorOptions);
    generateTypes(): Promise<boolean | undefined>;
    generateUncrashableEntities(graphSchema: any): Promise<any>;
    loadSubgraph({ quiet }?: {
        quiet: boolean;
    }): Promise<any>;
    loadSchema(subgraph: immutable.Map<any, any>): Promise<any>;
    generateTypesForSchema(schema: any): Promise<any>;
    generateTypesForDataSourceTemplates(subgraph: immutable.Map<any, any>): Promise<any>;
    getFilesToWatch(): Promise<string[]>;
    watchAndGenerateTypes(): Promise<void>;
}
