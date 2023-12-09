import immutable from 'immutable';
import { Spinner } from '../../command-helpers/spinner';
import { TypeGeneratorOptions } from '../../type-generator';
import ABI from './abi';
export default class EthereumTypeGenerator {
    private sourceDir;
    private outputDir;
    constructor(options: TypeGeneratorOptions);
    loadABIs(subgraph: immutable.Map<any, any>): Promise<any>;
    _loadABI(dataSource: any, name: string, maybeRelativePath: string, spinner: Spinner): {
        dataSource: any;
        abi: ABI;
    };
    loadDataSourceTemplateABIs(subgraph: immutable.Map<any, any>): Promise<any>;
    _loadDataSourceTemplateABI(template: any, name: string, maybeRelativePath: string, spinner: Spinner): {
        template: any;
        abi: ABI;
    };
    generateTypesForABIs(abis: any[]): Promise<any>;
    _generateTypesForABI(abi: any, spinner: Spinner): Promise<void>;
    generateTypesForDataSourceTemplateABIs(abis: any[]): Promise<any>;
    _generateTypesForDataSourceTemplateABI(abi: any, spinner: Spinner): Promise<void>;
}
