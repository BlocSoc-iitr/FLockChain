import immutable from 'immutable';
import * as tsCodegen from '../../../codegen/typescript';
import ABI from '../abi';
export default class AbiCodeGenerator {
    private abi;
    constructor(abi: ABI);
    generateModuleImports(): tsCodegen.ModuleImports[];
    generateTypes(): any[];
    _generateCallTypes(): any;
    _generateEventTypes(): any;
    _generateInputOrOutput(inputOrOutput: immutable.Map<any, any>, index: number, parentClass: string, parentType: string, parentField?: string): {
        name: string;
        getter: tsCodegen.Method;
        classes: any[];
    } | {
        name: never[];
        getter: tsCodegen.Method;
        classes: never[];
    };
    _tupleTypeName(inputOrOutput: any, index: number, parentClass: string, parentType: string): string;
    _generateTupleType(inputOrOutput: any, index: number, parentClass: string, parentType: string, parentField?: string): {
        name: string;
        getter: tsCodegen.Method;
        classes: any[];
    };
    _generateSmartContractClass(): unknown[];
    _getTupleParamType(inputOrOutput: any, index: number, tupleParentType: string): string;
    _indexedInputType(inputType: string): string;
    callableFunctions(): immutable.Collection<any, any>;
}
